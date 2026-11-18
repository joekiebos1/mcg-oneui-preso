// Een klein stukje markdown uit mcg-oneui leesbaar maken: koppen (##), alinea's, lijsten (- en 1.), vet en code.
// Genoeg voor de foundations-docs; wat er niet in past, staat er als gewone tekst.
import type { ReactNode } from "react";
import { Text } from "../oneui/react/Text";

export interface Blok { soort: "alinea" | "lijst" | "genummerd"; regels: string[] }
export interface Deel { kop: string | null; blokken: Blok[] }

/** Markdown in delen per ##-kop; de # titel valt weg (die is de paginatitel). */
export function delen(md: string): Deel[] {
  const uit: Deel[] = [{ kop: null, blokken: [] }];
  let blok: Blok | null = null;
  for (const r of md.split("\n")) {
    if (r.startsWith("# ")) { blok = null; continue; }
    if (r.startsWith("## ")) { uit.push({ kop: r.slice(3).trim(), blokken: [] }); blok = null; continue; }
    if (!r.trim()) { blok = null; continue; }
    const li = r.match(/^- (.*)/), nr = r.match(/^\d+\. (.*)/);
    const deel = uit[uit.length - 1];
    if (li || nr) {
      const soort = li ? "lijst" : "genummerd";
      if (!blok || blok.soort !== soort) { blok = { soort, regels: [] }; deel.blokken.push(blok); }
      blok.regels.push((li ?? nr)![1]);
    } else if (blok && blok.soort !== "alinea" && /^\s+/.test(r)) {
      blok.regels[blok.regels.length - 1] += " " + r.trim();     // vervolg van een lijstpunt
    } else {
      if (!blok || blok.soort !== "alinea") { blok = { soort: "alinea", regels: [] }; deel.blokken.push(blok); }
      blok.regels.push(r.trim());
    }
  }
  return uit.filter((d) => d.kop || d.blokken.length);
}

/** Vet (**…**) en code (`…`) binnen een regel. */
export function inline(t: string): ReactNode[] {
  return t.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((s, i) =>
    s.startsWith("**") ? <b key={i}>{s.slice(2, -2)}</b> : s.startsWith("`") ? <code key={i}>{s.slice(1, -1)}</code> : s);
}

export function Blokken({ blokken }: { blokken: Blok[] }) {
  return (
    <>
      {blokken.map((b, i) => b.soort === "alinea"
        ? <Text key={i} variant="body-m" className="leestekst">{inline(b.regels.join(" "))}</Text>
        : b.soort === "lijst"
          ? <ul key={i} className="regels">{b.regels.map((r, j) => <li key={j}><Text as="span" variant="body-m">{inline(r)}</Text></li>)}</ul>
          : <ol key={i} className="regels genummerd">{b.regels.map((r, j) => <li key={j}><Text as="span" variant="body-m">{inline(r)}</Text></li>)}</ol>)}
    </>
  );
}

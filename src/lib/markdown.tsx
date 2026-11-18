// Markdown uit mcg-oneui leesbaar maken: koppen (## en ###), alinea's, lijsten (- en 1.), tabellen, codeblokken, vet, cursief, code
// en links. Genoeg voor de docs en de regels; wat er niet in past, staat er als gewone tekst.
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Text } from "../oneui/react/Text";

export interface Blok { soort: "alinea" | "lijst" | "genummerd" | "tabel" | "kop3" | "code"; regels: string[] }
export interface Deel { kop: string | null; blokken: Blok[] }

/** De titel (# …) van een document. */
export const titel = (md: string) => md.match(/^# (.+)$/m)?.[1].trim() ?? "";

/** Markdown in delen per ##-kop; de # titel valt weg (die is de paginatitel), html-commentaar ook. */
export function delen(md: string): Deel[] {
  const uit: Deel[] = [{ kop: null, blokken: [] }];
  let blok: Blok | null = null;
  let code: Blok | null = null;
  for (const r of md.replace(/<!--[\s\S]*?-->/g, "").split("\n")) {
    const deel = uit[uit.length - 1];
    if (r.trim().startsWith("```")) {
      if (code) code = null; else { code = { soort: "code", regels: [] }; deel.blokken.push(code); }
      blok = null; continue;
    }
    if (code) { code.regels.push(r); continue; }
    if (r.startsWith("# ")) { blok = null; continue; }
    if (r.startsWith("## ")) { uit.push({ kop: r.slice(3).trim(), blokken: [] }); blok = null; continue; }
    if (r.startsWith("### ")) { deel.blokken.push({ soort: "kop3", regels: [r.slice(4).trim()] }); blok = null; continue; }
    if (!r.trim()) { blok = null; continue; }
    if (r.trim().startsWith("|")) {
      if (!blok || blok.soort !== "tabel") { blok = { soort: "tabel", regels: [] }; deel.blokken.push(blok); }
      blok.regels.push(r.trim());
      continue;
    }
    const li = r.match(/^\s{0,1}- (.*)/), nr = r.match(/^\d+\. (.*)/);
    if (li || nr) {
      const soort = li ? "lijst" : "genummerd";
      if (!blok || blok.soort !== soort) { blok = { soort, regels: [] }; deel.blokken.push(blok); }
      blok.regels.push((li ?? nr)![1]);
    } else if (blok && (blok.soort === "lijst" || blok.soort === "genummerd") && /^\s+/.test(r)) {
      blok.regels[blok.regels.length - 1] += " " + r.trim().replace(/^- /, "· ");   // vervolg of sub-punt
    } else {
      if (!blok || blok.soort !== "alinea") { blok = { soort: "alinea", regels: [] }; deel.blokken.push(blok); }
      blok.regels.push(r.trim());
    }
  }
  return uit.filter((d) => d.kop || d.blokken.length);
}

/** Een link naar een ander document wordt een link in de presentatielaag, als die er is. */
export type Linker = (href: string) => string | null;

/** Vet (**…**), cursief (_…_), code (`…`) en links ([…](…)) binnen een regel. */
export function inline(t: string, link?: Linker): ReactNode[] {
  return t.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|(?<![\w])_[^_]+_(?![\w]))/g).filter(Boolean).map((s, i) => {
    if (s.startsWith("**")) return <b key={i}>{inline(s.slice(2, -2), link)}</b>;
    if (s.startsWith("`")) return <code key={i}>{s.slice(1, -1)}</code>;
    if (s.startsWith("_") && s.endsWith("_") && s.length > 2) return <i key={i}>{s.slice(1, -1)}</i>;
    const m = s.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) {
      if (/^https?:/.test(m[2])) return <a key={i} href={m[2]} target="_blank" rel="noreferrer">{m[1]}</a>;
      const naar = link?.(m[2]);
      return naar ? <Link key={i} to={naar}>{m[1]}</Link> : <span key={i}>{m[1]}</span>;
    }
    return s;
  });
}

const cellen = (r: string) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

export function Blokken({ blokken, link }: { blokken: Blok[]; link?: Linker }) {
  return (
    <>
      {blokken.map((b, i) => {
        if (b.soort === "alinea") return <Text key={i} variant="body-m" className="leestekst">{inline(b.regels.join(" "), link)}</Text>;
        if (b.soort === "code") return <pre key={i} className="codeblok"><code>{b.regels.join("\n")}</code></pre>;
        if (b.soort === "kop3") return <Text key={i} as="h3" variant="title-m">{inline(b.regels[0], link)}</Text>;
        if (b.soort === "tabel") {
          const [kop, , ...rijen] = b.regels;
          return (
            <div key={i} className="tabel-scroll">
              <table className="tabel doc">
                <thead><tr>{cellen(kop).map((c, j) => <th key={j}><Text as="span" variant="label-m">{inline(c, link)}</Text></th>)}</tr></thead>
                <tbody>{rijen.map((r, j) => <tr key={j}>{cellen(r).map((c, k) => <td key={k}><Text as="span" variant="body-s">{inline(c, link)}</Text></td>)}</tr>)}</tbody>
              </table>
            </div>
          );
        }
        const Lijst = b.soort === "lijst" ? "ul" : "ol";
        return (
          <Lijst key={i} className={"regels" + (b.soort === "genummerd" ? " genummerd" : "")}>
            {b.regels.map((r, j) => <li key={j}><Text as="span" variant="body-m">{inline(r, link)}</Text></li>)}
          </Lijst>
        );
      })}
    </>
  );
}

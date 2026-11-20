// Bouwstenen van een verhalende pagina (eigenaar 2026-11-20), gedeeld door Kleuren, de componenten en de andere
// pagina's: een vak met een voorbeeld, een onderschrift, een vinkje of kruisje, en doen en niet doen uit de docs.
import type { ReactNode } from "react";
import { Text } from "../oneui/react/Text";
import { doc } from "../lib/docs";
import { delen, inline, type Blok, type Linker } from "../lib/markdown";

/** Een sectie uit een document van mcg-oneui ("docs/components/checkbox.md", "Toegankelijkheid"): een ##-kop, of anders
 *  een ###-kop in een andere sectie (tot de volgende ###). */
export function blokken(pad: string, kop: string): Blok[] {
  const ds = delen(doc(pad) ?? "");
  const d = ds.find((x) => x.kop === kop);
  if (d) return d.blokken;
  for (const x of ds) {
    const i = x.blokken.findIndex((b) => b.soort === "kop3" && b.regels.join(" ").trim() === kop);
    if (i < 0) continue;
    const eind = x.blokken.findIndex((b, j) => j > i && b.soort === "kop3");
    return x.blokken.slice(i + 1, eind < 0 ? undefined : eind);
  }
  return [];
}

/** Wat er in een document voor de eerste ##-kop staat: de inleiding. */
export function begin(pad: string): Blok[] {
  const d = delen(doc(pad) ?? "")[0];
  return d && !d.kop ? d.blokken : [];
}

/** Een sectie zonder de ###-delen die al ergens anders op de pagina staan. */
export function zonder(b: Blok[], koppen: string[]): Blok[] {
  const uit: Blok[] = [];
  let weg = false;
  for (const x of b) {
    if (x.soort === "kop3") weg = koppen.includes(x.regels.join(" ").trim());
    if (!weg) uit.push(x);
  }
  return uit;
}

/** De alinea's van een sectie als één zin, zonder de verwijzing naar Figma. */
export const tekst = (b: Blok[]) =>
  b.filter((x) => x.soort === "alinea").map((x) => x.regels.join(" ")).join(" ").replace(/\s*\(Figma:[^)]*\)\s*/g, " ").trim();

/** Staat er nog niets in ("_Nog in te vullen._"), dan is het niet vastgelegd. */
export const leeg = (b: Blok[]) => b.length === 0 || b.every((x) => /^_?nog in te vullen\.?_?$/i.test(x.regels.join(" ").trim()));

/** Een vak met een voorbeeld. Het vak is de grijze pagina; wat er direct op staat, krijgt de waarden voor die ondergrond
 *  (besluit 012). Een wit kaartje erin springt terug (`Kaartje`). */
export function Vak({ children, className, ...rest }: { children?: ReactNode; className?: string; style?: React.CSSProperties; "data-theme"?: string }) {
  return <div className={["kaartvak", className].filter(Boolean).join(" ")} data-ondergrond="subtle" {...rest}>{children}</div>;
}

export function Kaartje({ children, rij }: { children?: ReactNode; rij?: boolean }) {
  return <div className={"kaartje" + (rij ? " rij" : "")} data-ondergrond="default">{children}</div>;
}

/** Het onderschrift onder een vak: een titel en eventueel een regel uitleg. */
export function Bij({ titel, children }: { titel?: ReactNode; children?: ReactNode }) {
  return (
    <div className="bij">
      {titel && <Text variant="body-m">{titel}</Text>}
      {children && <Text variant="body-m" color={titel ? "medium" : undefined}>{children}</Text>}
    </div>
  );
}

export function Oordeel({ goed }: { goed: boolean }) {
  return (
    <div className="oordeel" aria-label={goed ? "Doen" : "Niet doen"}>
      <span className={goed ? "ja" : "nee"}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {goed ? <path d="m5 12 5 5 9-10" /> : <path d="m6 6 12 12M18 6 6 18" />}
        </svg>
      </span>
    </div>
  );
}

export interface Regel { goed: boolean; tekst: string }

/** Doen en niet doen uit een lijst in de docs: "Doe:", "Doen:", "Niet:", "Niet doen:", met of zonder vet. Een regel
 *  zonder zo'n begin is een opmerking. */
export function doenEnNiet(b: Blok[]): { regels: Regel[]; opmerkingen: string[] } {
  const regels: Regel[] = [], opmerkingen: string[] = [];
  for (const r of b.filter((x) => x.soort === "lijst").flatMap((x) => x.regels)) {
    const m = r.match(/^(?:\*\*)?(Doen?|Niet(?: doen)?):(?:\*\*)?\s*(.*)$/i);
    if (!m) { opmerkingen.push(r); continue; }
    const t = m[2];
    regels.push({ goed: !/^niet/i.test(m[1]), tekst: t.charAt(0).toUpperCase() + t.slice(1) });
  }
  return { regels, opmerkingen };
}

/** Doen en niet doen als paren. Met beelden (in de volgorde van de docs) een vak per regel; zonder beelden links wat je
 *  doet en rechts wat niet. */
export function DoenEnNiet({ bron, beelden, link }: { bron: Blok[]; beelden?: ReactNode[]; link?: Linker }) {
  const { regels, opmerkingen } = doenEnNiet(bron);
  if (leeg(bron) || (regels.length === 0 && opmerkingen.length === 0)) return <NogNiet />;
  let paren: (Regel | null)[];
  if (beelden) paren = regels;
  else {
    const ja = regels.filter((r) => r.goed), nee = regels.filter((r) => !r.goed);
    paren = Array.from({ length: Math.max(ja.length, nee.length) }, (_, i) => [ja[i] ?? null, nee[i] ?? null]).flat();
  }
  return (
    <>
      <div className="raster r2">
        {paren.map((r, i) => r ? (
          beelden ? (
            <div key={i}>
              <Vak>{beelden[i] ?? null}</Vak>
              <Oordeel goed={r.goed} />
              <Bij>{inline(r.tekst, link)}</Bij>
            </div>
          ) : (
            <div key={i} className="regelkaart">
              <Oordeel goed={r.goed} />
              <Text variant="body-m">{inline(r.tekst, link)}</Text>
            </div>
          )
        ) : <div key={i} className="regelkaart leeg" aria-hidden="true" />)}
      </div>
      {opmerkingen.map((o, i) => <Text key={i} variant="body-m" color="medium">{inline(o, link)}</Text>)}
    </>
  );
}

export function NogNiet({ tekst = "Nog niet vastgelegd." }: { tekst?: string }) {
  return <div className="leeg-vak"><Text variant="body-m" color="medium">{tekst}</Text></div>;
}

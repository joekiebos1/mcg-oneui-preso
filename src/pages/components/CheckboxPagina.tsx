// Checkbox als verhaal, zoals Kleuren (eigenaar 2026-11-20). De teksten komen uit de docs van mcg-oneui; de voorbeelden
// zijn de echte componenten.
import type { ReactNode } from "react";
import { Text } from "../../oneui/react/Text";
import { Checkbox } from "../../oneui/react/Checkbox";
import { Radio } from "../../oneui/react/Radio";
import { Toggle } from "../../oneui/react/Toggle";
import { doc, linkVoor } from "../../lib/docs";
import { Blokken, delen, inline } from "../../lib/markdown";
import { Pagina, Sectie } from "../Pagina";

/** een sectie uit een doc, zonder de verwijzing naar Figma */
function sectie(slug: string, kop: string) {
  const md = doc(`docs/components/${slug}.md`) ?? "";
  return delen(md).find((d) => d.kop === kop)?.blokken ?? [];
}
const zin = (slug: string) =>
  sectie(slug, "Wanneer gebruiken").filter((b) => b.soort === "alinea").map((b) => b.regels.join(" ")).join(" ")
    .replace(/\s*\(Figma:[^)]*\)\s*/g, " ").trim();

function Bij({ titel, children }: { titel: string; children?: ReactNode }) {
  return (
    <div className="bij">
      <Text variant="body-m">{titel}</Text>
      {children && <Text variant="body-m" color="medium">{children}</Text>}
    </div>
  );
}

const Vink = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 5 5 9-10" />
  </svg>
);

/** Doen en niet doen uit de docs: "**Doen:** …" en "**Niet doen:** …", in paren. */
function doenEnNiet(slug: string) {
  return sectie(slug, "Do's en don'ts").filter((b) => b.soort === "lijst").flatMap((b) => b.regels)
    .map((r) => {
      const m = r.match(/^\*\*(Doen|Niet doen):\*\*\s*(.*)$/i);
      // de zin na "Doen:" begint klein; als onderschrift met een hoofdletter
      return m ? { goed: m[1].toLowerCase() === "doen", tekst: m[2].charAt(0).toUpperCase() + m[2].slice(1) } : null;
    }).filter((x): x is { goed: boolean; tekst: string } => !!x);
}

function Oordeel({ goed }: { goed: boolean }) {
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

// Het beeld bij elke regel, in de volgorde van de docs.
const BEELD = [
  <div className="kaartje"><Checkbox label="Stuur me een herinnering" defaultChecked /></div>,
  <div className="kaartje"><Checkbox label="Geen herinneringen sturen" /></div>,
  <div className="kaartje rij"><Radio name="doen" value="ochtend" label="Ochtend" defaultChecked /><Radio name="doen" value="avond" label="Avond" /></div>,
  <div className="kaartje rij"><Checkbox label="Ochtend" defaultChecked /><Checkbox label="Avond" /></div>,
];

export function CheckboxPagina() {
  const regels = doenEnNiet("checkbox");
  const link = linkVoor("components");
  const nog = sectie("checkbox", "Do's en don'ts").some((b) => /nog in te vullen/i.test(b.regels.join(" ")));
  return (
    <Pagina klasse="verhaal" titel="Checkbox" intro={zin("checkbox")}>
      <div className="held">
        <div className="kaartje">
          <Text variant="body-m">Meldingen</Text>
          <Checkbox label="Alle meldingen" indeterminate />
          <div className="inspring">
            <Checkbox label="Afspraken" defaultChecked />
            <Checkbox label="Berichten van je behandelaar" />
            <Checkbox label="Herinnering voor je dagboek" defaultChecked />
          </div>
        </div>
      </div>

      <Sectie titel="Welke keuze past?" uitleg="Drie componenten die op elkaar lijken. Kies op wat de keuze doet.">
        <div className="raster r3">
          <div><div className="kaartvak"><Checkbox label="Afspraken" defaultChecked /></div><Bij titel="Checkbox">{zin("checkbox").split(". ")[0]}.</Bij></div>
          <div><div className="kaartvak"><div className="stapel"><Radio name="keuze" value="ochtend" label="Ochtend" defaultChecked /><Radio name="keuze" value="avond" label="Avond" /></div></div><Bij titel="Radio">{zin("radio")}</Bij></div>
          <div><div className="kaartvak"><Toggle label="Meldingen" defaultChecked /></div><Bij titel="Toggle">{zin("toggle")}</Bij></div>
        </div>
      </Sectie>

      <Sectie titel="Opbouw">
        <div className="held">
          <div className="anatomie">
            <span className="klikvlak" />
            <span className="groot-vak"><Vink /></span>
            <span className="groot-label">Afspraken</span>
            <span className="nummer n1">1</span><span className="nummer n2">2</span><span className="nummer n3">3</span><span className="nummer n4">4</span>
          </div>
        </div>
        <div className="raster r2 dicht">
          <Bij titel="1 · Vakje">24 px, een vol vlak zonder rand. Uit is grijs, aan is sky.</Bij>
          <Bij titel="2 · Vink of streep">Een dikke lijn, 16 px.</Bij>
          <Bij titel="3 · Label">Label M, naast het vakje; de eerste regel staat er midden naast.</Bij>
          <Bij titel="4 · Klikvlak">Vakje en label samen: klikken op het label werkt ook.</Bij>
        </div>
      </Sectie>

      <Sectie titel="Toestanden">
        <div className="raster r3">
          <div><div className="kaartvak"><Checkbox label="" aria-label="Uit" /></div><Bij titel="Uit"><code>surface/action/neutral</code></Bij></div>
          <div><div className="kaartvak"><Checkbox label="" aria-label="Aan" defaultChecked /></div><Bij titel="Aan"><code>surface/action/primary</code></Bij></div>
          <div><div className="kaartvak"><Checkbox label="" aria-label="Een deel" indeterminate /></div><Bij titel="Een deel">Een streep in plaats van een vink.</Bij></div>
          <div><div className="kaartvak focusproef"><Checkbox label="" aria-label="Focus" defaultChecked /></div><Bij titel="Focus">Een ring, alleen met het toetsenbord.</Bij></div>
          <div><div className="kaartvak"><Checkbox label="" aria-label="Uitgeschakeld" disabled /></div><Bij titel="Uitgeschakeld">Het component op 40 %.</Bij></div>
          <div><div className="kaartvak"><Checkbox label="" aria-label="Uitgeschakeld, aan" defaultChecked disabled /></div><Bij titel="Uitgeschakeld, aan">Ook op 40 %.</Bij></div>
        </div>
      </Sectie>

      <Sectie titel="Doen en niet doen">
        {nog || regels.length === 0
          ? <div className="leeg-vak"><Text variant="body-m" color="medium">Nog niet vastgelegd.</Text></div>
          : <div className="raster r2">
              {regels.map((r, i) => (
                <div key={i}>
                  <div className="kaartvak">{BEELD[i] ?? null}</div>
                  <Oordeel goed={r.goed} />
                  <div className="bij"><Text variant="body-m">{inline(r.tekst, link)}</Text></div>
                </div>
              ))}
            </div>}
      </Sectie>

      <Sectie titel="Toegankelijkheid">
        <Blokken blokken={sectie("checkbox", "Toegankelijkheid")} link={link} />
      </Sectie>

      <Sectie titel="Voor developers">
        <details className="uitklap">
          <summary><Text as="span" variant="body-m">Code, props en tokens</Text></summary>
          <div className="uitklap-inhoud">
            <Blokken blokken={sectie("checkbox", "React")} link={link} />
            <Blokken blokken={sectie("checkbox", "Specificatie")} link={link} />
          </div>
        </details>
        <Text variant="body-m" color="low"><code>docs/components/checkbox.md</code> in mcg-oneui · Figma: DS Components › Checkbox</Text>
      </Sectie>
    </Pagina>
  );
}

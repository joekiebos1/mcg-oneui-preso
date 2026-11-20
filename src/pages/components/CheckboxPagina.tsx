// Checkbox als verhaal, op het sjabloon van alle componenten (ComponentVerhaal), met wat Checkbox meer heeft: welke
// keuze past en de opbouw. De teksten komen uit de docs van mcg-oneui; de voorbeelden zijn de echte componenten.
import { Text } from "../../oneui/react/Text";
import { Checkbox } from "../../oneui/react/Checkbox";
import { Radio } from "../../oneui/react/Radio";
import { Toggle } from "../../oneui/react/Toggle";
import { Sectie } from "../Pagina";
import { Bij, Kaartje, Vak, blokken, tekst } from "../verhaal";
import { ComponentVerhaal } from "./ComponentVerhaal";

const zin = (slug: string) => tekst(blokken(`docs/components/${slug}.md`, "Wanneer gebruiken"));

const Vink = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 5 5 9-10" />
  </svg>
);

// Het beeld bij elke regel van doen en niet doen, in de volgorde van de docs.
const BEELDEN = [
  <Kaartje><Checkbox label="Stuur me een herinnering" defaultChecked /></Kaartje>,
  <Kaartje><Checkbox label="Geen herinneringen sturen" /></Kaartje>,
  <Kaartje rij><Radio name="doen" value="ochtend" label="Ochtend" defaultChecked /><Radio name="doen" value="avond" label="Avond" /></Kaartje>,
  <Kaartje rij><Checkbox label="Ochtend" defaultChecked /><Checkbox label="Avond" /></Kaartje>,
];

const HELD = (
  <Kaartje>
    <Text variant="body-m">Meldingen</Text>
    <Checkbox label="Alle meldingen" indeterminate />
    <div className="inspring">
      <Checkbox label="Afspraken" defaultChecked />
      <Checkbox label="Berichten van je behandelaar" />
      <Checkbox label="Herinnering voor je dagboek" defaultChecked />
    </div>
  </Kaartje>
);

export function CheckboxPagina() {
  return (
    <ComponentVerhaal slug="checkbox" held={HELD} beelden={BEELDEN} toestanden={
      <div className="raster r3">
        <div><Vak><Checkbox label="" aria-label="Uit" /></Vak><Bij titel="Uit"><code>surface/action/neutral</code></Bij></div>
          <div><Vak><Checkbox label="" aria-label="Aan" defaultChecked /></Vak><Bij titel="Aan"><code>surface/action/primary</code></Bij></div>
          <div><Vak><Checkbox label="" aria-label="Een deel" indeterminate /></Vak><Bij titel="Een deel">Een streep in plaats van een vink.</Bij></div>
          <div><Vak className="focusproef"><Checkbox label="" aria-label="Focus" defaultChecked /></Vak><Bij titel="Focus">Een ring, alleen met het toetsenbord.</Bij></div>
          <div><Vak><Checkbox label="" aria-label="Uitgeschakeld" disabled /></Vak><Bij titel="Uitgeschakeld">Het component op 40 %.</Bij></div>
          <div><Vak><Checkbox label="" aria-label="Uitgeschakeld, aan" defaultChecked disabled /></Vak><Bij titel="Uitgeschakeld, aan">Ook op 40 %.</Bij></div>
        </div>
    } extra={<>
      <Sectie titel="Welke keuze past?" uitleg="Drie componenten die op elkaar lijken. Kies op wat de keuze doet.">
        <div className="raster r3">
          <div><Vak><Checkbox label="Afspraken" defaultChecked /></Vak><Bij titel="Checkbox">{zin("checkbox").split(". ")[0]}.</Bij></div>
          <div><Vak><div className="stapel"><Radio name="keuze" value="ochtend" label="Ochtend" defaultChecked /><Radio name="keuze" value="avond" label="Avond" /></div></Vak><Bij titel="Radio">{zin("radio")}</Bij></div>
          <div><Vak><Toggle label="Meldingen" defaultChecked /></Vak><Bij titel="Toggle">{zin("toggle")}</Bij></div>
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

    </>} />
  );
}

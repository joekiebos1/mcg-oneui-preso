// Werkende voorbeelden van de componenten uit mcg-oneui (src/oneui/react): alle toestanden naast elkaar, en ze doen
// echt wat ze doen. Bovenaan de pagina van elk component; de documentatie eronder komt uit docs/components/.
import { useState, type ReactNode } from "react";
import { Text } from "../../oneui/react/Text";
import { Input } from "../../oneui/react/Input";
import { Select } from "../../oneui/react/Select";
import { Checkbox } from "../../oneui/react/Checkbox";
import { Radio } from "../../oneui/react/Radio";
import { Toggle } from "../../oneui/react/Toggle";
import { Tabs } from "../../oneui/react/Tabs";
import { Editor } from "../../oneui/react/Editor";
import { IcoonComponent, IcoonKleur, IcoonIcoon } from "../../components/Iconen";

const Staat = ({ naam, children }: { naam: string; children: ReactNode }) => (
  <div className="staat"><Text as="span" variant="label-s" color="low">{naam}</Text><div className="staat__inhoud">{children}</div></div>
);

const OPTIES = [{ value: "ams", label: "Amsterdam" }, { value: "utr", label: "Utrecht" }, { value: "rot", label: "Rotterdam" }];

function InputVoorbeelden() {
  const [code, setCode] = useState("");
  return (
    <>
      <div className="staten">
        <Staat naam="default"><Input label="Naam" placeholder="Voornaam en achternaam" hint="Zoals op je pas" /></Staat>
        <Staat naam="filled"><Input label="Naam" defaultValue="Sanne de Vries" hint="Zoals op je pas" /></Staat>
        <Staat naam="error"><Input label="Mailadres" defaultValue="sanne@" error="Dit is geen geldig mailadres" /></Staat>
        <Staat naam="disabled"><Input label="Naam" placeholder="Voornaam en achternaam" hint="Zoals op je pas" disabled /></Staat>
        <Staat naam="size sm"><Input label="Naam" size="sm" placeholder="Voornaam en achternaam" /></Staat>
        <Staat naam="counter"><Input label="Korte notitie" counter maxLength={100} placeholder="Wat wil je onthouden?" /></Staat>
      </div>
      <div className="staten">
        <Staat naam="type search"><Input aria-label="Zoeken" type="search" placeholder="Zoek een cliënt" /></Staat>
        <Staat naam="search, filled"><Input aria-label="Zoeken" type="search" defaultValue="Jansen" /></Staat>
        <Staat naam="type number"><Input label="Aantal sessies" type="number" placeholder="0" /></Staat>
        <Staat naam="type code"><Input label="Verificatiecode" type="code" value={code} onChange={setCode} hint={code.length === 4 ? "Code compleet" : "Vier cijfers uit de sms"} /></Staat>
        <Staat naam="type textarea"><Input label="Verslag" type="textarea" rows={3} placeholder="Wat is er besproken?" /></Staat>
      </div>
    </>
  );
}

function SelectVoorbeelden() {
  return (
    <div className="staten">
      <Staat naam="default"><Select label="Locatie" placeholder="Kies een optie" options={OPTIES} hint="Waar vindt de afspraak plaats?" /></Staat>
      <Staat naam="filled"><Select label="Locatie" options={OPTIES} defaultValue="utr" hint="Waar vindt de afspraak plaats?" /></Staat>
      <Staat naam="error"><Select label="Locatie" placeholder="Kies een optie" options={OPTIES} error="Kies een locatie" /></Staat>
      <Staat naam="disabled"><Select label="Locatie" placeholder="Kies een optie" options={OPTIES} disabled hint="Waar vindt de afspraak plaats?" /></Staat>
      <Staat naam="size sm"><Select label="Locatie" size="sm" placeholder="Kies een optie" options={OPTIES} /></Staat>
    </div>
  );
}

function CheckboxVoorbeelden() {
  const [kinderen, setKinderen] = useState([true, false]);
  const alle = kinderen.every(Boolean), deels = !alle && kinderen.some(Boolean);
  return (
    <div className="staten">
      <Staat naam="unchecked"><Checkbox label="Herinnering per mail" /></Staat>
      <Staat naam="checked"><Checkbox label="Herinnering per mail" defaultChecked /></Staat>
      <Staat naam="indeterminate (werkt)">
        <div className="stapel">
          <Checkbox label="Alle meldingen" checked={alle} indeterminate={deels} onChange={(c) => setKinderen([c, c])} />
          <div className="inspring">
            <Checkbox label="Afspraken" checked={kinderen[0]} onChange={(c) => setKinderen([c, kinderen[1]])} />
            <Checkbox label="Berichten" checked={kinderen[1]} onChange={(c) => setKinderen([kinderen[0], c])} />
          </div>
        </div>
      </Staat>
      <Staat naam="disabled"><div className="stapel"><Checkbox label="Uit" disabled /><Checkbox label="Aan" disabled defaultChecked /></div></Staat>
      <Staat naam="size sm"><div className="stapel"><Checkbox size="sm" label="Uit" /><Checkbox size="sm" label="Aan" defaultChecked /></div></Staat>
    </div>
  );
}

function RadioVoorbeelden() {
  return (
    <div className="staten">
      <Staat naam="groep">
        <fieldset className="groep"><legend><Text as="span" variant="label-m">Voorkeur voor een afspraak</Text></legend>
          <Radio name="voorkeur" value="ochtend" label="Ochtend" defaultChecked />
          <Radio name="voorkeur" value="middag" label="Middag" />
          <Radio name="voorkeur" value="avond" label="Avond" />
        </fieldset>
      </Staat>
      <Staat naam="disabled"><div className="stapel"><Radio name="uit" value="a" label="Uit" disabled /><Radio name="uit2" value="b" label="Aan" disabled defaultChecked /></div></Staat>
      <Staat naam="size sm"><div className="stapel"><Radio name="klein" value="a" size="sm" label="Ochtend" defaultChecked /><Radio name="klein" value="b" size="sm" label="Middag" /></div></Staat>
    </div>
  );
}

function ToggleVoorbeelden() {
  return (
    <div className="staten">
      <Staat naam="active, uit"><Toggle label="Meldingen" /></Staat>
      <Staat naam="active, aan"><Toggle label="Meldingen" defaultChecked /></Staat>
      <Staat naam="disabled, uit"><Toggle label="Meldingen" disabled /></Staat>
      <Staat naam="disabled, aan"><Toggle label="Meldingen" disabled defaultChecked /></Staat>
      <Staat naam="zonder label"><Toggle aria-label="Donker thema" /></Staat>
    </div>
  );
}

function TabsVoorbeelden() {
  const [a, setA] = useState("afspraken");
  const [b, setB] = useState("kleur");
  return (
    <div className="staten breed">
      <Staat naam="type label, met counter en disabled">
        <Tabs aria-label="Cliënt" value={a} onChange={setA} tabs={[
          { id: "afspraken", label: "Afspraken" }, { id: "berichten", label: "Berichten", counter: 3 },
          { id: "notities", label: "Notities" }, { id: "archief", label: "Archief", disabled: true }]} />
      </Staat>
      <Staat naam="type icon">
        <Tabs type="icon" aria-label="Weergave" value={b} onChange={setB} idPrefix="icoon" tabs={[
          { id: "kleur", label: "Kleur", icon: <IcoonKleur /> }, { id: "icoon", label: "Iconen", icon: <IcoonIcoon /> },
          { id: "comp", label: "Componenten", icon: <IcoonComponent />, counter: 7 }]} />
      </Staat>
    </div>
  );
}

function EditorVoorbeelden() {
  return (
    <div className="staten breed">
      <Staat naam="default (probeer de werkbalk)"><Editor label="Verslag" placeholder="Schrijf hier je verslag" /></Staat>
      <Staat naam="filled"><Editor label="Verslag" defaultValue="<h2>Sessie 3</h2><p>We hebben het slaapdagboek <b>samen</b> doorgenomen.</p><ul><li>Vaste opstaantijd</li><li>Geen scherm na 22.00 uur</li></ul>" /></Staat>
      <Staat naam="toolbar uit"><Editor aria-label="Notitie" toolbar={false} placeholder="Korte notitie" /></Staat>
      <Staat naam="disabled"><Editor label="Verslag" disabled defaultValue="<p>Dit verslag is afgesloten.</p>" /></Staat>
    </div>
  );
}

export const VOORBEELDEN: Record<string, () => ReactNode> = {
  input: InputVoorbeelden, select: SelectVoorbeelden, checkbox: CheckboxVoorbeelden, radio: RadioVoorbeelden,
  toggle: ToggleVoorbeelden, tabs: TabsVoorbeelden, editor: EditorVoorbeelden,
};

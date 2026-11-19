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
import { Button } from "../../oneui/react/Button";
import { IconButton } from "../../oneui/react/IconButton";
import { List, ListItem } from "../../oneui/react/List";
import { Nav, NavItem } from "../../oneui/react/NavItem";
import { ProgressBar, ProgressRing } from "../../oneui/react/Progress";
import { Slider } from "../../oneui/react/Slider";
import { Dialog } from "../../oneui/react/Dialog";
import { IcoonComponent, IcoonKleur, IcoonIcoon } from "../../components/Iconen";

const Staat = ({ naam, children }: { naam: string; children: ReactNode }) => (
  <div className="staat"><Text as="span" variant="label-s" color="low">{naam}</Text><div className="staat__inhoud">{children}</div></div>
);

// Voorbeeldiconen in de stijl van DS Icons: 24 px, lijn 1,75, rond, currentColor.
const S = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const Plus = () => <S><path d="M12 5v14M5 12h14" /></S>;
const Zoek = () => <S><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></S>;
const Hart = () => <S><path d="M12 19s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 7.3a3.8 3.8 0 0 1 7 2.2C19 14.6 12 19 12 19Z" /></S>;
const Meer = () => <S><path d="M6 12h.01M12 12h.01M18 12h.01" /></S>;
const Huis = () => <S><path d="M4.5 10.5 12 4.5l7.5 6V19a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1Z" /><path d="M10 20v-5h4v5" /></S>;
const Mensen = () => <S><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M15.5 5.7a3 3 0 0 1 0 5.6M17 13.6a5.5 5.5 0 0 1 3.5 5.4" /></S>;
const Agenda = () => <S><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" /><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" /></S>;
const Bericht = () => <S><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3v-3H5A1.5 1.5 0 0 1 3.5 16V7A1.5 1.5 0 0 1 5 5.5Z" /></S>;
const Grafiek = () => <S><path d="M5 19v-6M12 19V5M19 19v-9" /></S>;
const Speel = () => <S><path d="M8 5.5v13l10-6.5Z" /></S>;
const Wind = () => <S><path d="M4 9h10a2.5 2.5 0 1 0-2.5-2.5M4 15h13a2.5 2.5 0 1 1-2.5 2.5M4 12h7" /></S>;
const Pen = () => <S><path d="M14.5 5.5 18.5 9.5 9 19H5v-4Z" /></S>;
const Maan = () => <S><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5 7.5 7.5 0 1 0 19 14.5Z" /></S>;
const Pauze = () => <S><path d="M9 6v12M15 6v12" /></S>;
const Vink = () => <S><path d="m5 12.5 4.5 4.5L19 7.5" /></S>;

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

function IconButtonVoorbeelden() {
  return (
    <div className="staten">
      {(["primary", "secondary", "neutral", "ghost"] as const).map((v) => (
        <Staat key={v} naam={v}>
          <div className="rij">
            <IconButton aria-label="Nieuw" variant={v} icon={<Plus />} size="lg" />
            <IconButton aria-label="Zoeken" variant={v} icon={<Zoek />} />
            <IconButton aria-label="Favoriet" variant={v} icon={<Hart />} size="sm" />
            <IconButton aria-label="Uit" variant={v} icon={<Meer />} disabled />
          </div>
        </Staat>
      ))}
      <Staat naam="maten xs tot xl">
        <div className="rij">{(["xs", "sm", "md", "lg", "xl"] as const).map((m) => <IconButton key={m} aria-label={m} size={m} icon={<Zoek />} />)}</div>
      </Staat>
    </div>
  );
}

function ListVoorbeelden() {
  return (
    <div className="staten">
      <Staat naam="op de pagina">
        <div className="paginavlak">
          <List>
            <ListItem title="Wat is slaapdruk?" description="Video · 3 min" icon={<Speel />} tone="magenta" done
              trailing={<span className="vinkbol"><Vink /></span>} />
            <ListItem title="Ademhaling 4-7-8" description="Oefening · 5 min" icon={<Wind />} tone="sky" onClick={() => {}} />
            <ListItem title="Slaapdagboek" description="Opdracht · elke ochtend" icon={<Pen />} tone="amber" onClick={() => {}} />
            <ListItem title="Een vast ritme" description="Les 4 · nog niet open" icon={<Maan />} tone="violet" trailing="ma" />
          </List>
        </div>
      </Staat>
      <Staat naam="surface sunken, in een wit vlak">
        <List surface="sunken">
          <ListItem title="Sanne de Vries" description="Laatste sessie gisteren" icon={<Mensen />} onClick={() => {}} />
          <ListItem title="Ahmed Benali" description="Nieuw bericht" icon={<Bericht />} onClick={() => {}} />
          <ListItem title="Archief" description="Niet beschikbaar" icon={<Agenda />} onClick={() => {}} disabled />
        </List>
      </Staat>
    </div>
  );
}

function NavVoorbeelden() {
  const [hier, setHier] = useState("vandaag");
  const items = [
    { id: "vandaag", label: "Vandaag", icon: <Huis /> }, { id: "clienten", label: "Cliënten", icon: <Mensen />, counter: 4 },
    { id: "agenda", label: "Agenda", icon: <Agenda /> }, { id: "berichten", label: "Berichten", icon: <Bericht /> },
    { id: "resultaten", label: "Resultaten", icon: <Grafiek /> },
  ];
  return (
    <div className="staten">
      <Staat naam="vertical (klik maar)">
        <div className="zijmenu">
          <Nav aria-label="Voorbeeldmenu">
            {items.map((i) => <NavItem key={i.id} {...i} active={hier === i.id} onClick={() => setHier(i.id)} />)}
            <NavItem label="Instellingen" disabled />
          </Nav>
        </div>
      </Staat>
      <Staat naam="horizontal">
        <Nav aria-label="Voorbeeld boven" orientation="horizontal">
          {items.slice(0, 3).map((i) => <NavItem key={i.id} {...i} orientation="horizontal" active={hier === i.id} onClick={() => setHier(i.id)} />)}
        </Nav>
      </Staat>
    </div>
  );
}

function ProgressBarVoorbeelden() {
  return (
    <div className="staten breed">
      <Staat naam="md, het percentage"><ProgressBar label="Les 3 van 7" value={3} max={7} /></Staat>
      <Staat naam="lg, eigen waarde"><ProgressBar label="Week 2: slaapritme" value={5} max={7} valueLabel="5 van 7 dagen" size="lg" /></Staat>
      <Staat naam="zonder kop"><ProgressBar aria-label="Uploaden" value={12} valueLabel={false} /></Staat>
    </div>
  );
}

function ProgressRingVoorbeelden() {
  return (
    <div className="staten">
      <Staat naam="lg, eigen midden"><ProgressRing aria-label="Lessen gedaan" value={3} max={7} size="lg">3/7</ProgressRing></Staat>
      <Staat naam="md, het percentage"><ProgressRing aria-label="Week 2" value={71} /></Staat>
      <Staat naam="sm"><ProgressRing aria-label="Vandaag" value={40} size="sm" /></Staat>
    </div>
  );
}

function SliderVoorbeelden() {
  const [uren, setUren] = useState(7.5);
  return (
    <div className="staten">
      <Staat naam="met woorden"><Slider label="Hoe onrustig voel je je?" min={0} max={10} defaultValue={6} minLabel="Heel rustig" maxLabel="Heel onrustig" /></Staat>
      <Staat naam="format"><Slider label="Uren slaap" min={4} max={10} step={0.5} value={uren} onChange={setUren} format={(v) => `${String(v).replace(".", ",")} uur`} /></Staat>
      <Staat naam="disabled"><Slider label="Niet beschikbaar" min={0} max={10} defaultValue={3} disabled /></Staat>
    </div>
  );
}

function DialogVoorbeelden() {
  const [open, setOpen] = useState<"stack" | "row" | null>(null);
  const dicht = () => setOpen(null);
  return (
    <div className="staten">
      <Staat naam="stack (standaard)"><Button variant="secondary" onClick={() => setOpen("stack")}>Open de dialoog</Button></Staat>
      <Staat naam="row"><Button variant="neutral" onClick={() => setOpen("row")}>Open de dialoog</Button></Staat>
      <Dialog open={open === "stack"} onClose={dicht} title="Even pauzeren?" icon={<Pauze />} tone="amber"
        actions={<><Button size="lg" onClick={dicht}>Pauzeren</Button><Button size="lg" variant="ghost" onClick={dicht}>Doorgaan</Button></>}>
        Je voortgang blijft bewaard. Je kunt morgen verder waar je gebleven bent.
      </Dialog>
      <Dialog open={open === "row"} onClose={dicht} title="Afspraak verzetten?" actionsLayout="row"
        actions={<><Button variant="ghost" onClick={dicht}>Annuleren</Button><Button onClick={dicht}>Verzetten</Button></>}>
        Sanne krijgt een bericht met de nieuwe tijd.
      </Dialog>
    </div>
  );
}

export const VOORBEELDEN: Record<string, () => ReactNode> = {
  input: InputVoorbeelden, select: SelectVoorbeelden, checkbox: CheckboxVoorbeelden, radio: RadioVoorbeelden,
  toggle: ToggleVoorbeelden, tabs: TabsVoorbeelden, editor: EditorVoorbeelden,
  "icon-button": IconButtonVoorbeelden, "list-item": ListVoorbeelden, "nav-item": NavVoorbeelden,
  "progress-bar": ProgressBarVoorbeelden, "progress-ring": ProgressRingVoorbeelden, slider: SliderVoorbeelden, dialog: DialogVoorbeelden,
};

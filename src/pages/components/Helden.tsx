// Het beeld bovenaan elke componentpagina: het echte component in een kleine scène uit de app, op een wit kaartje op
// de grijze pagina. Alleen voor wat er in React is; de teksten zijn voorbeelden, geen regels.
import { useState, type ReactNode } from "react";
import { Text } from "../../oneui/react/Text";
import { Button } from "../../oneui/react/Button";
import { IconButton } from "../../oneui/react/IconButton";
import { Input } from "../../oneui/react/Input";
import { Select } from "../../oneui/react/Select";
import { Radio } from "../../oneui/react/Radio";
import { Toggle } from "../../oneui/react/Toggle";
import { Tabs } from "../../oneui/react/Tabs";
import { Editor } from "../../oneui/react/Editor";
import { List, ListItem } from "../../oneui/react/List";
import { Nav, NavItem } from "../../oneui/react/NavItem";
import { ProgressBar, ProgressRing } from "../../oneui/react/Progress";
import { Slider } from "../../oneui/react/Slider";
import { Stepper } from "../../oneui/react/Stepper";
import { Icon } from "../../oneui/react/Icon";
import { Kaartje } from "../verhaal";

const S = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const Pauze = () => <S><path d="M9 6v12M15 6v12" /></S>;
const Plus = () => <S><path d="M12 5v14M5 12h14" /></S>;
const Zoek = () => <S><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></S>;
const Meer = () => <S><path d="M6 12h.01M12 12h.01M18 12h.01" /></S>;

function TabsHeld() {
  const [t, setT] = useState("afspraken");
  return (
    <Kaartje>
      <Tabs aria-label="Cliënt" value={t} onChange={setT} idPrefix="held" tabs={[
        { id: "afspraken", label: "Afspraken" }, { id: "berichten", label: "Berichten", counter: 2 }, { id: "notities", label: "Notities" }]} />
      <Text variant="body-m" color="medium">Dinsdag 10.00 uur · Sanne de Vries</Text>
    </Kaartje>
  );
}

function NavHeld() {
  const [hier, setHier] = useState("vandaag");
  const items = [
    { id: "vandaag", label: "Vandaag", icon: "house-3" as const }, { id: "clienten", label: "Cliënten", icon: "users" as const, counter: 4 },
    { id: "agenda", label: "Agenda", icon: "calendar" as const },
  ];
  return (
    <Kaartje>
      <Nav aria-label="Voorbeeld">{items.map((i) => <NavItem key={i.id} {...i} active={hier === i.id} onClick={() => setHier(i.id)} />)}</Nav>
    </Kaartje>
  );
}

function SliderHeld() {
  return (
    <Kaartje>
      <Slider label="Hoe onrustig voel je je?" min={0} max={10} defaultValue={4} minLabel="Heel rustig" maxLabel="Heel onrustig" />
      <Button size="md">Opslaan</Button>
    </Kaartje>
  );
}

export const HELDEN: Record<string, ReactNode> = {
  button: (
    <Kaartje>
      <Text variant="body-m">Je slaapdagboek voor vandaag staat klaar.</Text>
      <div className="proefrij rechts"><Button size="md" variant="ghost">Later</Button><Button size="md">Invullen</Button></div>
    </Kaartje>
  ),
  "icon-button": (
    <Kaartje rij>
      <IconButton aria-label="Nieuw" variant="primary" icon={<Plus />} size="lg" />
      <IconButton aria-label="Zoeken" variant="neutral" icon={<Zoek />} size="lg" />
      <IconButton aria-label="Meer" variant="ghost" icon={<Meer />} size="lg" />
    </Kaartje>
  ),
  input: (
    <Kaartje>
      <Input label="Mailadres" placeholder="naam@voorbeeld.nl" hint="Hier sturen we je herinneringen naartoe" />
      <Button size="md">Opslaan</Button>
    </Kaartje>
  ),
  select: (
    <Kaartje>
      <Select label="Locatie" options={[{ value: "ams", label: "Amsterdam" }, { value: "utr", label: "Utrecht" }]} defaultValue="utr" hint="Waar vindt de afspraak plaats?" />
    </Kaartje>
  ),
  radio: (
    <Kaartje>
      <Text variant="body-m">Wanneer wil je een herinnering?</Text>
      <div className="stapel">
        <Radio name="held-radio" value="ochtend" label="In de ochtend" defaultChecked />
        <Radio name="held-radio" value="avond" label="In de avond" />
      </div>
    </Kaartje>
  ),
  toggle: (
    <Kaartje>
      <Toggle label="Meldingen" defaultChecked />
      <Toggle label="Geluid" />
    </Kaartje>
  ),
  tabs: <TabsHeld />,
  editor: (
    <div className="breedkaart"><Kaartje>
      <Editor label="Verslag" defaultValue="<p>We hebben het slaapdagboek <b>samen</b> doorgenomen.</p>" />
    </Kaartje></div>
  ),
  "list-item": (
    <div className="breedkaart">
      <List>
        <ListItem title="Wat is slaapdruk?" description="Video · 3 min" icon="video" tone="magenta" onClick={() => {}} />
        <ListItem title="Ademhaling 4-7-8" description="Oefening · 5 min" icon="sparkle" tone="sky" onClick={() => {}} />
      </List>
    </div>
  ),
  "nav-item": <NavHeld />,
  "progress-bar": (
    <Kaartje>
      <ProgressBar label="Week 2: slaapritme" value={5} max={7} valueLabel="5 van 7 dagen" />
    </Kaartje>
  ),
  "progress-ring": (
    <Kaartje rij>
      <ProgressRing aria-label="Lessen gedaan" value={3} max={7} size="lg">3/7</ProgressRing>
      <div className="stapel krap"><Text variant="body-m">Slapen zonder piekeren</Text><Text variant="body-m" color="medium">3 van 7 lessen</Text></div>
    </Kaartje>
  ),
  slider: <SliderHeld />,
  dialog: (
    // het vlak van de Dialog, stil op de pagina; de echte dialoog open je bij de toestanden
    <div className="oneui-dialog__vlak dialoogbeeld" data-ondergrond="default">
      <span className="oneui-dialog__bol oneui-dialog__bol--amber" aria-hidden="true"><Pauze /></span>
      <Text as="span" variant="heading-m">Even pauzeren?</Text>
      <Text variant="body-m">Je voortgang blijft bewaard. Je kunt morgen verder waar je gebleven bent.</Text>
      <div className="stapel krap"><Button size="lg">Pauzeren</Button><Button size="lg" variant="ghost">Doorgaan</Button></div>
    </div>
  ),
  icon: (
    <div className="iconenrij">
      {(["heart-2", "moon", "calendar", "message-smile", "sparkle"] as const).map((n, i) => <Icon key={n} name={n} size="2xl" fill={i % 2 === 1} />)}
    </div>
  ),
  stepper: (
    <Kaartje>
      <Text variant="body-m">Les 3 van 7</Text>
      <Stepper steps={7} current={3} label="Les 3 van 7" />
    </Kaartje>
  ),
};

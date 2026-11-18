import { useState } from "react";
import { Button, type ButtonSize, type ButtonType } from "../../oneui/react/Button";
import { Text } from "../../oneui/react/Text";
import { los } from "../../lib/tokens";
import { Pagina, Regels, Sectie } from "../Pagina";
import buttonMd from "../../oneui/docs/components/button.md?raw";

// Bron: mcg-oneui docs/components/button.md en react/src/Button.tsx (src/oneui/).
const TYPES: ButtonType[] = ["primary", "secondary", "outline", "ghost"];
const MATEN: ButtonSize[] = ["sm", "md", "lg"];
const STATES = ["default", "hover", "pressed", "focus", "disabled", "loading"] as const;
const STATE_NL: Record<(typeof STATES)[number], string> = {
  default: "Standaard", hover: "Hover", pressed: "Ingedrukt", focus: "Focus", disabled: "Uitgeschakeld", loading: "Laden",
};

// Iconen in de stijl van DS Icons: 24 px, lijn 1,75, rond, currentColor.
const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
);
const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
);

function Probeer() {
  const [type, setType] = useState<ButtonType>("primary");
  const [maat, setMaat] = useState<ButtonSize>("md");
  const [links, setLinks] = useState(false);
  const [rechts, setRechts] = useState(false);
  const [laden, setLaden] = useState(false);
  const [uit, setUit] = useState(false);
  const Keus = <T extends string>({ label, waarde, opties, zet }: { label: string; waarde: T; opties: T[]; zet: (v: T) => void }) => (
    <div className="instelrij">
      <Text as="span" variant="body-s" color="medium">{label}</Text>
      <div className="keuze">{opties.map(o => <button key={o} type="button" className={waarde === o ? "aan" : ""} onClick={() => zet(o)}>{o}</button>)}</div>
    </div>
  );
  const Aan = ({ label, waarde, zet }: { label: string; waarde: boolean; zet: (v: boolean) => void }) => (
    <Keus label={label} waarde={waarde ? "aan" : "uit"} opties={["uit", "aan"]} zet={v => zet(v === "aan")} />
  );
  return (
    <div className="probeer">
      <div className="podium">
        <Button variant={type} size={maat} loading={laden} disabled={uit}
          iconLeft={links ? <Plus /> : undefined} iconRight={rechts ? <Chevron /> : undefined}>
          Afspraak maken
        </Button>
      </div>
      <div className="instellingenpaneel">
        <Keus label="Type" waarde={type} opties={TYPES} zet={setType} />
        <Keus label="Maat" waarde={maat} opties={MATEN} zet={setMaat} />
        <Aan label="Icoon links" waarde={links} zet={setLinks} />
        <Aan label="Icoon rechts" waarde={rechts} zet={setRechts} />
        <Aan label="Laden" waarde={laden} zet={setLaden} />
        <Aan label="Uitgeschakeld" waarde={uit} zet={setUit} />
      </div>
    </div>
  );
}

function Staten() {
  return (
    <div className="tabel-scroll">
      <table className="statenmatrix">
        <thead>
          <tr><th />{STATES.map(s => <th key={s}><Text as="span" variant="label-s" color="low">{STATE_NL[s]}</Text></th>)}</tr>
        </thead>
        <tbody>
          {TYPES.map(t => (
            <tr key={t}>
              <th scope="row"><Text as="span" variant="label-m">{t}</Text></th>
              {STATES.map(s => (
                <td key={s} className={"staat-" + s}>
                  <Button variant={t} size="md" disabled={s === "disabled"} loading={s === "loading"} tabIndex={-1}>Opslaan</Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// De kleurentabel uit button.md ("Kleuren per type en state"), zodat een wijziging in mcg-oneui hier vanzelf meekomt.
function kleurtabel(): [string, (string | null)[]][] {
  const blok = buttonMd.split("### Kleuren per type en state")[1] ?? "";
  const rijen: [string, (string | null)[]][] = [];
  for (const r of blok.split("\n")) {
    if (!/^\|\s*(primary|secondary|outline|ghost)\s*\|/.test(r)) continue;
    const c = r.split("|").slice(1, -1).map(x => x.trim().replace(/`/g, ""));
    const vlak = c[1] === "—" ? null : c[1];
    const voluit = (x: string) => (x === "—" ? null : x.startsWith("…") ? (vlak ?? "").replace(/\/[^/]+$/, "") + x.slice(1) : x);
    rijen.push([c[0], [vlak, ...c.slice(2).map(voluit)]]);
  }
  return rijen;
}
const KLEUREN = kleurtabel();
function Tok({ n }: { n: string | null }) {
  if (!n) return <Text as="span" variant="body-s" color="low">—</Text>;
  const { waarde, keten } = los(`{${n}}`);
  return (
    <span className="regelstaal">
      <i style={{ background: waarde }} />
      <span className="tokkort">
        <Text as="span" variant="body-s">{n}</Text>
        <Text as="span" variant="body-xs" color="low">{keten[keten.length - 1]} · {waarde.toUpperCase()}</Text>
      </span>
    </span>
  );
}

export function ButtonPagina() {
  return (
    <Pagina intro="Een knop start een actie. Eén primary per scherm: de actie die er het meest toe doet. Alle andere acties stappen af: secondary, dan outline, dan ghost. Naar een andere pagina gaan is een link, geen knop.">
      <Sectie titel="Probeer">
        <Probeer />
      </Sectie>

      <Sectie titel="Types en toestanden" uitleg="Elk type in elke toestand. Hover, ingedrukt en focus zijn hier vastgezet; in het voorbeeld hierboven zie je ze echt.">
        <Staten />
      </Sectie>

      <Sectie titel="Maten" uitleg="Hoekafronding radius/full. Ruimte tussen icoon en label spacing/md (8). Rand border/thin.">
        <div className="maatrij">
          {MATEN.map(m => (
            <div key={m} className="maatknop">
              <Button size={m} iconLeft={<Plus />}>Toevoegen</Button>
              <Text as="span" variant="label-m">{m}{m === "md" ? " · standaard" : ""}</Text>
            </div>
          ))}
        </div>
        <div className="tabel-scroll">
          <table className="tabel">
            <thead><tr><th>Maat</th><th>Hoogte</th><th>Padding links/rechts</th><th>Tekststijl</th><th>Icoon</th></tr></thead>
            <tbody>
              <tr><td>sm</td><td><code>size/xl</code> 36</td><td><code>spacing/lg</code> 12</td><td>label/M</td><td><code>size/2xs</code> 16</td></tr>
              <tr><td>md</td><td><code>size/2xl</code> 40</td><td><code>spacing/xl</code> 16</td><td>label/M</td><td><code>size/xs</code> 20</td></tr>
              <tr><td>lg</td><td><code>size/3xl</code> 48</td><td><code>spacing/3xl</code> 24</td><td>label/L</td><td><code>size/sm</code> 24</td></tr>
            </tbody>
          </table>
        </div>
      </Sectie>

      <Sectie titel="Kleuren" uitleg={<>Per type en toestand het token, met waar het naartoe wijst in het huidige thema. {(buttonMd.match(/In MCG is [^\n]*/) ?? [""])[0]}</>}>
        <div className="tabel-scroll">
          <table className="tabel">
            <thead><tr><th>Type</th><th>Vlak</th><th>Hover</th><th>Ingedrukt</th><th>Rand</th><th>Label en icoon</th></tr></thead>
            <tbody>
              {KLEUREN.map(([t, k]) => (
                <tr key={t}><td><b>{t}</b></td>{k.map((n, i) => <td key={i}><Tok n={n} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <Regels items={[
          <><b>Uitgeschakeld:</b> vlak surface/disabled, label text/disabled. Outline en ghost zonder vlak, outline met rand stroke/disabled. Geen doorschijnendheid.</>,
          <><b>Focus:</b> een ring buiten de knop, border/thick breed en spacing/2xs los van de knop, alleen bij toetsenbordfocus. Magenta bij primary, sky bij de rest. De knop verschuift niet.</>,
          <><b>Laden:</b> het label blijft onzichtbaar staan, zodat de knop zijn breedte houdt, met een spinner in het midden. De knop is dan niet klikbaar en meldt aan schermlezers dat hij bezig is.</>,
        ]} />
      </Sectie>

      <Sectie titel="Iconen" uitleg="Optioneel vóór en/of na het label. Het icoon heeft de kleur van het label en groeit mee met de maat.">
        <div className="maatrij">
          <Button variant="secondary" iconLeft={<Plus />}>Toevoegen</Button>
          <Button variant="outline" iconRight={<Chevron />}>Bekijk alles</Button>
        </div>
        <Regels items={[
          "Een icoon na het label (chevron) suggereert navigatie.",
          "Een knop met alleen een icoon is een Icon Button, met een toegankelijk label.",
        ]} />
      </Sectie>

      <Sectie titel="Doen en niet doen">
        <div className="naast">
          <div className="vak">
            <Text variant="title-s">Doen</Text>
            <Regels items={["Een werkwoord als label: “Opslaan”, “Verder”.", "Eén primary per scherm."]} />
            <div className="maatrij"><Button variant="ghost">Annuleren</Button><Button>Opslaan</Button></div>
          </div>
          <div className="vak">
            <Text variant="title-s">Niet doen</Text>
            <Regels items={["Twee primaries naast elkaar, of een primary voor annuleren.", "Kleuren of maten aanpassen per knop; vraag een nieuwe variant aan."]} />
            <div className="maatrij"><Button>Annuleren</Button><Button>Opslaan</Button></div>
          </div>
        </div>
      </Sectie>

      <Sectie titel="Toegankelijkheid">
        <Regels items={[
          "Een echte <button>, standaard type “button”: hij verstuurt geen formulier.",
          "Contrast tussen label en vlak minstens 4,5:1 in elke toestand, licht en donker. Dat wordt automatisch gecontroleerd.",
        ]} />
      </Sectie>

      <Sectie titel="In code">
        <Regels items={[
          <><b>React:</b> <code>{"<Button variant=\"primary\" size=\"md\">Opslaan</Button>"}</code> uit de OneUI-library.</>,
          <><b>Figma:</b> DS Components › Button.</>,
        ]} />
      </Sectie>
    </Pagina>
  );
}

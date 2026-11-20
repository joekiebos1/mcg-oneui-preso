// Button als verhaal, op het sjabloon van alle componenten (ComponentVerhaal), met wat Button meer heeft: probeer het,
// de maten, de kleuren per type en de iconen. Tekst en tabellen komen uit docs/components/button.md van mcg-oneui.
import { useState } from "react";
import { Button, type ButtonSize, type ButtonType } from "../../oneui/react/Button";
import { Text } from "../../oneui/react/Text";
import { los, token } from "../../lib/tokens";
import { useOmgeving } from "../../lib/omgeving";
import { linkVoor } from "../../lib/docs";
import { Blokken, inline } from "../../lib/markdown";
import { Sectie } from "../Pagina";
import { Bij, Kaartje, Vak, blokken, tekst } from "../verhaal";
import { ComponentVerhaal } from "./ComponentVerhaal";

const PAD = "docs/components/button.md";
const TYPES: ButtonType[] = ["primary", "secondary", "neutral", "ghost"];
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
      <Text as="span" variant="body-m" color="medium">{label}</Text>
      <div className="keuze">{opties.map(o => <button key={o} type="button" className={waarde === o ? "aan" : ""} onClick={() => zet(o)}>{o}</button>)}</div>
    </div>
  );
  const Aan = ({ label, waarde, zet }: { label: string; waarde: boolean; zet: (v: boolean) => void }) => (
    <Keus label={label} waarde={waarde ? "aan" : "uit"} opties={["uit", "aan"]} zet={v => zet(v === "aan")} />
  );
  return (
    <div className="probeer">
      <div className="podium" data-ondergrond="subtle">
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

/** Elke toestand een vak met de vier types erin; hover, ingedrukt en focus vastgezet. */
function Staten() {
  return (
    <div className="raster r3">
      {STATES.map((st) => (
        <div key={st}>
          <Vak className={"staand staat-" + st}>
            <div className="stapel midden">
              {TYPES.map((t) => <Button key={t} variant={t} size="md" disabled={st === "disabled"} loading={st === "loading"} tabIndex={-1}>{t}</Button>)}
            </div>
          </Vak>
          <Bij titel={STATE_NL[st]} />
        </div>
      ))}
    </div>
  );
}

// De kleurentabel uit button.md ("Kleuren per type en state"), zodat een wijziging in mcg-oneui hier vanzelf meekomt.
function kleurtabel(): [string, (string | null)[]][] {
  const rijen: [string, (string | null)[]][] = [];
  const tabel = blokken(PAD, "Kleuren per type en state").find((b) => b.soort === "tabel");
  for (const r of tabel?.regels ?? []) {
    if (!/^\|\s*(primary|secondary|neutral|ghost)\s*\|/.test(r)) continue;
    const c = r.split("|").slice(1, -1).map(x => x.trim().replace(/`/g, ""));
    const vlak = c[1] === "—" ? null : c[1];
    const voluit = (x: string) => (x === "—" ? null : x.startsWith("…") ? (vlak ?? "").replace(/\/[^/]+$/, "") + x.slice(1) : x);
    rijen.push([c[0], [vlak, ...c.slice(2).map(voluit)]]);
  }
  return rijen;
}
function Tok({ n }: { n: string | null }) {
  const { thema } = useOmgeving();
  if (!n) return <Text as="span" variant="body-m" color="low">—</Text>;
  // het staaltje volgt het thema; de stap erbij ook
  const t = token(n);
  const { keten } = los(thema === "dark" ? (t?.donker ?? t?.waarde) : t?.waarde);
  return (
    <span className="regelstaal" title={n}>
      <i style={{ background: `var(--oneui-${n.replace(/\//g, "-")})` }} />
      <code>{keten[keten.length - 1]}</code>
    </span>
  );
}

// Het beeld bij elke regel van doen en niet doen, in de volgorde van de docs.
const BEELDEN = [
  <Kaartje rij><Button size="md">Opslaan</Button></Kaartje>,
  <Kaartje rij><Button size="md" variant="ghost">Annuleren</Button><Button size="md">Opslaan</Button></Kaartje>,
  <Kaartje rij><Button size="md" variant="secondary">Terug</Button><Button size="md">Verder</Button></Kaartje>,
  <Kaartje rij><Button size="md">Annuleren</Button><Button size="md">Opslaan</Button></Kaartje>,
  <Kaartje rij><span className="randknop"><Text as="span" variant="label-m">Opslaan</Text></span></Kaartje>,
  <Kaartje rij><Button size="md" className="eigenknop">Opslaan</Button></Kaartje>,
  <Kaartje rij><Button size="md">Verder</Button><Button size="md" variant="secondary">Terug</Button></Kaartje>,
];

export function ButtonPagina() {
  const link = linkVoor("components");
  const kleuren = kleurtabel();
  const kleurregels = blokken(PAD, "Kleuren per type en state").filter((b) => b.soort !== "tabel");
  return (
    <ComponentVerhaal slug="button" beelden={BEELDEN} toestanden={<Staten />} extra={<>
      <Sectie titel="Probeer het">
        <Probeer />
      </Sectie>

      <Sectie titel="Maten" uitleg={inline(tekst(blokken(PAD, "Maten")), link)}>
        <div className="raster r3">
          {MATEN.map((m) => (
            <div key={m}><Vak><Button size={m} iconLeft={<Plus />}>Toevoegen</Button></Vak><Bij titel={m === "md" ? "md · standaard" : m} /></div>
          ))}
        </div>
      </Sectie>

      <Sectie titel="Kleuren">
        <div className="tabel-scroll">
          <table className="tabel vlak smal">
            <thead><tr><th>Type</th><th>Vlak</th><th>Hover</th><th>Ingedrukt</th><th>Label en icoon</th></tr></thead>
            <tbody>
              {kleuren.map(([t, k]) => (
                <tr key={t}><td>{t}</td>{k.map((n, i) => <td key={i}><Tok n={n} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <Blokken blokken={kleurregels} link={link} />
      </Sectie>

      <Sectie titel="Iconen" uitleg={inline(tekst(blokken(PAD, "Iconen")), link)}>
        <div className="raster r2">
          <div><Vak><Button variant="secondary" iconLeft={<Plus />}>Toevoegen</Button></Vak><Bij titel="Icoon vóór het label" /></div>
          <div><Vak><Button variant="neutral" iconRight={<Chevron />}>Bekijk alles</Button></Vak><Bij titel="Icoon na het label" /></div>
        </div>
      </Sectie>
    </>} />
  );
}

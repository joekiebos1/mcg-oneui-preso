import { useMemo, useState } from "react";
import { Text } from "../../oneui/react/Text";
import { contrast, fmt, tekstOp } from "../../lib/contrast";
import { ladders, los, semantic, token } from "../../lib/tokens";
import { Pagina, Regels, Sectie } from "../Pagina";

const INKT = String(token("slate/950")?.waarde ?? "#2a2824");

const ROLLEN: { rol: string; ladder: string; gebruik: string }[] = [
  { rol: "magenta", ladder: "magenta", gebruik: "Merkmomenten." },
  { rol: "sky", ladder: "sky", gebruik: "De interface: knoppen, focus en wat actief is (action). Ook rustige vlakken en links." },
  { rol: "amber", ladder: "amber", gebruik: "Warmte, uitlichten. Loopt van geel via goud naar terracotta." },
  { rol: "violet", ladder: "violet", gebruik: "Tweede accent: dromen, verdieping, een vierde hoofdstukkleur." },
  { rol: "neutral", ladder: "slate", gebruik: "Tekst, randen, achtergronden." },
  { rol: "informative", ladder: "sky", gebruik: "Informatieve meldingen." },
  { rol: "positive", ladder: "green", gebruik: "Gelukt, goed." },
  { rol: "negative", ladder: "red", gebruik: "Fout, verwijderen." },
  { rol: "warning", ladder: "orange", gebruik: "Let op." },
];

const GROEPEN: [string, string[], string][] = [
  ["Merk", ["magenta", "sky", "amber", "violet"], "De vier merkkleuren."],
  ["Neutraal", ["slate"], "Slate is de neutrale kleur van het merk, met een warme ondertoon."],
  ["Signaal", ["green", "red", "orange"], "Alleen voor meldingen en status."],
];

function Staal({ hex, stap, naam }: { hex: string; stap: string; naam: string }) {
  const op = tekstOp(hex, INKT);
  return (
    <div className="staal" style={{ background: hex, color: op }} title={naam}>
      <span className="stap">{stap}</span>
      <span className="hex">{hex.toUpperCase()}</span>
      <span className="ratio">wit {fmt(contrast(hex, "#ffffff"))}<br />inkt {fmt(contrast(hex, INKT))}</span>
    </div>
  );
}

function Ladder({ naam, rol }: { naam: string; rol?: string }) {
  const l = ladders()[naam];
  return (
    <div className="ladder">
      <div className="laddernaam">
        <Text as="span" variant="heading-m">{naam}</Text>
        {rol && <Text as="span" variant="body-m" color="low">{rol}</Text>}
      </div>
      <div className="stalen">{l.map(s => <Staal key={s.stap} {...s} />)}</div>
    </div>
  );
}

export function Swatch({ waarde }: { waarde: unknown }) {
  const { waarde: hex, keten } = los(waarde);
  return (
    <span className="regelstaal">
      <i style={{ background: hex }} />
      <span>
        <code>{keten[0] ?? hex}</code>
        {keten.length > 1 && <code className="laag"> → {keten.slice(1).join(" → ")}</code>}
        {keten.length > 0 && <code className="laag"> · {hex.toUpperCase()}</code>}
      </span>
    </span>
  );
}

function Semantisch() {
  const groepen = useMemo(() => {
    const g: Record<string, typeof semantic> = {};
    for (const t of semantic) if (t.type === "color") (g[t.naam.split("/")[0]] ||= []).push(t);
    return g;
  }, []);
  const namen = Object.keys(groepen);
  const [open, setOpen] = useState(namen[0]);
  const UITLEG: Record<string, string> = {
    surface: "Vlakken: de pagina, kaarten, en gekleurde vlakken per rol (subtle, bold, deep).",
    text: "Tekstkleuren, van high (belangrijk) tot low, plus tekst op gekleurde vlakken.",
    icon: "Iconen. Meestal gelijk aan de tekst ernaast.",
    stroke: "Twee lijnen: low voor een scheidingslijn, medium voor een vorm die 3:1 moet halen. Componenten hebben geen randen.",
    interaction: "Focus en selectie.",
    effect: "De kleuren van schaduwen (zie Elevation).",
  };
  return (
    <>
      <div className="tabs" role="tablist">
        {namen.map(n => (
          <button key={n} role="tab" aria-selected={open === n} className={open === n ? "aan" : ""} onClick={() => setOpen(n)}>
            {n} <span className="aantal">{groepen[n].length}</span>
          </button>
        ))}
      </div>
      <Text variant="body-m" color="medium" className="tabuitleg">{UITLEG[open]}</Text>
      <div className="tabel-scroll">
        <table className="tabel">
          <thead><tr><th>Token</th><th>Licht</th><th>Donker</th><th>Op subtle</th></tr></thead>
          <tbody>
            {groepen[open].map(t => (
              <tr key={t.naam}>
                <td><code>{t.naam}</code></td>
                <td><Swatch waarde={t.waarde} /></td>
                <td><Swatch waarde={t.donker ?? t.waarde} /></td>
                <td>{t.opSubtle ? <><Swatch waarde={t.opSubtle.light} /><br /><Swatch waarde={t.opSubtle.dark} /></> : <Text as="span" variant="body-m" color="low">gelijk</Text>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Drie() {
  const rij = [["magenta", "magenta"], ["sky", "sky"], ["amber", "amber"], ["violet", "violet"]];
  const hex = (n: string) => los(token(n)?.waarde).waarde;
  return (
    <div className="drie">
      {rij.map(([rol, ladder]) => {
        const subtle = hex(`surface/${rol}/subtle`), bold = hex(`surface/${rol}/bold`), deep = hex(`surface/${rol}/deep`) ?? los(`{${ladder}/950}`).waarde;
        const opSubtle = hex(`text/on-subtle/${rol}`), opBold = hex(`text/on-bold/${rol}`) ?? hex("text/on-bold"), opDeep = hex("text/on-deep");
        const vlak = (naam: string, bg: string, fg: string) => (
          <div className="drievlak" style={{ background: bg, color: fg }}>
            <Text as="span" variant="body-m" style={{ color: fg }}>{naam}</Text>
            <code style={{ color: fg }}>{bg.toUpperCase()}</code>
          </div>
        );
        return (
          <div key={rol} className="drierol">
            <Text as="span" variant="heading-m">{rol}</Text>
            <div className="drierij">{vlak("Subtle", subtle, opSubtle)}{vlak("Bold", bold, opBold)}{vlak("Deep", deep, opDeep)}</div>
            <Text variant="body-m" color="medium">Bold op subtle {fmt(contrast(bold, subtle))}:1 · bold op deep {fmt(contrast(bold, deep))}:1 · tekst op deep {fmt(contrast(opDeep, deep))}:1</Text>
          </div>
        );
      })}
    </div>
  );
}

export function Colours() {
  const voorbeeld = token("surface/action/primary");
  return (
    <Pagina intro="Vier merkkleuren, elk een ladder van 50 tot 950, plus slate als neutraal en drie signaalkleuren. Elke stap heeft in elke ladder dezelfde lichtheid: sky/600 gedraagt zich qua contrast hetzelfde als magenta/600.">
      <Sectie titel="Twee lagen" uitleg="Een component kiest nooit zelf een kleur uit een ladder. Het gebruikt een semantisch token, dat naar een ladder wijst. Zo kan een kleur op één plek veranderen.">
        <div className="lagen">
          <div className="vak"><Text variant="body-m" color="low">1 · Primitives</Text><Text variant="heading-m">De ladders</Text><Text variant="body-m" color="medium">Ruwe kleuren: <code>magenta/600</code>. Alleen voor illustraties, slides en het maken van tokens.</Text></div>
          <div className="vak"><Text variant="body-m" color="low">2 · Semantic</Text><Text variant="heading-m">Wat het doet, of welke kleur</Text><Text variant="body-m" color="medium">Een functie (<code>surface/action/primary</code>, <code>text/high</code>, <code>surface/negative/subtle</code>) of een kleur (<code>surface/sky/bold</code>), in licht en donker. Dit gebruiken componenten.</Text></div>
        </div>
        {voorbeeld && (
          <div className="keten">
            <Text variant="body-m" color="medium">Voorbeeld: de primaire knop</Text>
            <Swatch waarde={`{surface/action/primary}`} />
          </div>
        )}
      </Sectie>

      <Sectie titel="Kleuren" uitleg="Welke ladder waarvoor is.">
        <div className="rollen">
          {ROLLEN.map(r => {
            const l = ladders()[r.ladder];
            return (
              <div key={r.rol} className="rol">
                <div className="rolstrook">{l.map(s => <i key={s.stap} style={{ background: s.hex }} />)}</div>
                <div>
                  <Text as="span" variant="heading-m">{r.rol}</Text>{r.ladder !== r.rol && <> <Text as="span" variant="body-m" color="low">{r.ladder}</Text></>}
                  <Text variant="body-m" color="medium">{r.gebruik}</Text>
                </div>
              </div>
            );
          })}
        </div>
      </Sectie>

      <Sectie titel="Ladders" uitleg={<>Per stap het contrast met wit en met inkt (<code>slate/950</code>). Tekst heeft minstens 4,5 nodig, iconen en randen 3. Stap 600 is de eerste waarop witte tekst kan.</>}>
        {GROEPEN.map(([titel, ls, uitleg]) => (
          <div key={titel} className="laddergroep">
            <Text as="h3" variant="heading-m">{titel}</Text>
            <Text variant="body-m" color="medium">{uitleg}</Text>
            {ls.map(l => <Ladder key={l} naam={l} rol={ROLLEN.filter(r => r.ladder === l && r.rol !== l).map(r => r.rol).join(", ") || undefined} />)}
          </div>
        ))}
      </Sectie>

      <Sectie titel="Subtle, bold en deep" uitleg="Per merkkleur drie stappen: subtle is licht pastel, bold is fel, deep is donker. Elk vlak met de tekstkleur die erop hoort.">
        <Drie />
      </Sectie>

      <Sectie titel="Semantische tokens" uitleg="Wat componenten gebruiken, per soort. Rechts zie je waar elk token naartoe wijst, in licht en donker, en op een vlak van stap 100 (de pagina, een subtle vlak): daar schuift het een stap op (data-ondergrond, besluit 009).">
        <Semantisch />
      </Sectie>

      <Sectie titel="Regels">
        <Regels items={[
          <><b>Gebruik semantische tokens.</b> Primitives alleen in illustraties, slides en de definitie van tokens zelf.</>,
          <><b>Tekst op een vol merkvlak:</b> wit op magenta en violet, antraciet (slate/950) op sky en amber. De tokens text/on-bold regelen dit.</>,
          <><b>Eén ding in de contrastkleur.</b> Op een gekleurd vlak krijgt alleen het belangrijkste element de diepe tint van dezelfde familie.</>,
          <><b>Contrast:</b> tekst minstens 4,5:1, iconen en randen 3:1. Alle tekstparen worden in licht en donker gecontroleerd.</>,
          <><b>Bold op magenta deep</b> haalt 3,2:1: alleen voor tekst vanaf 24 px.</>,
        ]} />
      </Sectie>
    </Pagina>
  );
}


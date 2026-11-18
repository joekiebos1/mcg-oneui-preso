import { useMemo, useState } from "react";
import { Text } from "../../oneui/react/Text";
import { contrast, fmt, tekstOp } from "../../lib/contrast";
import { ladders, los, semantic, token } from "../../lib/tokens";
import { Pagina, Regels, Sectie } from "../Pagina";

const INKT = String(token("slate/950")?.waarde ?? "#2a2824");

const ROLLEN: { rol: string; ladder: string; gebruik: string }[] = [
  { rol: "primary", ladder: "magenta", gebruik: "Primaire knop, focus, merkmomenten." },
  { rol: "secondary", ladder: "sky", gebruik: "Rustige vlakken, links, ondersteunende accenten." },
  { rol: "accent", ladder: "amber", gebruik: "Warmte, uitlichten. Loopt van geel via goud naar terracotta." },
  { rol: "accent-2", ladder: "violet", gebruik: "Tweede accent: dromen, verdieping, een vierde hoofdstukkleur." },
  { rol: "neutral", ladder: "slate", gebruik: "Tekst, randen, achtergronden." },
  { rol: "informative", ladder: "sky", gebruik: "Informatieve meldingen. Sky is dus ook secondary." },
  { rol: "positive", ladder: "green", gebruik: "Gelukt, goed." },
  { rol: "negative", ladder: "red", gebruik: "Fout, verwijderen." },
  { rol: "warning", ladder: "orange", gebruik: "Let op." },
];

const GROEPEN: [string, string[], string][] = [
  ["Merk", ["magenta", "sky", "amber", "violet"], "De vier merkkleuren."],
  ["Neutraal", ["slate", "grey"], "Slate is de neutrale kleur van het merk, met een warme ondertoon. Grey heeft geen rol."],
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
        <Text as="span" variant="title-s">{naam}</Text>
        {rol && <Text as="span" variant="body-s" color="low">{rol}</Text>}
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
        <Text as="span" variant="body-s">{keten[0] ?? hex}</Text>
        {keten.length > 1 && <Text as="span" variant="body-xs" color="low"> → {keten.slice(1).join(" → ")}</Text>}
        {keten.length > 0 && <Text as="span" variant="body-xs" color="low"> · {hex.toUpperCase()}</Text>}
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
    stroke: "Randen en lijnen.",
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
          <thead><tr><th>Token</th><th>Licht</th><th>Donker</th></tr></thead>
          <tbody>
            {groepen[open].map(t => (
              <tr key={t.naam}>
                <td><code>{t.naam}</code></td>
                <td><Swatch waarde={t.waarde} /></td>
                <td><Swatch waarde={t.donker ?? t.waarde} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Deep() {
  const rij = [["primary", "magenta"], ["secondary", "sky"], ["accent", "amber"], ["accent-2", "violet"]];
  return (
    <div className="deeps">
      {rij.map(([rol, ladder]) => {
        const deep = los(`{${ladder}/950}`).waarde;
        const bold = los(token(`surface/${rol}/bold`)?.waarde).waarde;
        return (
          <div key={rol} className="deep" style={{ background: deep }}>
            <Text as="span" variant="label-m" style={{ color: bold }}>{rol}</Text>
            <Text as="span" variant="heading-m" style={{ color: "#fff" }}>{ladder}/950</Text>
            <span className="bold" style={{ background: bold }} />
            <Text as="span" variant="body-xs" style={{ color: los(`{${ladder}/200}`).waarde }}>
              bold ernaast {fmt(contrast(deep, bold))}:1 · wit erop {fmt(contrast(deep, "#ffffff"))}:1
            </Text>
          </div>
        );
      })}
    </div>
  );
}

export function Colours() {
  const voorbeeld = token("surface/primary/bold");
  return (
    <Pagina intro="Vier merkkleuren, elk een ladder van 50 tot 950, plus slate als neutraal en drie signaalkleuren. Elke stap heeft in elke ladder dezelfde lichtheid: sky/600 gedraagt zich qua contrast hetzelfde als magenta/600.">
      <Sectie titel="Drie lagen" uitleg="Een component kiest nooit zelf een kleur uit een ladder. Het gebruikt een semantisch token, dat via de brand-laag naar een ladder wijst. Zo kan een kleur op één plek veranderen.">
        <div className="lagen">
          <div className="vak"><Text variant="label-m" color="low">1 · Primitives</Text><Text variant="title-s">De ladders</Text><Text variant="body-s" color="medium">Ruwe kleuren: <code>magenta/600</code>. Alleen voor illustraties, slides en het maken van tokens.</Text></div>
          <div className="vak"><Text variant="label-m" color="low">2 · Brand</Text><Text variant="title-s">Een ladder per rol</Text><Text variant="body-s" color="medium"><code>brand/primary/600</code>. Classic en Round hebben dezelfde kleuren.</Text></div>
          <div className="vak"><Text variant="label-m" color="low">3 · Semantic</Text><Text variant="title-s">Wat het doet</Text><Text variant="body-s" color="medium"><code>surface/primary/bold</code>, in licht en donker. Dit gebruiken componenten.</Text></div>
        </div>
        {voorbeeld && (
          <div className="keten">
            <Text variant="body-s" color="medium">Voorbeeld: de primaire knop</Text>
            <Swatch waarde={`{surface/primary/bold}`} />
          </div>
        )}
      </Sectie>

      <Sectie titel="Rollen" uitleg="Elke rol hoort bij één ladder.">
        <div className="rollen">
          {ROLLEN.map(r => {
            const l = ladders()[r.ladder];
            return (
              <div key={r.rol} className="rol">
                <div className="rolstrook">{l.map(s => <i key={s.stap} style={{ background: s.hex }} />)}</div>
                <div>
                  <Text as="span" variant="title-s">{r.rol}</Text> <Text as="span" variant="body-s" color="low">{r.ladder}</Text>
                  <Text variant="body-s" color="medium">{r.gebruik}</Text>
                </div>
              </div>
            );
          })}
        </div>
      </Sectie>

      <Sectie titel="Ladders" uitleg={<>Per stap het contrast met wit en met inkt (<code>slate/950</code>). Tekst heeft minstens 4,5 nodig, iconen en randen 3. Stap 600 is de eerste waarop witte tekst kan.</>}>
        {GROEPEN.map(([titel, ls, uitleg]) => (
          <div key={titel} className="laddergroep">
            <Text as="h3" variant="title-m">{titel}</Text>
            <Text variant="body-s" color="medium">{uitleg}</Text>
            {ls.map(l => <Ladder key={l} naam={l} rol={ROLLEN.filter(r => r.ladder === l).map(r => r.rol).join(", ") || undefined} />)}
          </div>
        ))}
      </Sectie>

      <Sectie titel="Deep" uitleg="De donkerste stap (950) van elke merkkleur, als donkere achtergrond of naast bold. In licht en donker thema gelijk. Tekst erop is wit.">
        <Deep />
      </Sectie>

      <Sectie titel="Semantische tokens" uitleg="Wat componenten gebruiken, per soort. Rechts zie je waar elk token naartoe wijst, in licht en donker.">
        <Semantisch />
      </Sectie>

      <Sectie titel="Regels">
        <Regels items={[
          <><b>Gebruik semantische tokens.</b> Primitives alleen in illustraties, slides en de definitie van tokens zelf.</>,
          <><b>Tekst op een vol merkvlak:</b> wit op magenta en violet, antraciet (slate/950) op sky en amber. De tokens text/on-bold regelen dit.</>,
          <><b>Eén ding in de contrastkleur.</b> Op een gekleurd vlak krijgt alleen het belangrijkste element de diepe tint van dezelfde familie.</>,
          <><b>Contrast:</b> tekst minstens 4,5:1, iconen en randen 3:1. Alle tekstparen worden voor beide brands in licht en donker gecontroleerd.</>,
          <><b>Bold op magenta deep</b> haalt 3,2:1: alleen voor tekst vanaf 24 px.</>,
        ]} />
      </Sectie>
    </Pagina>
  );
}


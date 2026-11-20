// De pagina Kleuren als verhaal (eigenaar 2026-11-20): een beeld, de vier merkkleuren, hoe het werkt, welke kleur je pakt,
// licht en donker, doen en niet doen, en de ladders. Alle tokens en de regels staan op /kleuren/tokens.
import { Link } from "react-router-dom";
import { Text } from "../../oneui/react/Text";
import { Button } from "../../oneui/react/Button";
import { Checkbox } from "../../oneui/react/Checkbox";
import { Toggle } from "../../oneui/react/Toggle";
import { ladders, los, token } from "../../lib/tokens";
import { Pagina, Sectie } from "../Pagina";
import { Bij, Oordeel, Vak } from "../verhaal";
import held from "../../assets/kleuren-held.webp";

// De vier merkkleuren als deep, bold en een lichte stap; de uitleg komt uit de kleurregels van mcg-oneui.
const MERK: { naam: string; familie: string; uitleg: string }[] = [
  { naam: "Magenta", familie: "magenta", uitleg: "Merkmomenten." },
  { naam: "Sky", familie: "sky", uitleg: "De interface: knoppen, focus en wat actief is." },
  { naam: "Amber", familie: "amber", uitleg: "Warmte, uitlichten." },
  { naam: "Violet", familie: "violet", uitleg: "Tweede accent: dromen, verdieping." },
];

// Welke kleur pak ik: een keuze uit de rollen; de waarden komen uit tokens.json.
const KIES: [string, string][] = [
  ["Hoofdactie", "surface/action/primary"],
  ["Andere actie", "surface/action/secondary"],
  ["Neutrale actie", "surface/action/neutral"],
  ["Tekst", "text/high"],
  ["Bijzaak", "text/low"],
  ["Pagina", "surface/page"],
  ["Kaart", "surface/default"],
  ["Veld", "surface/sunken"],
  ["Gelukt", "surface/positive/bold"],
  ["Fout", "surface/negative/bold"],
  ["Let op", "surface/warning/bold"],
];

const hex = (naam: string) => los(`{${naam}}`).waarde;
/** de stap op de ladder waar een rol in licht of donker naartoe wijst */
const stap = (w: unknown) => { const k = los(w).keten; return k[k.length - 1] ?? String(w); };
const css = (naam: string) => `var(--oneui-${naam.replace(/\//g, "-").toLowerCase()})`;

function Proef() {
  return (
    <div className="proef">
      <div className="proefrij"><Button variant="secondary" size="sm">Later</Button><Button variant="primary" size="sm">Opslaan</Button></div>
      <div className="proefrij"><Checkbox label="Aan" defaultChecked /><Toggle label="Aan" defaultChecked /></div>
    </div>
  );
}

export function Kleuren() {
  const l = ladders();
  return (
    <Pagina klasse="verhaal" intro="Vier merkkleuren, een warm neutraal en drie signaalkleuren. Elke kleur is een ladder van 50 tot 950, en dezelfde stap is in elke ladder even licht.">
      <div className="held"><img src={held} alt="" /></div>

      <Sectie titel="Merkkleuren">
        <div className="raster r4">
          {MERK.map((m) => (
            <div key={m.naam}>
              {/* deep als grond, bold als stip, de naam in een lichte stap: vaste kleuren, in licht en donker gelijk */}
              <Vak className="merktegel" style={{ background: hex(`${m.familie}/950`) }}>
                <span className="merkstip" style={{ background: css(`surface/${m.familie}/bold`) }} />
                <Text as="span" variant="heading-m" className="merknaam" style={{ color: hex(`${m.familie}/200`) }}>{m.naam}</Text>
              </Vak>
              <div className="bij"><Text variant="body-m" color="medium">{m.uitleg}</Text></div>
            </div>
          ))}
        </div>
      </Sectie>

      <Sectie titel="Hoe het werkt" uitleg="Een component kiest nooit zelf een kleur uit een ladder. Het vraagt om een rol, en de rol wijst naar de ladder. Zo verandert een kleur op één plek.">
        <div className="raster r3">
          <div><Vak><span className="bolvlak" style={{ background: hex("sky/700") }} /></Vak><Bij titel="1 · Ladder"><code>sky/700</code></Bij></div>
          <div><Vak><span className="rolvlak" style={{ background: css("surface/action/primary") }} /></Vak><Bij titel="2 · Rol"><code>surface/action/primary</code></Bij></div>
          <div><Vak><Button variant="primary" size="md">Afspraak maken</Button></Vak><Bij titel="3 · Component">Button</Bij></div>
        </div>
      </Sectie>

      <Sectie titel="Welke kleur pak ik?">
        <div className="tabel-scroll">
          <table className="tabel vlak">
            <thead><tr><th>Voor</th><th>Rol</th><th>Licht</th><th>Donker</th></tr></thead>
            <tbody>
              {KIES.map(([voor, rol]) => {
                const t = token(rol);
                if (!t) return null;
                return (
                  <tr key={rol}>
                    <td>{voor}</td>
                    <td><span className="regelstaal"><i style={{ background: css(rol) }} /><code>{rol}</code></span></td>
                    <td><code>{stap(t.waarde)}</code></td>
                    <td><code>{stap(t.donker ?? t.waarde)}</code></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Sectie>

      <Sectie titel="Licht en donker" uitleg="Dezelfde rollen, gespiegeld: wat in licht donker is, is in donker licht.">
        <div className="raster r2">
          <div><Vak data-theme="light"><Proef /></Vak><Bij titel="Licht">Primary donker sky, secondary licht sky.</Bij></div>
          <div><Vak className="donker" data-theme="dark"><Proef /></Vak><Bij titel="Donker">Andersom: primary licht, secondary donker.</Bij></div>
        </div>
      </Sectie>

      <Sectie titel="Op een andere ondergrond" uitleg="Staat een component direct op de grijze pagina, dan schuift het één stap op, zodat het blijft opvallen. Op een witte kaart springt het terug.">
        <Link to="/surfaces#ondergrond" className="verder"><Text as="span" variant="body-m">Zo werkt de ondergrond, op Surfaces →</Text></Link>
      </Sectie>

      <Sectie titel="Doen en niet doen">
        <div className="raster r2">
          <div><Vak><div className="proef"><Button variant="primary" size="md">Opslaan</Button><code>surface/action/primary</code></div></Vak><Oordeel goed /><Bij titel="Een rol in een component">Dan klopt hij in licht, donker en op subtle.</Bij></div>
          <div><Vak><div className="proef"><Button variant="primary" size="md">Opslaan</Button><code>sky/700</code></div></Vak><Oordeel goed={false} /><Bij titel="Geen ladder in een component">Ladders zijn voor illustraties en slides.</Bij></div>
          <div><Vak className="merkmoment"><Text variant="heading-m" className="merkmoment-tekst">Rust in je hoofd</Text></Vak><Oordeel goed /><Bij titel="Magenta voor een merkmoment">Een cover, een kop, een illustratie.</Bij></div>
          <div><Vak><span className="nepknop"><Text as="span" variant="body-m">Opslaan</Text></span></Vak><Oordeel goed={false} /><Bij titel="Geen magenta op een knop">Knoppen zijn sky.</Bij></div>
        </div>
      </Sectie>

      <Sectie titel="Alle ladders" uitleg="Voor illustraties en slides.">
        <div className="held licht">
          <div className="ladderrij">
            {["magenta", "sky", "amber", "violet", "slate", "green", "red", "orange"].map((n) => (
              <div key={n} className="strook" title={n}>{l[n]?.map((s) => <i key={s.stap} style={{ background: s.hex }} title={`${s.naam} · ${s.hex.toUpperCase()}`} />)}</div>
            ))}
          </div>
        </div>
        <Link to="/kleuren/tokens" className="verder"><Text as="span" variant="body-m">Alle tokens, met hun waarde in licht, donker en op subtle →</Text></Link>
      </Sectie>
    </Pagina>
  );
}

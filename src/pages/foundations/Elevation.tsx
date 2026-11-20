import { Text } from "../../oneui/react/Text";
import { Pagina, Regels, Sectie } from "../Pagina";
import { Bij, Vak } from "../verhaal";

// Uit DS Foundations in Figma (effect styles elevation/1–4), 2026-11-18. Nog niet in tokens.json: de kleuren wel
// (effect/shadow-key en effect/shadow-ambient), de vormen niet.
const NIVEAUS = [
  { n: 1, ambient: [0, 1, 3], key: [0, 1, 2] },
  { n: 2, ambient: [0, 4, 8], key: [0, 2, 4] },
  { n: 3, ambient: [0, 8, 16], key: [0, 4, 8] },
  { n: 4, ambient: [0, 16, 32], key: [0, 8, 16] },
];
const schaduw = (a: number[], k: number[]) =>
  `${a[0]}px ${a[1]}px ${a[2]}px var(--oneui-effect-shadow-ambient), ${k[0]}px ${k[1]}px ${k[2]}px var(--oneui-effect-shadow-key)`;

export function Elevation() {
  return (
    <Pagina intro="Schaduw laat zien dat een vlak boven de pagina ligt. Elk niveau bestaat uit twee schaduwen: een zachte, brede (ambient) en een kortere, donkerdere (key).">
      <Sectie titel="Niveaus" uitleg="Deze vier staan in Figma. In de code staan alleen de twee schaduwkleuren; de niveaus zelf moeten er nog in.">
        <div className="raster r4">
          {NIVEAUS.map(x => (
            <div key={x.n}>
              <Vak><div className="niveaukaart" data-ondergrond="default" style={{ boxShadow: schaduw(x.ambient, x.key) }} /></Vak>
              <Bij titel={<code>elevation/{x.n}</code>}>ambient y{x.ambient[1]} blur {x.ambient[2]} · key y{x.key[1]} blur {x.key[2]}</Bij>
            </div>
          ))}
        </div>
      </Sectie>
      <Sectie titel="Regels">
        <Regels items={[
          "In het donkere thema zijn de schaduwen sterker (key 36% in plaats van 10%), want op een donkere pagina zie je ze anders niet.",
        ]} />
      </Sectie>
    </Pagina>
  );
}

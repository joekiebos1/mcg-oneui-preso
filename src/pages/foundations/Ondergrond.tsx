// Ondergrond (Surfaces): componenten schuiven een stap op als ze direct op de grijze pagina staan (mcg-oneui besluit 009 en
// 012). Het voorbeeld is echt: links een witte kaart (data-ondergrond="default"), rechts direct op de pagina.
import { Text } from "../../oneui/react/Text";
import { Button } from "../../oneui/react/Button";
import { Checkbox } from "../../oneui/react/Checkbox";
import { Toggle } from "../../oneui/react/Toggle";
import { Input } from "../../oneui/react/Input";
import { doc, linkVoor } from "../../lib/docs";
import { Blokken, delen } from "../../lib/markdown";
import { los, token } from "../../lib/tokens";
import { Pagina, Sectie } from "../Pagina";

// De rollen die een component van uiterlijk doen veranderen; de waarden komen uit tokens.json.
const ROLLEN = ["surface/action/secondary", "surface/action/neutral", "surface/sunken", "text/low", "surface/sky/subtle"];
const stap = (w: unknown) => { const k = los(w).keten; return k[k.length - 1] ?? String(w); };

function Set() {
  return (
    <div className="proef">
      <div className="proefrij"><Button variant="secondary" size="sm">Later</Button><Button variant="neutral" size="sm">Annuleer</Button></div>
      <div className="proefrij"><Checkbox label="Uit" /><Toggle label="Uit" /></div>
      <Input label="Naam" placeholder="Je naam" size="sm" />
    </div>
  );
}

export function Ondergrond() {
  const md = doc("docs/kleur.md") ?? "";
  const uitleg = delen(md).find((d) => d.kop === "Ondergrond: op subtle")?.blokken ?? [];
  return (
    <Pagina intro="De pagina is zelf een licht vlak. Wat er direct op staat, schuift één stap op, zodat het blijft opvallen. Op een witte kaart springt het terug.">
      <Sectie titel="Zo ziet het eruit">
        <div className="raster r2">
          <div>
            <div className="kaartvak" data-ondergrond="subtle">
              <div className="kaartje" data-ondergrond="default"><Set /></div>
            </div>
            <div className="bij"><Text variant="body-m">Op een witte kaart</Text><Text variant="body-m" color="medium">De gewone waarden.</Text></div>
          </div>
          <div>
            <div className="kaartvak" data-ondergrond="subtle"><Set /></div>
            <div className="bij"><Text variant="body-m">Direct op de pagina</Text><Text variant="body-m" color="medium">Alles één stap dieper.</Text></div>
          </div>
        </div>
      </Sectie>

      <Sectie titel="Wat er verschuift">
        <div className="tabel-scroll">
          <table className="tabel vlak">
            <thead><tr><th>Rol</th><th>Op wit</th><th>Op de pagina</th></tr></thead>
            <tbody>
              {ROLLEN.map((r) => {
                const t = token(r);
                if (!t) return null;
                return <tr key={r}><td><code>{r}</code></td><td><code>{stap(t.waarde)}</code></td><td><code>{stap(t.opSubtle?.light ?? t.waarde)}</code></td></tr>;
              })}
            </tbody>
          </table>
        </div>
      </Sectie>

      <Sectie titel="In code en Figma">
        <Blokken blokken={uitleg} link={linkVoor("")} />
      </Sectie>
    </Pagina>
  );
}

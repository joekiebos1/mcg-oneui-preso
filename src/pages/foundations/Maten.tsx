import type { CSSProperties } from "react";
import { Text } from "../../oneui/react/Text";
import { maten } from "../../lib/tokens";
import { Pagina, Regels, Sectie } from "../Pagina";

type Groep = "spacing" | "radius" | "border" | "size";

const TEKST: Record<Groep, { intro: string; regels: string[] }> = {
  spacing: {
    intro: "Eén schaal voor alle afstanden: tussen elementen, binnen een vlak, rond een kop. Een waarde die er niet in staat, gebruiken we niet.",
    regels: [
      "Tot md gaat de schaal per 2 of 4 px, daarna in grotere stappen: kleine verschillen tellen alleen dichtbij.",
      "Ruimte rond een kop regel je met spacing, niet met regelhoogte: koppen zijn getrimd tot cap height.",
    ],
  },
  radius: {
    intro: "De afronding van hoeken, van scherp tot helemaal rond.",
    regels: [
      "Knoppen zijn helemaal rond (full).",
      "Een waarde die niet in de schaal staat, gebruiken we niet.",
    ],
  },
  border: {
    intro: "Drie diktes voor randen en lijnen.",
    regels: [
      "Randen en lijnen hebben minstens 3:1 contrast met de achtergrond.",
    ],
  },
  size: {
    intro: "Vaste hoogtes voor besturingselementen en iconen, zodat knoppen, velden en tabs naast elkaar op één lijn staan.",
    regels: [
      "Knoppen: sm 36, md 40, lg 48. Het icoon in de knop groeit mee: 16, 20, 24.",
    ],
  },
};

function Voorbeeld({ groep, css, px }: { groep: Groep; css: string; px: number }) {
  const v = `var(${css})`;
  const st: Record<Groep, CSSProperties> = {
    spacing: { width: v, height: 24 },
    radius: { borderRadius: v },
    border: { borderWidth: v },
    size: { width: v, height: v },
  };
  if (groep === "spacing" && px === 0) return <span className="maat-leeg">—</span>;
  return <span className={"maatvoorbeeld " + groep} style={st[groep]} />;
}

export function Maten({ groep }: { groep: Groep }) {
  const lijst = maten(groep);
  return (
    <Pagina intro={TEKST[groep].intro}>
      <Sectie titel="Schaal">
        <div className="maten">
          {lijst.map(m => (
            <div key={m.naam} className="maat">
              <div className="maatnaam">
                <Text as="span" variant="label-m">{m.naam}</Text>
                <Text as="span" variant="body-s" color="low">{m.px >= 9999 ? "rond" : m.waarde}</Text>
              </div>
              <div className="maatbeeld"><Voorbeeld groep={groep} css={m.css} px={m.px} /></div>
              <code className="maatcode">{groep}/{m.naam}</code>
            </div>
          ))}
        </div>
      </Sectie>
      <Sectie titel="Regels"><Regels items={TEKST[groep].regels} /></Sectie>
    </Pagina>
  );
}

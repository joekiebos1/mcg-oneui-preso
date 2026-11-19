import { useLayoutEffect, useRef, useState } from "react";
import { Text, type TextStyle } from "../../oneui/react/Text";
import { useOmgeving } from "../../lib/omgeving";
import { typografie } from "../../lib/tokens";
import { Pagina, Regels, Sectie } from "../Pagina";

const ROLLEN: Record<string, { doet: string; zin: string }> = {
  display: { doet: "Merkmoment: covers, slides, paginatitels.", zin: "Rust in je hoofd" },
  heading: { doet: "Structuur in de app: koppen boven een deel van de pagina.", zin: "Jouw week in beeld" },
  title: { doet: "De naam van een onderdeel: een kaart, een dialoog.", zin: "Sessie met je behandelaar" },
  body: { doet: "Lopende tekst.", zin: "Je brein kiest voor wat nu beloont. Dat is geen luiheid; het is hoe aandacht werkt." },
  label: { doet: "Knoppen, velden, tabs.", zin: "Afspraak maken" },
};

function Specimen({ rol, maat }: { rol: string; maat: string }) {
  const ref = useRef<HTMLElement>(null);
  const { thema } = useOmgeving();
  const [m, setM] = useState("");
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const meet = () => {
      const c = getComputedStyle(el);
      const fam = c.fontFamily.split(",")[0].replace(/"/g, "").replace(/ Variable$/, "");
      const ls = parseFloat(c.letterSpacing); const fs = parseFloat(c.fontSize);
      const pct = isNaN(ls) ? 0 : Math.round((ls / fs) * 1000) / 10;
      setM(`${fam} · ${c.fontWeight} · ${Math.round(parseFloat(c.fontSize))}/${Math.round(parseFloat(c.lineHeight))} · ${String(pct).replace(".", ",")}%`);
    };
    meet(); document.fonts?.ready.then(meet);
  }, [thema]);
  const variant = `${rol}-${maat.toLowerCase()}` as TextStyle;
  return (
    <div className="specimen">
      <div className="specmeta">
        <Text as="span" variant="label-m">{rol}/{maat}</Text>
        <Text as="span" variant="body-xs" color="low">{m}</Text>
      </div>
      <Text ref={ref} as="p" variant={variant} className="spectekst">{ROLLEN[rol].zin}</Text>
    </div>
  );
}

export function Type() {
  return (
    <Pagina intro="Eén lettertype, vijf rollen, elk met een paar vaste maten. Kies een rol op wat de tekst doet, niet op hoe groot hij moet zijn.">
      <Sectie titel="Familie" uitleg="SIL Open Font License, zelf gehost.">
        <div className="vak familie">
          <Text variant="display-s">Google Sans Flex Rond</Text>
          <Text variant="body-s" color="medium">Google Sans Flex met rondheid 25 en breedte 90 vast in het lettertype. Display, heading en title 600, label 500, body 350: iets lichter dan normaal.</Text>
        </div>
      </Sectie>

      {Object.entries(typografie).map(([rol, maten]) => (
        <Sectie key={rol} titel={rol[0].toUpperCase() + rol.slice(1)} uitleg={ROLLEN[rol]?.doet}>
          <div className="specimens">
            {Object.keys(maten).map(maat => <Specimen key={maat} rol={rol} maat={maat} />)}
          </div>
        </Sectie>
      ))}

      <Sectie titel="Regels">
        <Regels items={[
          <><b>Maten groeien met vaste stappen:</b> +2 tot M, daarna +4 (body 16 → 20 → 24). Zo blijft XL groter dan L zonder in de kopmaten te komen.</>,
          <><b>Slides gebruiken XL en L, de app M en kleiner.</b> Er zijn geen aparte modes.</>,
          <><b>Letterafstand:</b> display en heading -2%, title -1%, body en label 0,5%.</>,
          <><b>Regelhoogte</b> per rol een vaste verhouding op het 4px-raster: display 1,1–1,2, heading ~1,3, title 1,25–1,4, body ~1,5, label ~1,4.</>,
          <><b>Display en heading staan op cap height tot baseline</b> (vertical trim). De ruimte rond een kop regel je met spacing.</>,
        ]} />
      </Sectie>
    </Pagina>
  );
}

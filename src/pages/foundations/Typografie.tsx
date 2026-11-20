// Typografie als verhaal (eigenaar 2026-11-20), zoals Kleuren: een beeld, de vijf rollen als vakken, alle maten, en de
// regels uit docs/typografie.md van mcg-oneui. De maten meet de pagina zelf aan de echte tekststijlen.
import { useLayoutEffect, useRef, useState } from "react";
import { Text, type TextStyle } from "../../oneui/react/Text";
import { useOmgeving } from "../../lib/omgeving";
import { typografie } from "../../lib/tokens";
import { Blokken, inline } from "../../lib/markdown";
import { Pagina, Sectie } from "../Pagina";
import { Bij, Vak, begin, blokken, tekst } from "../verhaal";

const PAD = "docs/typografie.md";

// Een voorbeeldzin per rol; geen regel, alleen tekst om te laten zien.
const ZIN: Record<string, string> = {
  display: "Rust in je hoofd",
  heading: "Jouw week in beeld",
  title: "Sessie met je behandelaar",
  body: "Je brein kiest voor wat nu beloont. Dat is geen luiheid; het is hoe aandacht werkt.",
  label: "Afspraak maken",
};

/** De tabel Rollen uit de docs: per rol het gewicht en wat hij doet. */
function rollen(): Record<string, { gewicht: string; doet: string }> {
  const t = blokken(PAD, "Rollen").find((b) => b.soort === "tabel");
  const uit: Record<string, { gewicht: string; doet: string }> = {};
  for (const r of t?.regels.slice(2) ?? []) {
    const c = r.split("|").slice(1, -1).map((x) => x.trim());
    if (c.length >= 3) uit[c[0]] = { gewicht: c[1], doet: c[2] };
  }
  return uit;
}

function Specimen({ rol, maat }: { rol: string; maat: string }) {
  const ref = useRef<HTMLElement>(null);
  const { thema } = useOmgeving();
  const [m, setM] = useState("");
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const meet = () => {
      const c = getComputedStyle(el);
      setM(`${Math.round(parseFloat(c.fontSize))}/${Math.round(parseFloat(c.lineHeight))}`);
    };
    meet(); document.fonts?.ready.then(meet);
  }, [thema]);
  return (
    <div className="specimen">
      <div className="specmeta">
        <code>{rol}/{maat}</code>
        <Text as="span" variant="body-m" color="low">{m}</Text>
      </div>
      <Text ref={ref} as="p" variant={`${rol}-${maat.toLowerCase()}` as TextStyle} className="spectekst">{ZIN[rol]}</Text>
    </div>
  );
}

export function Typografie() {
  const r = rollen();
  const link = () => null;
  const naRollen = blokken(PAD, "Rollen").filter((b) => b.soort !== "tabel");
  // de middelste maat van elke rol als voorbeeld in het vak
  const proef: Record<string, TextStyle> = { display: "display-s", heading: "heading-l", title: "title-l", body: "body-m", label: "label-l" };
  return (
    <Pagina intro={inline(tekst(begin(PAD)), link)}>
      <div className="held typeheld" data-ondergrond="subtle">
        <Text as="span" variant="display-xl" className="typeheld-aa">Aa</Text>
        <Text as="span" variant="heading-m">Google Sans Flex Rond</Text>
      </div>

      <Sectie titel="Vijf rollen">
        <div className="raster">
          {Object.keys(typografie).map((rol) => (
            <div key={rol}>
              <Vak className="breedvak"><Text as="p" variant={proef[rol]} className="spectekst">{ZIN[rol]}</Text></Vak>
              <Bij titel={rol[0].toUpperCase() + rol.slice(1)}>{r[rol] ? `${r[rol].doet[0].toUpperCase()}${r[rol].doet.slice(1)}. ${r[rol].gewicht}.` : null}</Bij>
            </div>
          ))}
        </div>
      </Sectie>

      <Sectie titel="Alle maten">
        <div className="specimens vlakgrijs">
          {Object.entries(typografie).flatMap(([rol, maten]) => Object.keys(maten).map((maat) => <Specimen key={rol + maat} rol={rol} maat={maat} />))}
        </div>
        <Blokken blokken={naRollen} />
      </Sectie>

      <Sectie titel="Regelhoogte"><Blokken blokken={blokken(PAD, "Regelhoogte")} /></Sectie>
      <Sectie titel="Vertical trim"><Blokken blokken={blokken(PAD, "Vertical trim")} /></Sectie>
    </Pagina>
  );
}

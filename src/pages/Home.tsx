import { Link } from "react-router-dom";
import { MENU } from "../menu";
import { Text } from "../oneui/react/Text";
import { Pagina, Sectie } from "./Pagina";

export function Home() {
  return (
    <Pagina titel="OneUI" intro="Het design system van Mental Care Group. Hier staan alle keuzes die erin zijn vastgelegd, zo dat je ze kunt lezen zonder Figma of code te openen.">
      <Sectie titel="Wat je hier vindt">
        <div className="tegels">
          {MENU.map(m => (
            <Link key={m.pad} to={m.kinderen?.[0]?.pad ?? m.pad} className={"tegel" + (m.klaar ? "" : " niet-klaar")}>
              <Text as="span" variant="title-m">{m.titel}</Text>
              <Text as="span" variant="body-s" color="medium">
                {m.kinderen ? m.kinderen.slice(0, 4).map((k) => k.titel).join(" · ") + (m.kinderen.length > 4 ? " …" : "") : "Nog niet vastgelegd"}
              </Text>
              {!m.klaar && <Text as="span" variant="label-s" color="low">Volgt</Text>}
            </Link>
          ))}
        </div>
      </Sectie>
      <Sectie titel="Twee brands, twee thema's" uitleg="Rechtsboven kies je de brand en het thema. Alles op deze site past zich aan, net als in de producten.">
        <div className="naast">
          <div className="vak">
            <Text variant="title-s">Classic</Text>
            <Text variant="body-s" color="medium">El Messiri voor koppen, DM Sans voor de interface. De standaard in code.</Text>
          </div>
          <div className="vak">
            <Text variant="title-s">Round</Text>
            <Text variant="body-s" color="medium">Google Sans Flex Rond voor alles. Dezelfde kleuren; alleen de letter verschilt.</Text>
          </div>
        </div>
      </Sectie>
    </Pagina>
  );
}

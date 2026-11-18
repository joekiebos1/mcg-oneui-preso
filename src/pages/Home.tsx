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
            <Link key={m.pad} to={m.pad} className={"tegel" + (m.klaar ? "" : " niet-klaar")}>
              <Text as="span" variant="title-m">{m.titel}</Text>
              <Text as="span" variant="body-s" color="medium">
                {{
                  Foundations: "Kleur, typografie, ruimte en vorm.",
                  Components: "De onderdelen van de interface, met hun varianten, instellingen en Mendix-route.",
                  Rules: "Product (de interface: schermen en flows) en content: de schrijfstijl, de illustratiestijl en de beeldtaal.",
                  Patterns: "Waar product en content samenkomen, zoals een video in een les of een illustratie in een leeg scherm.",
                  Decisions: "Waarom het systeem is zoals het is: de besluiten, met hun datum.",
                }[m.titel]}
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

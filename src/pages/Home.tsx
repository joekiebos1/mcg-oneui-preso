import { Link } from "react-router-dom";
import { GROEPEN } from "../menu";
import { Text } from "../oneui/react/Text";
import { Pagina, Sectie } from "./Pagina";

export function Home() {
  return (
    <Pagina titel="OneUI" intro="Het design system van Mental Care Group. Hier staan alle keuzes die erin zijn vastgelegd, zo dat je ze kunt lezen zonder Figma of code te openen.">
      <Sectie titel="Wat je hier vindt">
        <div className="tegels">
          {GROEPEN.map((g) => {
            const klaar = g.items.some((h) => h.klaar);
            return (
              <Link key={g.titel} to={g.items[0].pad} className={"tegel" + (klaar ? "" : " niet-klaar")}>
                <Text as="span" variant="title-m">{g.titel}</Text>
                <Text as="span" variant="body-s" color="medium">
                  {g.items.slice(0, 4).map((h) => h.titel).join(" · ") + (g.items.length > 4 ? " …" : "")}
                </Text>
                {!klaar && <Text as="span" variant="label-s" color="low">Volgt</Text>}
              </Link>
            );
          })}
        </div>
      </Sectie>
      <Sectie titel="Eén stijl, twee thema's" uitleg="Rechtsboven kies je licht of donker. Alles op deze site past zich aan, net als in de producten.">
        <div className="vak">
          <Text variant="title-s">Google Sans Flex Rond</Text>
          <Text variant="body-s" color="medium">Eén lettertype voor alles, met ronde uiteinden.</Text>
        </div>
      </Sectie>
    </Pagina>
  );
}

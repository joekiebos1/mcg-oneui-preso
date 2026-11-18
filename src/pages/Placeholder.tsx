import { Link, useLocation } from "react-router-dom";
import { vind } from "../menu";
import { Text } from "../oneui/react/Text";
import { Pagina } from "./Pagina";

export function Placeholder() {
  const plek = vind(useLocation().pathname);
  if (!plek) return <Pagina titel="Niet gevonden" intro={<>Deze pagina bestaat niet. <Link to="/">Naar het begin</Link>.</>} />;
  return (
    <Pagina>
      {plek.item.kinderen ? (
        <div className="tegels">
          {plek.item.kinderen.map(k => (
            <Link key={k.pad} to={k.pad} className="tegel">
              <Text as="span" variant="title-m">{k.titel}</Text>
              <Text as="span" variant="body-s" color="low">{k.klaar ? "Bekijken" : "Nog niet vastgelegd"}</Text>
            </Link>
          ))}
        </div>
      ) : (
        <div className="leeg-vak"><Text variant="body-m" color="medium">Nog niet vastgelegd. Deze pagina vullen we zodra de keuzes er zijn.</Text></div>
      )}
    </Pagina>
  );
}

import { Link } from "react-router-dom";
import { MENU } from "../../menu";
import { Text } from "../../oneui/react/Text";
import { Pagina } from "../Pagina";

const OVER: Record<string, string> = {
  Colours: "Vier merkkleuren, een neutraal en drie signaalkleuren, in twee lagen: primitives en semantic.",
  Type: "Eén lettertype, vijf rollen, van display tot label.",
  Spacing: "Eén schaal voor alle afstanden, van 2 tot 80 px.",
  Radius: "De afronding van hoeken, van scherp tot helemaal rond.",
  Border: "Drie diktes voor randen en lijnen.",
  Size: "De vaste hoogtes van knoppen, velden en iconen.",
  Elevation: "Schaduw: hoe een vlak boven de pagina komt te liggen.",
  Iconography: "Nog niet vastgelegd.",
  Motion: "Nog niet vastgelegd.",
};

export function FoundationsIndex() {
  const f = MENU[0].kinderen!;
  return (
    <Pagina intro="De bouwstenen onder alles: kleur, letter, maat en vorm. Elke waarde komt uit een vaste schaal; wat er niet in staat, gebruiken we niet.">
      <div className="tegels">
        {f.map(k => (
          <Link key={k.pad} to={k.pad} className={"tegel" + (k.klaar ? "" : " niet-klaar")}>
            <Text as="span" variant="title-m">{k.titel}</Text>
            <Text as="span" variant="body-s" color="medium">{OVER[k.titel]}</Text>
          </Link>
        ))}
      </div>
    </Pagina>
  );
}

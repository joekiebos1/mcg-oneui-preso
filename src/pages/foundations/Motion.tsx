import { Text } from "../../oneui/react/Text";
import { Blokken, delen } from "../../lib/markdown";
import { Pagina, Sectie } from "../Pagina";
import motionMd from "../../oneui/docs/motion.md?raw";

// Bron: mcg-oneui docs/foundations/motion.md. Wat daar verandert, komt hier mee bij de volgende sync.
export function Motion() {
  const [inleiding, ...rest] = delen(motionMd);
  return (
    <Pagina intro={inleiding.kop ? undefined : inleiding.blokken.map((b) => b.regels.join(" ")).join(" ")}>
      {rest.map((d) => (
        <Sectie key={d.kop} titel={d.kop ?? ""}>
          <Blokken blokken={d.blokken} />
        </Sectie>
      ))}
      <Text variant="body-s" color="low">Nog niet vastgelegd: motion in de interface, zoals overgangen en de ease van een knop.</Text>
    </Pagina>
  );
}

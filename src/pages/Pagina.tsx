import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VOLGORDE, vind } from "../menu";
import { Button } from "../oneui/react/Button";
import { IcoonLinks, IcoonRechts } from "../components/Iconen";
import { Text } from "../oneui/react/Text";

export function Pagina({ titel, intro, children }: { titel?: string; intro?: ReactNode; children?: ReactNode }) {
  const { pathname } = useLocation();
  const plek = vind(pathname);
  return (
    <article className="pagina">
      <header className="paginakop">
        {plek && plek.ouders.length > 0 && (
          <nav className="kruimel" aria-label="Kruimelpad">
            {plek.ouders.map(o => (
              <Link key={o.pad} to={o.pad}><Text as="span" variant="label-m" color="medium">{o.titel}</Text></Link>
            ))}
          </nav>
        )}
        <Text as="h1" variant="display-m">{titel ?? plek?.item.titel}</Text>
        {intro && <Text variant="body-l" color="medium" className="intro">{intro}</Text>}
      </header>
      {children}
      <VorigeVolgende />
    </article>
  );
}

/** Onderaan elke pagina: naar de vorige en de volgende pagina in de volgorde van het menu. */
function VorigeVolgende() {
  const { pathname } = useLocation();
  const ga = useNavigate();
  const i = VOLGORDE.findIndex((p) => p.pad === pathname);
  if (i < 0) return null;
  const [vorige, volgende] = [VOLGORDE[i - 1], VOLGORDE[i + 1]];
  const hoofdstuk = (pad: string) => vind(pad)?.ouders[0]?.titel;
  const label = (p: typeof vorige) => (hoofdstuk(p.pad) && hoofdstuk(p.pad) !== p.titel ? `${hoofdstuk(p.pad)} · ${p.titel}` : p.titel);
  return (
    <nav className="bladeren" aria-label="Vorige en volgende">
      {vorige ? <Button variant="outline" size="md" iconLeft={<IcoonLinks />} onClick={() => ga(vorige.pad)}>Vorige: {label(vorige)}</Button> : <span />}
      {volgende && <Button variant="secondary" size="md" iconRight={<IcoonRechts />} onClick={() => ga(volgende.pad)}>Volgende: {label(volgende)}</Button>}
    </nav>
  );
}

export function Sectie({ titel, uitleg, children }: { titel: string; uitleg?: ReactNode; children: ReactNode }) {
  return (
    <section className="sectie">
      <div className="sectiekop">
        <Text as="h2" variant="heading-l">{titel}</Text>
        {uitleg && <Text variant="body-m" color="medium" className="uitleg">{uitleg}</Text>}
      </div>
      {children}
    </section>
  );
}

/** Lijstje met regels, zoals "Gebruik semantische tokens." */
export function Regels({ items }: { items: ReactNode[] }) {
  return (
    <ul className="regels">
      {items.map((r, i) => <li key={i}><Text as="span" variant="body-m">{r}</Text></li>)}
    </ul>
  );
}

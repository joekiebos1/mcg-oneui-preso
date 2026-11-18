import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { vind } from "../menu";
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
    </article>
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

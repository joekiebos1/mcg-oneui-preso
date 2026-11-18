import { Blokken, delen, inline, type Linker } from "../lib/markdown";
import { Pagina, Sectie } from "./Pagina";

/** Een document uit mcg-oneui als pagina: de alinea's voor de eerste ##-kop worden de intro, elke ## een sectie. */
export function Doc({ md, titel, link, bron }: { md: string; titel?: string; link?: Linker; bron?: string }) {
  const [eerste, ...rest] = delen(md);
  // de eerste alinea is de intro; wat er verder voor de eerste ## staat, komt eronder
  const intro = eerste && !eerste.kop && eerste.blokken[0]?.soort === "alinea" ? eerste.blokken[0] : null;
  if (intro) eerste.blokken = eerste.blokken.slice(1);
  const secties = [eerste, ...rest].filter((d) => d && (d.kop || d.blokken.length));
  return (
    <Pagina titel={titel} intro={intro ? inline(intro.regels.join(" "), link) : undefined}>
      {secties.map((d, i) => d.kop
        ? <Sectie key={i} titel={d.kop}><Blokken blokken={d.blokken} link={link} /></Sectie>
        : <section key={i} className="sectie"><Blokken blokken={d.blokken} link={link} /></section>)}
      {bron && <p className="bron"><code>{bron}</code> in mcg-oneui</p>}
    </Pagina>
  );
}

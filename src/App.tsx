import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { MENU, type Item } from "./menu";
import { Text } from "./oneui/react/Text";
import { ONEUI_VERSIE } from "./oneui/versie";
import { Home } from "./pages/Home";
import { Placeholder } from "./pages/Placeholder";
import { FoundationsIndex } from "./pages/foundations/Index";
import { Colours } from "./pages/foundations/Colours";
import { Type } from "./pages/foundations/Type";
import { Maten } from "./pages/foundations/Maten";
import { Elevation } from "./pages/foundations/Elevation";
import { Doc } from "./pages/Doc";
import { doc, linkVoor } from "./lib/docs";
import { useParams } from "react-router-dom";
import { ButtonPagina } from "./pages/components/ButtonPagina";

type Brand = "classic" | "round";
type Thema = "light" | "dark";

const bewaard = <T extends string>(k: string, std: T): T => {
  try { return (localStorage.getItem(k) as T) || std; } catch { return std; }
};

function Keuze<T extends string>({ label, waarde, opties, zet }: { label: string; waarde: T; opties: [T, string][]; zet: (v: T) => void }) {
  return (
    <div className="keuze" role="radiogroup" aria-label={label}>
      {opties.map(([v, t]) => (
        <button key={v} type="button" role="radio" aria-checked={waarde === v} className={waarde === v ? "aan" : ""} onClick={() => zet(v)}>
          {t}
        </button>
      ))}
    </div>
  );
}

function Menu({ items, diepte = 0 }: { items: Item[]; diepte?: number }) {
  return (
    <ul className={"menu diepte-" + diepte}>
      {items.map(i => (
        <li key={i.pad}>
          <NavLink to={i.pad} end className={({ isActive }) => (isActive ? "actief" : "") + (i.klaar ? "" : " leeg")}>
            {i.titel}
          </NavLink>
          {i.kinderen && <Menu items={i.kinderen} diepte={diepte + 1} />}
        </li>
      ))}
    </ul>
  );
}

export function App() {
  const [brand, setBrand] = useState<Brand>(() => bewaard("oneui-brand", "round"));
  const [thema, setThema] = useState<Thema>(() => bewaard("oneui-thema", "light"));
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    document.documentElement.dataset.brand = brand;
    document.documentElement.dataset.theme = thema;
    try { localStorage.setItem("oneui-brand", brand); localStorage.setItem("oneui-thema", thema); } catch {}
  }, [brand, thema]);
  useEffect(() => { setOpen(false); document.querySelector(".inhoud")?.scrollTo(0, 0); }, [loc.pathname]);

  return (
    <div className="studio">
      <header className="balk">
        <button type="button" className="menuknop" aria-expanded={open} aria-controls="zijbalk" onClick={() => setOpen(o => !o)}>
          Menu
        </button>
        <NavLink to="/" className="logo"><Text as="span" variant="title-m">OneUI</Text></NavLink>
        <div className="instellingen">
          <Keuze label="Brand" waarde={brand} zet={setBrand} opties={[["classic", "Classic"], ["round", "Round"]]} />
          <Keuze label="Thema" waarde={thema} zet={setThema} opties={[["light", "Licht"], ["dark", "Donker"]]} />
        </div>
      </header>
      <nav id="zijbalk" className={"zijbalk" + (open ? " open" : "")} aria-label="Hoofdmenu">
        <Menu items={MENU} />
        <Text variant="body-xs" color="low" className="versie">mcg-oneui {ONEUI_VERSIE}</Text>
      </nav>
      <main className="inhoud">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foundations" element={<FoundationsIndex />} />
          <Route path="/foundations/colours" element={<Colours />} />
          <Route path="/foundations/motion" element={<DocOp pad="docs/motion.md" bron="docs/foundations/motion.md" />} />
          <Route path="/foundations/iconography" element={<DocOp pad="docs/components/icon.md" titel="Iconography" map="components" bron="docs/components/icon.md" />} />
          <Route path="/components/:slug" element={<Component />} />
          <Route path="/rules" element={<DocOp pad="rules/README.md" titel="Rules" bron="rules/README.md" />} />
          <Route path="/rules/product" element={<DocOp pad="rules/product/README.md" bron="rules/product/README.md" />} />
          <Route path="/rules/content/copy" element={<DocOp pad="rules/content/schrijfstijl.md" bron="rules/content/schrijfstijl.md" />} />
          <Route path="/rules/content/illustraties" element={<DocOp pad="rules/content/illustraties.md" bron="rules/content/illustraties.md" />} />
          <Route path="/rules/content/beeldtaal" element={<DocOp pad="rules/content/beeldtaal.md" bron="rules/content/beeldtaal.md" />} />
          <Route path="/decisions/:slug" element={<Besluit />} />
          <Route path="/foundations/type" element={<Type />} />
          <Route path="/foundations/spacing" element={<Maten groep="spacing" />} />
          <Route path="/foundations/radius" element={<Maten groep="radius" />} />
          <Route path="/foundations/border" element={<Maten groep="border" />} />
          <Route path="/foundations/size" element={<Maten groep="size" />} />
          <Route path="/foundations/elevation" element={<Elevation />} />
          <Route path="/components/button" element={<ButtonPagina />} />
          <Route path="*" element={<Placeholder />} />
        </Routes>
      </main>
    </div>
  );
}

/** Een document uit mcg-oneui; bestaat het (nog) niet, dan de gewone lege pagina. */
function DocOp({ pad, titel, map = "", bron }: { pad: string; titel?: string; map?: string; bron?: string }) {
  const md = doc(pad);
  return md ? <Doc md={md} titel={titel} link={linkVoor(map)} bron={bron} /> : <Placeholder />;
}

function Component() {
  const { slug = "" } = useParams();
  return <DocOp pad={`docs/components/${slug}.md`} map="components" bron={`docs/components/${slug}.md`} />;
}

function Besluit() {
  const { slug = "" } = useParams();
  return <DocOp pad={`docs/besluiten/${slug}.md`} map="besluiten" bron={`docs/besluiten/${slug}.md`} />;
}

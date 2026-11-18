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
import { Motion } from "./pages/foundations/Motion";
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
          <Route path="/foundations/motion" element={<Motion />} />
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

import { useEffect, useState } from "react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { MENU } from "./menu";
import { IcoonChevron, IcoonZijbalk } from "./components/Iconen";
import { Text } from "./oneui/react/Text";
import { ONEUI_VERSIE } from "./oneui/versie";
import { Home } from "./pages/Home";
import { Placeholder } from "./pages/Placeholder";
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

/** Het menu zoals in de Myndlet-app: een hoofdstuk met icoon en chevron klapt zijn pagina's open; een hoofdstuk
 *  zonder pagina's is zelf de link. Het hoofdstuk waar je bent, staat open. */
function Menu({ smal }: { smal: boolean }) {
  const { pathname } = useLocation();
  const hier = MENU.find((h) => pathname === h.pad || pathname.startsWith(h.pad + "/"))?.pad;
  const [open, setOpen] = useState<Set<string>>(() => new Set(hier ? [hier] : []));
  useEffect(() => { if (hier) setOpen((o) => (o.has(hier) ? o : new Set(o).add(hier))); }, [hier]);
  const wissel = (p: string) => setOpen((o) => { const n = new Set(o); n.has(p) ? n.delete(p) : n.add(p); return n; });
  return (
    <div className="nav">
      {MENU.map((h) => {
        const isOpen = open.has(h.pad) && !smal;
        const actief = h.pad === hier;
        return (
          <div key={h.pad} className={"nav-groep" + (isOpen ? " open" : "")}>
            {h.kinderen ? (
              <button type="button" className="nav-item" aria-expanded={isOpen} data-actief={actief ? "" : undefined}
                title={smal ? h.titel : undefined} onClick={() => wissel(h.pad)}>
                {h.icoon}<span className="nav-label">{h.titel}</span><span className="nav-chevron"><IcoonChevron /></span>
              </button>
            ) : (
              <NavLink to={h.pad} end className={"nav-item" + (h.klaar ? "" : " leeg")} title={smal ? h.titel : undefined}>
                {h.icoon}<span className="nav-label">{h.titel}</span>
              </NavLink>
            )}
            {h.kinderen && isOpen && (
              <div className="nav-sub">
                {h.kinderen.map((k) => (
                  <NavLink key={k.pad} to={k.pad} end className={"nav-item sub" + (k.klaar ? "" : " leeg")}>
                    <span className="nav-label">{k.titel}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function App() {
  const [brand, setBrand] = useState<Brand>(() => bewaard("oneui-brand", "round"));
  const [thema, setThema] = useState<Thema>(() => bewaard("oneui-thema", "light"));
  const [open, setOpen] = useState(false);
  const [smal, setSmal] = useState(() => bewaard<string>("oneui-smal", "0") === "1");
  const loc = useLocation();
  useEffect(() => {
    document.documentElement.dataset.brand = brand;
    document.documentElement.dataset.theme = thema;
    try { localStorage.setItem("oneui-brand", brand); localStorage.setItem("oneui-thema", thema); localStorage.setItem("oneui-smal", smal ? "1" : "0"); } catch {}
  }, [brand, thema, smal]);
  useEffect(() => { setOpen(false); document.querySelector(".inhoud")?.scrollTo(0, 0); }, [loc.pathname]);

  return (
    <div className={"studio" + (smal ? " smal" : "")}>
      <header className="balk">
        <button type="button" className="icoonknop inklap" onClick={() => setSmal((s) => !s)} aria-expanded={!smal}
          aria-label={smal ? "Menu uitklappen" : "Menu inklappen"} title={smal ? "Menu uitklappen" : "Menu inklappen"}>
          <IcoonZijbalk />
        </button>
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
        <Menu smal={smal} />
        <Text variant="body-xs" color="low" className="versie">mcg-oneui {ONEUI_VERSIE}</Text>
      </nav>
      <main className="inhoud">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kleuren/kleuren" element={<Colours />} />
          <Route path="/kleuren/gebruik" element={<DocOp pad="docs/kleur.md" bron="docs/foundations/kleur.md" />} />
          <Route path="/iconen/iconen" element={<DocOp pad="docs/components/icon.md" map="components" bron="docs/components/icon.md" />} />
          <Route path="/iconen/gebruik" element={<DocOp pad="docs/besluiten/003-icoon-een-laag.md" map="besluiten" bron="docs/besluiten/003-icoon-een-laag.md" />} />
          <Route path="/typografie/lettertype" element={<Type />} />
          <Route path="/typografie/gebruik" element={<DocOp pad="docs/typografie.md" bron="docs/foundations/typografie.md" />} />
          <Route path="/vormen/hoeken" element={<Maten groep="radius" />} />
          <Route path="/vormen/randen" element={<Maten groep="border" />} />
          <Route path="/layout/space" element={<Maten groep="spacing" />} />
          <Route path="/illustraties/over" element={<DocOp pad="rules/content/illustraties.md" bron="rules/content/illustraties.md" />} />
          <Route path="/illustraties/gebruik" element={<DocOp pad="rules/content/beeldtaal.md" bron="rules/content/beeldtaal.md" />} />
          <Route path="/componenten/button" element={<ButtonPagina />} />
          <Route path="/componenten/:slug" element={<Component />} />
          {/* niet in het menu, wel te bereiken: tot de eigenaar ze een plek geeft */}
          <Route path="/decisions/:slug" element={<Besluit />} />
          <Route path="/foundations/size" element={<Maten groep="size" />} />
          <Route path="/foundations/elevation" element={<Elevation />} />
          <Route path="/foundations/motion" element={<DocOp pad="docs/motion.md" bron="docs/foundations/motion.md" />} />
          <Route path="/rules/content/copy" element={<DocOp pad="rules/content/schrijfstijl.md" bron="rules/content/schrijfstijl.md" />} />
          {/* oude adressen */}
          {Object.entries(OUD).map(([van, naar]) => <Route key={van} path={van} element={<Navigate to={naar} replace />} />)}
          <Route path="/components/:slug" element={<NaarComponent />} />
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

const OUD: Record<string, string> = {
  "/foundations": "/kleuren", "/foundations/colours": "/kleuren/kleuren", "/foundations/type": "/typografie/lettertype",
  "/foundations/spacing": "/layout/space", "/foundations/radius": "/vormen/hoeken", "/foundations/border": "/vormen/randen",
  "/foundations/iconography": "/iconen/iconen", "/components": "/componenten", "/rules/content/illustraties": "/illustraties/over",
  "/rules/content/beeldtaal": "/illustraties/gebruik",
};

function NaarComponent() {
  const { slug = "" } = useParams();
  return <Navigate to={`/componenten/${slug}`} replace />;
}

function Component() {
  const { slug = "" } = useParams();
  return <DocOp pad={`docs/components/${slug}.md`} map="components" bron={`docs/components/${slug}.md`} />;
}

function Besluit() {
  const { slug = "" } = useParams();
  return <DocOp pad={`docs/besluiten/${slug}.md`} map="besluiten" bron={`docs/besluiten/${slug}.md`} />;
}

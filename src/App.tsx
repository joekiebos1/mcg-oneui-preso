import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { GROEPEN, MENU, anker, groepVan, type Groep, type Item } from "./menu";
import { Deel } from "./pages/Pagina";
import { Pagina, Sectie } from "./pages/Pagina";
import { Text } from "./oneui/react/Text";
import type { ReactElement, ReactNode } from "react";
import illustratieHeld from "./assets/kleuren-held.webp";
import { IcoonChevron, IcoonMenu, IcoonSluit, IcoonZijbalk } from "./components/Iconen";
import { IconButton } from "./oneui/react/IconButton";
import { Icon } from "./oneui/react/Icon";
import { Toggle } from "./oneui/react/Toggle";
import { ONEUI_VERSIE } from "./oneui/versie";
import { Home } from "./pages/Home";
import { Placeholder } from "./pages/Placeholder";
import { Colours } from "./pages/foundations/Colours";
import { Kleuren } from "./pages/foundations/Kleuren";
import { Ondergrond } from "./pages/foundations/Ondergrond";
import { Typografie } from "./pages/foundations/Typografie";
import { Iconen } from "./pages/foundations/Iconen";
import { Maten } from "./pages/foundations/Maten";
import { Elevation } from "./pages/foundations/Elevation";
import { Doc } from "./pages/Doc";
import { doc, linkVoor } from "./lib/docs";
import { useParams } from "react-router-dom";
import { ButtonPagina } from "./pages/components/ButtonPagina";
import { CheckboxPagina } from "./pages/components/CheckboxPagina";
import { ComponentVerhaal } from "./pages/components/ComponentVerhaal";

type Thema = "light" | "dark";

const bewaard = <T extends string>(k: string, std: T): T => {
  try { return (localStorage.getItem(k) as T) || std; } catch { return std; }
};

/** Links de hoofdgroepen (L1), zoals het menu van de Myndlet-app. Een groep opent op zijn eerste hoofdstuk. */
const eerste = (g: Groep) => g.items[0].pad;

function Hoofdmenu({ smal }: { smal: boolean }) {
  const { pathname } = useLocation();
  const hier = groepVan(pathname);
  return (
    <div className="nav">
      {GROEPEN.map((g) => (
        <Link key={g.titel} to={eerste(g)} title={smal ? g.titel : undefined}
          className={"nav-item" + (g === hier ? " active" : "")} aria-current={g === hier ? "true" : undefined}>
          {g.icoon}<span className="nav-label">{g.titel}</span>
        </Link>
      ))}
    </div>
  );
}

/** Op mobiel één menu: de groepen, en onder de groep die open staat zijn hoofdstukken (eigenaar 2026-11-20). De groep
 *  waar je bent staat open. */
function MobielMenu() {
  const { pathname } = useLocation();
  const hier = groepVan(pathname);
  const [open, setOpen] = useState<string | undefined>(hier?.titel);
  useEffect(() => setOpen(hier?.titel), [hier]);
  return (
    <div className="nav mobielmenu">
      {GROEPEN.map((g) => {
        const isOpen = open === g.titel;
        return (
          <div key={g.titel} className="nav-groep">
            <button type="button" className={"nav-item" + (g === hier ? " hier" : "")} aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? undefined : g.titel)}>
              {g.icoon}<span className="nav-label">{g.titel}</span><span className="nav-chevron"><IcoonChevron /></span>
            </button>
            {isOpen && <div className="mobielmenu-sub"><Paneel groep={g} /></div>}
          </div>
        );
      })}
    </div>
  );
}

/** Het paneel naast het menu: de hoofdstukken van de groep, zoals het submenu van Regels in de Myndlet-app. Een item
 *  met `chevron` is een kop met zijn pagina's eronder. */
function Paneel({ groep }: { groep: Groep }) {
  const { pathname } = useLocation();
  const binnen = (h: Item) => pathname === h.pad || pathname.startsWith(h.pad + "/");
  const [dicht, setDicht] = useState<Set<string>>(new Set());
  const wissel = (p: string) => setDicht((d) => { const n = new Set(d); n.has(p) ? n.delete(p) : n.add(p); return n; });
  return (
    <div className="paneel-lijst">
      {groep.items.map((h) => {
        if (!h.chevron) return (
          <NavLink key={h.pad} to={h.pad} className={"nav-item" + (h.klaar ? "" : " leeg") + (h.ruimte ? " ruimte" : "")}>
            {h.icoon}<span className="nav-label">{h.titel}</span>
          </NavLink>
        );
        const open = !dicht.has(h.pad) || binnen(h);
        return (
          <div key={h.pad} className="nav-groep">
            <button type="button" className="nav-item" aria-expanded={open} onClick={() => wissel(h.pad)}>
              {h.icoon}<span className="nav-label">{h.titel}</span><span className="nav-chevron"><IcoonChevron /></span>
            </button>
            {open && (
              <div className="nav-sub">
                {h.kinderen!.map((k) => (
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
  const [thema, setThema] = useState<Thema>(() => bewaard("oneui-thema", "light"));
  const [open, setOpen] = useState(false);
  const [smal, setSmal] = useState(() => bewaard<string>("oneui-smal", "0") === "1");
  const loc = useLocation();
  const groep = groepVan(loc.pathname);
  useEffect(() => {
    document.documentElement.dataset.theme = thema;
    try { localStorage.setItem("oneui-thema", thema); localStorage.setItem("oneui-smal", smal ? "1" : "0"); } catch {}
  }, [thema, smal]);
  useEffect(() => { setOpen(false); if (!loc.hash) document.querySelector(".inhoud")?.scrollTo(0, 0); }, [loc.pathname, loc.hash]);

  return (
    <div className={"studio" + (smal ? " smal" : "")}>
      <header className="balk">
        <button type="button" className="icoonknop inklap" onClick={() => setSmal((s) => !s)} aria-expanded={!smal}
          aria-label={smal ? "Menu uitklappen" : "Menu inklappen"} title={smal ? "Menu uitklappen" : "Menu inklappen"}>
          <IcoonZijbalk />
        </button>
        <IconButton className="menuknop" variant="ghost" size="md" icon={open ? <IcoonSluit /> : <IcoonMenu />}
          aria-label={open ? "Menu sluiten" : "Menu openen"} aria-expanded={open} aria-controls="zijbalk" onClick={() => setOpen(o => !o)} />
        <NavLink to="/" className="logo"><Text as="span" variant="title-m">OneUI</Text></NavLink>
        {/* thema: een Toggle met de zon links en de maan rechts; de iconen zijn ook aan te klikken */}
        <div className="instellingen thema">
          <span className={"thema-icoon" + (thema === "light" ? " aan" : "")} onClick={() => setThema("light")} aria-hidden="true">
            <Icon name="sun" size="xs" fill={thema === "light"} />
          </span>
          <Toggle aria-label="Donker thema" checked={thema === "dark"} onChange={(aan) => setThema(aan ? "dark" : "light")} />
          <span className={"thema-icoon" + (thema === "dark" ? " aan" : "")} onClick={() => setThema("dark")} aria-hidden="true">
            <Icon name="moon" size="xs" fill={thema === "dark"} />
          </span>
        </div>
      </header>
      <nav id="zijbalk" className={"zijbalk" + (open ? " open" : "")} aria-label="Hoofdmenu">
        <div className="alleen-desktop"><Hoofdmenu smal={smal} /></div>
        <div className="alleen-mobiel"><MobielMenu /></div>
        <Text variant="body-xs" color="low" className="versie">mcg-oneui {ONEUI_VERSIE}</Text>
      </nav>
      <div className="werk">
      {groep && (
        <aside id="paneel" className="paneel" data-ondergrond="default" aria-label={groep.titel}>
          <Paneel key={groep.titel} groep={groep} />
        </aside>
      )}
      <main className="inhoud" data-ondergrond="default">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* een hoofdstuk is één pagina met zijn delen onder elkaar; het oude adres van een deel wordt een anker */}
          {MENU.filter((h) => h.kinderen && !h.chevron).flatMap((h) => [
            <Route key={h.pad} path={h.pad} element={<Hoofdstuk h={h} />} />,
            ...h.kinderen!.map((k) => <Route key={k.pad} path={k.pad} element={<Navigate to={`${h.pad}#${anker(k)}`} replace />} />),
          ])}
          {Object.entries(INHOUD).filter(([pad]) => !MENU.some((h) => h.kinderen && !h.chevron && h.kinderen.some((k) => k.pad === pad)))
            .map(([pad, el]) => <Route key={pad} path={pad} element={el} />)}
          <Route path="/componenten/button" element={<ButtonPagina />} />
          <Route path="/componenten/checkbox" element={<CheckboxPagina />} />
          <Route path="/componenten/:slug" element={<Component />} />
          {/* niet in het menu, wel te bereiken: tot de eigenaar ze een plek geeft */}
          <Route path="/decisions/:slug" element={<Besluit />} />
          {/* oude adressen */}
          {Object.entries(OUD).map(([van, naar]) => <Route key={van} path={van} element={<Navigate to={naar} replace />} />)}
          <Route path="/components/:slug" element={<NaarComponent />} />
          <Route path="*" element={<Placeholder />} />
        </Routes>
      </main>
      </div>
    </div>
  );
}

/** Alle kleurtokens en de regels: de naslag achter de pagina Kleuren, niet in het menu. */
function KleurTokens() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(t);
  }, [hash]);
  return (
    <Pagina titel="Alle kleurtokens" klasse="naslag">
      <Deel.Provider value={{ titel: "", id: "tokens" }}><Colours /></Deel.Provider>
      <Deel.Provider value={{ titel: "Hoe te gebruiken", id: "gebruik" }}><DocOp pad="docs/kleur.md" bron="docs/foundations/kleur.md" /></Deel.Provider>
    </Pagina>
  );
}

/** Een document uit mcg-oneui; bestaat het (nog) niet, dan de gewone lege pagina. */
function DocOp({ pad, titel, map = "", bron, boven }: { pad: string; titel?: string; map?: string; bron?: string; boven?: ReactNode }) {
  const md = doc(pad);
  return md ? <Doc md={md} titel={titel} link={linkVoor(map)} bron={bron} boven={boven} /> : <Placeholder />;
}

// Wat er op elke pagina staat, op het pad uit het menu. Binnen een hoofdstuk wordt het een deel van de pagina.
const INHOUD: Record<string, ReactElement> = {
  "/kleuren": <Kleuren />,
  "/kleuren/tokens": <KleurTokens />,
  "/iconen": <Iconen />,
  "/typografie": <Typografie />,
  "/vormen/hoeken": <Maten groep="radius" />,
  "/vormen/randen": <Maten groep="border" />,
  "/vormen/maten": <Maten groep="size" />,
  "/layout/space": <Maten groep="spacing" />,
  "/surfaces/elevation": <Elevation />,
  "/surfaces/ondergrond": <Ondergrond />,
  "/motion": <DocOp pad="docs/motion.md" bron="docs/foundations/motion.md" />,
  "/taal/schrijfstijl": <DocOp pad="rules/content/schrijfstijl.md" bron="rules/content/schrijfstijl.md" />,
  "/illustraties/over": <DocOp pad="rules/content/illustraties.md" bron="rules/content/illustraties.md"
    boven={<div className="held"><img src={illustratieHeld} alt="" /></div>} />,
  "/illustraties/gebruik": <DocOp pad="rules/content/beeldtaal.md" bron="rules/content/beeldtaal.md" />,
};

/** Een hoofdstuk als één pagina: elk deel onder elkaar, met de naam uit het menu als kop. */
function Hoofdstuk({ h }: { h: Item }) {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(t);
  }, [hash]);
  return (
    <Pagina titel={h.titel} boven={h.kinderen![0].titel !== h.titel}>
      {h.kinderen!.map((k) => (
        <Deel.Provider key={k.pad} value={{ titel: k.titel === h.titel ? "" : k.titel, id: anker(k) }}>
          {INHOUD[k.pad] ?? (
            <Pagina>
              <div className="leeg-vak"><Text variant="body-m" color="medium">Nog niet vastgelegd.</Text></div>
            </Pagina>
          )}
        </Deel.Provider>
      ))}
    </Pagina>
  );
}

const OUD: Record<string, string> = {
  "/foundations": "/kleuren", "/foundations/colours": "/kleuren", "/kleuren/kleuren": "/kleuren/tokens", "/kleuren/gebruik": "/kleuren/tokens#gebruik", "/foundations/type": "/typografie", "/typografie/lettertype": "/typografie", "/typografie/gebruik": "/typografie", "/iconen/iconen": "/iconen", "/iconen/gebruik": "/iconen", "/iconen/nieuw": "/iconen",
  "/foundations/spacing": "/layout/space", "/foundations/radius": "/vormen/hoeken", "/foundations/border": "/vormen/randen",
  "/foundations/iconography": "/iconen", "/components": "/componenten/button", "/componenten": "/componenten/button", "/assets": "/assets/logo", "/rules/content/illustraties": "/illustraties/over",
  "/rules/content/beeldtaal": "/illustraties/gebruik", "/foundations/elevation": "/surfaces/elevation", "/foundations/size": "/vormen/maten", "/logo": "/assets/logo", "/patronen": "/opdrachten", "/patronen/opdrachten": "/opdrachten", "/logo/logo": "/assets/logo", "/logo/gebruik": "/assets/logo",
  "/foundations/motion": "/motion", "/rules/content/copy": "/taal/schrijfstijl",
};

function NaarComponent() {
  const { slug = "" } = useParams();
  return <Navigate to={`/componenten/${slug}`} replace />;
}

function Component() {
  const { slug = "" } = useParams();
  if (!doc(`docs/components/${slug}.md`)) return <Placeholder />;
  return <ComponentVerhaal key={slug} slug={slug} />;
}

function Besluit() {
  const { slug = "" } = useParams();
  return <DocOp pad={`docs/besluiten/${slug}.md`} map="besluiten" bron={`docs/besluiten/${slug}.md`} />;
}

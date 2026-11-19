import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { GROEPEN, MENU, anker, groepVan, type Groep, type Item } from "./menu";
import { Deel } from "./pages/Pagina";
import { Pagina, Sectie } from "./pages/Pagina";
import { VOORBEELDEN } from "./pages/components/Voorbeelden";
import { Text } from "./oneui/react/Text";
import type { ReactElement } from "react";
import { IcoonChevron, IcoonZijbalk } from "./components/Iconen";
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
          <NavLink key={h.pad} to={h.pad} className={"nav-item" + (h.klaar ? "" : " leeg")}>
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
  const [paneelOpen, setPaneelOpen] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = thema;
    try { localStorage.setItem("oneui-thema", thema); localStorage.setItem("oneui-smal", smal ? "1" : "0"); } catch {}
  }, [thema, smal]);
  useEffect(() => { setOpen(false); setPaneelOpen(false); if (!loc.hash) document.querySelector(".inhoud")?.scrollTo(0, 0); }, [loc.pathname, loc.hash]);

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
          <Keuze label="Thema" waarde={thema} zet={setThema} opties={[["light", "Licht"], ["dark", "Donker"]]} />
        </div>
      </header>
      <nav id="zijbalk" className={"zijbalk" + (open ? " open" : "")} aria-label="Hoofdmenu">
        <Hoofdmenu smal={smal} />
        <Text variant="body-xs" color="low" className="versie">mcg-oneui {ONEUI_VERSIE}</Text>
      </nav>
      <div className={"werk" + (paneelOpen ? " paneel-open" : "")}>
      {groep && (
        <button type="button" className="paneel-knop" aria-expanded={paneelOpen} aria-controls="paneel" onClick={() => setPaneelOpen((o) => !o)}>
          <Text as="span" variant="label-m">{groep.titel}</Text><IcoonChevron />
        </button>
      )}
      {groep && (
        <aside id="paneel" className="paneel" aria-label={groep.titel}>
          <Paneel key={groep.titel} groep={groep} />
        </aside>
      )}
      <main className="inhoud">
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

/** Een document uit mcg-oneui; bestaat het (nog) niet, dan de gewone lege pagina. */
function DocOp({ pad, titel, map = "", bron }: { pad: string; titel?: string; map?: string; bron?: string }) {
  const md = doc(pad);
  return md ? <Doc md={md} titel={titel} link={linkVoor(map)} bron={bron} /> : <Placeholder />;
}

// Wat er op elke pagina staat, op het pad uit het menu. Binnen een hoofdstuk wordt het een deel van de pagina.
const INHOUD: Record<string, ReactElement> = {
  "/kleuren/kleuren": <Colours />,
  "/kleuren/gebruik": <DocOp pad="docs/kleur.md" bron="docs/foundations/kleur.md" />,
  "/iconen/iconen": <DocOp pad="docs/components/icon.md" map="components" bron="docs/components/icon.md" />,
  "/iconen/gebruik": <DocOp pad="docs/besluiten/003-icoon-een-laag.md" map="besluiten" bron="docs/besluiten/003-icoon-een-laag.md" />,
  "/typografie/lettertype": <Type />,
  "/typografie/gebruik": <DocOp pad="docs/typografie.md" bron="docs/foundations/typografie.md" />,
  "/vormen/hoeken": <Maten groep="radius" />,
  "/vormen/randen": <Maten groep="border" />,
  "/vormen/maten": <Maten groep="size" />,
  "/layout/space": <Maten groep="spacing" />,
  "/surfaces/elevation": <Elevation />,
  "/motion": <DocOp pad="docs/motion.md" bron="docs/foundations/motion.md" />,
  "/taal/schrijfstijl": <DocOp pad="rules/content/schrijfstijl.md" bron="rules/content/schrijfstijl.md" />,
  "/illustraties/over": <DocOp pad="rules/content/illustraties.md" bron="rules/content/illustraties.md" />,
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
    <Pagina titel={h.titel}>
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
  "/foundations": "/kleuren", "/foundations/colours": "/kleuren/kleuren", "/foundations/type": "/typografie/lettertype",
  "/foundations/spacing": "/layout/space", "/foundations/radius": "/vormen/hoeken", "/foundations/border": "/vormen/randen",
  "/foundations/iconography": "/iconen/iconen", "/components": "/componenten/button", "/componenten": "/componenten/button", "/assets": "/assets/logo", "/rules/content/illustraties": "/illustraties/over",
  "/rules/content/beeldtaal": "/illustraties/gebruik", "/foundations/elevation": "/surfaces/elevation", "/foundations/size": "/vormen/maten", "/logo": "/assets/logo", "/patronen": "/opdrachten", "/patronen/opdrachten": "/opdrachten", "/logo/logo": "/assets/logo", "/logo/gebruik": "/assets/logo",
  "/foundations/motion": "/motion", "/rules/content/copy": "/taal/schrijfstijl",
};

function NaarComponent() {
  const { slug = "" } = useParams();
  return <Navigate to={`/componenten/${slug}`} replace />;
}

function Component() {
  const { slug = "" } = useParams();
  const md = doc(`docs/components/${slug}.md`);
  const Voorbeeld = VOORBEELDEN[slug];
  if (!md) return <Placeholder />;
  return <Doc md={md} link={linkVoor("components")} bron={`docs/components/${slug}.md`}
    boven={Voorbeeld && <Sectie titel="Voorbeelden" uitleg="Werkende componenten uit mcg-oneui: probeer ze uit."><Voorbeeld /></Sectie>} />;
}

function Besluit() {
  const { slug = "" } = useParams();
  return <DocOp pad={`docs/besluiten/${slug}.md`} map="besluiten" bron={`docs/besluiten/${slug}.md`} />;
}

// Het menu van de presentatielaag, zoals in de Myndlet-app: links de hoofdgroepen (L1) met een icoon, daarnaast een
// paneel met de hoofdstukken van die groep; Assets en Componenten met een chevron en hun pagina's eronder.
// `klaar: false` = staat in het menu, maar is nog niet ingevuld. Componenten volgen de docs van mcg-oneui.
import { createElement, type ReactNode } from "react";
import { componenten } from "./lib/docs";
import * as I from "./components/Iconen";

export interface Item {
  titel: string; pad: string; klaar?: boolean; kinderen?: Item[]; icoon?: ReactNode;
  /** een lange lijst klap je zelf open en dicht; de rest toont zijn delen op één pagina */
  chevron?: boolean;
}
export interface Groep { titel: string; icoon: ReactNode; items: Item[] }

const ic = (c: () => ReactNode) => createElement(c);

export const GROEPEN: Groep[] = [
  { titel: "Fundament", icoon: ic(I.IcoonFundament), items: [
    { titel: "Kleuren", pad: "/kleuren", icoon: ic(I.IcoonKleur), klaar: true, kinderen: [
      { titel: "Kleuren", pad: "/kleuren/kleuren", klaar: true },
      { titel: "Hoe te gebruiken", pad: "/kleuren/gebruik", klaar: true },
    ] },
    { titel: "Iconen", pad: "/iconen", icoon: ic(I.IcoonIcoon), klaar: true, kinderen: [
      { titel: "Iconen", pad: "/iconen/iconen", klaar: true },
      { titel: "Hoe te gebruiken", pad: "/iconen/gebruik", klaar: true },
      { titel: "Nieuwe maken", pad: "/iconen/nieuw" },
    ] },
    { titel: "Typografie", pad: "/typografie", icoon: ic(I.IcoonType), klaar: true, kinderen: [
      { titel: "Lettertype", pad: "/typografie/lettertype", klaar: true },
      { titel: "Hoe te gebruiken", pad: "/typografie/gebruik", klaar: true },
    ] },
    { titel: "Vormen", pad: "/vormen", icoon: ic(I.IcoonVorm), klaar: true, kinderen: [
      { titel: "Hoeken", pad: "/vormen/hoeken", klaar: true },
      { titel: "Randen", pad: "/vormen/randen", klaar: true },
      { titel: "Maten", pad: "/vormen/maten", klaar: true },
    ] },
    { titel: "Motion", pad: "/motion", icoon: ic(I.IcoonMotion), klaar: true },
    { titel: "Taal", pad: "/taal", icoon: ic(I.IcoonTaal), klaar: true, kinderen: [
      { titel: "Schrijfstijl", pad: "/taal/schrijfstijl", klaar: true },
    ] },
    { titel: "Toegankelijkheid", pad: "/toegankelijkheid", icoon: ic(I.IcoonToegang) },
  ] },
  { titel: "Product", icoon: ic(I.IcoonProduct), items: [
    { titel: "Layout", pad: "/layout", icoon: ic(I.IcoonLayout), klaar: true, kinderen: [
      { titel: "Grid", pad: "/layout/grid" },
      { titel: "Space", pad: "/layout/space", klaar: true },
    ] },
    { titel: "Surfaces", pad: "/surfaces", icoon: ic(I.IcoonSurface), klaar: true, kinderen: [
      { titel: "Elevation", pad: "/surfaces/elevation", klaar: true },
    ] },
  ] },
  { titel: "Content", icoon: ic(I.IcoonContent), items: [
    { titel: "Video", pad: "/video", icoon: ic(I.IcoonVideo) },
    { titel: "Illustraties", pad: "/illustraties", icoon: ic(I.IcoonIllustratie), klaar: true, kinderen: [
      { titel: "Over illustraties", pad: "/illustraties/over", klaar: true },
      { titel: "Hoe te gebruiken", pad: "/illustraties/gebruik", klaar: true },
      { titel: "Nieuwe maken", pad: "/illustraties/nieuw" },
    ] },
    { titel: "Beeld", pad: "/beeld", icoon: ic(I.IcoonBeeld) },
    { titel: "Geluid", pad: "/geluid", icoon: ic(I.IcoonGeluid) },
  ] },
  { titel: "Patronen", icoon: ic(I.IcoonPatroon), items: [
    { titel: "Opdrachten", pad: "/opdrachten", icoon: ic(I.IcoonOpdracht) },
  ] },
  { titel: "Bibliotheek", icoon: ic(I.IcoonBibliotheek), items: [
    { titel: "Assets", pad: "/assets", icoon: ic(I.IcoonAssets), chevron: true, kinderen: [
      { titel: "Logo", pad: "/assets/logo" },
    ] },
    { titel: "Componenten", pad: "/componenten", icoon: ic(I.IcoonComponent), klaar: true, chevron: true,
      kinderen: componenten().map((c) => ({ titel: c.naam, pad: `/componenten/${c.slug}`, klaar: true })) },
  ] },
];

/** Alle hoofdstukken op een rij. */
export const MENU: Item[] = GROEPEN.flatMap((g) => g.items);

/** De groep waar een pad bij hoort. */
export const groepVan = (pad: string) =>
  GROEPEN.find((g) => g.items.some((h) => pad === h.pad || pad.startsWith(h.pad + "/")));

export function vind(pad: string, items = MENU, ouders: Item[] = []): { item: Item; ouders: Item[] } | null {
  for (const i of items) {
    if (i.pad === pad) return { item: i, ouders };
    const r = i.kinderen && vind(pad, i.kinderen, [...ouders, i]);
    if (r) return r;
  }
  return null;
}

/** Het anker van een deel in zijn hoofdstuk: het laatste stuk van zijn pad ("/kleuren/gebruik" → "gebruik"). */
export const anker = (k: Item) => k.pad.split("/").pop() ?? "";

/** Alle pagina's op volgorde, voor Vorige en Volgende: een hoofdstuk is één pagina; bij Assets en Componenten (chevron)
 *  telt elke pagina eronder. */
export const VOLGORDE: Item[] = MENU.flatMap((h) => (h.chevron && h.kinderen ? h.kinderen : [h]));

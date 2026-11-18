// Het menu van de presentatielaag. `klaar: false` = staat in het menu, maar is nog niet ingevuld.
import { besluiten, componenten } from "./lib/docs";

export interface Item { titel: string; pad: string; klaar?: boolean; kinderen?: Item[] }

// Components en Decisions komen uit de docs van mcg-oneui: een nieuw document staat er vanzelf bij.
export const MENU: Item[] = [
  {
    titel: "Foundations", pad: "/foundations", klaar: true, kinderen: [
      { titel: "Colours", pad: "/foundations/colours", klaar: true },
      { titel: "Type", pad: "/foundations/type", klaar: true },
      { titel: "Spacing", pad: "/foundations/spacing", klaar: true },
      { titel: "Radius", pad: "/foundations/radius", klaar: true },
      { titel: "Border", pad: "/foundations/border", klaar: true },
      { titel: "Size", pad: "/foundations/size", klaar: true },
      { titel: "Elevation", pad: "/foundations/elevation", klaar: true },
      { titel: "Iconography", pad: "/foundations/iconography", klaar: true },
      { titel: "Motion", pad: "/foundations/motion", klaar: true },
    ],
  },
  {
    titel: "Components", pad: "/components", klaar: true,
    kinderen: componenten().map((c) => ({ titel: c.naam, pad: `/components/${c.slug}`, klaar: true })),
  },
  {
    titel: "Rules", pad: "/rules", klaar: true, kinderen: [
      { titel: "Product", pad: "/rules/product", klaar: true, kinderen: [
        { titel: "Page level", pad: "/rules/product/page" },
        { titel: "Flow level", pad: "/rules/product/flow" },
      ] },
      { titel: "Content", pad: "/rules/content", klaar: true, kinderen: [
        { titel: "Copy", pad: "/rules/content/copy", klaar: true },
        { titel: "Illustraties", pad: "/rules/content/illustraties", klaar: true },
        { titel: "Beeldtaal", pad: "/rules/content/beeldtaal", klaar: true },
      ] },
    ],
  },
  { titel: "Patterns", pad: "/patterns" },
  {
    titel: "Decisions", pad: "/decisions", klaar: true,
    kinderen: besluiten().map((b) => ({ titel: b.titel.replace(/^(\d+) — /, "$1 · "), pad: `/decisions/${b.slug}`, klaar: true })),
  },
];

export function vind(pad: string, items = MENU, ouders: Item[] = []): { item: Item; ouders: Item[] } | null {
  for (const i of items) {
    if (i.pad === pad) return { item: i, ouders };
    const r = i.kinderen && vind(pad, i.kinderen, [...ouders, i]);
    if (r) return r;
  }
  return null;
}

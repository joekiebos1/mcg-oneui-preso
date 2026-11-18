// Het menu van de presentatielaag. `klaar: false` = staat in het menu, maar is nog niet ingevuld.
export interface Item { titel: string; pad: string; klaar?: boolean; kinderen?: Item[] }

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
      { titel: "Iconography", pad: "/foundations/iconography" },
      { titel: "Motion", pad: "/foundations/motion" },
    ],
  },
  {
    titel: "Components", pad: "/components", kinderen: [
      { titel: "UI components", pad: "/components/ui" },
      { titel: "Documentatie", pad: "/components/documentatie" },
    ],
  },
  {
    titel: "Rules", pad: "/rules", kinderen: [
      { titel: "Product", pad: "/rules/product", kinderen: [
        { titel: "Page level", pad: "/rules/product/page" },
        { titel: "Flow level", pad: "/rules/product/flow" },
      ] },
      { titel: "Content", pad: "/rules/content", kinderen: [
        { titel: "Video", pad: "/rules/content/video" },
        { titel: "Copy", pad: "/rules/content/copy" },
        { titel: "Audio", pad: "/rules/content/audio" },
      ] },
    ],
  },
  { titel: "Patterns", pad: "/patterns" },
];

export function vind(pad: string, items = MENU, ouders: Item[] = []): { item: Item; ouders: Item[] } | null {
  for (const i of items) {
    if (i.pad === pad) return { item: i, ouders };
    const r = i.kinderen && vind(pad, i.kinderen, [...ouders, i]);
    if (r) return r;
  }
  return null;
}

// Alle documenten uit mcg-oneui (src/oneui, door npm run sync), als tekst. Zo komt een nieuw document vanzelf mee.
const ruw = import.meta.glob("../oneui/{docs,rules}/**/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const docs: Record<string, string> = Object.fromEntries(Object.entries(ruw).map(([k, v]) => [k.replace("../oneui/", ""), v]));

/** Een document op zijn pad in mcg-oneui, bijv. "rules/content/illustraties.md"; foundations staan plat in docs/. */
export const doc = (pad: string): string | undefined => docs[pad];

/** De componenten: slug en naam, in de volgorde van docs/components/README.md. */
export function componenten(): { slug: string; naam: string }[] {
  const index = docs["docs/components/README.md"] ?? "";
  return [...index.matchAll(/\[([^\]]+)\]\(([\w-]+)\.md\)/g)].map((m) => ({ naam: m[1], slug: m[2] }))
    .filter((c) => docs[`docs/components/${c.slug}.md`]);
}

/** De besluiten (docs/besluiten), nieuwste eerst. */
export function besluiten(): { slug: string; titel: string }[] {
  return Object.keys(docs).filter((k) => k.startsWith("docs/besluiten/")).sort().reverse()
    .map((k) => ({ slug: k.slice("docs/besluiten/".length, -3), titel: (docs[k].match(/^# (.+)$/m)?.[1] ?? k).trim() }));
}

/** Een link in een document ("chip.md", "../besluiten/002-…md") naar de pagina in de presentatielaag. */
export function linkVoor(map: string) {
  return (href: string): string | null => {
    const naam = href.split("#")[0].split("/").pop()?.replace(/\.md$/, "") ?? "";
    if (href.includes("besluiten/")) return `/decisions/${naam}`;
    if (map === "components" && !href.includes("/")) return `/componenten/${naam}`;
    return null;
  };
}

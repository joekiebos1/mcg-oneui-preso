// Leest tokens.json van OneUI en maakt er platte lijsten van, met aliassen opgelost.
import raw from "../oneui/tokens.json";

type Leaf = { $type: string; $value: unknown; $extensions?: Record<string, unknown> };
type Tree = { [k: string]: Tree | Leaf };
const isLeaf = (x: unknown): x is Leaf => !!x && typeof x === "object" && "$value" in (x as object);

export interface Token {
  /** naam zoals in Figma: "magenta/600", "brand/primary/600", "surface/page" */
  naam: string;
  type: string;
  waarde: unknown;
  /** donker thema (alleen semantic) */
  donker?: unknown;
  /** brand Round, als die afwijkt */
  round?: unknown;
  extra?: Record<string, unknown>;
}

const alle: Record<string, Token> = {};
function lees(tree: Tree, prefix: string, laag: string, uit: Token[]) {
  for (const [k, v] of Object.entries(tree)) {
    const naam = prefix ? `${prefix}/${k}` : k;
    if (isLeaf(v)) {
      const t: Token = {
        naam, type: v.$type, waarde: v.$value, extra: v.$extensions,
        donker: v.$extensions?.["oneui.dark"], round: v.$extensions?.["oneui.round"],
      };
      uit.push(t);
      alle[naam] = t;
    } else lees(v as Tree, naam, laag, uit);
  }
  return uit;
}

const t = raw as unknown as Record<string, Tree>;
export const primitives = lees(t.primitive, "", "primitive", []);
export const brand = lees(t.brand, "brand", "brand", []);
export const semantic = lees(t.semantic, "", "semantic", []);

/** "{magenta/600}" → "magenta/600", anders null */
export const alias = (w: unknown): string | null =>
  typeof w === "string" && /^\{.+\}$/.test(w) ? w.slice(1, -1) : null;

/** Volgt aliassen tot een echte waarde. Geeft ook de keten terug ("surface/page → brand/neutral/100 → slate/100"). */
export function los(w: unknown, keten: string[] = []): { waarde: string; keten: string[] } {
  const a = alias(w);
  if (!a) return { waarde: String(w), keten };
  const tok = alle[a];
  if (!tok) return { waarde: "?", keten: [...keten, a] };
  return los(tok.waarde, [...keten, a]);
}

export const token = (naam: string): Token | undefined => alle[naam];

/** Primitives per ladder: { magenta: [{stap:"50", hex}], … } in volgorde van de stappen */
export function ladders() {
  const uit: Record<string, { stap: string; hex: string; naam: string }[]> = {};
  for (const p of primitives) {
    if (p.type !== "color") continue;
    const [ladder, stap] = p.naam.split("/");
    if (ladder === "base") continue;
    (uit[ladder] ||= []).push({ stap, hex: String(p.waarde), naam: p.naam });
  }
  for (const l of Object.values(uit)) l.sort((a, b) => Number(a.stap) - Number(b.stap));
  return uit;
}

/** Maten: spacing, radius, border, size, gesorteerd op waarde */
export function maten(groep: "spacing" | "radius" | "border" | "size") {
  return primitives
    .filter(p => p.naam.startsWith(groep + "/"))
    .map(p => ({ naam: p.naam.split("/")[1], px: parseFloat(String(p.waarde)), waarde: String(p.waarde), css: `--oneui-${groep}-${p.naam.split("/")[1]}` }))
    .sort((a, b) => a.px - b.px);
}

export const typografie = t.typography as unknown as Record<string, Record<string, Leaf>>;

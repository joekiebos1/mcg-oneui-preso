// WCAG-contrast tussen twee hex-kleuren (alfa wordt genegeerd).
const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
export function luminantie(hex: string) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
export function contrast(a: string, b: string) {
  const [l1, l2] = [luminantie(a), luminantie(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
export const fmt = (x: number) => x.toFixed(1).replace(".", ",");
/** De leesbaarste van wit en inkt op deze kleur */
export const tekstOp = (hex: string, inkt: string) => (contrast(hex, "#ffffff") >= contrast(hex, inkt) ? "#ffffff" : inkt);

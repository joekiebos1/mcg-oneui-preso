// Haalt het design system binnen uit een clone van mcg-oneui: tokens, lettertypes, de React-componenten en de MCP.
// Gebruik: npm run sync [-- <pad naar mcg-oneui>]   (standaard ../mcg-oneui)
// Daarna committen: Vercel bouwt zonder toegang tot mcg-oneui.
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { execSync } from "node:child_process";
import { join, resolve } from "node:path";

const bron = resolve(process.argv[2] ?? "../mcg-oneui");
const doel = resolve("src/oneui");
rmSync(doel, { recursive: true, force: true });
mkdirSync(join(doel, "react"), { recursive: true });

cpSync(join(bron, "dist/tokens.css"), join(doel, "tokens.css"));
cpSync(join(bron, "dist/tokens.json"), join(doel, "tokens.json"));
cpSync(join(bron, "dist/fonts"), join(doel, "fonts"), { recursive: true });
for (const f of readdirSync(join(bron, "react/src"))) {
  if (/\.(tsx|css)$/.test(f) && !/\.test\./.test(f)) cpSync(join(bron, "react/src", f), join(doel, "react", f));
}
mkdirSync(join(doel, "docs/components"), { recursive: true });
for (const f of ["kleur.md", "typografie.md", "ruimte.md", "motion.md"]) cpSync(join(bron, "docs/foundations", f), join(doel, "docs", f));
// alle docs van de componenten, de besluiten, en de regels (rules/): de presentatielaag toont alles wat er is
for (const f of readdirSync(join(bron, "docs/components"))) if (f.endsWith(".md")) cpSync(join(bron, "docs/components", f), join(doel, "docs/components", f));
cpSync(join(bron, "docs/besluiten"), join(doel, "docs/besluiten"), { recursive: true });
cpSync(join(bron, "rules"), join(doel, "rules"), { recursive: true });
// de MCP: de server van mcg-oneui en zijn gegevens in één bestand; api/mcp.mjs zet hem online op /mcp
mkdirSync(resolve("mcp"), { recursive: true });
cpSync(join(bron, "mcp/oneui.mjs"), resolve("mcp/oneui.mjs"));
const { laad } = await import(pathToFileURL(join(bron, "mcp/bron.mjs")).href);
writeFileSync(resolve("mcp/data.json"), JSON.stringify(laad()));
let versie = "onbekend";
try { versie = execSync("git log -1 --format=%h%x20%cs", { cwd: bron }).toString().trim(); } catch {}
writeFileSync(join(doel, "BRON.md"), `Gekopieerd uit mcg-oneui (${versie}) met \`npm run sync\`. Niet hier aanpassen: wijzig mcg-oneui en sync opnieuw.\n`);
writeFileSync(join(doel, "versie.ts"), `export const ONEUI_VERSIE = ${JSON.stringify(versie)};\n`);
console.log(`OneUI ${versie} → src/oneui`);

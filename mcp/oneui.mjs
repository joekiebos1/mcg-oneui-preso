// OneUI MCP-server: geeft AI-tools de componenten, tokens en regels van het design system. Alleen lezen.
// maakServer(data) kent geen schijf: `data` komt uit bron.mjs (lokaal, uit de repository) of uit data.json (gehost).
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function maakServer(data) {
const P = data.variables.primitives;
// vier modes: licht, donker, licht op subtle, donker op subtle (besluit 009); twee waarden = op subtle gelijk
const S = Object.fromEntries(Object.entries(data.variables.semantic).map(([n, v]) => [n, Array.isArray(v) && v.length === 2 ? [v[0], v[1], v[0], v[1]] : v]));
const isRef = (v) => typeof v === "string" && v.startsWith("{");
function resolve(v, mode = 0) {
  while (isRef(v)) {
    const n = v.slice(1, -1);
    if (n in P) v = P[n];
    else if (n in S) v = S[n][mode];
    else throw new Error("Onbekende verwijzing: " + n);
  }
  return v;
}
const families = [...new Set(Object.keys(P).filter((n) => typeof P[n] === "string" && /^#/.test(P[n])).map((n) => n.split("/")[0]))].filter((f) => f !== "base");

const comps = data.components;
const typo = data.typography;
const slug = (n) => n.toLowerCase().replace(/\s+/g, "-");
const doc = (c) => data.docs.components[slug(c.name)] || "";
// de regels: de foundations (voor product en content) en de bouwstenen voor content
const regels = { ...data.docs.foundations, ...data.docs.content };
const bindings = data.bindings;

// ---- tokens oplossen ----
const cssVar = (n) => `var(--oneui-${n.replace(/\//g, "-").toLowerCase()})`;
const semantic = Object.entries(S).filter(([n]) => !n.startsWith("_")).map(([n, v]) => ({ token: n, css: cssVar(n), licht: resolve(v[0], 0), donker: resolve(v[1], 1), subtle: v[2] !== v[0] || v[3] !== v[1] ? `${resolve(v[2], 2)} / ${resolve(v[3], 3)}` : "" }));
const FONTS = [data.typography._family]; // Google Sans Flex Rond

const text = (s) => ({ content: [{ type: "text", text: s }] });
// lidwoorden en andere woorden die in elke tekst staan, tellen niet mee bij het zoeken
const STOP = new Set("van een het met die dat voor als bij wat wil moet zijn wordt worden kan naar door ook nog niet maar dan deze dit".split(" "));
const words = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w));

// Synoniemen in gewone taal, zodat "keuze uit opties" ook Select vindt.
const SYN = { select: "keuze kiezen opties dropdown lijst menu", radio: "keuze een optie uitsluitend", checkbox: "aanvinken meerdere akkoord vinkje", toggle: "schakelaar aan uit instelling", input: "invoer tekstveld veld formulier typen zoeken", chip: "filter tag label selectie", badge: "status label teller aantal markering", avatar: "persoon foto initialen profiel gebruiker", button: "knop actie opslaan versturen", "icon-button": "knop icoon actie", tabs: "tabbladen secties wisselen", "nav-item": "navigatie menu-item zijbalk", "page-heading": "paginatitel kop pagina", "section-heading": "sectiekop kop groep", editor: "rich text opmaak notitie verslag", "event-indicator": "afspraak agenda kalender type", "icon-tabs": "tabbladen iconen", icon: "pictogram symbool" };

const server = new McpServer({ name: "oneui", version: "0.2.0" }, {
  instructions: "OneUI is het design system van Mental Care Group: de bron voor product en content. Verzin geen kleuren, maten, lettertypes of regels; haal ze hier op. Interface: begin met zoek_component, haal details op met component, gebruik semantische tokens, en kijk code na met controleer (soort interface). Content (illustraties, slides, kaarten, tekst): lees eerst regels (illustraties, beeldtaal, schrijfstijl, motion), gebruik de kleurladders (tokens, soort ladder), en kijk na met controleer (soort content).",
});

server.registerTool("zoek_component", {
  title: "Zoek een component",
  description: "Vindt de OneUI-component die past bij een beschrijving in gewone taal, bijvoorbeeld 'kiezen uit drie opties' of 'status van een afspraak'.",
  inputSchema: { vraag: z.string().describe("Wat moet de component doen?") },
}, async ({ vraag }) => {
  const q = words(vraag);
  const scored = comps.map((c) => {
    const hay = words([c.name, Object.keys(c.props).join(" "), Object.values(c.props).flat().join(" "), SYN[slug(c.name)] || "", doc(c)].join(" "));
    // de synoniemen zijn met de hand gekozen: die wegen zwaarder dan een woord dat toevallig in de docs staat
    const syn = words(SYN[slug(c.name)] || "");
    const score = q.reduce((s, w) => s + (syn.includes(w) ? 3 : hay.includes(w) ? 2 : hay.some((h) => h.startsWith(w.slice(0, 5))) ? 1 : 0), 0) + (q.includes(c.name.toLowerCase()) ? 5 : 0);
    return { c, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
  if (!scored.length) return text(`Geen passende component gevonden. Beschikbaar: ${comps.map((c) => c.name).join(", ")}.`);
  return text(scored.map(({ c }) => `- **${c.name}**`).join("\n") + "\n\nGebruik `component` voor varianten en regels.");
});

server.registerTool("component", {
  title: "Component",
  description: "Geeft varianten, instellingen en gebruiksregels van één OneUI-component.",
  inputSchema: { naam: z.string().describe(`Naam, een van: ${comps.map((c) => c.name).join(", ")}`) },
}, async ({ naam }) => {
  const c = comps.find((x) => x.name.toLowerCase() === naam.toLowerCase() || slug(x.name) === slug(naam));
  return text(c ? doc(c) || JSON.stringify(c, null, 2) : `Onbekende component '${naam}'. Beschikbaar: ${comps.map((x) => x.name).join(", ")}.`);
});

const STAPPEN = [...new Set(Object.keys(P).filter((n) => families.includes(n.split("/")[0])).map((n) => n.split("/")[1]))].sort((a, b) => a - b);
server.registerTool("tokens", {
  title: "Tokens",
  description: "Geeft OneUI-tokens met hun CSS-variabele en waarde. Semantische kleuren in licht en donker (interface), de kleurladders zoals magenta/600 (content), typografie en ruimte. Filter op soort en/of zoekterm (bijv. soort 'kleur', zoek 'surface'; soort 'ladder', zoek 'magenta').",
  inputSchema: {
    soort: z.enum(["kleur", "ladder", "typografie", "ruimte"]).optional().describe("kleur = semantische tokens voor de interface; ladder = de kleurladders (primitives) voor content"),
    zoek: z.string().optional().describe("Deel van de tokennaam, bijv. 'text/', 'primary', 'spacing'"),
  },
}, async ({ soort, zoek }) => {
  const f = (n) => !zoek || n.toLowerCase().includes(zoek.toLowerCase());
  const parts = [];
  if (!soort || soort === "kleur") parts.push("## Kleur (semantisch, MCG)\nDonker: `data-theme=\"dark\"`. Op een vlak van stap 100 (pagina, subtle): `data-ondergrond=\"subtle\"` (besluit 009).\n| token | css | licht | donker | op subtle (licht / donker) |\n|---|---|---|---|---|\n" + semantic.filter((t) => f(t.token)).map((t) => `| ${t.token} | \`${t.css}\` | ${t.licht} | ${t.donker} | ${t.subtle} |`).join("\n"));
  if (!soort || soort === "ladder") parts.push("## Kleurladders (primitives)\nVoor content: illustraties, slides, kaarten, infographics. In de interface gebruik je de semantische tokens.\n| ladder | " + STAPPEN.join(" | ") + " |\n|---|" + STAPPEN.map(() => "---").join("|") + "|\n" + families.filter((fam) => f(fam + "/")).map((fam) => `| ${fam} | ${STAPPEN.map((st) => P[`${fam}/${st}`] || "-").join(" | ")} |`).join("\n") + "\nCSS: `var(--oneui-<ladder>-<stap>)`.");
  if (!soort || soort === "typografie") parts.push("## Typografie\nKlasse: `.oneui-text-<rol>-<maat>`.\n| stijl | font | gewicht | maat/regel |\n|---|---|---|---|\n" + Object.entries(typo).filter(([n]) => !n.startsWith("_") && f(n)).map(([n, t]) => `| ${n} | ${typo._family} | ${t[0]} | ${t[1]}/${t[2]} |`).join("\n"));
  if (!soort || soort === "ruimte") parts.push("## Ruimte, hoeken, randen\n" + Object.entries(P).filter(([n]) => /^(spacing|radius|border|size)\//.test(n) && f(n)).map(([n, v]) => `- \`${cssVar(n)}\` = ${v}px`).join("\n"));
  return text(parts.join("\n\n"));
});

server.registerTool("regels", {
  title: "Regels",
  description: "Geeft de regels van OneUI: kleur, typografie, ruimte en motion (foundations), en voor content illustraties, beeldtaal en schrijfstijl.",
  inputSchema: { onderwerp: z.enum(Object.keys(regels)).optional().describe("Zonder onderwerp: een overzicht van wat er is") },
}, async ({ onderwerp }) => text(onderwerp ? regels[onderwerp]
  : (data.docs.overzicht ? data.docs.overzicht + "\n\n" : "") + "Onderwerpen: " + Object.keys(regels).join(", ") + ". Vraag er een op met `onderwerp`."));

// ---- controleer ----
const scale = new Set(Object.entries(P).filter(([n]) => /^(spacing|radius|border|size)\//.test(n)).map(([, v]) => v));
const hexToLab = (h) => { const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); const [r, g, b] = [1, 3, 5].map((i) => lin(parseInt(h.slice(i, i + 2), 16) / 255)); return [0.4122 * r + 0.5363 * g + 0.0514 * b, 0.2119 * r + 0.6807 * g + 0.1074 * b, 0.0883 * r + 0.2817 * g + 0.63 * b].map(Math.cbrt); };
const dist = (a, b) => Math.hypot(...a.map((x, i) => x - b[i]));
const nearest = (hex) => semantic.filter((t) => /^#[0-9a-f]{6}$/i.test(t.licht)).map((t) => ({ t, d: dist(hexToLab(t.licht), hexToLab(hex)) })).sort((a, b) => a.d - b.d).slice(0, 2).map((x) => x.t.css).join(" of ");

// content: elke kleur moet een stap van een ladder zijn
const LADDER = Object.fromEntries(Object.entries(P).filter(([n, v]) => typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v)).map(([n, v]) => [v.toLowerCase(), n]));
const dichtstbij = (hex) => Object.entries(LADDER).map(([h, n]) => ({ h, n, d: dist(hexToLab(h), hexToLab(hex)) })).sort((a, b) => a.d - b.d).slice(0, 2).map((x) => `${x.n} (${x.h.toUpperCase()})`).join(" of ");
server.registerTool("controleer", {
  title: "Controleer code",
  description: `Controleert CSS, JSX, SCSS of SVG op OneUI-regels. Soort interface (standaard): geen losse hexkleuren, alleen maten uit de schaal, alleen ${FONTS.join(", ")}, semantische tokens in plaats van primitives. Soort content (illustraties, slides, kaarten, infographics): alleen kleuren uit de ladders, geen semantische tokens, alleen de lettertypes van OneUI.`,
  inputSchema: { code: z.string(), soort: z.enum(["interface", "content"]).optional().describe("Waar de code voor is; standaard interface") },
}, async ({ code, soort }) => {
  const issues = [];
  const lines = code.split("\n");
  if (soort === "content") {
    lines.forEach((l, i) => {
      const n = i + 1;
      for (const m of l.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)) {
        const h = (m[0].length === 4 ? "#" + [...m[0].slice(1)].map((c) => c + c).join("") : m[0]).toLowerCase();
        if (!LADDER[h]) issues.push(`r${n}: ${m[0]} staat in geen ladder → dichtstbij: ${dichtstbij(h)}`);
      }
      if (/rgba?\(|hsla?\(/.test(l) && !/var\(--oneui/.test(l)) issues.push(`r${n}: losse kleurfunctie → gebruik een kleur uit een ladder`);
      for (const m of l.matchAll(/--oneui-(surface|text|icon|stroke|interaction)-[\w-]+/g)) issues.push(`r${n}: semantisch token ${m[0]} → content gebruikt de ladders (bijv. slate/900)`);
      const ff = l.match(/font-family\s*[:=]\s*["']?([^;"']+)/i);
      if (ff && !(/var\(--oneui-(font|type-)/.test(ff[1]) || FONTS.some((x) => ff[1].includes(x)))) issues.push(`r${n}: lettertype ${ff[1].trim()} → gebruik ${FONTS.join(" of ")}`);
    });
    return text(issues.length ? `${issues.length} punten:\n` + issues.map((s) => "- " + s).join("\n") : "Geen punten gevonden: alle kleuren komen uit de ladders.");
  }
  lines.forEach((l, i) => {
    const n = i + 1;
    for (const m of l.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)) {
      const h = m[0].length === 4 ? "#" + [...m[0].slice(1)].map((c) => c + c).join("") : m[0];
      issues.push(`r${n}: losse kleur ${m[0]} → gebruik een token, bijv. ${nearest(h)}`);
    }
    if (/rgba?\(|hsla?\(/.test(l) && !/var\(--oneui/.test(l)) issues.push(`r${n}: losse kleurfunctie → gebruik een token`);
    for (const m of l.matchAll(/(?:margin|padding|gap|top|left|right|bottom|border-radius|inset)[\w-]*\s*:\s*([^;}{]+)/gi))
      for (const px of m[1].matchAll(/(-?\d+(?:\.\d+)?)px/g)) if (!scale.has(Math.abs(+px[1]))) issues.push(`r${n}: ${px[0]} staat niet in de schaal (${[...scale].filter((v) => v < 100).sort((a, b) => a - b).join(", ")})`);
    const ff = l.match(/font-family\s*:\s*([^;]+)/i);
    if (ff && !(/var\(--oneui-(font|type-)/.test(ff[1]) || FONTS.some((x) => ff[1].includes(x)))) issues.push(`r${n}: lettertype ${ff[1].trim()} → gebruik var(--oneui-font)`);
    for (const m of l.matchAll(new RegExp(`--oneui-(${families.join("|")})-\\d+`, "g"))) issues.push(`r${n}: primitive ${m[0]} → gebruik een semantisch token (surface/…, text/…, icon/…, stroke/…)`);
    for (const m of l.matchAll(/font-size\s*:\s*(\d[^;}]*)/gi)) issues.push(`r${n}: losse font-size ${m[1].trim()} → gebruik een tekststijl (.oneui-text-…)`);
  });
  return text(issues.length ? `${issues.length} punten:\n` + issues.map((s) => "- " + s).join("\n") : "Geen punten gevonden: de code volgt de OneUI-regels.");
});


// ---- afhankelijkheden ----
server.registerTool("afhankelijkheden", {
  title: "Afhankelijkheden van een token",
  description: "Laat zien wat er van een token afhangt: welke tokens ernaar verwijzen en hoe vaak Icons en Components het gebruiken. Gebruik dit ALTIJD voordat je een token, verzameling of mode verwijdert of hernoemt.",
  inputSchema: { token: z.string().describe("Tokennaam, bijv. 'icon/low' of 'slate/500'") },
}, async ({ token }) => {
  const ref = `{${token}}`;
  const aliassen = [];
  for (const [coll, o] of [["semantic", S]])
    for (const [n, v] of Object.entries(o)) if (!n.startsWith("_") && [].concat(v).includes(ref)) aliassen.push(`${coll}::${n}`);
  const gebruik = [];
  for (const [f, { tokens = {} }] of Object.entries(bindings)) for (const [k, a] of Object.entries(tokens)) if (k.endsWith("::" + token)) gebruik.push(`${f}: ${a}×`);
  const bestaat = token in P || token in S;
  return text([`**${token}** ${bestaat ? "bestaat" : "bestaat NIET in Foundations"}.`,
    `Verwezen door: ${aliassen.length ? aliassen.join(", ") : "geen andere tokens"}.`,
    `Gebruikt in: ${gebruik.length ? gebruik.join(", ") : "geen koppelingen in Icons of Components (volgens figma/bindings.json)"}.`,
    aliassen.length || gebruik.length ? "Niet verwijderen: markeer eerst als verouderd en migreer (docs/besluiten/002-tokens-verwijderen.md)." : "Geen afhankelijkheden gevonden."].join("\n"));
});

return server;
}

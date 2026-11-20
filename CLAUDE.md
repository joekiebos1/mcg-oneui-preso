# mcg-oneui-preso

De presentatielaag van het OneUI design system: alle vastgelegde keuzes, leesbaar voor mensen.

- **Bron is mcg-oneui.** `src/oneui/` niet met de hand aanpassen: wijzig mcg-oneui; de workflow `preso` daar synct vanzelf (of draai `npm run sync`).
- **Data, niet overtypen.** Kleuren, maten en tekststijlen komen uit `src/oneui/tokens.json` (`src/lib/tokens.ts`).
  Tekst die uitlegt, komt uit de docs van mcg-oneui (`src/oneui/docs/`) of de regels van Myndlet; verzin geen regels.
  Staat iets alleen in Figma (zoals elevation), zeg dat op de pagina.
- **Opgebouwd met OneUI zelf**: de Text-component en alleen `--oneui-*`-tokens in `src/app.css`. Geen losse kleuren of maten.
- **Drie tekststijlen in de inhoud** (eigenaar 2026-11-20): display-s voor de titel, heading-m voor koppen, body-m voor de
  rest, ook tabellen en bijschriften. Geen vet. Code en tokennamen in mono; voorbeelden van componenten, bedieningen en
  de proeven op Typografie tellen niet mee. Ruim wit: de afstanden staan in `src/app.css` (`--tussen`).
- **Menu** in `src/menu.ts`, zoals de Myndlet-app: links de hoofdgroepen (L1) Fundament, Product, Content, Patronen,
  Componenten, Assets; daarnaast een paneel met de hoofdstukken van die groep (eigenaar 2026-11-18). Een hoofdstuk is één pagina
  met zijn delen onder elkaar; Componenten en Assets zijn eigen groepen. Onderaan elke
  pagina Vorige en Volgende. `klaar: true` is gevuld; de rest toont "Nog niet vastgelegd". Op mobiel is er één menu (de hamburger): de
  groepen met onder de open groep zijn hoofdstukken, geen paneel; de groep staat klein boven de titel (eigenaar 2026-11-20).
- **Verhaal** (eigenaar 2026-11-20): Kleuren is een verhalende pagina (`src/pages/foundations/Kleuren.tsx`): een kolom van
  720, een beeld van 16:9, vierkante kaarten met het onderschrift eronder, doen en niet doen als paar met een vinkje of
  kruisje, tabellen als één grijs vlak. De naslag (alle tokens, de regels) staat op `/kleuren/tokens`, niet in het menu.
- **De MCP** van OneUI staat ook hier online: `api/mcp.mjs` op `/mcp/<sleutel>`, met de server en gegevens uit mcg-oneui in `mcp/` (via de sync, niet met de hand). Zonder `ONEUI_MCP_SLEUTEL` in Vercel staat hij dicht.
- `npm run build` moet slagen. Naar `main` = live op Vercel, maar alleen als de site verandert (`scripts/vercel-overslaan.sh`). Vercel Hobby geeft 100 deploys per dag voor het hele account: bundel wijzigingen in één push.
- Nederlands, korte zinnen, ook in het menu (eigenaar 2026-11-18).

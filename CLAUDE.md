# mcg-oneui-preso

De presentatielaag van het OneUI design system: alle vastgelegde keuzes, leesbaar voor mensen.

- **Bron is mcg-oneui.** `src/oneui/` niet met de hand aanpassen: wijzig mcg-oneui; de workflow `preso` daar synct vanzelf (of draai `npm run sync`).
- **Data, niet overtypen.** Kleuren, maten en tekststijlen komen uit `src/oneui/tokens.json` (`src/lib/tokens.ts`).
  Tekst die uitlegt, komt uit de docs van mcg-oneui (`src/oneui/docs/`) of de regels van Myndlet; verzin geen regels.
  Staat iets alleen in Figma (zoals elevation), zeg dat op de pagina.
- **Opgebouwd met OneUI zelf**: de Text-component en alleen `--oneui-*`-tokens in `src/app.css`. Geen losse kleuren of maten.
- **Menu** in `src/menu.ts`, zoals de Myndlet-app: hoofdstukken met icoon; één link per hoofdstuk, zonder
  submenu; een hoofdstuk is één pagina met zijn delen onder elkaar; Product, Content en Patronen (eyebrows) met een lijn erboven; Assets en Componenten met een chevron. Onderaan elke pagina Vorige en
  Volgende (eigenaar 2026-11-18). `klaar: true` is gevuld; de rest toont "Nog niet vastgelegd".
- `npm run build` moet slagen. Naar `main` = live op Vercel, maar alleen als de site verandert (`scripts/vercel-overslaan.sh`). Vercel Hobby geeft 100 deploys per dag voor het hele account: bundel wijzigingen in één push.
- Nederlands, korte zinnen, ook in het menu (eigenaar 2026-11-18).

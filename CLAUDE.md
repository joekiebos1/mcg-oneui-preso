# mcg-oneui-preso

De presentatielaag van het OneUI design system: alle vastgelegde keuzes, leesbaar voor mensen.

- **Bron is mcg-oneui.** `src/oneui/` niet met de hand aanpassen: wijzig mcg-oneui en draai `npm run sync`.
- **Data, niet overtypen.** Kleuren, maten en tekststijlen komen uit `src/oneui/tokens.json` (`src/lib/tokens.ts`).
  Tekst die uitlegt, komt uit de docs van mcg-oneui (`src/oneui/docs/`) of de regels van Myndlet; verzin geen regels.
  Staat iets alleen in Figma (zoals elevation), zeg dat op de pagina.
- **Opgebouwd met OneUI zelf**: de Text-component en alleen `--oneui-*`-tokens in `src/app.css`. Geen losse kleuren of maten.
- **Menu** in `src/menu.ts`. `klaar: true` is gevuld; de rest toont "Nog niet vastgelegd".
- `npm run build` moet slagen. Naar `main` = live op Vercel.
- Nederlands, korte zinnen; de menunamen in het Engels, zoals de eigenaar ze koos.

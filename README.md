# OneUI — presentatielaag

De keuzes van het MCG OneUI design system, leesbaar voor mensen: foundations, components, rules en patterns.
Nu gevuld: **Foundations**. De rest staat al in het menu.

## Waar de inhoud vandaan komt

Alles komt uit [mcg-oneui](https://github.com/joekiebos1/mcg-oneui). `src/oneui/` is een kopie van de tokens
(`tokens.json`, `tokens.css`), de lettertypes, de React-componenten (Text, Button) en de foundations-docs.
De pagina's lezen de tokens zelf: een nieuwe kleur of maat in mcg-oneui verschijnt hier na een sync.

```bash
npm run sync            # haalt alles opnieuw uit ../mcg-oneui (of: npm run sync -- <pad>)
```

Daarna committen; Vercel bouwt zonder toegang tot mcg-oneui.

## Lokaal

```bash
npm install
npm run dev
```

## Vercel

Importeer de repo in Vercel (framework: Vite, build `npm run build`, output `dist`). `vercel.json` stuurt elke route
naar de app, zodat directe links werken.

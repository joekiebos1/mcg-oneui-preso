# List item

<!-- handmatig -->
## Wanneer gebruiken

Een rij in een lijst: een les, een oefening, een cliënt. Elk item is een eigen rond vlak; ruimte scheidt ze, geen
lijnen ([besluit 004](../besluiten/004-rond-vlakken-geen-randen.md)). Een item kan je openen (link of knop) of alleen
tonen.

## Do's en don'ts

- Doe: een korte titel en een beschrijving van één regel.
- Doe: de cirkel vooraan in een merkkleur om soorten te onderscheiden (video, oefening, opdracht).
- Niet: lijnen tussen de items, of een rand om het vlak.
- Niet: meer dan één actie in een item; zet extra acties op de pagina die het item opent.

## Specificatie

| deel | token |
|---|---|
| vlak | `surface/default` (in een wit vlak: `surface="sunken"`), `radius/3xl`, minstens 72 hoog |
| padding | `spacing/lg` boven en onder, `spacing/xl` links en rechts; `spacing/lg` tussen de delen |
| ruimte tussen items | `spacing/md` |
| titel | label/L, `text/high`; afgerond `text/medium` |
| beschrijving | body/S, `text/medium` |
| cirkel vooraan | `size/2xl` (40), `surface/{rol}/subtle` met het icoon (20) in `text/on-subtle/{rol}` |
| rechts | label/M in `text/medium`; bij een item dat je opent anders een chevron in `icon/low` |
| hover | `surface/sunken` (op sunken een stap dieper) |

## React

```tsx
import { List, ListItem } from "@mcg/oneui-react";

<List>
  <ListItem title="Ademhaling 4-7-8" description="Oefening · 5 min" icon={<IcoonWind />} tone="secondary" href="/oefening/478" />
  <ListItem title="Een vast ritme" description="Les 4 · nog niet open" trailing="ma" />
</List>
```

| prop | waarden | standaard |
|---|---|---|
| `title`, `description` | tekst | — |
| `icon` + `tone` | een icoon; `neutral` · `primary` · `secondary` · `accent` · `accent-2` | `neutral` |
| `leading` | iets anders vooraan, zoals een Avatar | — |
| `trailing` | tekst, een badge of een vinkje | chevron als hij opent |
| `href` of `onClick` | een link of een knop | — |
| `done`, `disabled` | `true` · `false` | `false` |
| `surface` (op `List`) | `default` · `sunken` | `default` |

## Toegankelijkheid

- `List` is een `<ul>`, elk item een `<li>` met daarin een link, een knop of tekst.
- Focus alleen bij het toetsenbord: de ring om het hele vlak.

## Referentie

React: `react/src/List.tsx` en `List.css`. Nog niet in Figma.
<!-- /handmatig -->

_Alleen in code. Deze pagina staat in `scripts/docs.mjs` bij CODE._

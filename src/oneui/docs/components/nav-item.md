# Nav item

## Varianten

| Eigenschap | Waarden |
|---|---|
| orientation | horizontal, vertical |
| state | default, hover, active, disabled |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Label | tekst |
| counter | aan/uit |
| icon | aan/uit |

<!-- handmatig -->
## Wanneer gebruiken

Een plek in de navigatie: het zijmenu (vertical) of een rij bovenaan (horizontal). Elk item is een pil; de pagina
waar je bent een sky pil. Geen lijnen ertussen ([besluit 004](../besluiten/004-rond-vlakken-geen-randen.md)).

## Do's en don'ts

- Doe: korte labels van één of twee woorden, met een icoon dat erbij past.
- Doe: een icoon mag een merkkleur hebben; de pil zelf blijft neutraal of sky.
- Niet: een teller voor iets dat geen actie vraagt.

## Specificatie

| deel | vertical | horizontal |
|---|---|---|
| hoogte | `size/3xl` (48) | `size/2xl` (40) |
| padding links/rechts | `spacing/xl` | `spacing/xl` |
| tekst | label/L | label/M |
| icoon | `size/xs`, `spacing/lg` van de tekst | `size/xs`, `spacing/md` |
| ruimte tussen items | `spacing/2xs` | `spacing/xs` |

Hoeken `radius/full`.

| state | vlak | tekst | icoon |
|---|---|---|---|
| default | — | `text/medium` | `icon/medium` (of een merkkleur) |
| hover | `surface/neutral/subtle-hover` | `text/high` | — |
| active | `surface/secondary/subtle` | `text/on-subtle/secondary` | `icon/secondary` |
| disabled | — | `text/disabled` | `icon/disabled` |

De teller is een pil van `size/sm` hoog in `surface/action/primary` met `text/on-action/primary`, label/S; boven 99
staat er 99+.

## React

```tsx
import { Nav, NavItem } from "@mcg/oneui-react";

<Nav aria-label="Hoofdmenu">
  <NavItem label="Vandaag" icon={<IcoonHuis />} href="/" active />
  <NavItem label="Berichten" icon={<IcoonBericht />} href="/berichten" counter={4} />
</Nav>
```

| prop | waarden | standaard |
|---|---|---|
| `label` | tekst | — |
| `icon` | een icoon met `currentColor` | — |
| `counter` | getal; 0 toont niets | — |
| `active`, `disabled` | `true` · `false` | `false` |
| `orientation` | `vertical` · `horizontal` (ook op `Nav`) | `vertical` |
| `href` of `onClick` | een link of een knop | — |

## Toegankelijkheid

- `Nav` is een `<nav>` met een `aria-label` en een lijst.
- Het actieve item heeft `aria-current="page"`.

## Referentie

React: `react/src/NavItem.tsx` en `NavItem.css`. Figma: DS Components › Nav item.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._

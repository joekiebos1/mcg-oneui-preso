# Icon Button

## Varianten

| Eigenschap | Waarden |
|---|---|
| Type | outline, primary, secondary, ghost |
| Size | md, sm, xs, lg, xl |
| State | default, disabled, hover, pressed |

<!-- handmatig -->
## Wanneer gebruiken

Een actie met alleen een icoon: zoeken, sluiten, meer opties, een favoriet. Een cirkel, altijd een vlak of kaal,
nooit een rand ([besluit 004](../besluiten/004-rond-vlakken-geen-randen.md)). Zonder tekst, dus altijd met een
toegankelijk label.

## Do's en don'ts

- Doe: een icoon dat iedereen kent (vergrootglas, kruis, plus). Twijfel je, gebruik dan een Button met tekst.
- Doe: neutral als standaard; primary alleen als dit de hoofdactie van het scherm is.
- Niet: een rand om de cirkel; outline toont als neutral.
- In Figma staat het icoon in een Icon-component; daar kies je ook lijn of vol.

## Specificatie

| maat | doorsnee | icoon |
|---|---|---|
| xs | `size/md` (28) | `size/2xs` (16) |
| sm | `size/xl` (36) | `size/2xs` (16) |
| md (standaard) | `size/2xl` (40) | `size/xs` (20) |
| lg | `size/3xl` (48) | `size/sm` (24) |
| xl | `size/4xl` (56) | `size/sm` (24) |

| type | vlak | hover | ingedrukt | icoon |
|---|---|---|---|---|
| primary | `surface/action/primary` | `…/primary-hover` | `…/primary-pressed` | `text/on-action/primary` |
| secondary | `surface/action/secondary` | `…/secondary-hover` | `…/secondary-pressed` | `text/on-action/secondary` |
| neutral (standaard) | `surface/action/neutral` | `surface/action/neutral-hover` | `surface/action/neutral-pressed` | `icon/high` |
| ghost | — | `surface/action/neutral` | `surface/action/neutral-hover` | `icon/high` |

Uitgeschakeld: `surface/disabled` met `icon/disabled`, ghost zonder vlak. Ingedrukt veert de cirkel in tot 92 %.
Focus alleen bij het toetsenbord: `border/thick` in `interaction/focusRing`, `spacing/2xs` los.

## React

```tsx
import { IconButton } from "@mcg/oneui-react";

<IconButton aria-label="Zoeken" icon={<IcoonZoek />} />
<IconButton aria-label="Nieuwe afspraak" variant="primary" size="lg" icon={<IcoonPlus />} />
```

| prop | waarden | standaard |
|---|---|---|
| `aria-label` | wat de knop doet (verplicht) | — |
| `icon` | een SVG met `currentColor` | — |
| `variant` | `primary` · `secondary` · `neutral` · `ghost` | `neutral` |
| `size` | `xs` · `sm` · `md` · `lg` · `xl` | `md` |

## Toegankelijkheid

- Een echte `<button>` met type "button". Het label is ook de tooltip (`title`).
- Raakvlak minstens 36 op een telefoon: kies daar sm of groter.

## Referentie

React: `react/src/IconButton.tsx` en `IconButton.css`. Figma: DS Components › Icon Button.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._

# Radio

## Varianten

| Eigenschap | Waarden |
|---|---|
| checked | false, true |
| size | md, sm |
| state | default, hover, focus, disabled |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Label | tekst |
| label | aan/uit |

<!-- handmatig -->
## Wanneer gebruiken

Een Radio kiest één optie uit een set. Laat altijd alle opties zien; gebruik Select bij meer dan vijf.
(Figma: DOC — Radio)

## Do's en don'ts

_Nog in te vullen._

## Specificatie

In de stijl Rond: een gevuld vlak zonder rand, zoals de baan van Toggle. Rond (`radius/full`).

| maat | rondje | teken |
|---|---|---|
| md (standaard) | `size/sm` (24) | stip 10 |
| sm | `size/xs` (20) | stip 8 (`spacing/md`) |

Label label/M in `text/high`, `spacing/lg` naast het rondje; de eerste regel staat midden naast het rondje.

| state | vlak |
|---|---|
| uit | `surface/action/neutral` (slate/200; haalt nu geen 3:1, uitzondering in [besluit 008](../besluiten/008-wcag-2-2-aa.md)) |
| hover | `surface/action/neutral-hover` (slate/300) |
| aan | `surface/action/primary`, hover `surface/action/primary-hover` |
| ingedrukt | schaal 0,9 |
| focus (toetsenbord) | een ring van `border/thick` in `interaction/focusRing`, `spacing/2xs` los van het rondje |
| uitgeschakeld | het component op 40 % ([besluit 013](../besluiten/013-uitgeschakeld-gedimd.md)), met label |

De stip in `text/on-action/primary`.

Uit is dezelfde grijs als de neutrale knop. Dat haalt geen 3:1 (WCAG 2.2 AA, 1.4.11): een bewuste uitzondering voor nu
([besluit 008](../besluiten/008-wcag-2-2-aa.md)).

## React

```tsx
import { Radio } from "@mcg/oneui-react";

<fieldset>
  <legend>Voorkeur voor een afspraak</legend>
  <Radio name="moment" value="ochtend" label="Ochtend" checked={m === "ochtend"} onChange={setM} />
  <Radio name="moment" value="middag" label="Middag" checked={m === "middag"} onChange={setM} />
</fieldset>
```

| prop | waarden | standaard |
|---|---|---|
| `name` | verplicht; radio's met dezelfde naam horen bij elkaar | — |
| `value` | verplicht | — |
| `label` | tekst | — |
| `size` | `md` (20) · `sm` (16) | `md` |
| `onChange` | `(value) => void` | — |

## Toegankelijkheid

- Een echte `<input type="radio">`: de pijltjes gaan door de groep.
- Zet een groep in een `<fieldset>` met een `<legend>`, zodat de vraag bij de opties hoort.

## Referentie

React: `react/src/Radio.tsx` en `Keuze.css`. Figma: DS Components › Radio.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._

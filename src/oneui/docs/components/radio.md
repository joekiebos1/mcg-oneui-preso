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

Label label/M in `text/high`, `spacing/lg` naast het rondje (sm `spacing/md`); de eerste regel staat midden naast het rondje.

| state | vlak |
|---|---|
| uit | `surface/neutral/subtle-pressed` |
| hover | een stap dieper (10 % `icon/high` erdoor) |
| aan | `surface/action/primary`, hover `surface/action/primary-hover` |
| ingedrukt | schaal 0,9 |
| focus (toetsenbord) | een ring van `border/thick` in `interaction/focusRing`, `spacing/2xs` los van het rondje |
| uitgeschakeld | `surface/disabled`, aan op 35 %; label `text/disabled` |

De stip in `text/on-action/primary`.

Let op: uit haalt 1,5:1 tegen wit, net als de baan van Toggle. WCAG vraagt 3:1 voor de vorm van een bediening; het label
ernaast maakt hem herkenbaar, maar een los rondje zonder label is te licht.

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

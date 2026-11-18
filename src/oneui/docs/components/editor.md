# Editor

## Varianten

| Eigenschap | Waarden |
|---|---|
| state | default, focus, filled, disabled |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Value | tekst |
| toolbar | aan/uit |

<!-- handmatig -->
## Wanneer gebruiken

Een Editor is een tekstveld voor langere tekst, met een werkbalk om op te maken. Zonder werkbalk is het een gewoon
lang tekstveld. In Figma staan alleen de states; het bewerken komt uit de bibliotheek die je erin hangt.
(Figma: DOC — Editor)

## Do's en don'ts

_Nog in te vullen._

## Specificatie

| deel | token |
|---|---|
| vak | `radius/lg`, `surface/default`, rand `border/thin` in `stroke/neutral/medium` |
| focus | rand 2 breed in `stroke/secondary/medium` |
| tekst | padding `spacing/xl`, label/M, `text/high`; placeholder `text/low` |
| werkbalk | onder de tekst, padding `spacing/md` `spacing/lg`, lijn erboven `stroke/neutral/low` |
| knoppen | `size/sm` (24), `radius/sm`, icoon `size/2xs` in `icon/medium`; aan `surface/secondary/subtle` |
| groepen | `spacing/md` ertussen, gescheiden door een lijn van `size/xs` hoog |
| uitgeschakeld | vlak `surface/disabled`, rand `stroke/disabled`, tekst `text/disabled` |

Werkbalk: vet, cursief, onderstreept · kop 1, kop 2 · genummerd, opsomming · lijn, link. Kop 1 is title/L, kop 2
title/M.

## React

```tsx
import { Editor } from "@mcg/oneui-react";

<Editor label="Notitie" placeholder="Schrijf hier…" defaultValue="<p>Begin</p>" onChange={(html) => bewaar(html)} />
<Editor aria-label="Verslag" toolbar={false} />
```

| prop | waarden | standaard |
|---|---|---|
| `defaultValue` | HTML bij het begin | — |
| `onChange` | `(html) => void` | — |
| `placeholder` | tekst als hij leeg is | — |
| `label`, `aria-label` | tekst | — |
| `toolbar` | werkbalk tonen | `true` |
| `disabled` | — | `false` |
| `vraagLink` | vraagt het adres voor een link | venster van de browser |

De editor gebruikt de opmaak van de browser zelf (`contentEditable`). Voor meer, zoals plakken opschonen of
samenwerken, hang je een bibliotheek als TipTap in dezelfde stijl.

## Toegankelijkheid

- Het tekstvlak heeft `role="textbox"` en `aria-multiline`, met het label eraan gekoppeld.
- De werkbalk is een `role="toolbar"`; elke knop heeft een label en `aria-pressed` als de opmaak aan staat.

## Referentie

React: `react/src/Editor.tsx` en `Editor.css`. Figma: DS Components › Editor.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._

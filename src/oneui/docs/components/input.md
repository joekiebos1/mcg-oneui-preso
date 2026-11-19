# Input

## Varianten

| Eigenschap | Waarden |
|---|---|
| type | text, search, number, code, textarea |
| size | md, sm |
| state | default, hover, focus, filled, error, disabled |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Label | tekst |
| Value | tekst |
| Message | tekst |
| label | aan/uit |
| hint | aan/uit |
| counter | aan/uit |
| Icon left | aan/uit |
| Icon right | aan/uit |
| hint icon | aan/uit |

<!-- handmatig -->
## Wanneer gebruiken

Een Input haalt een waarde op bij de gebruiker. Het label staat erboven, hulp of een fout eronder. Het vlak laat de
state zien, zonder rand ([besluit 004](../besluiten/004-rond-vlakken-geen-randen.md)). (Figma: DOC — Input)

- **text**: één regel tekst.
- **search**: zoeken; een pil met een vergrootglas. Met een waarde verschijnt een kruisje om te wissen.
- **number**: een getal, zonder de pijltjes van de browser.
- **textarea**: meerdere regels.
- **code**: een code van een paar cijfers, elk in een eigen vakje.

## Do's en don'ts

_Nog in te vullen._

## Specificatie

Alle waarden zijn tokens (`dist/tokens.css`).

### Het vak

| maat | hoogte | padding boven/onder | padding links/rechts | hoeken |
|---|---|---|---|---|
| md (standaard) | 48 | `spacing/lg` | `spacing/xl` | `radius/2xl` |
| sm | 40 | `spacing/md` | `spacing/lg` | `radius/xl` |

Een gevuld vlak zonder rand: `surface/sunken`. Hover een stap dieper (tussen sunken en `surface/action/neutral-hover`).
Focus: het vlak wordt `surface/default` met een zachte schaduw (`effect/shadow/key`) en komt los van de pagina; de
cursor in `interaction/focusRing`. Tekst label/M in `text/high`, placeholder `text/low`. Iconen `size/xs` in
`icon/medium`, `spacing/md` van de tekst.

- **search:** hoeken `radius/full`. Het kruisje om te wissen is een rond knopje van `size/sm` in
  `surface/action/neutral-hover`.
- **code:** vierkante vakjes van `size/3xl` (sm `size/2xl`), `spacing/md` ertussen, het cijfer in het midden.
- **teller:** rechts in de regel van de hulptekst, body/XS.

### Label, hulptekst en fout (gedeeld met Select en Editor)

| deel | token |
|---|---|
| label | label/M, `text/high`, ingesprongen tot de tekst in het vak (`spacing/xl`, bij sm `spacing/lg`) |
| hulptekst | body/XS, `text/medium`, net zo ingesprongen |
| ruimte tussen label, vak en hulptekst | `spacing/sm` |
| fout | vak `surface/negative/subtle`, zonder rand; de melding in `icon/negative` vervangt de hulptekst |
| uitgeschakeld | vak `surface/disabled`, tekst `text/disabled` |

Select deelt dit vak. De Editor heeft nog een rand; die volgt later.

## React

```tsx
import { Input } from "@mcg/oneui-react";

<Input label="Naam" hint="Zoals op je pas" placeholder="Voornaam" />
<Input label="Zoeken" type="search" onChange={(v) => zoek(v)} />
<Input label="Mail" error="Dit is geen mailadres" />
<Input label="Code" type="code" length={4} />
```

| prop | waarden | standaard |
|---|---|---|
| `type` | `text` · `search` · `number` · `textarea` · `code` | `text` |
| `size` | `md` (48) · `sm` (40) | `md` |
| `label`, `hint`, `error` | tekst | — |
| `iconLeft`, `iconRight` | een SVG met `currentColor` | — |
| `counter` | teller "aantal/maxLength", met `maxLength` | `false` |
| `rows` | regels bij textarea | `4` |
| `length` | vakjes bij code | `4` |
| `onChange` | `(value, event) => void` | — |

Verder alle attributen van `<input>` (bij textarea van `<textarea>`).

## Toegankelijkheid

- Het label is een echt `<label>`; hulptekst en fout hangen aan het veld met `aria-describedby`.
- Bij een fout `aria-invalid` en de melding met `role="alert"`.
- Zonder zichtbaar label: geef het veld een `aria-label`.
- Code: elk vakje heeft een label ("Cijfer 1 van 4"); typen springt door, Backspace en de pijltjes gaan terug.
- Het kruisje bij search is een knop met het label "Wissen".

## Referentie

React: `react/src/Input.tsx`, `Input.css` en `Veld.css`. Figma: DS Components › Input.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._

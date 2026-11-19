# 006 — Geen brand-laag; één stijl, Round

Datum: 2026-11-19 · Status: besloten · Vervangt de brand-laag (modes Classic en Round)

## Besluit

- Foundations heeft twee verzamelingen: **primitives** (de ladders) en **semantic** (licht en donker). De brand-laag
  is weg; semantic wijst direct naar de ladders.
- Er is één stijl: **Round**. Classic (El Messiri en DM Sans) is weg. Alles staat in Google Sans Flex Rond; de
  tekststijlen hebben het lettertype, de stijl en de letterafstand vast. Alleen het gewicht van body (350) komt uit een
  variabele, `type/weight/body` in primitives, omdat 350 geen benoemde stijl van het lettertype is.
- In semantic betekent een naam óf een functie, óf een kleur:
  - functie: `action/primary`, `action/secondary`, `interaction/focusRing`, de signalen (`positive`, `negative`,
    `warning`, `informative`) en de neutrale opbouw (`surface/page`, `text/high`, …);
  - kleur: `magenta`, `sky`, `amber`, `violet`, elk met subtle, bold en deep.

| was | is |
|---|---|
| `…/primary/…`, `icon/primary`, `text/on-*/primary` | `…/magenta/…` |
| `…/secondary/…` | `…/sky/…` |
| `…/accent/…` | `…/amber/…` |
| `…/accent-2/…` | `…/violet/…` |
| `brand/action/light/*`, `brand/action/dark/*` | direct in `surface/action/*`, `text/on-action/*`, `stroke/action/secondary` |
| `--oneui-font-brand`, `--oneui-font-ui` | `--oneui-font` |
| `data-brand="round"` | niet meer nodig |

## Waarom

De rolnamen (primary, secondary, accent, accent-2) betalen zich alleen terug bij meer merken met andere kleuren. Die
zijn er niet: Classic en Round hadden dezelfde kleuren en verschilden alleen in de letter. De rollen gaven verwarring,
zoals `secondary/bold` (sky 400) tegenover `action/secondary` (sky 200). Met één stijl is er niets meer om te wisselen.

## Gevolgen

- Figma: de variabelen zijn op hun plek hernoemd, zodat koppelingen blijven staan. Na publiceren van DS-Foundations
  volgen DS Components, DS-Icons en de werkbestanden vanzelf; een expliciete brand-mode op een frame valt weg.
- Code: alle namen zijn mee hernoemd (componenten, docs, presentatielaag, Myndlet).
- Komt er ooit een tweede merk met eigen kleuren, dan komt er weer een vertaallaag tussen primitives en semantic.

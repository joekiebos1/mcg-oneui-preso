# Icon

## Varianten

| Eigenschap | Waarden |
|---|---|
| size | 2xs, xs, s, m, l, xl, 2xl |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Icon Asset | icoon |

<!-- handmatig -->
## Wanneer gebruiken

Elk icoon in een ontwerp staat in dit component, ook in andere componenten (Button, Icon Button, Input, Nav item,
Chip, Tabs, Avatar …). Een los icoon uit DS-Icons zet je niet direct neer ([besluit 005](../besluiten/005-icoon-altijd-via-icon.md)).

- **Icon Asset** kiest het icoon uit DS-Icons.
- **size** kiest de maat: 2xs 12, xs 16, s 20, m 24, l 32, xl 40, 2xl 48.
- **Fill** (onder Icon Asset) wisselt tussen lijn en vol, bij iconen die een volle variant hebben. In DS-Icons staan
  die als set met `Fill=false` (de lijn) en `Fill=true` (vol), in de sectie "Icons met fill".

## Do's en don'ts

- Doe: vol voor wat gekozen of actief is (het actieve item in een menu, een opgeslagen favoriet), lijn voor de rest.
- Doe: de kleur zetten op de laag `icon` met een icon-token ([besluit 003](../besluiten/003-icoon-een-laag.md)); die blijft
  staan als je het icoon of Fill wisselt.
- Niet: een icoon los neerzetten of een maat buiten de zeven maten.
- Niet: lijn en vol door elkaar in één rij gebruiken zonder dat het iets betekent.

## Hoe vol werkt

Het volle icoon volgt vaste regels, zodat het bij elk icoon hetzelfde voelt:

1. Wat binnen de vorm ligt, wordt een negatief in de lijndikte (1,75).
2. Een lijn die de rand raakt, loopt door tot de rand; een losse lijn blijft los.
3. Overlappen: de voorste figuur krijgt een witte contour van 1,75; wat erachter ligt, blijft heel.
4. Kleine stukjes (korter dan twee lijndiktes) vallen weg; gaten smaller dan een lijn gaan dicht.
5. Badges blijven lijn; de hoofdvorm wordt vol met een spleet. Bij badges en kleine delen is de spleet 1,25, zodat hij
   op 12 px nog klopt.
6. Stippen worden negatief.

## Referentie

Figma: DS Components › Icon (de laag Icon Asset is blootgesteld, zodat Fill in het eigenschappenpaneel staat) en
DS-Icons › Icons met fill. In code is een icoon een SVG met `currentColor`; een Icon-component in code volgt.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._

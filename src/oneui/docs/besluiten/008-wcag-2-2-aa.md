# 008 — WCAG 2.2 AA

Datum: 2026-11-19 · Status: besloten (eigenaar)

## Besluit

OneUI haalt **WCAG 2.2 niveau AA**. Dat is wat de zorg aanhoudt en waar de Europese norm heen gaat: EN 301 549 v4.1.1
(september 2026) neemt WCAG 2.2 AA over. AAA is geen standaard.

## Wat dat vraagt van de tokens

| criterium | eis | hoe |
|---|---|---|
| 1.4.3 Contrast (minimum) | tekst 4,5:1, grote tekst 3:1 | `npm run check` toetst elk tekstpaar in licht en donker |
| 1.4.11 Contrast van niet-tekst | wat je nodig hebt om een bediening of zijn stand te herkennen: 3:1 tegen wat ernaast ligt | iconen 3:1; de vorm van een bediening die uit staat in `surface/control/off` |
| 2.4.7 en 2.4.11 Focus zichtbaar | focus altijd te zien, niet verstopt | `interaction/focusRing`, `border/thick`, alleen bij het toetsenbord |
| 2.5.8 Doelgrootte (minimum) | 24 × 24 | Checkbox en Radio md zijn 24; het label hoort bij het klikvlak |

Uitgeschakeld valt buiten 1.4.11.

## Gevolg

Een Checkbox of Radio die uit staat, en de baan van een Toggle die uit staat, zijn `surface/control/off` (slate/500):
3,4:1 op wit, 3,2:1 op de pagina. Slate/400 haalt 1,96:1 en slate/300 1,5:1, dus die vallen af. Een lichte baan met
een witte knop (zoals iOS) haalt het niet: de vorm van de bediening zelf moet 3:1 halen. Niet op `surface/sunken`
zetten: daar haalt slate/500 2,97:1.

Het grote vlak van Input (`surface/sunken`) haalt geen 3:1 en hoeft dat ook niet: het veld is herkenbaar aan zijn label
en placeholder, het vlak is niet het enige signaal.

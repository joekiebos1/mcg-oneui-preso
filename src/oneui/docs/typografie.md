# Typografie

Eén lettertype: **Google Sans Flex Rond**, Google Sans Flex met rondheid 25 en breedte 90 vast in het lettertype (in
Figma: `figma/fonts/`, installeren; in code: `dist/fonts/`, zelf gehost). SIL Open Font License: vrij te gebruiken en
mee te leveren. Niet via de servers van Google laden. In code is het `var(--oneui-font)`.

## Rollen

| Rol | Gewicht, letterafstand | Doet | Maten (letter/regel) |
|---|---|---|---|
| display | 600, -2% | merkmoment: covers, slides, paginatitels | XL 96/104 · L 64/72 · M 48/56 · S 36/44 |
| heading | 600, -2% | structuur in de app | L 28/36 · M 22/28 · S 18/24 |
| title | 600, -1% | naam van een onderdeel: kaart, dialoog | XL 32/40 · L 20/28 · M 18/24 · S 16/24 |
| body | 350, 0,5% | lopende tekst | XL 24/32 · L 20/28 · M 16/24 · S 14/20 · XS 12/16 · 2XS 10/16 |
| label | 500, 0,5% | knoppen, velden, tabs | XL 22/28 · L 18/24 · M 14/20 · S 12/16 |

De stappen worden naar boven groter: +2 tot M, daarna +4 (body 16 → 20 → 24, label 14 → 18 → 22). Zo blijft XL
duidelijk groter dan L zonder in de kopmaten te komen (heading/L is 28).

Er zijn geen modes: een slide gebruikt XL en L, de app M en kleiner.

Body is 350, tussen Light en Regular in. Dat is geen benoemde stijl van het lettertype, dus in Figma komt het gewicht
uit de variabele `type/weight/body`; de rest staat vast in de stijl. De letterafstand staat in de stijl, in procenten.

## Regelhoogte

Per rol een vaste verhouding, afgerond op het 4px-raster: display 1,1–1,2, heading ~1,3, title 1,25–1,4,
body ~1,5, label ~1,4.

## Vertical trim

Display en heading staan op *cap height tot baseline*; in CSS `text-box: trim-both cap alphabetic`. De ruimte rond
een kop regel je met spacing. De UI-stijlen hebben geen trim. Zet *clip content* uit op frames met getrimde tekst,
anders vallen onderkanten (g, j) weg.

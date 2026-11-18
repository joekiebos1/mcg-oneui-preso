# Typografie

Twee families: **El Messiri** voor display en heading, **DM Sans** voor alles in de UI. In de brand Round zijn
beide **Google Sans Flex Rond**: Google Sans Flex met rondheid 25 en breedte 90 vast in het lettertype
(in Figma: `figma/fonts/`, installeren; in code: `dist/fonts/`, zelf gehost). Alle drie SIL Open Font License: vrij te gebruiken en mee te leveren. Laad ze zelf gehost
(`@fontsource-variable/el-messiri`, `@fontsource-variable/dm-sans`, `@fontsource-variable/google-sans-flex`), niet via de
servers van Google.

## Rollen

| Rol | Font | Doet | Maten (letter/regel) |
|---|---|---|---|
| display | El Messiri 400, -4% | merkmoment: covers, slides, paginatitels | XL 96/104 · L 64/72 · M 48/56 · S 36/44 |
| heading | El Messiri 400, -4% | structuur in de app | L 28/36 · M 22/28 · S 18/24 |
| title | DM Sans 600 | naam van een onderdeel: kaart, dialoog | XL 32/40 · L 20/28 · M 18/24 · S 16/24 |
| body | DM Sans 400 | lopende tekst | XL 24/32 · L 20/28 · M 16/24 · S 14/20 · XS 12/16 · 2XS 10/16 |
| label | DM Sans 500 | knoppen, velden, tabs | XL 22/28 · L 18/24 · M 14/20 · S 12/16 |

De stappen worden naar boven groter: +2 tot M, daarna +4 (body 16 → 20 → 24, label 14 → 18 → 22). Zo blijft XL
duidelijk groter dan L zonder in de kopmaten te komen (heading/L is 28).

Er zijn geen modes: een slide gebruikt XL en L, de app M en kleiner. In Round zijn display en heading Google Sans Flex Rond 600.

Body en label hebben 0,5% letterafstand, in beide brands. Het gewicht van body komt uit `type/ui/weight/body`: 400 in
Classic, 350 in Round. Daarom staat de letterafstand van body en label in de stijl zelf (in procenten) en geldt die voor beide brands.

Display, heading en title hebben per brand een eigen letterafstand: Classic display en heading -4%, title 0; Round
display en heading -2%, title -1%. In Figma staat dat in `type/letter-spacing/<stijl>`, één variabele per stijl in
pixels, omdat Figma een gekoppelde letterafstand in pixels rekent. Een ander percentage betekent dus de pixels per stijl
opnieuw uitrekenen. In code staat het per brand als em in `tokens.css` (`[data-brand="round"]`).

## Regelhoogte

Per rol een vaste verhouding, afgerond op het 4px-raster: display 1,1–1,2, heading ~1,3, title 1,25–1,4,
body ~1,5, label ~1,4.

## Vertical trim

Display en heading staan op *cap height tot baseline*; in CSS `text-box: trim-both cap alphabetic`. De ruimte rond
een kop regel je met spacing. De UI-stijlen hebben geen trim. Zet *clip content* uit op frames met getrimde tekst,
anders vallen onderkanten (g, j) weg.

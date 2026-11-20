# 013 — Uitgeschakeld is gedimd

Datum: 2026-11-20 · Status: besloten (eigenaar)

## Besluit

Een uitgeschakeld component blijft zoals het is en staat op **40 %**: vlak, tekst, icoon en label. Geen hover, niet
indrukken, de cursor `not-allowed`. Dat geldt voor alle componenten: Button, Icon Button, Checkbox, Radio, Toggle,
Input, Select, Editor, Slider, Tabs, Nav item en List item.

Zo zie je nog welk type het is (primary, secondary, neutral) en of iets aan of uit staat, en lijkt uitgeschakeld niet meer
op neutral. Eerst was het grijs, behalve een keuze die aan stond (de eigen kleur op 35 %): drie regels voor één toestand.

## Tokens

`surface/disabled`, `text/disabled` en `icon/disabled` zijn weg ([002](002-tokens-verwijderen.md)). In één keer, zoals
bij [007](007-twee-lijnen.md) en [010](010-neutrale-vlakken.md): eerst omgezet, toen verwijderd.

- Code: elk component op `opacity: 0.4`.
- DS Components: elke variant met `state=disabled` kreeg de kleuren van zijn standaardvariant en een laagdekking van 40 %.
  Wat los nog `disabled` gebruikte (de baan van Toggle die uit staat, tabelknoppen, de Sessiemanager-demo) staat op
  `surface/sunken` en `text/low`.
- Myndlet (Figma): 34 vlakken van `surface/disabled` naar `surface/sunken` (zelfde waarde in licht).

## Toegankelijkheid

Uitgeschakeld valt buiten de contrasteisen van WCAG ([008](008-wcag-2-2-aa.md)). Een uitgeschakelde keuze die uit staat
valt in licht bijna weg; dat is bewust.

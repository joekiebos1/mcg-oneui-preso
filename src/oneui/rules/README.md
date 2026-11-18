# Rules

De regels van MCG, verdeeld naar wie er eigenaar van is. Wat voor beide geldt, zoals kleur en letter, staat in de
foundations. Patterns is waar product en content samenkomen, zoals een video in een les of een illustratie in een leeg
scherm. De presentatielaag (mcg-oneui-preso) toont ze onder Rules.

| map | wat | eigenaar |
|---|---|---|
| `product/` | de interface: schermen, flows, componenten | product design |
| `content/` | de bouwstenen voor content: illustratiestijl, beeldtaal, schrijfstijl | content design |

## Content

Hier staan de bouwstenen voor content, voor heel MCG: `illustraties.md`, `beeldtaal.md` en `schrijfstijl.md`. De
lijn: bouwstenen hier, assets en formats in Myndlet. De formats (kaarten, infographics, video) en de werkwijze van
Myndlet (draaiboek, acteurs, studio, stem, montage, supers, b-roll, de script-templates) staan in de Myndlet-repo.

De Myndlet-app leest en schrijft deze drie hier rechtstreeks (onder Regels in de app). Je kunt ze ook direct
aanpassen, met de hand of met AI. Bij elke wijziging op main leest de workflow `regels` alle regeltabellen met de code
en de regels van Myndlet (`tools/regels.py controle`); is hij rood, dan zijn ze zo niet te lezen voor de app en de keten.

Een tabel met `Regeltabel: naam` erboven is voor de code: daarin alleen woorden uit de woordenlijst van `draaiboek.md`
in Myndlet. De rest is voor mensen en voor Claude.

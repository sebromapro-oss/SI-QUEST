# SI QUEST — Audit ciblé des missions 518 à 542 (V2.5)

**Date : 30 octobre 2026.** **HEAD initial :** `051964a9e40f6c8f896cfda64b453fadb3aaaaed`. **Périmètre :** 25 missions, cinq fichiers `src/batch518-522.js` à `src/batch538-542.js`. Aucun nouveau niveau ajouté. Phase 1 maintenue.

## Contre-calculs analytiques

Les lois explicites des cinq lots ont été recalculées hors moteur de jeu par des fonctions de référence distinctes dans les fichiers de tests, aux paramètres minimal, nominal et maximal : **75 évaluations numériques**. **25 valeurs nominales sur 25 concordent** avec les champs `expected`, selon `|écart| ≤ 10⁻⁹ max(1, |référence|)`. Les 50 valeurs aux bornes ont été recalculées, et les tests automatisés des lots contrôlent également le moteur sur ces bornes. Ces vérifications ne prouvent ni les hypothèses physiques en situation réelle ni la conformité visuelle.

| N° | Mission | Minimum → résultat | Nominal → résultat | Maximum → résultat | Unité |
|---:|---|---:|---:|---:|---|
| 518 | `bearing-cage-ftf-01` | 2 | 6 | 10 | Hz |
| 519 | `solenoid-air-core-field-01` | 1,2566371 | 5,0265482 | 7,5398224 | mT |
| 520 | `vibrating-string-fundamental-01` | 14,90712 | 23,570226 | 29,81424 | Hz |
| 521 | `pneumatic-critical-pressure-ratio-01` | 0,56447393 | 0,52828179 | 0,48950789 | sans unité |
| 522 | `solid-shear-wave-speed-01` | 2 257,3306 | 3 192,3475 | 3 569,1531 | m/s |
| 523 | `thin-wall-cylinder-hoop-01` | 12,5 | 50 | 75 | MPa |
| 524 | `diesel-bsfc-01` | 600 | 300 | 150 | g/kWh |
| 525 | `ultrasonic-snell-refraction-01` | 7,9972963 | 33,697745 | 55,979469 | ° |
| 526 | `fiber-numerical-aperture-01` | 0,17058722 | 0,29647934 | 0,38405729 | sans unité |
| 527 | `gas-adiabatic-compression-pressure-01` | 1,7641185 | 3,6067498 | 6,9644045 | bar abs |
| 528 | `boost-ideal-output-voltage-01` | 15 | 20 | 30 | V |
| 529 | `cantilever-tip-mass-frequency-01` | 17,865098 | 12,632532 | 10,314419 | Hz |
| 530 | `tapered-rod-axial-extension-01` | 0,09700873 | 0,04850436 | 0,03880349 | mm |
| 531 | `pt100-self-heating-error-01` | 0,01375 | 0,22 | 0,88 | K |
| 532 | `v-belt-wedge-tension-ratio-01` | 20,791526 | 9,9378491 | 6,4135336 | sans unité |
| 533 | `oring-groove-squeeze-01` | 25,714286 | 14,285714 | 5,7142857 | % |
| 534 | `ballscrew-lifting-torque-01` | 7,073553 | 14,147106 | 28,294212 | N·m |
| 535 | `elastic-pipe-pressure-wave-speed-01` | 1 223,6528 | 1 255,7751 | 1 272,8149 | m/s |
| 536 | `supercapacitor-constant-current-charge-time-01` | 150 | 75 | 37,5 | s |
| 537 | `scotch-yoke-displacement-01` | 0 | 20 | 80 | mm |
| 538 | `laser-michelson-fringe-displacement-01` | 0,03164 | 0,3164 | 0,6328 | mm |
| 539 | `photodiode-shot-noise-rms-01` | 0,56607007 | 1,7900707 | 2,5315423 | nA |
| 540 | `gear-involute-base-pitch-01` | 7,5863637 | 7,3803286 | 6,8017476 | mm |
| 541 | `thin-steel-tube-hoop-strain-01` | 190,47619 | 476,19048 | 761,90476 | µm/m |
| 542 | `pv-module-temperature-derating-01` | 300 | 270 | 240 | W |

## Anomalies confirmées et corrigées dans le code

1. **518 — Roulement, FTF :** le cercle primitif dessiné avait un rayon de 75 px, mais les billes un rayon de 10 px : rapport graphique `d/D=10/75=0,1333` au lieu de `8/40=0,20`. Correction : bille de rayon 15 px, rayons des pistes 60 et 90 px, assurant les deux contacts. Test du rapport et des huit billes.
2. **530 — Tirant conique :** rayon gauche initial de 24 px pour 15 mm, rayon droit de 30 px pour 20 mm, soit deux échelles différentes. Correction : rayon gauche 22,5 px ; même échelle de 1,5 px/mm aux trois paramètres contrôlés. Test de proportion et de coaxialité.
3. **541 — Tube mince :** rayons dessinés 79 et 90 px, soit `e/D=11/(2×79)=0,0696` au lieu de `1,5/30=0,05`. Correction : rayons intérieur 80 px et extérieur 88 px. Test de la même échelle radiale.
4. **525 — Réfraction ultrasonore :** la fonction SVG ignorait le septième argument des lignes ; les deux flèches des rayons et le pointillé de la normale étaient donc absents, malgré leur présence dans les appels. Correction de l'attribut SVG optionnel et test des deux marqueurs et du pointillé.

**Quatre correctifs ciblés et quatre tests de non-régression ajoutés.** Aucun fichier d'accueil, de carte, d'asset ou de mission HTML modifié. Aucun changement d'historique Git.

## État des preuves et limites

- **S — scientifique :** contre-calculs numériques aux trois paramètres ; validation de modèles et hypothèses réelles **partielle**.
- **G — graphique :** assertions SVG des quatre anomalies corrigées ; recette visuelle navigateur **non réalisée**.
- **P — pédagogique :** règles et contenu structurels couverts par tests existants ; validation individuelle en situation de classe **non réalisée**.
- **F — fonctionnel :** tests Node/DOM existants ; vérifier les trois workflows sur le commit final avant réception.
- **A — accessibilité :** balises/attributs contrôlés par tests existants ; NVDA, TalkBack, VoiceOver et essais sur appareils physiques **non réalisés**.
- **Sécurité :** pas d'audit exhaustif de l'historique et des secrets dans ce cycle.

**Décision : phase 1 maintenue.** Prochaine priorité : vérifier la CI du dernier commit, inspection visuelle des scènes 518/525/530/541, puis audit des missions 493 à 517 ; aucune création 598+ avant réception.

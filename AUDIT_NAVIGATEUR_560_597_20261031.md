# SI QUEST V2.5 — Audit du dernier lot 560–597 — 31 octobre 2026

## Périmètre et chaîne de preuves

- Dépôt `sebromapro-oss/SI-QUEST`, branche `main` ; HEAD de départ `0854f7d3744c9294e80eb24dc4a144453b779cb8`.
- [Recette Chromium du lot 510–559 — 41209556550](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41209556550) : **success** sur `5dd18abe`. Couverture navigateur **confirmée avant ce cycle : 559/597 (93,6 %)**.
- [Test structurel et scientifique des 38 dernières missions](tests/audit-browser-batch-560-597-structure-and-science.test.cjs) : commit [`6b7b71ff`](https://github.com/sebromapro-oss/SI-QUEST/commit/6b7b71ffff53e6b8acfd30b1fb757bbe1863b280). Trois workflows Node/science **success** : [recette 41213742270](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213742270), [science 41213742263](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213742263), [qualité 41213742305](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213742305).
- [Extension de la recette navigateur](tests/mission-browser.spec.cjs) : commit [`3aab4d45`](https://github.com/sebromapro-oss/SI-QUEST/commit/3aab4d45a0decbb6c4e0b0ed702f04a1c13dd81b). **38 missions nouvelles dans la couverture, zéro mission créée.** Les tests Chromium bureau/Android émulé sont **en attente de verdict** au moment de la publication ; ne pas annoncer 597/597 avant succès des deux shards.
- Audit direct du HTML des **38/38** pages : langue FR, lien d'évitement, objectifs et prérequis visibles, configuration numérique finie et bornée ; **aucune anomalie structurelle détectée**. Les tests permanents recoupent ces constats avec le moteur, aux bornes et au nominal.

## Inventaire nominatif (38 missions)

| N° | Identifiant | Univers |
|---:|---|---|
| 560 | `voltage-divider-sensor-01` | SI-08 |
| 561 | `wheel-braking-slip-01` | SI-01 |
| 562 | `laminar-darcy-factor-01` | SI-06 |
| 563 | `triangle-actuator-angle-01` | SI-01 |
| 564 | `stokes-sphere-drag-01` | SI-11 |
| 565 | `parallel-load-resultant-position-01` | SI-03 |
| 566 | `floating-cylinder-draft-01` | SI-02 |
| 567 | `quarter-bridge-strain-from-voltage-01` | SI-13 |
| 568 | `hydrostatic-rectangular-gate-force-01` | SI-06 |
| 569 | `flywheel-kinetic-energy-01` | SI-02 |
| 570 | `liquid-acoustic-impedance-01` | SI-13 |
| 571 | `capillary-meniscus-pressure-01` | SI-06 |
| 572 | `magnetic-core-reluctance-01` | SI-08 |
| 573 | `battery-peukert-runtime-01` | SI-15 |
| 574 | `zener-series-resistor-current-01` | SI-08 |
| 575 | `bearing-outer-race-bpfo-01` | SI-15 |
| 576 | `hydraulic-oil-elastic-energy-01` | SI-06 |
| 577 | `clutch-synchronization-heat-01` | SI-05 |
| 578 | `mutual-inductance-emf-01` | SI-08 |
| 579 | `three-phase-current-thd-01` | SI-08 |
| 580 | `bearing-cage-ftf-01` | SI-15 |
| 581 | `vibrating-string-fundamental-01` | SI-02 |
| 582 | `pneumatic-critical-pressure-ratio-01` | SI-07 |
| 583 | `thin-wall-cylinder-hoop-01` | SI-04 |
| 584 | `tapered-rod-axial-extension-01` | SI-04 |
| 585 | `pt100-self-heating-error-01` | SI-13 |
| 586 | `ballscrew-lifting-torque-01` | SI-05 |
| 587 | `elastic-pipe-pressure-wave-speed-01` | SI-06 |
| 588 | `transformer-load-voltage-drop-01` | SI-08 |
| 589 | `rectangular-plate-polar-mass-inertia-01` | SI-02 |
| 590 | `combined-axial-bending-stress-01` | SI-04 |
| 591 | `timer-pwm-fast-frequency-01` | SI-09 |
| 592 | `spur-gear-transverse-contact-ratio-01` | SI-05 |
| 593 | `magnetic-gap-maxwell-force-01` | SI-08 |
| 594 | `gray-code-4bit-decode-01` | SI-09 |
| 595 | `two-layer-wall-heat-rate-01` | SI-12 |
| 596 | `loop-4-20ma-burden-limit-01` | SI-08 |
| 597 | `vickers-indent-pressure-01` | SI-14 |

## Contre-calculs indépendants

Les **38 lois du dernier lot** disposent désormais d'une référence physique ou mathématique indépendante du moteur de production, sur les valeurs nominales, les deux bornes et un point intermédiaire autorisé : **152 comparaisons numériques**, plus contrôle des unités, du domaine et de la valeur attendue. Le tableau suivant détaille les 12 premières ; les 26 suivantes sont couvertes par les deux fichiers de tests complémentaires cités ci-dessous.

| Mission | Loi physique indépendante | Unité résultat |
|---|---|---|
| `voltage-divider-sensor-01` | `U₂ = 5 R₂/(2,2 + R₂)`, résistances en kΩ | V |
| `wheel-braking-slip-01` | `s = (5 − 0,4 ω)/5 × 100` | % |
| `stokes-sphere-drag-01` | `F = 6π μ r v`, μ = 1 Pa·s, r = 0,002 m, v convertie en m/s | mN |
| `flywheel-kinetic-energy-01` | `E = (J/2)(2πn/60)²`, J = 2 kg·m² | kJ |
| `magnetic-core-reluctance-01` | `ℜ = ℓ/(μ₀ μᵣ A)`, μᵣ = 1800, A = 4×10⁻⁴ m² | kA/Wb |
| `zener-series-resistor-current-01` | `I = (U − 5,1)/330`, A convertis en mA | mA |
| `hydraulic-oil-elastic-energy-01` | `E = V(Δp)²/(2K)`, V = 0,002 m³, K = 1,5 GPa | J |
| `thin-wall-cylinder-hoop-01` | `σθ = pD/(2e)`, D = 100 mm, e = 2 mm | MPa |
| `timer-pwm-fast-frequency-01` | `f = 16 MHz/[64(TOP+1)]`, TOP entier | Hz |
| `gray-code-4bit-decode-01` | Décodage par XOR cumulatif sur 4 bits | comptes |
| `two-layer-wall-heat-rate-01` | `Φ = 30/[0,12/(0,8×2)+(e₂/1000)/(0,04×2)]` | W |
| `vickers-indent-pressure-01` | `H = 2×196,2×sin(68°)/d²`, d en mm | MPa |

**Portée des preuves :** 38/38 lois ont désormais des contre-calculs indépendants automatisés sur quatre points chacun. Les trois workflows Node/science du commit scientifique final sont **réussis** : [recette 41213910552](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213910552), [science 41213910567](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213910567), [qualité 41213910653](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213910653). **2 536/2 536 tests Node réussis, zéro échec**. Ces preuves ne certifient ni la fidélité des animations, ni toutes les hypothèses de chaque modèle, ni la conformité RGAA.


### Compléments scientifiques publiés et réussis

- [Dix références indépendantes supplémentaires](tests/audit-browser-batch-560-597-ten-more-models.test.cjs), commit [`b7485a5a`](https://github.com/sebromapro-oss/SI-QUEST/commit/b7485a5a492d9dc3c4aefa8fe6dfafaf2dff64b0) : Darcy laminaire, géométrie de relevage, flottabilité, quart de pont, vanne hydrostatique, Peukert, BPFO, Laplace capillaire, corde vibrante et impédance acoustique. [CI Node 41213868708](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213868708) **success**, 2 519/2 519 tests.
- [Seize références indépendantes finales](tests/audit-browser-batch-560-597-sixteen-final-models.test.cjs), commit [`5c4b5ba0`](https://github.com/sebromapro-oss/SI-QUEST/commit/5c4b5ba05ec92748835c250d14d7ed4e9ceeef2d) : résultante de charges, synchronisation d'embrayage, induction mutuelle, THD, fréquence de cage, rapport critique de buse, tirant conique, Pt100, vis à billes, célérité hydraulique, transformateur, inertie de plaque, traction-flexion, rapport de conduite, force magnétique et charge de boucle 4–20 mA. [CI Node 41213910552](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213910552) **success**, **2 536/2 536 tests**.
- **Total du lot : 38/38 lois avec quatre références numériques indépendantes chacune (152 comparaisons), 38/38 HTML inspectés.** Les tests sur appareil réel, la fidélité géométrique/physique des SVG et les lecteurs d'écran restent hors de cette validation.

## Critères Chromium soumis aux deux shards

- 38 missions distinctes, sans doublon avec les 559 précédentes ; total 597 verrouillé dans le code de sélection.
- Deux tailles d'écran : 1440×900 (ordinateur) et 390×844 (Android **émulé**, non physique).
- Trois erreurs et trois aides, exploration graphique après erreur, corrigé caché puis accessible après 3+3, absence de fuite SVG et d'exception JS, absence de débordement horizontal.
- Lien d'évitement au clavier et validation par Entrée sur cinq missions de chaque format.

## Réserves et décision

Le dépôt est **public**, contrairement au libellé « privé » du cahier des charges. Ne pas modifier la visibilité sans vérifier les conséquences sur GitHub Pages. La progression locale n'est pas authentifiée. Les essais Android/iPhone **physiques**, Firefox, Safari, NVDA, TalkBack, VoiceOver, audit RGAA/WCAG, conformité scientifique individuelle de chaque figure et de chaque animation, et audit historique des secrets ne sont pas réceptionnés.

**Phase 1 maintenue.** Phase 2 (598–996) suspendue. Aucune application AppDeploy, page d'accueil, carte des 17 univers, asset, donnée privée, marquage auteur ou équation de production n'a été modifié.

**Prochaine action :** confirmer les deux shards Chromium de la recette 560–597, corriger tout échec et poursuivre la vérification graphique/physique, les tests de lecteurs d'écran et les contrôles de sécurité non démontrés.

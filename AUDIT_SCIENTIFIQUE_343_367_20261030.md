# SI QUEST — Contre-audit scientifique et graphique 343–367 (V2.5)

**Date :** 30 octobre 2026. **HEAD de départ du cycle :** `26426b66778349d8000412413f6eae759958fc6b`. **Périmètre :** 25 missions existantes, sans création.

## Références physiques indépendantes

Vingt-cinq références ont été reconstruites en dehors du moteur SI QUEST, en respectant les unités et les hypothèses : bilans thermiques, loi d'Euler, engrenages, hydraulique, acoustique, métrologie, jauge de déformation, rendement et refroidissement global. Chaque loi a été contrôlée aux paramètres **minimum, nominal et maximum**, soit **75/75 concordances** avec les modèles, tolérance relative pondérée 2×10⁻⁷.

| N° | Mission | Référence nominale | Unité |
|---:|---|---:|---|
| 343 | `hydraulic-throttle-temperature-rise-01` | 4.705882 | K |
| 344 | `cantilever-uniform-load-tip-deflection-01` | 0.740571 | mm |
| 345 | `faraday-flux-rate-emf-01` | 1.500000 | V |
| 346 | `planetary-fixed-ring-reaction-torque-01` | 180.000000 | N·m |
| 347 | `quarter-bridge-linearization-error-01` | 0.199601 | % |
| 348 | `helical-gear-opposed-thrust-01` | 459.991276 | N |
| 349 | `hydraulic-laminar-critical-flow-01` | 2.172043 | L/min |
| 350 | `thermal-contact-heat-power-01` | 216.000000 | W |
| 351 | `process-capability-cp-01` | 1.333333 | sans unité |
| 352 | `second-order-damping-from-overshoot-01` | 0.455950 | sans unité |
| 353 | `hydraulic-pump-shaft-torque-01` | 70.735530 | N·m |
| 354 | `hollow-shaft-elastic-twist-01` | 0.202019 | ° |
| 355 | `hydraulic-filter-bypass-capture-01` | 91.080000 | % |
| 356 | `threephase-compensated-line-current-01` | 7.359801 | A |
| 357 | `acoustic-energy-reflectance-01` | 11.111111 | % |
| 358 | `hydraulic-local-loss-coefficient-01` | 5.000000 | sans unité |
| 359 | `straight-fin-heat-rate-01` | 6.981325 | W |
| 360 | `metrology-welch-effective-dof-01` | 19.531250 | sans unité |
| 361 | `encoder-measured-travel-01` | 628.318531 | mm |
| 362 | `hydraulic-pump-loss-power-01` | 1.250000 | kW |
| 363 | `euler-pinned-column-load-01` | 65.113181 | kN |
| 364 | `sudden-expansion-loss-01` | 2.843959 | kPa |
| 365 | `regen-braking-soc-gain-01` | 0.150463 | % |
| 366 | `lumped-cooling-threshold-time-01` | 164.932332 | s |
| 367 | `pneumatic-receiver-added-mass-01` | 0.237674 | kg |

**Non-régression publiée :** `tests/audit-343-367-independent.test.cjs` ajoute 25 tests de références (3 états, résultats HTML, domaine, unités, trois aides, synchronisation et accessibilité descriptive SVG) et deux contrôles géométriques.

## Deux erreurs graphiques corrigées

1. **358 — Perte de charge singulière.** L'étranglement était dessiné comme un obstacle occupant la totalité de la section, ce qui suggérait un conduit obturé alors que le modèle suppose un écoulement. Remplacement par deux obstacles opposés laissant un passage central **22 px** dans une conduite de **70 px** ; l'axe de l'écoulement reste ouvert. Ce dessin reste schématique et n'implique aucune valeur de coefficient `K` déduite de cette seule géométrie.
2. **359 — Ailette droite.** Le dessin représentait 80 mm de longueur sur 310 px et 2 mm d'épaisseur sur 45 px, avec des échelles incompatibles. Nouvelle représentation à **4 px/mm** : longueur **320 px**, épaisseur **8 px** ; flèches convectives raccordées aux deux faces, extrémité isolée.

**Code :** `src/batch358-362.js`, commit `c1788a5bc367af23c972d87db5726cdadb0e1b9a`. **Tests :** `37041fc11466190edff0a8d7d34bb7e7fd0747d3`.

## Preuves CI

Sur le commit `37041fc114`, **1 937 tests Node exécutés, 1 937 réussis, 0 échec**, et trois workflows verts : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097382964), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097382800), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097382896).

Les changements sont circonscrits au moteur SVG et aux tests, sans modification de l'accueil, de la carte des 17 univers, des pages HTML des missions ni des autres projets AppDeploy.

## Limites de la réception

Les 75 valeurs nominales et aux bornes concordent dans les hypothèses documentées. Les schémas sont soumis à des tests structurels, **pas à une recette visuelle complète**. Tests physiques Android/iPhone, NVDA/TalkBack/VoiceOver, audit RGAA, audit exhaustif des secrets et évaluation en classe non réalisés.

**Décision : poursuivre la phase 1.** Prochain lot recommandé : missions **318–342**. Le passage vers 598–996 reste suspendu.

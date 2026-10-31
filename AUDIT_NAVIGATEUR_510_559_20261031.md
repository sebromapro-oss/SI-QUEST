# SI QUEST V2.5 — Audit 510–559 — 31 octobre 2026

## Référence et périmètre
- HEAD de départ : `244fb0ba19deaf07e64416d1be3ccca15a0fb1e2` ; dépôt `sebromapro-oss/SI-QUEST`, branche `main`.
- Le lot précédent 460–509 avait un échec réel de la recette Chromium [41205005737](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41205005737) : deux assertions sur les axes comparaient **six textes SVG (deux unités et quatre graduations)** à seulement deux unités. Correction du banc d'essai dans [244fb0ba](https://github.com/sebromapro-oss/SI-QUEST/commit/244fb0ba19deaf07e64416d1be3ccca15a0fb1e2), sans masquer les graduations ; résultat Chromium de ce correctif à vérifier avant de déclarer 509 missions couvertes.
- **Nouveau lot 510–559 : 50 missions distinctes**, réparties dans 13 univers ; aucun ajout de mission.
- Contrôle direct des 50 HTML : configurations, langue, accès clavier structurel, domaine numérique, calculs aux deux bornes, milieu et nominal. **50 valeurs nominales et 150 évaluations supplémentaires** concordent avec le moteur de référence. Ces concordances ne sont pas des contre-calculs indépendants.
- **Neuf lois contre-calculées indépendamment sur quatre points chacune : 36 comparaisons** : efficacité d'échangeur, vitesse angulaire, moment, pression, débit, loi d'Ohm, énergie, impulsion et rendement. Les unités, signes, tendances et singularités ont été examinés.
- Particularité historique : les objectifs/prérequis des pages les plus anciennes sont insérés par le contrôleur JavaScript ; ne pas confondre absence dans le HTML initial et absence à l'écran. Vérification navigateur à confirmer.
- Nouveaux scénarios Playwright : trois essais et trois aides, exploration qualitative, confidentialité du corrigé, schémas SVG, largeur mobile, clavier sur cinq missions par format. **Statut au commit : en attente de CI**, pas de validation anticipée.

## Inventaire du lot
| N° | Mission | Univers |
|---:|---|---|
| 510 | `exchanger-effectiveness-01` | SI-12 |
| 511 | `rotation-01` | SI-01 |
| 512 | `torque-01` | SI-03 |
| 513 | `pressure-01` | SI-06 |
| 514 | `flow-01` | SI-06 |
| 515 | `ohm-01` | SI-08 |
| 516 | `energy-01` | SI-10 |
| 517 | `accuracy-01` | SI-13 |
| 518 | `impulse-01` | SI-02 |
| 519 | `gear-eff-01` | SI-05 |
| 520 | `capacitor-01` | SI-08 |
| 521 | `hydro-speed-01` | SI-06 |
| 522 | `frequency-period-01` | SI-09 |
| 523 | `circular-02` | SI-01 |
| 524 | `angular-accel-01` | SI-01 |
| 525 | `incline-force-01` | SI-03 |
| 526 | `resultant-01` | SI-03 |
| 527 | `torsion-01` | SI-04 |
| 528 | `belt-speed-01` | SI-05 |
| 529 | `hydro-power-01` | SI-06 |
| 530 | `joule-heat-01` | SI-08 |
| 531 | `sampling-01` | SI-09 |
| 532 | `efficiency-chain-01` | SI-10 |
| 533 | `rolling-load-01` | SI-11 |
| 534 | `heat-transfer-01` | SI-12 |
| 535 | `moment-arm-02` | SI-02 |
| 536 | `spring-stiffness-01` | SI-04 |
| 537 | `beam-stress-02` | SI-04 |
| 538 | `pneumatic-consumption-01` | SI-07 |
| 539 | `electrical-parallel-01` | SI-08 |
| 540 | `rolling-torque-01` | SI-11 |
| 541 | `dc-voltage-drop-01` | SI-08 |
| 542 | `wheatstone-bridge-01` | SI-08 |
| 543 | `hydro-motor-torque-01` | SI-06 |
| 544 | `rotation-energy-01` | SI-02 |
| 545 | `rectangular-tube-inertia-01` | SI-04 |
| 546 | `sensor-4-20ma-01` | SI-13 |
| 547 | `capstan-tension-01` | SI-11 |
| 548 | `convective-heat-flux-01` | SI-12 |
| 549 | `screw-efficiency-01` | SI-05 |
| 550 | `beam-center-deflection-01` | SI-04 |
| 551 | `reactive-three-phase-01` | SI-08 |
| 552 | `rl-step-current-01` | SI-09 |
| 553 | `hydraulic-reynolds-01` | SI-06 |
| 554 | `battery-autonomy-01` | SI-10 |
| 555 | `rc-charge-threshold-01` | SI-09 |
| 556 | `thermal-clearance-01` | SI-12 |
| 557 | `cylinder-stroke-time-01` | SI-06 |
| 558 | `gas-isothermal-work-01` | SI-07 |
| 559 | `symmetric-sling-tension-01` | SI-03 |

## Réserves de réception
Les 41 autres lois de ce lot ne disposent pas de contre-calculs indépendants dans ce cycle. La cohérence graphique des vecteurs, la fidélité temporelle des simulations, les appareils physiques, Firefox/Safari, NVDA/TalkBack/VoiceOver, l'audit de l'historique Git et la conformité RGAA/WCAG restent à démontrer. Dépôt public, progression locale non authentifiée. **Phase 1 maintenue ; 0 mission nouvelle.**

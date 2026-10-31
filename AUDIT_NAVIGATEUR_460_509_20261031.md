# SI QUEST V2.5 — Audit 460–509 — 31 octobre 2026

## Traçabilité
- HEAD de départ : `ec5725a46490c79f3b88a034d9843b98e1859f69` ; branche `main`.
- Recette Chromium 410–459 : [run 41200350785](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41200350785), **success**, SHA `fbfe9dc540518c9999b4c842bb311af04bafb707`, terminée à 12:46 UTC. **459/597** missions couvertes par les scénarios automatisés (76,9 %).
- Nouveau lot : **50 missions distinctes 460–509**, 6 scénarios Playwright (bureau et Android émulé, 25 missions × 2 et clavier sur cinq × 2). Vérification trois essais/trois aides, simulation qualitative après erreur, corrigé verrouillé, SVG, exceptions JS et débordements.
- Contrôle structurel persistant : 50 cas + inventaire, vérification de l'HTML, des bornes et de la cohérence valeur nominale HTML ↔ moteur. **La cohérence avec le même moteur n'est pas un contre-calcul indépendant.**
- Contrôles scientifiques indépendants : **8 lois, 32 calculs** (bornes, milieu, nominal), unités, limites, invariants, SVG non fini.
- La recette cumulative Chromium est répartie sur **deux shards** afin de conserver tous les tests et de respecter la limite d'exécution par job ; deux jobs doivent réussir. Aucune assertion retirée.
- **Statut à la publication : nouveaux tests non encore validés par CI.** 509/597 uniquement si les deux shards réussissent ; couverture actuellement confirmée 459/597.
- 597 missions existantes, 0 créée ; phase 1 conservée. Aucun changement des applications AppDeploy, de l'accueil, de la carte des 17 univers, des assets, du marquage d'auteur ou des données privées.

## Missions du lot
| N° | Identifiant | Univers |
|---:|---|---|
| 460 | `pneumatic-receiver-fill-time-01` | SI-07 |
| 461 | `half-power-damping-ratio-01` | SI-09 |
| 462 | `fillet-weld-double-shear-01` | SI-04 |
| 463 | `parallel-plate-capacitance-01` | SI-08 |
| 464 | `isotropic-volume-expansion-01` | SI-12 |
| 465 | `sensor-temperature-drift-01` | SI-13 |
| 466 | `belt-centrifugal-tension-01` | SI-05 |
| 467 | `shaft-key-bearing-pressure-01` | SI-04 |
| 468 | `square-screw-lead-angle-01` | SI-05 |
| 469 | `straight-fin-efficiency-01` | SI-12 |
| 470 | `brake-pad-sector-pressure-01` | SI-11 |
| 471 | `three-phase-voltage-unbalance-01` | SI-08 |
| 472 | `vibration-base-transmissibility-01` | SI-09 |
| 473 | `thick-cylinder-hoop-stress-01` | SI-04 |
| 474 | `dc-bus-discharge-time-01` | SI-16 |
| 475 | `regenerative-braking-energy-01` | SI-17 |
| 476 | `hydraulic-local-loss-01` | SI-06 |
| 477 | `shaft-torsional-shear-stress-01` | SI-04 |
| 478 | `dry-air-ideal-density-01` | SI-07 |
| 479 | `beam-uniform-load-deflection-01` | SI-04 |
| 480 | `hydraulic-fluid-stiffness-01` | SI-06 |
| 481 | `biot-number-plate-01` | SI-12 |
| 482 | `rotor-centripetal-acceleration-01` | SI-01 |
| 483 | `parallel-thermal-bridges-01` | SI-12 |
| 484 | `sampling-alias-frequency-01` | SI-09 |
| 485 | `safety-proof-test-pfd-01` | SI-16 |
| 486 | `inductor-reactance-frequency-01` | SI-08 |
| 487 | `coolant-thermal-power-01` | SI-12 |
| 488 | `brake-disc-adiabatic-rise-01` | SI-10 |
| 489 | `water-mixing-temperature-01` | SI-12 |
| 490 | `pump-volumetric-efficiency-01` | SI-06 |
| 491 | `braking-distance-friction-01` | SI-02 |
| 492 | `heat-exchanger-lmtd-01` | SI-12 |
| 493 | `acoustic-distance-loss-01` | SI-13 |
| 494 | `water-hammer-joukowsky-01` | SI-06 |
| 495 | `thermal-contact-resistance-01` | SI-12 |
| 496 | `noise-level-addition-01` | SI-13 |
| 497 | `poiseuille-microtube-flow-01` | SI-06 |
| 498 | `fracture-critical-crack-01` | SI-14 |
| 499 | `helical-gear-axial-force-01` | SI-05 |
| 500 | `oil-kinematic-viscosity-01` | SI-14 |
| 501 | `miner-fatigue-damage-01` | SI-14 |
| 502 | `rc-lowpass-cutoff-01` | SI-09 |
| 503 | `cantilever-strain-energy-01` | SI-04 |
| 504 | `gas-polytropic-temperature-01` | SI-07 |
| 505 | `hydraulic-cavitation-number-01` | SI-06 |
| 506 | `bolt-preload-torque-01` | SI-15 |
| 507 | `rectangular-beam-shear-01` | SI-04 |
| 508 | `goodman-fatigue-factor-01` | SI-14 |
| 509 | `log-decrement-01` | SI-09 |

## Réserves et suite
Les **42 lois non contre-calculées** dans ce lot, la fidélité des animations, les essais physiques Android/iPhone, Firefox/Safari, NVDA/TalkBack/VoiceOver, le RGAA et la sécurité historique restent à réceptionner. Dépôt public ; progression locale non authentifiée. Si Chromium réussit, il restera **88 missions** sans recette navigateur (510–597), puis les audits scientifiques et matériels. Le registre de reprise doit être actualisé après le verdict réel.


### Contre-audit du lot 460–509 — anomalies et correctifs

- [Run scientifique initial 41204664171](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41204664171) : **échec réel, 39 assertions sur 2 378 tests**, dû à un défaut du nouveau banc de test : les 39 pages de génération historique affichent objectifs/prérequis dans le HTML visible mais ne les dupliquent pas dans `window.SI_MISSION`. Le test vérifie désormais le texte pédagogique effectivement visible et les champs JS lorsqu'ils existent. **Aucun contrôle pédagogique supprimé.**
- **Défaut graphique de production identifié :** plusieurs pages historiques avaient des axes SVG libellés « % », « sans unité » ou « x/y » alors que les grandeurs sont, par exemple, m et km/h (freinage), K et K (échangeur), dB et m (acoustique), Hz et Hz (aliasing). Le contrôleur commun synchronise maintenant les deux axes du graphe paramétrique avec les unités de la mission ; quatre cas ciblés sont testés sur bureau et Android émulé. Cette correction ne modifie ni les formules ni les données numériques.
- **À vérifier :** nouveaux runs Node/science et Chromium après correctif. Les premiers échecs sont conservés dans l'historique ; aucune validation anticipée.

# SI QUEST — Contre-audit scientifique et graphique 368–392 (V2.5)

**Date :** 30 octobre 2026. **HEAD de départ :** `26426b66778349d8000412413f6eae759958fc6b`. **Périmètre :** 25 missions existantes, sans création, suppression ni changement de l'accueil.

## Méthode et résultats scientifiques

Les 25 lois physiques ont été reconstruites séparément des fonctions du jeu (équations dimensionnelles, unités SI et conversions), puis comparées aux 25 modèles aux trois paramètres minimum, nominal et maximum : **75 comparaisons / 75 concordantes**, tolérance relative pondérée 2×10⁻⁷. L'audit a notamment utilisé une dérivée numérique centrée indépendante pour le bielle-manivelle, un dénombrement entier de bits CAN, les bilans d'énergie et de puissance et les relations de pression absolue.

| N° | Mission | Valeur nominale de référence | Unité |
|---:|---|---:|---|
| 368 | `three-phase-cable-max-length-01` | 543.388489 | m |
| 369 | `regenerative-cylinder-net-force-01` | 8.482300 | kN |
| 370 | `slider-crank-retraction-speed-01` | 0.787763 | m/s |
| 371 | `adc-minimum-bits-01` | 12.000000 | bits |
| 372 | `forced-vibration-amplitude-01` | 5.301994 | mm |
| 373 | `rl-series-phase-angle-01` | 57.518363 | ° |
| 374 | `pump-affinity-head-01` | 25.312500 | m |
| 375 | `metrology-expanded-uncertainty-01` | 0.200000 | mm |
| 376 | `cylindrical-insulation-heat-flow-01` | 21.943028 | W |
| 377 | `spur-gear-radial-load-01` | 727.940469 | N |
| 378 | `pump-affinity-shaft-power-01` | 2.560000 | kW |
| 379 | `sampling-nyquist-rate-01` | 500.000000 | Hz |
| 380 | `radiation-two-gray-plates-01` | 544.757348 | W |
| 381 | `shaft-key-allowable-torque-01` | 384.000000 | N·m |
| 382 | `sensor-4-20ma-pressure-01` | 12.500000 | MPa |
| 383 | `belt-capstan-min-tight-tension-01` | 919.013122 | N |
| 384 | `heat-exchanger-hot-outlet-01` | 62.000000 | °C |
| 385 | `adc-quantization-max-error-01` | 1.220703 | mV |
| 386 | `pneumatic-receiver-pressure-rise-01` | 60.000000 | kPa |
| 387 | `thevenin-source-efficiency-01` | 75.000000 | % |
| 388 | `ice-fusion-duration-01` | 626.250000 | s |
| 389 | `dc-motor-start-resistor-01` | 1.200000 | Ω |
| 390 | `shaft-min-torsion-diameter-01` | 29.420273 | mm |
| 391 | `pump-apparent-leakage-flow-01` | 5.000000 | L/min |
| 392 | `counterweight-limit-load-01` | 882.900000 | N |

**Tests publiés :** `tests/audit-368-392-independent.test.cjs` (25 tests mission par mission et cinq contrôles de géométrie), complétant les tests de lot existants. Chaque mission : bornes et valeur nominale, résultat HTML, trois aides, rejets hors domaine, synchronisation SVG, unités, accessibilité descriptive du SVG et absence de valeurs non finies. Cela ne valide pas l'utilisation réelle par lecteur d'écran.

## Trois anomalies physiques de représentation corrigées

1. **389 — Démarrage du moteur CC.** La résistance d'induit `R_a=0,40 Ω` figurait uniquement en texte ; le circuit ne représentait que `R_s`. Ajout d'un second composant résistif réellement en série avec `R_s` et le moteur, continuité électrique contrôlée.
2. **391 — Pompe volumétrique.** L'ancien dessin représentait un circuit externe de retour de fuite vers l'aspiration, alors que l'énoncé ne démontre aucune dérivation externe. Suppression de cette liaison physiquement trompeuse ; affichage de `Q_th − Q_u` comme **écart de débit apparent non localisé**, sans diagnostic abusif de fuite externe.
3. **392 — Contrepoids.** Le dessin utilisait des échelles différentes pour les deux bras de levier. Échelle unique **180 px/m**, pivot `x=300`, contrepoids à `x=219` (0,45 m) et charge à `x=300+180d` (0,30 à 1,20 m). Le bilan `F d = 150×9,81×0,45` reste invariant.

Deux contrôles géométriques supplémentaires vérifient les rayons de l'isolant cylindrique (376) et le rapport longueur/diamètre de la clavette (381). Les calculs des moteurs n'ont pas été modifiés.

## Commits et CI

- Correction SVG : `cbcb34798684e706c7485816d7d7848021d5f7a1`.
- Réconciliation du test historique de pompe, qui attendait à tort la dérivation externe : `b93d64fd07a2604faa319932208abaf40d2aa38d`.
- Nouveau contre-audit indépendant : `9a6585a0064ac59e062007aeed1af981358795c7`.
- **Recette prouvée sur `9a6585a006` : 1 910/1 910 tests Node réussis, trois workflows réussis** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097056763), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097056930), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097056732).
- Le commit intermédiaire `cbcb347986` a échoué car l'ancien test exigeait le dessin erroné. Cette attente a été corrigée et les trois workflows ont réussi sur `b93d64fd07` puis sur `9a6585a006`.

## Réception encore manquante

Aucune capture de navigateur réel ou inspection visuelle pixel à pixel ; pas d'essais sur appareils Android/iPhone, ni NVDA, TalkBack ou VoiceOver ; pas d'audit RGAA complet ni d'analyse exhaustive des secrets dans le contenu et l'historique Git. Les tests unitaires ne prouvent pas la conformité ergonomique et scientifique globale des 597 missions.

**Décision : phase 1 maintenue.** Suite : audit 343–367, puis 318–342. Préserver accueil, 17 univers, historique et périmètre exclusif GitHub.

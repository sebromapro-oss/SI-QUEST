# SI QUEST — Audit et production 133–137 (V2.3)

Date : 26 octobre 2026. HEAD initial : `781759a37933ad305a20018521bbeee3fff4dc6f`. Dépôt privé, branche main.

## Chantier A : anomalies P2 corrigées

- `pneumatic-consumption-01` : la tige du vérin changeait de longueur dans le SVG au cours du déplacement. Tige rigide de 255 px et piston/chambre synchronisés ; test sur cinq courses.
- `thermal-resistance-01` : représentation thermique générique sans dimensions ni faces ; ajout e = 0,12 m, S = 2 m², λ et faces chaude/froide, hypothèses 1D stationnaires ; tests aux trois conductivités.
- Deux missions historiques : objectifs, prérequis, questions flash et critères de réussite explicités.

## Chantier B : cinq modèles indépendants

| N° | Mission | Résultat nominal |
|---|---|---|
| 133 | `accumulator-polytropic-delivery-01` | 2.20747 L |
| 134 | `three-phase-capacitor-sizing-01` | 55.03110 µF |
| 135 | `pump-affinity-power-01` | 15.62500 kW |
| 136 | `spring-stored-energy-01` | 22.50000 J |
| 137 | `goodman-fatigue-factor-01` | 1.83673 sans unité |

Les seuils sont pédagogiques et fictifs. Les modèles ont des scènes 2D paramétriques et ne prétendent pas simuler une dynamique temporelle ou une 3D inexistante. Trois aides, trois essais, corrigé conditionnel et sauvegarde utilisent le contrôleur commun.

## Réception S/G/P/F/A

S : contre-calculs V8 et tests Node à vérifier sur la révision GitHub. G : contrôles géométriques automatisables, inspection visuelle individuelle NOT RUN. P : rubriques et parcours du moteur commun, essai élève NOT RUN. F : tests Node et DOM simulé à consulter dans GitHub Actions, appareils réels NOT RUN. A : contrôles automatiques partiels ; NVDA/TalkBack/VoiceOver et audit WCAG/RGAA complet NOT RUN. Aucune conformité non testée n'est déclarée.

## Contre-audit CI et correctif supplémentaire

Le premier passage de la suite Node sur le commit `c32eadd21e2d00196d946269f7f4c3d5acc203d6` a exécuté **715 tests : 713 PASS, 2 FAIL**. Les deux échecs provenaient de l’absence de métadonnées d’unité d’entrée pour `gear-eff-01` (première mission de la plage 40–75). L’analyse a aussi révélé quatre autres métadonnées absentes et trois schémas sans unité de résultat (`gear-eff-01`, `pulley-01`, `thermal-exp-01`). Les cinq métadonnées et les cinq légendes ont été complétées dans le moteur commun. Le statut du nouveau commit est à vérifier dans GitHub Actions ; ne pas considérer ces tests réussis avant leur exécution.

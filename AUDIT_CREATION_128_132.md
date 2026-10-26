# SI QUEST — Audit et production des missions 128–132

**Date :** 26 octobre 2026 (heure de Paris). **Contrat :** V2.3. **Dépôt :** privé, branche `main`.

## Identification et intégrité
- HEAD initial : `a787649a9f884ec0db72ee69cdac66d552a56347` (127 entrées au catalogue).
- Correctif unités et CI : `5acc31ebc81c361a6e3b49b8a7480ccf705ad8d9`.
- Correctif des unités restantes : `362dc3b14fc266edbb6147ae484d376fa6f2a141`.
- Production 128–132 : `bbcf8906870aca62ac907283cfef6d3a540639d9`.
- Contrôles renforcés et tolérance : `805e2c894c7d44cdbc343ccca1428b92f5b1c854`.
- Catalogue : **132 entrées** avec identifiants distincts ; aucune certification d'accessibilité complète déduite du catalogue.
- Diff entre HEAD initial et révision contrôlée : **aucune modification** de `index.html`, `src/home.js`, `src/style.css` ni `assets/archipelago-cinematic.svg`. Aucune refonte de la carte, aucun ZIP, aucun GitHub Pages.

## Chantier A — audit ciblé de l'existant
Le HEAD initial comportait **trois workflows Node en échec**, avec **681 PASS / 2 FAIL** : une assertion rejetait à tort la notation « sans unité » ; le contrôle des missions 40–75 détectait l'absence de métadonnées d'unité. Les journaux GitHub Actions ont été consultés.

| Priorité | Constat reproduit | Correctif | Preuve |
|---|---|---|---|
| P1 | `hydro-speed-01` : unité de réponse affichée L/min au lieu de m/s, alors que le moteur renvoie m/s | Libellés, modèle et schéma clarifiés ; unités corrigées | `missions/hydro-speed-01.html`, `src/investigation-diagrams.js` |
| P1 | `hydro-speed-01` : tolérance du moteur générique sans correspondance avec ±0,0002 m/s annoncés | Politique de réponse spécifique ; test à 0,0501 m/s accepté, 0,0600 m/s refusé | `tests/audit-cycle-128-132.test.cjs` |
| P2 | `work-01`, `frequency-period-01`, `hydro-force-02`, `beam-defl-01` : unités d'entrée manquantes dans le registre scientifique | Quatre unités déclarées et vérifiées | `src/investigations.js` |
| P2 | `work-01`, `frequency-period-01`, `hydro-force-02`, `beam-defl-01` : légendes SVG insuffisantes pour les résultats | Grandeurs et unités des résultats ajoutées | `src/investigation-diagrams.js` |
| P2 | Contrôle géométrique rejetant « sans unité » comme texte non mathématique | Acceptation de cette désignation légitime | `tests/diagram-geometry.test.cjs` |
| P2 | Réactivation et hypothèses insuffisantes de `hydro-speed-01` | Objectif, prérequis, questions flash, hypothèses et domaine précisés | HTML de la mission |

Le contrôle automatisé porte sur les **36 entrées actuellement sélectionnées par `catalog.levels.slice(39,75)`**, avec comparaison des unités, configurations, calculs et schémas. Il **ne constitue pas une inspection visuelle et pédagogique exhaustive** des 36 missions.

## Chantier B — cinq investigations indépendantes
| N° | Identifiant | Sous-savoir / modèle | Référence nominale |
|---|---|---|---|
| 128 | `cylinder-stroke-time-01` | Temps de parcours : `t = AL/Q` | 5,02655 s pour L = 400 mm |
| 129 | `gas-isothermal-work-01` | Compression isotherme réversible : `W = p₁V₁ ln r` | 1,38629 kJ pour r = 2 |
| 130 | `symmetric-sling-tension-01` | Équilibre vectoriel de deux brins : `T = P/(2 sin θ)` | 6,22290 kN pour θ = 40° |
| 131 | `voltage-divider-sensor-01` | Diviseur de tension résistif : `U₂ = UₛR₂/(R₁+R₂)` | 2,88462 V pour R₂ = 3 kΩ |
| 132 | `restrained-thermal-stress-01` | Dilatation empêchée : `σ = −EαΔT` | −126 MPa pour ΔT = 50 K |

Chaque page contient contexte, prérequis, réactivation, hypothèses, modèle, saisie, trois essais et aides via le contrôleur commun, corrigé conditionnel, investigation paramétrique, schéma SVG calculé, seuil pédagogique fictif et sauvegarde locale. Les **scènes 2D réagissent au paramètre scientifique** ; cela ne démontre ni animation temporelle complète ni scène 3D.

## Tests et preuve de réception
- Précontrôles V8 avant commit : quatre points par modèle (bornes, nominal, intermédiaire), cas invalides, calcul fini, métadonnées et schéma. Contrôle structurel de chaque HTML.
- Tests Node indépendants : nominal, bornes, conversions, cas invalides, tolérances, propriétés physiques, invariants, graphes et SVG ; simulations DOM des trois essais, aides, corrigé, étoiles, sauvegarde, reprise et réinitialisation sur les cinq nouvelles missions.
- Révision `805e2c8` : **707 tests Node PASS / 0 FAIL**, workflow « Recette automatisée SI QUEST » [40330686891](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40330686891).
- Workflow « SI QUEST scientific quality » : [40330686773](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40330686773) — PASS à la rédaction.
- Workflow « Contrôles scientifiques SI QUEST » : [40330686799](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40330686799) — en cours à la rédaction, **non déclaré réussi**.
- Workflow navigateur accueil : [40330520126](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40330520126) — en cours à la rédaction, **non déclaré réussi**.

| Domaine | Tests automatisés | Contrôle manuel / matériel | Réserve |
|---|---|---|---|
| S — Scientifique | PASS sur les cinq modèles et tests ciblés | NOT RUN | Modèles idéalisés, seuils fictifs |
| G — Graphique | PASS structure SVG, géométrie programmée et synchronisation paramétrique | NOT RUN | Inspection visuelle individuelle et animation temporelle non démontrées |
| P — Pédagogique | PASS présence des rubriques, aides et corrigés | NOT RUN | Essai élève / évaluation en classe |
| F — Fonctionnel | PASS tests Node et DOM simulé | NOT RUN | Essais réels sur navigateurs et appareils pour les cinq missions |
| A — Accessibilité | PASS contrôles structurels disponibles | NOT RUN | NVDA, TalkBack, VoiceOver, zoom et audit WCAG/RGAA complets |

**Écarts ouverts :** réception graphique manuelle, vérification de l'animation temporelle quand pertinente, recette Android/iPhone/Windows/macOS et technologies d'assistance. Aucun test non exécuté n'est compté comme réussi.

## Prochain cycle
Poursuivre l'audit des missions historiques par risque scientifique et qualité des représentations ; approfondir les interactions temporelles pertinentes, vérifier les preuves d'accessibilité et conserver l'accueil protégé.

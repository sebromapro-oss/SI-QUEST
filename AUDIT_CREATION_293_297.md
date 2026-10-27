# SI QUEST V2.3 — Audit et création 293–297
**27 octobre 2026 — branche privée main.** Révision de production : `7f8bc55433c2b67ab4da457212d8ba467b3bd614` ; contre-audit et registre dans le commit de clôture.

## Phase 0 et protection
HEAD initial `e0d1e4845986d9f6714f8b1cf5c7e5155e2ba4ee`. Cahier des charges V2.3, EXIGENCES.md, PRODUCTION.md, catalogue, contrôleur, modèles, tests et workflows consultés. La page d'accueil utilisateur et ses dépendances `index.html`, `src/home.js`, `src/style.css` et `assets/archipelago-cinematic.svg` ne sont pas modifiées. Aucune refonte, ZIP, GitHub Pages, suppression de branche ou changement de visibilité. Branche d'archive présente.

## Chantier A — historique 40–75
36 identifiants réels, 3 états (min/nominal/max) chacun : **108/108 PASS** en JavaScript V8 sur le moteur et le rendu réels. Contrôles de finitude, présence SVG title/desc et absence de NaN/Infinity/undefined ; ces contrôles ne prouvent pas la justesse exhaustive de tous les modèles.
- **P1 graphique, `incline-force-01` :** vecteur de composante parallèle représenté avec longueur 90 sinθ pixels alors que le poids représenté mesurait 60 pixels. La composante pouvait paraître supérieure au poids ; correction à **60 sinθ pixels** avec métadonnées d'échelle. Régression ajoutée à `tests/historical-incline-force-scale.test.cjs`, angles 0°, 15°, 35°. Calcul F∥=600×9,81×sinθ inchangé.
- Autres anomalies non détectées par les tests numériques ciblés : statut **à auditer visuellement et pédagogiquement**. Pas de déclaration d'absence totale d'anomalies.

## Chantier B — cinq modèles distincts
| Mission | Sous-savoir | Nominal | Représentation |
|---|---|---:|---|
| 293 `plane-stress-principal-max-01` | Contrainte principale d'un état plan | 87,0156 MPa | Cercle de Mohr 2D, centre et rayon à échelle commune |
| 294 `rlc-series-quality-factor-01` | Facteur Q d'un RLC série | 3,1623 sans unité | Circuit R–L–C série 2D |
| 295 `exchanger-ntu-zero-capacity-ratio-01` | Efficacité limite NTU à Cᵣ→0 | 77,687 % | Échangeur stationnaire et barre calculée |
| 296 `second-order-step-overshoot-01` | Dépassement d'un second ordre sous-amorti | 37,2326 % | Courbe indicielle analytique 0–10 s |
| 297 `asymmetric-sling-tension-01` | PFS de deux élingues asymétriques | 6,5270 kN | Brins, angles et tensions vectorielles 2D |

Chaque mission comprend contexte métier, prérequis, trois questions flash, hypothèses, modèle pur, bornes, tolérance, SVG calculé, courbe d'investigation, trois essais/aides, corrigé conditionnel, décision fictive, carnet et sauvegarde via contrôleur mutualisé. **Aucune 3D revendiquée** : les cinq situations sont planes ou des courbes. Pas d'animation temporelle fictive.

**P2 graphique détectée au contre-audit du nouveau lot :** cercle de Mohr initialement rendu avec deux échelles différentes pour abscisse du centre et rayon. Correction à 1,4 pixel/MPa pour les deux ; test géométrique dédié ajouté. La courbe indicielle est analytique, non une animation vidéo.

## Preuves et limites
- **S : PASS ciblé.** 25 états (5×5) calculés et rendus ; 20 invalides rejetés ; références indépendantes et propriétés physiques testées. 108 états historiques numériques/structurels PASS.
- **G : PASS structurel ciblé** pour 25 SVG nouveaux et 108 anciens ; P1 historique et P2 nouveau corrigées ; inspection visuelle réelle **NOT RUN**.
- **P : PASS structurel et DOM simulé.** 15 questions flash, 5 corrigés détaillés, 5 parcours simulés ; essais élèves réels **NOT RUN**.
- **F : PASS ciblé V8.** 12 tests de fichiers CJS exécutés dans adaptateur V8 sur le code réel : 7 scientifiques/structurels et 5 DOM simulés ; CI native **BLOCKED**.
- **A : NOT RUN** pour essais réels NVDA, TalkBack, VoiceOver, appareils Android/iOS, zoom et inspection manuelle.

GitHub Actions : quatre workflows en échec avant étape observable sur le commit de production `7f8bc55433c2b67ab4da457212d8ba467b3bd614`. Relances Node (40593812916) et scientifique (40593812953) également en échec à la tentative 2 ; jobs sans étapes, journaux HTTP 404 BlobNotFound. Cause non démontrée ; aucun succès Node natif revendiqué.

## Réception
Catalogue **297 fichiers HTML et 297 identifiants uniques**, 17 univers représentés. Cible : 996 missions ; intégration ≠ réception. La classification complète des 249 sous-savoirs reste à contrôler. Accueil et carte inchangés ; dépôt privé, archive conservée. Publication et HEAD final à confirmer après le commit de ce registre.

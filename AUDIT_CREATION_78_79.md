# SI QUEST — Cycle horaire : audits et création des missions 78–79

Date : 25 octobre 2026. Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`.
Révision technique testée par GitHub Actions : `239d567bf4488c5f35e1a7a211820878f9fddec8`.

## A — Audit et correction

**Périmètre :** vérification des composants scientifiques, de l'affichage SVG et du parcours de correction commun aux missions existantes ; maintien des tests de non-régression couvrant notamment les missions 40–75. Il ne s'agit **pas** d'une inspection manuelle exhaustive, mission par mission, des 36 missions 40–75.

**Anomalie corrigée dans `src/investigation-mission.js` :** après trois réponses fausses, le texte annonçait le corrigé comme disponible alors que l'interface impose également trois indices. Message remplacé par « Trois essais effectués : demande les trois indices pour déverrouiller le corrigé. » Le verrouillage `tries<3 || hints<3` reste appliqué. Le test de non-régression associé est dans `tests/batch78-79.test.cjs`.

**Contrôle de robustesse :** le test historique `tests/batch76-77.test.cjs` exigeait exactement 77 missions ; sa contrainte a été remplacée par un minimum de 77 et l'unicité de tous les identifiants, pour éviter qu'une extension valide du catalogue fasse échouer artificiellement la recette.

**Contrôles exécutés :** les trois workflows GitHub Actions ont terminé en `success` sur la révision `239d567b` ; les suites existantes de recette des missions 40–75 ont donc été relancées dans la suite de non-régression. Une réussite de tests automatisés ne constitue pas un audit visuel ou scientifique exhaustif de chacune de ces missions.

## B — Création réelle de deux missions indépendantes

### 78. Vérin double effet — Effort et contre-pression (`hydro-backpressure-01`, SI-06)

- Situation : diagnostic d'un relevage hydraulique dont le retour est sous pression.
- Hypothèses : régime quasi-statique, pressions relatives au même réservoir, frottements et inertie négligés.
- Données : piston `D = 80 mm`, tige `d = 40 mm`, `pA = 120 bar`, contre-pression initiale `pB = 20 bar`.
- Loi : `F = pA × πD²/4 − pB × π(D²−d²)/4`.
- Surfaces : `A_p = 0,00502655 m²` et `A_a = 0,00376991 m²`.
- Résultat initial : `F = 52 778,76 N = 52,779 kN`. Domaine d'essai `pB ∈ [0 ; 80] bar`.
- Invariants vérifiés : `pB = 0` annule la contribution opposée ; augmenter `pB` de 20 bar réduit `F` de `7,540 kN` ; les unités `Pa × m² = N` sont homogènes.
- Décision : seuil pédagogique `F ≥ 35 kN`, à ne pas utiliser comme capacité constructeur. Schéma 2D avec deux actions opposées et courbe décroissante.

### 79. Flambement élastique — Tige comprimée (`euler-buckling-01`, SI-04)

- Situation : étude de stabilité d'une tige de levage comprimée et articulée à ses deux extrémités.
- Hypothèses : colonne droite, compression centrée, Euler élastique, appuis articulés idéaux `K = 1`, défauts et excentricité négligés.
- Données : acier `E = 210 GPa`, section circulaire pleine `d = 20 mm`, longueur libre initiale `L = 2,0 m`.
- Lois : `I = πd⁴/64` ; `Pcr = π²EI/(KL)²`.
- Moment quadratique : `I = 7,854 × 10⁻⁹ m⁴`.
- Résultat initial : `Pcr = 4 069,57 N = 4,070 kN`. Domaine `L ∈ [1 ; 3] m`.
- Invariants vérifiés : doubler `L` divise `Pcr` par 4 ; `Pa × m⁴/m² = N`. Le modèle ne fournit pas une charge admissible.
- Décision : seuil pédagogique `Pcr ≥ 6 kN` ; nécessité de vérifier les appuis, l'élancement, les imperfections et un coefficient de sécurité avant emploi. Schéma 2D et courbe en `1/L²`.

## Recette S/G/P/F/A — état démontré

| Dimension | Éléments réellement contrôlés | Statut |
|---|---|---|
| S — scientifique | Contre-calculs, homogénéité, limites, propriétés métamorphiques et tests des deux nouveaux modèles | Tests automatisés réussis |
| G — graphique | SVG générés aux bornes et au point initial, titres, unités, absence de valeurs non finies ; dégagement des légendes des deux nouveaux schémas | Structure testée ; inspection visuelle non réalisée |
| P — pédagogique | Contexte métier, prérequis, données, hypothèses, corrigé détaillé, trois essais, trois aides, seuil fictif, décision technique | Vérification de code ; essai élève non réalisé |
| F — fonctionnel | 79 identifiants uniques, configurations HTML, moteurs et workflows GitHub Actions | Trois workflows réussis sur `239d567b` |
| A — accessibilité | Présence de balises, libellés, rôles et textes alternatifs SVG ; tests automatisés disponibles | NVDA, TalkBack, VoiceOver, zoom et appareils réels non testés |

**Livraison :** deux nouvelles missions reliées au catalogue ; total **79**. Les missions ne sont **pas déclarées intégralement reçues** tant que la recette visuelle et matérielle n'a pas été produite. Le dépôt reste privé ; aucune publication ni refonte de l'accueil ou de la carte.

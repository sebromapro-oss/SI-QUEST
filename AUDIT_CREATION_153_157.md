# SI QUEST V2.3 — Lot 153–157

**Date :** 26 octobre 2026, 19 h (Europe/Paris). **HEAD initial :** `6c567839dd67354d7cb9528ea2abdd5eba181e6d`.

## Protection
Dépôt privé ; aucun changement des fichiers HTML/CSS/JS/SVG/assets de la nouvelle page d'accueil et de sa carte. Catalogue étendu sans modification de la navigation d'accueil. Aucune publication GitHub Pages, aucun ZIP, aucune suppression d'archive.

## Audit A
- **P2 graphique — `hydro-speed-01`** : la flèche de débit persistait à Q = 0 L/min ; supprimée à débit nul et conservée pour Q > 0.
- **P2 graphique — `hydro-force-02`** : la flèche d'effort persistait à Δp = 0 bar ; supprimée à pression nulle et conservée pour Δp > 0.
- Tests de non-régression ajoutés. Réception exhaustive 40–75 encore ouverte.

## Production B
| N° | Mission | Résultat nominal | Unité |
|---|---|---:|---|
| 153 | `cantilever-strain-energy-01` | 1.54285714 | J |
| 154 | `gas-polytropic-temperature-01` | 130.520321 | °C |
| 155 | `battery-discharge-c-rate-01` | 0.500000000 | h⁻¹ |
| 156 | `hydraulic-cavitation-number-01` | 9.43486974 | sans unité |
| 157 | `bolt-preload-torque-01` | 48.0000000 | N·m |

Modèles indépendants, hypothèses, unités, contre-calculs, cinq points par modèle, limites et cas invalides, SVG paramétriques, graphiques synchronisés, objectifs, prérequis, trois questions flash et décision métier fictive. Contrôleur partagé : trois essais, trois aides, corrigé conditionnel et sauvegarde. Scènes 2D ; aucune 3D revendiquée.

## Preuves S/G/P/F/A
- **S : PASS ciblé** : 116 assertions préparatoires V8, résultats contre-calculés et cas invalides.
- **G : PASS structurel ciblé** : géométrie SVG et unités ; inspection visuelle individuelle **NOT RUN**.
- **P : contenus intégrés** ; essai élève et validation pédagogique **NOT RUN**.
- **F : PASS ciblé V8** ; tests Node natifs, navigateur et CI du commit final **à vérifier**.
- **A : NOT RUN** : clavier/zoom matériels et NVDA, TalkBack, VoiceOver.

Les workflows GitHub Actions du HEAD initial étaient en échec sans étape exécutée ni runner indiqué ; la cause reste à rechercher. Ne pas confondre intégration au catalogue et validation intégrale.

## Contre-audit complémentaire du même cycle
- **Historique 40–75 : 36/36 PASS ciblés**, sur 108 points (minimum, nominal, maximum), en quatre lots de neuf missions ; cohérence configuration/moteur, unité d'entrée/sortie, résultat nominal, finitude, structure SVG et absence de NaN/Infinity/undefined. Ces tests ne sont pas des contre-calculs indépendants pour chacune des 36 lois.
- **Nouveau lot 153–157 : 8/8 blocs de tests PASS, 253 assertions**, exécutés sur les fichiers réellement relus du commit avec un adaptateur CommonJS JavaScript V8 ; **ce n'est pas une exécution Node native**.
- **CI GitHub Actions sur le commit de production `e7d6e4fcb7e3b3a5c94919f3a6e72661336c55be` : 4 workflows en état FAILURE** (runs 40376460272, 40376460475, 40376460832, 40376460374). Chaque job retourné ne contient aucune étape exécutée ni runner identifié ; la récupération du journal du job 121760724686 renvoie BlobNotFound. **BLOCKED : impossible de démontrer la réussite des tests Node natifs ou de corriger une erreur d'exécution non reproduite.** Ne pas déclarer la CI réussie.
- Protection vérifiée après publication : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` ont conservé exactement leurs SHA de blobs initiaux. Les 157 pages HTML sont présentes.

**Verdict :** S = PASS ciblé ; G = PASS structurel ciblé / inspection visuelle NOT RUN ; P = contenus intégrés / essai élève NOT RUN ; F = PASS V8 ciblé / CI native BLOCKED ; A = NOT RUN. La réception globale demeure ouverte.

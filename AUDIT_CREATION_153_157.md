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

# SI QUEST V2.3 — Cycle 308–312 (28 octobre 2026)
## Dépôt et sécurité
HEAD initial distant : `639f1aacc78b55bac2b42b15dc51f49ce36d700e`. Branche `main`, dépôt privé. Fichiers protégés de l'accueil non modifiés : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg`. Aucune modification de la carte, aucune publication Pages ni suppression de branche archive.
## Chantier A — correction de non-régression et physique
- **P1 fonctionnel** : `tests/batch303-307-flow.test.cjs` utilisait le moteur du lot 298–302 et construisait les faux éléments DOM à partir des identifiants de missions au lieu des identifiants HTML ; accès à `nodes.calc` indéfini. Correction des deux causes, test des cinq vraies missions 303–307.
- **P2 graphique/scientifique** : `rolling-load-01` représentait la force équivalente de résistance au roulement au contact sol/roue, la confondant visuellement avec une force tangentielle de contact. Force équivalente repositionnée à l'axe, longueur proportionnelle à cᵣN, contrôle sur trois valeurs et test de non-régression.
- **P1 fonctionnel mutualisé** : prise en charge générique de `inputStep===1` pour les domaines entiers dans la grille de calcul et le curseur, sans liste d'identifiants figée. Cas micropas contrôlé.
## Chantier B — cinq nouveaux sous-savoirs
- 308 `pitot-incompressible-speed-01` — Vitesse d'un écoulement incompressible par pression totale et statique. Nominal : 0,8 m/s.
- 309 `dc-parallel-current-divider-01` — Courant d'une branche d'un diviseur de courant résistif. Nominal : 2,4 A.
- 310 `exchanger-ntu-equal-capacity-01` — Efficacité NTU d'un échangeur à contre-courant pour Cᵣ=1. Nominal : 60 %.
- 311 `stepper-microstep-angle-01` — Angle de commande théorique par micropas d'un moteur pas à pas. Nominal : 0,225 °.
- 312 `fatigue-notch-factor-01` — Facteur de concentration effectif en fatigue Kf à partir de Kt et q. Nominal : 1,9 sans unité.
Les cinq pages comportent situation professionnelle, objectif, prérequis, trois questions flash, hypothèses, modèle pur, domaine, unités, SVG 2D paramétrique, graphe masqué jusqu'à validation, trois essais et aides, corrigé conditionnel, décision fictive, carnet et sauvegarde par contrôleur commun. Les scènes statiques sont justifiées ; aucune 3D ni animation temporelle n'est revendiquée.
## Réception à documenter
Les contre-calculs de trois jeux de données par mission, les invariants et la synchronisation des SVG figurent dans `tests/batch308-312.test.cjs`. Les parcours DOM simulés figurent dans `tests/batch308-312-flow.test.cjs`. Les tests historiques de la résistance au roulement figurent dans `tests/historical-rolling-resistance-axle.test.cjs`. Les statuts CI native, navigateur, matériel et lecteurs d'écran doivent être constatés séparément ; leur absence ne vaut pas PASS. Aucun test NVDA/TalkBack/VoiceOver n'est revendiqué.
## Limites ouvertes
CI GitHub Actions à vérifier sur le commit publié ; inspection visuelle multi-écrans et tests matériels non réalisés dans ce cycle. Les 97 missions anciennes sans sous-savoir explicite restent à classifier. Présence au catalogue ≠ réception complète.

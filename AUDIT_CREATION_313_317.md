# SI QUEST V2.3 — Audit et production 313–317 — 28 octobre 2026

## Phase 0 : sécurité et référence
Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`. HEAD initial distant : `6816b6946bbf2a27b1cb3faf8599b63ac25ed852`. Cahier des charges V2.3, EXIGENCES.md, PRODUCTION.md, modèles, catalogue, tests et dépendances de l'accueil lus. La nouvelle page d'accueil et la carte restent inchangées : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg`. Branche `archive/pre-reconstruction-cycle28-20261025` conservée. Aucun ZIP ni publication GitHub Pages.

## Chantier A : audit et corrections historiques
36 missions 40–75 testées sur paramètres min, nominal et max : **108/108 états numériques finis et SVG structurels PASS** en JavaScript V8, à partir des fichiers HTML et des moteurs réels. Ce contrôle ne constitue pas 108 contre-calculs indépendants.
- **P2 graphique** : `belt-speed-01` affichait une flèche de vitesse de longueur fixe à 100, 900 et 1 500 tr/min. Correction proportionnelle à n, tests de non-régression `tests/historical-belt-speed-arrow.test.cjs`.
- **P1 graphique** : représentation initiale du transformateur 314 : une ligne verticale pouvait figurer un court-circuit primaire. Suppression et contrôle des connexions dans `tests/batch313-317.test.cjs`.
- **P1 tests** : le premier générateur du banc DOM 313–317 remplaçait les identifiants DOM par des identifiants de missions. Correction avant réception ; cinq parcours DOM réellement ciblés.
- **P1 ouvert** : GitHub Actions conclut `failure` avant toute étape exécutée, sans runner ni journaux accessibles. Diagnostic de l'infrastructure nécessaire.

## Chantier B : cinq nouvelles missions indépendantes
- 313 `rectangular-beam-max-shear-01` : cisaillement maximal rectangulaire, **3,750 MPa**.
- 314 `transformer-reflected-impedance-01` : impédance résistive ramenée au primaire, **72,0 Ω**.
- 315 `fourier-number-slab-01` : nombre de Fourier d'une plaque, **0,400 sans unité**.
- 316 `weibull-component-reliability-01` : survie Weibull de forme 2, **52,7292 %**.
- 317 `belt-effective-tension-01` : différence de tensions de courroie, **500 N**.

Chaque mission comprend une situation métier, un sous-savoir propre, objectifs, prérequis, trois questions flash, hypothèses, unités, domaine, modèle pur, SVG 2D paramétrique, graphe calculé, trois essais, trois aides, corrigé conditionnel détaillé, décision fictive, carnet et sauvegarde par contrôleur mutualisé. Aucun mouvement temporel ni 3D n'est revendiqué pour ces modèles stationnaires ou statistiques.

## Tests et statuts S/G/P/F/A
- **S PASS ciblé** : 15 références numériques indépendantes (min/nominal/max), 20 rejets hors domaine, 5 rejets de SVG désynchronisé, 5 familles d'invariants indépendants, contrôle dimensionnel dans les corrigés.
- **G PASS structurel / NOT RUN visuel** : SVG paramétriques pour 15 états, contrôle de la flèche historique et de la connexion du transformateur ; aucune inspection sur navigateur réel.
- **P PASS DOM simulé** : 5 parcours d'essais, saisies invalides, trois aides, corrigé, étoiles et sauvegarde ; aucun test élève réel.
- **F PASS V8 ciblé / BLOCKED CI native** : 13 cas de test PASS, 244 assertions PASS avec adaptateurs V8 ; 108/108 états historiques structurels PASS. Le catalogue contient **317 identifiants uniques, 17 univers et 220 sous-savoirs explicites distincts**. Tests Node natifs GitHub Actions non exécutés.
- **A PASS structure HTML ciblée / NOT RUN matériel** : labels, titres, liens de saut, descriptions SVG présents. NVDA, TalkBack, VoiceOver, zoom et tests tactiles réels **NOT RUN**.

## Limites et critères de sortie
Statut des missions 313–317 : **codées et testées automatiquement de façon ciblée, non validées en réception complète**. La CI native est **BLOCKED**, la recette visuelle et matérielle **NOT RUN**. Les 97 missions historiques sans sous-savoir explicite restent à classifier. Toute validation finale exige des preuves individuelles S/G/P/F/A, sans assimiler publication et réception.

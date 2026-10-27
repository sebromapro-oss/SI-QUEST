# SI QUEST V2.3 — Audit et production 238–242

**Date : 27 octobre 2026 (Europe/Paris).** Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`.

## Phase 0 et protection
- HEAD distant initial : `20a2c160689f059d840c283b4bd6d60e71d1304f`.
- Documents lus : `CAHIER_DES_CHARGES_MAITRE.md` (V2.3), `EXIGENCES.md`, `PRODUCTION.md`, modèle de mission, catalogue, tests et workflow de recette.
- Dépendances de l'accueil : `index.html` charge `src/catalog.js` et `src/home.js`. Seul le catalogue est enrichi pour les liens ; `index.html`, `src/home.js`, `src/style.css`, `assets/*` et la carte restent intacts.
- SHA final : à relever après publication depuis `refs/heads/main`.

## Nouvelles investigations (238–242)
| Mission | Identifiant | Sous-savoir distinct | Résultat nominal |
|---|---|---|---|
| 238 | `shaft-key-bearing-pressure-01` | Pression de matage d'une clavette, distincte du cisaillement | 50,00 MPa pour T=160 N·m |
| 239 | `ultrasonic-time-of-flight-01` | Distance par écho ultrasonore aller-retour | 1,372 m pour t=8 ms |
| 240 | `square-screw-lead-angle-01` | Angle d'hélice et autoblocage théorique du filet carré | 4,5499° pour l=6 mm |
| 241 | `capillary-rise-water-01` | Loi de Jurin, équilibre capillaire | 29,7435 mm pour r=0,5 mm |
| 242 | `sample-hold-phase-lag-01` | Déphasage fréquentiel d'un maintien d'ordre zéro | −18,0° pour f=5 Hz |

Chaque page possède contexte métier, objectif, prérequis, trois questions flash, hypothèses, domaine, unités, calcul, SVG 2D paramétrique, graphe verrouillé, corrigé détaillé et décision pédagogique fictive. Les trois essais, trois aides, sauvegardes et étoiles utilisent le contrôleur commun. Aucune 3D ni animation temporelle artificielle n'est revendiquée.

## Chantier A : audit historique 40–75
36 missions contrôlées sur trois états (min/nominal/max) : **108/108 états PASS en JavaScript V8 avec adaptateurs**. Critères : calcul fini, unités déclarées, structure SVG, absence de NaN/Infinity. Ce n'est pas une réception scientifique ou visuelle exhaustive.

**Anomalie P2 graphique corrigée** dans `kinetic-friction-01` : longueur de flèche de frottement constante alors que μ varie à normale constante. La flèche a désormais une longueur proportionnelle à μ, une origine au contact et un sens opposé à la vitesse. Test de non-régression ajouté et ancien test géométrique adapté.

Aucune P0 identifiée par ces contrôles ciblés ; aucune absence globale d'anomalies n'est revendiquée.

## Preuves et statuts S/G/P/F/A
| Domaine | Statut | Preuve et limite |
|---|---|---|
| S scientifique | **PASS ciblé** | 25/25 états de cinq modèles, 20/20 entrées invalides rejetées, contre-calculs indépendants, invariants, 108 historiques |
| G graphique | **PASS structurel / NOT RUN visuel** | SVG paramétriques, cohérence résultat/paramètre, correction flèche ; pas d'inspection navigateur |
| P pédagogique | **PASS structurel / NOT RUN élèves** | Trois questions flash, trois aides, corrigés et décisions ; aucun essai en classe |
| F fonctionnel | **PASS V8 simulé / BLOCKED CI native** | 8 tests scientifiques et structurels + 5 parcours DOM simulés PASS ; Node natif non attesté |
| A accessibilité | **NOT RUN manuel** | NVDA, TalkBack, VoiceOver, appareils et zoom 400 % non testés |

Les tests DOM simulés vérifient les saisies invalides, trois essais, aides, corrigé conditionnel, étoiles et persistance. L'exécution GitHub Actions doit être inspectée après publication ; un job sans étapes ne peut être déclaré PASS.

## Catalogue et réception
**242 identifiants uniques, 242 HTML, 17 univers**, 145 sous-savoirs explicitement distincts si les 140 antérieurs sont conservés ; 97 missions historiques restent à classifier. Les cinq missions sont codées et testées de manière ciblée, **non validées en réception complète**.

Aucun ZIP, aucune publication GitHub Pages, aucun force push, aucune suppression de branche archive, aucune modification de visibilité.

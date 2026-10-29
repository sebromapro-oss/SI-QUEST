# SI QUEST V2.3 — Cycle 513–517 — 29 octobre 2026

## Phase 0
- Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main` ; HEAD initial `f11d0cfc1819e7ecaad61ec4c6cf185a4c23d6d7`.
- Documents lus : `CAHIER_DES_CHARGES_MAITRE.md` V2.3, `EXIGENCES.md`, `PRODUCTION.md`, `src/catalog.js`, moteur mutualisé, modèles 508–512, tests et workflows.
- Protection : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` et navigation de l'accueil inchangés. Seul `src/catalog.js` est modifié pour intégrer les missions.
- CI existante : échecs avant étape de job observables ; cause exacte indéterminée.

## Chantier A — missions historiques 40–75
- 36 moteurs et pages vérifiés sur min/nominal/max par V8 ; 108 résultats numériques finis et 108 SVG structurés, 108 désynchronisations rejetées (PASS ciblé).
- Anomalie P2 : `measurement-uncertainty-01` ne possédait pas de sous-savoir explicite dans le catalogue ni dans sa page. Correction dans les deux fichiers et test de non-régression.
- Le contrôle scientifique indépendant exhaustif des 36 modèles, le parcours navigateur et l'accessibilité matérielle restent ouverts.

## Chantier B — cinq missions indépendantes
- **513** `mutual-inductance-emf-01` (SI-08) : Induction mutuelle — Tension efficace induite, nominal 9.424778 V ; Force électromotrice efficace induite par une inductance mutuelle sinusoïdale.
- **514** `fick-membrane-diffusion-01` (SI-14) : Membrane — Débit molaire par diffusion, nominal 2 µmol/s ; Débit molaire stationnaire selon la première loi de Fick dans une membrane plane.
- **515** `centrifugal-clutch-threshold-01` (SI-05) : Embrayage centrifuge — Vitesse d'engagement idéale, nominal 711.76254 tr/min ; Seuil de vitesse d'un masselotte centrifuge équilibrée par un ressort préchargé.
- **516** `three-phase-current-thd-01` (SI-08) : Courant triphasé — Distorsion harmonique totale, nominal 25 % ; THD du courant à partir des composantes harmoniques efficaces.
- **517** `hydraulic-intensifier-pressure-01` (SI-06) : Multiplicateur hydraulique — Pression de sortie idéale, nominal 153.6 bar ; Multiplication de pression par équilibre des forces de deux pistons solidaires.

Chaque mission contient objectifs, prérequis, 3 flash, domaine, hypothèses, modèle pur, unités, SVG 2D paramétrique et graphe synchronisé, décision métier fictive, trois essais et trois aides mutualisés, corrigé conditionnel et sauvegarde. Les phénomènes étudiés sont stationnaires ou définis par un seuil : absence de simulation temporelle explicitée. Pas de 3D revendiquée.

## Tests et preuves
- V8 ciblé : 15/15 contre-calculs indépendants, 15/15 rendus SVG, 15/15 rejets de désynchronisation, 20/20 paramètres invalides PASS avant commit.
- Syntaxe JavaScript compilée V8 : PASS ; exécution native Node dans ce cycle : NOT RUN ; CI GitHub Actions : à vérifier sur le SHA publié.
- S PASS ciblé ; G PASS structurel, visuel NOT RUN ; P PASS structurel, parcours complet NOT RUN ; F PASS V8 ciblé, navigateur NOT RUN ; A NOT RUN (NVDA, TalkBack, VoiceOver et appareils).
- Catalogue : unicité, présence des pages et nombre réel à vérifier après publication ; taxonomie canonique 249 sous-savoirs encore à réconcilier.
- Aucun test navigateur réel ou matériel revendiqué. Réception complète non prononcée.

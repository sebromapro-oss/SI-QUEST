# SI QUEST V2.3 — Cycle 383–387

28 octobre 2026. HEAD initial `591019f0df667bc7af1aebe00a0b3f070b202ffd`, dépôt privé, branche main.

## Protection
Accueil et carte inchangés : `index.html` 94165cccd6ad972a1a57699d5fcf42afde5cca53; `src/home.js` 0ead30ab3afe119589f0a14aab99898f0e7721d7; `src/style.css` 966e623673ce45c86c2cc6a59a4725406475db10; `assets/archipelago-cinematic.svg` 8d75fd72f75cb662f0d2de1c5a3e1df8ab935347. Aucun ZIP, GitHub Pages, force push ou suppression d’archive.

## Production
- **383** `belt-capstan-min-tight-tension-01` : Courroie — Tension à la limite d’adhérence. Référence nominale indépendante : 919.013122 N. Sous-savoir : Différence des tensions de courroie par puissance et vitesse.
- **384** `heat-exchanger-hot-outlet-01` : Échangeur — Température de sortie chaude. Référence nominale indépendante : 62.0000000 °C. Sous-savoir : Efficacité d'un échangeur et capacité thermique minimale.
- **385** `adc-quantization-max-error-01` : CAN 12 bits — Erreur maximale de quantification. Référence nominale indépendante : 1.22070313 mV. Sous-savoir : Résolution en tension d’un convertisseur idéal.
- **386** `pneumatic-receiver-pressure-rise-01` : Cuve pneumatique — Hausse de pression isotherme. Référence nominale indépendante : 60.0000000 kPa. Sous-savoir : Bilan isotherme de masse d'air avec débit d'air libre constant.
- **387** `thevenin-source-efficiency-01` : Source de Thévenin — Rendement électrique. Référence nominale indépendante : 75.0000000 %. Sous-savoir : Adaptation résistive d'une charge à une source de Thévenin.

## Audit 40–75
36 missions contrôlées sur min/nominal/max : **108/108 calculs finis**, **108/108 SVG structurels**, **72/72 NaN/Infinity rejetés**, en JavaScript V8. Corrections P2 pédagogiques : `axial-strain-01` (flash, objectifs, unité de l’axe) et `pneumatic-force-01` (flash, conversion SI, force idéale/réelle). **13 pages** historiques sans flash natifs ; contrôleur peut en injecter. Ces contrôles ne prouvent pas la physique exhaustive.

## Réception
S **PASS ciblé** : 15 contre-calculs indépendants, domaines, signes et unités ; G **PASS structurel** : 15 SVG, synchronisation et échelles, inspection navigateur **NOT RUN** ; P **PASS ciblé** : cinq séries de trois flash et cinq parcours DOM simulés ; F **PASS V8 ciblé** : trois essais/aides, corrigé conditionnel, étoiles et sauvegarde ; CI Node native **BLOCKED** (runs échouant avant étapes, sans runner ni journaux), navigateurs réels **NOT RUN** ; A **PARTIEL**, NVDA/TalkBack/VoiceOver **NOT RUN**. Non validées définitivement.

Catalogue attendu : **387/996**, 17 univers, 249 sous-savoirs, 609 missions restant à produire. Aucune recette sur matériel revendiquée.

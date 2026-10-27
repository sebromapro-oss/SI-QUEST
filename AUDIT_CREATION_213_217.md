# SI QUEST V2.3 — Cycle 213–217 — 27 octobre 2026

HEAD initial : `edd0fb77694b8601a0e590ffd869c5bb9358602a` ; dépôt privé, branche main.

## Missions
- 213 : `dc-bus-discharge-time-01` — Décroissance RC d'une tension résiduelle ; nominal 50.864105 s.
- 214 : `regenerative-braking-energy-01` — Bilan d'énergie cinétique récupérée avec rendement ; nominal 37.440000 kJ.
- 215 : `proportional-saturation-01` — Commande proportionnelle statique avec saturation ; nominal 60.000000 %.
- 216 : `hydraulic-local-loss-01` — Perte locale de pression à travers un raccord ; nominal 0.040447417 bar.
- 217 : `process-capability-cpk-01` — Capabilité par position moyenne et dispersion ; nominal 1.4000000 sans unité.

## Correction
P2 G/S `axial-strain-01` : suppression des deux flèches d'effort non calculées et de la flèche d'allongement nulle à ΔL = 0. Contre-tests à 0, 0,5 et 1,2 mm. Amplification graphique explicitée.

## Contrôles et limites
- 372 assertions V8, 12 tests Node-like V8 avec adaptateurs dont cinq parcours DOM simulés. Ce ne sont pas des tests Node natifs.
- S PASS ciblé ; G PASS SVG structurel, visuel NOT RUN ; P PASS DOM simulé, essai élève NOT RUN ; F PASS V8 simulé, CI à vérifier ; A NOT RUN sur appareils et lecteurs d'écran.
- Les modèles sont stationnaires, schémas 2D et graphes paramétriques ; aucune 3D ou animation temporelle revendiquée.
- Accueil protégé : index.html, src/home.js, src/style.css, assets/archipelago-cinematic.svg inchangés. Aucun ZIP, Pages, force push ou suppression d'archive.

## Audit complémentaire historique 40–75 et correctif pédagogique

- **36/36 missions** : 612 assertions ciblées V8 PASS (configuration, modèle nominal, trois états min/nominal/max, unités et structure SVG). Il ne s'agit pas d'une recette visuelle ou d'un contre-calcul indépendant exhaustif.
- **P2 pédagogique** : 28 missions historiques sans questions flash dans leur HTML ; ajout de trois questions scientifiques individualisées par mission via le contrôleur partagé `src/investigation-mission.js`. Les 8 autres missions de la plage disposent déjà d'une réactivation dans leur page. Aucun fichier d'accueil modifié.
- Contrôles : syntaxe du contrôleur en V8, 28 entrées × 3 questions distinctes ; test automatisé `tests/historical-flash-40-75.test.cjs`. Recette élève réelle NOT RUN.

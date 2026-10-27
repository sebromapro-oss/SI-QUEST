# SI QUEST V2.3 — Cycle 218–222 — 27 octobre 2026

HEAD initial : `9e9b550a8dc3bad12449bbabf23769d5c74591d9` ; dépôt privé, branche `main`.

## Production
- 218 : `stokes-sphere-drag-01` — Traînée visqueuse linéaire à faible Reynolds autour d'une sphère ; nominal 0.188495559 mN.
- 219 : `magnetic-airgap-force-01` — Pression magnétique dans un entrefer uniforme ; nominal 12.7323954 N.
- 220 : `gear-tooth-tangential-force-01` — Équilibre du couple et de l'effort tangentiel au diamètre primitif ; nominal 1600.00000 N.
- 221 : `pendulum-small-angle-period-01` — Période propre du pendule simple linéarisé ; nominal 2.00606668 s.
- 222 : `radial-insulation-resistance-01` — Conduction cylindrique stationnaire dans une couche annulaire ; nominal 2.45150667 K/W.

## Audit historique et correction
- Missions 40–75 : 36 configurations et 3 états (min/nominal/max) contrôlés par moteur V8 et structure SVG ; ceci n'est pas une réception scientifique indépendante exhaustive.
- **P2 G/P `hydro-volume-01`** : le piston était décalé à course nulle et sa position n'était pas liée proportionnellement à la course ; l'unité mm manquait sur la légende. Chambre visualisée depuis la course zéro, tige liée au piston, annotation `L` et `V` avec unités. Contre-test aux courses 0 et 600 mm.
- Accueil protégé : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` inchangés.

## Contrôles et limites
- Modèles purs avec domaines, valeurs nominales, bornes et invalides ; contre-calculs algébriques distincts dans `tests/batch218-222.test.cjs`.
- **Tests réellement exécutés en V8 avec adaptateurs** : 132 vérifications préparatoires ; 8 tests unitaires / 222 assertions PASS ; 5 parcours DOM simulés / 80 assertions PASS ; 36 missions historiques × 3 états = 108 états PASS. Ces chiffres ne correspondent pas à une exécution native Node ni à une recette navigateur.
- 5 parcours DOM simulés dans `tests/batch218-222-flow.test.cjs` ; cela ne prouve pas les interactions sur navigateur réel.
- S PASS ciblé ; G PASS structurel, visuel NOT RUN ; P PASS structurel et DOM simulé, essai élève NOT RUN ; F PASS V8 simulé, CI native à vérifier ; A NOT RUN sur appareils et lecteurs d'écran.
- Scènes 2D stationnaires et graphes paramétriques synchronisés après déverrouillage, aucune simulation 3D ni animation temporelle revendiquée.
- Aucun ZIP, Pages, force push, suppression d'archive ou changement de visibilité.

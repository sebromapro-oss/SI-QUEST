# SI QUEST V2.3 — Audit et création 533–537 — 29 octobre 2026

## Phase 0
HEAD initial vérifié : `a14ff5e1b8ffebe64be121feaf79216a8c2fbd7b` (dépôt privé, main). Cahier des charges maître V2.3, EXIGENCES, PRODUCTION, moteurs, catalogue, modèles et tests consultés. Accueil protégé : index.html, src/home.js, src/style.css et assets/archipelago-cinematic.svg exclus des changements. Arbre de base vérifié issu du commit 461a699e, avec restauration explicite de tous les fichiers modifiés depuis ce commit.

## Chantier A — missions 40 à 75
36 missions contrôlées sur min/nominal/max dans V8 : 108 calculs finis, 108 SVG structurés, 108 rejets de désynchronisation ; trois questions flash par mission. Cinq défauts P2 de traçabilité corrigés : sampling-01, efficiency-chain-01, rolling-load-01, heat-transfer-01, measurement-relative-01. Dix configurations de la tranche restent sans sous-savoir dans window.SI_MISSION. Ce contrôle est ciblé, non une contre-expertise scientifique exhaustive.

## Chantier B — créations
- **533** `oring-groove-squeeze-01` (SI-14) : Joint torique — Taux d'écrasement radial ; nominal 14.285714 %.
- **534** `ballscrew-lifting-torque-01` (SI-05) : Vis à billes — Couple de levage quasi statique ; nominal 14.147106 N·m.
- **535** `elastic-pipe-pressure-wave-speed-01` (SI-06) : Conduite élastique — Célérité d'une onde de pression ; nominal 1255.7751 m/s.
- **536** `supercapacitor-constant-current-charge-time-01` (SI-08) : Supercondensateur — Durée de charge à courant constant ; nominal 75 s.
- **537** `scotch-yoke-displacement-01` (SI-01) : Coulisseau à excentrique — Déplacement géométrique ; nominal 20 mm.

Modèles purs et distincts, hypothèses, unités, tolérances spécifiques, trois flash, trois essais et aides via contrôleur mutualisé, corrigé conditionnel, décisions fictives, schémas SVG et courbes calculés à partir des mêmes paramètres. Schémas 2D de principe, pas de simulation 3D ni d'animation temporelle revendiquée.

## Preuves
S : PASS ciblé V8 (15 contre-calculs indépendants, 30 cas invalides, invariants) ; G : PASS structurel (15 SVG et 15 rejets), visuel NOT RUN ; P : PASS structurel, parcours réel NOT RUN ; F : PASS ciblé V8, Node natif NOT RUN, CI à vérifier ; A : NOT RUN appareils/lecteurs d'écran. La réception complète reste ouverte. Anomalie taxonomie 249 sous-savoirs canoniques non résolue. Blocage CI historique sans étapes observables.

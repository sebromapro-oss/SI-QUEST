# SI QUEST V2.3 — Cycle 483–487 — 29 octobre 2026

## Phase 0 et sécurité
- Dépôt privé, main, HEAD initial `12b5dc2be52ebf3ea15a84a7f9eb74424905ddbd`.
- Cahier maître V2.3, EXIGENCES.md, PRODUCTION.md, catalogue, batch 478–482, contrôleur mutualisé et workflows consultés.
- Aucun changement des fichiers d'accueil `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` ; pas de Pages, pas de ZIP, pas de branche supprimée.

## Chantier A — corrections
- P2 : cinq sous-savoirs historiques 40–75 ajoutés au catalogue et aux pages (`torsion-01`, `axial-strain-01`, `gear-mesh-01`, `belt-speed-01`, `hydro-power-01`).
- P1 pédagogique : quatre sous-savoirs antérieurs incorrectement rattachés ont été rectifiés dans le catalogue et les pages (`threephase-star-capacitance-01`, `rl-current-threshold-time-01`, `flywheel-kinetic-energy-01`, `convective-surface-coefficient-01`).
- Test de non-régression ajouté dans `tests/batch483-487.test.cjs`.

## Chantier B — cinq modèles scientifiques indépendants
- 483 `chain-drive-pitch-speed-01` : Transmission par chaîne — Vitesse moyenne ; nominal 2.54 m/s.
- 484 `trapezoid-plate-centroid-01` : Plaque trapézoïdale — Position du centre de surface ; nominal 266.66666666666663 mm.
- 485 `pwm-ideal-average-voltage-01` : Commande PWM — Tension moyenne idéale ; nominal 16.799999999999997 V.
- 486 `parallel-redundancy-reliability-01` : Maintenance — Fiabilité de deux organes redondants ; nominal 84.51818782538246 %.
- 487 `annular-rotor-polar-inertia-01` : Rotor annulaire — Moment d'inertie massique axial ; nominal 0.024640422243974287 kg·m².

## Preuves et limites
- Contre-calculs indépendants dans l'exécuteur JavaScript : 15/15 PASS ; 15 SVG structurels synchronisés PASS ; 15 désynchronisations rejetées ; 20 paramètres invalides rejetés.
- Tests Node de la suite `batch483-487.test.cjs` : NOT RUN lors de la rédaction du présent registre ; CI GitHub Actions : à contrôler après commit.
- DOM simulé : NOT RUN ; navigateur visuel : NOT RUN ; Android/iPhone/Windows/Mac réels : NOT RUN ; NVDA/TalkBack/VoiceOver : NOT RUN.
- Réception S : PASS ciblé ; G : PASS structurel / visuel NOT RUN ; P : PASS structurel ; F : tests ciblés PASS / CI BLOCKED jusqu'à preuve ; A : NOT RUN.
- Taxonomie 249 sous-savoirs : réconciliation P2 ouverte. Performance mobile et multiplication des scripts : P2 ouverte.
- Les schémas sont 2D ; aucune animation temporelle ou scène 3D n'est revendiquée. La validation complète n'est pas acquise.

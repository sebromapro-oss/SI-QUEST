# SI QUEST V2.3 — Cycle 203–207 (27 octobre 2026)

HEAD initial : `3d629d1a5f4cbcedc7a1ad2c29e6853e43de224c` ; dépôt privé `main`.

## Nouvelles missions
- 203 : `beam-uniform-load-deflection-01` — Flèche maximale d'une poutre bi-appuyée sous charge répartie ; nominal 0.49603174603174605 mm.
- 204 : `hydraulic-fluid-stiffness-01` — Raideur de compression d'une chambre hydraulique ; nominal 35 MN/m.
- 205 : `motor-synchronous-speed-01` — Vitesse du champ tournant selon fréquence et paires de pôles ; nominal 1500 tr/min.
- 206 : `biot-number-plate-01` — Nombre de Biot d'une plaque soumise à convection ; nominal 0.02 sans unité.
- 207 : `basquin-fatigue-life-01` — Cycles à rupture selon une loi S–N fictive calibrée ; nominal 327680.00000000006 cycles.

## Corrections
- P2 graphique : `beam-defl-01`, vecteur d'effort supprimé à F = 0 N ; conservé si F > 0.
- P2 graphique : `belt-speed-01`, flèche de déplacement supprimée à n = 0 tr/min ; conservée si n > 0.
- Non-régression ajoutée : `tests/batch203-207.test.cjs`.

## Preuves S/G/P/F/A
- 192 assertions ciblées PASS en JavaScript V8 isolé : contre-calculs indépendants, bornes, domaines invalides, SVG, unités, parcours DOM simulés, sauvegarde et non-régressions.
- S : PASS ciblé ; G : PASS SVG structurel, visuel NOT RUN ; P : PASS structurel, essai élève NOT RUN ; F : PASS DOM simulé, CI native BLOCKED ; A : NOT RUN manuel.
- Fichiers de tests Node créés, exécution native non confirmée ; GitHub Actions initial en échec sans étape (run 40443003729).
- Navigateur réel, NVDA, TalkBack, VoiceOver : NOT RUN. Aucune réception finale déclarée.

## Protection et limites
`index.html`, `src/style.css`, `src/home.js`, `assets/archipelago-cinematic.svg` non modifiés. Scènes 2D, pas de revendication 3D ou d'animation temporelle. Aucun ZIP, GitHub Pages ni changement de visibilité.

## Contre-audit du lot (correctif additionnel)
- P1 fonctionnel : le banc DOM 203–207 avait remplacé la liste des identifiants de nœuds au lieu de la liste des missions ; rétablie et testée.
- P2 graphique : tige du vérin tronquée à V = 10 L ; largeur maintenant bornée par x = 540 px. Test géométrique ajouté.

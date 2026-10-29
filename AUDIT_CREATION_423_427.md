# SI QUEST V2.3 — Registre 423–427
Date : 29 octobre 2026 ; dépôt privé, branche main.
SHA initial : `26ba4658161145e20ed562cc0ac7c3ba52b15427`.
Accueil, carte et navigation strictement protégés : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` inchangés.
## Production
- 423 — `conical-clutch-torque-01` : Embrayage conique — Couple transmissible ; nominal 115.91110 N·m.
- 424 — `accumulator-polytropic-work-01` : Accumulateur — Travail de détente du gaz ; nominal 33.94981 kJ.
- 425 — `triangular-beam-bending-stress-01` : Section triangulaire — Contrainte de flexion ; nominal 4.16667 MPa.
- 426 — `rc-lowpass-phase-01` : Filtre RC — Phase de sortie ; nominal -51.48811 °.
- 427 — `open-belt-wrap-angle-01` : Courroie ouverte — Angle d'enroulement ; nominal 156.92608 °.
## Audit historique et correction
- 36 missions 40–75 inspectées sur le SHA initial : 108/108 états calcul/SVG PASS, 72/72 rejets NaN/Infinity PASS, 36/36 questions flash PASS, en trois lots V8.
- P1 graphique corrigée : `rolling-torque-01`, force résistante équivalente représentée au centre de la roue, et non tangentiellement au sommet ; couple résistant représenté séparément. Test de non-régression actualisé.
## Contrôles et limites
- 55 contrôles V8 ciblés PASS : 15 contre-calculs indépendants, 15 SVG synchronisés, 20 entrées invalides et 5 SVG incohérents rejetés.
- Tests Node/CI et parcours DOM à confirmer sur le SHA final ; réception visuelle navigateur NOT RUN ; appareils et lecteurs NVDA/TalkBack/VoiceOver NOT RUN.
- Taxonomie P2 ouverte : cible 249 sous-savoirs, regroupement à réconcilier sans rattachements artificiels.
| Axe | Statut |
|---|---|
| S | PASS ciblé |
| G | PASS structurel ; visuel NOT RUN |
| P | PASS structurel |
| F | PASS V8 ciblé ; CI à vérifier |
| A | NOT RUN matériel/lecteurs d'écran |

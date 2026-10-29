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

## Contre-audit après publication du code — révision `1dcb529f96d1d571b21386f500942d95b2b52017`
- **PASS scientifique ciblé :** 6/6 tests V8 issus du fichier `tests/batch423-427.test.cjs` (5 missions + invariants et tangentes), et 55 contrôles directs avant commit. Trois états par modèle, 15 contre-calculs indépendants, 15 SVG synchronisés, 20 paramètres invalides rejetés et 5 résultats SVG volontairement désynchronisés rejetés.
- **PASS fonctionnel simulé :** 5/5 tests V8 issus du fichier `tests/batch423-427-flow.test.cjs`, avec les vrais contrôleur, modèles et pages. Contrôles des trois essais, trois aides, corrigé conditionnel, réussite, étoiles et sauvegarde simulée.
- **PASS historique structurel :** 36 missions 40–75, 108/108 états numériques/SVG, 72/72 rejets NaN/Infinity, 36/36 séries de trois questions flash. Une incohérence graphique P1 du roulement corrigée et son test mis à jour. Aucune réception scientifique indépendante exhaustive des 36 missions revendiquée.
- **PASS catalogue :** 427/427 identifiants uniques et pages existantes, 17/17 univers ; dépôt toujours privé, branche archive conservée ; quatre SHA d'accueil inchangés.
- **BLOCKED CI native :** quatre workflows du SHA de code ont échoué avant toute étape observable ; trois relances (Node, scientifique et qualité) ont également échoué. Job Node sans étapes, journal HTTP 404 `BlobNotFound`. Cause non attribuable au code avec ces preuves ; ne pas déclarer les tests Node exécutés.
- **NOT RUN :** inspection visuelle individuelle sur navigateur, tests réels Android/iPhone/Windows/Mac, NVDA, TalkBack, VoiceOver et zoom réel.
- **P2 taxonomie ouverte :** 259 libellés explicites distincts, 97 missions historiques sans sous-savoir explicite, pour une cible contractuelle de 249. Nécessité d'une taxonomie canonique sans fusion scientifique abusive. **427 intégrations ≠ 427 réceptions complètes.**

### Statuts de réception mis à jour
| Axe | Statut | Preuve |
|---|---|---|
| S | PASS ciblé | 6 tests et 55 contrôles V8, calculs indépendants sur 15 états |
| G | PASS structurel ; NOT RUN visuel | SVG paramétriques, géométrie des tangentes, correction du roulement |
| P | PASS ciblé | Trois questions flash, modèles, décisions fictives, aides et corrigés |
| F | PASS DOM simulé ; BLOCKED CI | 5 parcours simulés ; Node natif non attesté |
| A | NOT RUN matériel | Tests lecteurs d'écran, clavier réel et zoom non effectués |

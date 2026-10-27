# SI QUEST V2.3 — Cycle 283–287 — 27 octobre 2026

SHA initial : 5d0f2249ad80f5c059ca5edc12bdd843eb5519c5. Dépôt privé, main. Contrats V2.3, EXIGENCES, PRODUCTION, modèles, catalogue et tests consultés. Accueil, carte, CSS et scripts de navigation protégés.

## Chantier A
P2 graphique/physique : dans rolling-torque-01, l'effort résistant était dessiné verticalement au centre, contrairement à la force tangentielle du modèle C=FR. Correction par une force tangentielle au sommet orientée vers la gauche, longueur proportionnelle à F ; couple antihoraire opposé à la rotation horaire. Test de non-régression ajouté. Contrôle V8 exécuté sur les 36 missions historiques 40–75, en trois lots : 36 + 36 + 36 = **108/108 PASS** (bornes minimale, nominale et maximale ; calcul fini, présence du titre, de la description et des unités dans le SVG, absence de NaN/Infinity). Ce contrôle est structurel et ne remplace pas une inspection graphique réelle.

## Chantier B
- 283 radiation-net-power-01 — Rayonnement — Puissance nette échangée : 172.85786 W.
- 284 rc-series-phase-angle-01 — Circuit RC — Déphasage de l'impédance : -17.656787 °.
- 285 thinwall-cylinder-axial-stress-01 — Réservoir fermé — Contrainte longitudinale : 50.000000 MPa.
- 286 pneumatic-choked-flow-margin-01 — Buse pneumatique — Marge d'étranglement : 0.028281788 sans unité.
- 287 elastic-strain-energy-density-01 — Élasticité — Densité d'énergie de déformation : 25.000000 kJ/m³.

5 modèles distincts, 15 questions flash, cinq corrigés détaillés, hypothèses et décisions contextualisées, trois aides et essais via contrôleur mutualisé, SVG 2D paramétriques. Pas de 3D ni d'animation temporelle requise pour ces modèles stationnaires.

## Preuves S/G/P/F/A
- S : PASS ciblé V8, 25/25 contre-calculs sur cinq états, 20/20 invalides rejetés, 5/5 SVG désynchronisés rejetés.
- G : PASS structurel sur 25 SVG ; inspection visuelle navigateur NOT RUN.
- P : PASS structurel, 15 questions flash, 5 corrigés ; 5/5 parcours DOM simulés V8 PASS ; essai élève réel NOT RUN.
- F : 6/6 tests scientifiques Node réinterprétés en V8 avec adaptateurs PASS ; 5/5 parcours DOM simulés V8 PASS ; 287/287 identifiants de catalogue uniques, 17 univers. **CI native GitHub Actions BLOCKED** : quatre workflows en échec avant toute étape, jobs sans runner/steps visibles ; relances Node et scientifique en échec ; logs Node HTTP 404 BlobNotFound. DOM navigateur réel NOT RUN.
- A : tests matériels, zoom et NVDA/TalkBack/VoiceOver NOT RUN.

Statut des nouvelles missions : codées, tests V8 ciblés PASS, réception complète ouverte. Aucune publication publique, aucun ZIP ni changement de la page d'accueil.

## Publication et limites de réception
- SHA production : `fa7ca3c567ad14ba1f7269dd34b71190b5acec41` ; commit d'audit ultérieur sur `main`.
- Fichiers modifiés dans le cycle : 5 HTML, modèle `src/batch283-287.js`, catalogue, diagramme historique, 3 fichiers de tests et registre.
- La nouvelle page d'accueil (`index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg`) n'a pas été modifiée ; la branche archive reste intacte.
- G visuel NOT RUN ; A appareils/NVDA/TalkBack/VoiceOver NOT RUN ; CI native BLOCKED. Les missions ne sont pas déclarées validées.

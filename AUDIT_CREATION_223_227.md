# SI QUEST V2.3 — Cycle 223–227 — 27 octobre 2026
HEAD initial : `58bb9d0ce47e43d37d82f31f48c5242209e80053`. Référence : cahier des charges maître V2.3, exigences, production, catalogue et tests.
## Lot scientifique
- 223 : `sinusoidal-vibration-rms-01` — Accélération efficace d'une vibration harmonique de déplacement. Valeur nominale : 8,72358 m/s².
- 224 : `thick-cylinder-hoop-stress-01` — Contrainte de cerclage à l'alésage selon les équations de Lamé. Valeur nominale : 18,25641 MPa.
- 225 : `three-phase-neutral-imbalance-01` — Somme vectorielle de trois courants sinusoïdaux déphasés de 120°. Valeur nominale : 5,291503 A.
- 226 : `source-matched-load-power-01` — Adaptation résistive d'une charge à une source de Thévenin. Valeur nominale : 72 W.
- 227 : `couette-viscous-shear-01` — Force de cisaillement visqueux d'un écoulement de Couette plan. Valeur nominale : 3 N.
Modèles purs séparés des vues. Hypothèses, unités, limites, tolérances, décisions fictives et questions flash propres à chaque mission. SVG 2D stationnaires paramétriques, sans 3D ni animation temporelle revendiquée.
## Audit historique
- **P1 graphique** `incline-force-01` : à 90°, le sommet de la rampe sortait de la fenêtre SVG (y = −87 px) ; à 0°, le vecteur poids se terminait à y = 265 px (> 235 px). Correction : longueur de rampe limitée selon sinθ et longueur du vecteur poids bornée ; tests aux angles 0°, 30°, 60°, 90°.
- **P1 test** `tests/batch218-222.test.cjs` : une assertion figeait le catalogue à exactement 222 missions et bloquait les lots suivants. Assertion remplacée par un minimum historique ≥ 222.
- Accueil, carte, styles, scripts et assets protégés : aucun de ces fichiers n'est modifié.
## Preuves et limites
- Contre-calculs indépendants, cinq états par mission, quatre valeurs invalides, invariants et tests DOM simulés ajoutés dans `tests/batch223-227*.cjs`.
- S : PASS ciblé dans l'exécution V8 locale de génération ; G : PASS structurel, inspection visuelle NOT RUN ; P : PASS structurel, essai élève NOT RUN ; F : tests V8 ciblés PASS, Node CI à contrôler ; A : NOT RUN sur matériels et lecteurs d'écran.
- La CI GitHub Actions avait échoué avant toute étape sur les cycles précédents ; ce registre ne préjuge pas du résultat de la CI sur le nouveau SHA. Pas de preuve de navigateur réel, NVDA, TalkBack ou VoiceOver.
- Aucun ZIP, Pages, force push, suppression d'archive ou modification de visibilité.

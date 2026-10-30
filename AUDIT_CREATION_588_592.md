# SI QUEST V2.3 — Cycle 588–592

30 octobre 2026. HEAD initial `ee972906152a9550a876aa0f9ea1a2596e5bfdc4` ; dépôt privé, branche main.

## Nouvelles missions
- 588 `soderberg-fatigue-safety-01` — Fatigue — Sécurité selon Soderberg : 1.5384615 sans unité ; Contrainte moyenne de traction et amplitude alternée dans le critère de Soderberg.
- 589 `strain-half-bridge-output-01` — Jauges — Signal d'un demi-pont : 2.6250000 mV ; Tension de sortie linéarisée de deux jauges actives de signes opposés.
- 590 `thermal-contact-interface-resistance-01` — Contact thermique — Résistance d'interface : 0.040000000 K/W ; Résistance de contact à partir de la conductance surfacique et de l'aire.
- 591 `rc-lowpass-phase-lag-01` — Filtre RC — Retard de phase : 32.141908 ° ; Valeur absolue du déphasage d'un filtre RC passe-bas non chargé.
- 592 `copper-skin-depth-frequency-01` — Cuivre — Épaisseur de peau : 0.66006143 mm ; Profondeur de pénétration électromagnétique en régime sinusoïdal.

## Audit, anomalies et correctifs
- P1 graphique : `milling-cutting-speed-01`, vecteur de vitesse déplacé au point tangent droit de la fraise ; contre-audit géométrique ciblé PASS, test de régression créé.
- P2 pédagogique : `inductor-energy-01` déplacée de SI-09 (automatique) à SI-08 (électricité), dans catalogue et HTML ; test ajouté.
- P2 couverture historique : cinq configurations vérifiées en complément du premier jeu de métadonnées, sans suppression de tests existants.

## Tests exécutés dans V8 avant publication
- 15/15 calculs nominaux/bornes et références croisées PASS ; 15/15 SVG structurels et synchronisés PASS ; 30/30 cas invalides rejetés PASS.
- 15/15 calculs et SVG historiques complémentaires PASS ; géométrie du vecteur tangent PASS.
- Catalogue 592/592 IDs uniques ; 17/17 univers ; syntaxe JS/CJS ciblée PASS.
- Tests Node natifs NOT RUN ; CI à contrôler après publication ; navigateur, matériel, NVDA/TalkBack/VoiceOver NOT RUN.

| Axe | Statut |
|---|---|
| S | PASS ciblé ; réception exhaustive NOT RUN |
| G | PASS structurel ; visuel NOT RUN |
| P | PASS structurel ; parcours complet NOT RUN |
| F | PASS V8 ciblé ; CI à vérifier |
| A | NOT RUN |

Schémas 2D statiques, sans simulation 3D ni animation temporelle physique complète ; seuils de décision fictifs. Réconciliation des 249 sous-savoirs canoniques toujours ouverte.

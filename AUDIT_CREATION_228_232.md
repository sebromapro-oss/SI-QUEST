# SI QUEST V2.3 — Cycle 228–232 — 27 octobre 2026
HEAD initial : `3bf75468b6b641302e78f25aa8e23eb4dba35a63`.
## Nouvelles investigations
- 228 : `series-spring-stiffness-01` — Association en série de deux raideurs élastiques ; résultat nominal 26.666667 kN/m.
- 229 : `poisson-lateral-contraction-01` — Déformation transversale signée par effet de Poisson ; résultat nominal -5.1428571 µm.
- 230 : `differential-thermal-clearance-01` — Évolution d'un jeu par dilatation différentielle ; résultat nominal 0.15100000 mm.
- 231 : `three-phase-voltage-unbalance-01` — Taux de déséquilibre des tensions composées ; résultat nominal 2.5000000 %.
- 232 : `vibration-base-transmissibility-01` — Transmissibilité en déplacement d'un oscillateur amorti excité par la base ; résultat nominal 0.84107801 sans unité.
5 sous-savoirs distincts ; modèles purs, domaines contrôlés, 3 questions flash par mission, corrigés détaillés, SVG 2D et graphes paramétriques reliés aux modèles. Pas de 3D ni d'animation temporelle artificielle : les modèles étudiés sont statiques ou fréquentiels.
## Audit et corrections
- P1 fonctionnel de recette : `tests/batch223-227-flow.test.cjs` construisait ses nœuds DOM à partir des identifiants des missions et non des identifiants HTML ; `nodes.calc` était indéfini. Réparé.
- P1 non-régression : assertions de catalogue figées à 222 identifiants et exactement 227 missions dans les tests des lots 218–222 et 223–227. Réparées pour vérifier un minimum historique et l'unicité de la taille réelle.
- Missions 40–75 : 36 missions, 108 états nominal/bornes et SVG PASS en V8. Ne vaut pas expertise exhaustive des schémas.
## Preuves S/G/P/F/A
- S : PASS ciblé, 25 états et 20 entrées invalides ; G : PASS structurel, visuel NOT RUN ; P : questions et corrigés présents, essai élève NOT RUN ; F : V8 ciblé PASS, tests Node et DOM natifs NOT RUN ; A : lecteurs d'écran et matériels NOT RUN.
- Workflows du SHA initial : échecs avant toute étape observable ; journaux 404 BlobNotFound ; CI native BLOCKED.
- Accueil/carte/styles/scripts/assets non modifiés ; aucun ZIP, Pages, force push, ni suppression d'archive.

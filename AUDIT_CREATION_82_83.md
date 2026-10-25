# SI QUEST — Cycle 82–83 : création et audit correctif

26 octobre 2026 (cycle horaire). Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`. HEAD de départ : `2b4278f7b3821bd93a5cf2aefa1570361643faec`.

## A — Audit et correction

- Mission existante `spring-stiffness-01` (lot 40–75) : son schéma était légendé « Ressort comprimé » alors que le modèle calcule une raideur par la valeur absolue de l'effort et de la déformation, sans imposer compression ou traction. Légende corrigée en « Ressort sollicité axialement » ; test de non-régression ajouté.
- Contrôle structurel : le test du lot 80–81 imposait exactement 81 missions et aurait échoué dès la création de la mission 82. Il contrôle désormais un minimum de 81 et l'unicité de l'intégralité du catalogue.
- Audit partiel ciblé, non une validation scientifique et visuelle exhaustive des 36 missions 40–75.

## B — Créations

- **82 — `torsion-angle-01`, SI-04** : angle élastique d'un arbre plein, `Jp = πd⁴/32`, `θ = TL/(GJp)`. Couple initial 250 N·m, L = 1,20 m, d = 40 mm, G = 80 GPa. Résultat calculé par le modèle : **0.85490°**. Seuil fictif 1,00°. Diagramme 2D paramétrique avec angle visuellement amplifié et avertissement explicite.
- **83 — `hydro-motor-torque-01`, SI-06** : couple utile d'un moteur hydraulique, `Cu = ηm Δp Vg/(2π)`. Δp initiale 150 bar, Vg = 80 cm³/tr, ηm = 0,90. Résultat du modèle : **171.89 N·m**. Seuil fictif 160 N·m. Diagramme 2D et courbe paramétriques.

## Traçabilité de recette

- **S (scientifique)** : contre-calculs indépendants, 3 points par mission, conversion d'unités, seuils et valeurs négatives couverts par `tests/batch82-83.test.cjs`. Exécution Node et workflows : à confirmer après commit.
- **G (graphique)** : SVG 2D, unités, schémas dépendant du paramètre et graphique synchronisé via moteur partagé ; rendu sur navigateur réel non vérifié, scènes 3D non livrées.
- **P (pédagogique)** : situations professionnelles, objectifs, prérequis, décisions et corrigés rédigés ; réception avec élèves non réalisée.
- **F (fonctionnel)** : 83 entrées attendues, intégration au moteur de missions et tests de structure ; tests réels navigateur non effectués.
- **A (accessibilité)** : structure HTML avec titres, labels, aria-live et descriptions SVG ; tests NVDA, TalkBack, VoiceOver, clavier et zoom réels non effectués.

Aucune publication GitHub Pages, aucun changement d'accueil, carte, visibilité ou branche d'archive. **Ne pas déclarer la recette finale acquise sans tests réels.**

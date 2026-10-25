# Cycle 14 — Animation et tolérances
- Accueil et carte inchangés.
- Correction de la boucle d'animation : les calculs saisis (et non les contrôles cachés) alimentent les quatre simulations ; les paramètres de l'essai sont figés pendant sa lecture.
- Gravity Run : lancement autorisé avec trois valeurs numériques valides, même erronées. L'animation représente la distance calculée à partir de la force motrice saisie.
- Tolérances de vérification des calculs du rover élargies : ±0,075 m/s², ±18 N, ±22 N. Elles ne modifient pas les contraintes physiques de réussite de la mission.
- Hydraulique : la course illustrative n'est plus liée au critère de réussite (surpression incluse), mais à la capacité de soulever la charge. Le débit n'étant pas modélisé, la vitesse et la course ne sont pas prédictives.
- Tests : 16 tests unitaires réussis ; contrôle syntaxique JS réussi. Essai Playwright Chromium impossible : net::ERR_BLOCKED_BY_ADMINISTRATOR. Aucune validation visuelle ou matérielle.
- Déploiement : aucun.

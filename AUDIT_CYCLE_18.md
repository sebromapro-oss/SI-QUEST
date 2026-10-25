# SI QUEST — Cycle 18 — Correctifs scientifiques

## Modifications
- Rover : décélération et arrêt avant la fin de l'essai traités par une loi par morceaux ; aucune vitesse physique négative après arrêt ; position et chronogrammes adaptés.
- Engrenages : nombre de dents strictement entier, vitesse algébrique et valeur absolue distinctes.
- Hydraulique : pression nulle acceptée pour un essai infructueux ; effort statique correctement calculé.
- Explications : plusieurs constantes de calcul remplacées par les données du niveau.
- Accueil et carte : inchangés.

## Tests réalisés
- `node --test tests/*.test.cjs` : 18/18 réussis, dont deux nouveaux tests limites.
- `python tests/check_static.py` : OK.
- `node --check src/game.js` et `src/physics.js` : OK.

## Non validé
- Pas de recette visuelle dans un navigateur, ni d'essais matériels Android/iPhone/Windows/Mac.
- Les animations hydrauliques restent illustratives : aucun débit, aucune vitesse réelle de tige ni transitoire de pression modélisés.
- L'animation du bras de levage reste une représentation statique et nécessite une vraie cinématique de basculement.
- Les tests de DOM, d'interaction clavier et de lecteur d'écran restent à faire.
- Quatre niveaux codés ; aucun niveau supplémentaire créé dans ce cycle.

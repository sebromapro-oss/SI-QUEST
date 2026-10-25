# Cycle 17 — correctif ciblé
- Gear Forge : vitesse affichée en valeur absolue et sens inverse explicité ; calcul algébrique interne conservé.
- Hydro Flow : indicateur de mise en pression animé pendant l'essai, y compris quand la charge ne bouge pas. Déplacement de la charge seulement si F_disponible >= F_charge. La course est illustrative, sans modélisation de débit.
- Boucle graphique : dernière image conservée à la fin de l'essai.
- Accueil non modifié.
- Contrôles : node --check src/game.js et 16 tests unitaires (16 réussis).
- Non effectués : essais navigateurs réels, Android/iPhone, tests lecteur d'écran. Ne pas déployer sans recette.

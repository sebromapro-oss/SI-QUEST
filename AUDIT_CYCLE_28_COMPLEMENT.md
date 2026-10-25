# Cycle 28 — Contrôles indépendants complémentaires

Date : 25 octobre 2026. Branche : `main`.

## Base préservée
Le dépôt comportait déjà les missions `hose-01` et `torsion-01` et annonçait 12 missions. Les fichiers de jeu existants, l'accueil et la carte n'ont pas été remplacés.

## Ajout vérifiable
`tests/cycle28_engineering_invariants.test.cjs` : neuf tests Node natifs indépendants des critères de victoire du jeu.

- Flexible : continuité Q = vA, décomposition des pertes, conversion bar/Pa, puissance hydraulique dissipée, linéarité des pertes réparties avec la longueur, rôle des singularités, rejet de paramètres invalides.
- Arbre circulaire plein : J = πd⁴/32, cohérence contrainte/angle/masse, effets de la variation du couple, du diamètre et de la longueur, rejet des paramètres invalides.

Les invariants contrôlent des relations analytiques plutôt que de comparer seulement un résultat à une constante produite par le même moteur.

## Exécution à vérifier
```sh
node --test tests/cycle28_engineering_invariants.test.cjs
node --test tests/*.test.cjs
```

**État de recette :** fichier de tests effectivement commité sur GitHub ; aucune exécution CI ni résultat de ces neuf tests vérifiés au moment de cette rédaction. Ne pas convertir l'ajout de tests en déclaration de validation. Essais matériels, lecteur d'écran et PWA restent à démontrer.

Aucun ZIP n'a été utilisé pour le transfert, aucune publication GitHub Pages n'a été déclenchée.

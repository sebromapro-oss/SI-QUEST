# SI QUEST — cycle 28 — 25 octobre 2026

## Réalisation locale vérifiée

Deux nouvelles missions scientifiquement distinctes ont été développées dans l'archive de travail, non encore importée ici :

- `hose-01` (SI-06) : Darcy–Weisbach, Reynolds, pertes réparties et singulières, coût du flexible, décision de mise en service.
- `torsion-01` (SI-11) : moment quadratique polaire, contrainte de cisaillement, angle de torsion et masse de l'arbre.

**Compteurs locaux** : 12 missions indépendantes, 10 univers couverts, 12 sous-savoirs, 984 missions restant à développer.

**Preuves locales** : 99/99 tests Node ; 2 nouvelles missions vérifiées sous Chromium headless à 1440, 390 et 320 px (6 parcours) ; non-régression DOM des missions antérieures sur les trois résolutions. Les vérifications navigateur sont faites sur ressources locales injectées, pas sur le site GitHub ni sur de vrais appareils.

## Synchronisation GitHub

**Non synchronisé** : les fichiers `src/`, `index.html`, `play.html`, `assets/`, `tests/` et la PWA ne sont pas encore présents dans ce dépôt. Les commits de documentation ne constituent pas une livraison jouable. Aucune publication Pages.

La prochaine étape est l'import du code source complet, suivi d'un commit vérifié et d'une recette sur le dépôt réel.

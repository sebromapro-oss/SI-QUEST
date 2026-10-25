# SI QUEST — qualité du cycle 28 (25 octobre 2026)

**12 niveaux distincts / 996**, **12 sous-savoirs / 249**, **10 univers jouables / 17**.

## Nouveautés

- `hose-01` : débit, Reynolds, facteur de Darcy, pertes réparties/singulières, puissance dissipée, coût.
- `torsion-01` : moment quadratique polaire, contrainte de cisaillement, angle de torsion, masse.

## Contrôles

**Dans GitHub Actions :** 8/8 tests scientifiques du cycle 28 réussis, vérification syntaxique JavaScript et cohérence des 12 solutions guidées. Workflow `SI QUEST scientific quality` terminé avec succès le 25 octobre 2026.

**Dans l'environnement de travail local :** 99/99 tests Node, 6 parcours DOM sur 1440/390/320 px pour les nouveaux niveaux, non-régression DOM sur trois tailles, 2 contrôles d'animation synchronisée, 13/13 ressources HTTP.

Ces deux ensembles de résultats ne sont pas interchangeables : les 99 tests locaux ne sont pas tous présents dans GitHub.

## Réserves

Pas de test matériel Android/iPhone/Windows/Mac, pas de test manuel NVDA/TalkBack/VoiceOver, pas de preuve de conformité WCAG/RGAA exhaustive. Tests DOM réalisés avec Chromium headless et ressources injectées. PWA offline et Safari non vérifiés. Accueil et carte conservés ; correction de débordement horizontal à 320 px.

Dépôt privé ; aucune publication GitHub Pages.

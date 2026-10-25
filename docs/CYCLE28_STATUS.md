# SI QUEST — cycle 28 — 25 octobre 2026

## Livraison vérifiée sur GitHub privé

Le dépôt `sebromapro-oss/SI-QUEST` contient les fichiers source `src/`, `index.html`, `play.html`, `assets/`, `sw.js` et `manifest.webmanifest`. La source du cycle 27 a été importée depuis l'archive historique puis les modifications du cycle 28 ont été appliquées et vérifiées dans le dépôt.

**12 niveaux indépendants**, dont deux nouveaux : `hose-01` (pertes de charge du flexible) et `torsion-01` (arbre en torsion). **10 univers couverts / 17**, **12 sous-savoirs / 249**, cible **996 niveaux**.

## Contrôles

- GitHub Actions `Import SI QUEST source archive` : **réussi**, import privé et contrôle de cohérence de la version 27.
- GitHub Actions `Apply SI QUEST cycle 28` : **réussi**, patch SHA-256 vérifié, contrôle des sources et des deux modèles physiques, commit de code.
- GitHub Actions `SI QUEST scientific quality` : tests indépendants ajoutés au dépôt ; vérifier le statut du dernier lancement avant de conclure.
- Localement : **99/99 tests Node**, **6 parcours DOM** des deux nouveaux niveaux sur trois tailles, **3 non-régressions navigateur**, **2 animations synchronisées**, **13 ressources HTTP**.

Les résultats locaux ne sont pas des preuves de tests sur appareils réels ou avec lecteurs d'écran. Aucun GitHub Pages public n'a été activé.

## Prochaine étape

Développer directement sur les fichiers versionnés dans GitHub ; commits atomiques, tests automatiques, correctifs avant élargissement des lots. Exclure les ZIP et les captures volumineuses des commits ordinaires.

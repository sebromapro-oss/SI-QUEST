# SI QUEST — jeu scientifique de sciences industrielles

**État contrôlé au 30 octobre 2026.** Application statique HTML/CSS/JavaScript, dépôt GitHub public `sebromapro-oss/SI-QUEST`, branche de développement `main`.

## Périmètre réel et cible

- **597 missions référencées** dans `src/catalog.js` ; 17 univers. Une entrée au catalogue n'est pas une validation pédagogique, scientifique ou d'accessibilité.
- **Cible : 996 missions indépendantes et 249 sous-savoirs**, répartis entre 17 univers.
- **Phase 1 active : fiabilisation et réception des 597 missions existantes.** Aucune nouvelle mission tant que les critères de stabilisation ne sont pas satisfaits.
- **Phase 2 : missions 598 à 996**, seulement après validation documentée de la phase 1.

## Contrôles réellement exécutés

Au commit `bb819cc92fd217fef7c684175193e6bb05e878d4`, les trois workflows Node/science ont réussi : **1 821 tests réussis, 0 échec**. Ils vérifient notamment la syntaxe, les calculs, des domaines numériques, le catalogue et des parcours DOM simulés.

Au commit `0a22774140d9e96878f1199905796cec32b8c0de`, la recette Playwright de l'accueil a réussi **16/16 scénarios** (bureau, émulations Android et iPhone portrait, tablette paysage). Il s'agit d'émulations Chromium, pas d'essais sur des appareils physiques.

**Non prouvé :** tests manuels sur smartphones, NVDA/TalkBack/VoiceOver, recette visuelle et scientifique individuelle des 597 missions, audit de sécurité exhaustif. Aucun de ces points n'est réputé validé par les seuls tests CI.

## Démarrage et tests

Ouvrir `index.html` via un serveur HTTP statique. Vérifier les pages depuis le catalogue. Pour les tests locaux :

```sh
node --test tests/*.test.cjs
find src -name '*.js' -print0 | xargs -0 -n1 node --check
```

Les workflows `.github/workflows/` exécutent les recettes GitHub Actions. La recette Playwright de l'accueil utilise un workflow séparé.

## Contrat de qualité et reprise

Lire `CAHIER_DES_CHARGES_MAITRE.md`, `EXIGENCES.md`, `PRODUCTION.md` et `SUIVI_REPRISE_V2_4.md`.

Le corrigé d'une mission nécessite **trois réponses incorrectes et trois aides effectivement consultées**. La consultation du corrigé ne vaut pas maîtrise. Les calculs et les décisions métier restent distincts ; les seuils pédagogiques fictifs ne remplacent pas les exigences constructeur.

L'accueil immersif existant, ses assets et ses liens sont à préserver. Les correctifs doivent être ciblés, testés et tracés.

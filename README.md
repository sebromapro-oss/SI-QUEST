# SI QUEST — jeu scientifique de sciences industrielles

**État contrôlé au 31 octobre 2026.** Application statique HTML/CSS/JavaScript, dépôt GitHub public `sebromapro-oss/SI-QUEST`, branche de développement `main`.

## Périmètre réel et cible

- **612 missions référencées** dans `src/catalog.js` ; 17 univers. Une entrée au catalogue n'est pas une validation pédagogique, scientifique ou d'accessibilité.
- **Cible : 996 missions indépendantes et 249 sous-savoirs**, répartis entre 17 univers.
- **Fiabilisation prioritaire des 597 missions historiques** : tests scientifiques, parcours, accessibilité et sécurité, sans annoncer une réception exhaustive.
- **Extension autorisée par consigne utilisateur du 31 octobre** : 15 missions ajoutées (598–612), chacune avec modèle, corrigé et tests. La publication n'est pas une réception complète. Il reste **384 missions à créer** pour atteindre 996.

## Contrôles réellement exécutés

Sur le commit `58f4ef97b6b36d86dd54a2a61ecc3365880f9ec1`, les trois workflows Node/science ont réussi : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41237775601), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41237775610), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41237775618). Ils contrôlent syntaxe, calculs, domaines numériques, catalogue et parcours DOM simulés. Le nouveau lot de **75 oracles indépendants sur 25 missions historiques** a été publié ensuite au commit `9d69692f` ; sa CI est à vérifier séparément.

La recette Playwright inclut désormais les missions 598–612 et les parcours bureau/Android émulé ; **le résultat du nouveau HEAD reste à confirmer**. Les anciennes recettes Chromium ne remplacent pas des essais sur appareils physiques.

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

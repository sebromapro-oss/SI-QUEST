# SI QUEST — reconstruction scientifique

**Cycle 02 (25 octobre 2026).** Jeu statique HTML/CSS/JavaScript, sans backend, dépôt GitHub privé. Le cycle 28 antérieur est archivé sur `archive/pre-reconstruction-cycle28-20261025` ; la reconstruction active est sur `main`.

## Missions réellement disponibles : 2

- **Cycle 01 — Gear Forge** (`gear-01`, SI-05) : rapport d'engrenages extérieurs, vitesse signée, couple et rendement.
- **Cycle 02 — Hydro Lift** (`hydro-01`, SI-06) : vérin double effet, surfaces, pression minimale, vitesses sortie/rentrée, réserve d'effort et interverrouillage de sécurité.

Les cibles de **17 univers, 249 sous-savoirs et 996 niveaux** ne sont pas des réalisations acquises. Le catalogue n'inclut que les missions implémentées.

## Validation et exécution

Ouvrir `index.html` localement ou via un serveur HTTP statique. Aucune publication GitHub Pages publique n'est activée.

```sh
node --test tests/*.test.cjs
find src -name '*.js' -print0 | xargs -0 -n1 node --check
```

Un workflow GitHub Actions sur `main` exécute les tests scientifiques et de structure. La présence du workflow ne constitue **pas** une preuve de réussite tant que son exécution n'a pas été vérifiée.

## Exigences non négociables

- Calculs de l'élève vérifiés avec tolérances annoncées, indépendamment de la conformité opérationnelle.
- Physique en unités SI, hypothèses, conversions, limites et cas particuliers testés.
- Scénario professionnel, simulation issue du modèle, décision métier, indices et corrigé sous conditions.
- Sauvegarde locale, clavier/tactile, réduction du mouvement, textes alternatifs.
- Tests matériels Android/iPhone/Windows/Mac et lecteurs d'écran : **non encore réalisés** ; aucune conformité RGAA/WCAG totale n'est revendiquée.
- Pas d'archive ZIP comme moyen de déploiement ; modifications directement versionnées dans GitHub.

Consulter `EXIGENCES.md` pour le contrat de qualité complet.

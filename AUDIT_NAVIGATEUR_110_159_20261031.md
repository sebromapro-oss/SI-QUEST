# SI QUEST V2.5 — Recette navigateur 110–159 et sept contre-calculs indépendants

Date : 31 octobre 2026. Dépôt `sebromapro-oss/SI-QUEST`, branche `main`.

## Périmètre et méthode

- HEAD de départ : `21fa3fee076ae128fd1fff1116360f1c9e2a2ac8`, trois workflows Node/science réussis et 2 196 tests automatisés.
- [Commit navigateur `0e1fc012`](https://github.com/sebromapro-oss/SI-QUEST/commit/0e1fc0121c04279ff0a4894712704014609ecaf0) : 50 missions supplémentaires distinctes, choisies par balayage déterministe du catalogue en excluant les 109 précédemment couvertes. Deux groupes de 25, bureau 1440×900 et Android **émulé** 390×844.
- Parcours : calcul volontairement erroné, exploration après erreur, variation du paramètre, absence de fuite `data-result`, contrôle des erreurs JavaScript, débordement horizontal, trois aides, trois essais et ouverture conditionnelle du corrigé.
- Contrôle clavier complémentaire : cinq missions sur deux viewports ; lien d'évitement au premier Tab, soumission par Entrée, exploration débloquée après réponse fausse, corrigé toujours masqué.
- **Couverture visée : 159/597** ; tant que le run Chromium n'est pas terminé avec succès, **couverture confirmée : 109/597**. Une exécution en cours ne constitue pas une preuve.

## Contre-calculs scientifiques

- [Tests ajoutés](https://github.com/sebromapro-oss/SI-QUEST/blob/main/tests/audit-browser-batch-110-159-seven-models.test.cjs) : sept modèles indépendants, chacun sur quatre points du domaine (bornes, milieu, nominal), soit 28 comparaisons de valeurs et sept vérifications de valeurs nominales HTML.
- Modèles : fiabilité parallèle, charge dynamique équivalente de roulement, fiabilité série, efficacité du rapport bêta, convection stationnaire, perte de pression laminaire dans un flexible et flèche de console.
- Les références appliquent les équations et conversions d'unités explicitement indiquées dans les missions ; les domaines non finis sont rejetés. **Ces sept contre-calculs ne constituent pas une contre-expertise scientifique des 50 missions du lot.**
- Échecs intermédiaires documentés : trois tests échouaient parce que le test importait seulement le moteur de base, puis un lot indépendant 593–597, qui ne contiennent pas ces trois modèles. Correction du banc de test : import de la chaîne `batch483-487.js` qui contient les modèles concernés et les moteurs antérieurs. Aucune formule de production ni assertion scientifique n'a été affaiblie.
- [Commit correctif `7ebd4d17`](https://github.com/sebromapro-oss/SI-QUEST/commit/7ebd4d175cdcb297bf6649f61c7011acd5357d67) : **2 204/2 204 tests Node réussis**, zéro échec, trois workflows réussis sur cette révision :
  [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177782306),
  [science](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177782313),
  [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177782369).

## État navigateur au moment de la rédaction

- [Run Chromium `41177603382`](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177603382) déclenché par le commit `0e1fc012` : **en cours** lors de la rédaction. Ne pas annoncer 159/597 ni 38/38 scénarios réussis avant le verdict du workflow.
- Les changements suivants portent uniquement sur des tests Node, sans modifier les pages ou contrôleurs exécutés dans Chromium.

## Réserves de réception

- Aucun essai sur smartphone ou tablette physiques, Firefox, Safari, NVDA, TalkBack ou VoiceOver ; le clavier est vérifié sur un échantillon, non sur tout le catalogue.
- Le SVG est testé structurellement, pas validé par contrôle géométrique humain ou par mesure de fidélité temporelle.
- Dépôt public, réponses attendues dans les HTML, progression locale non authentifiée ; audit complet de l'historique et des secrets restant à réaliser.
- Inventaire **597 missions**, aucune nouvelle mission. Accueil, carte des 17 univers, styles, marquage d'auteur, projets AppDeploy et budgets inchangés.
- **Phase 1 maintenue**, phase 2 suspendue. Prochaine action : récupérer le verdict Chromium et corriger tout échec ; ensuite étendre la recette à 25–50 missions supplémentaires non couvertes, puis tests réels d'accessibilité.


## Contre-réception Chromium confirmée — 31 octobre 2026, 08 h 51 locale

- Le [run Chromium 41177603382](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177603382) s'est terminé avec le statut **success** sur le commit de tests `0e1fc0121c04279ff0a4894712704014609ecaf0`.
- **38/38 scénarios Playwright réussis en 9,5 minutes**, sans échec. Les six nouveaux scénarios couvrent 50 missions supplémentaires (deux lots de 25 sur deux viewports) et cinq missions contrôlées au clavier sur chacun des deux viewports.
- **Couverture navigateur cumulée confirmée : 159/597 missions distinctes**, soit 26,6 %. Il reste **438 missions** à couvrir par ces parcours. La couverture des 159 missions signifie recette fonctionnelle échantillonnée par mission, **pas** validation scientifique, graphique ou RGAA individuelle complète.
- Les modifications postérieures au commit navigateur portent exclusivement sur les tests scientifiques et la documentation ; aucun contrôleur, HTML, CSS ou script navigateur n'a été modifié entre le run Chromium et ce bilan.
- Les trois workflows Node/science ont également réussi sur le HEAD de suivi `1a392e61a8500427462cf169a90a257ee9ba4122` : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177894375), [science](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177894408), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177894486), **2 204/2 204 tests**.
- **Décision : phase 1 maintenue** ; prochain lot de 25 à 50 missions encore non couvertes, avec contrôles clavier, puis recette réelle sur appareils et lecteurs d'écran.

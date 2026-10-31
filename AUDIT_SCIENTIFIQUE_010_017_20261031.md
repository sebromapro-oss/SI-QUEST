# SI QUEST V2.5 — contre-audit scientifique 10–17

**31 octobre 2026.** Base GitHub `main` : `9e554a0dc01b52e7eb83f9ee2c416d39a3ed2e2c`. Le SHA précédent est validé par trois workflows : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159362215), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159362127), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159362151), **2 160/2 160 tests réussis**.

## Lot 10–17

Huit missions historiques : translation uniforme, accélération constante, rotation, moment, pression, débit, puissance mécanique et loi d'Ohm. Le nouveau test `tests/audit-010-017-independent.test.cjs` confronte huit relations physiques indépendantes à quatre points de fonctionnement (32 contre-calculs), vérifie les unités, les limites numériques, la structure SVG et le catalogue. Ces contrôles ne sont pas déclarés réussis tant que la CI du nouveau commit n'est pas verte.

**Anomalie pédagogique :** huit missions sans questions flash HTML ou dynamiques. Ajout de trois questions spécifiques par mission (24 questions) au dictionnaire `earlyFlash`, qui couvre désormais 25 missions (10–34). Les 30 jeux `legacyFlash` et le mécanisme de trois essais/trois aides sont préservés.

## Réception et limites

- **Couverture documentaire : 10–597 = 588/597 (98,5 %)**, non assimilable à une réception scientifique exhaustive. Les missions 1–9 sont des scénarios spécialisés, à examiner séparément.
- 597 missions conservées, 0 créée. Aucun changement AppDeploy, accueil, 17 univers, navigation, assets ou visibilité GitHub.
- Le dépôt est public ; vigilance secrets et données privées. Aucun audit complet de sécurité ni test réel NVDA/TalkBack/VoiceOver, smartphone, animation temporelle ou géométrie visuelle n'a été réalisé.
- **Suite :** confirmer les trois CI du nouveau HEAD, corriger les régressions, auditer 1–9 et combler les politiques scientifiques/tolérances manquantes des premières missions.


## Confirmation CI

Le commit de code et de tests `cd202b5e45eddb65efdf232f10151464fc0569cd` a passé **2 169/2 169 tests**, trois workflows `success` : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159443407), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159443354), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159443435). Le commit documentaire qui complète ce rapport nécessite sa propre vérification.

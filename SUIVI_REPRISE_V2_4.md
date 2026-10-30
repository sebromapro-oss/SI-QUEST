# SI QUEST — État de reprise V2.4

**Date : 30 octobre 2026**  
**Dépôt :** `sebromapro-oss/SI-QUEST` — `main`  
**Phase active :** 1 — fiabilisation des 597 missions existantes.  
**Aucune mission 598+ créée pendant ce cycle.**

## Référence et preuves

- HEAD de départ du cycle : `d653d1be8290ea204d2b8e25ce6c61a8eff9cc92`.
- Référence de recette scientifique finale : `bb819cc92fd217fef7c684175193e6bb05e878d4`.
- Résultat de référence : **1 821 tests Node exécutés, 1 821 réussis, 0 échec**.
- Les trois workflows de recette Node/science ont réussi sur `bb819cc92f` :
  - [Recette automatisée SI QUEST](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41043956519)
  - [Contrôles scientifiques SI QUEST](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41043956520)
  - [SI QUEST scientific quality](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41043956501)
- [Recette Playwright de l'accueil](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41043898114) : **16/16 scénarios réussis**, sur `0a22774140d9e96878f1199905796cec32b8c0de` ; aucune modification ultérieure des fichiers de l'accueil.
- Ce document et le README sont une mise à jour documentaire postérieure à ces recettes ; ne pas considérer leur propre commit comme testé avant l'exécution CI correspondante.

## Causes racines traitées

1. **Tests de parcours obsolètes** : le contrôleur exige trois aides réellement consultées avant le corrigé ; 54 lots de tests et 45 parcours historiques simulent désormais les trois clics, avec contrôle du verrouillage.
2. **Référence de missions historiques instable** : trois tests utilisaient une tranche relative du catalogue (`slice(-75,-39)`) et interrogeaient des missions d'autres lots. Une liste explicite stable de 36 missions a été créée dans `tests/fixtures/historic-40-75.cjs`.
3. **Savoirs mal associés dans les métadonnées du lot 403–407** : intitulés remis en cohérence avec les phénomènes réellement calculés (énergie de rotation, convection, établissement RL, compensation capacitive et force hydrostatique).
4. **Attentes SVG historiques périmées** : les assertions vérifient les positions et les efforts réellement représentés, sans modifier les schémas de l'accueil.
5. **Tests de politique pédagogique contradictoires** : les anciens contrôles qui exigeaient le déverrouillage automatique des aides ont été remplacés par la vérification de leur consultation effective.
6. **Corrigé du lot 578–582** : test rendu insensible à la casse de « décision », sans diminuer les exigences de substitution, calcul et interprétation.

## Réception : état distinct des preuves

| Critère | État |
|---|---|
| Missions au catalogue | 597 identifiants référencés ; inventaire individuel à approfondir |
| Tests Node/science | 1 821/1 821 réussis sur `bb819cc92f` |
| Accueil Playwright (Chromium/émulations) | 16/16 réussis sur `0a22774140` |
| Tests Android/iPhone sur appareils physiques | Non réalisés |
| NVDA, TalkBack, VoiceOver | Non réalisés |
| Validation scientifique individuelle des 597 missions | Non démontrée |
| Recette graphique individuelle des missions | Non démontrée |
| Audit sécurité / exposition de données dans dépôt public | À compléter |
| Nouvelle production 598–996 | Suspendue jusqu'à réception phase 1 |

## Prochaine action du cycle suivant

1. Lire le nouveau HEAD distant et les trois derniers workflows ; ne pas réutiliser les chiffres précédents sans contrôle.
2. Contrôler la recette Playwright de l'accueil et examiner les captures archivées ; corriger toute anomalie prouvée.
3. Auditer les missions par lots sur des références scientifiques indépendantes, cas limites, cohérence SVG/animation, réponses et sauvegarde ; documenter les preuves mission par mission.
4. Vérifier la sécurité et l'absence de données privées dans le dépôt public.
5. Programmer et documenter les essais manuels matériels et lecteurs d'écran ; ne pas déclarer une conformité RGAA/WCAG non démontrée.
6. Maintenir la phase 1 tant que les preuves de réception restent incomplètes. Ne pas commencer 598–996 par simple succès des tests automatisés.

**Principe : publication et CI vertes ≠ réception scientifique, graphique, pédagogique et accessible.**

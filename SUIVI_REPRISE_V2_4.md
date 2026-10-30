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

## Cycle horaire du 30 octobre 2026 — audit ciblé 593–597

- **HEAD initial distant :** `16766cc316a7202d8528e57f1ce2c5cac959a26a` ; trois workflows Node/science réussis, **1 821/1 821 tests**, zéro échec.
- **Cause racine découverte :** erreur de rédaction du résultat radiatif de la mission `radiation-surface-ambient-01` : « ≈ 654 W » au lieu de **« ≈ 652,51 W »** ; moteur physique correct. Correctif : `533f368c36a9361bdaa641313faa7a0bd5cf9f8b`.
- **Non-régression ajoutée :** test de concordance numérique du corrigé avec un calcul indépendant, commit `14c7a89dfe1847bb08c502c953519913cb015b24`.
- **Preuves :** trois workflows réussis sur `14c7a89dfe`, **1 822/1 822 tests**, zéro échec : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41046639144), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41046639181), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41046639288).
- **Audit documenté :** `AUDIT_SCIENTIFIQUE_593_597_20261030.md`, cinq missions, trois points de calcul indépendant par mission, unités, propriétés et limites, commit `76ac1c6947c56b9f8e97e24b3463682cb3f201ac`.
- **Inventaire :** 597 fichiers HTML de missions ; aucune mission 598+ ajoutée ; fichiers d'accueil non modifiés.
- **Contrôle de sécurité préliminaire :** aucun chemin de fichier à nom évocateur de secret (.env, clé privée, identifiants, données d'élèves) détecté dans l'arbre HEAD ; ce contrôle **ne certifie pas** l'absence de secrets dans les contenus et l'historique Git.
- **HEAD documentaire :** le commit de cette mise à jour est postérieur aux preuves de tests ci-dessus. Vérifier les nouveaux workflows sur le HEAD final avant toute réception.
- **Suite :** auditer scientifiquement les autres lots et leurs corrigés rédigés ; tester la lisibilité des SVG et les interactions en navigateur réel ; auditer contenus et historique pour les secrets ; prévoir des tests manuels Android/iPhone, NVDA, TalkBack et VoiceOver. **Phase 1 maintenue.**

## Cycle V2.5 du 30 octobre 2026 — audit 568–592 et mouflage 4:1

- **HEAD initial distant :** `a3fe0cda883859bf5323ed725dd8d8b932459d25` ; 597 missions présentes ; trois workflows réussis et 1 822 tests Node réussis.
- **Lot audité :** 25 missions (`568–592`) ; 75 références indépendamment recalculées (minimum, nominal, maximum), 25 valeurs nominales comparées sans arrondi au résultat attendu, **25 concordances / 25**. Détails : [AUDIT_SCIENTIFIQUE_568_592_20261030.md](AUDIT_SCIENTIFIQUE_568_592_20261030.md).
- **Anomalie graphique confirmée :** le palan quatre brins ne représentait ni les poulies ni le cheminement du câble. Remplacé par un mouflage continu 4:1 à deux poulies fixes, deux mobiles, quatre efforts porteurs et un brin libre ; commit `266dc2681309c6c80ce3572238661c8f888859f1`.
- **Test de non-régression :** continuité du câble, nombre et nature des poulies, quatre forces et conservation `4T=mg` aux trois masses ; commit `5b9bb1ef32d35dbc26bcdc78ff25686eeddc65fb`.
- **Contrat pédagogique harmonisé :** `CAHIER_DES_CHARGES_MAITRE.md` explicite la consultation effective des trois aides avant corrigé, conformément à la règle V2.4/V2.5 et au contrôleur ; commit `0819153de690ac1aae8bf7c34d9df7a199a5d494`.
- **CI prouvée sur le commit de code/test `5b9bb1ef32` :** 1 823 tests, 1 823 réussis, 0 échec, trois workflows verts : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41053706020), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41053706231), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41053705995). Trois workflows également réussis après mise à jour du cahier sur `0819153de6` : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41053797329), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41053797852), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41053797316).
- **Audit documentaire :** `AUDIT_SCIENTIFIQUE_568_592_20261030.md` créé au commit `69a522e90937d0f6ce3d1909204a5ef00048308a`. Ce document n'est pas une recette visuelle.
- **Conservation :** aucune nouvelle mission ; aucun fichier de l'accueil, carte des 17 univers ou marquage d'auteur modifié ; aucune modification destructive de l'historique.
- **Limites :** les 25 résultats numériques et les tests SVG ne prouvent pas la réception graphique des 25 scènes. Essais sur appareils physiques, NVDA, TalkBack, VoiceOver, vérification RGAA/WCAG et audit complet des secrets dans l'historique non réalisés.
- **Prochaine action :** lire le HEAD final et ses workflows, inspecter visuellement le palan et les autres schémas, vérifier tolérances de saisie et précision, poursuivre sur 25 autres missions ; maintenir la phase 1 jusqu'aux preuves complémentaires.
- **HEAD documentaire final :** le commit contenant cette section est postérieur aux résultats cités ; vérifier sa CI avant toute conclusion.

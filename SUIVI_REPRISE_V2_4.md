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
- **Contrôle sécurité partiel du dépôt public :** recherche GitHub Code Search dans le contenu actuellement indexé : `PRIVATE KEY`, `sk-`, `@gmail.com`, `ghp_`, `AKIA`, `api_key`, `client_secret`, `RAEP` ; **0 résultat pour chacun de ces huit motifs** au 30/10/2026. Cette recherche ciblée ne garantit pas l'absence de données sensibles sous d'autres formes, dans des fichiers non indexés ou dans l'historique Git. Ne pas l'assimiler à un audit de sécurité exhaustif.
- **Limites :** les 25 résultats numériques et les tests SVG ne prouvent pas la réception graphique des 25 scènes. Essais sur appareils physiques, NVDA, TalkBack, VoiceOver, vérification RGAA/WCAG et audit complet des secrets dans l'historique non réalisés.
- **Prochaine action :** lire le HEAD final et ses workflows, inspecter visuellement le palan et les autres schémas, vérifier tolérances de saisie et précision, poursuivre sur 25 autres missions ; maintenir la phase 1 jusqu'aux preuves complémentaires.
- **HEAD documentaire final :** le commit contenant cette section est postérieur aux résultats cités ; vérifier sa CI avant toute conclusion.

### Complément du cycle V2.5 — proportions physiques et contre-tests

- **Trois discordances graphiques supplémentaires corrigées :** roulement BPFI (rapport bille/diamètre primitif), paroi cylindrique (rayons intérieur/extérieur à la même échelle), sonde coaxiale (rayons `a/b=2/5` et cotations depuis le centre). Commits de code `0e3dd66042`, `f6668e070e`, `2f57a125fa` ; commits de tests `3fc110f9de`, `3f7e7cac82`, `b855657499`. Détails et mesures dans [AUDIT_SCIENTIFIQUE_568_592_20261030.md](AUDIT_SCIENTIFIQUE_568_592_20261030.md).
- **CI vérifiée sur `b85565749953ee958bc6cf82382d654079814032` : 1 826 tests exécutés, 1 826 réussis, 0 échec ; 3 workflows réussis :** [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41054305297), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41054305132), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41054305218).
- **Aucune modification des fichiers d'accueil ni création de mission.** Quatre corrections SVG ciblées au total pendant le cycle, quatre nouveaux tests de non-régression ; nombre de tests passé de 1 822 à 1 826.
- **HEAD de référence testé :** `b855657499`. Les commits documentaires ultérieurs doivent être revérifiés sur leurs propres workflows ; ne pas les annoncer verts avant leur fin.

## Cycle V2.5 du 30 octobre 2026 — audit 543–567 et corrections scientifiques/SVG

- **HEAD initial :** `29182a1ccf213549783b855dfc22d9c50f2f3c2c`. Inventaire initial : **597** fichiers HTML de missions, aucun 598+ ; trois workflows scientifiques et fonctionnels verts au départ, **1 826/1 826** tests.
- **Périmètre scientifique :** 25 missions **543 à 567**. **75 valeurs de référence** recalculées séparément aux bornes et à l'état nominal, avec **25/25 résultats nominaux concordants** au champ `expected` (tolérance relative/absolue `10⁻⁹ × max(1, |valeur|)`). Rapport : [AUDIT_SCIENTIFIQUE_543_567_20261030.md](AUDIT_SCIENTIFIQUE_543_567_20261030.md).
- **Cinq anomalies corrigées :** arrondi du gazole `821,043` → **`821,042 kg/m³`** ; flèches de contraintes d'Inglis rendues verticales aux pointes ; suppression des fils passant à travers les blocs R/X du transformateur ; proportions et cotes de la plaque rectangulaire corrigées à la même échelle ; courbe PWM limitée aux sept TOP admissibles avec segments indicatifs.
- **Cinq nouveaux tests de non-régression :** arrondi du gazole, directions des contraintes d'Inglis, fils R/X, géométrie de la plaque et sept points PWM. **1 831 tests Node, 1 831 réussis, 0 échec** sur le commit de code/tests `8b3871928c00eea335f871c03353fba7702cf178`, trois workflows verts :
  - [Recette automatisée](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41061765373)
  - [Contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41061765698)
  - [Qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41061765472)
- **Document d'audit publié :** commit `69f83c9f74fa72e27989bb7d28249e48ee5bb77e`. Les workflows de ce commit documentaire doivent être consultés séparément ; le résultat ci-dessus est celui du commit de code/tests.
- **Préservation :** aucune modification de l'accueil, des 17 univers, des assets, des fichiers HTML de missions, ni de l'historique Git ; aucune nouvelle mission.
- **Limites :** les 75 calculs, tests Node et assertions SVG ne remplacent pas l'inspection visuelle sur navigateurs, les tests matériels Android/iPhone, ni NVDA/TalkBack/VoiceOver. Audit de sécurité des contenus et de l'historique non achevé. Aucun coût facturé ne peut être garanti par ces seules vérifications.
- **Prochaine action :** confirmer les trois workflows du HEAD documentaire final, inspecter visuellement les scènes corrigées, poursuivre les missions 518–542, préparer les tests matériels/lecteurs d'écran ; **phase 1 maintenue**.

## Cycle V2.5 du 30 octobre 2026 — audit 518–542, géométrie et rayons

- **HEAD initial :** `051964a9e40f6c8f896cfda64b453fadb3aaaaed` ; 597 missions existantes ; trois workflows verts, 1 831 tests au démarrage.
- **Audit :** 25 missions 518 à 542, cinq lots. 75 évaluations de référence hors moteur aux bornes et au nominal ; **25/25 valeurs nominales concordantes** avec les données `expected`. Détail et limites : [AUDIT_SCIENTIFIQUE_518_542_20261030.md](AUDIT_SCIENTIFIQUE_518_542_20261030.md).
- **Quatre corrections graphiques effectives :** mission 518 rapport bille/diamètre primitif du roulement (r=15 px au lieu de 10) ; mission 530 tirant conique à échelle radiale uniforme ; mission 541 épaisseur de tube à `e/D=0,05` ; mission 525 marqueurs de direction des rayons et normale pointillée, auparavant ignorés par le générateur de lignes SVG.
- **Quatre tests de non-régression ajoutés :** ratios et contacts du roulement, proportions du tirant sur trois paramètres, épaisseur du tube, deux flèches et pointillé de Snell. **1 835 tests exécutés, 1 835 réussis, 0 échec**, confirmé dans les journaux de la recette du commit `3fb92614` (documentaire). Les trois workflows sont réussis sur ce même SHA : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41070128677), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41070128790), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41070128409).
- **Commits de code et tests :** `acd45749`, `b1cab7fc`, `50f24630`, `a1a79f7f`, `dff58bed`, `f27358d9`, `8a96fd28`, `38938a97`. Rapport d'audit : `30674aac`.
- **Dernière CI déjà confirmée avant le quatrième test :** commit `f27358d9`, **1 834/1 834 tests réussis**, trois workflows verts : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41069797102), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41069797067), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41069797068). Les runs du commit `38938a97` doivent être confirmés séparément : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41069969021), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41069968710), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41069968664).
- **Préservation :** aucune mission créée ni supprimée, accueil utilisateur, 17 univers, assets et navigation non modifiés. Pas de force-push.
- **Visibilité constatée :** GitHub API retourne `visibility=public` et `private=false` pour le dépôt ; cela ne prouve pas l'absence de données sensibles. Aucun changement de visibilité réalisé ; vérifier l'absence de données privées dans les fichiers et l'historique.
- **Preuves manquantes :** recette visuelle navigateur de chaque scène, tests matériels Android/iPhone, NVDA/TalkBack/VoiceOver, audit RGAA complet, analyse de secrets exhaustive et validation scientifique individuelle de toutes les missions.
- **Prochaine action :** lire le HEAD final et les trois workflows ; inspecter visuellement les scènes corrigées et poursuivre l'audit 493–517. **Phase 1 maintenue ; aucune création 598+ tant que la réception n'est pas prouvée.**

## Cycle V2.5 du 30 octobre 2026 — audit 493–517 (en attente de CI)

- HEAD initial distant : `c2e18a480421284bf44fa822a69002a3e942d086`, trois workflows verts et 1 835/1 835 tests sur cette révision.
- Audit contradictoire ciblé : **25 missions**, **75 comparaisons min/nominal/max** et **25 champs expected HTML** concordants ; détails dans [AUDIT_SCIENTIFIQUE_493_517_20261030.md](AUDIT_SCIENTIFIQUE_493_517_20261030.md).
- Quatre corrections SVG : ondulation buck proportionnelle, ménisque à tangentes verticales et rayon à l'échelle, profondeur critique à échelle homogène, pistons du multiplicateur au rapport 40/25 ; quatre tests de non-régression ajoutés.
- **CI du commit de ce lot à vérifier après publication** : ne pas annoncer 1 839/1 839 avant lecture des workflows.
- Aucune mission ajoutée, aucun accueil modifié. Essais matériels et lecteurs d'écran non réalisés ; phase 1 maintenue.

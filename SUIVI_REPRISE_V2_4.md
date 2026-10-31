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

### Vérification CI du lot 493–517

- Commit de code/tests : `2961cb278c1e3762c171af3fcda7c0c55ea94a48` ; **1 839/1 839 tests Node réussis**, zéro échec, trois workflows réussis (et second ensemble réussi sur le même SHA).
- Preuves : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41078376876), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41078376940), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41078376977).
- 25 missions auditées (493–517), 4 corrections SVG, 4 tests supplémentaires ; pas de création de mission ni modification de l'accueil.
- **Prochaine priorité :** auditer les missions 468–492 ; vérifier les SVG des quatre corrections en navigateur et conserver les essais NVDA/TalkBack/VoiceOver et matériels en attente.
- Cette mise à jour documentaire est postérieure au SHA de code testé : consulter ses propres workflows avant de déclarer le HEAD final vert.


## Cycle V2.5 du 30 octobre 2026 — audit 468–492, quatre corrections SVG

- HEAD initial `74bd56ebbd9b01f6cc95ed13aee9a41a8e5f5679` ; trois workflows verts, **1 839/1 839** tests avant modification.
- **25 missions 468–492**, **75 contre-calculs indépendants**, **25/25 champs expected** concordants ; détails et valeurs dans [AUDIT_SCIENTIFIQUE_468_492_20261030.md](AUDIT_SCIENTIFIQUE_468_492_20261030.md).
- **Quatre correctifs SVG :** largeur du vantail triangulaire à l'échelle (470), clavette implantée sur la périphérie et hauteur portante cohérente (475), rampe maintenue dans le repère à toutes les bornes (480), rayons du liquide tournant au rapport 0,25 (481).
- **Quatre tests de non-régression ajoutés**. Objectif après commit : 1 843 tests ; **résultat de la nouvelle CI non encore connu au moment de cette entrée**. Consulter les trois workflows sur le nouveau SHA avant d'annoncer une réussite.
- Aucun changement de l'accueil, des 17 univers, des pages de mission ni des données privées. Pas de mission créée.
- Tests navigateur réels, appareils physiques, NVDA/TalkBack/VoiceOver, sécurité exhaustive du dépôt : non réalisés ; réception scientifique complète encore ouverte.
- **Suite :** vérifier CI sur le HEAD publié, puis audit 443–467 ; phase 1 maintenue.

## Cycle V2.5 — second lot 443–467 (30 octobre 2026)

- HEAD initial `b874914d535672d179e8d4dd1cf7ef9ec2f97dfc` ; **1 843/1 843 tests réussis** et trois workflows verts : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41081909839), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41081909909), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41081909858).
- **25 missions 443–467 auditées, 75 contre-calculs et 25/25 valeurs nominales HTML concordantes**. [Rapport détaillé](AUDIT_SCIENTIFIQUE_443_467_20261030.md).
- **Quatre corrections SVG** : coque sphérique 459, fuite annulaire 462, échelle PID 465, cerclage tangent 466 ; **quatre tests ajoutés**. CI du nouveau commit à vérifier, cible 1 847 tests.
- Accueil, 17 univers, pages de mission et données privées préservés ; aucune mission créée. Tests matériels/lecteurs d'écran et audit de sécurité exhaustif non réalisés. **Phase 1 maintenue** ; prochain lot 418–442.


### Contre-recette GitHub Actions — deux lots 443–492 (30 octobre 2026)

- **Commit final de code, tests et audits :** `84404d8c2a1c1ce2fba4e31274d8a1330e80bdb9` (parent : `b874914d535672d179e8d4dd1cf7ef9ec2f97dfc`).
- **CI vérifiée sur ce SHA : 1 847 tests Node, 1 847 réussis, 0 échec ; 3/3 workflows réussis** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41082458671), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41082458693), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41082458689).
- **Total du cycle : 50 missions 443–492**, 150 contre-calculs (min/nominal/max), 50 valeurs HTML `expected` concordantes, **8 anomalies graphiques corrigées, 8 tests de non-régression ajoutés**, aucune mission créée ; **597 missions conservées**.
- **Fichiers d'accueil et carte des 17 univers inchangés** : comparaison Git entre `74bd56ebbd` et `84404d8c2a1c` limitée à cinq modules SVG, cinq fichiers de tests, deux rapports d'audit et ce registre.
- **Limites** : aucun essai réel navigateur/mobile ni NVDA/TalkBack/VoiceOver ; sécurité du dépôt public et historique non audités exhaustivement. **Phase 1 maintenue** ; prochaine priorité missions **418–442**.
- Cette entrée documentaire est postérieure au SHA ci-dessus : vérifier ses trois workflows propres avant d'annoncer le HEAD documentaire vert.


## Cycle V2.5 du 30 octobre 2026 — audit 418–442, cinq corrections et 30 tests

- **HEAD initial :** `477b5e903864277cd42f4dd1b1a1634d18310722`, 597 missions présentes, **1 847/1 847 tests** et trois workflows verts avant modification.
- **Audit contradictoire :** **25 missions 418–442**, 75 évaluations min/nominal/max indépendantes **75/75 concordantes**, écart relatif pondéré maximal **3,17×10⁻¹⁶** ; rapport [AUDIT_SCIENTIFIQUE_418_442_20261030.md](AUDIT_SCIENTIFIQUE_418_442_20261030.md).
- **Cinq corrections SVG :** machine thermique de Carnot avec travail et bilan thermique (420), triangle de flexion à échelle unique (425), barre ESR sans intercept (431), flèches d'orifice proportionnelles au débit (432), flèche de puissance de condensation non saturée (437).
- **30 tests de non-régression supplémentaires :** 25 références indépendantes avec vérification HTML et domaines, cinq tests de géométrie/énergie. **Objectif CI : 1 877 tests**, non déclaré réussi avant confirmation des runs du commit de publication.
- **Protection :** accueil utilisateur, 17 univers, navigation, assets, HTML des missions et historique inchangés. Aucune nouvelle mission, aucune dépense demandée.
- **Preuves manquantes :** navigateur/mobile réel, NVDA/TalkBack/VoiceOver, audit RGAA, sécurité exhaustive, réception pédagogique. **Phase 1 maintenue**.
- **Prochaine action :** contrôler HEAD/3 workflows, corriger les échecs éventuels, auditer **393–417**.


## Cycle V2.5 du 30 octobre 2026 — second lot 393–417, trois corrections SVG

- **HEAD initial :** `8d4185fc426c761382dbb733fa943291e3b61a36` ; 597 missions, **1 877/1 877 tests** et trois workflows réussis sur ce SHA.
- **Audit numérique contradictoire :** **25 missions 393–417**, 75 calculs indépendants aux trois états **75/75 concordants** (écart relatif pondéré max **9,80×10⁻¹⁶**). Détails : [AUDIT_SCIENTIFIQUE_393_417_20261030.md](AUDIT_SCIENTIFIQUE_393_417_20261030.md).
- **Trois corrections graphiques :** circuit RC avec source/résistance et condensateur non court-circuité (393) ; épaisseurs bicouches à échelle unique (401) ; fibre moyenne et épaisseur du tube fermé de Bredt (415).
- **Trois tests de non-régression ajoutés.** Cible après publication : **1 880 tests** ; CI du nouveau commit **non encore vérifiée** à la rédaction.
- **Bilan cumulé du cycle : 50 missions 393–442, 150 contre-calculs, huit anomalies SVG corrigées, 33 tests ajoutés**, aucune mission créée. Les 597 missions, l'accueil et les 17 univers sont préservés.
- **Limites :** essais navigateur et matériels, NVDA/TalkBack/VoiceOver, RGAA complet, sécurité exhaustive et validation pédagogique non réalisés. **Phase 1 maintenue**.
- **Suite :** confirmer trois workflows du HEAD, corriger toute régression, puis auditer **368–392**.


### Contre-recette GitHub Actions des deux lots 393–442 — 30 octobre 2026

- **Commit final de code, tests et rapports :** `d786ca5689358982d269b69dffaddd5ace79ff6e` ; parent `8d4185fc426c761382dbb733fa943291e3b61a36`.
- **Résultat confirmé sur ce SHA : 1 880 tests Node, 1 880 réussis, 0 échec, 3/3 workflows réussis.** [Recette automatisée](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41088820627), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41088820599), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41088820761).
- **Cycle cumulé :** 50 missions 393–442, 150 contre-calculs indépendants min/nominal/max concordants, **8 corrections SVG**, **33 tests de non-régression ajoutés** ; 597 missions conservées, aucune nouvelle mission.
- **Préservation :** aucune modification de `index.html`, `src/home.js`, de la carte des 17 univers, des assets, des pages HTML de missions ou de l'historique ; aucun force-push.
- **Limites persistantes :** CI verte ≠ réception graphique en navigateur ; tests matériels, NVDA/TalkBack/VoiceOver, RGAA, sécurité exhaustive et essai pédagogique non réalisés. **Phase 1 maintenue** ; prochaine priorité **368–392**.
- **Note :** ce registre est un commit documentaire ultérieur ; ses propres workflows doivent être contrôlés avant de qualifier le HEAD documentaire final de vert.


## Cycle V2.5 du 30 octobre 2026 — 50 missions 343–392, cinq corrections physiques

- **HEAD de départ vérifié :** `26426b66778349d8000412413f6eae759958fc6b` (`main`), **597 missions**, 1 880/1 880 tests et trois workflows réussis.
- **Audit indépendant :** missions **343 à 392**, **50 modèles**, **150 évaluations** aux bornes minimum/nominal/maximum, **150/150 concordances** avec les modèles ; valeurs de référence nominales et unités documentées dans [AUDIT_SCIENTIFIQUE_343_367_20261030.md](AUDIT_SCIENTIFIQUE_343_367_20261030.md) et [AUDIT_SCIENTIFIQUE_368_392_20261030.md](AUDIT_SCIENTIFIQUE_368_392_20261030.md). La comparaison est un contrôle numérique sur les hypothèses des missions, pas une preuve d'exactitude physique universelle.
- **Cinq corrections graphiques publiées :** (358) restriction hydraulique laissant un passage libre ; (359) ailette 80×2 mm à échelle unique ; (389) résistance d'induit physiquement insérée dans le circuit de démarrage ; (391) suppression d'une fausse fuite externe sur pompe, écart de débit désormais non localisé ; (392) bras de levier du contrepoids à échelle uniforme 180 px/m.
- **Tests :** 57 nouveaux tests (25+5 sur 368–392, 25+2 sur 343–367). L'ancien test de pompe attendait la représentation erronée : le premier commit de correction `cbcb347986` a donc produit une CI rouge transitoire ; le test a été corrigé dans `b93d64fd07`, puis **1 910/1 910 tests** et trois workflows réussis sur `9a6585a006` ([recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097056763), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097056930), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097056732)).
- **Dernière CI confirmée sur code et tests :** commit `37041fc11466190edff0a8d7d34bb7e7fd0747d3` ; **1 937 tests Node exécutés, 1 937 réussis, 0 échec, trois workflows réussis** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097382964), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097382800), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41097382896).
- **Rapports créés :** commits `4a0ea0c13ceb541a531f9a698858d17d0617c799` et `91fcb94cd058996074610c11434e32d01c33987a`. Ces commits documentaires sont postérieurs à la CI du code et doivent être vérifiés séparément.
- **Protection et responsabilité :** aucune mission nouvelle ; les **597** existantes, accueil utilisateur, carte 17 univers, navigation, fichiers HTML et historique conservés ; aucun projet AppDeploy modifié.
- **Sécurité :** métadonnées GitHub consultées le 30/10/2026 : **visibilité réelle du dépôt = public**, contrairement au qualificatif « privé » du cahier des charges. Aucune modification de visibilité n'a été tentée. Le contenu et l'historique restent à auditer exhaustivement pour les secrets.
- **Réception incomplète :** pas de recette graphique visuelle sur navigateurs physiques, pas d'essais matériels Android/iPhone, NVDA, TalkBack, VoiceOver ; conformité RGAA/WCAG et impacts pédagogiques non prouvés. **Phase 1 maintenue**.
- **Prochain cycle :** vérifier le HEAD final et ses trois workflows ; auditer **318–342**, corriger et tester ; poursuivre vers 1–597. N'ouvrir la phase 2 (598–996) qu'après réception fondée sur preuves.
- **HEAD documentaire au moment de la rédaction :** `91fcb94cd058996074610c11434e32d01c33987a`. Le commit contenant cette entrée est ultérieur : vérifier ses propres workflows avant de le déclarer vert.



## Cycle V2.5 du 30 octobre 2026 — 50 missions 293–342, recette contradictoire et trois correctifs

- **HEAD initial vérifié :** `a42d15c096eb08ee0fc778c7159279c23fba9316` ; **597 missions**, **1 937/1 937 tests** et trois workflows réussis avant le cycle.
- **Lot 318–342 :** 25 modèles scientifiques indépendamment recalculés aux états min/nominal/max (**75/75 concordances**), 25 valeurs nominales HTML et 3 aides par mission vérifiées ; deux corrections SVG : diamètre de la section d'arbre n°319 ramené à l'échelle de la vue longitudinale, et ajout du rayon transmis acoustique n°341 à amplitude de pression `t=1+r`. **27 tests ajoutés**. [Rapport 318–342](AUDIT_SCIENTIFIQUE_318_342_20261030.md).
- **Incident CI documenté :** commit initial `d01540f004c57941a5d29e8be5aa3a4cbe7b04ca` en échec à cause de l'échappement du motif de lecture des attributs SVG dans le nouveau test. Corrigé au commit `25721f40c6c5fb5cf0abbf3676d3e3f1299be8b8` ; **1 964/1 964 tests** et **3/3 workflows** réussis : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41105951657), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41105951655), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41105951686).
- **Lot 293–317 :** 25 autres modèles recalculés aux trois états (**75/75 concordances**), 25 valeurs nominales HTML et 3 aides par mission vérifiées ; correction du vecteur de vitesse Pitot n°308 (pointe directionnelle), 28 tests supplémentaires dont trois contrôles géométriques. [Rapport 293–317](AUDIT_SCIENTIFIQUE_293_317_20261030.md).
- **Dernier SHA de code, tests et rapports vérifié :** `312fa972715d502fc01676bf520608360b6ea111` ; **1 992/1 992 tests Node réussis, 0 échec, 3/3 workflows réussis** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41106252704), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41106252759), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41106252693).
- **Bilan du cycle : 50 missions 293–342, 150/150 calculs concordants, trois anomalies SVG corrigées, 55 tests de non-régression ajoutés, 0 mission créée.** Les tests automatisés vérifient des hypothèses déclarées et ne démontrent pas la validité physique universelle.
- **Préservation et responsabilités :** comparaison Git depuis `a42d15c` limitée à trois modules de schémas, deux tests et deux rapports d'audit. Accueil utilisateur, carte 17 univers, HTML des missions, navigation, assets, données privées, historique et applications AppDeploy inchangés. Aucun force-push, aucune dépense.
- **Risques ouverts :** dépôt réellement **public** d'après l'API GitHub, malgré la mention « privé » ; aucune modification de visibilité. Audit exhaustif des secrets/historique non réalisé. Essais navigateur réel, mobile physique, NVDA/TalkBack/VoiceOver, RGAA/WCAG et validation pédagogique en situation non réalisés. **CI verte ≠ réception exhaustive ; phase 1 maintenue.**
- **Prochaine action :** vérifier les trois workflows sur le commit documentaire du présent registre ; poursuivre l'audit indépendant **268–292** (puis les lots suivants), corriger les causes racines et maintenir l'interdiction de créer les missions 598–996 avant réception fondée sur preuves.


## Cycle V2.5 — audit 268–292 (30 octobre 2026)

- HEAD initial `c4282bfbabcb66262f241b3776294f53509c42f5` ; 597 missions, 1 992/1 992 tests, trois workflows verts **avant** modification.
- **25 missions 268–292**, 75/75 contre-calculs V8 (minimum/milieu/maximum), [rapport](AUDIT_SCIENTIFIQUE_268_292_20261030.md).
- **Trois corrections SVG :** échelle P/Q/S (269), résistance interne batterie (270), chaîne série moteur CC (279).
- **28 tests Node nouveaux**, résultat CI du nouveau commit **à vérifier**. Aucun nouveau modèle ou mission ; accueil, 17 univers, HTML, AppDeploy, données privées et historique inchangés.
- **Risques ouverts :** dépôt public, contrôle secrets/historique incomplet, tests physiques navigateur/mobile et NVDA/TalkBack/VoiceOver non réalisés, RGAA et réception pédagogique non démontrés.
- **Prochaine action :** vérifier les trois workflows du SHA de publication, corriger toute régression, puis auditer **243–267**. Phase 1 maintenue.


### Contre-recette du lot 268–292

- Commit `74c46dd40cf52fa39db70f9c6322b96a61d5d6e1` : **2 020/2 020 tests Node réussis, 0 échec, 3/3 workflows réussis** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41113166242), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41113166416), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41113166238).

## Cycle V2.5 — audit 243–267 (30 octobre 2026)

- HEAD initial `74c46dd40cf52fa39db70f9c6322b96a61d5d6e1` ; 597 missions, **2 020/2 020 tests et 3/3 workflows verts** avant modification.
- **25 missions 243–267**, 75/75 contre-calculs V8 (minimum/milieu/maximum) ; [rapport](AUDIT_SCIENTIFIQUE_243_267_20261030.md).
- **Trois correctifs :** annotation de longueur des deux soudures (250), passage libre du tiroir d'étranglement hydraulique (255), fixation de l'amortisseur à la masse variable (264).
- **28 tests Node supplémentaires** ; CI du nouveau commit **à vérifier**, ne pas annoncer une réussite avant le résultat des workflows.
- Accueil, 17 univers, HTML, données privées, historique et AppDeploy inchangés ; aucune mission créée, aucun force-push ni dépense.
- **Limites :** dépôt public, sécurité exhaustive, navigateur/mobile physique, NVDA/TalkBack/VoiceOver, RGAA et réception pédagogique non réalisés. **Phase 1 maintenue.**
- **Prochaine action :** contrôler les workflows du SHA de publication, corriger toute régression et auditer **218–242**.


### Contre-recette finale du cycle 243–292 — 30 octobre 2026

- **SHA de code, tests et rapports validé** : `97d2cc7a3a94b69cb7b6cae982c3c781bc73cfb6` ; parent `74c46dd40cf52fa39db70f9c6322b96a61d5d6e1`.
- **2 048/2 048 tests Node réussis, 0 échec ; 3/3 workflows GitHub Actions réussis sur ce même SHA** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41113371926), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41113371849), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41113371771). Compte de tests confirmé dans les journaux du job Node `124261191286`.
- **Bilan cumulé de deux lots : 50 missions 243–292 auditées**, 150/150 contre-calculs V8 min/milieu/max concordants, **6 anomalies graphiques corrigées**, **56 tests de non-régression ajoutés**, aucune mission créée ; **597 missions conservées**.
- Audits récents continus : **243–597, soit 355/597 missions (59,5 %) couvertes par les contrôles numériques documentés**. Ce pourcentage n'est pas une réception globale.
- **Préservation :** seuls cinq modules de schémas, deux fichiers de tests, deux rapports d'audit et le registre ont été modifiés ; accueil utilisateur, carte des 17 univers, HTML des missions, assets, historique et AppDeploy inchangés.
- **Réserves persistantes :** tests réels navigateur/mobile, NVDA/TalkBack/VoiceOver, RGAA/WCAG complet, validation pédagogique et audit de secrets/historique non réalisés ; dépôt public. **Phase 1 maintenue.** Prochaine priorité : **218–242**.
- Cette entrée documentaire est postérieure au SHA de code testé ; vérifier les workflows du HEAD documentaire avant de le déclarer vert.


## Cycle V2.5 — audit 218–242 (30 octobre 2026)

- **HEAD de départ :** `afe89cbf307483b0f644f58eef38c7ce196adfab` ; 597 missions, 2 048/2 048 tests Node et trois workflows réussis sur le HEAD initial.
- **25 missions auditées :** 75/75 contre-calculs indépendants V8 aux bornes et au milieu du domaine (écart max 3,36×10⁻¹⁶) ; 25/25 configurations HTML nominales cohérentes ; SVG produits sans NaN/Infinity.
- **Cinq corrections graphiques :** 222 rapport géométrique des rayons, 226 continuité électrique du générateur, 227 profil Couette, 237 coaxialité transmission/roue, 241 ménisque mouillant tangent.
- **30 tests de non-régression ajoutés** dans `tests/audit-218-242-independent.test.cjs` ; voir [rapport](AUDIT_SCIENTIFIQUE_218_242_20261030.md). **CI sur le nouveau SHA à confirmer** ; aucun résultat non observé n'est revendiqué.
- **Périmètre :** aucune mission nouvelle, 597 conservées ; accueil, 17 univers, HTML, assets et AppDeploy non modifiés. Aucun force-push ni dépense.
- **Réserves :** dépôt public, audit secrets/historique incomplet ; navigateurs/appareils physiques, NVDA/TalkBack/VoiceOver, RGAA/WCAG et réception pédagogique non réalisés. **Phase 1 maintenue**.
- **Suite :** vérifier trois workflows du commit, corriger toute régression, auditer **193–217**.


## Cycle V2.5 — audit complémentaire 193–217 (30 octobre 2026)

- **SHA de départ du complément :** `1b958dc284279bfce58ea4b6c459741805d7cfec` ; les trois workflows de ce commit étaient encore **queued**, résultat final non revendiqué.
- **25 missions 193–217 contrôlées numériquement :** 75/75 contre-calculs V8 concordants (écart pondéré max 2,75×10⁻¹⁶), 25/25 configurations HTML nominales cohérentes, 75 SVG sans NaN/Infinity. Références algébriques déjà présentes dans les tests de lots historiques, donc indépendance limitée. [Rapport](AUDIT_SCIENTIFIQUE_193_217_20261030.md).
- **Aucune anomalie numérique ou graphique nouvelle démontrée**, aucune correction ni test supplémentaire pour ce sous-lot. **Bilan étendu du cycle : 50 missions 193–242 auditées, 5 corrections SVG et 30 tests Node ajoutés dans le premier sous-lot**.
- **Nouveau HEAD documentaire :** le commit contenant cette entrée est postérieur au SHA de code testé ; contrôler ses propres trois workflows avant de déclarer CI verte. 597 missions conservées, 0 mission créée, aucune modification AppDeploy.
- **Risques ouverts :** dépôt public, secrets/historique non audités exhaustivement, navigateurs et mobiles physiques, NVDA/TalkBack/VoiceOver, RGAA/WCAG et réception pédagogique non réalisés. **Phase 1 maintenue**.
- **Prochaine action :** vérifier CI et corriger toute régression ; auditer **168–192**.

## Cycle V2.5 du 30 octobre 2026 — correction des six échecs et contre-audit 168–192

- **HEAD initial de correction :** `cccc620b84dc00fb0d246a4ea4a151d10956448b`. Échec constaté dans les trois workflows : 2 072 réussites / 2 078 tests, **6 échecs** ; cause commune identifiée dans `tests/audit-218-242-independent.test.cjs` (borne supérieure `null` convertie en zéro par l'assertion).
- **Correctif réel :** [`8fc56a4d59f9a1652eb500f5f212372131865dbe`](https://github.com/sebromapro-oss/SI-QUEST/commit/8fc56a4d59f9a1652eb500f5f212372131865dbe), assertion respectant les bornes ouvertes. Aucun moteur, test ou seuil physique supprimé.
- **Recette confirmée sur ce SHA :** **2 078/2 078 tests réussis, zéro échec, trois workflows verts** : [science](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41122610517), [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41122610520), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41122610712).
- **Lot de 25 missions contre-audité :** 168–192, cinq fichiers de tests existants relus, cinq points par mission soit **125 points de référence couverts** par la CI ; document [AUDIT_SCIENTIFIQUE_168_192_20261030.md](AUDIT_SCIENTIFIQUE_168_192_20261030.md), commit `9cc2fa9a12f01ca1818ca2ce2ee0567597a3d2d9`. Aucun défaut nouveau confirmé par ces assertions, aucune mission ajoutée.
- **Couverture documentaire cumulée annoncée des audits récents :** 168–597, soit **430 missions / 597** ; cette couverture numérique et documentaire ne vaut pas réception scientifique et graphique exhaustive.
- **HEAD de ce document :** sera postérieur aux preuves CI sur `8fc56a4` ; vérifier les workflows sur le nouveau HEAD avant de le déclarer validé.
- **Blocages de réception :** visuel navigateur/écrans physiques, NVDA, TalkBack, VoiceOver, RGAA, pertinence pédagogique, sécurité et confidentialité du dépôt public.
- **Suite :** confirmer les trois workflows du HEAD documentaire, puis audit 143–167, corrections ciblées et preuves. Phase 1 uniquement ; aucun changement AppDeploy.

## Complément du même cycle — audit documentaire 143–167

- **25 missions supplémentaires revues** (143–167) : cinq lots de références mathématiques et contrôles d'homogénéité dimensionnelle, document [AUDIT_SCIENTIFIQUE_143_167_20261030.md](AUDIT_SCIENTIFIQUE_143_167_20261030.md), commit `65d1568d903a9a14f89d70007c48491af9f5283b`.
- **Total du cycle : 50 missions revues** (143–192), aucune nouvelle mission ni changement de moteur physique. **Couverture documentaire récente : 143–597, soit 455/597** ; les preuves de réception individuelle graphique et physique restent manquantes.
- **Dernier SHA de référence CI vert avant les commits documentaires :** `8fc56a4d59f9a1652eb500f5f212372131865dbe` ; 2 078/2 078 tests et 3/3 workflows. Les commits documentaires successifs exigent leurs propres runs avant déclaration de réussite sur le HEAD final.
- **Prochaine plage :** 118–142, en priorité aux défauts confirmés et à l'accessibilité ; ne pas créer les missions 598+.


## Cycle V2.5 — revue 118–142 et blocage animation après erreur (30 octobre 2026)

- **HEAD initial** `64cb69234e601989992da4065ae4faef15e3a332` ; sur ce SHA, **2 078/2 078 tests Node réussis, 0 échec, 3/3 workflows verts** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41130044964), [science](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41130045017), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41130045018). Journaux du job scientifique `124318338866` consultés.
- **25 missions 118–142** : revue des cinq suites de tests existantes et des références dimensionnelles, domaine et SVG ; [rapport de contre-audit](AUDIT_SCIENTIFIQUE_118_142_20261030.md), commit documentaire `3f39b692e7116cbf0eb153bfaab63b8fde517595`. **Couverture documentaire cumulée 118–597 : 480/597 (80,4 %)**, sans préjuger de la réception exhaustive.
- **Défaut transverse confirmé par lecture du contrôleur** : après une réponse valide erronée, `src/investigation-mission.js` maintient `unlocked=false`, désactive les simulations et masque les graphiques. **Exigence « animation même en cas d'erreur » non satisfaite**. Ne pas simplement rendre `preview()` accessible : il expose la réponse numérique au paramètre initial. Correction à concevoir avec séparation animation/valeur/corrigé et tests 3 essais/3 aides.
- **Aucun correctif de moteur ni nouvelle mission** dans ce cycle ; 597 conservées. Accueil, carte 17 univers, HTML des missions, navigation, assets, données privées et AppDeploy inchangés. Aucune dépense ni force-push.
- **Réserves ouvertes :** tests navigateurs/appareils physiques, NVDA/TalkBack/VoiceOver, RGAA, réception pédagogique, audit secrets/historique et dépôt public non résolus.
- **Prochaine action :** vérifier les 3 workflows sur le HEAD documentaire, traiter le défaut d'animation sans divulguer la réponse, puis poursuivre l'audit 93–117. Phase 1 maintenue.


### Complément du cycle V2.5 — revue 93–117

- **25 missions supplémentaires** (93–117), sept fichiers de tests existants relus ; références algébriques, unités, domaines et limites examinés. [Rapport](AUDIT_SCIENTIFIQUE_093_117_20261030.md), commit `9662dde40e663f091efd4ed3c59436ca4ac1624a`. **Bilan du cycle : 50 missions 93–142 revues, 0 mission créée, 0 correction de moteur.**
- **Couverture documentaire récente : 93–597, soit 505/597 (84,6 %)**. Cette métrique ne mesure pas la réception scientifique exhaustive ni les tests graphiques, physiques ou d'accessibilité.
- **Bloquant confirmé :** simulations verrouillées après réponse incorrecte dans `src/investigation-mission.js`. Une correction non naïve doit permettre l'animation tout en préservant la confidentialité de la réponse initiale et les trois essais/trois aides. Anomalie ouverte, non corrigée dans ce cycle.
- **SHA CI vert de référence au début du cycle :** `64cb69234e601989992da4065ae4faef15e3a332`, 2 078/2 078 tests et 3/3 workflows. Les commits documentaires ultérieurs doivent être revérifiés avant déclaration de réussite sur le HEAD.
- **Prochaine action :** contrôler les workflows du dernier SHA, corriger le contrôleur et écrire des tests comportementaux de non-divulgation, puis auditer 68–92. Maintenir phase 1 ; aucune modification AppDeploy.

## Cycle V2.5 — séparation exploration 3D et réponse numérique (31 octobre 2026)

- **HEAD initial distant :** `49e9a4e8a38b719686ca1bf80bc0911cb22946bd` ; trois workflows verts sur ce SHA : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41136273643), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41136273633), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41136273641).
- **Anomalie transversale traitée partiellement :** les scènes 3D existantes étaient verrouillées après une réponse incorrecte. Le contrôleur `src/investigation-mission.js` permet désormais l'exploration spatiale après un essai numérique valide, même incorrect, sans déverrouiller le graphe chiffré, l'essai décisionnel ou le corrigé.
- **Protection contre la divulgation :** `src/scene3d.js` dispose du mode `conceptOnly` qui remplace les notes chiffrées de la scène et de sa description accessible par une information qualitative. Le mode chiffré reste réservé à une réponse correcte ou au corrigé consulté après trois essais et trois aides.
- **Commits réels :** `d73b33e95f876a2f2f3674841050a297af60ef80` (scène 3D), `81b43d430750b530b7f638057a8685968a072564` (contrôleur), `01ff1e11fa154f4e5732ac484f1f6c326e587a60` (test anti-divulgation), `1cfaf0fb5e628788e4e209c2818d2f13a8780f07` (test du parcours après erreur).
- **Portée limitée :** 7 missions disposent d'une scène 3D, dont 4 scènes animées. Les autres missions et leurs schémas 2D nécessitent une architecture d'exploration physique sans divulgation, non réalisée dans ce cycle. Le correctif ne constitue pas une réception générale des animations.
- **Tests :** deux nouveaux tests de non-régression ont été ajoutés. Syntaxe JavaScript contrôlée avant publication. **CI sur le commit de code/test : en cours lors de cette rédaction**, ne pas annoncer les nouveaux tests réussis avant vérification des trois runs : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41142810523), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41142810547), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41142810535).
- **Inventaire :** 597 missions conservées, 0 mission créée. Aucun fichier d'accueil, navigation, assets, marquage d'auteur ou projet AppDeploy modifié ; pas de force-push.
- **Preuves manquantes :** essai physique de la cinématique, vérification des SVG sur navigateur et smartphone, NVDA/TalkBack/VoiceOver, RGAA/WCAG, réception pédagogique, audit secrets et historique Git. Dépôt toujours public à la dernière vérification.
- **Prochaine action :** confirmer les trois workflows du HEAD final, corriger toute régression, puis concevoir et tester l'exploration 2D non divulgatrice et auditer les missions 68–92. Maintenir la phase 1 ; ne pas produire les missions 598+.
- **SHA de ce registre :** son commit documentaire sera postérieur aux preuves de CI ci-dessus ; vérifier ses propres workflows avant réception.

### Complément du cycle — exploration qualitative 2D sans réponse (31 octobre 2026)

- **Extension fonctionnelle :** le contrôleur commun permet, après une tentative numérique valide mais erronée, de faire varier le paramètre de la mission et de mettre à jour son schéma 2D. Le graphe chiffré, les valeurs calculées, le verdict technique et le corrigé restent verrouillés jusqu'aux conditions habituelles. Le changement de paramètre n'est pas compté comme un nouvel essai de réponse.
- **Protection du SVG :** retrait des éléments textuels, descriptions, métadonnées, attributs `data-*` et `aria-*` de la sortie chiffrée ; ajout d'un titre et d'une description accessibles, strictement qualitatifs. Il s'agit d'une **exploration paramétrique**, pas d'une animation temporelle scientifiquement reçue.
- **Commits réels :** `97dc950797bc99e9c4d78375608c4565bee97f19` (contrôleur 2D), `3f0fbc6464db966e890b11887b8b2df15a72de60` (test ciblé), `1b9fd0ca31dd349f4a54330df41b1675f6045185` (test transversal de 45 missions historiques).
- **Contrôles ajoutés :** essai erroné, déverrouillage du seul paramètre d'exploration, non-divulgation des étiquettes et résultats SVG, maintien du verrouillage du graphe et du corrigé, réinitialisation ; test transversal sur 45 missions. Syntaxe JavaScript vérifiée avant publication.
- **CI :** trois workflows verts sur le commit documentaire précédent `8f6600c47153008f86baab31be70525ba613f4f4` : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41142873642), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41142873662), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41142873648). **Les commits 2D ci-dessus nécessitent leurs propres résultats CI avant réception.**
- **Limites :** aucune preuve de fidélité temporelle des animations 2D ; audit visuel, mobile, accessibilité réelle, sécurité et validation pédagogique toujours manquants. Ne pas confondre 45 contrôles de non-divulgation et 45 réceptions scientifiques indépendantes. Missions créées : **0** ; catalogue conservé : **597**.
- **Suite :** confirmer les workflows sur le nouveau HEAD, corriger toute régression, vérifier les animations temporelles et la lisibilité sur appareils réels, puis reprendre l'audit scientifique indépendant des missions 68–92.

### Rectification des tests du mode 2D (31 octobre 2026)

- **Régression CI observée :** 2 080/2 081 puis 2 081/2 082 tests réussis sur les commits de tests intermédiaires `3f0fbc64` et `1b9fd0ca`. Le seul échec venait du harnais DOM simulé : le test recherchait `technicalDecision` par `getElementById` alors que son faux DOM ne répertoriait pas l'élément créé dynamiquement. Aucun défaut scientifique de production n'a été établi par cet échec.
- **Correction ciblée du test, sans suppression d'assertion :** récupérer le paragraphe de verdict dans les enfants du conteneur où le contrôleur l'insère réellement. Commit `c59922071c8b616f4748eb9f416e31b883aff3eb`.
- **CI de ce commit :** [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143052478), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143052444), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143052283). **En cours à la rédaction** : consulter les conclusions et les journaux avant de déclarer le HEAD reçu.
- **Phase 1 maintenue.** Les tests simulés ne remplacent pas une inspection réelle du rendu 2D/3D ni les essais NVDA/TalkBack/VoiceOver.

### Clôture CI du correctif 2D/3D — résultats réellement observés

- **Code et tests sur `c59922071c8b616f4748eb9f416e31b883aff3eb` : 2 082 tests exécutés, 2 082 réussis, 0 échec** (journaux du job scientifique). Les trois workflows ont conclu `success` : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143052478), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143052444), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143052283).
- **Registre documentaire `6719ef9f` : 3/3 workflows `success`** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143097026), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143096990), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143097004).
- Les anciennes exécutions rouges sur `3f0fbc64`, `1b9fd0ca` et `7fb155a4` restent visibles dans l'historique : elles correspondent au faux échec du harnais DOM corrigé, et ne doivent pas être effacées ou masquées.
- **Reste ouvert :** réception scientifique individuelle des 597 missions, animation temporelle 2D, essais matériels et lecteurs d'écran, audit sécurité du dépôt public. **Phase 1**, zéro mission créée.
- **Ce commit documentaire est postérieur à ces résultats :** vérifier ses propres workflows avant d'annoncer sa validation.


### Cycle V2.5 — audit indépendant 68–92 et correction pédagogique 77 (31 octobre 2026)

- **HEAD initial distant :** `acbdbce41b26e9ba828c8dab5ccb443d70fb2165`. Trois workflows réussis sur cette révision : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143188044), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143187919), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41143187871) ; 2 082/2 082 tests selon les journaux précédents.
- **Lot traité :** 25 missions n° 68–92. Onze suites existantes examinées, configurations nominales et relations physiques confrontées à des références distinctes. [Rapport détaillé](AUDIT_SCIENTIFIQUE_068_092_20261031.md). **Couverture documentaire cumulée : 68–597 = 530/597 (88,8 %)**, non assimilable à une réception scientifique exhaustive.
- **Anomalie réelle et correction :** mission 77 `dc-voltage-drop-01` sans questions flash ; ajout de trois questions de réactivation, objectifs, prérequis et critères de réussite sans afficher la réponse. Commit `cb7f6ba5e2da0edf7299252b5de7a0d1dc44cecf`. Trois workflows **success** sur ce commit : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148502236), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148502212), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148502305).
- **Nouveaux contrôles :** `tests/audit-068-092-independent.test.cjs`, commit `6a7e77f9b506f7b7f5ea279beae67d3b79af3fda`. 25 sous-tests couvrant 100 points numériques, les unités, les pages, les SVG et les trois questions flash. **Statut à la rédaction : CI en cours, résultats non présumés** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148524657), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148524477), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148524621).
- **Commit documentaire du rapport :** `b8c4ef1731923963621450deb96435329b8f7f99` ; [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148553973), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148553932), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148553991), en attente à la rédaction.
- **Inventaire :** 597 missions conservées, 0 créée. Aucun accueil, carte des 17 univers, navigation, assets, historique ou AppDeploy modifié ; pas de force-push ni de dépense.
- **Réserves :** tests visuels sur appareils réels, animations temporelles, NVDA/TalkBack/VoiceOver, audit RGAA/WCAG, vérification sécurité/secrets et visibilité publique du dépôt. Les contrôles numériques ne constituent pas une réception globale.
- **Suite impérative :** consulter les trois CI du nouveau HEAD, corriger tout échec sans masquer les tests ; poursuivre par 43–67 et la recette réelle 2D/3D. Maintenir la phase 1 et la séparation de responsabilité avec SI FRANCE.
- **SHA du registre :** commit postérieur à `b8c4ef17` ; ses propres workflows devront être revérifiés avant de déclarer le HEAD reçu.


### Cycle V2.5 — contre-audit indépendant des missions 43–67 (31 octobre 2026)

- **HEAD initial distant :** `ed66827473f520c8495e903bd5ef1650f77ff623` ; trois workflows `success` : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148571971), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148571858), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41148572107).
- **Lot traité :** 25 missions n° 43–67, 25 relations physiques indépendantes, quatre points numériques par mission (100 points). Contrôles des unités SI, configurations, domaines, catalogue, SVG et trois questions flash. [Rapport détaillé](AUDIT_SCIENTIFIQUE_043_067_20261031.md). **Couverture documentaire cumulée 43–597 : 555/597 (93,0 %)**, sans présumer de réception exhaustive.
- **Code/test :** nouveau fichier `tests/audit-043-067-independent.test.cjs`. Commit `773ddfb9f11b03b532a03cbec89f37069cd47449` (première syntaxe du harnais incorrecte, trois CI en échec), puis correction de l'extraction de configuration `72d21b5c53a6f8deed1423cf010b7075a9e90187` (sans suppression d'assertions ni modification des moteurs).
- **Résultat CI vérifié sur `72d21b5c` : 2 134/2 134 tests réussis, 0 échec ; 3/3 workflows `success`.** [Recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41154571874), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41154571851), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41154571884). Le premier commit en échec demeure dans l'historique.
- **Rapport documentaire :** commit `114405d9ded63f813abb627807579b8ac30fd4b1` ; ses propres workflows sont à vérifier, sans déduire leur conclusion des tests du commit de code.
- **Inventaire :** 597 missions conservées, **0 mission créée**. Aucun accueil, carte des 17 univers, style, script de navigation, asset ou projet AppDeploy modifié ; aucun force-push ni dépense.
- **Réserves :** fidélité des animations temporelles, recette visuelle navigateur/mobile, NVDA/TalkBack/VoiceOver, RGAA/WCAG, réception pédagogique et audit secrets/historique toujours non prouvés. Le dépôt GitHub est **public** malgré l'exigence « privé » ; visibilité non modifiée. Aucun export personnel ou donnée privée ajouté.
- **Prochaine action :** confirmer les workflows du HEAD final, corriger toute régression, puis auditer 18–42 et traiter les lacunes d'accessibilité et d'animations en conditions réelles. **Phase 1 maintenue ; phase 2 non autorisée.**
- **SHA de ce registre :** le commit documentaire final est postérieur à `114405d9` ; revérifier ses propres trois workflows avant de déclarer le HEAD reçu.


### Cycle V2.5 — missions 18–42 et réactivation des 17 missions historiques (31 octobre 2026)

- **HEAD initial distant :** `d1f7dc33481ce19679a62b62d61ea470f3be45a3`. Trois workflows GitHub Actions `success` : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41154647306), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41154647226), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41154647284).
- **Audit :** missions 18–42 (25 missions), 25 formules de référence distinctes, 100 points numériques couverts par le nouveau test `tests/audit-018-042-independent.test.cjs` ; résultat **non présumé** avant CI. [Rapport](AUDIT_SCIENTIFIQUE_018_042_20261031.md).
- **Anomalie et correction :** 17 missions 18–34 sans questions flash dans HTML ou contrôleur ; 51 questions de réactivation ajoutées dans le contrôleur commun, sans modification des modèles scientifiques, des essais, aides, corrigés, accueil ou navigation. Les 30 jeux `legacyFlash` existants restent inchangés.
- **Catalogue :** 597 missions conservées, 0 créée. Couverture documentaire 18–597 = 580/597 (97,2 %) ; 1–17 à auditer. Aucun AppDeploy modifié, pas de force-push ni dépense intentionnelle.
- **CI nouveau commit :** à consulter après publication ; vérifier tests pass/fail et les trois workflows. **Pas de réception déclarée sans preuve.**
- **Réserves :** fidélité temporelle des animations, rendu navigateur/mobile, tests physiques NVDA/TalkBack/VoiceOver, RGAA/WCAG et sécurité du dépôt public non validés.
- **Prochaine action :** CI, correction éventuelle, puis audit indépendant des missions 1–17 et essais réels d'accessibilité.


### Complément du cycle V2.5 — missions 10–17 (31 octobre 2026)

- **HEAD initial :** `9e554a0dc01b52e7eb83f9ee2c416d39a3ed2e2c`. Trois CI `success` : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159362215), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159362127), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159362151). **2 160 tests réussis, 0 échec** sur ce SHA. Le commit initial `4fcce38f` avait 12 tests en échec : absence de métadonnées d'unités pour les missions 18–29 ; corrigé par `9e554a0d` en complétant les unités 10–29 sans affaiblir les assertions.
- **Lot complémentaire :** 10–17, huit modèles indépendants et 32 contre-calculs dans `tests/audit-010-017-independent.test.cjs`. **24 questions flash** ajoutées ; dictionnaire `earlyFlash` = 25 jeux pour les missions 10–34. [Rapport](AUDIT_SCIENTIFIQUE_010_017_20261031.md).
- **Tests et CI du nouveau commit :** résultats à confirmer après publication, ne pas assimiler à une réussite. Couverture documentaire 10–597 = 588/597 (98,5 %) ; **1–9 non auditées dans ce cycle**. 597 missions conservées, 0 créée.
- **Réserves :** politiques de tolérance et solutions détaillées manquantes dans certaines missions historiques, animation temporelle, contrôles physiques navigateurs/mobile, NVDA/TalkBack/VoiceOver, sécurité, confidentialité et visibilité publique. Phase 1 maintenue ; aucune action AppDeploy.
- **Suite :** CI sur le HEAD, correctifs éventuels, puis audit 1–9 et réception réelle.


### Réception CI des correctifs 10–42 (31 octobre 2026)

- **Commits réels :** `4fcce38fbb5f8bed05eb9320435701a8a1bb93fd` (questions 18–34, test 18–42, rapport), `9e554a0dc01b52e7eb83f9ee2c416d39a3ed2e2c` (20 unités d'entrée manquantes 10–29), `cd202b5e45eddb65efdf232f10151464fc0569cd` (questions 10–17, test 10–17, rapport et registre).
- **Échec intermédiaire conservé :** le commit `4fcce38f` a produit **2 148 réussites / 2 160 tests, 12 échecs** (missions 18–29, `inputUnits` absent). Correction de la métadonnée manquante, **sans retirer ni affaiblir les assertions**.
- **Dernier commit de code/test `cd202b5e45eddb65efdf232f10151464fc0569cd` : 2 169/2 169 tests réussis, 0 échec, 3/3 workflows `success`.** [Recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159443407), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159443354), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41159443435).
- **Bilan du cycle :** 33 missions (10–42), 33 références indépendantes, **132 points numériques** dans les nouveaux tests ; **75 questions flash** pour 25 missions (10–34). 597 missions conservées, 0 créée. Couverture documentaire 10–597 : **588/597 (98,5 %)**, sans prétendre à la réception complète.
- **Reste à faire :** missions 1–9, politiques scientifiques/tolérances et corrigés détaillés des premières missions, tests navigateur et smartphone réels, géométrie/animations temporelles, NVDA/TalkBack/VoiceOver, sécurité/confidentialité et audit du dépôt public. Phase 1 maintenue, aucun AppDeploy modifié.
- **Le présent commit documentaire est postérieur au SHA CI ci-dessus :** vérifier ses trois propres workflows avant de déclarer le HEAD final validé.


### Cycle V2.5 — missions 001–009 et réactivation mémoire (31 octobre 2026)

- **HEAD initial distant :** `8abce66d3a6fc03b1721269aed265814da6f35e6` ; trois workflows GitHub Actions `success` au démarrage (recette `41159544521`, science `41159544631`, qualité `41159544531`). Dernier décompte vérifié : **2 169/2 169 tests réussis** sur ce SHA.
- **Audit :** neuf missions historiques autonomes, contre-calculs indépendants à trois valeurs par moteur au minimum, conversions SI, invariants et cas invalides ; fichier `tests/audit-001-009-independent.test.cjs`. Rapport : [AUDIT_SCIENTIFIQUE_001_009_20261031.md](AUDIT_SCIENTIFIQUE_001_009_20261031.md).
- **Anomalie pédagogique :** cinq missions sans trois questions flash identifiables (001, 006–009), deux missions avec rappels présentés directement comme réponses (003–004). Correction HTML ciblée sur sept pages : trois questions explicites, sans modification des modèles, de l'accueil, des 17 univers ou de la navigation. Les missions 002 et 005 avaient déjà trois questions.
- **Inventaire :** 597 missions conservées, 0 nouvelle mission. Couverture documentaire 001–597 = **597/597**, ce qui **ne constitue pas une réception scientifique exhaustive**.
- **Statut CI du présent commit :** à vérifier après publication ; aucun résultat présumé. Vérifier les trois workflows sur le nouveau SHA, corriger tout échec avant la phase suivante.
- **Blocages de réception :** contrôle complet 3 essais/3 aides des contrôleurs autonomes, animations 2D/3D après erreur, fidélité temporelle, rendu smartphone, NVDA/TalkBack/VoiceOver, audit sécurité du dépôt public et données historiques. Phase 1 maintenue.
- **Prochaine action :** vérifier les trois CI du nouveau HEAD, corriger toute régression ; effectuer un audit transversal des missions 001–597 et prioriser la recette navigateur/mobile réelle. Aucun projet AppDeploy modifié.


### Vérification CI du commit `0fda3d87` et réserve fonctionnelle (31 octobre 2026)

- **Commit réel publié :** [`0fda3d87036ed35ec2176abe344bd9e13aeae8c3`](https://github.com/sebromapro-oss/SI-QUEST/commit/0fda3d87036ed35ec2176abe344bd9e13aeae8c3), dix fichiers modifiés/créés (sept pages, un test, un rapport et le registre).
- **Résultat indépendant des workflows sur ce SHA : 2 179 tests exécutés, 2 179 réussis, 0 échec ; trois workflows `success`.** [Recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41163825336), [Contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41163825453), [Qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41163825294). Dix nouveaux tests, neuf moteurs historiques couverts.
- **Anomalie fonctionnelle encore ouverte :** les neuf contrôleurs autonomes 001–009 désactivent `trial` tant que le calcul n'est pas réussi (ou corrigé ouvert pour 001/002). Cela contredit la demande d'exploration qualitative après réponse incorrecte. **Ne pas débloquer naïvement** : plusieurs essais affichent la valeur calculée et divulgueraient la solution. Il faut un mode qualitatif distinct, une non-divulgation testée, puis une recette DOM/navigateur. La réussite CI ne vaut pas validation de ce comportement.
- **HEAD du présent complément documentaire :** postérieur au commit de code ; contrôler ses trois workflows séparément.


### Cycle V2.5 — correction des neuf animations historiques après erreur (31 octobre 2026)

- **HEAD initial de cette correction :** `dc3aca99a3f3b87ab05191926af0ef217adb1687`. Correctifs réels successifs : [engrenages `bd467fb7`](https://github.com/sebromapro-oss/SI-QUEST/commit/bd467fb7f19e9cea81eba7cdabb6570e6399d8ab), [six missions `042c3bac`](https://github.com/sebromapro-oss/SI-QUEST/commit/042c3bac52a252df2fdd7d682438bc278f284cf8), [freinage et hydraulique `f68b37df`](https://github.com/sebromapro-oss/SI-QUEST/commit/f68b37dfe965382106615ba05437d2cb54d44f8b).
- **Cause racine :** les neuf contrôleurs autonomes bloquaient l'essai tant que la réponse numérique était incorrecte. Le déverrouillage direct aurait divulgué les réponses dans les messages, la chronologie et les décisions.
- **Correctif :** après au moins une tentative de calcul, autoriser l'exploration qualitative ; conserver les résultats numériques masqués avant réussite/corrigé, les trois aides et le verrouillage du corrigé. Les essais qualitatifs ne valident pas la mission. Pour le vérin, conserver l'interverrouillage de sécurité du cycle. Pour le freinage, masquer les distances, vitesses et marges numériques avant réussite. Les essais sans tentative restent interdits.
- **Tests de non-régression :** DOM simulé pour les neuf contrôleurs autonomes, contrôle des valeurs non divulguées et de l'absence de validation artificielle. Trois workflows `success` sur `f68b37df`, **2 188/2 188 tests réussis, 0 échec** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41164238566), [science](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41164238346), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41164238299).
- **Inventaire et limites :** 597 missions, 0 ajoutée ; les neuf pages historiques ont maintenant trois questions flash. La couverture documentaire 597/597 ne vaut pas réception individuelle exhaustive. **Tests sur navigateur réel et appareils physiques, NVDA, TalkBack, VoiceOver, fidélité temporelle et audit des secrets/historique non réalisés.** Dépôt public à ce HEAD ; visibilité inchangée. Aucun code ni déploiement AppDeploy modifié.
- **Prochaine action :** vérifier la CI du HEAD documentaire, puis lancer une recette navigateur/mobile et lecteurs d'écran avec preuves par mission ; poursuivre les contrôles de sécurité et confidentialité. **Phase 1 maintenue, phase 2 bloquée.**


### Cycle V2.5 — recette Chromium transversale, 17 univers et codeur entier (31 octobre 2026)

- **HEAD initial distant :** `d828aaca300badaf479663042b8e077a56ee0af7`. **Dernier commit de code/test :** [`f81578e9`](https://github.com/sebromapro-oss/SI-QUEST/commit/f81578e98b62d57346039eed59f08285362bbef2). **Rapport :** [AUDIT_NAVIGATEUR_SECURITE_20261031.md](AUDIT_NAVIGATEUR_SECURITE_20261031.md).
- **Recette navigateur ajoutée :** `tests/mission-browser.spec.cjs` et extension ciblée du workflow `accueil-browser.yml`. Échantillon **25 missions distinctes couvrant les 17 univers**, sur bureau 1440 × 900 et Android **émulé** 390 × 844 ; 50 navigations, contrôle après réponse incorrecte, non-divulgation du corrigé, SVG, largeur et erreurs JS. Deux missions (`motion-01`, `circular-02`) testées plus profondément pour trois essais/trois aides et 3D.
- **Anomalie fonctionnelle corrigée :** `encoder-measured-travel-01` échouait en navigateur avec `Paramètre hors domaine` parce que le contrôleur calculait des fronts fractionnaires malgré `step="1"` dans le curseur HTML. Le contrôleur lit désormais ce pas et échantillonne **au plus 101 valeurs entières admissibles** ; le domaine continu et les anciens cas entiers restent testés. **Un nouveau test Node** couvre le codeur.
- **Tests confirmés sur `f81578e9` : 2 189/2 189 Node réussis, trois workflows `success`** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41168789588), [science](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41168789545), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41168789565). **Recette navigateur confirmée sur `43cb849d` : 22/22 Playwright Chromium réussis**, [exécution](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41168638949). Le fichier de test Node a ensuite été corrigé sans modifier le code exécuté en navigateur.
- **Échecs intermédiaires conservés :** timeout du parcours de 25 missions, vrai défaut de domaine du codeur, adaptation nécessaire du DOM simulé et correction d'une erreur de syntaxe du test. Aucun contrôle scientifique supprimé.
- **Sécurité :** dépôt **public** confirmé ; inspection partielle des noms de fichiers et recherche de cinq motifs de secrets sans résultat, **audit historique et exhaustif non réalisé**. Les réponses attendues restent dans le HTML public et la progression en `localStorage` n'est pas une preuve authentifiée. Séparation des preuves privées : **dépendance à transmettre au pilote SI FRANCE**, sans intervention AppDeploy.
- **Inventaire :** 597 missions conservées, **0 créée** ; couverture documentaire 597/597, mais réception scientifique/graphique/accessibilité exhaustive non démontrée. **Appareils physiques, Firefox/Safari, NVDA/TalkBack/VoiceOver non testés.** Phase 1 maintenue.
- **Prochaine action :** vérifier les trois CI du dernier commit documentaire ; élargir les parcours navigateur à l'ensemble du catalogue, traiter les anomalies démontrées, puis organiser la recette matérielle et RGAA. Aucun autre projet ni budget AppDeploy modifié.


### Cycle V2.5 — extension navigateur et dédoublonnage des questions flash (31 octobre 2026)

- **HEAD distant au démarrage :** `d8002d462d731418a54d267c5eeebf4ce75f8b44` ; trois workflows Node/science réussis sur cette révision, 2 189/2 189 tests. **Phase 1 maintenue, 597 missions conservées, 0 créée.**
- **Recette navigateur élargie :** 25 missions complémentaires, distinctes des 25 précédentes et réparties dans le catalogue ; **50 missions distinctes sur deux viewports Chromium** (bureau 1440×900 et Android *émulé* 390×844), soit **100 navigations de missions**. Le contre-échantillon vérifie saisie, erreur volontaire, exploration qualitative après erreur, verrouillage du corrigé/verdict, absence de `data-result` dans le SVG qualitatif, erreurs JavaScript et débordement horizontal. Sur `2e13bf3c`, **24/24 scénarios Playwright réussis** : [recette navigateur](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41171735785). Les 25 nouvelles pages ont aussi été lues : identifiant, valeur attendue finie, domaine initial et unités ; cela ne remplace pas le contre-calcul scientifique indépendant.
- **Cause racine pédagogique révélée par l'audit global :** les questions flash proviennent soit du HTML, soit de `earlyFlash`/`legacyFlash` dans le contrôleur. Un premier test trop restrictif a classé à tort **33 pages** comme sans questions (intitulés historiques différents). Il a également identifié **30 pages** ayant une liste HTML et une liste dynamique, donc susceptibles d'afficher six questions. Le contrôleur vérifie désormais l'existence d'une liste HTML avant toute injection dynamique. Le test transversal parcourt les **597 pages** et accepte uniquement trois questions statiques, ou trois questions dynamiques si la page n'en possède pas. Les tests initiaux échoués sont conservés dans l'historique.
- **Mission `heat-01` :** les trois questions existaient déjà dans `earlyFlash` ; l'ajout HTML initial a été annulé après contre-audit pour éviter un doublon. Deux tests supplémentaires vérifient les questions dynamiques, le domaine et le calcul indépendant `Q = 2 kg × 460 J/(kg·K) × 25 K = 23 000 J = 23 kJ`.
- **Tests Node/science confirmés sur le commit `95e871811f5fab2825f3b7fa373ba5a06d520440` : 2 192/2 192 réussis, 0 échec, trois workflows verts** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41171968369), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41171968382), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41171968352).
- **Recette navigateur complémentaire de non-duplication confirmée : 26/26 scénarios Playwright Chromium réussis**, bureau et Android émulé, sur le commit `337be9fb` : [exécution GitHub Actions](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41171931970). Trois missions représentatives (`heat-01`, `brake-torque-01`, `motion-01`) contrôlées sur deux viewports, sans double affichage des questions. Ce contrôle ne prouve pas la pertinence pédagogique de chacune des 597 séries de questions.
- **Préservation et limites :** aucune modification de l'accueil, des 17 univers, de la navigation, des données privées, du marquage auteur, de l'historique Git ou d'AppDeploy. Dépôt toujours **public** (visibilité non modifiée) ; les résultats attendus dans les HTML et la progression locale ne constituent pas des preuves authentifiées. Essais physiques Android/iPhone, Safari/Firefox, NVDA/TalkBack/VoiceOver, fidélité temporelle et réception graphique individuelle non réalisés.
- **Suite :** confirmer la recette navigateur de non-duplication et les workflows du commit documentaire final ; élargir les échantillons vers 597 missions, corriger les régressions observées, organiser les tests matériels et lecteurs d'écran. **Phase 2 (598–996) suspendue.**


### Cycle V2.5 — extension navigateur 50 + 9 missions, durcissement des workflows (31 octobre 2026, 07 h locale)

- **HEAD initial distant :** `db6416101194a4c215fc3c466cacf6679b20f1a6` ; 597 missions existantes ; trois workflows Node/science verts et 2 192/2 192 tests sur le HEAD initial. **0 mission créée**.
- **Commits réels :** [`0844bd1a`](https://github.com/sebromapro-oss/SI-QUEST/commit/0844bd1a60aeb41937c90a6ae3639fbe480b3839) (50 missions génériques nouvelles dans la recette), [`2c2a56f3`](https://github.com/sebromapro-oss/SI-QUEST/commit/2c2a56f3c3cf2ab2d66fd329428830a36db07983) (neuf missions historiques), [`c9fb94c4`](https://github.com/sebromapro-oss/SI-QUEST/commit/c9fb94c46ffdefffb7e85253fe09f37f3dbf16a2) et [`45b9246f`](https://github.com/sebromapro-oss/SI-QUEST/commit/45b9246f3062589de64f6dd9ef527bd4b4ac0d8c) (jetons Actions en lecture seule), [`6db92f4f`](https://github.com/sebromapro-oss/SI-QUEST/commit/6db92f4f18e42f7aeab526d9e64da76beffe7ab8) (rapport).
- **Couverture navigateur cumulée : 109/597 missions distinctes**, contre 50/597 avant ce cycle ; **488 restent à contrôler** par ces parcours. 218 navigations de parcours sur bureau 1440×900 et Android émulé 390×844. Les 59 nouvelles missions ont un parcours 3 essais/3 aides, exploration après erreur, corrigé verrouillé, contrôle JavaScript ; les 50 génériques ont en plus déplacement du curseur, SVG sans `data-result` et absence de débordement horizontal. Aucun défaut démontré dans ce lot ; cela ne prouve pas la justesse indépendante des équations.
- **Tests confirmés sur `0844bd1a` :** 30/30 Playwright ([run 41175692743](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41175692743)) ; 2 192/2 192 Node, trois workflows verts ([recette 41175692779](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41175692779), [science 41175692669](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41175692669), [contrôles 41175692665](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41175692665)).
- **Tests confirmés sur `2c2a56f3` :** 32/32 Playwright ([run 41176181021](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176181021)) ; 2 192/2 192 Node et trois workflows verts ([recette 41176180079](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176180079), [science 41176179997](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176179997), [contrôles 41176180050](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176180050)).
- **Sécurité CI :** les deux workflows qui n'avaient pas de permissions explicites sont désormais limités à `contents: read`. Le dépôt reste **public** ; les réponses attendues sont dans les pages HTML et la progression locale n'est pas une preuve authentifiée. Ne pas publier de données privées.
- **Rapport détaillé :** [AUDIT_NAVIGATEUR_051_109_20261031.md](AUDIT_NAVIGATEUR_051_109_20261031.md).
- **Contrôle final en attente à cette écriture :** vérifier les trois workflows sur le HEAD documentaire ainsi que le nouveau run Chromium de `c9fb94c4` ; ne pas déclarer ces résultats avant leur achèvement.
- **Blocages de réception :** 488 autres missions sans parcours navigateur, animations à vérifier physiquement, accessibilité NVDA/TalkBack/VoiceOver, appareils Android/iPhone réels, Firefox/Safari, sécurité historique et preuves scientifiques/graphiques individuelles. **Phase 1 maintenue ; 598–996 suspendues.** Aucun projet AppDeploy modifié.
- **Prochaine action :** contrôler les runs finaux, corriger toute régression, puis poursuivre la recette navigateur sur 25–50 missions distinctes non couvertes et les tests d'accessibilité au clavier.


#### Contre-réception des workflows et sécurité CI — même cycle

- **Tests de sécurité ajoutés :** [`1c2037b1`](https://github.com/sebromapro-oss/SI-QUEST/commit/1c2037b1a362550808bdea7e7caa231079f77261), quatre tests Node pour garantir les jetons GitHub Actions en lecture seule dans les quatre workflows.
- **Tests automatisés sur `1c2037b1` : 2 196/2 196 réussis**, trois workflows verts ([recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176927496), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176927480), [science](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176927436)).
- **Recette Chromium relancée après durcissement : 32/32 scénarios réussis sur `c9fb94c4`**, [run 41176735709](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176735709), 109 missions distinctes couvertes dans les parcours cumulés. Le code navigateur n'a pas changé depuis ce commit ; les modifications ultérieures concernent workflow scientifique, tests Node et documentation.
- **Rapport consolidé :** [AUDIT_NAVIGATEUR_051_109_20261031.md](AUDIT_NAVIGATEUR_051_109_20261031.md), addendum documentaire [`59c0b823`](https://github.com/sebromapro-oss/SI-QUEST/commit/59c0b82332ecb1042b3e85db8f47e8cd2337cfbf).
- **HEAD documentaire de cette mise à jour :** successeur de `59c0b823` ; vérifier les trois workflows sur son SHA avant toute affirmation de réception CI finale. Phase 1 maintenue ; 488 missions restent à parcourir en navigateur, essais physiques/lecteurs d'écran non réalisés.


### Cycle V2.5 — lot navigateur 110–159 et sept contre-calculs (31 octobre 2026, 07 h 40 locale)

- **HEAD initial distant :** `21fa3fee076ae128fd1fff1116360f1c9e2a2ac8`. **Dernier commit de test scientifique :** [`7ebd4d17`](https://github.com/sebromapro-oss/SI-QUEST/commit/7ebd4d175cdcb297bf6649f61c7011acd5357d67). **Dernier commit de rapport :** [`be90b6f8`](https://github.com/sebromapro-oss/SI-QUEST/commit/be90b6f8a9a1d359c4234ccd2af47cd662e172e9). Rapport : [AUDIT_NAVIGATEUR_110_159_20261031.md](AUDIT_NAVIGATEUR_110_159_20261031.md).
- **597 missions conservées, 0 créée.** Lot de **50 missions inédites** ajouté aux parcours Playwright, bureau et Android émulé, avec contrôle 3 essais/3 aides, simulation qualitative après erreur, corrigé masqué, SVG, absence de débordement et erreurs JavaScript. Cinq missions sont aussi testées au clavier (Tab, Entrée) sur deux viewports. **Couverture navigateur confirmée à cette rédaction : 109/597** ; objectif 159/597 soumis au verdict du [run Chromium 41177603382](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177603382), **en cours**, ne pas le compter réussi par anticipation.
- **Sept contre-calculs SI indépendants**, quatre valeurs par modèle, valeurs nominales et domaines non finis. Les trois échecs initiaux provenaient d'un mauvais import du registre de modèles dans le nouveau test (moteur partiel), corrigé sans suppression ni assouplissement d'assertion. **2 204/2 204 tests Node réussis, zéro échec, trois workflows verts** sur `7ebd4d17` : [recette 41177782306](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177782306), [science 41177782313](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177782313), [qualité 41177782369](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177782369).
- **Non réalisés :** contrôles visuels scientifiques humains, fidélité temporelle, tests appareils Android/iPhone réels, Firefox/Safari, NVDA/TalkBack/VoiceOver, recette RGAA complète, audit exhaustif des secrets et de l'historique. Dépôt public ; progression locale non authentifiée. Aucune modification d'AppDeploy, de l'accueil, de la carte des 17 univers, du marquage auteur ou du budget.
- **Prochaine action :** examiner et corriger le résultat Chromium, confirmer la couverture réellement validée, puis poursuivre les 438 missions restantes *si* 159/597 réussissent ; sinon maintenir 488 missions non couvertes. **Phase 1 maintenue ; extension 598–996 suspendue.**


#### Contre-réception finale du lot 110–159

- [Run Chromium 41177603382](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177603382) **success : 38/38 scénarios Playwright réussis en 9,5 min**, sur le commit navigateur `0e1fc012`. Les 50 missions nouvelles du lot ont été testées sur bureau et Android émulé ; cinq d'entre elles disposent en outre d'un parcours clavier Tab/Entrée sur chaque viewport.
- **Couverture navigateur confirmée : 159/597 missions distinctes (26,6 %) ; 438 missions restent à parcourir.** Les 2 204 tests Node et trois workflows sont également verts sur le HEAD documentaire `1a392e61` ([recette 41177894375](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177894375), [science 41177894408](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177894408), [qualité 41177894486](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41177894486)).
- **Dernier commit du rapport :** [`233d2477`](https://github.com/sebromapro-oss/SI-QUEST/commit/233d24772b18e12168f0722e069b1287c2108cf3). **Aucune mission créée, aucune application AppDeploy modifiée.** La réception scientifique, graphique et d'accessibilité sur appareils physiques reste non prouvée. Prochaine action : poursuivre la recette sur 25–50 missions inédites, puis contrôler les appareils et lecteurs d'écran réels.


## Cycle V2.5 du 31 octobre 2026 — recette navigateur 160–209

- **HEAD initial :** `627e5d2385df54e22547d4a9617165681c8b7533` ; 597 missions, trois workflows Node/science réussis, 2 204/2 204 tests, recette Chromium antérieure **159/597 missions distinctes** et 38/38 scénarios.
- **Commit réel navigateur :** [`b26eac4c12a3`](https://github.com/sebromapro-oss/SI-QUEST/commit/b26eac4c12a3d023dbf0f9753e60dc0067f7420d). Ajout de **50 missions distinctes** à la recette Playwright, deux viewports (1440×900 et Android émulé 390×844), 3 essais/3 aides, SVG, erreurs JavaScript, confidentialité du corrigé et largeur ; cinq missions supplémentaires testées au clavier sur chaque viewport. Sélection déterministe : **209/597 visées, 159/597 confirmées jusqu'au verdict Chromium**.
- **Commit réel scientifique :** [`610ca9b26cca`](https://github.com/sebromapro-oss/SI-QUEST/commit/610ca9b26cca7b0efcb124084acbd3c48019c2d2). Six nouveaux tests Node (cinq modèles physiques indépendants, vingt points numériques et cohérence HTML/units ; un inventaire). Le total attendu est **2 210 tests** si les six sont tous exécutés ; **ne pas déclarer ce total réussi avant les runs**.
- **Rapport détaillé :** [AUDIT_NAVIGATEUR_160_209_20261031.md](AUDIT_NAVIGATEUR_160_209_20261031.md), commit documentaire `eac4b75cda93a6b24936a62bf250f8381c512e97`.
- **Runs à contre-vérifier :** [Chromium 41179676226](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41179676226) sur `b26eac4c` ; [Node 41179716646](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41179716646), [science 41179716684](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41179716684), [qualité 41179716655](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41179716655) sur `610ca9b2`. Statuts en cours à l'écriture, ne pas inférer leur réussite.
- **Aucune mission créée**, aucun fichier de l'accueil, des 17 univers, des assets ou du marquage d'auteur modifié ; aucun projet AppDeploy touché. Dépôt toujours **public**.
- **Réserves :** 388 missions resteraient à couvrir si Chromium valide le nouveau lot ; validation scientifique indépendante non exhaustive ; tests physiques, Firefox/Safari, NVDA/TalkBack/VoiceOver et audit complet de sécurité non réalisés.
- **Prochaine action :** vérifier et corriger les runs, compléter le rapport avec les résultats réels, puis lancer un lot navigateur distinct de 25–50 missions ; rester en **phase 1**.

**HEAD de suivi avant le commit de cette section :** `eac4b75cda93a6b24936a62bf250f8381c512e97`. Le SHA final de suivi sera celui retourné par GitHub lors de la publication.


### Complément scientifique du lot navigateur 160–209 — résultats CI

- **Cinq contre-calculs supplémentaires** publiés au commit [`cba5aa1f`](https://github.com/sebromapro-oss/SI-QUEST/commit/cba5aa1f3a828c9fc4af3471e2f59e8a92c4ea04) : traction hydrostatique à la roue, vidange gravitaire, résistances en série, résistance thermique plane, courbure de poutre. Total : **10 modèles distincts, 40 points de contre-calcul indépendants, 12 tests Node nouveaux**.
- **Échec intermédiaire documenté :** 2 215/2 216 réussis ; test de traction hydrostatique importé depuis une chaîne de modèles qui ne contient pas le modèle. **Cause racine : deux chaînes de lots indépendantes (233–237 et 238+)**.
- **Correctif réel :** [`7e0974f46193`](https://github.com/sebromapro-oss/SI-QUEST/commit/7e0974f46193c75ecf60b73724c775b0215332af), import de la bonne chaîne, aucune formule ni seuil affaibli.
- **Résultat vérifié : 2 216/2 216 tests Node réussis, trois workflows verts sur `7e0974f`** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41179838300), [science](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41179838260), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41179838314).
- Rapport détaillé mis à jour au commit `48872c545f0eaad3e0ad8ee2d4f490f4fe68b930`. La recette Chromium `41179676226` doit toujours être contre-vérifiée avant de confirmer 209/597.


### Réception Chromium confirmée pour le lot 160–209

- [Run Chromium 41179676226](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41179676226) : **44/44 scénarios Playwright réussis en 12,8 minutes** sur le commit navigateur `b26eac4c` ; artefact de recette `siquest-accueil-recette` ID `13035130255`.
- **Couverture navigateur cumulée prouvée : 209/597 missions distinctes (35,0 %)** ; **388 missions restent à parcourir**. Contrôles réalisés sur Chromium bureau et Android émulé ; cinq missions du lot vérifiées au clavier sur chaque viewport.
- La comparaison GitHub `b26eac4c..2033fd0587` confirme que les huit commits intermédiaires ne touchent qu'aux tests scientifiques et à la documentation ; le code testé dans Chromium n'a pas changé.
- **Trois workflows Node/science verts sur le HEAD de suivi `2033fd0587`, 2 216/2 216 tests réussis**. Le commit documentaire de cette mise à jour est postérieur et devra être contrôlé sur ses propres runs.
- **Suite prioritaire :** lot navigateur 210–259 sans doublons, vérification des défauts détectés, tests physiques et lecteurs d'écran. **Phase 1 maintenue, zéro nouvelle mission.**


## Cycle V2.5 du 31 octobre 2026 — lot navigateur 210–259

- **HEAD initial distant :** `29b209882937f81021b7417ce16ffb1df8afe95b` ; 597 missions, 209/597 couvertes en Chromium, 2 216/2 216 tests Node et trois workflows verts sur ce SHA. **Aucune mission créée.**
- **Commits réels :** [`f3f3f0be`](https://github.com/sebromapro-oss/SI-QUEST/commit/f3f3f0be96a236c98886e270dfdaea5a9d5d5f2b) (50 missions supplémentaires dans les parcours Playwright), [`4c3d7eda`](https://github.com/sebromapro-oss/SI-QUEST/commit/4c3d7edae7910ba8289a278da4b4b62630f06542) (six contre-calculs scientifiques, 24 points numériques, sept tests Node), [`b84a3e17`](https://github.com/sebromapro-oss/SI-QUEST/commit/b84a3e17813b525048f1e311957f5635b24c040f) (rapport).
- **Recette navigateur :** six scénarios supplémentaires sur bureau et Android émulé ; 50 missions uniques non couvertes auparavant, trois essais/trois aides, SVG, erreurs JavaScript, corrigé verrouillé, largeur et cinq contrôles clavier par viewport. **Couverture visée : 259/597 ; couverture confirmée à l'écriture : 209/597**, car le [run Chromium 41183678314](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183678314) est encore en cours. Ne pas compter 259/597 avant son succès.
- **Science :** six modèles contrôlés indépendamment (ressorts parallèles, transformateur idéal, diffusivité thermique, flambement d'Euler, puissance mécanique, étranglement hydraulique), quatre points par modèle ; cohérence unités et HTML, rejet NaN/Infinity. **2 223 tests Node attendus** ; résultats des [runs recette 41183697305](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183697305), [science 41183697306](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183697306), [qualité 41183697316](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183697316) **en cours**, non déclarés réussis.
- **Rapport détaillé :** [AUDIT_NAVIGATEUR_210_259_20261031.md](AUDIT_NAVIGATEUR_210_259_20261031.md). Aucun contenu de mission, page d'accueil, carte des 17 univers, script d'AppDeploy, marquage auteur ou donnée privée modifié.
- **Blocages :** 388 missions sans recette navigateur confirmée à l'écriture (338 si le lot est réussi), vérification scientifique et graphique individuelle non exhaustive, Android/iPhone physiques, Firefox/Safari, NVDA/TalkBack/VoiceOver et audit historique des secrets non réalisés. Dépôt public ; progression locale non authentifiée.
- **Prochaine action :** examiner les runs et corriger toute régression ; si Chromium réussit, valider 259/597 puis poursuivre 260–309. **Phase 1 maintenue, extension 598–996 suspendue.**
- **SHA de suivi avant publication de cette section :** `b84a3e17813b525048f1e311957f5635b24c040f` ; le SHA du commit documentaire final est celui retourné par GitHub.


### Complément du lot 210–259 — onze modèles, incident CI documenté

- [`d9db5517`](https://github.com/sebromapro-oss/SI-QUEST/commit/d9db5517fd30a55d792994b46b844c57522c4145) : cinq modèles indépendants supplémentaires (NPSH, Archimède, engrènement, ressorts en série, rapport d'engrenages), portant le lot à **11 modèles, 44 contre-calculs et 12 tests Node nouveaux**.
- **Échec réel sur `d9db5517` : 2 227/2 228 tests réussis**, trois workflows en échec. Cause : une assertion d'inventaire du nouveau banc d'essai attendait encore six identifiants alors que onze étaient présents ; les onze contre-calculs scientifiques ont réussi.
- **Correctif publié :** [`b7347b31`](https://github.com/sebromapro-oss/SI-QUEST/commit/b7347b31698987942b89fd7cd3f50555ef88937c), assertion corrigée de six à onze sans suppression de test ni modification de loi scientifique.
- **Runs du correctif à contrôler :** [recette 41183847762](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183847762), [science 41183847738](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183847738), [qualité 41183847742](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183847742). **Chromium 41183678314 toujours en cours** à la rédaction ; ne pas encore valider 259/597.
- **Rapport actualisé :** [AUDIT_NAVIGATEUR_210_259_20261031.md](AUDIT_NAVIGATEUR_210_259_20261031.md), commit documentaire [`4396afc5`](https://github.com/sebromapro-oss/SI-QUEST/commit/4396afc502bdda42781712c52d468982065da192).
- **Phase 1 maintenue** ; zéro nouvelle mission, aucune application AppDeploy modifiée.


#### Contre-réception Node du lot 210–259 — résultat confirmé

- **HEAD testé :** `4729dee13f70226655b70aa43534297417c2cc05`.
- **2 228/2 228 tests Node réussis, zéro échec** d'après les logs du [run 41183879986](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183879986). Les deux autres workflows sont également **success** : [contrôles scientifiques 41183879993](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183879993) et [qualité 41183879972](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183879972).
- **La recette Chromium 41183678314 reste en cours à cette écriture : couverture confirmée 209/597**, objectif 259/597. Ne pas annoncer son succès par anticipation.
- Les échecs intermédiaires `d9db5517` (assertion d'inventaire du banc d'essai) sont conservés dans l'historique et corrigés par `b7347b31`. Aucune équation ni aucun contrôle n'a été affaibli.
- **Prochaine étape :** examiner le verdict Chromium, traiter les anomalies éventuelles, puis seulement confirmer le nouveau total et étendre à 260–309. Phase 1 maintenue, 0 mission créée.


## Cycle V2.5 du 31 octobre 2026 — réception 210–259 et nouveau lot 260–309

- **HEAD initial distant :** `9ed41c58c4930c92b3ec026fceacdb13eb47b27f`. **597 missions conservées ; 0 mission créée.**
- **Réception navigateur antérieure confirmée :** [Chromium 41183678314](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183678314), **success** sur `f3f3f0be` ; **259/597 missions distinctes couvertes (43,4 %)**. Rapport 210–259 complété au commit [`3bdc8379`](https://github.com/sebromapro-oss/SI-QUEST/commit/3bdc83799485eff84a3ba0d8ab72b420e7ed90cf).
- **Code de tests publié :** [`e7db0b83`](https://github.com/sebromapro-oss/SI-QUEST/commit/e7db0b830a6f8dbd8c095e3ede59f2c6da8612f2) : 50 missions nouvelles **dans la couverture de tests** (260–309), pas 50 missions créées. Six scénarios Playwright (bureau et Android émulé), cinq contrôles clavier par viewport, essais/aides 3+3, exploration après erreur, SVG sans fuite, absence de débordement. **Run navigateur [41187846793](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41187846793) en cours** à l'écriture : couverture confirmée maintenue à 259/597, **309/597 seulement si succès**.
- **Contre-calculs publiés :** [`9cbf7048`](https://github.com/sebromapro-oss/SI-QUEST/commit/9cbf70488911e80a4e79b6d0dcbdd97db1b8a082) : **8 modèles SI distincts, 32 comparaisons numériques indépendantes**, unités et données HTML, 9 tests Node nouveaux. **Résultat réel : 2 237/2 237 tests réussis, 0 échec**, [recette 41187906070](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41187906070) ; [science 41187906005](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41187906005) et [qualité 41187906032](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41187906032) également **success** sur ce commit. Les runs des commits documentaires suivants doivent être contrôlés séparément.
- **Rapport détaillé :** [AUDIT_NAVIGATEUR_260_309_20261031.md](AUDIT_NAVIGATEUR_260_309_20261031.md), commit [`271d6267`](https://github.com/sebromapro-oss/SI-QUEST/commit/271d62675093b95d03e4c261ed578c3dc29c7104), inventaire nominatif des 50 missions et limites des preuves.
- **Anomalies fonctionnelles nouvelles :** aucune démontrée à ce stade ; les échecs éventuels du navigateur restent à traiter avant réception. Les 8 contre-calculs ont passé les tests automatisés ; ne pas généraliser leur succès aux autres modèles.
- **Réserves :** 338 missions restent sans recette navigateur confirmée, ou 288 après succès du nouveau lot ; revue scientifique individuelle et fidélité graphique incomplètes ; appareils physiques, Firefox/Safari, NVDA/TalkBack/VoiceOver et sécurité exhaustive non testés. Le dépôt est **public**, les réponses sont lisibles dans le HTML et la progression locale n'est pas authentifiée.
- **Périmètre préservé :** aucun code ou configuration AppDeploy, accueil, carte des 17 univers, asset, marquage auteur, backend ou budget externe modifié.
- **Prochaine action :** examiner le verdict Chromium 41187846793 et corriger toute régression ; confirmer 309/597 seulement si réussite, puis étendre la recette à 310–359. **Phase 1 maintenue ; phase 2 (598–996) suspendue.**
- **HEAD avant le présent commit de suivi :** `3bdc83799485eff84a3ba0d8ab72b420e7ed90cf`. Le SHA final est celui retourné par GitHub à la publication.


### Ajustement CI du lot 260–309 — délai de recette cumulative

- [Commit `81fd3128`](https://github.com/sebromapro-oss/SI-QUEST/commit/81fd312829d95fd0c896d21b09a9ac01eb0735a2) : durée maximale du **job Chromium** portée de **20 à 35 minutes** pour permettre l'exécution des scénarios cumulés 1–309. Aucun test supprimé, aucune assertion affaiblie, aucune équation de production modifiée.
- [Nouveau run Chromium 41187987602](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41187987602) déclenché par ce commit ; [premier run 41187846793](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41187846793) également à vérifier. **Ne pas déclarer 309/597 avant réussite du navigateur**.
- Aucun service payant ajouté. Cette modification n'est pas une validation scientifique ou d'accessibilité.


## Cycle V2.5 du 31 octobre 2026 — confirmation 260–309 et recette 310–359

- **HEAD initial distant :** `99df5597c366c2776a4804370c8c47a2dcb4c95d` ; les trois workflows Node/science du HEAD initial étaient **success** ([recette 41188000073](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41188000073), [contrôles 41188000037](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41188000037), [qualité 41188000062](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41188000062)).
- **Réception Chromium précédente confirmée :** [run 41187987602](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41187987602), **success** sur `81fd312829d95fd0c896d21b09a9ac01eb0735a2` ; couverture confirmée **309/597 (51,8 %)**. Ce succès est limité au protocole automatisé Chromium.
- **Commit de tests navigateur :** [`38743695`](https://github.com/sebromapro-oss/SI-QUEST/commit/387436950fad1f880201d6e7ad468a5826f915be), **50 missions supplémentaires distinctes** dans la couverture 310–359, six scénarios Playwright ajoutés (deux groupes de 25 et un contrôle clavier sur chacun des deux viewports : bureau 1440×900 et Android émulé 390×844). Trois essais, trois aides, exploration qualitative après erreur, SVG, absence de fuite du corrigé, largeur et exceptions JS. [Run Chromium 41192037459](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192037459) **en cours au contrôle de 10:17 UTC** ; **ne pas annoncer 359/597 avant succès**.
- **Commit de tests scientifiques :** [`fd4b2fe8`](https://github.com/sebromapro-oss/SI-QUEST/commit/fd4b2fe8bc68f4b687d70609f8d7dc3fa6890371) : **11 lois indépendantes, 44 contre-calculs SI** (minimum, milieu, nominal, maximum), unités d'entrée/sortie, cohérence HTML, non-finis, inventaire ; **12 nouveaux tests Node**. Les [contrôles scientifiques 41192105480](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192105480) et [qualité 41192105501](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192105501) sont **success**. La [recette Node 41192105355](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192105355) était **en cours** au contrôle ; ne pas annoncer de total avant ses journaux.
- **Rapport nominatif :** [AUDIT_NAVIGATEUR_310_359_20261031.md](AUDIT_NAVIGATEUR_310_359_20261031.md), commit [`0314552b`](https://github.com/sebromapro-oss/SI-QUEST/commit/0314552bbab9ce4f2cc76af8b344568fcdfdd6bb).
- **Couverture :** 309/597 confirmées ; 50 supplémentaires soumises à la recette, soit **359/597 seulement sous réserve du succès Chromium**. **288 missions** restent sans recette confirmée à cet instant ; ce chiffre descendrait à **238** après succès. **597 missions existantes, 0 créée.**
- **Anomalies de production :** aucune nouvelle anomalie démontrée à cette étape. Le nouveau lot teste des interactions et 11 lois, **pas** la fidélité de toutes les animations et de tous les SVG.
- **Réserves :** Android/iPhone physiques, Firefox, Safari, NVDA, TalkBack, VoiceOver, audit RGAA, revue scientifique individuelle exhaustive et audit historique des secrets **non réalisés**. Dépôt **public** et progression locale **non authentifiée**.
- **Préservation :** aucune application AppDeploy, aucun accueil, carte des 17 univers, asset, marquage d'auteur ou historique Git modifié. Pas de nouvelle mission ni de dépense ajoutée.
- **Suite :** confirmer les trois workflows du dernier HEAD et le verdict Chromium 310–359, corriger toute régression puis poursuivre 360–409 ; **phase 1 maintenue**, phase 2 598–996 suspendue.
- **HEAD avant le présent commit de suivi :** `0314552bbab9ce4f2cc76af8b344568fcdfdd6bb`. Le SHA du commit de suivi est celui retourné par GitHub.


### Contre-réception Node du lot 310–359 — résultat confirmé

- **Commit de tests scientifiques :** `fd4b2fe8bc68f4b687d70609f8d7dc3fa6890371`.
- **2 249/2 249 tests Node réussis, 0 échec**, d'après les journaux du [run 41192105355](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192105355). Les deux autres workflows sont également **success** : [contrôles 41192105480](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192105480) et [qualité 41192105501](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192105501).
- Le [run Chromium 41192037459](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192037459) est **encore en cours** lors de cette contre-réception. **Couverture confirmée : 309/597** ; 359/597 reste conditionnel.
- Les 11 lois vérifiées et les 44 comparaisons ne démontrent ni la justesse des 39 autres lois du lot ni la conformité des animations ou des appareils physiques. **Phase 1 maintenue.**


## Cycle V2.5 du 31 octobre 2026 — recette 360–409

- **HEAD initial :** `f2b1891b7b3d2367c578e735670714ee77d4e1a5` ; **3/3 workflows Node/science réussis** sur ce SHA ([recette 41192170719](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192170719), [science 41192171062](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192171062), [qualité 41192170895](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192170895)).
- **Chromium 310–359 confirmé :** [run 41192037459](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192037459), **success**. Couverture confirmée **359/597 (60,1 %)**.
- **Nouveau lot 360–409 :** 50 missions distinctes, six scénarios Playwright ajoutés, bureau et Android émulé ; vérifications trois essais/trois aides, exploration, corrigé, SVG, largeur, erreurs JS, clavier. **Couverture 409/597 (68,5 %) conditionnée à la réussite de la nouvelle recette Chromium**. Missions restantes : **238** sans recette confirmée, puis **188** si réussite.
- **Rapport nominatif :** [AUDIT_NAVIGATEUR_360_409_20261031.md](AUDIT_NAVIGATEUR_360_409_20261031.md). Syntaxe JavaScript vérifiée avant commit ; CI du nouveau HEAD à contrôler, aucun résultat anticipé.
- **597 missions conservées, 0 créée ; aucun code de production ni aucune application AppDeploy modifiés.** Tests physiques, Firefox/Safari, NVDA/TalkBack/VoiceOver, RGAA, fidélité scientifique des animations et audit historique de sécurité non réalisés. Dépôt public, progression locale non authentifiée.
- **Phase 1 maintenue.** Suite : contrôler les runs du nouveau commit, corriger les anomalies éventuelles, ajouter des contre-calculs indépendants et poursuivre 410–459 après réussite.


### Complément scientifique 360–409 — huit références indépendantes

- **HEAD initial du complément :** `4f73ef44b57e97172f497cd4f0fa7306bf81a2ee`.
- Nouveau test `tests/audit-browser-batch-360-409-eight-models.test.cjs` : **8 modèles SI, 32 comparaisons numériques de référence**, unités, domaines, invariants, contrôle structurel SVG et HTML ; syntaxe vérifiée avant publication.
- **Résultats des workflows à vérifier après publication** ; ne pas assimiler l'ajout de tests à leur réussite. La recette Chromium du lot 360–409 déclenchée par le commit précédent doit également être contrôlée.
- Aucun code scientifique de production, aucune mission, aucun accueil ni aucune application AppDeploy modifiés. Phase 1 maintenue.


### Contre-réception automatisée du lot 360–409 — résultats confirmés

- **SHA réellement testé :** `ff90fc9b0141ef83fe2014575899e53583d65c0c` (commit des huit contre-calculs indépendants).
- **2 258/2 258 tests Node réussis, 0 échec**, logs du [run 41196234550](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41196234550). Les deux autres workflows sont également **success** : [contrôles scientifiques 41196234379](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41196234379) et [qualité scientifique 41196234410](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41196234410).
- Les huit modèles du nouveau test ont passé leurs références, unités, domaines et contrôles structurels SVG. **La recette Chromium 360–409 reste en cours** : [run 41196093041](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41196093041), sur le commit de tests navigateur `4f73ef44`. **Couverture navigateur confirmée : 359/597** tant que ce run n'a pas réussi.
- Ne pas assimiler ces réussites automatisées à une validation scientifique, graphique ou RGAA exhaustive. Phase 1 maintenue ; zéro mission créée.


## Cycle V2.5 du 31 octobre 2026 — lot 410–459 (13 h 15, heure de Paris)

- **HEAD distant initial :** `9f452ab267dcf63d844ca6d42b4061af5949c355`. [Chromium 360–409, run 41196093041](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41196093041) **success**, terminé le 31 octobre à 11:41 UTC. **409/597 missions distinctes couvertes en Chromium**, 188 sans recette confirmée.
- **Code de tests navigateur publié :** [`fbfe9dc5`](https://github.com/sebromapro-oss/SI-QUEST/commit/fbfe9dc540518c9999b4c842bb311af04bafb707) ; **50 missions supplémentaires (410–459)**, six scénarios Playwright bureau et Android émulé, essais/aides 3+3, exploration, corrigé, SVG, clavier, débordement et exceptions JS. [Run Chromium 41200350785](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41200350785) **en cours** à cette écriture. **Ne pas annoncer 459/597 avant son succès.**
- **Tests scientifiques publiés :** [`a135c38a`](https://github.com/sebromapro-oss/SI-QUEST/commit/a135c38accfc90d2f36d813f5198fac463b896f4), **8 modèles et 32 points de comparaison indépendants**, puis [correctif du banc SVG `b98d9f1a`](https://github.com/sebromapro-oss/SI-QUEST/commit/b98d9f1ad6106ac43bb8dbb27a0325c753ac593b). Les trois workflows intermédiaires de `a135c38a` ont échoué à cause des assertions SVG mal échappées ; aucun test supprimé, aucune équation de production modifiée. **2 267/2 267 tests Node réussis** sur `b98d9f1a` ([run 41200389380](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41200389380)), [science 41200389390](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41200389390) et [qualité 41200389438](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41200389438) **success**.
- **Inspection HTML directe : 50/50 fichiers vérifiés** (identifiants, domaines, valeurs finies, unités, prérequis, objectifs, langue et lien d'évitement), aucune anomalie structurelle détectée. [Tests permanents 50+1](https://github.com/sebromapro-oss/SI-QUEST/commit/ce015de9641e622779625e014e73b0c2c755da7f) publiés ; leur nouvelle CI est à contrôler. [Rapport nominatif et preuves](AUDIT_NAVIGATEUR_410_459_20261031.md).
- **Dernier commit documentaire avant cette mise à jour :** `d719c9fc44030862763e1d393f17e82186ca8221`. Ses workflows et ceux du test structurel sont à vérifier, ne pas anticiper de résultat. **597 missions conservées, 0 mission créée ; aucune modification AppDeploy, accueil, carte des 17 univers, assets, auteur ou backend.**
- **Réserves :** 138 missions resteraient sans recette Chromium **si** 410–459 réussit ; science et animations non réceptionnées exhaustivement, appareils physiques, Firefox/Safari, NVDA/TalkBack/VoiceOver et audit historique des secrets non réalisés. Dépôt **public**, progression locale **non authentifiée**. **Phase 1 maintenue ; phase 2 suspendue.**
- **Prochaine action :** examiner le verdict Chromium et les trois workflows du dernier HEAD, corriger toute anomalie, puis couvrir 460–509. Aucun verrou global entre fils : relecture du HEAD avant écriture.


## Cycle V2.5 du 31 octobre 2026 — lot 460–509 (14 h, Paris)

- **HEAD distant initial :** `ec5725a46490c79f3b88a034d9843b98e1859f69`. [Chromium 410–459 — run 41200350785](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41200350785) **success**, terminé le 31 octobre à 12:46 UTC. Couverture navigateur confirmée : **459/597** (76,9 %).
- **Lot préparé :** 50 missions distinctes 460–509 ; six scénarios Chromium bureau/Android émulé, 50 tests structurels + inventaire, huit contre-calculs indépendants sur 32 points. Le résultat du nouveau code est **en attente des workflows** ; **509/597 n'est pas encore confirmé**.
- **CI navigateur :** deux shards parallèles pour réduire le risque de timeout du job cumulatif (la précédente recette durait ~29 minutes). Tous les scénarios restent présents. Les **deux shards** doivent être success pour valider la nouvelle couverture.
- **Rapport nominatif :** [AUDIT_NAVIGATEUR_460_509_20261031.md](AUDIT_NAVIGATEUR_460_509_20261031.md). Vérification syntaxique des deux nouveaux tests et du fichier Playwright effectuée avant commit ; exécution Node et navigateur à confirmer par GitHub Actions.
- **Réserves :** 138 missions sans recette avant ce cycle, 88 seulement si le nouveau lot réussit ; 42 lois du lot non contre-calculées, graphisme scientifique exhaustif, appareils physiques, Firefox/Safari, NVDA/TalkBack/VoiceOver, RGAA et sécurité historique non réceptionnés. Dépôt public et progression locale non authentifiée.
- **Préservation :** aucune mission créée, aucun code de production, accueil, carte 17 univers, asset, auteur, backend, AppDeploy ou budget modifié. Phase 1 maintenue, phase 2 suspendue.
- **Suite :** contrôler les deux shards Chromium et les trois workflows Node/science sur le nouveau HEAD ; corriger toute régression avant de poursuivre 510–559. Vérifier le HEAD avant chaque écriture concurrente.


### Contre-audit du lot 460–509 — anomalies et correctifs

- [Run scientifique initial 41204664171](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41204664171) : **échec réel, 39 assertions sur 2 378 tests**, dû à un défaut du nouveau banc de test : les 39 pages de génération historique affichent objectifs/prérequis dans le HTML visible mais ne les dupliquent pas dans `window.SI_MISSION`. Le test vérifie désormais le texte pédagogique effectivement visible et les champs JS lorsqu'ils existent. **Aucun contrôle pédagogique supprimé.**
- **Défaut graphique de production identifié :** plusieurs pages historiques avaient des axes SVG libellés « % », « sans unité » ou « x/y » alors que les grandeurs sont, par exemple, m et km/h (freinage), K et K (échangeur), dB et m (acoustique), Hz et Hz (aliasing). Le contrôleur commun synchronise maintenant les deux axes du graphe paramétrique avec les unités de la mission ; quatre cas ciblés sont testés sur bureau et Android émulé. Cette correction ne modifie ni les formules ni les données numériques.
- **À vérifier :** nouveaux runs Node/science et Chromium après correctif. Les premiers échecs sont conservés dans l'historique ; aucune validation anticipée.


### Complément scientifique du lot 460–509

- Huit modèles supplémentaires contre-calculés : décharge RC, réactance inductive, puissance du liquide de refroidissement, accélération centripète, mélange d'eau, rendement volumétrique, distance de freinage et perte de charge singulière.
- **16 modèles distincts et 64 comparaisons numériques indépendantes prévus au total** pour le lot, plus vérification des unités, bornes et invariants. Les huit nouvelles valeurs nominales ont été vérifiées mathématiquement avant publication ; les **tests Node complets sont à confirmer en CI**.
- Aucune mission ni équation de production modifiée par ce complément ; le nouveau test ne couvre pas les 34 autres lois, les graphismes physiques ni l'accessibilité réelle.


### Correctif de détection du moteur historique

- [Run 41204779823](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41204779823) : **33 échecs restants sur 2 378 tests**, tous issus du nouveau banc structurel : les 33 missions historiques du lot utilisent directement `src/investigations.js`, sans fichier `batch*.js`. Le test détecte désormais les deux architectures, sans supprimer les vérifications de calcul, bornes, unités et objectifs.
- La recette Node du nouveau commit reste à contrôler ; ne pas déclarer de réception avant résultat.


### Contre-audit de la répartition Chromium

- La première matrice de deux shards s'est avérée **déséquilibrée** : le shard 2 du [run 41204779854](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41204779854) a terminé en 37 s, alors que le shard 1 exécutait encore presque tous les tests de missions. Par défaut, Playwright peut répartir des fichiers entiers, et le catalogue de tests navigateur est concentré dans un seul fichier.
- **Correction ciblée du workflow** : `--fully-parallel --workers=2 --shard=N/2` pour répartir les cas de test, pas seulement les fichiers. Les deux shards doivent réussir. Aucune suppression de scénario ni modification des seuils de validation. La nouvelle exécution doit encore prouver sa réussite.
- [Contrôles scientifiques 41204845404](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41204845404) : **2 387/2 387 tests réussis** sur `3e83ed7e`, [qualité 41204845426](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41204845426) et [recette Node 41204845374](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41204845374) **success**. La recette Chromium du lot 460–509 n'est pas encore confirmée.


## Cycle V2.5 du 31 octobre 2026 — correction Chromium et audit 510–559

- **HEAD initial :** `244fb0ba19deaf07e64416d1be3ccca15a0fb1e2`. La recette précédente [41205005737](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41205005737) était en échec : 2 assertions (bureau/Android émulé) confondaient les deux unités d'axes avec les quatre graduations SVG. Correction du test au commit [244fb0ba](https://github.com/sebromapro-oss/SI-QUEST/commit/244fb0ba19deaf07e64416d1be3ccca15a0fb1e2). Le rendu de production n'a pas été modifié.
- **Lot préparé :** 50 missions supplémentaires 510–559 ; contrôles directs des 50 HTML, 50 valeurs nominales et 150 valeurs de bornes/milieu concordantes avec le moteur ; neuf références physiques indépendantes, 36 contre-calculs numériques. [Rapport](AUDIT_NAVIGATEUR_510_559_20261031.md).
- **Tests ajoutés :** 50 contrôles structurels/numériques, neuf contre-calculs indépendants, invariants, six scénarios Playwright (bureau/Android émulé). **Tests et navigateur du commit de ce lot en attente de verdict CI** ; ne pas annoncer 559/597 avant réussite complète des deux shards.
- **Limites :** tests matériels Android/iPhone, Firefox/Safari, NVDA/TalkBack/VoiceOver, sécurité historique, conformité RGAA/WCAG et validation graphique/scientifique exhaustive non réalisés. Aucun changement AppDeploy ni de l'accueil, des 17 univers ou des données privées. Zéro nouvelle mission ; phase 1 maintenue.
- **Prochaine action :** vérifier les runs du HEAD final, corriger tout échec sans suppression de tests, puis auditer les 38 dernières missions non couvertes si le lot 510–559 réussit ; poursuivre les contre-calculs et la recette physique.


### Complément scientifique du cycle 510–559

- **HEAD de départ :** `5dd18abe89bb9dc5758ea559fbe5719ca8fe9981` ; trois workflows Node/science verts, **2 448/2 448 tests réussis** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41209556579), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41209556628), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41209556568).
- Huit modèles supplémentaires recalculés indépendamment, soit **17 modèles et 68 contre-calculs** sur le lot 510–559. Neuf assertions Node nouvelles (huit modèles et invariants). La nouvelle CI reste à confirmer. Aucune mission créée, aucune application AppDeploy modifiée, aucun changement de l'accueil.


## Cycle V2.5 du 31 octobre 2026 — couverture finale préparée 560–597 (16 h, Paris)

- **HEAD initial distant :** `0854f7d3744c9294e80eb24dc4a144453b779cb8`. La [recette Chromium 510–559, run 41209556550](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41209556550) est **success** sur `5dd18abe` : **559/597 missions** couvertes par la recette navigateur, soit 93,6 %.
- **Audit direct des 38 dernières pages :** 38/38 HTML inspectés (FR, lien d'évitement, objectifs/prérequis, domaine fini, configuration). Aucun défaut structurel relevé lors de cette inspection ; **ce contrôle n'est pas une validation scientifique exhaustive**.
- **Commit scientifique [`6b7b71ff`](https://github.com/sebromapro-oss/SI-QUEST/commit/6b7b71ffff53e6b8acfd30b1fb757bbe1863b280) :** 38 tests structurels, 12 références physiques indépendantes et 1 verrou d'inventaire ; nominal, bornes, unités, NaN/Inf, pas entiers le cas échéant. **3/3 workflows réussis** : [recette 41213742270](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213742270), [science 41213742263](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213742263), [qualité 41213742305](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213742305).
- **Commit navigateur [`3aab4d45`](https://github.com/sebromapro-oss/SI-QUEST/commit/3aab4d45a0decbb6c4e0b0ed702f04a1c13dd81b) :** 38 missions uniques 560–597 ajoutées aux scénarios Playwright bureau et Android émulé ; 3 essais/3 aides, exploration, SVG, corrigé, largeur, erreurs JS, clavier. Les trois workflows Node/science de ce commit sont **success** : [recette 41213763081](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213763081), [science 41213763075](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213763075), [qualité 41213763097](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213763097). La [recette Chromium 41213763068](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213763068) **reste à confirmer sur les deux shards** ; ne pas annoncer 597/597 avant succès.
- **Rapport nominatif :** [AUDIT_NAVIGATEUR_560_597_20261031.md](AUDIT_NAVIGATEUR_560_597_20261031.md), commit [`ea4ee49b`](https://github.com/sebromapro-oss/SI-QUEST/commit/ea4ee49b3c570ff4d51231336cec4fcb06d6f73b).
- **État :** 597 missions existantes, **0 créée** ; couverture navigateur **confirmée 559/597**, 38 soumises à recette ; **26 lois du dernier lot** sans contre-calcul indépendant à ce stade. Le succès Node ne prouve pas l'exactitude de chaque schéma ou simulation.
- **Réserves :** appareils Android/iPhone physiques, Firefox/Safari, NVDA/TalkBack/VoiceOver, RGAA/WCAG, graphisme physique et fidélité temporelle exhaustive, audit historique des secrets non réalisés. Dépôt **public** malgré le libellé « privé » ; progression locale non authentifiée.
- **Préservation :** accueil utilisateur, carte 17 univers, assets, scripts de production, marquage auteur, données privées et historique Git inchangés ; **aucune application AppDeploy ni aucun budget modifié**. Pas de force-push, pas de tests supprimés.
- **Suite :** contrôler le verdict des deux shards Chromium du run 41213763068 et les trois workflows du HEAD documentaire, corriger toute régression, poursuivre la réception scientifique indépendante des 26 autres lois du lot, la validation graphique et l'accessibilité réelle. **Phase 1 maintenue ; phase 2 vers 996 suspendue.**
- **HEAD avant le présent commit de suivi :** `ea4ee49b3c570ff4d51231336cec4fcb06d6f73b`. Le SHA de ce commit de suivi est celui retourné par GitHub.


### Complément de contre-réception scientifique — 38/38 lois du dernier lot

- **Deux commits de tests indépendants supplémentaires :** [`b7485a5a`](https://github.com/sebromapro-oss/SI-QUEST/commit/b7485a5a492d9dc3c4aefa8fe6dfafaf2dff64b0) (+10 lois) et [`5c4b5ba0`](https://github.com/sebromapro-oss/SI-QUEST/commit/5c4b5ba05ec92748835c250d14d7ed4e9ceeef2d) (+16 lois), **en complément des 12 lois du premier commit**. Les 38/38 missions du lot 560–597 disposent désormais de **152 contre-calculs numériques indépendants** sur quatre valeurs admissibles chacune, avec contrôle d'unités et de cohérence du nominal.
- **Preuves Node :** [recette 41213910552](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213910552) **2 536/2 536 tests réussis, 0 échec** ; [science 41213910567](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213910567) et [qualité 41213910653](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213910653) **success** sur `5c4b5ba0`. Le [rapport 560–597](AUDIT_NAVIGATEUR_560_597_20261031.md) a été mis à jour au commit [`4e1d8650`](https://github.com/sebromapro-oss/SI-QUEST/commit/4e1d86502a43c9d12b907468f03e7a03b52c79a5).
- **Rectification du point précédent :** il ne reste plus 26 lois sans contre-calcul dans le dernier lot ; **38/38 ont désormais un test scientifique indépendant**. Cela ne signifie pas que les 597 missions ont été toutes réceptionnées scientifiquement ni que leurs animations sont validées.
- **Recette navigateur :** le [run Chromium 41213763068](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213763068) doit encore terminer **ses deux shards**. Couverture confirmée maintenue à **559/597**, et **597/597 seulement après réussite**. Essais physiques et lecteurs d'écran toujours non réalisés.
- **HEAD avant ce complément de suivi :** `4e1d86502a43c9d12b907468f03e7a03b52c79a5`. Zéro mission nouvelle, aucune modification AppDeploy ni de l'accueil.


### Contrôle SVG et protocole physique — complément du 31 octobre

- **Commit [`d8f19c12`](https://github.com/sebromapro-oss/SI-QUEST/commit/d8f19c12465e74d46674bd2b1d9ea4e8817f6f49) :** 38 tests SVG structurels aux deux bornes et au nominal, soit **114 rendus** ; présence de titre/description/rôle image et absence de NaN/Infinity/undefined. [Recette Node 41214093123](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41214093123) : **2 575/2 575 réussis, 0 échec** ; [science 41214093154](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41214093154) et [qualité 41214093235](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41214093235) **success**.
- **[Protocole MAT-01 à MAT-09](RECETTE_PHYSIQUE_ACCESSIBILITE_V2_5.md)** publié au [commit `8e3e7d4b`](https://github.com/sebromapro-oss/SI-QUEST/commit/8e3e7d4b11053e093de893c4616a4456e7ff5cb1). **Toutes les vérifications physiques et lecteurs d'écran restent non réalisées** ; ce document ne vaut pas recette.
- **Bilan du lot final :** 38/38 contre-calculs indépendants (152 points), 38/38 SVG contrôlés structurellement (114 rendus), 38/38 HTML inspectés ; **597 missions conservées, zéro créée**. Recette Chromium du dernier lot toujours à confirmer sur les deux shards du [run 41213763068](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213763068) ; ne pas annoncer 597/597 avant succès.
- **Réserves :** géométrie et animation physiquement exactes, accessibilité RGAA réelle, sécurité et authentification non réceptionnées ; dépôt public, progression locale non authentifiée. **Phase 1 maintenue, phase 2 suspendue**. Aucune modification AppDeploy, accueil, carte 17 univers, auteur, secrets ou budget.
- **HEAD avant le présent commit documentaire :** `d8f19c12465e74d46674bd2b1d9ea4e8817f6f49`.


## Cycle V2.5 du 31 octobre 2026 — clôture de la couverture Chromium et correction de la CI

- **HEAD initial vérifié :** `e6f5e6f3311b39df53c0e70654914170bc5f75a1`. Les trois workflows Node/science de ce SHA sont **success** : [recette Node 41214192731](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41214192731), [science 41214192693](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41214192693), [qualité 41214192971](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41214192971). Le registre précédent indique **2 575/2 575 tests** sur ce HEAD.
- **Dernier lot navigateur 560–597 :** [run Chromium 41213763068](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41213763068) **completed/success**, vérifié après achèvement des **deux shards** (`browser-recipe (1)` et `browser-recipe (2)`, tous deux `success`). Le dernier lot de 38 missions est donc confirmé dans la recette Chromium ; la **couverture cumulative déclarée des lots est 597/597**. Cette conclusion porte sur les scénarios automatisés de navigation et d'interaction, **pas** sur une certification scientifique, graphique ou RGAA individuelle.
- **Cause racine de CI identifiée :** le workflow navigateur ne surveillait qu'une sélection de fichiers `src/`. Une modification de `src/investigations.js`, `src/investigation-diagrams.js` ou `src/batch*.js` pouvait ainsi laisser la recette Chromium **non déclenchée**, malgré un moteur physique ou graphique modifié.
- **Correctif publié :** [commit `0b369101`](https://github.com/sebromapro-oss/SI-QUEST/commit/0b36910178e867aa17a90288f7c854cfb5bb120c) ; le filtre surveille maintenant **`src/**`** et conserve accueil, assets, missions, tests navigateur et workflow. Un test Node `tests/ci-browser-trigger.test.cjs` interdit la régression de cette couverture de chemins et de la répartition en deux shards. **Aucun calcul, scène, page d'accueil ou mission de production n'a été modifié.**
- **CI du correctif :** [run navigateur 41218392128](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41218392128) déclenché, **verdict à confirmer** ; les workflows Node/science du nouveau SHA doivent également être contrôlés. Ne pas transposer automatiquement la réussite du HEAD précédent à ce commit.
- **Sécurité et exploitation :** dépôt confirmé **public** par l'API GitHub ; branche `main` confirmée **non protégée** au contrôle API. La progression `localStorage` n'est pas authentifiée et les réponses attendues sont dans le client. La protection serveur et les preuves privées relèvent d'une architecture distincte ; toute intégration SI FRANCE est une dépendance à transmettre au pilote AppDeploy. Aucune dépense, modification AppDeploy, création de mission, suppression de test ni réécriture de l'historique.
- **Réserves inchangées :** vérification indépendante exhaustive des 597 équations et animations, examen visuel individuel, audit complet de l'historique et des secrets, Firefox/Safari, smartphones physiques, NVDA/TalkBack/VoiceOver et conformité RGAA/WCAG. **Phase 1 maintenue ; phase 2 vers 996 suspendue.**
- **Prochaine action :** confirmer les quatre workflows sur le commit de correction ; si un échec apparaît, diagnostiquer sans diminuer les assertions. Ensuite prioriser l'audit des secrets et des schémas physiques, puis la recette matérielle. Le SHA de ce commit documentaire doit être contrôlé séparément.

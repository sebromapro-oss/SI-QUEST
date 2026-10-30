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

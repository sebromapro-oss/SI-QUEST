# SI QUEST V2.3 — Audit et production 378–382

**Date :** 28 octobre 2026. **Dépôt :** `sebromapro-oss/SI-QUEST` privé, branche `main`.
**HEAD initial observé :** `012fd0dfd38bdfdc5741a4fefc8bd85f9786bfde`.
**Commit correctif historique :** `ed3a4998214b85ebabc39142a06469b294bf2c84`.
**Commit production :** `4296239c4fa51e74f45c8fe55148eadb29ac2c3b`.
**HEAD final :** vérifier la référence distante après l'intégration de ce registre ; ne pas confondre le commit de production et le commit final.

## Phase 0 — conformité et zone protégée
Référentiel `CAHIER_DES_CHARGES_MAITRE.md` V2.3, `EXIGENCES.md`, `PRODUCTION.md`, catalogue, modèles, contrôleur, suites de tests, workflows et HTML de mission consultés. La page d'accueil et ses dépendances `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` conservent les mêmes SHA Git qu'au HEAD initial. Aucune refonte accueil/carte, publication Pages, changement de visibilité, ZIP, force push ou suppression de branche d'archive. Les liens du catalogue sont mis à jour uniquement par ajout de cinq missions.

## Production — cinq questions indépendantes
| N° | Identifiant | Nominal | Unité | Modèle |
|---|---|---:|---|---|
| 378 | `pump-affinity-shaft-power-01` | 2,560 | kW | P₂=P₁(n₂/n₁)³ |
| 379 | `sampling-nyquist-rate-01` | 500 | Hz | fₑ,min=1,25×2fₘₐₓ |
| 380 | `radiation-two-gray-plates-01` | 544,757 | W | Échange radiatif de deux plaques grises, deux émissivités |
| 381 | `shaft-key-allowable-torque-01` | 384 | N·m | Couple admissible fictif d'une clavette en cisaillement |
| 382 | `sensor-4-20ma-pressure-01` | 12,500 | MPa | Inversion d'une calibration 4–20 mA |

Les cinq questions et les cinq sous-savoirs associés sont distincts **entre eux** ; les libellés de sous-savoirs réemploient des catégories du référentiel pour conserver la cible de 249. Chaque mission possède contexte professionnel, objectifs, prérequis, trois questions flash, hypothèses et domaine, unités, modèle pur, corrigé détaillé conditionnel, trois essais, trois aides, sauvegarde, décision fictive, SVG 2D paramétrique et graphique calculé. Modèles statiques ou stationnaires : aucune animation temporelle ni 3D revendiquée.

## Audit historique prioritaire 40–75
Les 36 missions ont été relues et testées sur leurs paramètres minimum, nominal et maximum, dans le moteur JavaScript réel exécuté en V8 : **108/108 calculs finis**, **108/108 SVG structurels**, **72/72 rejets de NaN et Infinity**. Ces vérifications structurelles ne sont pas une contre-expertise exhaustive de la physique des 36 missions.

Deux anomalies **P2 pédagogiques** corrigées dans le code et couvertes par `tests/historical-resultant-torsion-pedagogy.test.cjs` :
- `resultant-01` : objectifs, prérequis, trois questions flash, repère orthogonal, distinction composantes/module et rappel qu'une résultante non nulle n'est pas un équilibre. Contre-calcul : √(300²+400²)=500 N.
- `torsion-01` : objectifs, prérequis, trois questions flash, hypothèses de torsion élastique, unités et relation en diamètre. Contre-calcul : 16×120/(π×0,030³)=22,635 MPa.

**15 missions historiques** n'ont pas encore trois questions flash directement écrites dans leur HTML. Le contrôleur peut en injecter ; la recette visuelle individuelle reste ouverte. Aucun défaut P0 nouveau n'a été identifié dans les contrôles ciblés ; l'absence de défaut découvert ne prouve pas l'absence de défaut.

## Tests et preuves
| Contrôle | Résultat | Preuve / portée |
|---|---|---|
| Contre-calculs indépendants des cinq modèles, min/nominal/max | **15/15 PASS** | V8, implémentations distinctes |
| SVG des cinq modèles synchronisés | **15/15 PASS** | V8, structure et échelle de résultat |
| Paramètres invalides rejetés | **20/20 PASS** | V8, hors domaine/NaN/Infinity |
| SVG avec résultat désynchronisé rejetés | **5/5 PASS** | V8 |
| Deux suites CJS 378–382 avec adaptateur V8 | **11/11 PASS, 239 assertions** | Modèles, catalogue, DOM simulé, trois essais/aides, corrigé, étoiles, sauvegarde |
| Historique 40–75 | **108/108 calculs, 108/108 SVG, 72/72 invalides PASS** | V8, 36 missions, 3 états |
| Dépendances des nouvelles pages | **160/160 références présentes**, ordre correct, zéro doublon | 32 scripts × 5 pages, vérification statique |
| Catalogue | **382/382 identifiants uniques, 382/382 liens présents, 17/17 univers, 249 sous-savoirs explicites distincts** | Arbre Git et catalogue réellement chargés en V8 |
| GitHub Actions / Node natif | **BLOCKED** | Runs de production en échec avant étape de test |
| Recette visuelle sur navigateurs réels | **NOT RUN** | Aucune capture ou preuve |
| Windows, Mac, Android, iPhone réels | **NOT RUN** | Aucun appareil vérifié |
| NVDA, TalkBack, VoiceOver | **NOT RUN** | Aucune réception manuelle |

### Blocage CI
Sur le commit de production, quatre workflows push ont conclu à `failure` : `40714662462`, `40714662405`, `40714662327`, `40714662335`. Les runs Node (`40714662335`) et scientifique (`40714662405`) ont été relancés : **tentative 2 en échec**. Le job Node a `steps=null`, la consultation des étapes retourne une liste vide et le téléchargement du journal retourne HTTP 404 `BlobNotFound`. Les tests Node natifs ne sont pas déclarés exécutés. La cause amont exacte n'est pas déterminée et ne doit pas être imputée au code sans preuve.

### Réception S/G/P/F/A
- **S : PASS ciblé** (cinq modèles, trois cas, invariants et rejets) ; réception scientifique exhaustive **NOT RUN**.
- **G : PASS structurel** (SVG et synchronisation) ; inspection visuelle **NOT RUN**.
- **P : PASS ciblé** (trois questions flash, essais/aides et DOM simulé) ; classe réelle **NOT RUN**.
- **F : PASS ciblé V8** (calculs, DOM simulé, sauvegarde) ; CI native **BLOCKED**, navigateur réel **NOT RUN**.
- **A : contrôles sémantiques partiels** ; tests lecteurs d'écran **NOT RUN**.

**État de réception :** cinq missions créées et testées automatiquement de manière ciblée, **non validées définitivement**. Restent 614 missions à créer pour la cible 996, 97 missions historiques sans sous-savoir explicite à classifier, 15 pages 40–75 sans questions flash natives et la recette complète S/G/P/F/A à établir.

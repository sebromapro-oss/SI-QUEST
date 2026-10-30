# SI QUEST V2.3 — Registre de cycle 563–567

Date : 30 octobre 2026 (Europe/Paris). Dépôt : privé `sebromapro-oss/SI-QUEST`, branche `main`.
HEAD distant initial : `0d49a3f017a5106b6fbbf6fe1c7e1f71a4825672`.
HEAD avant création du registre : `fa806497619da6330673b9fc815e43008bd694ec`. Le SHA final est celui du commit de ce registre, à contrôler séparément.

## Phase 0 — Sécurité et état initial
- Lecture du cahier maître V2.3, d'EXIGENCES.md, PRODUCTION.md, du catalogue, des moteurs, des pages et des tests.
- Dépôt privé confirmé ; 562 entrées initiales, 17 univers ; branche `main` relue avant intégration.
- Fichiers de la nouvelle page d'accueil `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` : aucune modification dans la comparaison depuis le SHA initial.
- Aucun ZIP, aucune modification de carte, aucun GitHub Pages, aucune suppression de branche archive, aucun force push.

## Chantier A — Audit des 36 missions historiques 40–75
Les 36 pages du registre `tests/historical-40-75-independent.test.cjs` ont été lues. Vérification structurelle des trois questions flash et des quatre métadonnées de traçabilité `subskill`, `objective`, `prerequisites`, `successCriteria`.

Constat : 21/36 configurations présentaient au moins une métadonnée pédagogique absente (P2). Cinq corrections ciblées ont été appliquées, par reprise des contenus visibles existants, sur :
- `sampling-01`
- `efficiency-chain-01`
- `rolling-load-01`
- `heat-transfer-01`
- `measurement-relative-01`

Contre-audit des cinq pages : 5/5 métadonnées complètes et 5/5 jeux de trois questions flash PASS. Il reste 16 configurations à compléter (P2 ouvert).

Contre-calculs des 36 modèles sur trois états chacun dans V8, avec références du test historique : **108/108 PASS**. Génération SVG associée : **108/108 PASS** (titre, description, valeurs finies). Ce contrôle ne vaut ni recette visuelle ni réception scientifique contradictoire exhaustive.

## Chantier B — Cinq missions indépendantes réellement créées
| Identifiant | Univers | Question | Référence nominale |
|---|---|---|---|
| `rotor-balance-correction-mass-01` | SI-11 | Masse de correction d'un balourd statique | 4,00 g |
| `combined-axial-bending-stress-01` | SI-04 | Contrainte normale maximale par traction + flexion | 10,78125 MPa |
| `timer-pwm-fast-frequency-01` | SI-09 | Fréquence d'un compteur PWM rapide | 250 Hz |
| `spur-gear-transverse-contact-ratio-01` | SI-05 | Rapport de conduite de dentures droites à développante | 1,674705 (sans unité) |
| `magnetic-gap-maxwell-force-01` | SI-08 | Force normale magnétique idéale d'entrefer | 14,323945 N |

Chaque page contient situation métier, objectif, prérequis, trois questions flash, hypothèses, formule, domaine, tolérance, décision fictive, corrigé en cinq étapes, SVG 2D et graphe paramétrique. Les trois essais, trois aides, récompenses et sauvegarde s'appuient sur `src/investigation-mission.js`. **Le fonctionnement DOM réel n'a pas été réceptionné**. Les scènes sont statiques, sans simulation 3D ni animation temporelle ; la récompense animée mutualisée reste distincte.

Correction P1 mutualisée préalable : le contrôleur reconnaît désormais l'unité discrète `comptes` pour les pas entiers de TOP (499, 749, 999, 1249, 1499, 1749, 1999), évitant l'évaluation de valeurs non admissibles dans la courbe initiale. Test de non-régression ajouté.

## Tests effectivement exécutés
| Preuve | Résultat |
|---|---|
| V8 : cinq modèles × trois états et références indépendantes | 15/15 PASS |
| V8 : SVG, valeurs finies et cohérence numérique | 15/15 PASS |
| V8 : rejets de six entrées invalides par modèle | 30/30 PASS |
| V8 : géométrie balourd, cercles primitifs, vecteurs magnétiques | 3/3 PASS |
| V8 : 36 historiques × trois références | 108/108 PASS |
| V8 : 36 historiques × trois SVG | 108/108 PASS |
| Cinq nouvelles pages : configuration, trois flash, scripts, retour accueil | 5/5 PASS structurel |
| Cinq historiques corrigées : métadonnées | 5/5 PASS structurel |
| Catalogue : identifiants uniques | 567/567 PASS |
| Univers représentés | 17/17 PASS |
| Tests natifs `node --test` du dépôt | NOT RUN (environnement de dépôt non monté localement) |
| CI GitHub Actions du SHA courant | NOT VERIFIED / BLOCKED : aucun run de push vérifiable via l'interface de consultation disponible |
| Recette navigateur, rendu visuel, mobile, tactile | NOT RUN |
| Tests matériels Windows/Mac/Android/iPhone | NOT RUN |
| NVDA, TalkBack, VoiceOver | NOT RUN |

Les contrôles V8 ci-dessus sont des exécutions de code et d'assertions ciblées ; les fichiers de tests Node ont été écrits, mais **leur exécution native n'est pas revendiquée**. Les API de consultation renvoient une liste vide pour les runs et les statuts du SHA interrogé ; cela ne prouve ni succès ni échec du CI. Aucun journal exploitable du nouveau commit n'a été obtenu.

## Statuts S/G/P/F/A — nouvelles missions
| Domaine | Statut | Périmètre prouvé |
|---|---|---|
| S scientifique | PASS ciblé | Trois états, dimensions, références contradictoires, invalides |
| G graphique | PASS structurel ; visuel NOT RUN | SVG calculés, géométrie ciblée, graphes synchronisés |
| P pédagogique | PASS structurel ; parcours NOT RUN | Objectifs, flash, aides et corrigés présents dans code |
| F fonctionnel | PASS V8 ciblé ; DOM/CI BLOCKED | Calculs et catalogue, pas d'interaction navigateur |
| A accessibilité | NOT RUN | Aucune preuve de lecteur d'écran ni recette matérielle |

Statut de réception des cinq missions : **codées et contrôlées automatiquement de façon ciblée ; NON VALIDÉES**.

## Écarts ouverts et suites
- P1 : blocage de preuve CI et exécution native Node ; diagnostiquer workflows/runners et obtenir des journaux.
- P2 : 16 configurations historiques 40–75 encore incomplètes sur les métadonnées pédagogiques.
- P2 : taxonomie du catalogue : 444 libellés de sous-savoirs distincts et 56 missions sans sous-savoir explicite ; réconciliation nécessaire avec les 249 sous-savoirs canoniques, sans fusion arbitraire.
- P1 : réceptions navigateur, mobile, animations et accessibilité non exécutées ; ne pas déclarer les missions validées.
- La protection de l'accueil, la gratuité et le dépôt privé restent impératifs pour les prochains cycles.

# SI QUEST V2.3 — Registre scientifique et pédagogique 413–417
**Date : 28 octobre 2026 — dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`.**

## 1. Traçabilité Git et protection
- HEAD distant initial vérifié : `92924b148d18e628e41925118f0a1c9d342c0ef4`.
- HEAD du code et des tests avant ce registre : `64ca74a9301ba3c5fd520497235a109c56bbb0a1`.
- Comparaison Git : 17 commits descendants, aucune divergence, aucun force push ; 14 fichiers créés ou modifiés avant ce registre.
- Les blob SHA de `index.html` (`94165cccd6ad972a1a57699d5fcf42afde5cca53`), `src/home.js` (`0ead30ab3afe119589f0a14aab99898f0e7721d7`), `src/style.css` (`966e623673ce45c86c2cc6a59a4725406475db10`) et `assets/archipelago-cinematic.svg` (`8d75fd72f75cb662f0d2de1c5a3e1df8ab935347`) sont identiques au HEAD initial.
- Branche `archive/pre-reconstruction-cycle28-20261025` retrouvée ; dépôt privé, sans activation de GitHub Pages ni ZIP.

## 2. Cinq nouvelles missions réellement intégrées
| N° | Identifiant | Question scientifique distincte | Nominal |
|---|---|---|---|
| 413 | `gate-pressure-center-depth-01` | Profondeur du centre de pression sur une vanne rectangulaire verticale totalement immergée | 1,485714 m |
| 414 | `nozzle-exit-mach-subsonic-01` | Mach de sortie d'une buse convergente en détente isentropique subsonique | 0,573723 sans unité |
| 415 | `bredt-closed-tube-torque-limit-01` | Couple admissible d'une section mince fermée par la formule de Bredt | 2 016 N·m |
| 416 | `thermal-exergy-destruction-01` | Exergie détruite par transfert de chaleur entre deux réservoirs thermiques | 1 927,578 J |
| 417 | `threephase-copper-loss-temperature-01` | Pertes Joule de trois enroulements en fonction de la température du cuivre | 667,332 W |

Chaque mission : objectifs, prérequis, trois questions flash, situation métier, hypothèses et domaine, unités, modèle pur, SVG 2D calculé, graphe paramétrique, trois essais/aides et corrigé conditionnel par contrôleur mutualisé, seuil fictif et sauvegarde. Aucune scène 3D ni animation temporelle n'est revendiquée : ces cinq problèmes ne requièrent pas de cinématique 3D.

## 3. Chantier A — 36 missions historiques 40–75
Périmètre identifié de `work-01` à `inductor-energy-01` inclus, 36 identifiants. Lecture des pages et contrôle en V8, par trois lots de 12 :
- 108/108 calculs finis aux valeurs minimale, nominale et maximale.
- 108/108 SVG structurés sans NaN ni Infinity.
- 72/72 rejets des entrées NaN/Infinity.
- Questions flash : **34/36 initialement**, puis correction de `hydro-force-02` et `beam-defl-01` ; **36/36 après contre-essai**.
Ces contrôles ne sont pas des contre-calculs scientifiques indépendants exhaustifs des 36 modèles.

## 4. Anomalies reproduites et corrigées
| Priorité | Anomalie | Correction | Preuve ciblée |
|---|---|---|---|
| P2 | `hydro-force-02` : pas de réactivation, hypothèses génériques, tolérance non contextualisée | Trois questions flash, repère, limites, tolérance ±100 N et corrigé détaillé | HTML et modèle nominal, contre-test V8 |
| P2 | `beam-defl-01` : pas de réactivation, hypothèses génériques, tolérance non contextualisée | Trois questions flash, encastrement et formule explicites, tolérance ±0,005 mm et corrigé | HTML et modèle nominal, contre-test V8 |
| P2 | `pneumatic-consumption-01` : titre ambigu entre volume balayé et consommation d'air libre | Titre « Volume géométrique balayé » et rappel de la nécessité des pressions absolues | HTML, catalogue et modèle inchangé |
| P1 | Mission 413 : pointe de la résultante hydrostatique initialement orientée à contre-sens | Flèche de pression orientée vers la droite et placée à y_P | Test de coordonnées et de sens V8 |
| P1 | Mission 413 : largeur/hauteur de la vanne et profondeur sans échelle commune | Échelle 60 px/m ; largeur 48 px, hauteur 72 px, y_P=90+60×profondeur | Test géométrique |
| P1 | Mission 415 : proportions initiales du tube non cohérentes avec 120×80 mm | Rectangle 240×160 px (rapport 1,5) | Test géométrique |

## 5. Tests réellement exécutés et limites
- **PASS V8 ciblé** : 15/15 contre-calculs (trois états × cinq modèles), 15/15 SVG, 20/20 rejets hors domaine/non finis, 5/5 SVG désynchronisés rejetés, invariants physiques, géométrie de la vanne et du tube.
- **PASS DOM simulé** : 5/5 parcours avec contrôleur réel (saisie invalide, trois essais, aides, corrigé conditionnel, étoiles et sauvegarde). L'exécution a utilisé un adaptateur V8, **pas** Node natif.
- **PASS historique ciblé** : 108 calculs, 108 SVG, 72 rejets, 36 pages avec trois questions flash après corrections.
- **BLOCKED / non prouvé** : CI native Node sur le SHA final. L'interface connectée ne fournit pas de liste des runs `push` (recherche filtrée sur les pull requests) ; le statut combiné consulté est vide. Les workflows `recette-node.yml` et `si-quest-quality.yml` ont été lus ; leur exécution sur le SHA final n'est pas attestée.
- **NOT RUN** : inspection visuelle individuelle en navigateur, tests Windows/Mac/iOS/Android réels, NVDA, TalkBack, VoiceOver, zoom et navigation clavier sur matériel réel.
- Aucun des cinq nouveaux niveaux n'est déclaré « validé » au sens de la recette complète.

## 6. Réception S/G/P/F/A
| Axe | Statut | Preuve / réserve |
|---|---|---|
| S | PASS ciblé | Contre-calculs indépendants aux trois états, domaines, invariants, unités ; pas de validation physique exhaustive historique |
| G | PASS structurel ; NOT RUN visuel | SVG synchronisés, vecteurs et proportions contrôlés en code ; aucune inspection visuelle réelle |
| P | PASS ciblé | Objectifs, prérequis, questions flash, trois essais/aides, corrigé et décision fictive ; essai en classe NOT RUN |
| F | PASS V8 ciblé ; BLOCKED CI native | DOM simulé et sauvegarde ; Node GitHub Actions non attesté |
| A | NOT RUN | Lecteurs d'écran, zoom et parcours matériel non exécutés |

## 7. Catalogue et suite
- Catalogue JavaScript évalué : **417 identifiants uniques**, **17 univers**, **249 sous-savoirs explicitement distincts**, 579 missions restantes sur 996.
- Les cinq nouveaux liens de mission existent et leurs HTML ont été lus ; ce cycle n'a pas rechargé individuellement les 412 autres pages.
- Priorités : obtenir la preuve des workflows natifs, puis recettes visuelles et matérielles ; poursuivre les missions indépendantes sans modifier l'accueil.

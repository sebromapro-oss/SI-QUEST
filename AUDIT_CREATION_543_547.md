# SI QUEST V2.3 — Cycle 543–547 — 30 octobre 2026

## Dépôt et protection
Dépôt privé sebromapro-oss/SI-QUEST, main ; HEAD initial 16143598b499557811d6c5716acb8d913a8597d2. Cahier V2.3, EXIGENCES, PRODUCTION, catalogue, modèles, contrôleur, tests et workflows relus. Fichiers protégés intacts : index.html, src/home.js, src/style.css, assets/archipelago-cinematic.svg. Pas de ZIP, Pages, branche archive ni force push.

## Chantier A : missions historiques 40–75
36 missions historiquement listées dans AUDIT_CREATION_538_542.md ; contrats et tests existants relus. Cinq anomalies P2 de métadonnées pédagogiques corrigées : circular-02, angular-accel-01, brake-torque-01, incline-force-01, resultant-01. Champs objective, prerequisites, successCriteria recopiés fidèlement des pages visibles, sans changer les lois ni les graphismes. Test de non-régression ajouté. La revue documentaire ne remplace pas l'exécution indépendante exhaustive des 36 cas : NOT RUN pour cette partie dans le présent cycle.

## Chantier B : nouvelles missions indépendantes
| N° | ID | Référence nominale |
|---|---|---|
| 543 | bolt-joint-external-load-share-01 | 1 kN |
| 544 | journal-bearing-viscous-torque-01 | 0.29452431 N·m |
| 545 | diesel-fuel-thermal-density-01 | 821.04228 kg/m³ |
| 546 | pi-integrator-antiwindup-clamp-01 | 8.2 % |
| 547 | thin-lens-inspection-magnification-01 | 0.33333333 sans unité |

Cinq modèles distincts : partage de surcharge vis/assemblage ; couple visqueux Couette cylindrique ; densité du carburant à masse constante ; écrêtage de l'intégrateur PI ; grandissement optique d'une lentille mince. Chaque mission : contexte, objectifs, prérequis, flash ×3, domaine, unités, modèle pur, SVG 2D paramétrique, graphe, corrigé conditionnel, trois essais/aides et sauvegarde mutualisée, décision fictive. Schémas 2D statiques : animation temporelle NOT APPLICABLE pour les quatre modèles stationnaires ; pour le PI, un seul pas discret est illustré et la simulation temporelle complète NOT RUN.

## Contrôles
V8 JavaScript exécuté sur les cinq modèles avec trois états (min/nominal/max) et cinq références indépendantes : 15/15 PASS ; SVG synchronisés 15/15 PASS ; rejets désynchronisation 15/15 PASS ; six invalides par modèle 30/30 PASS. Tests Node ajoutés mais exécution Node native NOT RUN. Recette navigateur, appareils, NVDA/TalkBack/VoiceOver NOT RUN. CI GitHub Actions : vérifier les runs du SHA final ; workflows historiques échouent avant attribution de runner, cause non démontrée. Un catalogue au nombre 547 est attendu, à vérifier après commit.

| Axe | Statut | Preuve |
|---|---|---|
| S | PASS ciblé | 15 calculs contradictoires et 30 rejets invalides V8 |
| G | PASS structurel | 15 SVG et 15 rejets désynchronisation ; inspection visuelle NOT RUN |
| P | PASS structurel | 5 × 3 flash, corrigés, cinq métadonnées historiques corrigées |
| F | PASS V8 ciblé ; CI BLOCKED | tests Node/DOM et navigateur NOT RUN |
| A | NOT RUN | lecteurs d'écran et matériel non testés |

Statut : missions CODÉES et contrôlées scientifiquement de façon ciblée, NON VALIDÉES en réception complète. Taxonomie canonique 249 sous-savoirs toujours à réconcilier ; 56 entrées anciennes sans sous-savoir explicite au catalogue signalées au cycle précédent.

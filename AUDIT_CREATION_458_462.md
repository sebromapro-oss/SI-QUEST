# SI QUEST V2.3 — Production et contre-audit 458–462

**Date : 29 octobre 2026.** Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`. HEAD initial réel : `263714a9a3f0ca793396608ad8c753272d864a7f`. HEAD après code et tests : `85db85b5f172134ba7fd821118df553ec682b330`. Un commit supplémentaire ajoute ce registre.

## Périmètre et fichiers
- Modèle et schémas : `src/batch458-462.js`.
- Cinq pages : `missions/elbow-minor-pressure-loss-01.html`, `missions/spherical-shell-thermal-resistance-01.html`, `missions/mohr-plane-principal-stress-01.html`, `missions/transformer-shortcircuit-current-01.html`, `missions/annular-clearance-leakage-01.html`.
- Catalogue : `src/catalog.js`.
- Non-régression : `tests/batch458-462.test.cjs`.
- Correctif historique : `src/investigations.js` (Reynolds : paramètres nommés μ=0,040 Pa·s, D=0,008 m).

## Résultats nominaux (contrôles contradictoires en JavaScript V8)
| Mission | Sous-savoir / calcul | Résultat nominal |
|---|---|---:|
| 458 | Perte de charge singulière, Q=40 L/min | 0,03370618 bar |
| 459 | Résistance thermique d'une coque sphérique, r2=80 mm | 14,92077591 K/W |
| 460 | Contrainte principale maximale, τxy=40 MPa | 100,000 MPa |
| 461 | Court-circuit triphasé symétrique, uk=6 % | 2405,6261 A |
| 462 | Fuite dans un jeu annulaire, h=50 µm | 0,14726216 L/min |

## Audit historique 40–75
36 pages relues en deux lots de 18, sur le code distant, avec trois états (min, nominal, max) par mission.
- **36/36 PASS** : trois questions flash et cohérence résultat nominal/configuration.
- **108/108 PASS** : résultats finis et SVG structurés sans NaN/Infinity.
- **108/108 PASS** : rejet d'une désynchronisation volontaire.
- **P2 corrigée** : la formule Reynolds utilisait deux littéraux non nommés dont le produit était numériquement correct, mais dont l'association à la viscosité et au diamètre était ambiguë. Les constantes `rho=850, mu=0.040, D=0.008` rendent la traçabilité conforme à l'énoncé. Valeur nominale inchangée : Re=1127,3475 à 20 L/min.
- **P1 corrigée avant catalogue** : un identifiant initialement envisagé pour l'ailette existait déjà ; le doublon a été écarté et remplacé par une mission scientifiquement différente sur la conduction sphérique. La mission historique `straight-fin-efficiency-01` reste présente. Test anti-doublon ajouté.
- **P2 corrigée** : homogénéité dimensionnelle du corrigé de conduction sphérique clarifiée (4πλ en W/(m·K), 1/r en m⁻¹, R en K/W).

## Tests effectivement exécutés
- **15/15 PASS** : cinq modèles, min/nominal/max, avec calculs de référence séparés.
- **15/15 PASS** : SVG générés et géométrie numérique synchronisée.
- **15/15 PASS** : SVG désynchronisés volontairement rejetés.
- **20/20 PASS** : NaN, Infinity et valeurs hors domaine rejetés.
- **36/36 PASS** : questions flash historiques ; **108/108 PASS** pour calculs/SVG/désynchronisations historiques.
- **5/5 PASS** : pages HTML nouvelles, trois questions flash et configuration nominale vérifiées.
- **462/462 PASS** : identifiants uniques ; **17/17** univers représentés.
- Le fichier `tests/batch458-462.test.cjs` est créé et sa syntaxe contrôlée, mais **l'exécution native Node de cette suite est NOT RUN**. Les tests V8 ciblés ne remplacent pas Node.
- **CI GitHub Actions : BLOCKED**. La consultation des exécutions par SHA ne retourne aucune exécution exploitable pour les commits `main` (connecteur limité aux événements PR), et les statuts combinés sont vides. Impossible de consulter des jobs, télécharger des journaux ou relancer un run identifié : aucune réussite CI revendiquée.
- **Navigateur visuel : NOT RUN.** **Android/iPhone/Windows/Mac : NOT RUN.** **NVDA/TalkBack/VoiceOver : NOT RUN.** **Interaction DOM complète : NOT RUN** pour ce lot.

## Réception S/G/P/F/A
| Axe | État | Portée |
|---|---|---|
| S | PASS ciblé | Calculs, unités, domaines et propriétés ; audit indépendant complet à poursuivre |
| G | PASS structurel ; NOT RUN visuel | SVG synchronisés ; inspection graphique navigateur non réalisée |
| P | PASS structurel | Objectifs, prérequis, 3 flash, 3 essais/aides mutualisés, corrigés, décisions ; observation élève non réalisée |
| F | PASS V8 ciblé ; BLOCKED CI | Modèles, fichiers, catalogue ; Node/DOM navigateur non démontrés |
| A | NOT RUN | Matériel et lecteurs d'écran non testés |

## Catalogue et anomalies ouvertes
**462 missions présentes**, **17 univers**, **294 libellés explicites distincts de sous-savoirs**, **97 missions sans champ explicite**. La cible contractuelle est **249 sous-savoirs canoniques** : **P2 ouverte**, nécessitant une taxonomie canonique sans fusion scientifique abusive. Il reste **534 missions à produire** pour atteindre 996 entrées, sans préjuger de leur validation.

**P1/P2 ouverts** : absence de CI native probante, réception visuelle/matérielle/accessibilité, et chargement de 48 scripts par nouvelle page à mesurer sur mobile. Les cinq missions sont **codées et contrôlées automatiquement de manière ciblée**, non « validées » au sens du cahier des charges.

## Sécurité du dépôt et page d'accueil
Fichiers protégés et SHA de blobs inchangés : `index.html` `94165cccd6ad972a1a57699d5fcf42afde5cca53`, `src/home.js` `0ead30ab3afe119589f0a14aab99898f0e7721d7`, `src/style.css` `966e623673ce45c86c2cc6a59a4725406475db10`, `assets/archipelago-cinematic.svg` `8d75fd72f75cb662f0d2de1c5a3e1df8ab935347`. Branche d'archive conservée. Aucun ZIP, aucune publication Pages, aucun force push. Publication privée ≠ réception complète.

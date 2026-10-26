# SI QUEST — Registre V2.3, missions 118 à 122
**Date :** 2026-10-26T11:18:42.378Z (Europe/Paris : UTC+1).  
**Dépôt :** `sebromapro-oss/SI-QUEST`, privé, branche `main`.  
**HEAD initial confirmé :** `33fd8e655c451b7869bc76bde9496d61273ea744`.  
**HEAD de code vérifié avant rédaction du rapport :** `3495cbd74649934bf04c2b955bdcae7e07e913a5`.

## Chantier A — Audit de l'existant
Deux missions de la plage prioritaire 40–75 examinées et corrigées :
- `measurement-uncertainty-01` : **P2 pédagogique** — absence d'objectifs, prérequis et questions flash ; hypothèses génériques sans référence de 50 mm. Ajout de la réactivation et des hypothèses explicites. Modèle `uᵣ = u/50 × 100` : 0,100 mm → 0,200 % (contre-calcul).
- `beam-stress-02` : **P2 pédagogique/scientifique documentaire** — absence de réactivation, d'hypothèses de flexion et de justification des conversions. Ajout de `I = bh³/12`, `ymax = h/2`, des unités et des limites. Contre-calcul : 800 N·m = 800 000 N·mm ; `6M/(40×80²) = 18,75 N/mm² = 18,75 MPa`.

**Anomalies :** 2 P2 constatées, 2 corrigées, 0 P0/P1 découvertes dans ce périmètre. La plage 40–75 **n'est pas intégralement auditée**.

## Chantier B — Production scientifique
| N° | Mission | Sous-savoir distinct | Entrée nominale | Résultat nominal |
|---|---|---|---|---|
| 118 | `flywheel-angular-momentum-01` | Moment cinétique axial | 600 tr/min | 502,655 kg·m²/s |
| 119 | `rc-charge-threshold-01` | Temps de seuil d'une charge RC | 12 V | 3,25779 s |
| 120 | `thermal-clearance-01` | Jeu résiduel et dilatations différentielles | 60 K | 0,670 mm |
| 121 | `venturi-pressure-01` | Bernoulli et continuité dans un Venturi | 30 L/min | 0,011874 bar |
| 122 | `spring-series-01` | Raideur de deux ressorts en série | 10 000 N/m | 6 666,67 N/m |

Les cinq missions disposent d'une page HTML, d'un modèle pur avec domaine et unités, d'un schéma SVG paramétrique, d'une courbe synchronisée, de trois questions flash, des trois essais/aides et du corrigé conditionnel via le contrôleur mutualisé, d'une décision métier à seuil explicitement fictif et de la sauvegarde locale. Le catalogue comporte **122 entrées uniques** ; ce nombre n'est pas un nombre de missions entièrement réceptionnées.

## Preuves exécutées
- **13 tests ciblés** de `tests/audit-cycle-118-122.test.cjs` : **13 PASS, 0 FAIL**, exécutés dans un environnement JavaScript V8 avec substituts contrôlés de `node:test`, `assert` et `fs` ; contre-calculs nominaux et bornes, invalides, propriétés, structure SVG, catalogue, contenus, corrections historiques.
- **17 tests de parcours ciblés** dérivés de `tests/mission-flow-40-59.test.cjs` : **17 PASS, 0 FAIL**, exécutés sous V8 avec DOM et stockage simulés ; trois essais, trois aides, étoiles, déblocage, corrigé conditionnel, persistance, reprise, carnet et réinitialisation.
- **5 modèles** calculés directement et confrontés à des références numériques indépendantes ; bornes et entrées invalides vérifiées. Les tests ont été lancés réellement mais **ne sont pas une exécution native de Node ni une preuve de navigateur réel**.
- Fichiers de tests ajoutés ou complétés dans le dépôt : `tests/audit-cycle-118-122.test.cjs`, `tests/mission-flow-40-59.test.cjs`.
- **GitHub Actions / CI : BLOCKED pour la consultation du résultat** — le connecteur utilisé ne liste pas les runs `push` ; aucun journal de workflow récent n'a pu être obtenu. Ne pas déclarer la CI PASS sans cette preuve.
- **Playwright / inspection visuelle : NOT RUN** pour les cinq nouvelles scènes.
- **Appareils Windows/macOS/Android/iPhone : NOT RUN**.
- **NVDA/TalkBack/VoiceOver, RGAA complet et observation en classe : NOT RUN**.

## Matrice S/G/P/F/A
| Domaine | Statut prouvé | Réserves |
|---|---|---|
| S | PASS — contre-calculs V8, domaines, unités et propriétés ciblées | Revue scientifique exhaustive non réalisée |
| G | PASS — génération et cohérence numérique des SVG vérifiées par code | Inspection visuelle individuelle NOT RUN |
| P | PASS — structure, flash, trois aides, trois essais, corrigés testés en simulation | Observation en classe NOT RUN |
| F | PASS — 17 parcours DOM simulés et 13 tests ciblés | Node CI et navigateurs réels non vérifiés |
| A | PASS — libellés et alternatives structurelles inspectés dans les pages | Navigation clavier réelle, zoom et lecteurs d'écran NOT RUN |

## Sécurité et non-régression
Signatures Git de la page d'accueil **confirmées inchangées** après les modifications :
- `index.html` : `94165cccd6ad972a1a57699d5fcf42afde5cca53`
- `src/home.js` : `0ead30ab3afe119589f0a14aab99898f0e7721d7`
- `src/style.css` : `966e623673ce45c86c2cc6a59a4725406475db10`
- `assets/archipelago-cinematic.svg` : `8d75fd72f75cb662f0d2de1c5a3e1df8ab935347`

Seul `src/catalog.js` a été modifié parmi les dépendances de navigation, afin de référencer les cinq missions ; aucune refonte de l'accueil/carte. Aucun ZIP, publication Pages, changement de visibilité, suppression d'archive ou force push. Les commits ont été effectués directement sur `main` ; SHA distant final à confirmer après ce registre.

## Suite
Poursuivre l'audit individuel des missions 40–75, examiner les SVG au navigateur, récupérer les résultats CI des commits, vérifier les scénarios d'accessibilité sur appareils et poursuivre la production adaptative. **Statut : intégrées et testées partiellement, pas validées intégralement.**

# SI QUEST V2.3 — Registre d'audit et de production 303–307
**28 octobre 2026 — dépôt privé, branche main.**

## Phase 0 — intégrité du dépôt
- HEAD initial lu sur GitHub : `996d5a89fd3e627a5a07b603994274d5f4ca78f7`.
- Cahier maître V2.3, `EXIGENCES.md`, `PRODUCTION.md`, modèles, catalogue, contrôleur, tests historiques et derniers lots lus.
- Le nouveau bandeau d'accueil et sa navigation ont été préservés. SHA de référence et SHA post-publication inchangés : `index.html` = `94165cccd6ad972a1a57699d5fcf42afde5cca53`, `src/home.js` = `0ead30ab3afe119589f0a14aab99898f0e7721d7`, `src/style.css` = `966e623673ce45c86c2cc6a59a4725406475db10`, `assets/archipelago-cinematic.svg` = `8d75fd72f75cb662f0d2de1c5a3e1df8ab935347`.
- Aucun force push, reset destructeur, ZIP, GitHub Pages, changement de visibilité ou suppression de branche d'archive. Les fichiers de l'accueil ne sont pas dans les changements de ce cycle.

## Chantier A — 40 à 75
- Audit des 36 identifiants exacts de `tests/historical-40-75-exact.test.cjs` : 108/108 états numériques finis et SVG structurels PASS en JavaScript V8, à trois valeurs par mission. Cette preuve **n'est pas** un contre-calcul scientifique indépendant de chaque mission.
- **P2 graphique :** `spring-stiffness-01` représentait une flèche d'effort de longueur fixe malgré F variable (100–500 N), alors que l'allongement de 25 mm reste fixe. La flèche est désormais paramétrée par F, longueur 20/40/60 px pour F=100/300/500 N. Trois contre-essais PASS ; test `tests/historical-spring-force-arrow.test.cjs` ajouté.
- **P1 non-régression :** `tests/batch298-302.test.cjs` contenait un compteur de catalogue fixé à 302 ; correction en seuil minimal et unicité sur la taille réelle. Le nouveau test 303–307 utilise également un seuil minimal et une unicité dynamique.

## Chantier B — missions 303–307
| Numéro | Identifiant | Sous-savoir | Nominal |
|---|---|---|---|
| 303 | `hertz-line-contact-pressure-01` | Pression de Hertz en contact linéique | 252,313 MPa |
| 304 | `sabine-room-reverberation-01` | Réverbération théorique de Sabine | 0,805 s |
| 305 | `brinell-spherical-contact-pressure-01` | Pression moyenne sur calotte sphérique | 2 025,323 MPa |
| 306 | `prandtl-liquid-number-01` | Rapport des diffusivités Pr | 6,9667 |
| 307 | `can-classic-frame-busload-01` | Charge nominale CAN 11 bits | 11,10 % |

Chaque mission : situation métier, objectifs, prérequis, trois questions flash, hypothèses et domaines, modèle pur, calcul, tolérance propre, SVG 2D calculé, graphique verrouillé avant réussite, trois essais, trois aides, corrigé conditionnel, décision fictive et sauvegarde via contrôleur commun. Les scènes sont statiques : aucune animation temporelle ni 3D fictive n'est revendiquée. Les domaines de trames CAN sont entiers dans le modèle et le contrôleur mutualisé.

## Preuves réellement produites
| Domaine | Statut | Évidence et limite |
|---|---|---|
| S scientifique | **PASS ciblé** | 25 états des cinq nouveaux modèles, contre-calculs indépendants (Hertz par largeur b et pression intégrée, Pr par diffusivités, CAN par somme des champs), 26 rejets de cas invalides/désynchronisés ; cohérence des unités contrôlée sur les cinq modèles. |
| G graphique | **PASS structurel / NOT RUN visuel** | 25 SVG valides au contrôle structurel, données paramétriques synchronisées ; aucun navigateur graphique réel ni capture. |
| P pédagogique | **PASS simulé** | 5 parcours DOM simulés : réponse invalide, trois essais, trois aides, corrigé conditionnel, réussite, étoiles et sauvegarde. Pas d'essai avec élèves. |
| F fonctionnel | **PASS V8 ciblé / BLOCKED CI** | Catalogue 307/307 identifiants uniques, 17/17 univers, 210 sous-savoirs explicites ; 5 fichiers HTML présents et contrôleur testé par DOM simulé. Tests Node natifs non exécutés. |
| A accessibilité | **NOT RUN matériel** | Éléments sémantiques et libellés présents dans le HTML ; aucun test manuel clavier sur navigateur, NVDA, TalkBack ou VoiceOver. |

## CI — limite de preuve
Après les commits, la consultation de `get_commit_combined_status` a renvoyé zéro statut et `fetch_commit_workflow_runs` zéro résultat (ce dernier ne couvre pas exhaustivement les runs déclenchés par push). Le connecteur disponible ne permet pas de lister les exécutions push actuelles. **Statut CI = BLOCKED / non vérifiable**, sans affirmation de succès ni d'échec de la CI du présent cycle. Les cycles précédents avaient signalé des jobs GitHub Actions échouant avant attribution d'un runner ; la cause reste ouverte.

## Points ouverts
- P1 : diagnostic de l'infrastructure GitHub Actions et preuve de tests Node natifs.
- P1 : recette visuelle sur navigateurs et appareils (Windows, Mac, iPhone, Android), interactions et accessibilité réelle.
- P2 : tests NVDA, TalkBack et VoiceOver avec journal reproductible.
- P2 : contre-audit scientifique indépendant complet des 36 missions historiques ; les 108 états actuels prouvent seulement finitude et structure SVG.
- Les 97 missions anciennes sans sous-savoir explicite restent à classifier. **307 missions au catalogue ne signifie pas 307 missions validées.**

## Sources scientifiques de contrôle
- PEAK-System, description des champs CAN classique : https://www.peak-system.fr/en/savoir-faire/technologies/can
- ISOVER, Technical Insulation Manual 2026, équation de Sabine : https://www.isover.ch/de/documents/technische-dokumentation-documentazione-tecnica-documentation-technique/ti-manual-16-01-2026.pdf
- Hertz, formule du contact linéique : https://mechcodex.com/learn/strength-of-materials/hertzian-line-contact-cylinder-on-cylinder-plane

Révision Git à consulter : le commit contenant ce registre ; le SHA final distant est relevé séparément après publication.

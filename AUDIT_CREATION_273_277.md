# SI QUEST V2.3 — Audit et production 273–277 — 27 octobre 2026

## Phase 0 — sécurité et lecture des exigences
- Dépôt : `sebromapro-oss/SI-QUEST`, **privé**, branche `main` ; lecture et écriture autorisées.
- SHA initial distant vérifié : `c5c4ee42016d9d37318e1185a758628e03f18f2d` ; révision applicative contrôlée : `1167813857df9ec511fa0de4a9f6d6824597524e`.
- Documents lus : `CAHIER_DES_CHARGES_MAITRE.md` V2.3, `EXIGENCES.md`, `PRODUCTION.md`, catalogue, modèles, contrôleurs, schémas, tests, workflows et rapport 268–272.
- Les fichiers d'accueil et de carte sont **intacts** : `index.html` (blob `94165cccd6ad972a1a57699d5fcf42afde5cca53`), `src/home.js` (`0ead30ab3afe119589f0a14aab99898f0e7721d7`), `src/style.css` (`966e623673ce45c86c2cc6a59a4725406475db10`) et `assets/archipelago-cinematic.svg` (`8d75fd72f75cb662f0d2de1c5a3e1df8ab935347`). Aucun changement de navigation, visibilité, branche archive ou GitHub Pages.
- Modifications publiées par commits privés et avancées rapides de `main`, sans force push ni reset destructeur.

## Chantier A — missions historiques 40–75
- **36 missions** examinées en quatre groupes de neuf sur les fichiers réels ; trois états par mission (minimum, nominal, maximum), soit **108/108 PASS** en V8 : résultat fini, résultat nominal conforme au contrat de la mission, titre/description SVG, absence de `NaN`/`Infinity`/`undefined`.
- **P2 graphique corrigée** dans `hydro-annular-force-01` : la flèche de l'effort côté tige conservait une longueur fixe malgré la pression variable. Elle pointe désormais vers la gauche et sa longueur est proportionnelle à p. Pressions de contrôle : 20, 100 et 180 bar, soit **3/3 PASS**. Test de non-régression ajouté dans `tests/historical-hydro-annular-force-arrow.test.cjs`.
- Ces 108 états ne constituent ni une inspection visuelle réelle, ni une expertise scientifique exhaustive des 36 missions. Aucun P0 établi par les contrôles ciblés.

## Chantier B — cinq investigations distinctes
| N° | Identifiant | Sous-savoir | Résultat nominal | Décision fictive |
|---|---|---|---|---|
| 273 | `differential-outer-wheel-speed-01` | Vitesse de la roue extérieure en virage sans glissement | **3,300 m/s** (R=8 m) | PASS, plafond 3,45 m/s |
| 274 | `repeatability-sample-std-01` | Écart-type expérimental corrigé sur cinq relevés | **0,015811 mm** (x₅=10,04 mm) | PASS, plafond 0,030 mm |
| 275 | `maintenance-mttr-four-jobs-01` | MTTR descriptif de quatre réparations | **50,00 min** (t₄=70 min) | PASS, plafond 55 min |
| 276 | `ice-latent-fusion-energy-01` | Énergie de fusion isotherme par chaleur latente | **668 kJ** (m=2 kg) | PASS, plafond 700 kJ |
| 277 | `proportional-loop-static-error-01` | Erreur permanente d'une boucle P unitaire | **2,000 K** (Kₚ=2) | FAIL pédagogique, plafond 1 K |

Chaque mission comprend situation métier, objectifs, prérequis, trois questions flash, hypothèses, domaine, unités, modèle pur, résultat nominal, tolérance propre, SVG paramétrique, graphe, trois essais et trois aides, corrigé conditionnel, décision fictive, carnet d'essais et sauvegarde par le contrôleur commun. Modèles stationnaires ou de bilan : pas d'animation temporelle fictive ni de 3D revendiquée.

## Anomalies détectées et corrigées pendant la production
1. **P2 graphique historique** — flèche de force annulaire non proportionnelle à la pression : corrigée, test ajoutée.
2. **P2 graphique nouveau lot** — la cinquième mesure métrologique chevauchait la zone de titre à sa borne haute : échelle verticale corrigée, test de non-régression ajouté.
3. **P2 pédagogique nouveau lot** — corrigé de la chaleur latente insuffisamment détaillé : ajout de la distinction chaleur latente/chaleur sensible, de la vérification des pertes et du dimensionnement.
4. **P1 fonctionnel de recette** — la génération du banc DOM avait remplacé les identifiants des composants par les identifiants des missions : cause corrigée ; cinq parcours simulés rejoués avec succès.
- **4 anomalies corrigées**, aucune anomalie P0 démontrée. Défaut ouvert P1 : CI GitHub Actions indisponible avant exécution.

## Exécution effective et preuves S/G/P/F/A
| Domaine | Statut | Preuves | Limites |
|---|---|---|---|
| S scientifique | **PASS ciblé** | 25/25 contre-calculs à cinq états par modèle, dont identité de variance par paires pour la répétabilité ; 20/20 paramètres invalides rejetés ; contrôles d'unités et invariants | Pas de réception constructeur |
| G graphique | **PASS structurel** | 25/25 SVG synchronisés, contrôles géométriques de rayons, barres, échelles et valeurs ; trois états historiques de pression | Inspection visuelle navigateur : **NOT RUN** |
| P pédagogique | **PASS structurel et simulé** | 15 questions flash, cinq corrigés et décisions, trois essais/aides ; 5/5 parcours DOM simulés | Essais avec élèves : **NOT RUN** |
| F fonctionnel | **PASS V8 simulé / CI BLOCKED** | **14/14 tests ciblés CJS** exécutés en V8 avec adaptateurs Node ; **30/30 contrôles de saisie** (nominal, borne, hors tolérance, vide, texte, infini) ; 277 liens catalogue résolus | Node natif et tests navigateurs : **BLOCKED / NOT RUN** |
| A accessibilité | **NOT RUN** | Structure HTML : labels, rôles, annonces textuelles, alternatives SVG présentes | NVDA, TalkBack, VoiceOver, zoom et appareils réels : **NOT RUN** |

Les 14 tests CJS ont été exécutés dans V8 avec adaptateurs `node:test`, `node:assert/strict` et `fs` sur les fichiers réels. Ils ne prouvent pas l'exécution Node native. Les 30 vérifications de saisie portent sur cinq modèles × six cas.

## CI native — anomalie P1 ouverte
- Sur `1167813857df9ec511fa0de4a9f6d6824597524e`, trois workflows GitHub Actions ont conclu `failure` avant toute étape observable : `40559217907`, `40559217992`, `40559217849`.
- Sur la révision précédente `b23befdc90d86c5f24d5a96f9bb2559896292346`, le workflow Node `40559089911` a été relancé (tentative 2), avec échec de nouveau avant exécution.
- Job Node observé : `122382941052`, `steps=null`, runner non attribué ; récupération du journal : HTTP 404 `BlobNotFound`.
- **Cause exacte indéterminée** : vérifier la disponibilité des runners et les paramètres/quotas GitHub Actions du dépôt. Les tests Node natifs restent **BLOCKED** et ne doivent pas être déclarés PASS.

## Catalogue, réception et suite
- **277 missions HTML, 277 identifiants uniques, 277 liens existants, 17 univers peuplés**.
- **180 sous-savoirs distincts explicitement renseignés**, 97 missions historiques à classifier.
- Objectif inchangé : **17 univers, 249 sous-savoirs, 996 missions**.
- Statut des cinq nouvelles missions : **codées et testées automatiquement de façon ciblée**, mais **non validées** faute de CI native, d'inspection visuelle et de réception sur appareils/lecteurs d'écran.
- Aucune refonte de l'accueil/carte, aucun ZIP, aucune publication GitHub Pages et aucune suppression de branche archive.

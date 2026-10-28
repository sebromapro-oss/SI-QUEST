# SI QUEST V2.3 — Registre de cycle 343–347
**Date : 28 octobre 2026. Dépôt privé : sebromapro-oss/SI-QUEST ; branche : main.**

## 0. Intégrité du dépôt
- HEAD initial distant : `aeb96c971a3ca931870d4387cb3d919dda58b672`.
- Correctif historique publié : `e691e4b3a35d1f7da3d707735cc2c3c2fd107c96`.
- Production scientifique publiée : `b96aa3c467f1f69d3e2f1175e31aba1b6f2adae1`.
- Contrats consultés : `CAHIER_DES_CHARGES_MAITRE.md` V2.3, `EXIGENCES.md`, `PRODUCTION.md`, modèles, catalogue, tests, workflows et contrôleur.
- Accueil et carte protégés, SHA inchangés : `index.html` = `94165cccd6ad972a1a57699d5fcf42afde5cca53` ; `src/home.js` = `0ead30ab3afe119589f0a14aab99898f0e7721d7` ; `src/style.css` = `966e623673ce45c86c2cc6a59a4725406475db10` ; `assets/archipelago-cinematic.svg` = `8d75fd72f75cb662f0d2de1c5a3e1df8ab935347`.
- `src/catalog.js` est une dépendance volontairement mise à jour avec les nouvelles entrées, sans toucher au code de l'accueil. Branche `archive/pre-reconstruction-cycle28-20261025` préservée. Aucun ZIP, force push, GitHub Pages ni changement de visibilité.

## A. Audit historique 40–75
- 36 identifiants, trois états par mission : **108/108 calculs finis PASS**, **108/108 SVG avec titre, description et valeurs finies PASS**, exécutés dans JavaScript V8 sur les moteurs réels, à partir des HTML réels. Contrôle structurel, **pas** contre-calcul indépendant exhaustif des 36 modèles.
- **P1 fonctionnel/scientifique — `gear-mesh-01`** : le moteur acceptait un nombre de dents entier hors du domaine annoncé de 10 à 60. Correction dans `src/investigations.js` : rejets de 9, 61, 40,5, 0, −1, NaN et infini ; contrôles à 10, 40, 60 dents.
- **P2 pédagogique — `gear-mesh-01`** : ajout d'objectifs, prérequis, critères et trois questions flash.
- **P2 graphique — `gear-mesh-01`** : abscisse de courbe « 1 » remplacée par « dents ».
- Non-régression ajoutée : `tests/historical-gear-mesh-domain-pedagogy.test.cjs`. Audit correctif V8 : **15/15 contrôles ciblés PASS**. Aucun autre défaut confirmé par les vérifications structurelles de ce lot.

## B. Production scientifique
| N° | Mission et sous-savoir | Référence nominale | Domaine testé |
|---|---|---:|---|
| 343 | `hydraulic-throttle-temperature-rise-01` — élévation thermique par perte de pression | 4,705882 K | 20–120 bar |
| 344 | `cantilever-uniform-load-tip-deflection-01` — flèche d'une console sous charge répartie | 0,740571 mm | 200–800 N/m |
| 345 | `faraday-flux-rate-emf-01` — module de FEM induite | 1,500 V | 2–12 mWb/s |
| 346 | `planetary-fixed-ring-reaction-torque-01` — réaction de couple à couronne fixe | 180 N·m | 20–100 N·m |
| 347 | `quarter-bridge-linearization-error-01` — écart relatif exact/linéarisé du quart de pont | 0,199601 % | 500–4 000 µε |

Les missions 343–346 introduisent quatre sous-savoirs explicitement nouveaux. La mission 347 constitue **une question indépendante** sur le sous-savoir existant « Sensibilité électrique d'un quart de pont », pour respecter la cible taxonomique de 249 sans inventer un 250e sous-savoir. Les cinq questions ont des modèles et objectifs distincts.

Chaque page contient : contexte métier, objectif, prérequis, trois questions flash, hypothèses, repères, unités, calcul élève, SVG 2D paramétrique, graphe après déverrouillage, trois essais et aides mutualisés, corrigé conditionnel détaillé, critère fictif de décision et sauvegarde locale. Les cinq modèles sont stationnaires ou statiques : pas de fausse animation temporelle ni de fausse 3D.

## Tests effectivement exécutés
- **15/15 références indépendantes PASS** : valeurs basse, nominale et haute des cinq modèles. Références numériques calculées séparément du moteur et fixées dans `tests/batch343-347.test.cjs`.
- **20/20 entrées hors domaine rejetées PASS** ; **5/5 SVG volontairement désynchronisés rejetés PASS**.
- **15/15 échelles de tracé PASS** : hauteur/longueur issue de la même valeur physique que le modèle ; cas limites contrôlés. Déformée de console explicitement amplifiée.
- **11/11 tests CJS exécutés dans un adaptateur V8, 257 assertions PASS**, dont **5/5 parcours DOM simulés** (saisie invalide, trois essais, aides, corrigé, réussite, étoiles, sauvegarde). Ces exécutions utilisent les moteurs et le contrôleur réels, avec accès aux fichiers et DOM simulés. **Elles ne sont pas une exécution Node native ni un navigateur réel.**
- Catalogue contrôlé depuis `main` : **347/347 fichiers HTML**, **347 identifiants uniques**, **347 liens valides**, **17 univers**, **249 sous-savoirs explicitement distincts**, **97 missions historiques sans sous-savoir explicite**. Les dépendances locales des cinq nouvelles pages existent.

## CI native : blocage d'infrastructure non résolu
- Commit de production `b96aa3c...` : quatre workflows déclenchés, tous **FAIL avant toute étape observable** : `40656449945` (accueil), `40656450084` (qualité scientifique), `40656449905` (contrôles scientifiques), `40656450037` (Node).
- Jobs : `steps=[]` ; logs des jobs `122708525443` et `122708525450` indisponibles (HTTP 404 `BlobNotFound`).
- Relance effective des runs `40656450084` et `40656450037` : tentatives 2 **FAIL**, toujours sans étape exécutée. Cause exacte non déterminée ; aucune réussite CI native revendiquée.

## Matrice de réception S/G/P/F/A
| Axe | Statut | Preuve / limite |
|---|---|---|
| S — scientifique | **PASS ciblé** | 15 références fixes indépendantes, dimensions, 20 invalides, 5 invariants ; réception exhaustive **NOT RUN** |
| G — graphique | **PASS structurel** ; visuel **NOT RUN** | 15 SVG et 15 échelles ; aucune capture de navigateur ni vérification visuelle manuelle |
| P — pédagogique | **PASS ciblé** | 3 flash/page, 5 parcours DOM simulés, corrigé conditionnel ; observation élève **NOT RUN** |
| F — fonctionnel | **PASS V8 ciblé** ; CI **BLOCKED** | 5 parcours, 347 liens ; Node natif et navigateur réels non validés |
| A — accessibilité | **PASS structurel partiel** ; manuel **NOT RUN** | Titres, labels, rôles, navigation prévue ; NVDA, TalkBack, VoiceOver, zoom 400 % et tactile matériel **NOT RUN** |

**Réception complète : NON VALIDÉE.** La publication des fichiers et la réussite de tests V8 ciblés ne constituent pas une recette navigateur/matériel. Priorités : lever le blocage GitHub Actions, inspection graphique réelle, tests d'assistance, puis classification scientifique des 97 missions historiques.

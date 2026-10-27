# SI QUEST V2.3 — Audit et production 243–247

**Date : 27 octobre 2026 (Europe/Paris).** Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`.

## Phase 0 — Lecture et protection
- HEAD initial distant : `e30abf6cd41c05d7f7e7b4a1aa30f940cfd1b0d9`. Commit de production publié : `f9b904b87a0a14a54f0793b23e49106edadac208`.
- Cahier des charges maître V2.3, `EXIGENCES.md`, `PRODUCTION.md`, contrôleur, catalogue, modèles, tests et workflows consultés.
- Dépendances de la page d'accueil : `index.html` → `src/catalog.js` et `src/home.js` ; `src/style.css`, `assets/archipelago-cinematic.svg`. Aucun changement de l'accueil, de la carte, des styles, scripts et assets protégés.
- Signatures des fichiers protégés : `index.html` `94165cccd6ad972a1a57699d5fcf42afde5cca53`, `src/home.js` `0ead30ab3afe119589f0a14aab99898f0e7721d7`, `src/style.css` `966e623673ce45c86c2cc6a59a4725406475db10`, `assets/archipelago-cinematic.svg` `8d75fd72f75cb662f0d2de1c5a3e1df8ab935347`.
- Aucun force push, ZIP, GitHub Pages, changement de visibilité ou suppression de branche d'archive.

## Chantier B — Cinq missions indépendantes
| N° | Identifiant | Sous-savoir | Résultat nominal |
|---|---|---|---|
| 243 | `planetary-carrier-speed-01` | Relation de Willis à deux éléments moteurs | 225 tr/min (nᵣ=100 tr/min) |
| 244 | `capacitor-stored-energy-01` | Énergie électrostatique d'un condensateur idéal | 5,4144 J (U=48 V) |
| 245 | `sensor-temperature-drift-01` | Erreur de gain thermique en ppm/K | +43,2 mV (ΔT=+30 K) |
| 246 | `belt-centrifugal-tension-01` | Contribution centrifuge à la tension d'une courroie | 72,0 N (v=12 m/s) |
| 247 | `thermal-penetration-length-01` | Échelle de diffusion thermique transitoire | 48,9898 mm (t=50 s) |

Chaque mission : situation professionnelle, objectif, prérequis, trois questions flash, hypothèses, domaine, repères, unités, modèle pur, calcul, SVG 2D paramétrique, graphe verrouillé, tolérance dédiée, corrigé détaillé, décision fictive, trois essais, trois aides, étoiles et sauvegarde via contrôleur commun. Les animations temporelles ne sont pas inventées pour des modèles statiques/stationnaires. Aucune scène 3D n'est revendiquée.

Les seuils de décision sont **fictifs** ; aucune simulation ne constitue une validation de sécurité, de conception constructeur ou une autorisation d'intervention.

## Chantier A — Audit et correction historique 40–75
- 36 missions historiques contrôlées sur trois états chacune **sur le commit de production** : **108/108 états numériques et structurels SVG PASS en JavaScript V8**. Résultats finis, `title`, `desc`, absence de NaN/Infinity/undefined ; ce n'est pas une recette scientifique ou visuelle exhaustive.
- **P2 graphique corrigée :** `pneumatic-force-01` représentait une flèche d'effort de longueur fixe pour toutes les pressions positives, alors que la surface du piston est constante et que F=pA. La longueur est maintenant proportionnelle à p de 0 à 10 bar, flèche absente à 0 bar ; contre-test 1/5/10 bar PASS.
- **P1 test de production corrigée avant publication :** le premier assemblage du test DOM 243–247 remplaçait les identifiants d'éléments du DOM au lieu de la liste des missions ; correction de la cause et réexécution des cinq parcours. Ce défaut n'a pas été intégré à `main`.
- Anomalie ouverte : CI native **BLOCKED**. Aucune anomalie P0 identifiée par les contrôles ciblés ; l'absence globale d'autres anomalies n'est pas démontrée.

## Tests exécutés et preuves
| Vérification | Statut | Preuve |
|---|---|---|
| Cinq modèles, cinq états et SVG chacun | PASS | 25/25 en V8, références indépendantes |
| Entrées hors domaine et non finies | PASS | 20/20 rejets en V8 |
| Refus des schémas désynchronisés | PASS | 5/5 en V8 |
| Tests scientifiques/structurels du lot avec adaptateurs | PASS | 9/9 cas dans émulation V8 des tests Node |
| Parcours DOM simulés du lot | PASS | 5/5 en V8, trois essais, aides, corrigé, sauvegarde |
| Missions historiques 40–75 | PASS ciblé | 108/108 états en V8 après correction |
| Catalogue | PASS | 247 identifiants uniques / 247 entrées / 17 univers / 150 sous-savoirs explicites |
| GitHub Actions Node natif | BLOCKED | Échec avant toute étape observable |
| Inspection visuelle sur navigateur | NOT RUN | Pas de capture ni de navigation réelle |
| Essais matériels Android/iOS/Windows/Mac | NOT RUN | Aucun appareil réel |
| NVDA, TalkBack, VoiceOver | NOT RUN | Aucun essai lecteur d'écran |

### GitHub Actions — preuve de blocage
Sur le commit `f9b904b87a0a14a54f0793b23e49106edadac208`, quatre workflows ont échoué sans étape de job observable :
- Node : run `40502991084`, job `122185093882`.
- Scientifique : run `40502991224`, job `122185094716`.
- Contrôles scientifiques : run `40502991203`.
- Accueil navigateurs : run `40502991051`.

Relances de Node et du workflow scientifique : tentative 2, échec reproduit. Les jobs présentent `steps=null`, `logs_url=null` ; récupération des journaux Node/science : HTTP 404 `BlobNotFound`. Cause exacte non établie. **Aucun test Node natif ni navigateur n'est déclaré PASS.**

## Réception S/G/P/F/A
| Domaine | Statut | Limite |
|---|---|---|
| S — scientifique | **PASS ciblé** | Calculs et invariants testés ; réception complète non prouvée |
| G — graphique | **PASS structurel / NOT RUN visuel** | SVG et synchronisation vérifiés, pas de contrôle rendu |
| P — pédagogique | **PASS structurel / NOT RUN élèves** | Questions, indices, corrigés, décisions présents, pas d'essai en classe |
| F — fonctionnel | **PASS DOM simulé / BLOCKED CI** | Pas d'exécution Node native ni de navigateur réel |
| A — accessibilité | **NOT RUN manuel** | Contrats présents, aucun essai clavier/lecteur sur appareil réel |

## Catalogue et protection
**247 missions codées**, 17 univers, 150 sous-savoirs explicitement distincts, 97 missions historiques encore non classifiées. Présence au catalogue ≠ réception complète. Différence Git : cinq HTML, moteur du lot, catalogue, diagrammes historiques, trois fichiers de tests. Aucun fichier de la nouvelle page d'accueil n'a été modifié.

**Priorités suivantes :** déterminer la cause de l'échec avant runner dans GitHub Actions, poursuivre la réception visuelle et l'accessibilité réelle, puis classer les 97 missions historiques sans créer de doublons artificiels.

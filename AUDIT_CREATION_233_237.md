# SI QUEST V2.3 — Audit et production 233–237
**Date : 27 octobre 2026 (Europe/Paris).** Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`.

## Traçabilité Git
- HEAD distant initial : `2cda8f4f0a19212b3fb1849b68f01da5044d62a2`.
- SHA du dernier correctif avant ce rapport : `59f110e91e4527ddbfa141ede9a297022110e405`.
- Les commits sont des avances rapides de `main`, sans force push.
- Comparaison Git initial → dernier correctif : seuls 11 chemins modifiés ou ajoutés (cinq HTML de mission, moteur du lot, catalogue, contrôleur et diagrammes mutualisés, deux fichiers de tests). **Aucun fichier de l'accueil, de la carte, de ses styles, scripts ou assets n'a changé.**
- Dépôt privé maintenu ; aucune publication Pages, aucun ZIP, aucune suppression de branche d'archive.

## Cinq missions scientifiques distinctes intégrées
| Identifiant | Sous-savoir | Résultat nominal | Domaine et hypothèse critique |
|---|---|---:|---|
| `shaft-key-shear-stress-01` | Cisaillement moyen d'une clavette | 18,750 MPa pour T=180 N·m | Un plan de cisaillement, charge uniforme, matage non étudié |
| `transformer-winding-copper-loss-01` | Pertes Joule de trois enroulements équilibrés | 300 W pour I=20 A | R=0,25 Ω/phase constante, pertes fer exclues |
| `straight-fin-efficiency-01` | Efficacité d'une ailette droite | 0,760231 pour h=30 W/(m²·K) | Bout isolé, convection uniforme, régime permanent |
| `brake-pad-sector-pressure-01` | Pression moyenne d'un secteur annulaire | 0,122427 MPa pour F=1000 N | Secteur 60°, contact intégral et pression uniforme |
| `hydrostatic-wheel-traction-01` | Effort théorique à la roue après transmission hydrostatique | 3896,113 N pour Δp=120 bar | Rendements fixés ; adhérence, stabilité et vitesse hors modèle |

Chaque mission comprend une situation métier, objectifs, prérequis, trois questions flash, hypothèses, unités et repères, modèle déterministe pur, domaine contrôlé, calcul, SVG 2D paramétrique, graphe déverrouillable, trois essais, trois aides, corrigé conditionnel, décision fictive, carnet et sauvegarde via contrôleur mutualisé. Les états sont statiques ou stationnaires : **aucune animation temporelle artificielle n'a été introduite**. Les 3D ne sont pas revendiquées.

## Audit historique obligatoire : missions 40–75
36 identifiants réels du fichier `tests/quality-gate-40-75.test.cjs` ont été relus depuis le dépôt. Contrôles ciblés en JavaScript V8 sur les paramètres minimum, nominal et maximum : **108/108 états PASS** pour calcul fini, résultat nominal, unités déclarées et SVG structurel (titre, description, dimensions, absence de NaN/Infinity). Il ne s'agit **pas** d'une inspection visuelle, d'une expertise physique complète ou d'une recette d'accessibilité.

## Anomalies reproduites et corrigées
| Priorité | Domaine | Anomalie | Correction et contre-test |
|---|---|---|---|
| P2 | G | `pneumatic-force-01` : étiquette graphique `p = ...` sans unité | Ajout explicite de `bar` dans le SVG, test `p = 4 bar` |
| P2 | P/F | Profil pédagogique de repli générique, ignorant les données propres aux nouvelles missions | Le contrôleur lit désormais `prerequisites`, `objective`, `decision`, `error` si présents ; vérification des cinq configurations |
| P1 | S | Corrigé d'ailette : arrondi textuel initial 0,758 au lieu de 0,760 | Correction de l'étape numérique et test indépendant d'arrondi |
| P1 | F (test) | Assertion des tests du lot exigeant une expression absente du texte HTML | Expression régulière alignée sur la phrase réellement présente, puis réexécution |

Aucune anomalie P0 détectée par les contrôles ciblés ; **ceci n'exclut pas d'autres anomalies non testées**.

## Tests et preuves réellement produits
- **V8 avec adaptateurs, sur le SHA `59f110e...` : 15/15 tests de recette du lot PASS**, dont cinq parcours DOM simulés (saisie invalide, trois essais, aides, corrigé, étoiles, sauvegarde locale).
- **25/25 états scientifiques et SVG PASS**, contre-calculs par expressions indépendantes et contrôle des unités.
- **20/20 entrées hors domaine ou non finies rejetées** ; cas nuls sans flèche de force/courant fictive vérifiés.
- **Catalogue : 237 identifiants uniques, 237 HTML, 17 univers, 140 sous-savoirs explicitement distincts** ; 97 entrées historiques sans sous-savoir explicite à classifier après expertise.
- **CI GitHub Actions : BLOCKED.** Les trois workflows du SHA `59f110e...` ont conclu `failure` avant toute étape observable : `40487090210` (scientifique), `40487090489` (qualité), `40487090294` (Node). Le job Node n'a ni étapes ni logs exploitables (HTTP 404 `BlobNotFound`). La relance du workflow Node (tentative 2) a reproduit l'échec avant exécution. **Aucun test Node natif n'est déclaré PASS.**
- Tests navigateurs, inspection visuelle des SVG, Android/iPhone, NVDA, TalkBack et VoiceOver : **NOT RUN**.

## Statuts S/G/P/F/A
| Domaine | Statut | Portée exacte |
|---|---|---|
| S scientifique | PASS ciblé | Cinq modèles et 36 historiques : contre-calculs, bornes, unités ; pas de réception physique exhaustive |
| G graphique | PASS structurel / NOT RUN visuel | SVG synchronisés et étiquettes ; inspection humaine navigateur non réalisée |
| P pédagogique | PASS structurel / NOT RUN essai élève | Prérequis, flash, corrigés, décisions fictives ; pas d'observation de classe |
| F fonctionnel | PASS V8 simulé / BLOCKED CI native | 5 parcours DOM simulés ; GitHub Actions sans étapes |
| A accessibilité | NOT RUN manuel | Contrats DOM partiels seulement ; NVDA, TalkBack, VoiceOver et matériel non testés |

**Décision de réception :** missions **codées et intégrées**, réception complète **ouverte**. Priorités : lever le blocage de lancement GitHub Actions, vérifier les SVG en navigateur réel, puis tester clavier, tactile, zoom et lecteurs d'écran avec preuves.

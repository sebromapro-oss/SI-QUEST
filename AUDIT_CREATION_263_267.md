# SI QUEST V2.3 — Audit et production 263–267 — 27 octobre 2026

## Phase 0 — dépôt et protection
- Dépôt : `sebromapro-oss/SI-QUEST`, **privé**, branche `main`.
- SHA distant initial : `f80c8e0492163c21fb17e744f6b8c55a1ac5fd01`.
- Révision applicative contrôlée : `a75f09d5b549d6897ebd0ce6bee913864a6097b8`.
- Documents consultés : `CAHIER_DES_CHARGES_MAITRE.md` (V2.3), `EXIGENCES.md`, `PRODUCTION.md`, catalogue, modèles, contrôleur, schémas, tests et workflows.
- Dépendances de l'accueil identifiées : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` ; **aucun de ces fichiers n'a été modifié**. Le catalogue est alimenté par `src/catalog.js` ; seules ses entrées de missions ont été enrichies.
- Aucune modification de visibilité, GitHub Pages, ZIP, suppression d'archive, reset ou force push.

## Chantier A — historique 40–75
36 missions historiques, trois états chacune : **108/108 états numériques et SVG PASS** en JavaScript V8, sur le code du dépôt, avec contrôle de finitude, unités présentes, valeurs nominales et domaines. Ce contrôle n'est pas une recette S/G/P/F/A exhaustive.

Anomalies corrigées :
1. **P1 — Graphique, `frequency-period-01`** : le signal carré dessinait toujours trois cycles quelle que soit la fréquence. Le SVG utilise désormais une fenêtre temporelle fixe de **0,20 s** et un nombre de cycles **f×0,20** ; tests à 5, 25 et 100 Hz.
2. **P1 — Évaluation numérique, `frequency-period-01`** : la tolérance générique ±0,02 s autorisait une erreur de 50 % sur T=0,04 s. Tolérance propre au calcul : ±0,0005 s au nominal (tolérance relative de 0,5 % dans la politique). Réponses 0,0404 s acceptée et 0,06 s rejetée.
3. **P2 — Pédagogie scientifique, `screw-jack-self-locking-01` (258)** : suppression dans le corrigé de la condition arbitraire « marge inférieure à 10° » ; l'autoblocage théorique se fonde sur φ−λ≥0.
4. **P2 — Corrigé du nouveau lot, `vibration-critical-damping-01`** : précision du lien entre amortissement critique et taux réduit ζ=1 après découverte d'une longueur de corrigé insuffisante pour le test contractuel.

Aucune anomalie P0 démontrée par ces contrôles ciblés. Des défauts non détectés peuvent subsister.

## Chantier B — cinq investigations indépendantes
| N° | Identifiant | Sous-savoir | Référence nominale |
|---|---|---|---|
| 263 | `bearing-static-safety-01` | Réserve statique C₀/P₀ d'un roulement | S₀=3,000 (sans unité) |
| 264 | `vibration-critical-damping-01` | Coefficient d'amortissement critique 2√(km) | 4 000 N·s/m |
| 265 | `material-thermal-effusivity-01` | Effusivité √(λρcₚ) | 948,683 W·√s/(m²·K) |
| 266 | `metrology-worstcase-stack-01` | Jeu minimal d'une chaîne de cotes au pire cas | +0,070 mm |
| 267 | `hydraulic-wave-roundtrip-01` | Temps de retour d'une onde de pression | 50,0 ms |

Les cinq pages comportent situation métier, objectif, prérequis, trois questions flash, hypothèses, domaine, modèle pur, calcul avec unités, tolérance propre, corrigé détaillé, décision fictive, SVG 2D paramétrique, courbe calculée, trois essais, trois aides, sauvegarde et interaction tactile/clavier via le contrôleur mutualisé. Modèles statiques ou de propagation à délai scalaire : **pas de simulation 3D ni d'animation temporelle fictive**.

## Preuves réalisées
- **S — PASS ciblé** : cinq modèles, **25 états** comparés à des calculs indépendants, **20 entrées invalides** rejetées, tests de monotonie, d'échelle, de signe et de seuil ; homogénéité des équations contrôlée.
- **G — PASS structurel** : 25 rendus SVG paramétriques, titres, descriptions, unités, synchronisation modèle/rendu ; refus des valeurs désynchronisées. **Inspection visuelle sur navigateur : NOT RUN**.
- **P — PASS structurel et simulé** : 15 questions flash, cinq corrigés, critères fictifs, cinq parcours avec trois essais/aides, corrigé conditionnel. **Essai avec élèves : NOT RUN**.
- **F — PASS V8 simulé** : **14/14 tests ciblés PASS** avec adaptateurs Node/DOM sur le code réel, dont **5/5 parcours DOM simulés** ; sauvegarde, étoiles et blocage des solutions vérifiés. **CI native : BLOCKED**.
- **A — NOT RUN** : aucun test manuel sur Android, iPhone, Windows/Mac, zoom 400 %, NVDA, TalkBack ou VoiceOver. Les attributs HTML/SVG ne constituent pas une preuve de conformité WCAG/RGAA.
- Catalogue contrôlé : **267 identifiants uniques / 267 missions**, 17 univers, **170 sous-savoirs explicitement distincts**, 97 entrées historiques sans classification explicite.

## CI GitHub Actions — blocage documenté
Sur `92d4a54686431d4bebc4a92e4a746e7253baba59`, quatre workflows ont échoué avant toute étape visible :
- Node `40538454527`
- Scientifique `40538454532`
- Qualité `40538454463`
- Accueil navigateur `40538454610`

Les relances Node et scientifique ont échoué de nouveau sans étape ni runner observable. Sur `a75f09d5b549d6897ebd0ce6bee913864a6097b8`, trois workflows ont échoué : Node `40538709298`, contrôles scientifiques `40538709088`, qualité `40538709004`. La relance Node (tentative 2) a échoué avant toute étape ; téléchargement du journal : HTTP 404 `BlobNotFound`.

**Conclusion : CI native BLOCKED, cause non déterminée.** Investiguer les droits/configurations GitHub Actions et l'attribution de runner ; ne pas confondre ces échecs pré-exécution avec un échec de test scientifique.

## Statut de réception
**Cinq missions créées et testées de manière ciblée, aucune reçue définitivement.** Réception navigateur et matériels, lecteurs d'écran et CI native non démontrées. Conserver les preuves et corriger toute anomalie nouvelle au cycle suivant.

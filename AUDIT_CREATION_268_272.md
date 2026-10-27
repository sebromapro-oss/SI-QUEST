# SI QUEST V2.3 — Audit et production 268–272 — 27 octobre 2026

## Phase 0 — dépôt et sécurité
- Dépôt `sebromapro-oss/SI-QUEST` **privé**, branche `main` ; droits de lecture/écriture vérifiés.
- SHA distant initial : `9d7c44c0802a6f8687435bea14d88d850cebec50`.
- Révision applicative finale contrôlée : `c51da8ee2f8c44eb0d09d1f1c82a1123f6d0aa22`.
- Documents lus : `CAHIER_DES_CHARGES_MAITRE.md` V2.3, `EXIGENCES.md`, `PRODUCTION.md`, catalogue, modèles, contrôleur, diagrammes, tests, workflows et rapport précédent.
- Accueil et carte **non modifiés** : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` ; les liens nouveaux sont ajoutés uniquement au catalogue.
- Aucune modification de visibilité, de branche archive, de GitHub Pages ; aucun ZIP, reset destructeur ni force push.
- Écriture Git atomique par objets blob/arbre/commit, puis avance rapide de `main` avec contrôle du SHA attendu ; corrections successives sur le HEAD distant.

## Chantier A — audit historique 40–75
- **36 missions contrôlées** sur trois états chacune : **108/108 PASS** en JavaScript V8 sur les modèles et SVG réels (min/nominal/max, valeurs finies, contrat nominal, titres/descriptions SVG). Trois lots de douze missions.
- **P2 graphique et pédagogique, `efficiency-chain-01` : corrigé.** Les deux étages de transmission n'étaient pas identifiés dans le dessin. Le SVG indique désormais `η₁=0,92`, `η₂` variable et `η global` calculé. Contre-contrôle à η₂ = 0,5 ; 0,9 ; 1.
- Aucun défaut P0 établi dans les contrôles ciblés. L'absence de défaut non détecté n'est pas démontrée.

## Chantier B — cinq modèles scientifiques distincts
| N° | Identifiant | Sous-savoir distinct | Référence nominale | Décision pédagogique fictive |
|---|---|---|---|---|
| 268 | `thinwall-bredt-shear-01` | Flux de cisaillement de Bredt d'une section fermée mince | τ = **10,00 MPa** pour t=2,5 mm | PASS, seuil 12 MPa |
| 269 | `threephase-power-factor-pq-01` | Facteur de puissance à partir du triangle P–Q–S | cos φ = **0,894427** pour Q=6 kvar | PASS, seuil 0,85 |
| 270 | `battery-internal-joule-heat-01` | Pertes Joule dans la résistance interne d'une batterie | P = **320 W** pour I=80 A | PASS, plafond 400 W |
| 271 | `sensor-two-point-sensitivity-01` | Sensibilité d'étalonnage à deux points | S = **40,0 mV/bar** pour V₂=4,5 V | PASS, plage [35 ; 45] mV/bar |
| 272 | `cylinder-critical-insulation-radius-01` | Rayon critique d'isolation cylindrique | rcrit = **4,0 mm** pour h=10 W/(m²·K) | **Critère fictif non respecté** : rcrit > rayon nu 3 mm |

Chaque mission dispose d'un contexte métier, objectif, prérequis, trois questions flash, hypothèses, domaine, équation, modèle pur, unités, SVG 2D paramétrique, graphe, calcul, corrigé détaillé, décision fictive, trois essais/aides et sauvegarde par le contrôleur commun. Les modèles sont statiques/stationnaires : **aucune animation temporelle fictive ni 3D prétendue**.

## Corrections supplémentaires après contre-audit
1. **P1 fonctionnel — banc DOM : corrigé.** Les identifiants des cinq missions avaient remplacé par erreur les identifiants des éléments DOM simulés ; banc réparé.
2. **P1 qualité de test — critère fictif : corrigé.** Le cas nominal du rayon critique est volontairement défavorable (4 mm > 3 mm) ; l'assertion exige maintenant `acceptable=false` au lieu d'imposer PASS à tous les cas.
3. **P2 graphique — étalonnage : corrigé.** Tension V₂ supérieure à V₁ tracée vers le haut, échelle verticale linéaire et proportionnelle.
4. **P2 graphique — batterie : corrigé.** À I=0 A, aucun vecteur de courant ; longueur de flèche proportionnelle à I pour I>0.
5. **P2 graphique — isolation : corrigé.** Rayon du cercle critique proportionnel à rcrit et coïncidant avec le rayon nu exactement lorsque rcrit=3 mm.
- **Total : six anomalies trouvées et corrigées**, dont une historique ; tests de non-régression ajoutés.

## Exécution et preuves S/G/P/F/A
| Domaine | Statut | Preuves réellement obtenues | Limites |
|---|---|---|---|
| S — Scientifique | **PASS ciblé** | 5 modèles × 5 états = **25/25** contre-calculs indépendants ; **20/20** entrées invalides rejetées ; invariants, seuils et unités | Pas de validation constructeur ni expertise exhaustive |
| G — Graphique | **PASS structurel** | 25 rendus SVG paramétriques ; contrôles de désynchronisation et des proportions géométriques ; correction historique | **Inspection visuelle navigateur : NOT RUN** |
| P — Pédagogique | **PASS structurel et simulé** | 15 questions flash ; 5 corrigés ; cinq parcours à trois essais/aides, déverrouillage conditionnel et étoiles | **Essai avec élèves : NOT RUN** |
| F — Fonctionnel | **PASS V8 simulé / CI BLOCKED** | **15/15 tests ciblés PASS**, 13 fichiers JS/CJS compilés, cinq parcours DOM simulés, catalogue 272/272 identifiants uniques | Node natif sur runner GitHub **BLOCKED** |
| A — Accessibilité | **NOT RUN** | Présence structurelle de labels et rôles dans le HTML/SVG | NVDA, TalkBack, VoiceOver, zoom et appareils réels **NOT RUN** |

**Précision sur l'exécution :** les tests ciblés ont été exécutés en JavaScript V8 sur les fichiers réels du dépôt avec des adaptateurs de modules Node et de DOM. Ils ne sont pas des tests Node natifs, des tests navigateur ou des essais sur appareils. Les résultats V8 sont des preuves ciblées et non une réception complète.

## CI GitHub Actions — blocage ouvert P1
Sur la révision applicative `c51da8ee2f8c44eb0d09d1f1c82a1123f6d0aa22`, les workflows ont échoué **avant attribution de runner et avant toute étape** :
- `40549642371` — SI QUEST scientific quality : failure, 0 étape.
- `40549642351` — Contrôles scientifiques SI QUEST : failure, 0 étape.
- `40549643556` — Recette automatisée SI QUEST : failure, 0 étape.

Une relance du job Node de la révision précédente (workflow `40549369252`, tentative 2) a également échoué avec 0 étape et runner vide. Téléchargement du journal : HTTP 404 `BlobNotFound`. **Cause précise non démontrée** ; vérifier les paramètres Actions, disponibilité des runners et éventuelles restrictions de compte. Ne pas déclarer les tests Node natifs PASS.

## Catalogue et réception
- **272 missions / 272 identifiants uniques** ; **17/17 univers**.
- **175 sous-savoirs renseignés et distincts** ; **97 missions historiques sans classification explicite**.
- Objectif : 996 missions, 249 sous-savoirs. Une présence au catalogue ne vaut pas validation.
- Statut des cinq nouvelles missions : **codées et testées automatiquement de façon ciblée ; réception visuelle, appareils et accessibilité non réalisée**.

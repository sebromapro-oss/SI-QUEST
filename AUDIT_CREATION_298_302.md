# SI QUEST V2.3 — Audit et création 298–302
**28 octobre 2026 — dépôt privé, branche main.**

## Phase 0 et protection
HEAD distant initial : `14bd0137513a2b3b899b190996954ef7d0abd9ff`. Cahier des charges maître V2.3, EXIGENCES.md, PRODUCTION.md, catalogue, modèles, contrôleur, tests et workflows consultés. Branche d'archive `archive/pre-reconstruction-cycle28-20261025` présente. Aucune suppression, ZIP, activation GitHub Pages ou modification de visibilité. Les SHA des fichiers `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` sont identiques à ceux du HEAD initial. Les liens existants du catalogue sont conservés ; seules cinq entrées sont ajoutées.

## Chantier A — audit historique 40–75
Les 36 identifiants exacts de `tests/historical-40-75-exact.test.cjs` ont été évalués sur trois états chacun : **108/108 PASS en V8** (finitude, SVG title/desc, absence de NaN/Infinity/undefined). Cela ne prouve ni la justesse indépendante de tous les modèles, ni une réception visuelle.
- **P2 graphique :** `hydro-cylinder-speed-02` montrait une flèche de vitesse de longueur constante pour tout débit positif. Correction proportionnelle à Q : longueur 110 Q/24 pixels ; disparition à Q=0 ; contrôle Q=0,12,24 L/min et test de non-régression ajouté.
- **P1 fonctionnel :** les tests historiques 288–292 et 293–297 exigeaient des tailles figées de catalogue (292 et 297) ; les assertions sont désormais des seuils minimums, avec unicité contrôlée sur le total réel.
- **P1 fonctionnel :** le contrôleur mutualisé échantillonnait des valeurs fractionnaires pour un modèle dont le nombre de défaillances doit être entier. La mission MTBF rejoint la liste des domaines entiers, y compris le pas du curseur. Les cinq parcours DOM simulés passent après correction.

## Chantier B — cinq sous-savoirs indépendants
| N° | Identifiant | Résultat nominal | Unité |
|---|---|---:|---|
| 298 | `damped-natural-frequency-01` | 10,99818 | rad/s |
| 299 | `rl-series-impedance-phase-01` | 51,48811 | ° |
| 300 | `maintenance-mtbf-operating-hours-01` | 200 | h |
| 301 | `sensor-midscale-linearity-error-01` | 5,000 | % |
| 302 | `isotropic-shear-modulus-01` | 80,76923 | GPa |

Chaque mission comporte situation métier, objectifs, prérequis, trois questions flash, hypothèses et domaine, modèle pur, unités, SVG 2D, graphe, tolérance, corrigé détaillé, seuil fictif, trois essais, trois aides et sauvegarde via le contrôleur commun. Les modèles ne prétendent pas être des simulations 3D. Pour la courbe libre amortie, la condition initiale du tracé est explicitée ; pour le cisaillement, l'amplification graphique est annoncée **×320**, cohérente avec la déformation de référence γ=0,001 et le décalage affiché de 32 pixels pour 100 pixels de hauteur.

## Preuves exécutées
- **S : PASS ciblé.** 24 états nouveaux avec contre-calculs indépendants (le MTBF est discret), 25 rejets de paramètres invalides/désynchronisation, propriétés physiques et nominal contrôlés ; 108 états historiques structurels.
- **G : PASS structurel ciblé ; inspection visuelle NOT RUN.** SVG calculés, métadonnées, flèche de vitesse corrigée et 3 états contre-audités ; aucun contrôle de rendu réel sur navigateur.
- **P : PASS structurel ; essai élève réel NOT RUN.** 15 questions flash, 5 corrigés, cinq parcours DOM simulés avec invalides, trois essais/aides, corrigé conditionnel, étoiles et sauvegarde.
- **F : PASS ciblé V8.** 7 tests scientifiques/structurels du nouveau lot PASS, 5 tests DOM simulés PASS ; exécution Node native locale NOT RUN. Les workflows GitHub Actions doivent être vérifiés sur le commit final.
- **A : NOT RUN.** Aucune preuve matérielle Android/iOS, NVDA, TalkBack, VoiceOver, zoom ou inspection clavier réelle.
- **CI native : BLOCKED jusqu'à preuve contraire.** Les workflows précédents échouaient avant toute étape ; consulter les jobs et les journaux du commit final et documenter la situation sans déclarer de succès.

Catalogue : **302 HTML, 302 identifiants uniques, 17 univers représentés, 205 sous-savoirs explicitement renseignés et distincts, 97 entrées non classifiées**. Intégration ≠ réception. Les erreurs restantes non détectées par ces tests restent ouvertes à l'audit scientifique, graphique, pédagogique, fonctionnel et d'accessibilité.

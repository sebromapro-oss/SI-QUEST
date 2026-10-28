# SI QUEST V2.3 — Audit et création 398–402
**28 octobre 2026 — dépôt privé, branche main**

## Phase 0
HEAD initial réel : `834f421519738b9e0a23826020bb8b817d63d0f8`.
Références relues : `CAHIER_DES_CHARGES_MAITRE.md` V2.3, `EXIGENCES.md`, `PRODUCTION.md`, catalogue, modèles, tests, contrôleur et workflows.
Dépôt privé vérifié ; branche `archive/pre-reconstruction-cycle28-20261025` présente.
Accueil strictement préservé : `index.html` (94165cccd6ad972a1a57699d5fcf42afde5cca53), `src/home.js` (0ead30ab3afe119589f0a14aab99898f0e7721d7), `src/style.css` (966e623673ce45c86c2cc6a59a4725406475db10), `assets/archipelago-cinematic.svg` (8d75fd72f75cb662f0d2de1c5a3e1df8ab935347). Aucune refonte, publication Pages, ZIP ou force push.

## Chantier A — historique 40–75
36 missions auditées avec moteur JavaScript réel et SVG : **108/108 états min/nominal/max finis**, **108/108 SVG structurels**, **72/72 paramètres NaN/Infinity rejetés** (trois groupes de 12).
Ces tests ne prouvent pas l'exactitude scientifique indépendante exhaustive ni la fidélité visuelle sur navigateur.
Trois corrections P2 pédagogiques : `efficiency-chain-01`, `heat-transfer-01`, `moment-arm-02` (objectifs, prérequis, hypothèses, critères et trois questions flash).
Reste **4 P2 HTML** à compléter : `spring-stiffness-01`, `electrical-series-01`, `inductor-energy-01`, `mechanical-efficiency-02`. L'injection mutualisée n'est pas une réception manuelle.
Correctifs P1 graphiques ciblés : effort nul du ressort sans flèche, flèche du roulement plafonnée avec mention explicite, légende cinématique ramenée à une écriture scientifique concise. Tests historiques actualisés pour les véritables points d'application, domaines entiers et unités, sans modifier les résultats physiques.

## Chantier B — cinq questions indépendantes
| N° | Identifiant | Question et résultat nominal |
|---|---|---|
| 398 | `parallel-load-resultant-position-01` | Position de la résultante de deux forces : **0,950 m** |
| 399 | `floating-cylinder-draft-01` | Tirant d'eau d'un cylindre flottant : **39,7887 cm** |
| 400 | `rlc-series-halfpower-bandwidth-01` | Bande passante RLC à mi-puissance : **100 Hz** |
| 401 | `composite-wall-interface-temperature-01` | Température d'interface d'une paroi bicouche : **71,4286 °C** |
| 402 | `quarter-bridge-strain-from-voltage-01` | Déformation estimée par quart de pont : **457,143 µε** |

Chaque mission : contexte, sous-savoir distinct, objectifs, prérequis, trois questions flash, hypothèses, repères, unités, modèle pur, domaine, SVG 2D paramétrique, graphe après déverrouillage, trois essais, trois aides, corrigé conditionnel, décision fictive et sauvegarde via contrôleur commun. Pas de 3D ni animation temporelle revendiquée. La linéarisation du quart de pont est explicitement limitée au petit signal ; écart relatif à la relation exacte inférieur à 0,1 % aux trois états testés.

## Tests et preuves
- **104 assertions V8 PASS** sur les cinq modèles : 15 contre-calculs, états limites, SVG et décisions ; entrées invalides rejetées.
- **5/5 parcours DOM simulés PASS**, **45 assertions** : saisie invalide, trois essais, corrigé conditionnel, étoiles et persistance.
- Tests Node natifs des cinq nouvelles missions : **10/10 PASS** dans le run GitHub Actions `40753575307` (tests modèles et parcours DOM).
- La CI globale a révélé **28 échecs sur 1427 tests**, dont des assertions de catalogue obsolètes et des attentes graphiques contradictoires. Corrections itératives apportées ; au SHA `c4778695dbd94dbbf4242fd9c5337c5ca8379430`, **1426 PASS / 1 FAIL** ; la dernière anomalie concerne le filtre des unités des libellés SVG. La correction s'appuie désormais sur les unités réellement déclarées dans la configuration de chaque mission. **Recontrôler les runs du SHA final avant de déclarer la CI PASS**.
- Recette accueil Playwright/Chromium sur émulation mobile et bureau : run `40752828864` **PASS** sur SHA `dc258ba4424b0987ade170cd0eccabe1c114849b`. Ce test n'est ni une recette de toutes les missions ni un essai sur appareil réel.

## Réception S/G/P/F/A
| Axe | État | Preuve / limite |
|---|---|---|
| S scientifique | **PASS ciblé** | Références et invariants ; 36 historiques non entièrement contre-calculées indépendamment |
| G graphique | **PASS structurel ciblé** | SVG calculés ; inspection visuelle réelle des cinq nouvelles scènes **NOT RUN** |
| P pédagogique | **PASS ciblé** | 3 questions flash, objectifs, corrigé ; observation en classe **NOT RUN** |
| F fonctionnel | **PASS DOM simulé** | 5 parcours ; statut CI global du dernier SHA à vérifier |
| A accessibilité | **NOT RUN manuel** | NVDA, TalkBack, VoiceOver, zoom et appareils réels non testés |

Catalogue : **402/996 identifiants uniques**, **17/17 univers**, **249 sous-savoirs explicitement distincts**, **97 missions historiques à classifier**. Reste **594 missions à produire**.
**Statut : intégré et testé automatiquement de manière ciblée ; non recetté complètement.**

# SI QUEST V2.3 — Audit et production 253–257 — 27 octobre 2026

## Dépôt et protection
Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`. HEAD initial distant : `708ec7db6f80a8a0d5ff05f324e4abacafbe6503`. SHA de production : `2fa7dd3fba3eb05ec0f5644d866355e82e88197b`. Les documents `CAHIER_DES_CHARGES_MAITRE.md` (V2.3), `EXIGENCES.md`, `PRODUCTION.md`, modèles, catalogue, tests et workflows ont été consultés. Aucun changement des fichiers protégés `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` dans la comparaison des commits. Aucune publication Pages, aucun ZIP, aucun force push, aucune suppression d'archive.

## Chantier A — Missions historiques 40–75
36 missions contrôlées en deux groupes de 18 : **108/108 états numériques et SVG structurels PASS en V8**, aux bornes et au nominal. Vérification des unités de configuration, finitude, titre et description SVG. Audit ciblé, non réception exhaustive.

**P2 graphique corrigée dans `heat-transfer-01`** : deux flèches indiquaient arbitrairement un flux de gauche à droite alors que la configuration ne donne que la valeur positive de |ΔT|, sans identifier la face chaude. Les flèches ont été supprimées ; le schéma précise « Sens du flux non orienté : faces chaude/froide inconnues ». Contre-tests ΔT = 0, 15 et 40 K : **3/3 PASS en V8**. Test de non-régression `tests/batch253-257.test.cjs` ajouté.

## Chantier B — Cinq sous-savoirs indépendants
| N° | Identifiant | Sous-savoir et résultat nominal |
|---|---|---|
| 253 | `bearing-pv-factor-01` | Produit pression projetée × vitesse périphérique ; **2,356194 MPa·m/s** |
| 254 | `three-phase-cable-voltage-drop-01` | Chute de tension résistive en triphasé équilibré ; **4,041452 V** |
| 255 | `hydraulic-throttle-heat-01` | Puissance dissipée par une perte de pression ; **1,000 kW** |
| 256 | `pneumatic-receiver-fill-time-01` | Remplissage isotherme idéal à débit d'air libre constant ; **100 s** |
| 257 | `half-power-damping-ratio-01` | Amortissement réduit par bande de demi-puissance ; **0,100 sans unité** |

Pour chaque mission : situation atelier, objectif, prérequis, trois questions flash, hypothèses et domaine, unités, moteur pur, corrigé en six étapes, seuil de décision fictif, schéma SVG 2D et courbe calculée, trois essais, trois aides, sauvegarde par contrôleur mutualisé. La représentation 3D n'est pas nécessaire à ces cinq modèles ; aucune animation temporelle artificielle revendiquée.

## Contrôles exécutés sur le SHA de production
- **S : PASS ciblé** — 25/25 états de calcul et SVG comparés à des références calculées indépendamment ; 20/20 paramètres invalides rejetés ; contrôle des bornes et de la décision.
- **G : PASS structurel** — 25 SVG calculés, synchronisation vérifiée, 3 états historiques corrigés ; **inspection visuelle navigateur : NOT RUN**.
- **P : PASS structurel** — questions flash, corrigés détaillés, hypothèses et décisions fictives ; **essais réels avec élèves : NOT RUN**.
- **F : PASS V8 ciblé** — 5/5 parcours DOM simulés : saisie invalide, trois tentatives, corrigé conditionnel, réponse correcte, trois étoiles et sauvegarde. Catalogue : **257 fichiers HTML, 257 identifiants uniques, 17 univers**. **CI native : BLOCKED**.
- **A : NOT RUN** — essais matériels Android/iPhone/PC/Mac et lecteurs NVDA, TalkBack, VoiceOver non exécutés ; aucun résultat RGAA/WCAG complet revendiqué.

Les tests V8 utilisent un environnement JavaScript et, pour le DOM, des objets simulés ; ils ne constituent pas une exécution Node native ni une recette navigateur. Le contrôleur réel est chargé dans la simulation, mais le moteur navigateur et les technologies d'assistance ne sont pas reproduits.

## GitHub Actions — blocage non résolu
Sur `2fa7dd3fba3eb05ec0f5644d866355e82e88197b`, quatre workflows ont échoué avant toute étape observable :
- Recette Node : `40519073765` ;
- Contrôles scientifiques : `40519073813` ;
- Accueil navigateur : `40519074261` ;
- SI QUEST scientific quality : `40519074791`.

Les deux premiers ont été relancés (tentative 2) et ont encore échoué. Jobs sans étape enregistrée ni runner exploitable. La récupération du journal du job Node a renvoyé HTTP 404 `BlobNotFound`. Cause exacte non établie. **Ne pas présenter la CI comme PASS**. Investiguer l'allocation des runners, les restrictions GitHub Actions et les paramètres du compte/dépôt avant d'incriminer les tests applicatifs.

## Anomalies ouvertes et réception
- **P1 / BLOCKED :** GitHub Actions n'exécute aucune étape observable ; pas de preuve native Node.
- **P2 / NOT RUN :** réception visuelle individuelle et essais d'accessibilité sur matériels/lecteurs d'écran à effectuer.
- **P2 graphique / CORRIGÉ :** orientation non justifiée du flux thermique dans la mission historique `heat-transfer-01`.
- Aucun P0 constaté par ces contrôles ciblés ; cela ne prouve pas l'absence d'autres défauts.

**Statut final : 257 missions intégrées, mais non toutes réceptionnées.** Le catalogue conserve ses 17 univers ; le nombre de sous-savoirs effectivement vérifiés ne doit pas être extrapolé à 249 sans audit de classification.

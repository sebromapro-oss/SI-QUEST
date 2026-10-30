# SI QUEST — Audit scientifique contradictoire des missions 393 à 417 (V2.5)

**Date :** 30 octobre 2026. **HEAD initial :** `8d4185fc426c761382dbb733fa943291e3b61a36`. **Périmètre :** 25 missions existantes, aucune création.

## Contrôle indépendant des lois

25 références physiques calculées séparément des fonctions du jeu ; évaluation des états **minimum, nominal, maximum** : **75/75 concordances**, écart relatif pondéré maximal **9,80×10⁻¹⁶** en JavaScript V8 isolé. Les unités, conversions et hypothèses sont vérifiées au niveau des formules ; aucune extrapolation hors domaine industriel n'est validée.

| Mission | Grandeur | Référence nominale | Unité |
|---:|---|---:|---|
| 393 | Énergie RC | 50,976525 | mJ |
| 394 | Débit vérin | 9,424778 | L/min |
| 395 | Angle d'élingue | 48,189685 | ° |
| 396 | Puissance induction | 14,400000 | kW |
| 397 | Raideur poutre | 2,986667 | kN/mm |
| 398 | Position résultante | 0,950000 | m |
| 399 | Tirant d'eau cylindre | 39,788736 | cm |
| 400 | Bande passante RLC | 100,000000 | Hz |
| 401 | Température interface | 71,428571 | °C |
| 402 | Déformation quart de pont | 457,142857 | µε |
| 403 | Poussée hydrostatique | 5,886000 | kN |
| 404 | Énergie volant | 3,947842 | kJ |
| 405 | Coefficient convection | 20,000000 | W/(m²·K) |
| 406 | Temps seuil RL | 18,325815 | ms |
| 407 | Capacité triphasée étoile | 119,366207 | µF |
| 408 | Dissipation amortisseur | 10,659173 | J |
| 409 | Disponibilité série | 94,413847 | % |
| 410 | Courant moteur | 15,001826 | A |
| 411 | Réaction appui et couple | 600,000000 | N |
| 412 | Flux paroi | 300,000000 | W |
| 413 | Centre de pression | 1,485714 | m |
| 414 | Mach subsonique | 0,573723 | 1 |
| 415 | Couple de Bredt | 2 016,000000 | N·m |
| 416 | Exergie détruite | 1 927,578136 | J |
| 417 | Pertes cuivre triphasées | 667,332000 | W |

Les cinq fichiers de tests de lot existants `tests/batch393-397.test.cjs` à `tests/batch413-417.test.cjs` couvrent déjà les références, les pages HTML, les domaines et les SVG. Les trois nouveaux tests ciblent les corrections géométriques ci-dessous.

## Trois anomalies graphiques corrigées

1. **393 — Circuit RC en charge :** le schéma initial reliait les deux bornes du condensateur par une boucle de fil, sans source ni résistance : **court-circuit graphique** incompatible avec le modèle de charge. Nouveau circuit : **générateur 24 V, résistance série 10 kΩ, condensateur 220 µF**, deux armatures séparées ; indication dynamique de `Uc(t)`. Test de topologie et de tension aux trois états.
2. **401 — Paroi bicouche :** épaisseur 1 représentée par **60 px pour 40 mm**, épaisseur 2 par **e₂ px pour e₂ mm** : échelles différentes. Épaisseur 1 ramenée à **40 px**, épaisseur 2 conservée à **e₂ px** : **1 px/mm**. Test sur 20, 60 et 100 mm.
3. **415 — Section fermée de Bredt :** les cotes **120 × 80 mm** étaient portées sur le contour extérieur alors que la formule utilise l'**aire enfermée par la fibre moyenne**. Nouveau contour moyen **240 × 160 px** à **2 px/mm**, paroi **6 px pour 3 mm** ; contours intérieur et extérieur symétriques. Test des dimensions et du couple limite.

**Sources modifiées :** `src/batch393-397.js`, `src/batch398-402.js`, `src/batch413-417.js`. **Tests ajoutés :** `tests/audit-svg-393-417.test.cjs` (3 tests). Aucune modification de l'accueil, de la carte des 17 univers, des pages HTML de missions ni des données privées.

## Recette et limites

- **CI de départ sur `8d4185fc426c761382dbb733fa943291e3b61a36` :** 1 877/1 877 tests Node réussis ; trois workflows verts : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41088313918), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41088313369), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41088313049).
- **CI du nouveau commit :** **à vérifier** ; objectif **1 880 tests** (1 877 + 3). Ne pas annoncer un résultat avant lecture des runs.
- **Preuves non acquises :** captures et essais navigateur réels, mobile physique, NVDA/TalkBack/VoiceOver, audit RGAA complet, audit exhaustif des secrets et de l'historique public, évaluation pédagogique en classe.
- **Phase 1 maintenue.** Après confirmation des trois workflows du nouveau SHA, prochain lot recommandé : **368–392**.

# SI QUEST — Audit scientifique ciblé des missions 543 à 567

**Date : 30 octobre 2026 — phase 1, sans nouvelle mission.**  
**HEAD de départ :** `29182a1ccf213549783b855dfc22d9c50f2f3c2c` ; 597 fichiers HTML de missions ; trois workflows réussis au démarrage du cycle.  
**Périmètre :** 25 modèles des lots `src/batch543-547.js` à `src/batch563-567.js`. Les références ci-dessous sont recalculées séparément à partir des lois et hypothèses physiques, sans appeler les fonctions du moteur SI QUEST. Trois points par modèle : borne inférieure, valeur nominale et borne supérieure. **75 valeurs recalculées**, dont **25 comparaisons nominales au champ `expected`** sans arrondi : **25/25 concordantes** à la tolérance `10⁻⁹ × max(1, |référence|)`. Les bornes sont contrôlées numériquement dans ce rapport, mais pas qualifiées comme 50 validations expérimentales indépendantes.

## Résultats de référence

| N° | Mission | Minimum → résultat | Nominal → résultat | Maximum → résultat | Unité du résultat |
|---:|---|---:|---:|---:|---|
| 543 | `bolt-joint-external-load-share-01` | 100 → 0,57142857 | 200 → 1 | 300 → 1,3333333 | kN |
| 544 | `journal-bearing-viscous-torque-01` | 0,02 → 0,09817477 | 0,06 → 0,29452431 | 0,1 → 0,49087385 | N·m |
| 545 | `diesel-fuel-thermal-density-01` | 15 → 835 | 35 → 821,04228 | 65 → 800,95923 | kg/m³ |
| 546 | `pi-integrator-antiwindup-clamp-01` | -10 → 1 | 2 → 8,2 | 10 → 10 | % |
| 547 | `thin-lens-inspection-magnification-01` | 100 → 1 | 200 → 0,33333333 | 400 → 0,14285714 | sans unité |
| 548 | `maintenance-poisson-spares-twofail-01` | 10 → 6,1551936 | 30 → 33,737273 | 50 → 59,399415 | % |
| 549 | `humid-air-vapor-mass-density-01` | 30 → 6,9093465 | 60 → 13,818693 | 90 → 20,72804 | g/m³ |
| 550 | `rectifier-capacitor-ripple-01` | 2 000 → 2 | 2 200 → 1,8181818 | 5 000 → 0,8 | V |
| 551 | `acoustic-two-tone-beat-01` | 442 → 2 | 446 → 6 | 452 → 12 | Hz |
| 552 | `optical-grating-first-order-angle-01` | 1,5 → 20,773017 | 2,5 → 12,28649 | 4 → 7,6429854 | ° |
| 553 | `gear-lewis-tooth-bending-01` | 60 → 27,777778 | 100 → 46,296296 | 160 → 74,074074 | MPa |
| 554 | `maintenance-normal-reorder-point-01` | 3 → 17 | 8 → 39 | 15 → 70 | pièces |
| 555 | `chain-polygonal-speed-ripple-01` | 12 → 3,527618 | 20 → 1,2465126 | 40 → 0,30921985 | % |
| 556 | `inglis-elliptical-hole-kt-01` | 2 → 9 | 4 → 5 | 8 → 3 | sans unité |
| 557 | `safety-two-out-of-three-vote-01` | 0,8 → 89,6 | 0,9 → 97,2 | 0,99 → 99,9702 | % |
| 558 | `rod-longitudinal-wave-speed-01` | 70 → 2 986,1677 | 200 → 5 047,5447 | 210 → 5 172,1942 | m/s |
| 559 | `transformer-load-voltage-drop-01` | 10 → 1,54 | 40 → 6,16 | 60 → 9,24 | V |
| 560 | `built-up-beam-shear-flow-01` | 1 → 15 | 2 → 30 | 5 → 75 | N/mm |
| 561 | `rectangular-plate-polar-mass-inertia-01` | 0,2 → 1,36 | 0,6 → 2 | 1 → 3,28 | kg·m² |
| 562 | `profile-discrete-roughness-ra-01` | 1 → 1,2 | 3 → 3,6 | 5 → 6 | µm |
| 563 | `rotor-balance-correction-mass-01` | 80 → 1 | 320 → 4 | 480 → 6 | g |
| 564 | `combined-axial-bending-stress-01` | 100 → 6,09375 | 300 → 10,78125 | 500 → 15,46875 | MPa |
| 565 | `timer-pwm-fast-frequency-01` | 499 → 500 | 999 → 250 | 1 999 → 125 | Hz |
| 566 | `spur-gear-transverse-contact-ratio-01` | 0,8 → 1,3752914 | 1 → 1,6747051 | 1,1 → 1,8198359 | sans unité |
| 567 | `magnetic-gap-maxwell-force-01` | 0,1 → 1,5915494 | 0,3 → 14,323945 | 0,5 → 39,788736 | N |

## Anomalies confirmées et corrections publiées

1. **Mission 545, masse volumique du gazole :** l'égalité rédigée `835/1,017 = 821,043 kg/m³` était mal arrondie ; la valeur exacte est **821,042281… kg/m³**, soit **821,042 kg/m³** à trois décimales. Le moteur et le champ `expected` étaient justes. Correction du détail et du corrigé dans `src/batch543-547.js` et contre-test.
2. **Mission 556, trou elliptique d'Inglis :** les flèches aux extrémités du grand axe étaient horizontales alors que la traction à l'infini est verticale et que la contrainte tangentielle locale à ces pointes est orientée verticalement. Quatre flèches verticales et libellé `σyy,max` ajoutés, avec test SVG.
3. **Mission 559, transformateur en charge :** les fils traversaient les blocs d'impédance R et X, représentation trompeuse d'un circuit série. Segments de fils limités aux intervalles entre blocs, avec test de non-régression.
4. **Mission 561, inertie de plaque :** largeur `a` et hauteur `b` dessinées avec des échelles différentes ; la nouvelle scène impose une même échelle (`195/0,80 = 243,75 px/m`) aux trois valeurs contrôlées de `b`. Les cotes ont été déplacées hors de la pièce pour éviter un chevauchement au cas maximal. Test de proportions.
5. **Mission 565, PWM :** le graphe interpolait 121 valeurs continues de TOP alors que le compteur n'admet que les **sept entiers 499, 749, 999, 1249, 1499, 1749, 1999** dans l'exercice. Le tracé utilise désormais ces sept valeurs, avec marqueurs et indication que les segments sont seulement indicatifs. Test des sept abscisses et ordonnées.

## Contrôles et limites

- Les unités, conversions et ordres de grandeur ont été examinés pour les 25 équations. Les approximations (redresseur à faible ondulation, gaz parfait, Poisson indépendant, loi de Lewis simplifiée, 2/3 indépendant, formule d'Inglis, onde de barre, etc.) restent des **hypothèses pédagogiques explicites** et ne valent pas homologation.
- Les modèles discrets `chain-polygonal-speed-ripple-01` et `timer-pwm-fast-frequency-01` interdisent des entrées incompatibles avec leurs domaines ; leurs tracés doivent signaler les segments indicatifs.
- **Les 75 recalculs et les tests SVG ne constituent pas une recette visuelle navigateur.** Aucun essai sur téléphone physique, aucun contrôle NVDA/TalkBack/VoiceOver ni audit complet RGAA/WCAG n'a été réalisé pendant ce cycle.
- Les modifications portent uniquement sur quatre fichiers de modèles/diagrammes et leurs tests. Aucun fichier de l'accueil, carte des 17 univers, assets ou missions HTML n'a été modifié. Aucun nouveau niveau 598+ n'a été créé.
- Les résultats des trois workflows sur le **HEAD final** doivent être ajoutés au registre de reprise après exécution ; ne pas confondre les workflows verts du HEAD initial avec ceux des commits de ce cycle.

**Décision : phase 1 maintenue.** Prochaine priorité : vérifier les workflows finaux, inspection visuelle des quatre scènes corrigées, audit du lot 518–542, et recette sur appareils/lecteurs d'écran.

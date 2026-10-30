# SI QUEST — Audit scientifique contradictoire des missions 418 à 442 (V2.5)

**Date :** 30 octobre 2026. **HEAD initial :** `477b5e903864277cd42f4dd1b1a1634d18310722`. **Périmètre :** 25 missions existantes ; aucune création ni suppression.

## Contre-calculs scientifiques indépendants

Les 25 lois ont été reconstruites à partir de leurs grandeurs physiques (équilibre des pompes, loi de Carnot, hydrostatique, résistance des matériaux, lois de Faraday, circuits électriques, etc.), sans appeler le moteur du jeu. Évaluation de chaque mission aux **bornes min/nominale/max : 75/75 concordances** en JavaScript V8 isolé, écart relatif pondéré maximal **3,17×10⁻¹⁶**. Les conversions et les unités sont intégrées dans les références. Les modèles restent valables **uniquement sous les hypothèses explicites**.

| N° | Grandeur contrôlée | Référence nominale | Unité |
|---:|---|---:|---|
| 418 | Pompes parallèles | 51,639778 | L/s |
| 419 | Démarrage étoile | 60,000000 | N·m |
| 420 | Carnot | 35,308397 | % |
| 421 | Dérive offset | 2,800000 | mV |
| 422 | Hauteur métacentrique | 0,416667 | m |
| 423 | Embrayage conique | 115,911099 | N·m |
| 424 | Détente polytropique | 33,949810 | kJ |
| 425 | Flexion triangle | 4,166667 | MPa |
| 426 | Phase RC | −51,488113 | ° |
| 427 | Enroulement courroie | 156,926082 | ° |
| 428 | Soupape à ressort | 25,000000 | bar |
| 429 | Rapport buck | 50,000000 | % |
| 430 | Réaction appui | 6,000000 | kN |
| 431 | Pertes ESR | 0,720000 | W |
| 432 | Débit orifice | 22,816859 | L/min |
| 433 | Essieu avant au freinage | 12,205286 | kN |
| 434 | Consommation air libre | 19,627100 | L |
| 435 | Moment plastique | 37,500000 | kN·m |
| 436 | Partage tension condensateurs | 36,000000 | V |
| 437 | Condensation vapeur | 45,140000 | kW |
| 438 | Allongement boulon | 0,147783 | mm |
| 439 | Réaction charge triangulaire | 6,000000 | kN |
| 440 | Dissolution du fer | 2,083661 | g |
| 441 | Refroidissement global | 49,430355 | °C |
| 442 | Dilatation huile | 1,680000 | L |

Les 25 pages HTML possèdent des tests existants vérifiant `expected`, les trois aides et les domaines. Un **nouveau fichier de 30 tests** ajoute 25 contre-calculs transversaux (3 états par mission + valeur `expected` HTML, trois aides, SVG, rejets hors domaine) et cinq tests géométriques ciblés. **Ces 30 tests sont à confirmer par la CI du commit publié** ; ils ne sont pas annoncés comme réussis avant lecture des journaux GitHub Actions.

## Cinq corrections SVG ciblées

1. **420 — Machine thermique de Carnot :** le dessin précédent montrait seulement une flèche `Qh` de la source chaude vers la source froide, sans machine ni travail produit. Le schéma comporte désormais **source chaude → machine → source froide**, flèche de **travail W** et rapports `W/Qh=η`, `Qc/Qh=1−η`. Le bilan `W/Qh + Qc/Qh=1` est testé aux trois températures.
2. **425 — Section triangulaire :** ancien dessin base **260 px** pour 80 mm et hauteur **218 px** pour 120 mm, soit deux échelles incompatibles. Nouveau triangle base **160 px**, hauteur **240 px** (**2 px/mm**) ; axe neutre situé à **h/3 de la base** et fibre extrême à **2h/3 du sommet**. Test des rapports géométriques.
3. **431 — Échauffement ESR :** ancienne barre `60+100P` px avec décalage arbitraire ; barre désormais **100 px/W × P** sans intercept. Test sur 1, 3 et 5 A.
4. **432 — Écoulement d'orifice :** flèches anciennement affines en pression `30+14Δp` alors que le débit idéal varie en **√Δp** ; désormais **4 px/(L/min) × Q**, avec contrôle du maintien dans la conduite aux bornes.
5. **437 — Condensation :** longueur de la flèche de puissance précédemment **plafonnée à 75 px**, ce qui masquait les variations hautes ; désormais **0,6 px/kW × P**, sans saturation sur le domaine.

**Fichiers sources modifiés :** `src/batch418-422.js`, `src/batch423-427.js`, `src/batch428-432.js`, `src/batch433-437.js`. **Tests :** `tests/audit-418-442-independent.test.cjs`. Aucun fichier de la page d'accueil, de la carte des 17 univers, des missions HTML ou des données privées n'a été modifié.

## Recette, limites et suite

- **Avant modifications :** commit `477b5e903864277cd42f4dd1b1a1634d18310722`, trois workflows GitHub Actions réussis, **1 847/1 847 tests** d'après le journal de recette précédent.
- **Après modifications :** **CI à vérifier** ; cible théorique **1 877 tests** (1 847 + 30). Ne pas déclarer la CI verte tant que les trois runs sur le SHA de publication ne sont pas terminés.
- **Vérifications réalisées :** contre-calculs numériques indépendants (75 états), revue de cinq incohérences de géométrie ou de représentation physique, compilation syntaxique des quatre fichiers modifiés et du fichier de tests.
- **Non réalisés :** inspection graphique par captures navigateur, interactions sur appareils physiques, NVDA, TalkBack, VoiceOver, RGAA complet, audit exhaustif des secrets et de l'historique public, réception pédagogique en classe.
- **Prochaine priorité :** vérifier les trois workflows sur le nouveau HEAD, corriger immédiatement toute régression, puis auditer les missions **393–417**. **Phase 1 maintenue**, pas de missions 598+ sans preuves de réception suffisantes.

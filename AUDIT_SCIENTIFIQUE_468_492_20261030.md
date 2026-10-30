# SI QUEST — Audit scientifique contradictoire 468–492 (V2.5)

Date : 30 octobre 2026. HEAD initial distant : `74bd56ebbd9b01f6cc95ed13aee9a41a8e5f5679`. **25 missions contrôlées ; aucune mission créée.**

## Calculs et configurations indépendants

25 équations reconstruites à partir des hypothèses physiques, sans appeler les fonctions de calcul du jeu ; comparaison aux modèles pour les trois entrées min/initial/max : **75/75 concordantes**, erreur relative pondérée maximale **1,07×10⁻¹⁵**. Contrôle indépendant des 25 valeurs `window.SI_MISSION.expected` dans les pages HTML : **25/25 concordantes** (erreur maximale < 2×10⁻¹⁰ avec références nominales arrondies). Les 25 pages comportent chacune trois aides `<li>`.

| Mission | Grandeur | Valeur nominale | Unité |
|---:|---|---:|---|
| 468 | Rotor gyroscopique | 300 | N·m |
| 469 | Déphasage RL | 38,146026 | ° |
| 470 | Vantail triangulaire | 1 255,68 | N |
| 471 | Inertie section creuse | 3 638,5792 | cm⁴ |
| 472 | Protection I²t | 14,4 | s |
| 473 | Coriolis | 9,6 | m/s² |
| 474 | Effet de peau | 2,087298 | mm |
| 475 | Pression de clavette | 37,5 | MPa |
| 476 | Peltier | 28 | W |
| 477 | Jeu d'engrenage | 0,214859 | ° |
| 478 | Attraction électrostatique | 3,541675 | mN |
| 479 | Énergie de torsion | 0,671435 | J |
| 480 | Erreur de poursuite rampe | 5 | mm |
| 481 | Pression liquide tournant | 2,7 | kPa |
| 482 | Fréquence rotorique | 2 | Hz |
| 483 | Vitesse de chaîne | 2,54 | m/s |
| 484 | Centre de gravité trapèze | 266,666667 | mm |
| 485 | PWM tension moyenne | 16,8 | V |
| 486 | Redondance parallèle | 84,518188 | % |
| 487 | Inertie rotor annulaire | 0,02464042 | kg·m² |
| 488 | Manomètre en U | 510,12 | Pa |
| 489 | COP de Carnot | 6,75 | 1 |
| 490 | Pas angulaire codeur | 0,3515625 | ° |
| 491 | Choc de chariots | 0,857143 | m/s |
| 492 | Rendement volumétrique | 88,570926 | % |

## Quatre anomalies SVG corrigées et protégées par tests

1. **470 — Vantail triangulaire :** base dessinée 200 px pour 0,60 m et hauteur 120 px/m (échelles incohérentes). Base ramenée à **72 px**, soit la même échelle de 120 px/m que la hauteur ; centre de pression conservé à **3h/4**. Nouveau test sur h min/initial/max.
2. **475 — Clavette :** l'ancienne clavette rectangulaire traversait visuellement le centre de l'arbre et dépassait largement le diamètre. Clavette replacée sur la périphérie ; diamètre de l'arbre **170 px pour 40 mm**, hauteur portante exposée **17 px pour 4 mm**, force tangentielle repositionnée. Test de proportion **he/d=0,10** et d'implantation.
3. **480 — Suivi d'une rampe :** à l'erreur maximale de 10 mm, la courbe de sortie descendait sous l'axe horizontal (y=400 px contre axe y=365 px). Recalage de l'échelle d'écart à **16 px/mm**, courbes entièrement dans le repère pour min/initial/max. Nouveau test de bornage des ordonnées.
4. **481 — Liquide en rotation :** rayon intérieur dessiné 30 px pour rayon extérieur 115 px, soit 0,26087 au lieu de **r₁/r₂=0,05/0,20=0,25**. Rayon intérieur corrigé à **28,75 px** ; flèche de gradient repositionnée. Nouveau test de ratio.

**Tests ajoutés : 4.** Contrôles effectués sur la génération SVG et sur les formules ; pas de captures navigateur ni de test de lecteur d'écran. L'accueil, la carte des 17 univers, les pages de missions et les données privées ne sont pas modifiés.

## Recette à compléter

- Au moment de la rédaction, les **1 839 tests** et les trois workflows étaient verts sur le HEAD initial ; **la CI du nouveau commit reste à vérifier**. Cible attendue : **1 843 tests**.
- Recette visuelle réelle des scènes SVG, essais clavier/mobile, NVDA, TalkBack, VoiceOver : **non réalisés**.
- Audit de sécurité des contenus et de l'historique du dépôt public : **incomplet**.
- Les 25 modèles sont vérifiés dans leurs hypothèses idéalisées ; cette vérification ne démontre ni validité industrielle hors domaine, ni réception de toutes les 597 missions.
- **Phase 1 maintenue.** Prochain lot recommandé : **443–467** après vérification des workflows de ce commit.

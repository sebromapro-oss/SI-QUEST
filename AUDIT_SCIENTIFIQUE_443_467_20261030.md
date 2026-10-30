# SI QUEST — Audit contradictoire des missions 443–467 (V2.5)

Date : 30 octobre 2026 ; HEAD initial : `b874914d535672d179e8d4dd1cf7ef9ec2f97dfc`. **25 missions, 75 contre-calculs min/nominal/max, 75/75 concordants** (erreur relative pondérée maximale 6,58×10⁻¹⁶). Les **25/25 valeurs HTML expected** concordent avec les calculs indépendants (erreur <2×10⁻⁹ avec références arrondies). Trois aides HTML présentes sur chaque page.

## Valeurs nominales vérifiées

- 443 roulement 16,32 kN
- 444 boucle P 111,111 tr/min
- 445 batterie 46,8 V
- 446 compresseur 202,653 °C
- 447 ressort 20,48 mm
- 448 FFT 2 Hz
- 449 rosée 16,693 °C
- 450 Darcy 4,5 L/min
- 451 triangle 28,868 A
- 452 entaille 275 MPa
- 453 Bayes 71,429 %
- 454 cosφ 0,8660
- 455 Reynolds 39,019 L/min
- 456 traction 3,435 kN
- 457 incertitude 0,4219 mm
- 458 coude 0,033706 bar
- 459 coque 14,921 K/W
- 460 Mohr 100 MPa
- 461 Icc 2 405,626 A
- 462 fuite 0,147262 L/min
- 463 diélectrique 2,492854 W
- 464 vitesse spécifique 0,733958
- 465 PID D 0,502655
- 466 cerclage 4,4928 MPa
- 467 RC 303,314 Ω

## Quatre corrections graphiques avec tests de non-régression

1. **459 :** coque sphérique, rayon extérieur désormais à la même échelle que le rayon intérieur : `r₂,px=70r₂/50` (112 px à 80 mm), ancien test mis à jour.
2. **462 :** jeu annulaire, échelle amplifiée mais proportionnelle à la valeur physique : `hpx=hµm/5` (4–16 px), au lieu d'une échelle affine.
3. **465 :** tracés de l'erreur et de sa dérivée sur une échelle commune **100 px/unité**, indépendante de la fréquence. Contrôle des 121 échantillons SVG aux bornes.
4. **466 :** anneau mince : rayon proportionnel `0,5r` px, épaisseur relative 8 % ; flèches de contrainte **tangentielles et divergentes** au lieu des flèches radiales trompeuses.

**4 tests ajoutés**, objectif **1 847 tests** après publication. Aucun changement d'accueil, de carte des 17 univers, de page de mission ou de donnée privée.

## Validation et limites

La CI du commit précédent `b874914d535672d179e8d4dd1cf7ef9ec2f97dfc` est vérifiée : **1 843/1 843 tests réussis**, trois workflows verts : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41081909839), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41081909909), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41081909858). **La CI du présent commit est à vérifier après publication.** Recette visuelle navigateur, mobile réel, NVDA, TalkBack, VoiceOver et audit de sécurité exhaustif restent ouverts. Phase 1 maintenue ; prochaine priorité **418–442**.

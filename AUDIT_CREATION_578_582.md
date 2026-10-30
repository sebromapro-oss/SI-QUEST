# SI QUEST V2.3 — Cycle 578–582

30 octobre 2026. HEAD initial 8a7040f8a8cbeb3eb9b6788365e825275adeea61. Chantier A : dix configurations historiques 40–75 complétées et cinq sous-savoirs historiques ajoutés au catalogue. Test de couverture des 36 configurations ajouté. Aucun fichier de la nouvelle page d'accueil modifié.

## Missions intégrées
- 578 `optical-rayleigh-circular-aperture-01` — Optique — Limite de résolution de Rayleigh ; nominal 0,3355 mrad ; Angle minimal de séparation de deux sources selon Rayleigh pour une ouverture circulaire.
- 579 `helical-gear-transverse-module-01` — Engrenage hélicoïdal — Module apparent ; nominal 3,192533 mm ; Conversion du module normal en module transverse d'une denture hélicoïdale.
- 580 `spherical-pressure-vessel-membrane-stress-01` — Réservoir sphérique — Contrainte de membrane ; nominal 75 MPa ; Contrainte tangentielle d'une enveloppe sphérique mince sous pression interne.
- 581 `cylindrical-wall-radial-thermal-resistance-01` — Conduite isolante — Résistance thermique radiale ; nominal 0,014709 K/W ; Résistance de conduction stationnaire à travers une paroi cylindrique homogène.
- 582 `transformer-sinusoidal-peak-induction-01` — Transformateur — Induction maximale du noyau ; nominal 0,6906907 T ; Induction crête estimée par la loi des tensions sinusoïdales d'un transformateur.

## Contrôles et réserves
Avant publication : 15 références numériques indépendantes, 15 SVG structurels et synchronisés, 15 rejets de désynchronisation, 30 rejets de paramètres invalides : PASS en V8 ciblé. Les 5 modèles comportent un domaine explicite, des hypothèses, trois questions flash, une tolérance, une décision fictive et des graphes paramétriques. La représentation est 2D, sans animation temporelle complète ni 3D.

| Domaine | Statut |
|---|---|
| S | PASS ciblé V8 ; réception scientifique exhaustive NOT RUN |
| G | PASS structurel V8 ; inspection visuelle NOT RUN |
| P | PASS structurel ; parcours complet NOT RUN |
| F | PASS calcul et SVG ciblés ; DOM NOT RUN ; CI à vérifier |
| A | NOT RUN sur appareil et lecteur d'écran |

Tests Node natifs et CI non encore prouvés lors de la rédaction initiale ; les exécutions GitHub Actions doivent être examinées après commit. Aucune validation complète revendiquée. Les 249 sous-savoirs canoniques restent à réconcilier.

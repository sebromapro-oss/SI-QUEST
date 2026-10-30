# SI QUEST — Audit scientifique ciblé 493–517 (V2.5)

Date : 30 octobre 2026. HEAD initial : `c2e18a480421284bf44fa822a69002a3e942d086`. Phase 1 ; 25 missions, cinq lots. **Aucune mission 598+ ajoutée.**

## Contrôle contradictoire numérique

Les 25 fonctions de référence ont été écrites indépendamment des expressions du moteur puis comparées aux modèles aux trois états min/nominal/max : **75/75 concordances** à une erreur relative pondérée inférieure à 10⁻¹² (maximum mesuré 2,40×10⁻¹⁶). Les 25 valeurs nominales ont été confrontées aux 25 configurations HTML : **25/25 concordances** (écart relatif pondéré maximal inférieur à 2×10⁻¹⁶). Ces contrôles sont exécutés dans un moteur JavaScript V8 hors navigateur ; ils ne constituent ni une expertise des hypothèses physiques réelles ni une recette visuelle.

| N° | Mission | Résultat nominal | Unité |
|---:|---|---:|---|
| 493 | blasius-smooth-pipe-factor-01 | 0,022372859 | 1 |
| 494 | laplace-straight-wire-force-01 | 2,600000 | N |
| 495 | pneumatic-tank-ideal-gas-mass-01 | 0,356573825 | kg |
| 496 | ultrasonic-steel-wavelength-01 | 2,950000 | mm |
| 497 | hall-copper-voltage-magnitude-01 | 0,881154222 | µV |
| 498 | rc-highpass-gain-magnitude-01 | 0,782478986 | 1 |
| 499 | liquid-acoustic-impedance-01 | 1,480000 | MRayl |
| 500 | piezoelectric-direct-charge-01 | 60,000000 | nC |
| 501 | buck-inductor-current-ripple-01 | 0,150000 | A |
| 502 | uniform-magnetic-flux-01 | 0,800000 | mWb |
| 503 | capillary-meniscus-pressure-01 | 240,000000 | Pa |
| 504 | magnetic-core-reluctance-01 | 442,097064 | kA/Wb |
| 505 | zener-series-resistor-current-01 | 20,909091 | mA |
| 506 | pv-module-fill-factor-01 | 79,365079 | % |
| 507 | battery-peukert-runtime-01 | 9,012505 | h |
| 508 | bearing-outer-race-bpfo-01 | 64,000000 | Hz |
| 509 | hydraulic-oil-elastic-energy-01 | 66,666667 | J |
| 510 | copper-electroplating-thickness-01 | 14,884883 | µm |
| 511 | clutch-synchronization-heat-01 | 432,000000 | J |
| 512 | rectangular-channel-critical-depth-01 | 0,260597055 | m |
| 513 | mutual-inductance-emf-01 | 9,424777961 | V |
| 514 | fick-membrane-diffusion-01 | 2,000000 | µmol/s |
| 515 | centrifugal-clutch-threshold-01 | 711,762543 | tr/min |
| 516 | three-phase-current-thd-01 | 25,000000 | % |
| 517 | hydraulic-intensifier-pressure-01 | 153,600000 | bar |

## Quatre incohérences géométriques identifiées et corrigées

1. **501 — Hacheur buck :** le triangle de courant gardait une hauteur fixe pour tout rapport cyclique alors que ΔI(D)=24 D(1−D)/(L f) varie. Hauteur graphique désormais proportionnelle à ΔI, avec durée ON proportionnelle à D et valeur ΔI affichée ; test aux D=0,2 ; 0,5 ; 0,8.
2. **503 — Ménisque mouillant :** la courbe parabolique avait une pente non verticale au contact de la paroi pour θ=0° ; de plus, le rayon graphique ne suivait pas la même échelle que le rayon réel. Remplacement par deux arcs de Bézier approchant un demi-cercle, tangentes verticales aux parois et échelle 45 px/mm ; test sur trois rayons.
3. **512 — Hauteur critique d'un canal :** le remplissage graphique comportait un décalage constant, donc une échelle de hauteur non proportionnelle à la profondeur critique. Nouvelle hauteur graphique h=190 y_c/y_c,max ; test aux trois débits.
4. **517 — Multiplicateur hydraulique :** les diamètres graphiques étaient 128/84 au lieu de 40/25. Nouvelle proportion 128/80=1,6 ; test des deux sections dessinées.

Les quatre tests de non-régression contrôlent la géométrie du SVG généré et non une capture réelle. Le contenu de l'accueil, la carte des 17 univers, les pages HTML des missions et les données de progression ne sont pas modifiés.

## Preuves restant ouvertes

- CI Node et les trois workflows du nouveau commit : **à vérifier après publication** ; le total cible passe de 1 835 à 1 839 tests si aucune autre modification n'intervient.
- Contrôle visuel des quatre scènes sur navigateur réel, ergonomie mobile et zoom : **non réalisés**.
- Tests matériels Android/iPhone, NVDA, TalkBack et VoiceOver : **non réalisés**.
- Audit exhaustif de la sécurité du dépôt public et de son historique : **non réalisé**.
- Réception scientifique et graphique des 597 missions : **incomplète** ; la phase 2 reste suspendue.

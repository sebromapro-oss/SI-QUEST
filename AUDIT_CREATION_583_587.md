# SI QUEST V2.3 — Cycle 583–587

30 octobre 2026. HEAD initial `58925c42a1b40243bf4ff8b6442bbe7c1978550c`. Nouvelle page d'accueil et carte conservées sans modification. Branche main privée ; aucune publication Pages.

## Nouvelles missions
- 583 `milling-cutting-speed-01` — Fraisage — Vitesse périphérique de coupe ; nominal 2.5132741 m/s ; Conversion du diamètre et de la vitesse de rotation en vitesse tangentielle de coupe.
- 584 `milling-feed-per-tooth-01` — Fraisage — Avance par dent ; nominal 0.10000000 mm/dent ; Détermination de l'avance par dent à partir de la vitesse d'avance et de la fréquence de passage des dents.
- 585 `four-part-pulley-ideal-tension-01` — Palan — Traction idéale à quatre brins ; nominal 981.00000 N ; Équilibre statique d'une charge suspendue par quatre brins porteurs de même tension.
- 586 `coaxial-capacitive-level-delta-01` — Capteur de niveau — Variation de capacité coaxiale ; nominal 27.321706 pF ; Variation de capacité d'une sonde coaxiale liée à la longueur immergée et au contraste diélectrique.
- 587 `radiative-net-heat-flow-01` — Thermique — Puissance radiative nette ; nominal 272.24329 W ; Bilan radiatif net d'une surface grise vers une enceinte noire isotherme.

## Chantier historique 40–75
P2 : `rolling-torque-01` ne possédait pas de critère de réussite explicite dans la configuration ; complété à partir de la page existante. P2 : lacune croisée de couverture des tests (`electrical-parallel-01` absent des références indépendantes, `rolling-torque-01` absent du test de métadonnées à 36 IDs) ; test additionnel créé. Les 36 tests existants ne sont pas supprimés.

## Contrôles et réserves
Calculs V8 ciblés : 15/15 jeux nominaux/bornes PASS ; 15/15 SVG paramétriques PASS ; 30/30 paramètres invalides rejetés ; cinq solutions conditionnelles présentes. Tests Node natifs, CI et réception navigateur à contrôler après publication. Modèles 2D statiques ; pas de simulation 3D ni d'animation temporelle complète revendiquée. Les décisions et seuils sont fictifs.

| Axe | Statut |
|---|---|
| S | PASS ciblé V8 ; réception exhaustive NOT RUN |
| G | PASS structurel V8 ; visuel NOT RUN |
| P | PASS structurel ; parcours DOM complet NOT RUN |
| F | PASS calcul ciblé ; Node/CI à vérifier |
| A | NOT RUN sur appareil et lecteur d'écran |

La conformité complète aux 249 sous-savoirs canoniques reste à établir ; aucune validation complète n'est revendiquée.

## Contre-audit après publication du commit `1ceb3754bf02a0ddf056848e0a89ab01d0b051ab`

- Modèles historiques 40–75 : **108/108** contre-calculs numériques et **108/108** rendus SVG structurels PASS dans V8, à partir de 36 références et de trois états par modèle ; aucun test navigateur revendiqué.
- Nouvelles missions : **15/15** états numériques et SVG PASS, **30/30** entrées invalides rejetées. Après publication, **15** vérifications complémentaires ciblées (catalogue, deux modèles historiques, HTML, syntaxe du test) PASS.
- Catalogue vérifié : **587/587** identifiants uniques, **17/17** univers ; présence des cinq pages HTML confirmée.
- GitHub Actions sur `1ceb3754bf02a0ddf056848e0a89ab01d0b051ab` : **4 workflows FAIL**, chacun **relancé une fois et de nouveau FAIL**. Jobs sans étape enregistrée ; journaux Node et scientifique indisponibles, HTTP 404 `BlobNotFound`. Cause non déterminée. CI **BLOCKED** ; tests Node natifs **NOT RUN** localement.
- Réception visuelle navigateur, mobile et lecteurs NVDA/TalkBack/VoiceOver : **NOT RUN**. Les cinq missions sont codées et testées de façon ciblée, mais **non validées complètement**.
- La page d'accueil, la carte et les fichiers `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` ne figurent pas dans le diff de production.

# SI QUEST V2.3 — Cycle 573–577

30 octobre 2026. HEAD initial `d81a6fa9249513da8edb7f7f513822b68bc665a8`. Correctif préalable `a24640c2230f53c758adbf45624e8302cc3b6e68`.

## Phase 0 et chantier A
Cahier maître V2.3, EXIGENCES, PRODUCTION, modèles, catalogue, tests et workflows lus. 36 missions historiques 40–75 contrôlées sur 3 états : **108/108 contre-calculs et SVG structurels PASS** dans V8. Cinq configurations P2 corrigées : moment-arm-02, kinetic-friction-01, spring-stiffness-01, beam-stress-02, gear-ratio-02. Trois tests P1 contenant des tailles de catalogue figées (562, 567, 572) ont été corrigés pour éviter les échecs lors de l'ajout de missions. Six configurations historiques demeurent incomplètes.

## Chantier B
- 573 `loop-4-20ma-burden-limit-01` : Dimensionnement de la charge résistive maximale d'une boucle 4–20 mA ; nominal 600 Ω.
- 574 `pt100-two-wire-lead-bias-01` : Biais de température d'une Pt100 deux fils dû à la résistance des conducteurs ; nominal 3,116883 K.
- 575 `bearing-inner-race-bpfi-01` : Fréquence cinématique théorique BPFI d'un roulement radial ; nominal 96 Hz.
- 576 `vickers-indent-pressure-01` : Conversion d'une empreinte Vickers en dureté exprimée en pression équivalente ; nominal 1 455,308 MPa.
- 577 `insulation-polarization-index-01` : Rapport des résistances d'isolement mesurées à dix et une minutes ; nominal 2,5 sans unité.

Modèles indépendants, 3 questions flash, hypothèses, domaines, unités, tolérances, schémas 2D et graphes paramétriques, corrigés conditionnels et décisions fictives. Trois essais, aides et sauvegarde via contrôleur mutualisé. Pas d'animation temporelle ni 3D revendiquée.

## Preuves
V8 ciblé : 75 contrôles de calcul, SVG, désynchronisation et entrées invalides PASS. Catalogue 577 identifiants uniques et 17 univers PASS. Tests Node créés mais Node natif NOT RUN ; CI du nouveau SHA à vérifier. Navigateur, matériel, NVDA, TalkBack, VoiceOver NOT RUN.

| Domaine | Statut |
|---|---|
| S | PASS ciblé ; réception exhaustive NOT RUN |
| G | PASS structurel ; visuel NOT RUN |
| P | PASS structurel ; parcours complet NOT RUN |
| F | PASS ciblé ; DOM NOT RUN ; CI non vérifiée |
| A | NOT RUN |

Les missions sont codées et testées de façon ciblée, non validées. CI, taxonomie des 249 sous-savoirs, accessibilité et recette matérielle restent ouverts.

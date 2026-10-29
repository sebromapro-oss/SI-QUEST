# SI QUEST V2.3 — Registre 428–432
Date : 29 octobre 2026. SHA initial : `b304103fc8f0fc60bb2ef75e0f6221cb0384a729`.

## Production
- 428 — `relief-valve-spring-cracking-01` : Soupape à ressort — Pression d'ouverture ; nominal 25.0000000 bar.
- 429 — `buck-ideal-duty-ratio-01` : Hacheur abaisseur — Rapport cyclique ; nominal 50.0000000 %.
- 430 — `two-support-eccentric-reaction-01` : Traverse sur deux appuis — Réaction excentrée ; nominal 6.00000000 kN.
- 431 — `capacitor-ripple-esr-heating-01` : Condensateur — Pertes par courant d'ondulation ; nominal 0.720000000 W.
- 432 — `hydraulic-orifice-ideal-flow-01` : Orifice hydraulique — Débit sous pression différentielle ; nominal 22.8168588 L/min.

## Historique
- P1 graphique corrigée : `hydro-volume-01`, tige auparavant dessinée sans traverser le flasque en position rentrée ; tige désormais visible au-delà, course réduite graphiquement et annoncée.
- Test de non-régression ajouté : positions tige/piston, cohérence volume.
- 36 missions 40–75 : tests historiques conservés ; contre-audit indépendant exhaustif NOT RUN.
- P2 taxonomie : réconciliation des sous-savoirs avec la cible 249 ouverte.

## Preuves
- 55 contrôles V8 ciblés avant publication : PASS ; 15 états, 20 paramètres invalides et 5 SVG désynchronisés.
- Node natif/DOM : tests ajoutés, exécution CI à confirmer.
- S PASS ciblé ; G PASS structurel, visuel NOT RUN ; P PASS structurel ; F PASS V8, CI à confirmer ; A NOT RUN NVDA/TalkBack/VoiceOver et appareils.
- 432 intégrations ne signifient pas 432 réceptions complètes.

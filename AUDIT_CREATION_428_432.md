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

## Contre-audit après commit de production `188ccc9dd38c13b8e501345a6387962355a9bdf1`
- **S PASS ciblé :** 55 contrôles V8 pré-publication sur les cinq modèles, 15 états min/nominal/max, 20 entrées invalides rejetées, 5 désynchronisations SVG rejetées. Résultats nominaux : 25 bar, 50 %, 6 kN, 0,720 W et 22,8168588 L/min. Les tests Node créés ne sont pas confondus avec une exécution native.
- **Historique 40–75 PASS structurel :** 36/36 missions, 108/108 états calcul/SVG finis et structurés, 72/72 paramètres NaN/Infinity rejetés, 36/36 séries de trois questions flash. Exécution V8 en deux lots avec moteurs réels. Validation scientifique indépendante exhaustive : NOT RUN.
- **P1 graphique corrigée :** `hydro-volume-01`, contrôle réel des états 0/300/600 mm : volumes 0/1,5/3 L ; extrémité de tige à 425/485/545 px, au-delà du flasque x=410 px. Géométrie testée, recette visuelle navigateur NOT RUN.
- **F PASS DOM simulé :** cinq parcours sur contrôleur réel et HTML du commit, 70 contrôles : verrouillage, saisie invalide, trois essais, trois aides, corrigé, réussite, étoiles et sauvegarde. Ce n'est pas un test sur navigateur réel.
- **Catalogue PASS :** 432/432 identifiants uniques, 432/432 pages présentes, 17/17 univers ; 264 libellés explicites de sous-savoirs distincts, 97 missions sans sous-savoir explicite. Taxonomie cible 249 : anomalie P2 ouverte, sans regroupement artificiel.
- **Protection PASS :** SHA des quatre fichiers d'accueil inchangés, branche archive conservée, dépôt privé.
- **CI native BLOCKED :** quatre workflows GitHub Actions (Node, scientifique, qualité, navigateur) ont échoué sur le commit `188ccc9dd38c13b8e501345a6387962355a9bdf1` ; les quatre relances ont également échoué. Jobs sans étapes observables, journal Node HTTP 404 `BlobNotFound`. Aucune réussite de CI native ni recette navigateur ne peut être revendiquée.
- **G NOT RUN visuel :** pas d'inspection des cinq nouvelles pages dans un navigateur ; **A NOT RUN matériel :** aucun essai NVDA, TalkBack, VoiceOver, Android, iPhone, Windows ou Mac.

| Axe | Statut final du cycle | Preuve |
|---|---|---|
| S | PASS ciblé | 55 contrôles V8 et 108 états historiques ; exhaustif NOT RUN |
| G | PASS structurel ; visuel NOT RUN | SVG, contrôle vérin et métadonnées |
| P | PASS ciblé | 3 questions flash, cinq corrigés et 70 contrôles DOM simulés |
| F | PASS V8/DOM simulé ; CI BLOCKED | 5 parcours simulés ; GitHub Actions non exécutables |
| A | NOT RUN manuel | Aucun appareil ni lecteur d'écran réellement testé |

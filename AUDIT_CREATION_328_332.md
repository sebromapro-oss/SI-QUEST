# SI QUEST V2.3 — Cycle 328–332 — 28 octobre 2026
## Phase 0
Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`. HEAD initial `dd5499c6ffcbf2469bdbf3409d198c88bb8c24a4`. Cahier maître V2.3, EXIGENCES.md, PRODUCTION.md, modèles, catalogue, contrôleur, page d'accueil, tests et workflows consultés. Aucune modification de `index.html`, `src/home.js`, `src/style.css`, `assets/` ou `.github/workflows/`.
## Chantier A — missions historiques 40–75
36 pages examinées pour la présence des questions flash : 26 disposent de l'injection contrôleur, 10 d'une liste native ; aucune absence identifiée. Anomalie P2 pédagogique dans `kinetic-friction-01` : le texte ne précisait ni le repère signé, ni la justification de N=mg, ni la distinction force algébrique/module. Correction du seul HTML historique et ajout du test `historical-kinetic-friction-pfs.test.cjs`. Le SVG historique existant représente déjà le frottement vers la gauche au contact.
## Chantier B — cinq sous-savoirs indépendants
328 `coriolis-slider-01` : accélération de Coriolis ; 329 `adc-quantization-rms-01` : bruit efficace de quantification ; 330 `nusselt-dittus-boelter-01` : convection turbulente ; 331 `rectangular-typeb-uncertainty-01` : incertitude-type B rectangulaire ; 332 `hollow-shaft-torsional-stress-01` : contrainte de torsion d'un arbre creux.
Modèles déterministes, domaine et unités, 3 questions flash, 3 essais/aides, corrigé conditionnel, décisions fictives, SVG paramétriques, graphiques après déverrouillage et sauvegarde mutualisée. Représentations 2D sans animation temporelle ni 3D revendiquées.
## Contrôles avant publication
V8 ciblé sur le code produit : 100 assertions réussies, dont 15 valeurs indépendantes, 15 contre-calculs, 15 SVG, rejets des paramètres invalides et désynchronisations, et contrôles des métadonnées et liens. Tests CJS `batch328-332.test.cjs`, `batch328-332-flow.test.cjs` et `historical-kinetic-friction-pfs.test.cjs` ajoutés pour CI. **Exécution Node native, CI, navigateur, NVDA, TalkBack, VoiceOver : non encore démontrée au moment de la préparation de ce registre.** S PASS ciblé ; G PASS structurel / visuel NOT RUN ; P PASS structurel / DOM à exécuter ; F PASS V8 / CI à vérifier ; A structurel partiel / manuel NOT RUN. La réception complète reste ouverte.

## Contre-audit V8 avant publication — preuves supplémentaires
- Les 36 missions 40–75 ont été relues : 26 disposent de trois questions flash injectées par le contrôleur, 10 de trois questions natives. Aucune absence de réactivation dans le périmètre vérifié.
- Trois groupes de 12 missions ont été exécutés sur trois états (minimum, nominal, maximum) : **108/108 calculs finis PASS** et **108/108 SVG structurels PASS**, à partir des fichiers historiques réels au HEAD initial. Ce contrôle ne vaut pas contre-calcul scientifique indépendant exhaustif.
- Le fichier CJS scientifique nouvellement créé a été exécuté dans un adaptateur JavaScript V8 utilisant le vrai moteur de base et le vrai catalogue modifié : **7/7 tests PASS, 163 assertions PASS**, y compris 15 références et invariants, domaines invalides, SVG et unicité des 332 entrées.
- Le contrôleur réel `src/investigation-mission.js` a été exécuté sur DOM simulé : **5/5 parcours PASS, 55 assertions PASS** (saisie invalide, trois essais, trois aides, corrigé conditionnel, réussite, trois étoiles et sauvegarde). Cela ne prouve pas la compatibilité navigateur réelle.
- Les tests V8 directs de génération totalisent **100 assertions PASS**. Les contre-calculs ont été vérifiés par expressions indépendantes : variance de quantification, invariant Nu/Re, variance rectangulaire, torsion par J et accélération de Coriolis.
- CI Node native : **NOT RUN avant publication** ; elle doit être vérifiée sur le SHA distant. Recette visuelle, Android/iOS, NVDA/TalkBack/VoiceOver : **NOT RUN**.

## Contrôle final et CI — 28 octobre 2026
- Production publiée sur `main` : `07f11767eb3e6db7cb05f0505b59363b0ff7f296` (12 fichiers modifiés/créés, sans fichier d'accueil ni carte).
- Contre-audit scientifique : correction P2 de la valeur intermédiaire Re^0,8 à Re=30 000, soit **3 816,78** (au lieu de 3 811,8) dans le corrigé de Dittus-Boelter ; résultat final Nu≈191,19 inchangé.
- Contre-audit graphique : pour ω=0, aucune flèche d'accélération de Coriolis ne doit être affichée ; ajout du cas limite et de son test de non-régression.
- CI GitHub Actions du commit de production : quatre workflows en **FAIL/BLOCKED**, avant toute étape de test observable. Identifiants : `40637500194` (scientifique), `40637500260` (Node), `40637500239` (navigateur), `40637500245` (qualité scientifique). Les jobs renvoient `steps=[]`, et les journaux des jobs Node et scientifique renvoient HTTP 404 `BlobNotFound`.
- Workflows scientifique et Node relancés (tentative 2) : **FAIL**, aucune étape exécutée ; cause exacte non identifiée. Ne pas confondre cette CI bloquée avec un échec prouvé des tests du code.
- Les tests V8 adaptés et le DOM simulé ont réussi avant ces deux dernières corrections ; ils seront relancés sur le code final. Recette visuelle et lecteurs d'écran : **NOT RUN**.

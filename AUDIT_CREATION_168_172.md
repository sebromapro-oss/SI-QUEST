# SI QUEST — Audit et production 168–172

Date : 26 octobre 2026. SHA initial : `40f64d3ec0c9227287aa13f743f55bbc4154dc76`.

## Phase 0
Dépôt privé ; `main`. Accueil protégé (`index.html`, `src/style.css`, `src/home.js`, `assets/archipelago-cinematic.svg`) non modifié. `src/catalog.js` est chargé par l'accueil : seules cinq nouvelles entrées ont été ajoutées. CI préexistante en échec avant attribution de runner, journaux indisponibles.

## Chantier A
Deux défauts graphiques P2 corrigés et contre-testés : `hydro-annular-force-01` affichait un effort à 0 bar ; `kinetic-friction-01` affichait un frottement à μ = 0. Les 36 identifiants historiques 40–75 ont été contrôlés au catalogue ; l'audit exhaustif de chaque mission reste ouvert.

## Chantier B
- 168 `bearing-friction-power-01` : Puissance de frottement d'un palier sous charge constante. Référence nominale 180.955737 W.
- 169 `poiseuille-microtube-flow-01` : Débit laminaire selon Hagen–Poiseuille dans un tube circulaire. Référence nominale 2.35619449 mL/s.
- 170 `ultrasonic-doppler-shift-01` : Décalage fréquentiel Doppler en réflexion à faible vitesse. Référence nominale 2.77128129 kHz.
- 171 `ntc-beta-resistance-01` : Loi exponentielle de résistance d'une thermistance NTC. Référence nominale 5.30146686 kΩ.
- 172 `fracture-critical-crack-01` : Longueur critique d'une fissure de rive par mécanique de la rupture linéaire. Référence nominale 10.1501877 mm.

Cinq modèles indépendants, hypothèses, unités, flash, aides, trois essais, corrigé conditionnel et sauvegarde via contrôleur partagé. Scènes 2D paramétriques sans temps artificiel ; seuils explicitement fictifs.

## Preuves
- 187 assertions V8 ciblées : PASS (calculs indépendants, bornes, unités, SVG, contrats et corrections).
- Syntaxe JS des fichiers modifiés : PASS (compilation V8). Node natif : NOT RUN avant commit.
- S : PASS ciblé ; G : PASS structurel, inspection visuelle NOT RUN ; P : PASS structure, essais pédagogiques réels NOT RUN ; F : PASS ciblé, navigateur réel NOT RUN ; A : PASS structure SVG, NVDA/TalkBack/VoiceOver NOT RUN.
- CI GitHub : BLOCKED si runner absent ; la réception complète n'est pas acquise.
- Catalogue : 172 entrées codées, aucune affirmation de 172 missions validées.

## Contre-audit complémentaire — 26 octobre 2026

- 36 missions historiques 40–75 : 3 passages par mission (minimum, nominal, maximum), vérification des unités, des résultats nominaux, de la finitude et des SVG : **432 assertions ciblées PASS**, 0 anomalie numérique supplémentaire. Ce contrôle n'est pas une inspection visuelle.
- `tests/batch168-172.test.cjs` : **8 tests PASS** en exécution V8 avec adaptateurs, sans exécution native Node.
- `tests/batch168-172-flow.test.cjs` : une erreur de génération initiale (sélecteur d'éléments DOM remplacé par des identifiants de missions) a été détectée et corrigée dans le commit `c75c955d3912696c7df81056ac990559323ecc18`. **49 assertions de parcours DOM simulé PASS** sur sept missions ; la correction a été contre-testée.
- Les workflows GitHub Actions déclenchés sur `eb197c1473305310f5feb7de72908bb38c7c2b14` et `c75c955d3912696c7df81056ac990559323ecc18` ont échoué **avant toute étape observable** : jobs sans `steps`, journaux 404. Une relance de la recette Node a échoué à nouveau. Statut CI : **BLOCKED** ; aucune affirmation de tests Node natifs réussis.
- Statuts S/G/P/F/A : **S PASS ciblé ; G PASS structurel, visuel NOT RUN ; P PASS présence des contenus, essai élève NOT RUN ; F PASS DOM simulé, CI BLOCKED ; A PASS balises SVG, tests NVDA/TalkBack/VoiceOver NOT RUN**.
- La réception complète reste ouverte ; les 172 entrées du catalogue ne sont pas 172 missions validées.

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

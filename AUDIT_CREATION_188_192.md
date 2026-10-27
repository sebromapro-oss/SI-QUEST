# SI QUEST V2.3 — Cycle 188–192 (2026-10-27)

**HEAD initial :** `c3b71ebb4ab7e01ef4961d7df382bc6298a6522f`. **Statut :** modifications produites et vérifiées par tests ciblés JavaScript V8 avant commit ; la CI Node native et les essais sur navigateurs réels ne sont pas validés par cette étape.

## Production

- Mission 188 — `bearing-projected-pressure-01` — Pression moyenne projetée d'un palier cylindrique lisse. Nominal : 13.333333 MPa. Domaine : [0 ; 30] kN.
- Mission 189 — `inductor-reactance-frequency-01` — Réactance d'une inductance idéale en régime sinusoïdal. Nominal : 25.132741 Ω. Domaine : [0 ; 400] Hz.
- Mission 190 — `coolant-thermal-power-01` — Puissance thermique transportée par un débit massique de liquide. Nominal : 3.3373120 kW. Domaine : [0 ; 20] L/min.
- Mission 191 — `brake-disc-adiabatic-rise-01` — Élévation de température adiabatique par dissipation de l'énergie cinétique. Nominal : 4.0760870 K. Domaine : [0 ; 72] km/h.
- Mission 192 — `encoder-linear-resolution-01` — Pas linéaire d'un codeur incrémental par roue de mesure. Nominal : 0.092038847 mm/compte. Domaine : [20 ; 300] mm.

## Audit historique 40–75

**P1 graphique, `rolling-load-01` :** une flèche bleue figurait une force motrice appliquée en dehors de la roue, alors que le modèle ne calcule que la résistance au roulement. Flèche supprimée ; les vecteurs poids, réaction normale et résistance conditionnelle sont conservés. Test ajouté : absence de force fictive et disparition de la résistance lorsque son coefficient vaut zéro. L'audit exhaustif S/G/P/F/A des 36 missions reste ouvert.

## Vérifications et limites

- S : PASS ciblé en V8 — 25 couples paramètre/résultat et contrôles de domaine ; test Node de contre-calcul indépendant ajouté (à exécuter en CI).
- G : PASS structurel V8 sur les cinq SVG ; inspection visuelle et géométrique individuelle sur navigateur NOT RUN.
- P : PASS structurel (objectifs, prérequis, 3 questions flash, hypothèses, solution, décision fictive) ; essai élève NOT RUN.
- F : PASS structurel V8 (catalogue 192 identifiants uniques) ; parcours DOM Node écrit mais non exécuté localement ; CI native BLOCKED si aucun runner.
- A : présence des balises SVG `title` et `desc` ; tests NVDA, TalkBack, VoiceOver, zoom et tactile NOT RUN.
- Les modèles sont 2D, sans prétention de 3D ni d'animation temporelle : l'investigation paramétrique met à jour le schéma, le graphe et la valeur depuis le même moteur.
- Aucune intervention réelle autorisée par les critères fictifs.

**Accueil protégé :** `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` exclus des modifications ; aucun ZIP ni GitHub Pages.

# SI QUEST V2.3 — Cycle 208–212 — 27 octobre 2026

HEAD initial : `f0bf16846242ed079a68ae58cd603e0de5ff4a7d` ; dépôt privé, branche main.

## Missions créées
- 208 : `shaft-torsional-shear-stress-01` — Contrainte tangentielle maximale dans un arbre circulaire plein ; nominal 15.915494 MPa.
- 209 : `series-rl-impedance-01` — Module de l'impédance d'une résistance et d'une inductance en série ; nominal 37.241918 Ω.
- 210 : `series-system-reliability-01` — Fiabilité exponentielle d'une chaîne de trois composants indépendants ; nominal 63.762815 %.
- 211 : `dry-air-ideal-density-01` — Masse volumique de l'air sec par l'équation d'état des gaz parfaits ; nominal 2.3771381 kg/m³.
- 212 : `parallel-spring-stiffness-01` — Raideur équivalente de deux ressorts linéaires en parallèle ; nominal 100.00000 N/mm.

## Correction historique
- **P1 G/P** : `thermal-resistance-01` représentait des flèches de flux de chaleur et des côtés « Chaud »/« Froid » alors que le modèle ne contient que e, λ et S, sans ΔT. Cause : représentation indépendante des données physiques. Correctif : flèches supprimées, températures non renseignées, sens indéterminé explicitement indiqué ; contre-test à λ = 0,2, 0,8 et 2 W/(m·K).

## Contrôles et réserves
- Audit des missions 40–75 : 36 identifiants, 108 états min/nominal/max contrôlés en V8 avant correctif ; absence de NaN/Infinity et présence de titres/descriptions SVG. Ce contrôle n'est pas une recette visuelle.
- Nouveaux modèles : calculs contradictoires, bornes, unités, propriétés et SVG ; parcours DOM simulés dans `tests/batch208-212-flow.test.cjs`.
- S : PASS ciblé si tests exécutés ; G : structurel ciblé, visuel NOT RUN ; P : structurel ciblé, essai élève NOT RUN ; F : V8 ciblé, CI native à vérifier ; A : essais manuels NVDA/TalkBack/VoiceOver NOT RUN.
- Aucune réception complète, aucun navigateur réel ni appareil testé. Les cinq schémas sont statiques et 2D ; pas de revendication de 3D ou de simulation temporelle.

## Dépôt
Accueil protégé : index.html, src/style.css, src/home.js, assets/archipelago-cinematic.svg inchangés. Aucun ZIP, GitHub Pages, changement de visibilité, force push ou suppression de branche d'archive.

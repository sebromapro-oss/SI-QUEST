# SI QUEST V2.3 — Cycle 443–447 — 29 octobre 2026

HEAD initial : `63c7558fae240cfa8fd9f888af19c40945789ab0`. Références lues : cahier maître V2.3, EXIGENCES, PRODUCTION, catalogue, modèles, tests, workflows et dépendances de l'accueil.

- 443 `bearing-equivalent-dynamic-load-01` — Roulement — Charge dynamique équivalente ; nominal 16.320000 kN.
- 444 `proportional-loop-steady-error-01` — Régulation proportionnelle — Erreur statique ; nominal 111.111111 tr/min.
- 445 `battery-loaded-terminal-voltage-01` — Batteries en série — Tension sous charge ; nominal 46.800000 V.
- 446 `compressor-isentropic-efficiency-outlet-temperature-01` — Compresseur — Température réelle de refoulement ; nominal 202.652854 °C.
- 447 `helical-compression-spring-deflection-01` — Ressort hélicoïdal — Flèche sous charge ; nominal 20.480000 mm.

## Audit historique 40–75
- 36 missions : 108 états numériques/SVG, 108 désynchronisations provoquées rejetées et 36 séries de trois questions flash : PASS ciblé V8 (trois lots de 12).
- P2 pédagogique corrigée : `measurement-uncertainty-01` ne distinguait pas son seuil fictif (1 %) d'une tolérance de pièce. Texte corrigé ; test ajouté.
- P2 taxonomie ouverte : cible contractuelle de 249 sous-savoirs ; le catalogue avait déjà 274 libellés distincts. Ne pas confondre libellés et classification canonique.

## Preuves et limites
- S : PASS ciblé : 15 contre-calculs indépendants, 20 cas invalides rejetés en V8.
- G : PASS structurel : 15 SVG calculés, 15 désynchronisations rejetées ; visuel NOT RUN.
- P : PASS structurel : objectifs, prérequis, trois flash, corrigés conditionnels et décisions fictives.
- F : PASS ciblé en V8 ; tests DOM Node et CI du nouveau SHA à vérifier. Présence des fichiers de tests ≠ exécution.
- A : clavier/tactile via composants existants ; essais matériels et NVDA/TalkBack/VoiceOver NOT RUN.
- CI précédente : trois workflows GitHub Actions échouaient avant toute étape observable ; diagnostic d'infrastructure ouvert.
- Accueil : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` inchangés. Aucun ZIP, Pages ni modification de branche archive.

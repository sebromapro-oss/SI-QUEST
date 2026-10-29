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

## Contre-audit exécuté après intégration

- Catalogue distant relu : **447 identifiants uniques, 447 pages HTML, 17 univers**. 350 missions ont un champ sous-savoir explicite, 279 libellés distincts, 97 sans champ explicite. La cible canonique de 249 reste à réconcilier (P2).
- Nouvelles missions 443–447 : **15/15** états modèle/contre-calcul indépendant et SVG structurels PASS en V8 ; **15/15** désynchronisations forcées rejetées ; **20/20** paramètres invalides rejetés.
- **5/5** parcours DOM simulés PASS (saisie invalide sans essai, trois essais erronés, trois aides et corrigé, réponse correcte, trois étoiles, sauvegarde). Simulation DOM JavaScript, pas essai navigateur réel.
- Missions 40–75 : **36/36** pages et trois questions flash, **108/108** calculs et SVG sur trois états, **108/108** désynchronisations rejetées, PASS ciblé V8 ; cela ne vaut pas expertise scientifique indépendante exhaustive.
- P2 corrigée : texte métrologique fictif cohérent avec le critère moteur de 1,0 % ; contrôle du critère à u=0,50 mm PASS.
- GitHub Actions sur commit `926505de4afde61f983a5c5248e6949245a08733` : recette Node `40816845506`, qualité `40816845493`, recette accueil `40816845466`, contrôles scientifiques `40816863602` : **FAIL/BLOCKED**, échecs avant étapes observables ; relances demandées. Le journal Node renvoie HTTP 404 `BlobNotFound`. Aucune suite Node native revendiquée PASS.
- Recette visuelle navigateur, Android/iPhone, NVDA, TalkBack et VoiceOver : **NOT RUN**.
- Accueil et carte : quatre fichiers protégés inchangés selon comparaison Git ; dépôt privé, aucune publication Pages.

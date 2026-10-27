# SI QUEST V2.3 — Cycle 288–292 — 27 octobre 2026

HEAD initial : `69b77eff956cbf01cea69a2b0a70e64599b3c2f5`. Dépôt privé main. Cahier maître V2.3, EXIGENCES, PRODUCTION, modèles, catalogue et tests consultés.

## Chantier A
P2 graphique/pédagogique : `measurement-uncertainty-01` montrait une flèche sans représenter l'incertitude. Correction : référence 50 mm, bornes 50±u, demi-largeur proportionnelle à u (340 px/mm), mention explicite que ±u n'est pas un intervalle de couverture. Contre-contrôle sur u=0,02 ; 0,10 ; 0,50 mm. Test ajouté. Les 36 missions 40–75 restent couvertes par `historical-40-75-exact.test.cjs`, à exécuter nativement.

## Chantier B
- 288 `slider-crank-position-01` : Bielle-manivelle — Position du coulisseau, nominal 199.714052 mm ; sous-savoir distinct.
- 289 `gear-base-circle-diameter-01` : Engrenage — Diamètre du cercle de base, nominal 112.763114 mm ; sous-savoir distinct.
- 290 `acoustic-time-leq-01` : Acoustique — Niveau équivalent sur deux phases, nominal 84.752906 dB(A) ; sous-savoir distinct.
- 291 `pneumatic-choked-massflow-01` : Buse pneumatique — Débit massique étranglé, nominal 1.416399 g/s ; sous-savoir distinct.
- 292 `resistor-johnson-noise-01` : Résistance — Bruit thermique efficace, nominal 1.287159 µV ; sous-savoir distinct.

Chaque mission comprend contexte professionnel, objectifs, prérequis, trois questions flash, hypothèses, repère, unités, calcul pur, SVG 2D, graphique, trois essais et aides, corrigé conditionnel, décision fictive, sauvegarde via contrôleur partagé. Aucune 3D ni animation temporelle fictive.

## Preuves
S : PASS ciblé V8 : 25/25 contre-calculs indépendants, 20/20 invalides rejetés, 5/5 propriétés, 5 rejets de SVG désynchronisés.
G : PASS structurel 25/25 SVG et 3 états historiques ; visuel navigateur NOT RUN.
P : PASS structurel, 15 questions flash et 5 corrigés ; essai élève NOT RUN.
F : catalogue 292/292 identifiants uniques, 17 univers ; tests Node et DOM simulés à exécuter après publication ; CI native à observer.
A : NVDA, TalkBack, VoiceOver, zoom et appareils NOT RUN.

Sources : NASA Glenn (https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/mass-flow-rate-equations/) ; NIST CODATA (https://physics.nist.gov/cgi-bin/cuu/Value?k) ; CDC/NIOSH (https://www.cdc.gov/niosh/noise/prevent/understand.html).

Accueil et carte intacts : aucun changement de index.html, src/home.js, src/style.css ou assets/archipelago-cinematic.svg. Aucun ZIP, publication publique ou modification d'archive.
## Contre-audit graphique et état CI (même cycle)

P1 graphique identifié et corrigé avant clôture : la première buse SVG présentait une partie divergente, contradictoire avec l'hypothèse de buse **convergente**. Profil corrigé : convergence suivie d'un col de section constante, sans divergence. Test de non-régression ajouté.

Exécutions ciblées JavaScript V8 sur le code du lot : 25/25 contre-calculs scientifiques indépendants, 20/20 paramètres invalides rejetés, 25/25 SVG structurels, 5/5 propriétés, 5/5 SVG désynchronisés rejetés ; 3/3 états du schéma historique PASS. Les 36 missions historiques 40–75 ont été testées sur leurs trois états (108/108 PASS), en trois groupes de 12 missions. Cinq parcours DOM simulés sur le contrôleur réel : 5/5 PASS (trois essais, aides, corrigé, succès, sauvegarde). Il s'agit de tests V8 et DOM simulés, non de tests navigateur réel.

GitHub Actions au SHA `49f644f11094747f6217866b65319ac09ebf02f0` : quatre workflows en échec avant étape observable ; jobs sans steps ni runner attribué. Relances des workflows Node (40585903954) et scientifique (40585903990) : deuxièmes tentatives également en échec sans étapes. **CI native BLOCKED** ; aucune assertion de réussite Node native. Tests visuels navigateur et matériels NVDA/TalkBack/VoiceOver **NOT RUN**.

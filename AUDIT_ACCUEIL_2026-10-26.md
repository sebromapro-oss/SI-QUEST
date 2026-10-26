# SI QUEST — Audit d'intégration de l'accueil
Date : 26 octobre 2026
Branche : main
Périmètre : accueil uniquement (src/home.js, src/style.css) ; index.html et catalogue inchangés sur ce lot.

## Implanté
- 17 environnements d'îles SVG différenciés, générés depuis l'indice des 17 univers existants : formes de terrain, structures, mécanismes et éléments techniques.
- Zones interactives des îles enveloppant leurs propres décors vectoriels ; une transformation commune évite de décaler le décor par rapport au bouton.
- Catalogue vivant : chaque univers ouvre les missions répertoriées via leurs URLs du catalogue.
- Bouton JOUER associé à la première sélection de missions réellement répertoriée.
- Navigation secondaire textuelle ; dialogues et commande Échap ; adaptation CSS pour plusieurs tailles.
- Aucun compteur de récompense inventé. Le nombre d'étoiles n'est pas renseigné en absence de source fiable.

## Contrôles réalisés
Inspection automatisée statique via lecture GitHub du code au HEAD courant : 10 conditions sur 10 satisfaites (17 cas de décor, 17 placements, lien de sélection, liaison catalogue, action JOUER, fermeture Échap, SVG, CSS mobile, réduction du mouvement, catalogue non remplacé).
Ces contrôles ne démontrent pas le rendu, l'absence de collision, ni le bon fonctionnement des parcours en navigateur.

## Problèmes ouverts et limites
- Les illustrations SVG sont des décors techniques stylisés. Ce n'est pas encore la qualité cinématographique de la maquette de référence, ni de la véritable 3D WebGL.
- Les 17 îles dans une seule vue mobile risquent le chevauchement des étiquettes et des cibles. Contrôle visuel obligatoire et stratégie de caméra/zoom ou parcours par île à consolider.
- Le bouton JOUER ouvre la première zone disposant de missions, pas une reprise de la dernière mission.
- Pas de récupération consolidée des étoiles, badges ni de la dernière mission.
- Tests syntaxiques Node, DOM, rendu graphique, captures réelles, animations et performances non exécutés dans cette opération.
- Tests matériels Android/iPhone/Windows/Mac, clavier réel, NVDA, TalkBack, VoiceOver et vérification RGAA/WCAG non réalisés.
- Aucune diffusion publique GitHub Pages effectuée.
- Les moteurs scientifiques et les missions ne sont pas modifiés par ce lot.

## Statut
**Implémenté partiellement — non réceptionné**.
Ne pas déclarer conforme ni validé avant tests en navigateur, correction des défauts constatés, recette mobile et vérification indépendante.


## Lot artistique complémentaire — 26 octobre 2026
- Asset ajouté : `assets/archipelago-cinematic.svg` (panorama SVG 1600×900 : plusieurs plans atmosphériques, deux grandes îles détaillées, cascades, reliefs, bâtiments et machines, pont énergétique).
- Intégration CSS dans `src/style.css`, avec couches de lisibilité, variations mobile et conservation des 17 scènes SVG interactives préexistantes.
- Vérification statique distante : 7 assertions/7 satisfaites sur les fichiers GitHub (asset complet, dégradés et flou, chemin CSS, 17 décors, liens catalogue, réduction du mouvement, chargement de scripts).
- Contrôles NON réalisés : ouverture réelle en navigateur, comparaison par capture avec la maquette, performance mesurée, contrôle de chevauchement mobile, réception lecteur d'écran, tests matériels.
- Écart ART-01 / ART-02 : ambiance améliorée mais fidélité cinématographique non démontrée ; les éléments SVG procéduraux des 17 îles restent des illustrations stylisées, et les grandes îles de fond ne constituent pas des lieux interactifs individualisés.
- Statut : **implémenté, non réceptionné**. La correction du parcours mobile et la recette visuelle demeurent ouvertes.

## Recette navigateur ajoutée — 26 octobre 2026
- Corrections : gestion du focus des dialogues et de leur fermeture ; défilement sans valeur de comportement non standard ; tailles minimales des cibles sur petits écrans ; blocage du défilement arrière-plan avec fenêtre ouverte.
- Ajout de `tests/accueil-browser.spec.cjs` avec 4 profils de rendu : bureau 1440×900, mobile émulé Android 390×844, iPhone émulé 375×812, tablette émulée 1024×768.
- Scénarios Playwright : 17 îles et 17 liens alternatifs, JOUER, ouverture du panneau, accès aux missions, sélection hydraulique, fermeture, capture, largeur sans débordement, Échap et restauration du focus.
- Workflow `.github/workflows/accueil-browser.yml` : installe Chromium via Playwright, sert le projet statique, lance les tests et archive les captures.
- **Important :** workflow ajouté au dépôt mais exécution et résultats non confirmés lors de cette opération. Les tests en émulation n'équivalent pas à Android/iPhone physiques ni à des essais NVDA/TalkBack/VoiceOver.
- Risque ouvert : la densité des 17 îles sur écran de 375 px reste à évaluer visuellement et à corriger selon captures. Le test de débordement global ne détecte pas les collisions internes des étiquettes.
- Statut : **tests automatisés configurés ; réception navigateur non encore démontrée**.

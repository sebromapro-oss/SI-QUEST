# SI QUEST V2.5 — Recette navigateur transversale et audit de sécurité (31 octobre 2026)

## Périmètre et méthode

- Dépôt `sebromapro-oss/SI-QUEST`, branche `main`. HEAD initial : `d828aaca300badaf479663042b8e077a56ee0af7`.
- Phase 1 maintenue : **597 missions existantes, aucune mission créée**.
- Nouvelle recette Playwright Chromium dans `tests/mission-browser.spec.cjs`, déclenchée par `.github/workflows/accueil-browser.yml` en cas de modification des missions, du contrôleur, de la 3D, des styles ou des tests navigateur.
- Deux contextes automatisés : bureau 1440 × 900 et **Android émulé** 390 × 844. Le navigateur est Chromium ; ce ne sont ni un appareil Android physique ni un iPhone/Safari.
- La recette comporte 22 scénarios Playwright au total, dont 16 pour l'accueil et 6 pour les missions. Deux scénarios de parcours visitent chacun 25 missions, soit **50 navigations de missions**, sans constituer 50 validations scientifiques indépendantes.

## Échantillon de 25 missions — les 17 univers représentés

| Univers | Mission examinée |
|---|---|
| SI-01 | `slider-crank-retraction-speed-01` |
| SI-02 | `two-cart-impact-struck-speed-01` |
| SI-03 | `four-part-pulley-ideal-tension-01` |
| SI-04 | `kelvin-voigt-parallel-force-01` |
| SI-05 | `milling-cutting-speed-01` |
| SI-06 | `capillary-pressure-drop-01` |
| SI-07 | `pneumatic-tank-ideal-gas-mass-01` |
| SI-08 | `dielectric-parallel-plate-capacitance-01` |
| SI-09 | `pi-integrator-antiwindup-clamp-01` |
| SI-10 | `pv-module-temperature-derating-01` |
| SI-11 | `journal-bearing-viscous-torque-01` |
| SI-12 | `radiation-surface-ambient-01` |
| SI-13 | `strain-half-bridge-output-01` |
| SI-14 | `soderberg-fatigue-safety-01` |
| SI-15 | `milling-feed-per-tooth-01` |
| SI-16 | `safety-two-out-of-three-vote-01` |
| SI-17 | `encoder-measured-travel-01` |
| Complément SI-15 | `maintenance-poisson-spares-twofail-01` |
| Complément SI-05 | `chain-drive-pitch-speed-01` |
| Complément SI-06 | `elbow-minor-pressure-loss-01` |
| Complément SI-06 | `hydraulic-oil-tank-thermal-expansion-01` |
| Complément SI-08 | `threephase-copper-loss-temperature-01` |
| Complément SI-13 | `sensor-4-20ma-pressure-01` |
| Complément SI-07 | `acoustic-energy-reflectance-01` |
| Complément SI-04 | `hollow-shaft-torsional-stress-01` |

Pour chaque mission échantillonnée : chargement réel Chromium, présence de la saisie, corrigé initialement verrouillé, réponse volontairement incorrecte, activation de l'exploration qualitative, maintien du verrouillage du verdict et du corrigé, présence du SVG et contrôle du débordement horizontal. Les missions `motion-01` et `circular-02` ont en plus des scénarios détaillés : trois essais, trois aides, réinitialisation, caméra et pas de temps 3D.

**Limite :** ces contrôles vérifient le comportement de l'interface ; ils ne démontrent ni l'exactitude de chaque équation, ni la fidélité des mouvements temporels, ni l'accessibilité réelle.

## Anomalie fonctionnelle détectée et corrigée

- **Symptôme réel :** `encoder-measured-travel-01` ne déverrouillait pas l'exploration après une réponse incorrecte ; Chromium remontait deux erreurs `Paramètre hors domaine`.
- **Cause racine :** le contrôleur commun générait 101 points fractionnaires entre 512 et 8192 alors que le modèle du codeur impose un **nombre entier de fronts**. Le curseur HTML indiquait `step="1"`, mais le contrôleur ne consultait que `c.inputStep` et quelques identifiants codés en dur.
- **Correction :** lecture du pas HTML lorsqu'il est entier et cohérent avec des bornes entières ; échantillonnage exclusivement sur des points admissibles, plafonné à 101 points pour éviter des milliers de calculs inutiles. Les paramètres continus restent continus.
- **Contre-audit :** tests existants conservés (pignon à nombres pairs, couple continu, domaine entier historique) et nouveau test sur les fronts entiers du codeur. Le DOM simulé a été adapté à l'accès facultatif aux attributs, sans contourner les validations.

## Résultats GitHub Actions confirmés

- **Commit de code/test `f81578e98b62d57346039eed59f08285362bbef2` : 2 189/2 189 tests Node réussis, 0 échec ; trois workflows `success`.**
  - [Recette Node](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41168789588)
  - [Contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41168789545)
  - [Qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41168789565)
- **Recette navigateur du correctif `43cb849d79312632cd296ab8182a6a3571c90b68` : 22/22 scénarios réussis** (dont 25 missions dans les 17 univers, sur deux viewports) : [exécution Chromium](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41168638949).
- Échecs intermédiaires conservés dans l'historique : dépassement du délai Playwright de 30 s pour un parcours de 25 pages, blocage authentique du codeur, incompatibilité des anciens DOM simulés avec `getAttribute`, puis erreur de syntaxe introduite dans un test. Tous ces points ont été corrigés avant la recette ci-dessus. Aucune assertion scientifique n'a été supprimée.
- Les futurs commits documentaires déclenchent leurs propres workflows : ne pas attribuer automatiquement à un SHA documentaire le résultat du SHA de code.

## Sécurité et confidentialité : réserves majeures

1. **Le dépôt GitHub est public**, contrairement à l'adjectif « privé » présent dans le cahier des charges. Sa visibilité n'a pas été modifiée.
2. Inventaire de l'arborescence du HEAD : 1 117 entrées ; aucun fichier de type `.env`, clé privée, base de données ou certificat sensible n'a été identifié **par son nom**. Recherches de code sur `API_KEY`, `BEGIN PRIVATE KEY`, `Bearer`, `password`, `@gmail.com` : aucun résultat. Cela ne prouve **pas** l'absence de secrets dans tous les contenus, commits historiques ou artefacts.
3. Les résultats attendus sont présents dans les pages HTML publiques via `window.SI_MISSION.expected` ; la progression et les étoiles des missions utilisent `localStorage` côté navigateur. **Le verrouillage du corrigé est pédagogique, non une protection cryptographique ou serveur.** La progression locale ne constitue pas une preuve authentifiée de compétence.
4. La protection des données personnelles, des corrigés réservés et des preuves privées exige un dispositif distinct avec authentification et contrôle d'accès côté serveur. Une éventuelle intégration à SI FRANCE est **une dépendance à signaler au pilote AppDeploy**, pas une modification à effectuer dans ce cycle GitHub.
5. Le fichier d'attribution `.si-quest-authorship.json` est présent dans le dépôt public ; il n'est pas affiché dans l'interface du jeu, mais reste consultable dans les sources. Ce marquage n'est pas une garantie contre la copie.

## Réception et prochaine action

- **Prouvé :** 2 189 tests Node verts sur `f81578e9` ; 22 scénarios Chromium verts sur `43cb849d`, avec contrôle transversal de 25 missions sur deux viewports.
- **Non réalisé :** essais sur appareils Android/iPhone physiques ; Firefox/Safari ; NVDA, TalkBack, VoiceOver ; audit historique exhaustif des secrets ; examen graphique individuel des 597 missions ; fidélité temporelle de toutes les animations ; conformité RGAA/WCAG.
- **Suite :** étendre progressivement la recette Chromium à l'ensemble du catalogue, auditer les cas limites et les entrées invalides, établir des captures exploitables et un protocole manuel d'accessibilité. Phase 2 (598–996) toujours bloquée.
- Aucun code, lien, backend, budget ou déploiement AppDeploy des autres projets SI FRANCE n'a été modifié.

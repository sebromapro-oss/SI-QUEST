# SI QUEST — développement scientifique

Jeu de missions scientifiques en Sciences Industrielles (SI), destiné à l'entraînement et à l'autonomie des élèves.

## État du dépôt privé

Ce dépôt est **privé**. Il ne contient pas encore le code complet de l'application : la première importation des fichiers sources reste à effectuer. **Ne pas interpréter le présent dépôt comme une version jouable ou déployée.**

L'archive de référence la plus récente disponible dans l'espace de travail ChatGPT est `SI_QUEST_CYCLE_28_20261025.zip` (12 missions locales, dont 2 nouvelles au cycle 28). La présence de cette archive dans ChatGPT ne signifie pas qu'elle a été transférée sur GitHub.

## Principes non négociables

- 17 univers de SI ; objectif 249 sous-savoirs et 996 missions réellement distinctes.
- Modèles physiques déterministes, unités SI, hypothèses et limites explicites.
- Calcul élève, simulation liée au modèle, interprétation, décision technique.
- Aides progressives ; solution complète après 3 indices **et** 3 essais.
- Clavier et tactile ; Android/iPhone/Windows/Mac ; DYS et contrastes.
- Aucun faux niveau, aucun faux test NVDA/TalkBack/VoiceOver.
- Accueil et carte conservés, sans refonte.
- Aucun GitHub Pages public sans validation explicite.

## Organisation cible

`index.html`, `play.html`, `src/`, `assets/`, `tests/`, `manifest.webmanifest`, `sw.js`, `README.md`, `QUALITY.md`.

Les captures de tests historiques et les ZIP volumineux ne doivent pas être ajoutés aux commits ordinaires. Les sources et les tests reproductibles doivent être versionnés. La preuve de livraison exige des fichiers réellement présents sur la branche et des tests exécutés.

## Contrôle qualité minimal

`node --test tests/*.test.cjs` et essais DOM/Canvas Chromium sur 1440, 390 et 320 px. Les tests matériels d'accessibilité restent une étape indépendante.

**État de synchronisation : initialisation GitHub effectuée ; import complet du code non réalisé.**

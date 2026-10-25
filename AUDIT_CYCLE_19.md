# Cycle 19 — séparation calcul / contraintes

## Défaut confirmé
Le bouton « Vérifier mon calcul » utilisait `compute(proposed).passed`, qui évalue les contraintes de réussite de la mission et non la validité arithmétique du calcul. Une valeur physiquement calculable mais hors objectif était annoncée comme un calcul faux.

## Corrections
- Gravity Run : validation séparée des trois calculs avec tolérances, message par grandeur, sans bloquer l'essai.
- Gear Forge, Méca Lab et Hydro Flow : le bouton s'intitule « Vérifier mon réglage » et annonce explicitement la conformité aux contraintes, sans prétendre juger la justesse des calculs intermédiaires.
- Le lancement d'un essai avec réglage non conforme reste autorisé dans les plages de saisie.
- Accueil et carte non modifiés.

## Limites et tests
- Tests scientifiques automatisés du projet : voir exécution du cycle.
- Pas de recette navigateur ni de test réel Android/iPhone, clavier ou lecteur d'écran effectué.
- Les calculs intermédiaires des trois missions hors Gravity Run ne sont pas encore saisis séparément ; leur justesse ne peut donc pas être évaluée.
- Le moteur de progression et les animations ne sont pas certifiés par cette correction.

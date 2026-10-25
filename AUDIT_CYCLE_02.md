# SI QUEST — réception scientifique du cycle 02

Date : 25 octobre 2026. Dépôt privé : `sebromapro-oss/SI-QUEST`. Cycle précédent : 01.

## Production effectivement livrée

- `hydro-01` : vérin hydraulique double effet, modèle physique indépendant, calculs à tolérances explicites, saisie décimale française, simulation synchronisée sortie/rentrée, interverrouillage de sécurité et carnet d'essais local.
- Correction `gear-01` : tangence des cercles primitifs (rapport géométrique 1:3), rotation autour des axes, rapport angulaire 3:1, correction non révélée avant validation ou conditions d'aide, prise en charge de la virgule.
- Catalogue : deux missions réellement implémentées, aucune mission fictive.
- Tests : scientifiques, cas limites, saisie, structures HTML et parcours simulés du DOM ; vérification des transitions réussite/échec et de la persistance.
- GitHub Actions : analyse syntaxique Node et tests indépendants à chaque push sur `main`.

## Référence physique

Piston D = 50 mm ; tige d = 28 mm ; course = 250 mm ; charge = 12 000 N ; η mécanique = 0,90 ; η volumétrique = 0,95 ; débit nominal = 12 L/min.

- Surface piston : 19,63495 cm² ; surface annulaire : 13,47743 cm².
- Pression minimale théorique : 67,90611 bar ; pression avec réserve d'effort de 10 % : 74,69672 bar.
- À 80 bar et 12 L/min : force en sortie 14 137,17 N ; vitesse sortie 96,766 mm/s ; vitesse rentrée 140,976 mm/s. **Essai refusé** (rentrée > 120 mm/s).
- À 80 bar et 10 L/min : vitesse sortie 80,639 mm/s ; vitesse rentrée 117,480 mm/s. **Essai admissible dans le modèle**.
- Aucun comportement transitoire, perte de charge de conduite, compressibilité ou dynamique de charge n'est simulé. Le résultat ne vaut pas autorisation de mise en service réelle.

## Preuves de tests

Première intégration du cycle 02 : exécution GitHub Actions `40202364543`, **28 tests réussis, 0 échec**, analyse syntaxique réussie.

Les correctifs complémentaires de cohérence de décision (essai sûr puis dangereux, interruption) ajoutent deux tests ; leur réussite doit être constatée dans l'exécution CI du commit final. **Ne pas déduire leur réussite du précédent rapport.**

## Limites de réception

Aucun essai matériel démontré sur Android/iPhone, tablette, Windows ou Mac. Aucun essai manuel NVDA, TalkBack, VoiceOver, zoom 400 %, audit WCAG 2.2 AA ou contrôle visuel individuel des animations sur appareils réels. Le rendu graphique est une représentation 2D schématique, pas une CAO du vérin.

Le dépôt reste privé ; aucune activation de GitHub Pages ni de service payant.

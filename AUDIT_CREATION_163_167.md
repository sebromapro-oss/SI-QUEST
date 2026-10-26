# SI QUEST V2.3 — Audit et création 163–167

Date : 26 octobre 2026, 21 h (Europe/Paris). SHA initial : `400d7ebc8f03e281053df815c93dcdbf7b5e4a9f`.

## Phase 0
Dépôt privé, branche main, cahier maître V2.3, EXIGENCES.md, PRODUCTION.md, modèles, catalogue et tests lus. Dépendances de l'accueil : index.html charge uniquement src/catalog.js et src/home.js. Aucun fichier de l'accueil, carte, styles ou assets modifié ; catalogue étendu sans refonte.

## Chantier A
- **P0 fonctionnel :** au moins 11 missions historiques 40–75 ne disposaient d'aucun profil dans src/investigation-mission.js, tandis que le contrôleur lançait une exception si le profil manquait. Ajout d'un profil de repli contextuel, plus profil spécifique pour la rentrée de vérin. Régression de parcours sur trois missions historiques ajoutée.
- **P1 scientifique :** hydro-speed-01 et hydro-cylinder-speed-02 calculaient exactement la même vitesse sur la même surface pleine : doublon scientifique. La seconde mission étudie désormais la rentrée côté tige, D = 80 mm, d = 50 mm, A = 0.003063053 m², vitesse nominale = 0.06529434 m/s. Diagramme et sens de l'effort remplacés ; flèche absente à débit nul ; corrigé, tolérance, tests et consignes alignés.
- Audit 40–75 : vérifications ciblées historiques disponibles, réception S/G/P/F/A exhaustive toujours ouverte.

## Chantier B
| N° | Mission | Valeur nominale |
|---|---|---|
| 163 | `helical-gear-axial-force-01` | 727.940469 N |
| 164 | `oil-pressure-wave-speed-01` | 1283.377896 m/s |
| 165 | `parallel-axis-inertia-01` | 1.260000 kg·m² |
| 166 | `heat-pump-carnot-cop-01` | 7.828750 sans unité |
| 167 | `oil-kinematic-viscosity-01` | 50.000000 mm²/s |

Chaque mission comporte sous-savoir distinct, situation métier, trois questions flash, modèle pur, hypothèses, unités, domaine, calcul et corrigé détaillé, SVG 2D paramétrique, graphe en fonction du paramètre, trois essais/aides, carnet et sauvegarde via contrôleur commun. Seuils fictifs. **Pas de simulation temporelle ni de 3D revendiquée.**

## Preuves et réserves
S : PASS ciblé après contre-calculs ; G : structure SVG contrôlée, inspection visuelle NOT RUN ; P : contenu présent, essai élève NOT RUN ; F : V8 et DOM simulé ciblés si exécutés, CI native BLOCKED tant que les workflows échouent avant runner ; A : NVDA/TalkBack/VoiceOver et appareils NOT RUN. Aucun niveau déclaré validé intégralement. Aucun ZIP, publication Pages ou changement de visibilité.

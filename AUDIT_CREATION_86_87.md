# SI QUEST — Audit et création des missions 86–87
Date : 26 octobre 2026. Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`. HEAD initial : `7e0611f9d231f89c9223011d105b929f60826401`.

## Chantier A — Audit et correction
Mission existante `sampling-01` (lot 40–59) : l'ancien schéma dessinait toujours sept échantillons fixes alors que la période T changeait. Le modèle fₑ = 1000/T (T en ms) était correct, mais le schéma n'était pas synchronisé.
**Correction effective** : signal témoin fictif de 20 Hz sur une fenêtre de 60 ms ; positions des échantillons aux instants t = kT. Pour T = 5, 10 et 20 ms, respectivement 13, 7 et 4 échantillons. La mission explique désormais le rôle du signal témoin. Tests automatiques de position, d'effectif et de régularité.

## Chantier B — Production
- Mission 86 `planetary-fixed-ring-01` (SI-05) : train épicycloïdal simple à couronne fixe, zₛ = 24, zᵣ = 72, zₚ = 24 ; nₚ = nₛ/4 ; **225 tr/min** pour nₛ = 900 tr/min. Cercles primitifs 2D tangents, pas de profil de denture.
- Mission 87 `thermal-radiation-01` (SI-12) : plaque grise diffuse, ε = 0,85, A = 0,50 m², Tₛ = 80 °C, Tₐ = 20 °C ; **196,86 W** par Stefan-Boltzmann avec kelvins. Ni convection ni conduction.
Chaque mission dispose de son HTML, modèle, unités, contexte métier, réactivation, graphique calculé, schéma paramétrique, aides, essais, corrigé conditionnel, sauvegarde et décision technique.

## Registre de preuves S/G/P/F/A
| Axe | Éléments contrôlables | Statut |
|---|---|---|
| S | Contre-calcul Willis et Stefan-Boltzmann, limites, seuils et domaine dans `tests/batch86-87.test.cjs` | Tests créés ; CI à vérifier après commit |
| G | Cercles primitifs, instants d'échantillonnage, labels et unités SVG | Contrôle de code ; navigateur non testé |
| P | Contextes professionnels, prérequis, calculs, remédiation, critères fictifs | Codé ; essai avec élèves non réalisé |
| F | Catalogue, pages, moteur commun et tests Node | CI à vérifier après commit |
| A | Titres/descriptions SVG, états textuels, labels et moteur commun | Partiel ; NVDA/TalkBack/VoiceOver non testés |

## Réserves
Pas de scènes 3D manipulables pour ces deux nouveaux modèles ; aucun essai navigateur, mobile, clavier matériel, zoom ni lecteur d'écran réel revendiqué. L'audit complet des missions 40–75 reste ouvert. Aucun changement de visibilité, accueil, carte, branche d'archive ou publication GitHub Pages.

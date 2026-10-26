# SI QUEST — Audit et production des missions 84–85
Date : 26 octobre 2026. Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`. HEAD de départ : `fecd6c9628b9e858ea7506f56efd86f2e24e7c5f`.

## A — Audit et correction
- **Mission existante `pneumatic-consumption-01` (lot 60–75)** : le schéma affichait un piston fixe lorsque la course variait entre 50 et 400 mm. Cette représentation n'était pas synchronisée avec le volume balayé. Correction du SVG : position du piston et volume balayé proportionnels à la course, tige et position initiale explicites ; texte distinguant volume géométrique et consommation d'air libre.
- Contrôle contradictoire : à 400 mm, le volume balayé est le double de celui à 200 mm. Un test de régression contrôle la monotonie des positions graphiques et la proportionnalité du volume.
- L'audit des 36 missions 40–75 reste **partiel** : aucune validation visuelle ou matérielle globale n'est revendiquée.

## B — Création
- **84 — `rotation-energy-01` (SI-02)** : énergie cinétique d'un volant, `E = ½Jω²`, `J = 12 kg·m²`, `n = 300 tr/min`, soit **5,922 kJ**. Plafond pédagogique fictif 8 kJ ; contrôle quadratique de la vitesse.
- **85 — `center-mass-01` (SI-03)** : abscisse du centre de masse de deux masses ponctuelles, `xG = Σmx/Σm`. À `m₂ = 80 kg`, résultat **1,040 m** depuis A. Seuil pédagogique fictif 1,20 m. Ne vaut pas étude de stabilité réelle.
- Chaque mission dispose de son fichier HTML, de son modèle calculable, de sa courbe interactive et de son schéma 2D paramétrique, de trois essais et aides, d'un corrigé conditionnel, d'une décision métier et de la sauvegarde du moteur commun.

## Registre de preuves S / G / P / F / A
| Axe | Preuve ou contrôle | État |
|---|---|---|
| S | Tests indépendants à 3 points, propriété quadratique et moment massique, domaine négatif et seuils, `tests/batch84-85.test.cjs` | À confirmer par CI sur le commit final |
| G | SVG paramétrique et positions de piston, unités et labels contrôlés par tests de code | Partiel ; rendu navigateur réel non testé |
| P | Situation métier, hypothèses, calcul, aides, corrigé, critère fictif et remédiation | Codé ; réception élève non effectuée |
| F | Catalogue et configuration, moteur commun, tests Node automatisés | À confirmer par CI ; navigateur réel non testé |
| A | Titres, descriptions SVG, labels, annonces textuelles, moteur commun | Partiel ; NVDA, TalkBack, VoiceOver, zoom et clavier réels non testés |

## Réserves
Aucune scène 3D manipulable créée pour ces missions ; les deux problèmes sont modélisés dans un plan et leur interprétation peut se faire en 2D. Aucun test réel sur Android, iPhone, Windows ou Mac n'est revendiqué. Aucune publication GitHub Pages, aucune refonte de l'accueil ni changement de visibilité.

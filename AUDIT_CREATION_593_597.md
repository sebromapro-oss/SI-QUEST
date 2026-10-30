# SI QUEST — Cycle 593–597, 30 octobre 2026

## Traçabilité
HEAD initial `8538c7cfef00a92b9c0196d3a28fe43340698496`. Cinq missions créées et ajoutées au catalogue : `radiation-surface-ambient-01`, `thermal-peclet-transport-01`, `kelvin-voigt-parallel-force-01`, `capillary-pressure-drop-01`, `dielectric-parallel-plate-capacitance-01`. Catalogue : 597 entrées, 17 univers. Cible 996 non atteinte.

## Audit et correction historique (missions 40–75)
Anomalie P2 du contrôleur partagé `src/investigation-mission.js` : après la troisième réponse erronée, `hints=3` était attribué sans consultation des aides, ce qui rendait le corrigé accessible sans les trois indices demandés. Correction : ne plus attribuer automatiquement les aides ; texte de remédiation ajusté ; test de non-régression ajouté. Impact transversal sur les missions utilisant ce contrôleur, dont celles de la plage 40–75.

Contre-audit ciblé de deux missions historiques : `kinetic-friction-01` (4 valeurs de μ) et `spring-stiffness-01` (4 efforts), calcul et attributs géométriques des SVG : 8/8 PASS en exécution JavaScript V8. Audit exhaustif de la plage 40–75 : NOT RUN.

## Modèles et preuves
- Rayonnement : εσA(T⁴−Tₐ⁴), nominal 652,5101 W, échange avec grande enceinte noire, hors convection.
- Péclet thermique : vL/α, nominal 20 000 sans unité.
- Kelvin-Voigt : kx+cv, nominal 250 N.
- Hagen-Poiseuille : 8μLQ/(πr⁴), nominal 6,63146 kPa, régime laminaire à vérifier.
- Condensateur plan : ε₀εᵣA/d, nominal 2,21355 nF, effets de bord négligés.

Contrôles JavaScript V8 effectivement exécutés : 60/60 PASS (15 cas nominal/bornes, calculs croisés, génération SVG et 30 rejets de paramètres invalides). Test Node natif : NOT RUN ; tests navigateur/Android/iOS/Windows/Mac/NVDA/TalkBack/VoiceOver : NOT RUN. Les schémas sont 2D de principe ; pas d'animation temporelle ou de scène 3D physique revendiquée.

## CI et réception
Quatre workflows GitHub Actions du premier commit du cycle : FAIL. Les jobs n'exposent aucune étape exécutée et les logs GitHub retournent 404 BlobNotFound. Cause précise et correction côté GitHub : BLOCKED, non prouvée. Ne pas désactiver ni maquiller les contrôles.

| Axe | Statut |
| --- | --- |
| S scientifique | PASS ciblé ; réception globale NOT RUN |
| G graphique | PASS structure SVG ; contrôle visuel NOT RUN |
| P pédagogique | PASS structure des pages ; parcours complet NOT RUN |
| F fonctionnel | PASS modèles et rendu ciblés ; CI BLOCKED |
| A accessibilité | PASS balisage structurel partiel ; lecteurs d'écran NOT RUN |

Accueil, carte, assets et navigation utilisateur : non modifiés.

# SI QUEST V2.5 — Contre-audit physique de la courroie 3D et garde de sécurité statique

Date : 31 octobre 2026. Périmètre exclusif : dépôt GitHub `sebromapro-oss/SI-QUEST`, branche `main`.

## Anomalie physique identifiée

Dans `src/scene3d.js`, mission `belt-speed-01`, le marqueur de courroie parcourait uniquement le brin horizontal supérieur et **revenait instantanément à gauche après 180 unités graphiques**. Sa progression vers la droite était également **opposée à la vitesse tangentielle du bord supérieur des poulies**, représentées en rotation positive anti-horaire. La visualisation ne respectait donc ni la continuité matérielle d'une courroie fermée ni le sens du mouvement sans glissement.

## Correction et vérification indépendante

- Les deux poulies schématiques ont un rayon graphique `r = 48` et leurs centres sont séparés de `d = 180` unités graphiques.
- Une courroie ouverte de deux poulies de même rayon possède deux brins rectilignes de longueur `d` et deux demi-cercles de rayon `r`. Sa longueur graphique totale est `L = 2d + 2πr ≈ 661,593` unités.
- Pour la vitesse de rotation `n` en tr/min, `ω = 2πn/60` en rad/s. L'abscisse curviligne graphique vaut `s = (rωt) modulo L` ; son évolution est continue et la vitesse tangentielle graphique vaut `rω`.
- La trajectoire suit, dans le sens anti-horaire : **brin supérieur de droite vers gauche**, demi-cercle gauche de haut en bas, brin inférieur de gauche vers droite, demi-cercle droit de bas en haut.
- Les fonctions de calcul scientifique restent inchangées : pour le modèle physique de poulie de diamètre `D = 0,20 m`, à `n = 60 tr/min`, la vitesse théorique est `v = πDn/60 ≈ 0,6283 m/s`. Le rayon de 48 unités n'est qu'une échelle graphique, sans confusion avec les mètres.
- À `t = 0,5 s` et `n = 60 tr/min`, le marqueur doit être sur le brin supérieur, à `x ≈ -60,796`, `y = +48` unités graphiques. La projection orthographique à caméra nulle donne environ `(202,73 ; 73,20)` pixels SVG, vérifiée directement dans le rendu.

## Preuves automatiques ajoutées

Le commit [`a3afae38`](https://github.com/sebromapro-oss/SI-QUEST/commit/a3afae38b6a75d6640d4919033159308a0c13ce0) modifie **uniquement** `src/scene3d.js` et `tests/scene3d.test.cjs`. Trois tests Node supplémentaires contrôlent cinq positions de raccordement et de fermeture, dix points de continuité/vitesse, les entrées non finies et la cohérence entre coordonnées physiques et cercle SVG rendu. La nouvelle fonction géométrique a été contre-vérifiée dans un moteur JavaScript indépendant avant publication.

Le commit [`a4bd6533`](https://github.com/sebromapro-oss/SI-QUEST/commit/a4bd6533c441b579c026d2ef32289d37eb57d70a) ajoute deux tests de sécurité de surface dans `tests/security-static-surface.test.cjs` : contrôle systématique des **597 fichiers HTML du catalogue et de l'accueil**, absence de scripts et feuilles de style distants, d'iframe, de gestionnaires HTML inline dangereux, d'URL `javascript:`, de formulaires POST et de ressources hors dépôt ; contrôle des deux feuilles CSS contre les imports ou URLs réseau. Ce test ne prouve **pas** l'absence de secrets dans l'historique Git, la sécurité d'un backend ou la conformité RGAA.

## Réserves de réception

- Cette correction concerne **une animation schématique de courroie**, pas la validation des 597 modèles ni de leurs 3D individuelles.
- Les scènes restent des représentations de principe : aucune denture, flexion de courroie, élasticité, tension, glissement, masse, inertie ou contact réel n'est simulé.
- La réussite des tests Node et de Chromium doit être contrôlée sur le **SHA du correctif** ; un verdict antérieur ne suffit pas.
- Le dépôt était **public** et la branche `main` non protégée au contrôle API du cycle. Les données de progression `localStorage` ne sont pas authentifiées. Ne pas y déposer de preuves privées d'élèves ou d'enseignant.
- NVDA, TalkBack, VoiceOver, Firefox, Safari, Android/iOS physiques et audit exhaustif des secrets de l'historique : **non réalisés**.

**Décision :** maintien de la phase 1, zéro mission créée, aucune intervention AppDeploy, accueil, carte des 17 univers, marquage d'auteur ou données privées modifiés.

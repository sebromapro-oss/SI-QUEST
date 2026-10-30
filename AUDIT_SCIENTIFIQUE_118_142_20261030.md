# SI QUEST V2.5 — contre-audit documentaire ciblé 118–142 — 30 octobre 2026

**Source de vérité avant écriture :** branche `main`, SHA `64cb69234e601989992da4065ae4faef15e3a332`. **Périmètre :** 25 missions, cinq suites de tests existantes, contrôleur partagé de mission. **Statut : revue de code et de références, pas réception physique.**

## Preuves CI réellement vérifiées

Au SHA initial, les trois workflows GitHub Actions ont conclu **success** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41130044964), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41130045017), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41130045018). Journal du job scientifique `124318338866` : **2 078 tests, 2 078 réussis, 0 échec**. Ces assertions ne démontrent ni exactitude de chaque schéma ni fonctionnement sur appareil physique.

## Références et contrôles effectivement examinés

| Missions | Fichier de tests existant | Relations et points de contrôle examinés |
|---|---|---|
| 118–122 | `tests/audit-cycle-118-122.test.cjs` | Moment cinétique de volant `J·2πn/60` (kg·m²/s) ; seuil RC `-RC ln(1-U/E)` (s) ; jeu thermique différentiel (mm) ; perte de pression Venturi proportionnelle à `Q²` (bar) ; deux ressorts en série `1/k_eq=1/k₁+1/k₂` (N/m). Tests min/milieu/max, données non finies, présence de descriptions SVG et de prérequis. |
| 123–127 | `tests/audit-cycle-123-127.test.cjs` | Allongement de barre à sections étagées `ΣFL/(EA)` (mm) ; glissement moteur `100(n_s-n)/n_s` (%) ; décrément logarithmique `ln(A₁/A₂)/N` ; efficacité d'échangeur ; Darcy–Weisbach `f(L/D)ρv²/2` (bar). Tests de domaines, références séparées et solution pédagogique. |
| 128–132 | `tests/audit-cycle-128-132.test.cjs` | Temps de course `A·L/Q` (s) ; compression isotherme `nRT ln(V_i/V_f)` (kJ) ; tension des élingues `W/(2sinθ)` (kN) ; diviseur de tension (V) ; contrainte thermique empêchée `-EαΔT` (MPa). Tests des signes, valeurs extrêmes, unités et présence des commandes de mission. |
| 133–137 | `tests/batch133-137.test.cjs` | Accumulateur polytropique (L) ; compensation triphasée de puissance réactive (µF) ; similitude pompe `P∝n³` (kW) ; énergie élastique `kx²/2` (J) ; Goodman en fatigue (sans unité). Tests de monotonie et unités. |
| 138–142 | `tests/batch138-142.test.cjs` | Compressibilité d'huile `VΔp/K` (mL) ; moment quadratique polaire de tube `π(D⁴-d⁴)/32` (cm⁴) ; glissement de freinage (%) ; constante thermique globale `mc/(hA)` (s) ; pas de CAN `U_ref/2^N` (mV). Contrôles de géométrie, signes, unités, limites et SVG. |

**Conclusion limitée :** les 25 missions disposent déjà d'assertions scientifiques et structurelles couvrant plusieurs états ; la revue des expressions ci-dessus ne révèle pas de divergence algébrique manifeste. Les hypothèses réelles, les graphiques et les cas d'usage ne sont pas validés exhaustivement.

## Anomalie transversale identifiée — simulation après réponse erronée

Dans `src/investigation-mission.js`, le contrôleur commun initialise `unlocked=false`. Après une réponse numérique valide mais fausse, `tries` augmente, **sans déverrouiller** la simulation ; `render()` applique `const allowed=unlocked`, masque le graphique et désactive `trialValue` et `trial`. `preview()` refuse aussi l'affichage si `!unlocked`. L'élève ne peut donc pas explorer le phénomène après une erreur, contrairement à l'exigence « animations même si réponse erronée ».

**Risque de correction naïve :** afficher immédiatement la courbe et `preview()` sur le paramètre initial expose `c.expected` avant les trois essais, puisque le résultat théorique est affiché numériquement. Il faut **séparer l'autorisation d'animer/observer du déverrouillage du résultat et du corrigé**, conserver les trois essais et trois aides, et tester la non-divulgation de la réponse. Aucune modification du contrôleur n'est publiée dans ce lot documentaire ; cette anomalie reste **ouverte et prioritaire**.

## Réception et sécurité : preuves manquantes

- Les 25 SVG n'ont pas fait l'objet d'une comparaison visuelle indépendante en navigateur ; les tests vérifient surtout des marqueurs de structure, des valeurs et l'absence de nombres invalides.
- Les essais physiques mobile, clavier, NVDA, TalkBack, VoiceOver et l'audit RGAA/WCAG 2.2 AA ne sont pas réalisés.
- La séparation des données privées, la confidentialité de l'historique et les secrets n'ont pas été audités exhaustivement. Le dépôt est **public** selon l'API GitHub, malgré le cahier des charges qui le décrit comme privé.
- Aucune mission 598+ créée, aucune intervention sur AppDeploy, aucune modification de l'accueil, des 17 univers ou des moteurs physiques.

**Suite :** corriger et tester le découplage animation/corrigé dans le contrôleur partagé, puis auditer 93–117. Maintenir la phase 1 ; ne pas assimiler 480/597 missions documentées à une réception complète.

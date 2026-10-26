# SI QUEST — Audit et création des missions 113 à 117
**Cycle : 26 octobre 2026, matin (Europe/Paris).**  
**Source :** dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`.  
**HEAD initial :** `aaef084dd8a23bb237002b157cbcfc8b0a479bb1`.  
**Commit de production :** `3ca4898a9e1265a9d813678717d71082214cfaea`.  
**Commit correctif de test :** `c145ffb0d315cea70a2a04a5946433d1bfedbf97`.

## Production réelle
| N° | Identifiant | Sous-savoir distinct | Référence nominale |
|---|---|---|---|
| 113 | `hydraulic-pump-shaft-01` | Puissance absorbée et rendement de pompe | 7,500 kW |
| 114 | `braking-stop-time-01` | Temps d'arrêt sous force constante | 6,000 s |
| 115 | `beam-curvature-01` | Moment-courbure en flexion pure | 0,000595238 m⁻¹ |
| 116 | `battery-autonomy-01` | Durée de service à puissance constante | 16,000 h |
| 117 | `strain-gauge-bridge-01` | Sensibilité du quart de pont | 2,100 mV |

**117 pages HTML de missions** constatées dans l'arbre Git du commit de production. Cinq pages nouvelles, cinq entrées de catalogue, modèles purs, critères fictifs, tolérances propres, situations métiers, trois questions flash, trois essais, trois aides, corrigés conditionnels, décisions techniques, sauvegarde et scènes SVG calculées. La présence au catalogue n'est pas une validation matérielle.

## Chantier A — Audit historique 40–75
- **Mission :** `rolling-torque-01`.
- **P2 graphique :** la flèche de réaction normale partait du contact `(305,190)` et dépassait le centre `(305,129)` jusqu'à `(305,105)`. Corrigée pour se terminer au centre, avec point d'application au contact.
- **P2 pédagogique :** absence de bloc explicite objectifs/prérequis/réactivation. Ajout d'un bloc avec trois questions flash et critères de réussite.
- **P3 non-régression :** ancien test `tests/batch90-91.test.cjs` attendait l'ancienne flèche incorrecte. Assertion corrigée pour `y2=129`.
- **Contre-audit :** `tests/audit-cycle-113-117.test.cjs` vérifie le vecteur corrigé et le bloc de réactivation. Les 40–75 ne sont pas tous audités exhaustivement.

## Contrôles effectivement exécutés
- **Pré-intégration :** contrôle de syntaxe JavaScript sur les modules modifiés, contre-calculs indépendants nominaux et aux bornes des cinq nouveaux modèles, validation des références de configuration.
- **Premier commit de production :** 627 tests Node, **626 PASS, 1 FAIL** (assertion géométrique obsolète). Les trois workflows Node ont échoué, le navigateur a réussi.
- **Après correction `c145ffb0d315cea70a2a04a5946433d1bfedbf97` :** **627 tests Node, 627 PASS, 0 FAIL**, sur [Contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40305886474). Deux autres workflows Node ont réussi sur la même révision : [Recette automatisée](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40305886481) et [Qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40305886482).
- **Navigateur :** [16/16 tests Playwright Chromium PASS](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40305755349) sur le commit de production `3ca4898...`. Tests de l'accueil sur bureau et émulations Android/iPhone/tablette ; pas de test individuel visuel des cinq nouvelles scènes et pas d'appareil physique.

## Matrice S/G/P/F/A
| Domaine | Automatisé | Réception complémentaire |
|---|---|---|
| S scientifique | PASS — modèles, unités, cas nominaux, bornes, contre-calculs | Exhaustivité des hypothèses sur appareils NOT RUN |
| G graphique | PASS — génération SVG, vecteur corrigé, valeurs affichées | Inspection visuelle de chaque scène NOT RUN |
| P pédagogique | PASS — présence de prérequis, flash, aides, essais et corrigés via tests | Observation en classe NOT RUN |
| F fonctionnel | PASS — 627/627 Node, parcours et sauvegarde simulés | Essais des nouvelles missions sur navigateurs réels NOT RUN |
| A accessibilité | PASS — contrôles structurels couverts par CI | NVDA, TalkBack, VoiceOver, zoom réel, audit RGAA complet NOT RUN |

## Protection et réserves
- Dépôt privé, `main`, aucun ZIP, aucun GitHub Pages, aucune suppression d'archive, aucun force push.
- Fichiers de l'accueil inchangés : `index.html` = `94165cccd6ad972a1a57699d5fcf42afde5cca53` ; `src/home.js` = `0ead30ab3afe119589f0a14aab99898f0e7721d7` ; `src/style.css` = `966e623673ce45c86c2cc6a59a4725406475db10` ; `assets/archipelago-cinematic.svg` = `8d75fd72f75cb662f0d2de1c5a3e1df8ab935347`.
- Les nouvelles missions sont **intégrées et testées automatiquement**, non intégralement validées. La compatibilité sur appareils réels et l'accessibilité assistive restent à démontrer.
- Prochain cycle : audit d'autres missions 40–75 et inspection visuelle individuelle des nouvelles scènes, en parallèle de nouvelles productions.

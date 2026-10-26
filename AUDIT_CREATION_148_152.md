# SI QUEST V2.3 — Cycle 148–152
**Date :** 26 octobre 2026, 18 h (Europe/Paris). **Dépôt :** privé, branche `main`.
**HEAD initial :** `62887e4218d1f2058605e369f89af71585e3b100`.
**HEAD du code et des tests avant ce rapport :** `6844234570b01d99ce3fd855fdcff56181664dd1`.
Les SHA finaux du cycle sont à consulter dans l'historique Git : un fichier ne peut contenir son propre SHA de commit sans modifier celui-ci.

## Phase 0 — Protection
- Cahier maître V2.3, `EXIGENCES.md`, `PRODUCTION.md`, code, catalogue et tests consultés.
- Dépôt privé confirmé via GitHub ; aucun changement de visibilité, GitHub Pages, ZIP, branche d'archive ou force push.
- `index.html`, `src/home.js`, `src/style.css` et `assets/archipelago-cinematic.svg` non modifiés. Comparaison de l'ensemble des chemins modifiés entre SHA initial et SHA du code : seuls missions, moteur d'investigation, contrôleur, catalogue, schémas et tests.
- Chaque écriture a utilisé l'API Contents avec SHA de blob pour les fichiers existants ; pas de remplacement destructif du HEAD.

## Chantier A — Audit et correction
- **36 missions historiques 40–75** : trois valeurs (minimum, nominal, maximum) contrôlées par mission ; 108 résultats finis, configuration/résultat nominal, unité du critère et structure SVG (<title>, <desc>, pas de NaN/Infinity/undefined). **36 PASS sur ce périmètre ciblé**. Ce contrôle ne constitue pas un contre-calcul indépendant des 36 lois ni une inspection visuelle.
- **P1 graphique historique corrigée** dans `rolling-torque-01` (hors lot 40–75, composant partagé) : le schéma précédent dessinait une force tangentielle au contact créant un couple de même sens que la rotation horaire alors que le couple était décrit comme résistant. Le nouveau schéma présente explicitement un couple antihoraire opposé à la rotation horaire, sans fausse force de contact. Test ciblé ajouté.
- **P2 graphiques nouveaux corrigés** avant réception : suppression des flèches de pression et de cerclage à p = 0 ; suppression du jet à Q = 0 ; profil de cisaillement nul à V = 0 ; flux entrant des deux faces de la plaque (schéma de principe).
- **P0 non identifié** dans les contrôles exécutés ; aucune conclusion sur les contrôles non exécutés.

## Chantier B — Missions créées
| Numéro | Identifiant | Modèle / question | Valeur nominale | Statut |
|---|---|---|---|---|
| 148 | `thin-wall-hoop-stress-01` | σθ = pD/(2t), D=0,500 m, t=0,006 m, p=24 bar | 100,000 MPa | Codée + test V8 ciblé |
| 149 | `thermal-fourier-number-01` | Fo = αt/L², α=1,2×10⁻⁵ m²/s, L=0,020 m, t=20 s | 0,600 sans unité | Codée + test V8 ciblé |
| 150 | `gear-mesh-frequency-01` | fₑ = z₁n₁/60, z₁=36, n₁=1 200 tr/min | 720,0 Hz | Codée + test V8 ciblé |
| 151 | `jet-impact-force-01` | F = ρQ²/A, d=0,010 m, Q=24 L/min | 2,03718 N | Codée + test V8 ciblé |
| 152 | `rectangular-beam-shear-01` | τmax = 3V/(2bh), V=8 kN, b=0,040 m, h=0,080 m | 3,750 MPa | Codée + test V8 ciblé |

Les cinq modèles ont des sous-savoirs distincts, unités et hypothèses explicites, domaines, données et décisions fictives. Pages avec objectifs, prérequis, trois questions flash, calcul, courbe paramétrique et schéma 2D scientifique. Le contrôleur commun fournit trois essais, trois aides, corrigé conditionnel, carnet et sauvegarde locale. Aucune scène 3D revendiquée : ces problèmes se modélisent en 2D.

## Contrôles et preuves
- **Pré-intégration : 113 assertions JavaScript V8 PASS**, sur 5 modèles, bornes, contre-formules, unités, SVG, réponses, domaines et catalogue.
- **Après intégration : 7 tests du fichier `tests/batch148-152.test.cjs` exécutés via adaptateurs CommonJS en V8 : 270 assertions PASS, 0 FAIL.** Il ne s'agit pas de Node natif.
- **Audit historique : 36/36 contrôles ciblés PASS**, réalisés en trois lots de 12, sur 108 points (bornes et nominal).
- Deux fichiers de tests Node ajoutés : `tests/batch148-152.test.cjs` et `tests/historical40-75-contract.test.cjs`. Leur **exécution native sur GitHub Actions reste NOT RUN / non démontrée**.
- **CI GitHub Actions : NOT VERIFIED sur le HEAD de ce cycle.** Les derniers runs consultables du cycle précédent étaient FAIL avant allocation de runner, sans étapes ; cause non établie. Le connecteur de consultation par SHA ne renvoie pas les runs push sur le présent HEAD. Ne pas déclarer CI réussie.
- **S scientifique : PASS ciblé**, contre-calculs indépendants des cinq nouvelles missions ; pas de validation exhaustive de l'existant.
- **G graphique : PASS structurel**, contrôles géométriques programmés ; **inspection visuelle individuelle NOT RUN**.
- **P pédagogique : contenus intégrés ; réception par enseignant et essais élèves NOT RUN**.
- **F fonctionnel : PASS ciblé V8 ; DOM navigateur, reprise réelle et CI native NOT RUN**.
- **A accessibilité : éléments sémantiques présents ; tests clavier/zoom et NVDA/TalkBack/VoiceOver sur appareils NOT RUN**.

## Suite
1. Exécuter réellement les deux suites Node et les workflows GitHub Actions sur le HEAD de ce cycle dès que les runners sont disponibles.
2. Inspection visuelle des cinq schémas et courbes, mobile/ordinateur, puis contre-audit des représentations historiques.
3. Tests clavier, zoom, lecteurs d'écran et persistance sur navigateurs/appareils.
4. Poursuivre les missions 153–157 uniquement après vérification des anomalies prioritaires ; ne pas compter « codée » comme « validée ».

**Catalogue : 152 entrées codées ; nombre de missions entièrement recettées non démontré.**

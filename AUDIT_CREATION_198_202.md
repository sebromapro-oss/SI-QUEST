# SI QUEST V2.3 — Cycle 198–202 (27 octobre 2026)

HEAD initial : `b04f4ad5301536602663c902daeeb0b30f87a693`. Missions créées : rotor-centripetal-acceleration-01, parallel-thermal-bridges-01, sampling-alias-frequency-01, regenerative-cylinder-speed-01, buoyancy-immersed-volume-01. Catalogue préparé : 202 identifiants uniques (17 univers). Sous-savoirs : 105 explicitement distincts si les 100 antérieurs sont inchangés ; 97 entrées historiques non classifiées.

## A — Audit historique et correctif

Les 36 missions historiques 40–75 ont été évaluées en V8 par lots de 12 : minimum, nominal, maximum, modèle fini, cohérence nominale et structure SVG : **108/108 PASS ciblés**. Ce contrôle ne remplace ni les contre-calculs indépendants exhaustifs ni une recette visuelle. Défaut P2 reproduit sur `incline-force-01` : le vecteur de force parallèle à la pente conservait une longueur fixe pour tout angle positif, alors que F∥ = mg sin θ. Correctif : longueur graphique 90 sin θ pixels, zéro à θ = 0°, longueur maximale à 90°, métadonnées de longueur et force, test aux angles 0/30/60/90°.

## B — Cinq investigations distinctes

| Numéro | ID | Sous-savoir | Référence |
|---|---|---|---|
| 198 | rotor-centripetal-acceleration-01 | Accélération normale d'un point d'un rotor en rotation uniforme | 710.61152 m/s² |
| 199 | parallel-thermal-bridges-01 | Somme des conductances de deux chemins thermiques parallèles | 38.400000 W |
| 200 | sampling-alias-frequency-01 | Fréquence apparente d'une sinusoïde après échantillonnage uniforme | 45.000000 Hz |
| 201 | regenerative-cylinder-speed-01 | Vitesse d'extension d'un vérin différentiel en circuit régénératif idéal | 0.10610330 m/s |
| 202 | buoyancy-immersed-volume-01 | Poussée hydrostatique à partir du volume immergé | 294.30000 N |

Les calculs sont séparés des scènes, les SVG affichent les unités et des attributs de vérification, et les cinq pages réutilisent les trois essais, trois aides, le corrigé conditionnel, la sauvegarde et les contrôles clavier/tactile du contrôleur commun. Les décisions utilisent des seuils pédagogiques fictifs, sauf la condition théorique stricte de Nyquist (fₑ > 150 Hz) ; aucune intervention réelle autorisée.

## Preuves et réserves

- **S : PASS ciblé** — 96 assertions V8 de préparation (cinq points par modèle, domaines invalides, calculs indépendants, tolérances, unicité, Nyquist et correction historique).
- **G : PASS structurel** — SVG paramétriques, unités, cas limites et correction du vecteur ; inspection visuelle réelle **NOT RUN**.
- **P : PASS structurel** — objectifs, réactivation, prérequis, trois essais/aides/corrigé réutilisés ; essai élève réel **NOT RUN**.
- **F : PASS syntaxe V8 ciblée**, banc DOM Node ajouté mais exécution Node native **NOT RUN** ; GitHub Actions **BLOCKED** tant que les jobs ne s'exécutent pas.
- **A : contrôles structurels partiels**, clavier, zoom et lecteurs d'écran matériels **NOT RUN**.

CI : workflows sur main à inspecter après commit ; ne pas déclarer succès avant journal. Protection : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` exclus des changements ; aucune refonte accueil/carte, aucun ZIP/Pages, aucune branche d'archive supprimée.

# SI QUEST — Cycle 05 : recette technique intermédiaire
Date : 25 octobre 2026. Branche : main. Mission : `braking-01`, univers SI-01 (cinématique).

## Périmètre
- Situation métier : vérification théorique d'une distance d'arrêt d'un matériel agricole sur aire fermée.
- Modèle pur : vitesse initiale convertie en m/s ; réaction à vitesse constante ; décélération constante ensuite ; position et vitesse calculées par phase.
- Hypothèses : sol horizontal, décélération constante, pas de temps de montée en pression, ni dispersion d'adhérence, ni pente ; aucune autorisation de sécurité réelle.
- Entrée élève : trois distances avec unités, tolérance ±0,1 m.
- Décision indépendante : distance d'arrêt comparée à la distance d'obstacle choisie.
- Affichage : SVG synchronisé avec la trajectoire ; curseur temporel au clavier et au tactile ; pause et respect de prefers-reduced-motion ; équivalent textuel.
- Progression : trois indices, trois essais avant corrigé, carnet d'essais localStorage.

## Contrôles réellement exécutés pendant le cycle
Exécution dans le moteur JavaScript V8 de l'orchestrateur sur le contenu récupéré du dépôt GitHub :
- 6 tests scientifiques `tests/braking.test.cjs` : références 18 km/h = 5 m/s, 6 m de réaction, 5 m de freinage, 11 m d'arrêt, temps d'arrêt 3,2 s ; obstacle à 10,9 m ; continuité ; monotonie ; cas limites ; rejet d'entrées invalides.
- 4 tests structurels `tests/braking-dom.test.cjs` : correspondance de tous les identifiants DOM utilisés, étiquetage des champs, contrôle temporel et réduction du mouvement, référencement au catalogue.
- Analyse syntaxique du contrôleur JS et vérification supplémentaire des 18 identifiants DOM utilisés.
Contrôle de non-régression supplémentaire sur les fichiers réels du HEAD : 6 tests de statique (Slope Guard), 4 tests électriques (Volt Check) et les 10 tests Brake Check, soit **20 tests exécutés, 20 réussis** dans le même harnais V8.
Résultat : aucun échec dans ce harnais V8. Ces vérifications ne constituent **pas** une exécution de `node --test` sur la branche distante.

## Contrôles encore requis avant validation finale
- Exécution du workflow GitHub Actions sur le dernier HEAD et récupération de ses journaux.
- Essais fonctionnels dans un véritable navigateur (clavier, zoom 400 %, tactile, dimensions d'écran et lisibilité du SVG).
- Tests manuels Android/TalkBack, iPhone/VoiceOver, Windows/NVDA et Mac.
- Vérification visuelle individuelle et vérification de la stabilité de l'animation dans les navigateurs cibles.
- Aucun essai réel de freinage, aucune homologation machine ou garantie de distance de sécurité.

## Compteurs honnêtes
Le catalogue compte cinq missions intégrées après le cycle 05. La cible demeure 996 missions réelles ; les autres ne sont pas déclarées réalisées.

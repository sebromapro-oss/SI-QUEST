# SI QUEST V2.3 — Cycle 568–572

30 octobre 2026, dépôt privé, main. HEAD initial : `50110a560db2002bf2d1509a07f321221886a282` ; commit correctif historique : `c82d73fd27799e9e9d0d9f8880463da794e42e26`.

## Phase 0
Cahier maître V2.3, EXIGENCES.md, PRODUCTION.md, modèles, catalogue, tests et workflows lus. Dépôt privé et branche archive confirmés. Nouvelle page d'accueil strictement inchangée. Trois workflows du HEAD initial en échec avant étape observable ; logs 404 BlobNotFound.

## Chantier A
Cinq configurations historiques P2 corrigées : electrical-parallel-01, inductor-energy-01, mechanical-efficiency-02, thermal-resistance-01, measurement-uncertainty-01. Objectifs, prérequis et critères repris des pages existantes ; test de non-régression ajouté. Les 36 contre-calculs historiques ne sont pas réexécutés dans ce cycle.

## Chantier B
- 568 `bearing-dn-si-index-01` : Conversion dimensionnelle de l'indice conventionnel DN d'un roulement ; nominal 1,2 m/s.
- 569 `gray-code-4bit-decode-01` : Décodage XOR cumulatif d'un mot Gray réfléchi sur quatre bits ; nominal 4 comptes.
- 570 `two-layer-wall-heat-rate-01` : Conduction stationnaire dans deux couches planes en série ; nominal 36,3636 W.
- 571 `simply-supported-shaft-first-bending-speed-01` : Première fréquence propre en flexion d'un arbre uniforme simplement appuyé ; nominal 3 808,34 tr/min.
- 572 `harmonic-vibration-velocity-rms-01` : Conversion de l'accélération efficace en vitesse efficace d'une vibration sinusoïdale ; nominal 15,9155 mm/s.

Cinq modèles scientifiques indépendants, trois flash, hypothèses, unités, tolérance, SVG paramétrique 2D, graphique calculé, décision fictive et corrigé conditionnel. Trois essais/aides et sauvegarde via contrôleur mutualisé. Pas d'animation temporelle ni de 3D. Aucun test DOM réel.

## Tests
V8 : 15/15 calculs PASS ; 15/15 SVG structurels PASS ; 15/15 désynchronisations rejetées PASS ; 30/30 entrées invalides rejetées PASS ; 16/16 décodages Gray PASS ; syntaxe JS PASS. Catalogue enrichi de 5 missions, total attendu 572 à vérifier à distance. Node natif NOT RUN ; CI du nouveau SHA NOT VERIFIED ; navigateur, mobile, NVDA, TalkBack, VoiceOver NOT RUN.

| Preuve | Statut |
|---|---|
| S | PASS ciblé |
| G | PASS structurel ; visuel NOT RUN |
| P | PASS structurel ; parcours complet NOT RUN |
| F | PASS V8 ciblé ; DOM NOT RUN ; CI non vérifiée |
| A | NOT RUN |

Statut : codées, contrôlées de façon ciblée, NON VALIDÉES. Écarts ouverts : CI, recette navigateur/matériel, accessibilité, métadonnées historiques restantes et taxonomie des 249 sous-savoirs.

# SI QUEST V2.5 — Recette Chromium complémentaire 051–109 et durcissement CI

Date : 31 octobre 2026. Dépôt `sebromapro-oss/SI-QUEST`, branche `main`.

## Périmètre réel

- HEAD initial : `db6416101194a4c215fc3c466cacf6679b20f1a6`. Inventaire conservé : **597 missions**, aucune nouvelle mission.
- Le premier échantillon documenté comptait **50 missions distinctes** testées sur deux viewports Chromium.
- [Commit `0844bd1a`](https://github.com/sebromapro-oss/SI-QUEST/commit/0844bd1a60aeb41937c90a6ae3639fbe480b3839) : ajout de **50 missions distinctes supplémentaires**, sélectionnées de façon déterministe sans recouvrement avec les 50 précédentes. Quatre scénarios Playwright, deux lots de 25, sur bureau 1440×900 et Android **émulé** 390×844.
- [Commit `2c2a56f3`](https://github.com/sebromapro-oss/SI-QUEST/commit/2c2a56f3c3cf2ab2d66fd329428830a36db07983) : recette spécifique des **neuf missions historiques** `gear-01`, `hydro-01`, `slope-01`, `electric-01`, `braking-01`, `rolling-01`, `spring-01`, `lever-01`, `cooling-01`, dont les contrôleurs n'utilisent pas le même DOM que les 588 autres.
- Couverture navigateur cumulée : **109/597 missions distinctes** ; 218 navigations de parcours sur deux viewports, hors scénarios ponctuels de l'accueil et des missions `motion-01` / `circular-02`. **488 missions non couvertes** par ces parcours.

## Vérifications exécutées

Sur les 50 missions du nouveau lot : ouverture réelle Chromium, présence de la saisie et du SVG, corrigé/verdict initialement verrouillés, réponse volontairement fausse, exploration qualitative après erreur, déplacement du paramètre jusqu'à une borne HTML, absence d'exception JavaScript, absence de `data-result` dans le SVG qualitatif, contrôle du débordement horizontal, puis trois aides et trois essais erronés, avec corrigé débloqué **uniquement après les deux conditions**.

Sur les neuf missions historiques : saisie volontairement incorrecte dans tous les champs requis, trois essais, trois aides, activation de l'essai qualitatif après erreur, corrigé masqué jusqu'à autorisation, puis ouverture du corrigé. Le mouvement réduit est activé dans ces scénarios pour contrôler le DOM sans attendre les animations. **Ce mode ne démontre pas la fidélité temporelle des mouvements.**

Ces contrôles sont fonctionnels et pédagogiques, **pas des contre-calculs indépendants** pour chaque mission ni une validation visuelle humaine.

## Preuves GitHub Actions

- Sur `0844bd1a` : **30/30 scénarios Playwright Chromium réussis** ([run 41175692743](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41175692743)), **2 192/2 192 tests Node réussis**, trois workflows Node/science verts ([recette 41175692779](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41175692779), [science 41175692669](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41175692669), [contrôles 41175692665](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41175692665)).
- Sur `2c2a56f3` : **32/32 scénarios Playwright Chromium réussis**, dont les deux nouveaux parcours des neuf missions historiques ([run 41176181021](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176181021)). Les **2 192/2 192 tests Node** et les trois workflows Node/science sont verts ([recette 41176180079](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176180079), [science 41176179997](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176179997), [contrôles 41176180050](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41176180050)).
- **Aucune régression démontrée** dans les 59 missions nouvellement couvertes ; aucun changement du moteur physique n'a été nécessaire. Ne pas extrapoler ce résultat aux 488 missions non testées en navigateur.

## Sécurité de la CI

- [Commit `c9fb94c4`](https://github.com/sebromapro-oss/SI-QUEST/commit/c9fb94c46ffdefffb7e85253fe09f37f3dbf16a2) : workflow navigateur limité à `permissions: contents: read`.
- [Commit `45b9246f`](https://github.com/sebromapro-oss/SI-QUEST/commit/45b9246f3062589de64f6dd9ef527bd4b4ac0d8c) : workflow de contrôles scientifiques également limité à `permissions: contents: read`.
- Les deux autres workflows disposaient déjà de cette limitation. Les nouveaux runs déclenchés par ces modifications doivent être contrôlés séparément ; ne pas attribuer les résultats du code précédent au dernier HEAD sans vérification.
- Dépôt toujours **public** ; réponses de référence dans les pages HTML, progression en `localStorage`. Ce dispositif n'authentifie pas les acquis et ne doit pas contenir de preuves pédagogiques privées. Aucun audit exhaustif des secrets dans l'historique Git n'est revendiqué.

## Réserves et prochaines actions

- **Non réalisés :** 488 autres parcours navigateur, vérification graphique individuelle des 597 missions, fidélité temporelle des animations, appareils physiques Android/iPhone, Safari réel, Firefox réel, NVDA, TalkBack, VoiceOver et recette RGAA/WCAG complète.
- **Phase 1 maintenue**, extension 598–996 suspendue jusqu'à réception démontrée. Prochain lot : 25–50 missions non encore testées, avec tests clavier et contrôle des anomalies communes.
- Aucun accueil, carte des 17 univers, marquage auteur, fichier privé, historique Git, code ou déploiement AppDeploy d'un autre projet n'a été modifié.

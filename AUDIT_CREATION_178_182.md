# SI QUEST V2.3 — Production 178–182

27 octobre 2026, Europe/Paris. SHA initial : `f0684fc42fc133362f0e0aca703b77edb2b4f094`.

178. `braking-distance-friction-01` : Distance de freinage à décélération constante par adhérence ; référence nominale 8.4947333 m.
179. `heat-exchanger-lmtd-01` : Écart logarithmique moyen de température d'un échangeur ; référence nominale 43.280851 K.
180. `column-slenderness-01` : Élancement géométrique d'une tige circulaire pleine articulée ; référence nominale 192.00000 sans unité.
181. `acoustic-distance-loss-01` : Atténuation géométrique du niveau sonore en champ libre ; référence nominale 12.041200 dB.
182. `beam-central-moment-01` : Moment fléchissant maximal d'une poutre bi-appuyée chargée au centre ; référence nominale 4.0000000 kN·m.

Les cinq missions disposent de modèles distincts, questions flash, hypothèses, unités, trois essais/aides et corrigés conditionnels via le contrôleur commun. Schémas SVG 2D paramétriques, sans prétention 3D ni chronogramme artificiel.

87 assertions ciblées JavaScript V8 : calculs contradictoires sur cinq points par mission, cas invalides, SVG et catalogue. S PASS ciblé ; G PASS structurel ; P PASS structurel ; F PASS calculs V8 ; A NOT RUN. CI Node, essais navigateur, NVDA, TalkBack, VoiceOver et appareils : NOT RUN à la rédaction. Les trois anomalies P2 historiques sont corrigées au commit précédent `f0684fc42fc133362f0e0aca703b77edb2b4f094`.

Accueil et carte non modifiés, dépôt privé, aucune publication Pages ni ZIP.

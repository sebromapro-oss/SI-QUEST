# SI QUEST V2.3 — Contrôle correctif du 27 octobre 2026

SHA initial : `915486b0b05ef064f6775dae45a9e00c92bb3cc9`.

Trois anomalies graphiques P2 corrigées dans les missions historiques : `pneumatic-force-01` (effort nul à pression nulle), `electric-power-02` (courant nul), `rolling-load-01` (résistance au roulement nulle). Pour chaque mission, la flèche disparaît lorsque la grandeur est nulle et réapparaît pour une grandeur positive. Test de non-régression `tests/zero-vector-regression.test.cjs`.

Contrôles ciblés JavaScript V8 : 6 assertions réussies. CI Node native : NOT RUN avant commit ; inspection visuelle : NOT RUN ; NVDA/TalkBack/VoiceOver : NOT RUN. S : NOT APPLICABLE à ce correctif de rendu ; G : PASS structurel ; P : NOT RUN ; F : PASS ciblé ; A : NOT RUN.

L'accueil et la carte ne sont pas modifiés. Les missions supplémentaires 178–182 restent à produire ; aucune augmentation du catalogue n'est revendiquée.

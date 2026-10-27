# SI QUEST V2.3 — Cycle 193–197 (27 octobre 2026)

HEAD initial : `41b8f9247cc2d789fcad77fbcf1974d7ed45680b`. Cinq nouvelles missions scientifiquement distinctes, code 2D paramétrique et contre-calculs ciblés.

- 193 — `safety-stop-separation-01` (SI-16) : Distance parcourue pendant un délai total d'arrêt protecteur ; nominal 0.7499999999999999 m ; domaine [0 ; 2] m/s.
- 194 — `safety-proof-test-pfd-01` (SI-16) : Probabilité moyenne de défaillance dangereuse en faible sollicitation ; nominal 0.438 % ; domaine [0 ; 8760] h.
- 195 — `production-bottleneck-01` (SI-17) : Débit soutenable de postes en série limité par le goulot ; nominal 55 pièces/h ; domaine [10 ; 100] pièces/h.
- 196 — `electrohydraulic-drive-current-01` (SI-17) : Couplage de puissance hydraulique et courant continu avec rendement global ; nominal 52.083333333333336 A ; domaine [0 ; 200] bar.
- 197 — `material-thermal-diffusivity-01` (SI-14) : Diffusivité thermique à partir de conductivité et capacité volumique ; nominal 11.538461538461538 mm²/s ; domaine [5 ; 100] W/(m·K).

**Audit P1 historique :** `resultant-01` (mission 40–75) : flèche Fᵧ fixe même pour Fᵧ = 0 N et normes vectorielles non proportionnelles. Correctif : échelle commune, disparition du vecteur nul, page clarifiée, test de non-régression sur 0/100/400/800 N.

**Preuves :** S PASS ciblé (calculs indépendants, bornes et cas invalides en V8) ; G PASS structurel, visuel NOT RUN ; P structure vérifiée, essai élève NOT RUN ; F syntaxe V8 PASS, CI native en attente ; A balises title/desc et HTML présents, NVDA/TalkBack/VoiceOver NOT RUN. Les tests navigateur, matériel et la réception complète ne sont pas revendiqués.

Les seuils de sécurité sont fictifs, non normatifs. Accueil, carte, styles et assets protégés inchangés. Pas de ZIP, pas de Pages, pas de force push.

# SI QUEST — Audit scientifique indépendant des missions 001–009
Date : 31 octobre 2026. Phase 1 (597 missions historiques). HEAD initial : `8abce66d3a6fc03b1721269aed265814da6f35e6`.

## Périmètre et méthode
Missions : `gear-01`, `hydro-01`, `slope-01`, `electric-01`, `braking-01`, `rolling-01`, `spring-01`, `lever-01`, `cooling-01`.
Leurs moteurs sont autonomes, distincts du moteur générique des missions 10–597 : les tests sont donc construits directement sur les lois physiques de référence. Les neuf cas contrôlent au moins trois configurations, la cohérence des unités et les cas invalides. Les neuf missions sont contrôlées dans le catalogue et dans leur HTML (langue, évitement clavier, trois questions flash).

| Mission | Référence indépendante | Grandeurs contrôlées |
|---|---|---|
| 001 Engrenages | n₂ = −n₁ Z₁/Z₂ ; C₂ = C₁ η Z₂/Z₁ ; P₂ = η C₁ 2πn₁/60 | signe, vitesse, couple, puissance |
| 002 Vérin | S = πD²/4 ; Sᵣ = π(D²−d²)/4 ; F = p S ηₘ ; v = Qηᵥ/S | surfaces, forces, vitesses, conversions bar→Pa, L/min→m³/s |
| 003 Pente | N = mg cos α ; Pₓ = mg sin α ; fₘₐₓ = μₛN | composantes et équilibre statique |
| 004 Électricité | I = U/(Rᶜ+Rᶜᵃᵇ) ; ΔU = IRᶜᵃᵇ ; P = I²R | intensité, chute, pertes, bilan de puissance |
| 005 Freinage | d = vtᵣ + v²/(2a) ; t = tᵣ + v/a | distance, temps, état d'arrêt |
| 006 Roulement | N = mg ; Fᵣ = cᵣN ; P = Fᵣv | réaction, résistance, puissance, accélération |
| 007 Ressort | F = F₀+kx ; E = F₀x + ½kx² | force, énergie, course |
| 008 Levier | M = Fl ; ΣM = 0 | effort, moments, équilibre |
| 009 Refroidissement | T = Tₐ+(T₀−Tₐ)e^(−t/τ) ; tₛ = τ ln[(T₀−Tₐ)/(Tₛ−Tₐ)] | température, temps seuil, domaine |

## Anomalie pédagogique et correctif
Cinq missions (001, 006–009) n'avaient pas de questions flash identifiables dans le HTML. Les missions 003 et 004 présentaient des rappels directement sous forme de formules/réponses, plutôt que de questions de réactivation. Sept pages HTML ont été modifiées pour proposer trois questions explicites, sans afficher les résultats numériques des exercices. Les missions 002 et 005 possédaient déjà trois questions ; elles sont préservées.

Le nouveau fichier `tests/audit-001-009-independent.test.cjs` vérifie les neuf moteurs et les neuf rituels. Les fichiers de calcul, de navigation, d'accueil et les données utilisateur sont inchangés.

## Statut et limites
Précontrôle : présence de 597 missions et trois workflows verts sur le HEAD de départ. Les nouveaux tests et les modifications HTML doivent être confirmés par les trois CI **sur le commit publié** : aucune réussite n'est présumée à ce stade.
Ce contre-audit numérique n'établit ni une réception visuelle de chaque scène, ni une fidélité temporelle des animations, ni l'accessibilité réelle sur Android/iPhone, NVDA, TalkBack et VoiceOver. Les contrôleurs autonomes 001–009 restent à tester en navigateur pour le parcours complet 3 essais/3 aides et l'accès aux animations après erreur. Audit des secrets et historique Git du dépôt public non achevé. Phase 1 maintenue ; 0 mission créée.


## Contrôle complémentaire du 31 octobre — CI et animation après erreur
Le commit de code `0fda3d87036ed35ec2176abe344bd9e13aeae8c3` a été validé par trois workflows GitHub Actions : **2 179/2 179 tests réussis, zéro échec** (runs `41163825336`, `41163825453`, `41163825294`). Les tests ajoutés contrôlent des références numériques indépendantes, mais pas le parcours navigateur.

**Régression pédagogique encore présente, non corrigée :** les neuf contrôleurs autonomes de cette série verrouillent le bouton d'essai avant réussite du calcul ; le moteur commun des missions plus récentes ne couvre pas ces neuf pages. L'ouverture sans séparation des modes dévoilerait les résultats dans les messages d'essai. Priorité : mode d'exploration **qualitatif** après une tentative valide même incorrecte, corrigé chiffré masqué, puis tests DOM et recette réelle. Les essais physiques et lecteurs d'écran restent non réalisés.

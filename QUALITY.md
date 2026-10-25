# SI QUEST — Registre qualité, cycle 27 · 25/10/2026

**10 niveaux indépendants / 996**, **10 sous-savoirs / 249**, **10 univers jouables / 17**. Cycle 27 : **+3** nouveaux niveaux avec moteurs scientifiques distincts et contrôles de calcul élève avec tolérances explicites. Tests exécutés : **91/91 Node**, **10/10 DOM sur trois tailles d’écran**, **9 trames physiques**, **9 victoires au clavier**, **12 cas de tolérance**, **13/13 HTTP**, anciennes missions revérifiées. Aucune publication GitHub, aucun essai matériel Android/iPhone/Windows/Mac, aucun NVDA/TalkBack/VoiceOver ni certification WCAG/RGAA. Voir `AUDIT_CYCLE_27.md` pour preuves et réserves.

---

# SI QUEST — Registre qualité, cycle 26 · 25/10/2026

Voir `AUDIT_CYCLE_26.md` pour les résultats réellement exécutés : 81/81 tests Node, 7/7 parcours DOM × 3 résolutions, 2 variantes de maîtrise, 13/13 ressources HTTP, navigation Chromium HTTP bloquée et PWA/offline non testés. **7 niveaux indépendants sur 996**, 17 univers catalogués, 7 sous-savoirs sur 249. Aucun appareil physique ni lecteur d’écran testé, aucune publication GitHub.

---

# SI QUEST — Registre qualité, cycle 25 · 25/10/2026

| Exigence | Preuve exécutée | Limite de validation |
|---|---|---|
| 17 univers | Catalogue de 17 univers, identifiants uniques | 10 univers sans niveau jouable |
| 249 sous-savoirs | 7 sous-savoirs réellement développés | 242 non développés |
| 996 niveaux | 7/996 jouables et 7/7 testés en DOM automatisé | 989 non développés, aucune recette matérielle |
| Calculs scientifiques | 65/65 tests Node, modèle freinage indépendant et cas limites | Hypothèses simplifiées, tests non exhaustifs |
| Simulation navigateur | 7 succès et 7 essais faux sur 1440, 390, 320 px ; 0 erreur JS | Chromium headless avec ressources injectées |
| Animations | 7/7 évolutions de trames ; freinage : états physiques synchronisés vérifiés à 16/22 kN | Contrôle graphique manuel partiel, aucun appareil réel |
| Mobile | Aucun débordement horizontal à 320/390 px ; alternative textuelle à 16 px | Safari iOS, zoom 400 % non réceptionnés |
| Clavier et annonces | Victoire au clavier seul à 320, 390, 1440 px ; labels, rôle `status` | NVDA/TalkBack/VoiceOver non testés manuellement |
| Carte historique | 4 îles inchangées ; étoiles et libellés ARIA issus de la sauvegarde | Navigation sur appareils réels non testée |
| HTTP/PWA | 12/12 ressources HTTP ; manifest et version cache présents | Installation, hors ligne, SW non vérifiés |
| Sauvegarde/badges | Enregistrement de `brake-01` après victoire, records stables | Stockage navigateur privé ou bloqué possible |
| Mission finale | Cadrage documenté, non jouable | Développement à réaliser |
| Publication GitHub | Aucune | Validation de l'utilisateur nécessaire |

**Sources de preuves :** `AUDIT_CYCLE_25.md`, `tests/cycle25-node-tap.txt`, `tests/cycle25-browser-*.json`, `tests/cycle25-motion-results.json`, `tests/cycle25-a11y-physics-results.json`, `tests/cycle25-http-results.json`, captures `tests/cycle25-mobile-brake*.png`.

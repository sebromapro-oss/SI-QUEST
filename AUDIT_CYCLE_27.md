# SI QUEST — Audit de production, cycle 27 · 25 octobre 2026

## État et provenance

- **Source réelle** : archive `SI_QUEST_CYCLE_26_20261025.zip` extraite dans un nouveau répertoire de travail. Les fichiers sources de l’accueil et de la carte (`index.html`, `src/home.js`, illustration des quatre îles) n’ont pas été modifiés ; le catalogue alimente automatiquement trois nouvelles cartes de mission et leurs liens dans la liste des univers.
- **Production** : 3 nouveaux niveaux **distincts** et 3 nouveaux sous-savoirs, chacun dans un univers auparavant non jouable ; aucun niveau fictif, aucune variante comptabilisée comme niveau. Le moteur partagé est conservé, avec trois modèles physiques supplémentaires.
- **Total** : 10 niveaux indépendants jouables / 996 ; 10 sous-savoirs / 249 ; 10 univers avec niveau / 17. Reste **986 niveaux**, **239 sous-savoirs** et **7 univers** sans niveau.
- **Compatibilité** : HTML/CSS/JS statiques, chemins relatifs, aucun serveur payant ; aucun déploiement GitHub effectué. Cache de service worker incrémenté `siquest-cycle27-20261025`.

## Missions nouvelles et décisions professionnelles

| Niveau | Modèle, hypothèses et conséquence d’erreur | Réussite physique et contrôle élève |
|---|---|---|
| `pneumatic-01` — Air Actuator, SI-07 | Vérin simple effet 50 mm, η = 0,85, charge 300 N, ressort 80 N + 2 000 N/m, course 80 mm ; équilibre quasi statique et débit 15 L/min ; pression trop faible → verrou non engagé ; pression excessive → refus de mise en service | p ≥ 3,236 bar environ et ≤ 4,0 bar en service, course 80 mm ; calcul de p_min accepté à **±0,05 bar** ; décision : engager le verrou ou interdire le cycle. |
| `thermal-01` — Thermo Control, SI-12 | Circuit eau simplifié : Φ = 25 kW, ρ = 1 000 kg/m³, cₚ = 4 180 J/(kg·K), Δp = 1,5 bar, η_p = 0,6 ; élévation de température et puissance de pompe, transitoire de premier ordre τ = 15 s | ΔT établi ≤ 8 K et P_pompe ≤ 230 W ; calcul de ΔT accepté à **±0,15 K** ; décision : autoriser/refuser l’essai prolongé. |
| `metrology-01` — Precision Gate, SI-13 | Axe mesuré 49,94 mm, tolérance 49,90–50,10 mm ; répétabilité 0,008 mm ; résolution uniforme u_r = r/√12, u_c quadratique, U = 2u_c ; résolution trop grossière → conformité non démontrée ; instrument trop coûteux → achat refusé | Intervalle [m−U, m+U] entièrement dans la tolérance ET coût ≤ 350 € ; calcul de U accepté à **±0,002 mm** ; décision : libérer ou bloquer le remontage. |

**Contrôle du raisonnement** : les trois niveaux exigent désormais la saisie d’un calcul intermédiaire distinct du réglage de machine. Une machine physiquement conforme avec un calcul faux ne débloque **aucune étoile**. Les valeurs arrondies sont acceptées selon les marges affichées ; un essai reste lançable malgré l’erreur. Les explications et solutions utilisent le moteur physique, sans valeur de correction codée en dur.

## Tests réellement exécutés

| Contrôle | Résultat | Preuve locale |
|---|---|---|
| Numérique Node, anciennes + nouvelles suites | **91/91** réussis, dont 7 tests scientifiques nouveaux et 3 solutions de niveau contrôlées par assertions | `tests/cycle27-node-tap.txt`, `tests/cycle27_science.test.cjs`, `tests/cycle26_coaching.test.cjs` |
| DOM Chromium headless : 1440×900, 390×844, 320×640 | **10/10 niveaux par taille** : 3 indices ET 3 essais, solutions détaillées, diagnostic d’erreur, victoire, carnet, étoiles, absence de débordement et d’erreur JS ; 2 défis de maîtrise et contrôles anti-contournement | `tests/cycle27-browser-results.json`, `tests/cycle27-dom-run.log` |
| Animation et synchronisation physique des trois nouveaux modèles | **9/9 trames** comparées au moteur, 3 niveaux × 3 tailles ; déplacement vérin, température transitoire, intervalle de mesure | `tests/cycle27-animation-results.json` |
| Navigation clavier et annonce textuelle des trois nouveaux niveaux | **9/9 victoires** au clavier, 3 niveaux × 3 tailles, champs étiquetés, rôle status, aucun débordement | `tests/cycle27-keyboard-results.json` |
| Validation du calcul avec marge | **12/12 cas** : calcul absent, hors marge, dans marge, valeur exacte, pour chaque nouveau niveau ; calcul physiquement juste mais saisi faux → pas de badge | `tests/cycle27-arithmetic-results.json` |
| Anciennes missions : non-régression détaillée | 7 niveaux historiques testés sur **320, 390, 1440 px**, physique et sauvegarde ; ancienne suite coaching du cycle 26 sur trois tailles | `tests/cycle27-regression-*.log`, `tests/cycle27-regression-cycle26.log` |
| Clavier et cinématique freinage historique | **3 parcours clavier** + **2 trames freinage** confrontées à `SIPhysics.brakingAtTime` | `tests/cycle27-a11y-physics-run.log` |
| HTTP local | **13/13** ressources en HTTP 200 ; manifeste et cache versionné vérifiés | `tests/cycle27-http-results.json` |
| Syntaxe JavaScript, liens et icônes | **OK** | `python tests/check_static.py` |

**Incidents rencontrés et résolus** : les tests historiques de catalogue et de grille de solutions présupposaient 7 niveaux ; ils ont été adaptés pour accepter l’extension du catalogue et vérifier les trois nouveaux modèles, sans retirer les assertions sur les sept missions d’origine. Les scénarios historiques sont restés jouables. Un essai de non-régression en lot a dépassé le délai de l’outil ; les exécutions séparées ont ensuite réussi sur les trois tailles d’écran. La première version des nouvelles missions validait uniquement le réglage ; une vérification des calculs intermédiaires et des tolérances a été ajoutée et testée avant livraison.

## Limites et priorités suivantes

- Modèles explicitement simplifiés : air à pression constante sans compressibilité ; circuit thermique à Δp constante et transitoire du premier ordre ; incertitude métrologique sous hypothèse de composantes indépendantes et facteur de couverture conventionnel. Aucun modèle constructeur ni homologation.
- Le navigateur Chromium headless a exécuté des pages avec ressources injectées localement. Le contrôle HTTP Python est distinct. **Pas de preuve** d’installation PWA, de hors-ligne en navigateur, de Safari iOS, de Chrome Android réel, de Windows/Mac physiques, ni d’essai manuel NVDA/TalkBack/VoiceOver ou audit WCAG/RGAA complet.
- L’animation Canvas est volontairement schématique ; sur téléphone, les détails du Canvas sont petits, mais les grandeurs et états sont repris en texte et tableaux. Les futurs travaux devront améliorer la lisibilité de l’instrumentation mobile sans modifier prématurément l’accueil ni la carte.
- Restent à produire : tableaux de bord multi-capteurs et diagnostic à mesures discriminantes, laboratoire libre, comparaison argumentée de solutions, ordres de réparation et mises en service finales. Les deux défis de maîtrise historiques ne comptent pas comme niveaux supplémentaires.
- **Rendement mesuré** : cycle 26 = 0 nouveau niveau indépendant (travail de qualité et coaching) ; cycle 27 = **3**. Moyenne brute des deux cycles = **1,5 niveau/cycle**, échantillon trop petit et hétérogène pour prédire une production quotidienne. Aucune date de fin fiable n’est déductible à ce stade. À titre de condition : finir 986 niveaux d’ici le 31 décembre 2026 exigerait environ **15 niveaux validés par jour** sans rupture, ce qui n’est pas démontré. Conserver l’objectif fin décembre **conditionnel**, réévaluer après plusieurs cycles.
- Prochaine priorité : construire des moteurs réutilisables avec contrôle indépendant et compléter les 7 univers encore sans niveau, tout en consolidant les interfaces et les critères de réussite. La taille des lots doit suivre les preuves, non une obligation arbitraire de 12 à 20 niveaux.

## Reproduction

```bash
cd SI_QUEST
node --test tests/*.test.cjs
python tests/check_static.py
python tests/cycle27_dom.py
python tests/cycle27_animation.py
python tests/cycle27_keyboard.py
python tests/cycle27_arithmetic.py
python tests/cycle27_regression_dom.py 320
python tests/cycle27_regression_dom.py 390
python tests/cycle27_regression_dom.py 1440
python tests/cycle27_http.py
python tests/cycle25_a11y_physics.py
```

**Aucune publication GitHub effectuée.**

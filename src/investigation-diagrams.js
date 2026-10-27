(function(root){
'use strict';
const N=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(x1,y1,x2,y2,c='#a9d9ed',w=3,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+w+'" '+extra+'/>';
const box=(x,y,w,h,fill='#173f59',extra='')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="'+fill+'" stroke="#9bc9e5" stroke-width="2" '+extra+'/>';
const circle=(x,y,r,fill='#173f59',extra='')=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="#9bc9e5" stroke-width="3" '+extra+'/>';
const text=(x,y,s,extra='')=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="17" '+extra+'>'+s+'</text>';
const arrow=(x1,y1,x2,y2,c='#ffca7d',w=5)=>line(x1,y1,x2,y2,c,w,'marker-end="url(#pointe)"');
const titles=Object.freeze({
"shaft-torsional-shear-stress-01":"Arbre plein — Contrainte de torsion",
"series-rl-impedance-01":"Circuit RL — Module de l'impédance",
"series-system-reliability-01":"Fiabilité — Trois composants en série",
"dry-air-ideal-density-01":"Air sec — Masse volumique idéale",
"parallel-spring-stiffness-01":"Ressorts parallèles — Raideur équivalente",
"beam-uniform-load-deflection-01":"Traverse — Flèche sous charge répartie",
"hydraulic-fluid-stiffness-01":"Vérin — Raideur hydraulique",
"motor-synchronous-speed-01":"Moteur — Vitesse synchrone",
"biot-number-plate-01":"Plaque — Nombre de Biot",
"basquin-fatigue-life-01":"Fatigue — Loi de Basquin",
"rotor-centripetal-acceleration-01":"Rotor — Accélération centripète",
"parallel-thermal-bridges-01":"Paroi — Ponts thermiques en parallèle",
"sampling-alias-frequency-01":"Échantillonnage — Repliement spectral",
"regenerative-cylinder-speed-01":"Vérin différentiel — Avance régénérative",
"buoyancy-immersed-volume-01":"Immersion — Poussée d'Archimède",
"safety-stop-separation-01":"Arrêt protecteur — Distance d'approche",
"safety-proof-test-pfd-01":"Fonction de sécurité — Indisponibilité moyenne",
"production-bottleneck-01":"Ligne de production — Goulot de capacité",
"electrohydraulic-drive-current-01":"Groupe électrohydraulique — Courant idéal",
"material-thermal-diffusivity-01":"Matériau — Diffusivité thermique",
"bearing-projected-pressure-01":"Palier lisse — Pression projetée",
"inductor-reactance-frequency-01":"Bobine — Réactance inductive",
"coolant-thermal-power-01":"Refroidissement — Puissance emportée",
"brake-disc-adiabatic-rise-01":"Frein à disque — Échauffement idéal",
"encoder-linear-resolution-01":"Codeur — Résolution linéaire",

"tank-gravity-drain-01":"Cuve — Vidange gravitaire",
"water-mixing-temperature-01":"Mélange — Température d'équilibre",
"copper-cable-resistance-01":"Cuivre — Résistance du conducteur",
"pump-volumetric-efficiency-01":"Pompe — Rendement volumétrique",
"belt-transverse-wave-speed-01":"Courroie — Célérité d'une onde",
"braking-distance-friction-01":"Freinage — Distance idéale",
"heat-exchanger-lmtd-01":"Échangeur — Écart logarithmique",
"column-slenderness-01":"Tige — Élancement",
"acoustic-distance-loss-01":"Acoustique — Éloignement",
"beam-central-moment-01":"Traverse — Moment central",
"water-hammer-joukowsky-01":"Hydraulique — Coup de bélier",
"thermal-contact-resistance-01":"Thermique — Contact dissipateur",
"noise-level-addition-01":"Acoustique — Deux machines",
"machine-availability-01":"Maintenance — Disponibilité intrinsèque",
"filter-beta-efficiency-01":"Filtration — Rapport bêta",
"bearing-friction-power-01":"Palier — Puissance dissipée",
"poiseuille-microtube-flow-01":"Microconduite — Débit de Poiseuille",
"ultrasonic-doppler-shift-01":"Ultrasons — Décalage Doppler",
"ntc-beta-resistance-01":"Thermistance NTC — Modèle bêta",
"fracture-critical-crack-01":"Fissure — Longueur critique en mode I",
"helical-gear-axial-force-01":"Engrenage hélicoïdal — Effort axial",
"oil-pressure-wave-speed-01":"Hydraulique — Célérité d'une onde",
"parallel-axis-inertia-01":"Inertie — Transport d'axe",
"heat-pump-carnot-cop-01":"Pompe à chaleur — COP de Carnot",
"oil-kinematic-viscosity-01":"Huile — Viscosité cinématique",
"miner-fatigue-damage-01":"Fatigue — Cumul de dommage de Miner",
"thermocouple-seebeck-voltage-01":"Thermocouple — Tension de Seebeck",
"transformer-turns-ratio-01":"Transformateur — Rapport de spires idéal",
"rc-lowpass-cutoff-01":"Filtre RC — Fréquence de coupure",
"rotating-unbalance-force-01":"Balourd — Force centrifuge harmonique",
"cantilever-strain-energy-01":"Console — Énergie élastique de flexion",
"gas-polytropic-temperature-01":"Compresseur — Température polytropique",
"battery-discharge-c-rate-01":"Batterie — Taux de décharge",
"hydraulic-cavitation-number-01":"Aspiration — Indice de cavitation",
"bolt-preload-torque-01":"Assemblage boulonné — Couple estimé",
"thin-wall-hoop-stress-01":"Réservoir mince — Contrainte de cerclage",
"thermal-fourier-number-01":"Plaque chauffée — Nombre de Fourier",
"gear-mesh-frequency-01":"Engrenages — Fréquence d'engrènement",
"jet-impact-force-01":"Jet d'eau — Force sur une cible",
"rectangular-beam-shear-01":"Traverse — Cisaillement maximal",
"combined-stress-von-mises-01":"État plan de contraintes — Von Mises",
"pt100-linear-response-01":"Sonde Pt100 — Approximation linéaire",
"torsional-eigenfrequency-01":"Transmission — Fréquence propre de torsion",
"laminar-darcy-factor-01":"Conduite laminaire — Facteur de Darcy",
"triangle-actuator-angle-01":"Relevage — Angle d'un triangle articulé",
"hydraulic-oil-compressibility-01":"Huile hydraulique — Compression volumique",
"hollow-shaft-polar-inertia-01":"Arbre tubulaire — Moment quadratique polaire",
"wheel-braking-slip-01":"Roue freinée — Glissement longitudinal",
"lumped-cooling-time-constant-01":"Refroidissement — Constante de temps thermique",
"adc-voltage-step-01":"Acquisition — Pas de quantification CAN",
"accumulator-polytropic-delivery-01":"Accumulateur — Restitution polytropique",
"three-phase-capacitor-sizing-01":"Compensation triphasée — Capacités en triangle",
"pump-affinity-power-01":"Pompe centrifuge — Puissance selon la vitesse",
"spring-stored-energy-01":"Ressort comprimé — Énergie élastique",
"goodman-fatigue-factor-01":"Fatigue — Facteur de Goodman",
"cylinder-stroke-time-01":"Vérin — Temps de sortie de tige",
"gas-isothermal-work-01":"Air comprimé — Travail isotherme",
"symmetric-sling-tension-01":"Élingage symétrique — Effort dans un brin",
"voltage-divider-sensor-01":"Capteur résistif — Pont diviseur",
"restrained-thermal-stress-01":"Barre bloquée — Contrainte thermique",
"stepped-bar-extension-01":"Tirant à deux sections — Allongement élastique",
"motor-slip-01":"Moteur asynchrone — Glissement instantané",
"log-decrement-01":"Vibrations amorties — Décrément logarithmique",
"exchanger-effectiveness-01":"Échangeur — Efficacité thermique",
"darcy-pipe-loss-01":"Conduite turbulente — Perte de pression",
"flywheel-angular-momentum-01":"Volant — Moment cinétique axial",
"rc-charge-threshold-01":"Circuit RC — Temps pour atteindre un seuil",
"thermal-clearance-01":"Dilatations différentielles — Jeu résiduel",
"venturi-pressure-01":"Venturi horizontal — Écart de pression",
"spring-series-01":"Deux ressorts en série — Raideur équivalente",
"hydraulic-pump-shaft-01":"Pompe — Puissance à l'arbre",
"braking-stop-time-01":"Freinage — Durée d'arrêt",
"beam-curvature-01":"Flexion — Courbure élastique",
"battery-autonomy-01":"Batterie 24 V — Autonomie idéale",
"strain-gauge-bridge-01":"Jauge — Tension d'un quart de pont",

"double-shear-pin-01":"Axe de chape — Cisaillement double",
"hydraulic-reynolds-01":"Flexible hydraulique — Nombre de Reynolds",
"composite-wall-01":"Paroi multicouche — Flux thermique",
"combined-uncertainty-01":"Métrologie — Incertitude combinée",
"stability-overturn-angle-01":"Engin sur dévers — Limite statique",

"hydro-motor-speed-01":"Moteur hydraulique — Vitesse volumétrique",
"beam-center-deflection-01":"Traverse bi-appuyée — Flèche centrale",
"reactive-three-phase-01":"Moteur triphasé — Puissance réactive",
"rl-step-current-01":"Circuit RL — Établissement du courant",
"npsh-available-01":"Pompe d’eau — NPSH disponible",
'hydraulic-relief-setpoint-01':"Soupape hydraulique — Pression de tarage",
'beam-support-reaction-01':"Poutre sur deux appuis — Réaction d'appui",
'lc-resonance-01':"Circuit LC — Fréquence propre électrique",
'screw-efficiency-01':"Vis de levage — Rendement avec frottement",
'adiabatic-compressor-01':"Compresseur — Température de compression idéale",
'convective-heat-flux-01':'Convection d’une paroi vers l’air ambiant',
'orifice-flow-01':'Orifice hydraulique : différence de pression et débit',
'hydrostatic-gate-force-01':'Poussée hydrostatique sur une porte verticale',
'capstan-tension-01':'Courroie sur demi-poulie et tensions tangentielles',
'bearing-l10-life-01':'Roulement à billes : charge radiale',
'sensor-4-20ma-01':'Capteur 4–20 mA : chaîne de mesure',
'natural-frequency-01':'Oscillateur masse–ressort et fréquence propre',
'rectangular-tube-inertia-01':'Tube rectangulaire creux, axe z',
'three-phase-power-01':'Moteur triphasé : trois conducteurs de phase',
'hydrostatic-column-01':'Colonne d’huile et prises de pression',
'planetary-fixed-ring-01':'Train épicycloïdal — cercles primitifs',
'thermal-radiation-01':'Rayonnement net d’une plaque',
'rotation-energy-01':'Volant d’inertie — énergie de rotation',
'center-mass-01':'Barycentre longitudinal de deux masses',
'torsion-angle-01':"Arbre en torsion et angle élastique",
'hydro-motor-torque-01':"Moteur hydraulique et couple de sortie",

'accumulator-isothermal-01':'Accumulateur : détente du gaz et huile restituée',
'wheatstone-bridge-01':'Pont de Wheatstone : deux diviseurs de tension',
'hydro-backpressure-01':'Vérin double effet, pressions opposées',
'euler-buckling-01':'Tige articulée et charge critique de flambement',
'hose-pressure-drop-01':'Flexible hydraulique et perte de pression',
'dc-voltage-drop-01':'Circuit 12 V, conducteurs aller et retour',
"moment-arm-02":"Levier, bras de levier et force inclinée",
"kinetic-friction-01":"Patin en glissement et effort de frottement",
"spring-stiffness-01":"Ressort sollicité axialement",
"beam-stress-02":"Poutre en flexion et moment appliqué",
"gear-ratio-02":"Engrenages extérieurs, sens opposés",
"screw-lead-01":"Vis à deux filets et avance par tour",
"hydro-cylinder-speed-02":"Vérin hydraulique et vitesse de tige",
"hydro-annular-force-01":"Vérin différentiel, chambre annulaire",
"pneumatic-consumption-01":"Vérin pneumatique et volume balayé",
"electrical-series-01":"Résistances en série",
"electrical-parallel-01":"Résistances en parallèle",
"inductor-energy-01":"Bobine et énergie magnétique",
"mechanical-efficiency-02":"Chaîne de transmission et rendement",
"rolling-torque-01":"Roue et couple résistant",
"thermal-resistance-01":"Paroi et conduction thermique",
"measurement-uncertainty-01":"Mesure et incertitude relative",
'motion-01':'Chariot en translation sur une voie',
'accel-01':'Chariot en accélération sur une voie',
'rotation-01':'Arbre en rotation',
'torque-01':'Levier et effort perpendiculaire',
'pressure-01':'Vérin et effort axial',
'flow-01':'Pompe et circulation du fluide',
'power-01':'Moteur et arbre de transmission',
'ohm-01':'Circuit électrique fermé avec résistance',
'energy-01':'Alimentation électrique et énergie consommée',
'heat-01':'Bloc métallique et thermomètre',
'stress-01':'Barre sollicitée en traction',
'strain-01':'Barre et allongement élastique',
'density-01':'Éprouvette de volume fixe',
'accuracy-01':'Comparaison mesure et référence',
'frequency-01':'Disque et capteur de rotation',
'kinetic-01':'Engin mobile et énergie cinétique',
"potential-01":"Charge suspendue et hauteur de levage",
"impulse-01":"Force appliquée pendant une durée",
"friction-02":"Patin et contact sec",
"buoyancy-01":"Corps immergé et poussée",
"gear-eff-01":"Transmission et rendement",
"pulley-01":"Deux poulies et courroie",
"capacitor-01":"Condensateur électrique",
"resistance-02":"Résistances en série",
"thermal-exp-01":"Dilatation d'une barre",
"hydro-speed-01":"Vérin et débit",
"work-01":"Travail d'une force",
"frequency-period-01":"Signal périodique",
"hydro-force-02":"Effort hydraulique",
"beam-defl-01":"Flèche d'une console",
"circular-02":"Roue et accélération normale",
"angular-accel-01":"Arbre et accélération angulaire",
"brake-torque-01":"Frein et couple résistant",
"incline-force-01":"Poids sur plan incliné",
"resultant-01":"Deux forces orthogonales",
"torsion-01":"Arbre soumis à la torsion",
"axial-strain-01":"Barre et déformation",
"gear-mesh-01":"Deux engrenages et entraxe",
"belt-speed-01":"Poulie et courroie",
"hydro-power-01":"Pompe et puissance hydraulique",
"hydro-volume-01":"Piston et volume balayé",
"pneumatic-force-01":"Vérin pneumatique",
"electric-power-02":"Récepteur électrique",
"joule-heat-01":"Résistance et effet Joule",
"rc-time-01":"Circuit RC",
"sampling-01":"Acquisition périodique",
"efficiency-chain-01":"Transmission à deux étages",
"rolling-load-01":"Roue et résistance au roulement",
"heat-transfer-01":"Paroi et conduction thermique",
"measurement-relative-01":"Mesure et référence"
});
const scientificLabels=Object.freeze({
"shaft-torsional-shear-stress-01":["N·m","MPa"],
"series-rl-impedance-01":["Hz","Ω"],
"series-system-reliability-01":["h","%"],
"dry-air-ideal-density-01":["bar abs","kg/m³"],
"parallel-spring-stiffness-01":["N/mm","N/mm"],
"beam-uniform-load-deflection-01":["kN/m","mm"],
"hydraulic-fluid-stiffness-01":["L","MN/m"],
"motor-synchronous-speed-01":["Hz","tr/min"],
"biot-number-plate-01":["W/(m²·K)","sans unité"],
"basquin-fatigue-life-01":["MPa","cycles"],
"rotor-centripetal-acceleration-01":["tr/min","m/s²"],
"parallel-thermal-bridges-01":["W/(m·K)","W"],
"sampling-alias-frequency-01":["Hz","Hz"],
"regenerative-cylinder-speed-01":["L/min","m/s"],
"buoyancy-immersed-volume-01":["L","N"],
"cantilever-strain-energy-01":["kN","J"],
"gas-polytropic-temperature-01":["bar abs","°C"],
"battery-discharge-c-rate-01":["A","h⁻¹"],
"hydraulic-cavitation-number-01":["m/s","sans unité"],
"bolt-preload-torque-01":["kN","N·m"],
"hydraulic-oil-compressibility-01":["Δp","ΔV"],
"hollow-shaft-polar-inertia-01":["d","Jₚ"],
"wheel-braking-slip-01":["ω","s"],
"lumped-cooling-time-constant-01":["h","τ"],
"adc-voltage-step-01":["Uref","q"],
"gear-eff-01":["η","Pᵤ"],
"pulley-01":["D₂","n₂"],
"capacitor-01":["U","Q"],
"resistance-02":["R₂","Rₑ"],
"thermal-exp-01":["ΔT","ΔL"],
"accumulator-polytropic-delivery-01":["p_bas","ΔV"],
"three-phase-capacitor-sizing-01":["cos φ₂","C_Δ"],
"pump-affinity-power-01":["n₂","P₂"],
"spring-stored-energy-01":["x","E_e"],
"goodman-fatigue-factor-01":["σ_m","n"],
"cylinder-stroke-time-01":["L","t"],
"gas-isothermal-work-01":["r","W"],
"symmetric-sling-tension-01":["θ","T"],
"voltage-divider-sensor-01":["R₂","U₂"],
"restrained-thermal-stress-01":["ΔT","σ"],
"flywheel-angular-momentum-01":["n","L"],
"rc-charge-threshold-01":["Uₛ","t"],
"thermal-clearance-01":["ΔT","g"],
"venturi-pressure-01":["Q","Δp"],
"spring-series-01":["k₂","k_eq"],
"hydraulic-pump-shaft-01":["Δp","Pₐ"],
"braking-stop-time-01":["v₀","tₐ"],
"beam-curvature-01":["M","κ"],
"battery-autonomy-01":["C","t"],
"strain-gauge-bridge-01":["ε","ΔU"],

"double-shear-pin-01":["F","τ"],
"hydraulic-reynolds-01":["Q","Re"],
"composite-wall-01":["ΔT","Φ"],
"combined-uncertainty-01":["u₁","U"],
"stability-overturn-angle-01":["h","θ_lim"],

"hydro-motor-speed-01":["Q","n"],
"beam-center-deflection-01":["F","δ"],
"reactive-three-phase-01":["cosφ","Q"],
"rl-step-current-01":["t","i"],
"npsh-available-01":["H","NPSHₐ"],
'convective-heat-flux-01':['h','Φ'],
'orifice-flow-01':['Δp','Q'],
'hydrostatic-gate-force-01':['h','F'],
'capstan-tension-01':['μ','Tlim'],
'natural-frequency-01':['m','f₀'],
'rectangular-tube-inertia-01':['e','I_z'],
'three-phase-power-01':['Iₗ','P'],
'hydrostatic-column-01':['h','Δp'],
'planetary-fixed-ring-01':['nₛ','nₚ'],
'thermal-radiation-01':['Tₛ','Pᵣ'],
'rotation-energy-01':['n','Eᵣ'],
'center-mass-01':['m₂','xG'],
'torsion-angle-01':["T","θ"],
'hydro-motor-torque-01':["Δp","Cu"],

'accumulator-isothermal-01':['pB','ΔV'],
'wheatstone-bridge-01':['R₄','Uout'],
'hydro-backpressure-01':['pB','Fₕ'],
'euler-buckling-01':['L','Pcr'],
'hose-pressure-drop-01':['Q','Δp'],
'dc-voltage-drop-01':['I','ΔU'],
 "circular-02": [
  "v",
  "aₙ"
 ],
 "angular-accel-01": [
  "Δt",
  "α"
 ],
 "brake-torque-01": [
  "|α|",
  "|C|"
 ],
 "incline-force-01": [
  "θ",
  "F∥"
 ],
 "resultant-01": [
  "Fᵧ",
  "R"
 ],
 "torsion-01": [
  "T",
  "τₘₐₓ"
 ],
 "axial-strain-01": [
  "ΔL",
  "ε"
 ],
 "gear-mesh-01": [
  "z₂",
  "a"
 ],
 "belt-speed-01": [
  "n",
  "v"
 ],
 "hydro-power-01": [
  "p",
  "Pₕ"
 ],
 "hydro-volume-01": [
  "L",
  "V"
 ],
 "pneumatic-force-01": [
  "p",
  "F"
 ],
 "electric-power-02": [
  "I",
  "P"
 ],
 "joule-heat-01": [
  "I",
  "Pⱼ"
 ],
 "rc-time-01": [
  "R",
  "τ"
 ],
 "sampling-01": [
  "Tₑ",
  "fₑ"
 ],
 "efficiency-chain-01": [
  "η₂",
  "ηₜₒₜ"
 ],
 "rolling-load-01": [
  "fᵣ",
  "Fᵣ"
 ],
 "heat-transfer-01": [
  "ΔT",
  "Φ"
 ],
 "measurement-relative-01": [
  "x",
  "δᵣ"
 ],
 "moment-arm-02": [
  "θ",
  "|M|"
 ],
 "kinetic-friction-01": [
  "μₖ",
  "Fₖ"
 ],
 "spring-stiffness-01": [
  "F",
  "k"
 ],
 "beam-stress-02": [
  "M",
  "σ"
 ],
 "gear-ratio-02": [
  "z₂",
  "|n₂/n₁|"
 ],
 "screw-lead-01": [
  "p",
  "L"
 ],
 "hydro-cylinder-speed-02": [
  "Q",
  "v"
 ],
 "hydro-annular-force-01": [
  "p",
  "F"
 ],
 "pneumatic-consumption-01": [
  "L",
  "V"
 ],
 "electrical-series-01": [
  "R₂",
  "Rₑ"
 ],
 "electrical-parallel-01": [
  "R₂",
  "Rₑ"
 ],
 "inductor-energy-01": [
  "I",
  "E"
 ],
 "mechanical-efficiency-02": [
  "η",
  "Pᵤ"
 ],
 "rolling-torque-01": [
  "Fᵣ",
  "Cᵣ"
 ],
 "thermal-resistance-01": [
  "λ",
  "Rₜ"
 ],
 "measurement-uncertainty-01": [
  "u",
  "uᵣ"
 ]
});
function valueLabel(id,x,result,y=215){
 const model=root.SIInvestigations, symbols=scientificLabels[id];
 if(!model||!symbols||!model.inputUnits||!model.criteria[id])throw new Error('Métadonnées scientifiques et unités manquantes : '+id);
 return text(32,y,symbols[0]+' = '+N(x)+' '+model.inputUnits[id]+' ; '+symbols[1]+' ≈ '+N(result)+' '+model.criteria[id].unit);
}
const legacyFooterIds=new Set(["hydraulic-oil-compressibility-01","hollow-shaft-polar-inertia-01","wheel-braking-slip-01","lumped-cooling-time-constant-01","adc-voltage-step-01","accumulator-polytropic-delivery-01","three-phase-capacitor-sizing-01","pump-affinity-power-01","spring-stored-energy-01","goodman-fatigue-factor-01","cylinder-stroke-time-01","gas-isothermal-work-01","symmetric-sling-tension-01","voltage-divider-sensor-01","restrained-thermal-stress-01","flywheel-angular-momentum-01","rc-charge-threshold-01","thermal-clearance-01","venturi-pressure-01","spring-series-01","hydraulic-pump-shaft-01","braking-stop-time-01","beam-curvature-01","battery-autonomy-01","strain-gauge-bridge-01","double-shear-pin-01","hydraulic-reynolds-01","composite-wall-01","combined-uncertainty-01","stability-overturn-angle-01","hydro-motor-speed-01","beam-center-deflection-01","reactive-three-phase-01","rl-step-current-01","npsh-available-01",'convective-heat-flux-01','orifice-flow-01','hydrostatic-gate-force-01','capstan-tension-01',"natural-frequency-01","rectangular-tube-inertia-01","three-phase-power-01","hydrostatic-column-01","planetary-fixed-ring-01","thermal-radiation-01","rotation-energy-01","center-mass-01","torsion-angle-01","hydro-motor-torque-01","accumulator-isothermal-01","wheatstone-bridge-01","hydro-backpressure-01","euler-buckling-01","circular-02","angular-accel-01","brake-torque-01","incline-force-01","resultant-01","torsion-01","axial-strain-01","gear-mesh-01","belt-speed-01","hydro-power-01","hydro-volume-01","pneumatic-force-01","electric-power-02","joule-heat-01","rc-time-01","sampling-01","efficiency-chain-01","rolling-load-01","heat-transfer-01","measurement-relative-01"]);
function render(id,x,result){
 if(!Object.prototype.hasOwnProperty.call(titles,id)||!Number.isFinite(x)||!Number.isFinite(result))throw new RangeError('Dessin invalide');
 let s='';
 switch(id){
case "shaft-torsional-shear-stress-01":{s+=circle(290,135,72,'#315c76')+circle(290,135,7,'#ffd17d')+line(290,135,290,63,'#8ddcff',3);if(x>0)s+=arrow(290,63,Math.min(490,330+x/4),63,'#ffca7d',4);s+=text(30,38,'Arbre plein : d = 40 mm ; T = '+N(x)+' N·m')+text(30,216,'τmax = '+N(result)+' MPa ; à la surface')+'<g data-torque-nm="'+x.toFixed(5)+'" data-shear-mpa="'+result.toFixed(6)+'"></g>';break;}
case "series-rl-impedance-01":{s+=line(65,133,165,133)+box(165,111,92,44,'#315c76')+line(257,133,305,133);for(let k=0;k<4;k++)s+='<path d="M'+(305+36*k)+' 133 A18 29 0 0 1 '+(341+36*k)+' 133" fill="none" stroke="#8ddcff" stroke-width="4"/>';s+=line(449,133,535,133)+text(175,102,'R = 20 Ω')+text(360,102,'L = 0,1 H')+text(30,38,'f = '+N(x)+' Hz ; éléments en série')+text(30,217,'|Z| = '+N(result)+' Ω ; phase non dessinée')+'<g data-frequency-hz="'+x.toFixed(5)+'" data-impedance-ohm="'+result.toFixed(6)+'"></g>';break;}
case "series-system-reliability-01":{for(let k=0;k<3;k++){const xx=105+145*k;s+=box(xx,97,112,66,'#315c76')+text(xx+25,137,'Bloc '+(k+1));if(k<2)s+=line(xx+112,130,xx+145,130,'#8ddcff',3)}s+=text(35,38,'Trois organes en série fonctionnelle')+text(35,216,'t = '+N(x)+' h ; Rsys = '+N(result)+' %')+'<g data-horizon-h="'+x.toFixed(5)+'" data-reliability-percent="'+result.toFixed(6)+'"></g>';break;}
case "dry-air-ideal-density-01":{s+=box(170,79,275,110,'#315c76')+line(240,85,240,182,'#d5e8f4',6)+text(265,126,'Air sec')+text(265,154,'T = 293,15 K')+text(35,38,'p absolue = '+N(x)+' bar abs')+text(35,217,'ρ = '+N(result)+' kg/m³ ; gaz parfait')+'<g data-pressure-bar-abs="'+x.toFixed(5)+'" data-density-kgm3="'+result.toFixed(6)+'"></g>';break;}
case "parallel-spring-stiffness-01":{s+=line(105,77,105,190,'#d5e8f4',7)+line(475,77,475,190,'#d5e8f4',7);for(const yy0 of [105,160]){s+=line(105,yy0,150,yy0,'#8ddcff',3);let path='M150 '+yy0;for(let k=0;k<8;k++)path+=' L'+(166+k*32)+' '+(yy0+(k%2?-13:13))+' L'+(182+k*32)+' '+yy0;s+='<path d="'+path+'" fill="none" stroke="#8ddcff" stroke-width="3"/>'+line(406,yy0,475,yy0,'#8ddcff',3)}s+=text(30,38,'Deux ressorts : déplacement commun')+text(30,218,'k1 = 40 N/mm ; k2 = '+N(x)+' N/mm ; keq = '+N(result)+' N/mm')+'<g data-spring2-nmm="'+x.toFixed(5)+'" data-equivalent-nmm="'+result.toFixed(6)+'"></g>';break;}
case "beam-uniform-load-deflection-01":{const sag=Math.min(24,Math.max(0,result*35));s+='<path d="M135 130 Q300 '+(130+2*sag).toFixed(2)+' 465 130" fill="none" stroke="#8ddcff" stroke-width="9"/>'+'<path d="M120 165 L150 165 L135 135 Z M450 165 L480 165 L465 135 Z" fill="#9ac5d7"/>';if(x>0)for(const px of [185,260,335,410])s+=arrow(px,73,px,111,'#ffca7d',3);s+=text(30,38,'q = '+N(x)+' kN/m ; L = 2,00 m')+text(30,219,'δ = '+N(result)+' mm ; flèche amplifiée')+'<g data-deflection-mm="'+result.toFixed(6)+'" data-load-knm="'+x.toFixed(5)+'"></g>';break;}
case "hydraulic-fluid-stiffness-01":{const px=190+17*x;s+=box(150,82,310,95,'#315c76')+box(px,88,14,83,'#d5e8f4')+box(px+14,119,540-(px+14),20,'#d5e8f4')+text(30,38,'β = 1,40 GPa ; A = 0,0100 m²')+text(30,216,'V = '+N(x)+' L ; k = '+N(result)+' MN/m')+'<g data-volume-l="'+x.toFixed(5)+'" data-stiffness-mnm="'+result.toFixed(6)+'"></g>';break;}
case "motor-synchronous-speed-01":{s+=circle(290,132,80,'#315c76')+circle(290,132,51,'#122f47')+circle(290,132,12,'#ffd17d')+text(30,38,'p = 2 paires ; f = '+N(x)+' Hz')+text(30,217,'nₛ = '+N(result)+' tr/min ; sens non déterminé')+'<g data-frequency-hz="'+x.toFixed(5)+'" data-synchronous-rpm="'+result.toFixed(5)+'"></g>';break;}
case "biot-number-plate-01":{s+=box(250,75,100,130,'#9c7157')+line(250,75,250,205,'#d5e8f4',3)+line(350,75,350,205,'#d5e8f4',3)+text(30,38,'h = '+N(x)+' W/(m²·K) ; λ = 15 W/(m·K)')+text(30,219,'Lc = 0,0100 m ; Bi = '+N(result)+' sans unité')+'<g data-h-wm2k="'+x.toFixed(5)+'" data-biot="'+result.toFixed(7)+'"></g>';break;}
case "basquin-fatigue-life-01":{s+=box(195,106,215,48,'#315c76')+box(172,90,23,80,'#9c7157')+box(410,90,23,80,'#9c7157')+arrow(168,130,85,130,'#ffca7d',4)+arrow(438,130,520,130,'#ffca7d',4)+text(30,38,'σa = '+N(x)+' MPa ; m = 5')+text(30,219,'N = '+N(result)+' cycles ; éprouvette fictive')+'<g data-stress-mpa="'+x.toFixed(5)+'" data-cycles="'+result.toFixed(2)+'"></g>';break;}

case "rotor-centripetal-acceleration-01":{const a=2*Math.PI*x/60; s+=circle(290,135,76,'#315c76')+circle(290,135,9,'#ffd17d')+line(290,135,365,135,'#d5e8f4',3)+circle(365,135,7,'#ffca7d');if(x>0)s+=arrow(361,135,304,135,'#ffca7d',4);s+=text(30,38,'r = 0,180 m ; n = '+N(x)+' tr/min')+text(30,217,'aₙ = '+N(result)+' m/s² ; vers l’axe')+'<g data-omega-rads="'+a.toFixed(6)+'" data-acceleration-ms2="'+result.toFixed(6)+'"></g>';break;}
case "parallel-thermal-bridges-01":{const p1=6.4,p2=40*x;s+=box(155,79,285,48,'#315c76')+box(155,143,285,48,'#9b7151')+text(170,108,'A₁ = 0,80 m²')+text(170,171,'A₂ = 0,20 m²');s+=arrow(310,109,310+1.5*p1,109,'#7ce8ae',3)+arrow(310,172,310+1.5*p2,172,'#ffca7d',3);s+=text(30,38,'λ₂ = '+N(x)+' W/(m·K) ; ΔT = 20 K')+text(30,217,'Φ₁ = 6,4 W ; Φ₂ = '+N(p2)+' W ; total = '+N(result)+' W')+'<g data-zone1-w="'+p1.toFixed(5)+'" data-zone2-w="'+p2.toFixed(5)+'" data-total-w="'+result.toFixed(5)+'"></g>';break;}
case "sampling-alias-frequency-01":{const fs=x,origin=75,span=80,scale=5.4,signal=t=>135-42*Math.sin(2*Math.PI*75*t/1000);const wave=Array.from({length:161},(_,i)=>{const t=i*.5;return(i?'L':'M')+(origin+t*scale).toFixed(2)+' '+signal(t).toFixed(2)}).join(' ');s+=line(75,185,520,185,'#9bc9e5',2)+line(75,70,75,185,'#9bc9e5',2)+'<path d="'+wave+'" fill="none" stroke="#8ddcff" stroke-width="2"/>';let count=0;for(let k=0;k*1000/fs<=span;k++){const t=k*1000/fs;s+=circle(Number((origin+t*scale).toFixed(2)),Number(signal(t).toFixed(2)),4,'#ffd17d');count++;}s+=text(30,38,'Signal = 75 Hz ; fₑ = '+N(fs)+' Hz')+text(30,217,'Fréquence apparente = '+N(result)+' Hz')+'<g data-samples="'+count+'" data-alias-hz="'+result.toFixed(5)+'"></g>';break;}
case "regenerative-cylinder-speed-01":{s+=box(145,92,275,88,'#315c76')+box(315,98,17,76,'#d5e8f4')+box(332,124,180,24,'#d5e8f4')+line(175,92,175,66,'#8ddcff',6)+line(405,92,405,66,'#8ddcff',6)+line(175,66,405,66,'#8ddcff',6)+line(290,66,290,43,'#8ddcff',6);if(x>0)s+=arrow(290,42,290,61,'#7ce8ae',4)+arrow(425,136,490,136,'#ffca7d',4);s+=text(30,38,'Qₚ = '+N(x)+' L/min ; D = 80 mm ; d = 40 mm')+text(30,217,'Chambres reliées ; v = '+N(result)+' m/s')+'<g data-flow-lmin="'+x.toFixed(5)+'" data-rod-area-m2="'+(Math.PI*.04**2/4).toFixed(9)+'" data-speed-ms="'+result.toFixed(7)+'"></g>';break;}
case "buoyancy-immersed-volume-01":{s+=box(150,84,300,126,'#235e80')+line(150,84,450,84,'#8ddcff',4);if(x>0){const h=75*x/100,cy=184-h/2;s+=box(275,184-h,70,h,'#b28a56')+arrow(310,cy,310,cy-45,'#7ce8ae',4)+circle(310,cy,4,'#ffd17d');}s+=text(30,38,'Eau : ρ = 1 000 kg/m³ ; Vᵢ = '+N(x)+' L')+text(30,217,'Fₐ = '+N(result)+' N ; verticale ascendante')+'<g data-volume-l="'+x.toFixed(5)+'" data-buoyancy-n="'+result.toFixed(5)+'"></g>';break;}
case "safety-stop-separation-01":{s+=box(350,89,110,90,'#315c76')+box(80,115,54,62,'#82664c')+line(134,185,350,185,'#8ddcff',2)+(x>0?arrow(142,146,220+60*x/2,146,'#ffca7d'):'')+text(35,40,'v = '+N(x)+' m/s ; T = 0,45 s')+text(35,218,'S = '+N(result)+' m ; C = 0,12 m')+'<g data-speed-ms="'+x.toFixed(5)+'" data-separation-m="'+result.toFixed(7)+'"></g>';break;}
case "safety-proof-test-pfd-01":{const w=350*x/8760;s+=box(95,103,405,72,'#173f59')+'<rect x="110" y="122" width="'+w.toFixed(2)+'" height="34" fill="#ffca7d" data-period-bar="'+w.toFixed(2)+'"/>'+text(35,40,'T = '+N(x)+' h ; λ_DU = 2×10⁻⁶ h⁻¹')+text(35,218,'PFD_moy ≈ '+N(result)+' %')+'<g data-period-h="'+x.toFixed(5)+'" data-pfd-percent="'+result.toFixed(7)+'"></g>';break;}
case "production-bottleneck-01":{const cap=[60,x,75],b=Math.min(...cap);for(let k=0;k<3;k++){const bx=75+k*170;s+=box(bx,91,130,88,cap[k]===b?'#79512c':'#27566d')+text(bx+18,125,'P'+(k+1))+text(bx+12,158,N(cap[k])+' p/h');if(k<2)s+=arrow(bx+133,135,bx+165,135,'#7ce8ae',3)}s+=text(35,40,'Q₂ = '+N(x)+' pièces/h')+text(35,218,'Q_ligne = '+N(result)+' pièces/h')+'<g data-poste2-rate="'+x.toFixed(5)+'" data-line-rate="'+result.toFixed(7)+'"></g>';break;}
case "electrohydraulic-drive-current-01":{s+=box(65,94,130,83,'#315c76')+box(245,94,130,83,'#315c76')+box(430,94,120,83,'#315c76')+text(91,130,'48 V')+text(266,130,'M + pompe')+text(447,130,'Charge')+(x>0?arrow(195,135,240,135,'#ffca7d',3)+arrow(375,135,425,135,'#7ce8ae',3):'')+text(35,40,'Δp = '+N(x)+' bar ; Q = 12 L/min')+text(35,218,'I = '+N(result)+' A ; η = 0,80')+'<g data-pressure-bar="'+x.toFixed(5)+'" data-current-a="'+result.toFixed(7)+'"></g>';break;}
case "material-thermal-diffusivity-01":{s+=box(175,85,255,120,'#506d7d')+line(205,97,205,190,'#ffca7d',4)+line(400,97,400,190,'#7ce8ae',4)+arrow(220,145,385,145,'#ffca7d',4)+text(35,40,'λ = '+N(x)+' W/(m·K)')+text(35,218,'α = '+N(result)+' mm²/s')+'<g data-conductivity="'+x.toFixed(5)+'" data-diffusivity="'+result.toFixed(7)+'"></g>';break;}
case "bearing-projected-pressure-01":{s+=box(165,94,260,92,'#27566d')+box(185,109,220,62,'#7a8998')+line(185,171,405,171,'#ffd17d',4)+text(190,132,'BAGUE')+text(188,207,'L = 45 mm ; d = 30 mm')+(x>0?arrow(295,54,295,91,'#ffca7d'):'')+text(30,38,'F = '+N(x)+' kN')+text(330,65,'pₘ = '+N(result)+' MPa')+'<g data-force-kn="'+x.toFixed(5)+'" data-pressure-mpa="'+result.toFixed(7)+'"></g>';break;}
case "inductor-reactance-frequency-01":{s+=line(100,126,176,126,'#8ddcff',4)+line(410,126,505,126,'#8ddcff',4);for(let k=0;k<5;k++){const cx=200+42*k;s+='<path d="M'+(cx-22)+' 126 C'+(cx-18)+' 71 '+(cx+18)+' 71 '+(cx+22)+' 126" fill="none" stroke="#ffd17d" stroke-width="4"/>';}s+=text(140,184,'Bobine idéale L = 80 mH')+text(30,40,'f = '+N(x)+' Hz')+text(315,40,'X_L = '+N(result)+' Ω')+'<g data-frequency-hz="'+x.toFixed(5)+'" data-reactance-ohm="'+result.toFixed(7)+'"></g>';break;}
case "coolant-thermal-power-01":{s+=box(205,85,188,95,'#34617a')+line(85,118,205,118,'#8ddcff',9)+line(393,118,510,118,'#8ddcff',9)+(x>0?arrow(95,118,185,118,'#7ce8ae')+arrow(408,118,490,118,'#7ce8ae'):'')+text(212,120,'ÉCHANGEUR')+text(73,156,'30 °C')+text(425,156,'24 °C')+text(30,39,'Qᵥ = '+N(x)+' L/min')+text(325,39,'P = '+N(result)+' kW')+'<g data-flow-lmin="'+x.toFixed(5)+'" data-power-kw="'+result.toFixed(7)+'"></g>';break;}
case "brake-disc-adiabatic-rise-01":{s+=line(70,177,528,177,'#a9d9ed',3)+box(115,122,250,40,'#446d87')+circle(170,171,35,'#52677d')+circle(315,171,35,'#52677d')+circle(170,171,19,'#a36d55')+circle(315,171,19,'#a36d55')+(x>0?arrow(378,135,470,135,'#ffca7d'):'')+text(110,105,'4 disques identiques')+text(30,40,'v = '+N(x)+' km/h')+text(340,40,'ΔT = '+N(result)+' K')+'<g data-speed-kmh="'+x.toFixed(5)+'" data-rise-k="'+result.toFixed(7)+'"></g>';break;}
case "encoder-linear-resolution-01":{s+=line(72,187,520,187,'#a9d9ed',4)+circle(282,119,67,'#27566d')+circle(282,119,8,'#ffd17d');for(let k=0;k<16;k++){const a=2*Math.PI*k/16;s+=line((282+53*Math.cos(a)).toFixed(2),(119+53*Math.sin(a)).toFixed(2),(282+64*Math.cos(a)).toFixed(2),(119+64*Math.sin(a)).toFixed(2),'#ffd17d',2);}s+=text(45,40,'D = '+N(x)+' mm')+text(330,40,'δ = '+N(result)+' mm/compte')+text(365,111,'1 024 imp/tr')+text(365,138,'quadrature ×4')+text(60,218,'Traits figuratifs : non représentatifs du nombre réel')+'<g data-diameter-mm="'+x.toFixed(5)+'" data-resolution-mm="'+result.toFixed(9)+'"></g>';break;}


case 'tank-gravity-drain-01':{const y=190-95*(x-.2)/1.8;s+=box(188,70,190,125)+'<rect x="193" y="'+y.toFixed(2)+'" width="180" height="'+(190-y).toFixed(2)+'" fill="#248cb7"/>'+line(378,187,445,187,'#8ddcff',8)+text(30,40,'h₀ = '+N(x)+' m ; h_f = 0,20 m')+text(30,217,'Temps de vidange = '+N(result)+' s')+'<g data-level-m="'+x.toFixed(6)+'" data-time-s="'+result.toFixed(6)+'"></g>';break;}
case 'water-mixing-temperature-01':{s+=box(60,100,130,85,'#824c38')+box(405,100,130,85,'#205b84')+box(245,132,108,55,'#306c70')+arrow(190,145,240,145)+arrow(405,155,357,155,'#7ce8ae')+text(67,130,'8 kg')+text(65,170,'70 °C')+text(411,130,'m = '+N(x)+' kg')+text(412,170,'20 °C')+text(30,40,'Mélange adiabatique de deux masses')+text(30,217,'T_eq = '+N(result)+' °C')+'<g data-mass-kg="'+x.toFixed(6)+'" data-temperature-c="'+result.toFixed(6)+'"></g>';break;}
case 'copper-cable-resistance-01':{s+=circle(90,135,10,'#ffd17d')+line(100,125,495,125,'#ffca7d',8)+line(100,145,495,145,'#ffca7d',8)+circle(505,135,10,'#ffd17d')+line(105,174,495,174)+line(105,165,105,182)+line(495,165,495,182)+text(30,40,'L = '+N(x)+' m ; S = 2,5 mm²')+text(30,217,'R = '+N(result)+' Ω ; cuivre à 20 °C')+'<g data-length-m="'+x.toFixed(6)+'" data-resistance-ohm="'+result.toFixed(6)+'"></g>';break;}
case 'pump-volumetric-efficiency-01':{s+=line(95,140,230,140,'#8ddcff',7)+circle(300,140,67)+circle(300,140,23,'#ffd17d')+line(368,140,510,140,'#8ddcff',7)+(x>0?arrow(400,140,470,140,'#7ce8ae'):'')+text(30,40,'Q_th = 37,5 L/min ; Q_mes = '+N(x)+' L/min')+text(30,217,'η_v = '+N(result)+' %')+'<g data-flow-lmin="'+x.toFixed(6)+'" data-efficiency-pct="'+result.toFixed(6)+'"></g>';break;}
case 'belt-transverse-wave-speed-01':{const path=Array.from({length:51},(_,i)=>(i?'L':'M')+(95+i*8)+' '+(140-15*Math.sin(i*Math.PI/12.5)).toFixed(2)).join(' ');s+='<path d="'+path+'" fill="none" stroke="#8ddcff" stroke-width="5"/>'+arrow(105,140,55,140)+arrow(495,140,545,140)+text(30,40,'F_t = '+N(x)+' N ; μ_l = 0,080 kg/m')+text(30,217,'c = '+N(result)+' m/s ; forme indicative')+'<g data-tension-n="'+x.toFixed(6)+'" data-wave-speed-ms="'+result.toFixed(6)+'"></g>';break;}

case "braking-distance-friction-01":{const w=350*Math.min(1,result/35);s+=line(70,175,540,175)+box(90,123,100,40)+circle(110,173,10)+circle(170,173,10)+(x>0?arrow(195,140,230,140):'')+line(195,185,195+w,185,'#7ce8ae',4)+text(30,40,'v₀ = '+N(x)+' km/h ; μ = 0,60')+text(30,216,'d = '+N(result)+' m')+'<g data-distance-m="'+result.toFixed(6)+'"></g>';break;}
case "heat-exchanger-lmtd-01":{s+=box(140,90,320,95)+line(160,115,440,115,'#ffca7d',6)+line(160,158,440,158,'#7ce8ae',6)+text(30,40,'ΔT₁ = 60 K ; ΔT₂ = '+N(x)+' K')+text(30,216,'ΔTₘₗ = '+N(result)+' K')+'<g data-lmtd-k="'+result.toFixed(6)+'"></g>';break;}
case "column-slenderness-01":{const h=65+85*(x-600)/1200;s+=line(230,198,370,198)+line(300,198,300,198-h,'#7ce8ae',12)+circle(300,198,7)+circle(300,198-h,7)+text(30,40,'L = '+N(x)+' mm ; d = 25 mm')+text(30,216,'λ = '+N(result)+' sans unité')+'<g data-slenderness="'+result.toFixed(6)+'"></g>';break;}
case "acoustic-distance-loss-01":{const px=170+(x-2)/8*300;s+=circle(105,135,32)+line(140,135,px,135,'#8ddcff',3)+circle(px,135,10,'#ffd17d')+text(30,40,'r₁ = 1 m ; r₂ = '+N(x)+' m')+text(30,216,'Perte ΔL = '+N(result)+' dB')+'<g data-acoustic-db="'+result.toFixed(6)+'"></g>';break;}
case "beam-central-moment-01":{s+=line(110,153,490,153,'#8ddcff',8)+line(110,155,95,180)+line(110,155,125,180)+line(490,155,475,180)+line(490,155,505,180)+(x>0?arrow(300,65,300,140):'')+text(30,40,'F = '+N(x)+' kN ; L = 2,0 m')+text(30,216,'Mₘₐₓ = '+N(result)+' kN·m')+'<g data-moment-knm="'+result.toFixed(6)+'"></g>';break;}
case 'water-hammer-joukowsky-01':{s+=box(95,95,410,75,'#21465d')+line(110,110,490,110,'#8ddcff',3)+line(110,170,490,170,'#8ddcff',3)+line(385,100,385,170,'#ffca7d',4);if(x>0)s+=arrow(170,140,170+Math.min(155,35+x*75),140,'#ffca7d',4);s+=text(35,38,'ρ = 850 kg/m³ ; a = 1 200 m/s')+text(35,65,'Δv = '+N(x)+' m/s ; onde de pression idéale')+text(35,215,'Δp = '+N(result)+' bar')+'<g data-surge-bar="'+result.toFixed(6)+'"></g>';break;}
case 'thermal-contact-resistance-01':{const flux=20/result;s+=box(120,90,170,100,'#9b704d')+box(310,90,170,100,'#426f91')+line(300,85,300,195,'#ffca7d',5)+arrow(165,139,275,139,'#ffca7d',4)+arrow(325,139,435,139,'#7ce8ae',4);s+=text(35,36,'Interface A = 0,040 m² ; ΔT = 20 K')+text(35,64,'h_c = '+N(x)+' W/(m²·K)')+text(35,218,'R_c = '+N(result)+' K/W ; Φ = '+N(flux)+' W')+'<g data-contact-k-w="'+result.toFixed(8)+'" data-heat-flow-w="'+flux.toFixed(4)+'"></g>';break;}
case 'noise-level-addition-01':{s+=box(100,98,75,75,'#315a73')+circle(137,135,24,'#ffd17d')+box(425,98,75,75,'#315a73')+circle(463,135,24,'#ffd17d')+line(177,136,257,136,'#8ddcff',4)+line(345,136,423,136,'#8ddcff',4);const width=240*Math.max(0,Math.min(1,(result-60)/45));s+=box(180,180,240,18,'#234c66')+'<rect x="180" y="180" width="'+width.toFixed(3)+'" height="18" fill="#ffca7d" data-level-width="'+width.toFixed(3)+'"/>';s+=text(35,37,'Sources incohérentes : L₁ = 80 dB(A)')+text(35,66,'L₂ = '+N(x)+' dB(A) ; somme énergétique')+text(35,222,'LΣ = '+N(result)+' dB(A)')+'<g data-total-db="'+result.toFixed(6)+'"></g>';break;}
case 'machine-availability-01':{const up=result*3.6,down=360-up;s+=box(120,100,360,58,'#22465b')+'<rect x="120" y="100" width="'+up.toFixed(3)+'" height="58" fill="#7ce8ae" data-up-width="'+up.toFixed(3)+'"/>'+'<rect x="'+(120+up).toFixed(3)+'" y="100" width="'+down.toFixed(3)+'" height="58" fill="#ffca7d" data-down-width="'+down.toFixed(3)+'"/>';s+=text(35,37,'MTBF = 120 h ; MTTR = '+N(x)+' h')+text(35,67,'Vert : disponible ; orange : réparation')+text(35,217,'A_i = '+N(result)+' % ; cycle = '+N(120+x)+' h')+'<g data-availability-pct="'+result.toFixed(6)+'"></g>';break;}
case 'filter-beta-efficiency-01':{const passed=200/x;s+=box(120,91,200,30,'#315a73')+box(120,154,200,30,'#315a73')+'<rect x="120" y="91" width="200" height="30" fill="#ffca7d" data-upstream-width="200"/>'+'<rect x="120" y="154" width="'+passed.toFixed(3)+'" height="30" fill="#7ce8ae" data-downstream-width="'+passed.toFixed(3)+'"/>'+line(350,86,350,188,'#8ddcff',5);s+=text(35,37,'β₁₀ = '+N(x)+' (sans unité) ; taille ≥ 10 µm')+text(35,66,'Barres : fractions amont et aval')+text(35,219,'η₁₀ = '+N(result)+' % ; fraction aval = '+N(1/x))+'<g data-capture-pct="'+result.toFixed(6)+'" data-passed-fraction="'+(1/x).toFixed(8)+'"></g>';break;}
case "bearing-friction-power-01":{const v=2*Math.PI*.04*x/60;s+=circle(260,128,57,'#315a73')+circle(260,128,18,'#ffd17d')+line(260,128,420,128,'#8ddcff',8)+line(140,184,420,184,'#9bc9e5',3);if(x>0)s+=arrow(260,185,260+Math.min(90,20+x/30),185,'#ffca7d',4);s+=text(34,36,'Palier équivalent : N = 800 N ; μ = 0,06')+text(34,62,'r = 0,040 m ; n = '+N(x)+' tr/min')+text(340,110,'Ff = 48 N')+text(34,217,'v = '+N(v)+' m/s ; P = '+N(result)+' W')+'<g data-loss-w="'+result.toFixed(6)+'"></g>';break;}
case "poiseuille-microtube-flow-01":{s+=box(120,100,360,65,'#173f59')+line(125,108,475,108,'#8ddcff',4)+line(125,157,475,157,'#8ddcff',4);if(x>0){s+=arrow(170,132,170+Math.min(210,30+result*50),132,'#ffca7d',4)+arrow(170,119,170+Math.min(120,15+result*24),119,'#7ce8ae',3)+arrow(170,145,170+Math.min(120,15+result*24),145,'#7ce8ae',3);}s+=text(34,37,'Conduite : r = 2 mm ; L = 2 m ; μ = 0,080 Pa·s')+text(34,65,'Δp = '+N(x)+' kPa ; profil laminaire schématique')+text(35,214,'Q = '+N(result)+' mL/s')+'<g data-flow-ml-s="'+result.toFixed(6)+'"></g>';break;}
case "ultrasonic-doppler-shift-01":{s+=box(92,98,65,58,'#315a73')+circle(430,125,29,'#ffd17d')+line(158,125,398,125,'#8ddcff',2,'stroke-dasharray="8 7"');for(let k=0;k<3;k++)s+='<path d="M'+(170+k*35)+' 89 Q'+(188+k*35)+' 125 '+(170+k*35)+' 161" fill="none" stroke="#8ddcff" stroke-width="2"/>';if(x>0)s+=arrow(395,178,395-Math.min(95,20+35*x),178,'#ffca7d',4);s+=text(30,36,'Capteur f₀ = 2 MHz ; c = 1 500 m/s')+text(30,65,'Cible vers capteur ; θ = 30° ; v = '+N(x)+' m/s')+text(35,215,'Δf = '+N(result)+' kHz')+'<g data-doppler-khz="'+result.toFixed(6)+'"></g>';break;}
case "ntc-beta-resistance-01":{const h=105*x/80;s+=box(210,86,170,70,'#315a73')+line(245,122,345,122,'#ffd17d',5)+line(170,122,210,122,'#8ddcff',4)+line(380,122,420,122,'#8ddcff',4)+box(112,78,28,117,'#183e59')+'<rect x="117" y="'+(190-h).toFixed(2)+'" width="18" height="'+h.toFixed(2)+'" fill="#ffca7d" data-thermometer-height="'+h.toFixed(3)+'"/>'+text(35,37,'NTC : R₂₅ = 10 kΩ ; B = 3 950 K')+text(35,66,'T = '+N(x)+' °C = '+N(x+273.15)+' K')+text(390,112,'NTC')+text(35,215,'R(T) = '+N(result)+' kΩ')+'<g data-resistance-kohm="'+result.toFixed(6)+'"></g>';break;}
case "fracture-critical-crack-01":{const a=Math.min(125,Math.max(20,result*4));s+=box(160,85,290,100,'#315a73')+line(160,135,160+a,135,'#ffca7d',5)+circle(160+a,135,4,'#ffca7d')+arrow(165,134,90,134,'#7ce8ae',4)+arrow(445,134,520,134,'#7ce8ae',4)+text(35,36,'Fissure de rive : K_IC = 40 MPa√m ; Y = 1,12')+text(35,64,'σ = '+N(x)+' MPa ; traction ; géométrie indicative')+text(35,216,'a critique = '+N(result)+' mm ; non à l’échelle')+'<g data-crack-mm="'+result.toFixed(6)+'"></g>';break;}
case "helical-gear-axial-force-01":{const fa=Math.min(105,result/14);s+=circle(240,125,36,'#315a73')+circle(240,125,5,'#ffd17d')+line(240,125,276,125,'#8ddcff',3)+circle(276,125,6,'#ffd17d')+arrow(276,125,276,65,'#7ce8ae',4);if(x>0)s+=arrow(276,125,276+fa,125,'#ffca7d',4);s+=text(40,38,'Projection locale : axes tangentiel t et axial a')+text(40,66,'Fₜ = 2 000 N ; C = 180 N·m ; d = 0,180 m')+text(370,99,'a →')+text(300,170,'β = '+N(x)+' °')+text(45,220,'Fₐ = '+N(result)+' N ; effort axial')+'<g data-axial-n="'+result.toFixed(6)+'" data-angle-deg="'+x.toFixed(3)+'"></g>';break;}
case "oil-pressure-wave-speed-01":{const dist=result*.005,front=95+420*dist/10;s+=line(95,102,515,102,'#8ddcff',6)+line(95,157,515,157,'#8ddcff',6)+line(95,102,95,157,'#8ddcff',4)+line(515,102,515,157,'#8ddcff',4)+line(front,105,front,154,'#ffca7d',5)+arrow(front-70,129,front-7,129,'#ffca7d',3);s+=text(35,40,'Conduite rigide : L = 10 m ; ρ = 850 kg/m³')+text(35,70,'Instantané t = 5 ms ; K = '+N(x)+' GPa')+text(40,196,'Front à '+N(dist)+' m ; a = '+N(result)+' m/s')+text(40,222,'Modèle fluide seul : paroi indéformable')+'<g data-wave-front-m="'+dist.toFixed(6)+'" data-wave-speed-m-s="'+result.toFixed(6)+'"></g>';break;}
case "parallel-axis-inertia-01":{const gx=210,oy=133,offset=250*x,ox=gx+offset;s+=circle(gx,oy,43,'#315a73')+circle(gx,oy,7,'#ffd17d')+circle(ox,oy,5,'#7ce8ae')+line(gx,oy+52,ox,oy+52,'#ffd17d',3)+line(gx,oy+44,gx,oy+62,'#ffd17d',2)+line(ox,oy+44,ox,oy+62,'#ffd17d',2)+text(35,40,'Axes parallèles z_G et z_O ; masse m = 12 kg')+text(35,67,'J_G = 0,18 kg·m² ; d = '+N(x)+' m')+text(gx-17,100,'G')+text(ox+9,126,'O')+text(40,218,'J_O = '+N(result)+' kg·m²')+'<g data-offset-px="'+offset.toFixed(4)+'" data-inertia-kg-m2="'+result.toFixed(6)+'"></g>';break;}
case "heat-pump-carnot-cop-01":{const qc=result-1;s+=box(197,36,210,43,'#a65b35')+box(197,176,210,43,'#256788')+box(246,105,112,42,'#426d7d')+arrow(300,176,300,148,'#7ce8ae',4)+arrow(300,105,300,80,'#ffca7d',4)+arrow(150,125,245,125,'#8ddcff',4)+text(220,62,'Source chaude '+N(x)+' °C')+text(220,203,'Source froide 0 °C')+text(370,119,'Qₕ = '+N(result)+' kJ')+text(375,146,'Q𝚌 = '+N(qc)+' kJ')+text(53,116,'W = 1 kJ')+text(40,28,'Bilan réversible : Qₕ = Q𝚌 + W')+text(40,231,'COP idéal = '+N(result)+' (sans unité)')+'<g data-cop="'+result.toFixed(6)+'" data-heat-kj="'+result.toFixed(6)+'" data-cold-kj="'+qc.toFixed(6)+'"></g>';break;}
case "oil-kinematic-viscosity-01":{s+=box(140,72,315,112,'#246b8e')+line(145,115,449,115,'#8ddcff',3)+line(145,139,449,139,'#8ddcff',3)+circle(200,125,18,'#ffd17d')+circle(395,125,18,'#7ce8ae')+text(35,39,'Huile newtonienne ; T constante ; ρ = 850 kg/m³')+text(37,65,'Viscosimètre : μ = '+N(x)+' mPa·s')+text(40,218,'ν = '+N(result)+' mm²/s ; conversion μ/ρ')+'<g data-dynamic-viscosity-mpa-s="'+x.toFixed(5)+'" data-kinematic-viscosity-mm2-s="'+result.toFixed(6)+'"></g>';break;}
case "miner-fatigue-damage-01":{const d1=.15,d2=x/50,scale=95;const h1=d1*scale,h2=d2*scale;s+=line(95,184,510,184,'#b9d9e9',3)+line(95,89,510,89,'#ffca7d',2,'stroke-dasharray="7 5"');s+='<rect x="180" y="'+(184-h1).toFixed(2)+'" width="74" height="'+h1.toFixed(2)+'" fill="#7ce8ae" data-d1="'+d1+'"/><rect x="322" y="'+(184-h2).toFixed(2)+'" width="74" height="'+h2.toFixed(2)+'" fill="#8ddcff" data-d2="'+d2.toFixed(6)+'"/>';s+=text(160,208,'n₁/N₁ = 0,15')+text(314,208,'n₂/N₂')+text(32,38,'Seuil D = 1 ; cycles N₁ = 80 000 ; N₂ = 50 000')+text(32,224,'n₂ = '+N(x)+' milliers de cycles ; D = '+N(result)+' (sans unité)');s+='<g data-damage="'+result.toFixed(6)+'"></g>';break;}
case "thermocouple-seebeck-voltage-01":{s+=circle(132,118,10,'#ffd17d')+line(142,114,250,70,'#ffb78a',5)+line(250,70,452,70,'#ffb78a',5)+line(452,70,452,100,'#ffb78a',5)+line(142,122,250,164,'#8ddcff',5)+line(250,164,452,164,'#8ddcff',5)+line(452,164,452,136,'#8ddcff',5)+circle(452,118,18,'#315a73');s+=text(442,124,'V')+text(32,38,'S = 41 µV/K ; Tref = 20 °C')+text(32,218,'Tchaud = '+N(x)+' °C ; E = '+N(result)+' mV')+text(190,110,'Métal A')+text(195,188,'Métal B')+'<g data-emf-mv="'+result.toFixed(6)+'"></g>';break;}
case "transformer-turns-ratio-01":{s+=line(263,60,263,187,'#a8c4d4',6)+line(279,60,279,187,'#a8c4d4',6)+line(320,60,320,187,'#a8c4d4',6)+line(336,60,336,187,'#a8c4d4',6);for(let i=0;i<5;i++){const y=83+i*20;s+='<path d="M230 '+y+' Q205 '+(y+10)+' 230 '+(y+20)+'" fill="none" stroke="#ffca7d" stroke-width="4"/><path d="M370 '+y+' Q395 '+(y+10)+' 370 '+(y+20)+'" fill="none" stroke="#8ddcff" stroke-width="4"/>';}s+=text(72,98,'U₁ = 230 V')+text(72,130,'N₁ = 1 000')+text(409,98,'U₂ = '+N(result)+' V')+text(409,130,'N₂ = '+N(x))+text(32,38,'Enroulements distincts ; couplage magnétique idéal')+text(32,220,'N₂ = '+N(x)+' spires ; U₂ = '+N(result)+' V')+'<g data-secondary-voltage-v="'+result.toFixed(6)+'"></g>';break;}
case "rc-lowpass-cutoff-01":{s+=line(80,115,167,115,'#b9d9e9',4)+'<polyline points="167,115 180,103 196,127 212,103 228,127 244,103 258,115" fill="none" stroke="#ffca7d" stroke-width="4"/>'+line(258,115,470,115,'#b9d9e9',4)+line(398,115,398,141,'#b9d9e9',4)+line(373,141,423,141,'#8ddcff',5)+line(373,154,423,154,'#8ddcff',5)+line(398,154,398,185,'#b9d9e9',4)+line(370,185,426,185,'#b9d9e9',3)+line(380,192,416,192,'#b9d9e9',3)+line(391,199,405,199,'#b9d9e9',3);s+=text(66,97,'Ue')+text(200,90,'R = '+N(x)+' kΩ')+text(422,97,'Us')+text(431,162,'C = 10 µF')+text(32,38,'Passe-bas RC idéal ; sortie non chargée')+text(32,224,'R = '+N(x)+' kΩ ; f_c = '+N(result)+' Hz')+'<g data-cutoff-hz="'+result.toFixed(6)+'"></g>';break;}
case "rotating-unbalance-force-01":{const a=-Math.PI/4,cx=292,cy=129,r=55,mx=cx+r*Math.cos(a),my=cy+r*Math.sin(a),len=Math.min(90,80*result/95),ux=Math.cos(a),uy=Math.sin(a);s+=circle(cx,cy,80,'#315a73')+circle(cx,cy,9,'#ffd17d')+line(cx,cy,mx,my,'#8ddcff',4)+circle(mx,my,12,'#ffca7d');if(x>0)s+=arrow(mx,my,mx+ux*len,my+uy*len,'#ffca7d',4);s+=text(32,38,'mₑ = 0,080 kg ; e = 0,012 m')+text(32,218,'n = '+N(x)+' tr/min ; F₀ = '+N(result)+' N ; e amplifiée')+'<g data-unbalance-force-n="'+result.toFixed(6)+'" data-phase="fixed"></g>';break;}
case 'cantilever-strain-energy-01':{const amp=34*x/6,pts=[];for(let i=0;i<=24;i++){const t=i/24;pts.push((i?'L':'M')+(125+345*t).toFixed(2)+' '+(120+amp*t*t*(3-t)/2).toFixed(2));}s+=box(94,65,30,140,'#8b9eac')+'<path d="'+pts.join(' ')+'" fill="none" stroke="#8ddcff" stroke-width="8" data-amplified="true"/>'+line(125,120,470,120,'#7ce8ae',2,'stroke-dasharray="5 5"');if(x>0)s+=arrow(470,65,470,106+amp,'#ffca7d',4);s+=text(34,38,'L = 1,20 m ; EI = 1,68 MN·m²')+text(34,220,'F = '+N(x)+' kN ; U = '+N(result)+' J ; flèche amplifiée')+'<g data-energy-j="'+result.toFixed(6)+'"></g>';break;}
case 'gas-polytropic-temperature-01':{const ratio=Math.pow(x,-1/1.3),p=155+240*ratio;s+=box(146,83,330,98,'#315a73')+'<rect x="155" y="91" width="'+(p-155).toFixed(2)+'" height="82" fill="#2477aa"/>'+box(p,90,15,84,'#d9e6ed')+line(p+15,132,530,132,'#d9e6ed',10);if(x>1)s+=arrow(530,132,480,132);s+=text(34,38,'p₁ = 1 bar abs ; T₁ = 293,15 K ; n = 1,30')+text(34,220,'p₂ = '+N(x)+' bar abs ; T₂ = '+N(result)+' °C')+'<g data-volume-ratio="'+ratio.toFixed(7)+'" data-temperature-c="'+result.toFixed(5)+'"></g>';break;}
case 'battery-discharge-c-rate-01':{s+=box(130,82,290,108,'#315a73')+box(420,115,14,42,'#d9e6ed')+'<rect x="142" y="94" width="'+(260*x/120).toFixed(2)+'" height="84" fill="#2477aa" data-current-gauge="true"/>';if(x>0)s+=arrow(445,135,515,135,'#7ce8ae',4);s+=text(34,38,'Capacité nominale Cₙ = 80 Ah')+text(34,220,'I = '+N(x)+' A ; r = '+N(result)+' h⁻¹')+'<g data-c-rate="'+result.toFixed(6)+'"></g>';break;}
case 'hydraulic-cavitation-number-01':{s+=box(85,92,440,92,'#1c587a')+line(90,99,520,99,'#8ddcff',3)+line(90,177,520,177,'#8ddcff',3);for(let j=0;j<3;j++)s+=arrow(140,115+23*j,165+60*x/8,115+23*j,'#7ce8ae',3);s+=line(310,77,310,92,'#ffd17d',4)+circle(310,68,10,'#ffd17d');s+=text(34,38,'p∞ = 120 kPa abs ; pᵥ = 2,30 kPa abs')+text(34,220,'v = '+N(x)+' m/s ; σ = '+N(result)+' (sans unité)')+'<g data-cavitation-index="'+result.toFixed(6)+'" data-vapor-not-predicted="true"></g>';break;}
case 'bolt-preload-torque-01':{s+=box(165,83,95,114,'#315a73')+box(260,83,95,114,'#537c92')+box(124,112,307,40,'#a3b6c5')+box(116,103,28,58,'#b98a50')+box(421,103,33,58,'#b98a50');if(x>0){s+=arrow(190,178,248,178,'#ffca7d',3)+arrow(330,178,272,178,'#ffca7d',3)+'<path d="M420 76 A50 50 0 0 1 467 124" fill="none" stroke="#7ce8ae" stroke-width="4" marker-end="url(#pointe)"/>';}s+=text(34,38,'Vis Ø 12 mm ; coefficient K = 0,20')+text(34,220,'F = '+N(x)+' kN ; T ≈ '+N(result)+' N·m')+'<g data-torque-nm="'+result.toFixed(6)+'" data-estimate-only="true"></g>';break;}
case "thin-wall-hoop-stress-01":{s+=circle(292,130,70,"#315a73")+circle(292,130,65,"#092236");if(x>0)for(const a of [0,Math.PI/2,Math.PI,3*Math.PI/2]){const ca=Math.cos(a),sa=Math.sin(a);s+=arrow(292+24*ca,130+24*sa,292+55*ca,130+55*sa,"#8ddcff",3)}if(x>0)s+=arrow(292,59,345,59,"#ffd17d",4);s+=text(34,38,"D = 0,500 m ; t = 6,00 mm")+text(34,220,"p = "+N(x)+" bar ; σθ = "+N(result)+" MPa");s+='<g data-pressure-bar="'+x.toFixed(3)+'" data-hoop-stress-mpa="'+result.toFixed(6)+'"></g>';break;}
case "thermal-fourier-number-01":{s+=box(230,67,138,134,"#386b85");for(let j=0;j<4;j++){s+=arrow(185,83+j*31,224,83+j*31,"#ffca7d",3)+arrow(413,83+j*31,374,83+j*31,"#ffca7d",3)}s+=line(299,65,299,200,"#7ce8ae",2,"stroke-dasharray=\"5 5\"")+text(34,38,"α = 1,20×10⁻⁵ m²/s ; L = 0,020 m")+text(34,221,"t = "+N(x)+" s ; Fo = "+N(result)+" (sans unité)");s+='<g data-time-s="'+x.toFixed(3)+'" data-fourier="'+result.toFixed(6)+'" data-temperature-not-predicted="true"></g>';break;}
case "gear-mesh-frequency-01":{s+=circle(245,130,50,"#2c6885")+circle(370,130,75,"#2c6885")+circle(245,130,6,"#ffd17d")+circle(370,130,6,"#ffd17d")+line(245,130,370,130,"#ffd17d",2,"stroke-dasharray=\"6 5\"");s+=text(35,38,"z₁ = 36 ; z₂ = 54 ; n₁ = "+N(x)+" tr/min")+text(35,220,"fₑ = "+N(result)+" Hz ; denture non dessinée");s+='<g data-gear1-radius="50" data-gear2-radius="75" data-mesh-hz="'+result.toFixed(5)+'"></g>';break;}
case "jet-impact-force-01":{s+=box(98,104,110,55,"#356b87")+box(410,70,23,126,"#8b9eac")+(x>0?line(208,131,410,131,"#8ddcff",13)+arrow(263,131,356,131,"#7ce8ae",4)+arrow(435,154,490,154,"#ffca7d",4):'')+text(34,38,"Buse d = 10 mm ; ρ = 1 000 kg/m³")+text(34,222,"Q = "+N(x)+" L/min ; F cible = "+N(result)+" N");s+='<g data-flow-lpm="'+x.toFixed(4)+'" data-force-n="'+result.toFixed(6)+'" data-impact-direction="positive-x"></g>';break;}
case "rectangular-beam-shear-01":{s+=box(202,67,110,132,"#2c617d")+line(202,133,312,133,"#ffd17d",2,"stroke-dasharray=\"5 5\"");let pts=[];for(let k=0;k<=40;k++){const y=68+130*k/40,eta=(y-133)/65,w=140*(result/5.625)*(1-eta*eta);pts.push((k?"L":"M")+(329+w).toFixed(3)+" "+y.toFixed(3))}s+='<path d="'+pts.join(" ")+'" stroke="#7ce8ae" stroke-width="4" fill="none"/>'+line(329,68,329,198,"#8ddcff",2)+text(34,38,"Section 40 × 80 mm ; V = "+N(x)+" kN")+text(34,222,"τmax = "+N(result)+" MPa au centre ; 0 aux bords");s+='<g data-shear-kn="'+x.toFixed(4)+'" data-tau-max-mpa="'+result.toFixed(6)+'" data-parabolic-profile="true"></g>';break;}

case "combined-stress-von-mises-01":{s+=box(242,79,114,112,"#285b78")+arrow(205,135,240,135,"#ffd17d")+arrow(358,135,397,135,"#ffd17d")+arrow(278,81,278,53,"#7ce8ae")+arrow(320,193,320,220,"#7ce8ae")+text(32,39,"σx = 120 MPa ; τ = "+N(x)+" MPa")+text(32,228,"σVM = "+N(result)+" MPa");s+='<g data-shear-mpa="'+x.toFixed(4)+'" data-von-mises-mpa="'+result.toFixed(5)+'"></g>';break;}
case "pt100-linear-response-01":{const h=18+120*x/150;s+=box(215,62,150,125,"#285b78")+line(237,104,255,89,"#ffd17d",4)+line(255,89,273,118,"#ffd17d",4)+line(273,118,291,89,"#ffd17d",4)+line(291,89,309,118,"#ffd17d",4)+line(309,118,327,89,"#ffd17d",4)+line(327,89,346,104,"#ffd17d",4)+box(425,50,26,155,"#102d46")+'<rect x="431" y="'+(196-h).toFixed(2)+'" width="14" height="'+h.toFixed(2)+'" fill="#ffbd7a"/>'+text(32,39,"Pt100 : R₀ = 100 Ω ; α = 0,00385 K⁻¹")+text(32,228,"T = "+N(x)+" °C ; R ≈ "+N(result)+" Ω");s+='<g data-temperature-c="'+x.toFixed(3)+'" data-resistance-ohm="'+result.toFixed(5)+'"></g>';break;}
case "torsional-eigenfrequency-01":{s+=line(160,142,435,142,"#9bc9e5",11)+circle(165,142,57,"#386f90")+circle(435,142,46,"#386f90")+line(165,142,165,85,"#ffd17d",4)+text(32,39,"J = 8,00 kg·m² ; kθ = "+N(x)+" N·m/rad")+text(32,225,"f₀ = "+N(result)+" Hz ; mode torsionnel idéal");s+='<g data-stiffness-nm-rad="'+x.toFixed(3)+'" data-eigenfrequency-hz="'+result.toFixed(6)+'"></g>';break;}
case "laminar-darcy-factor-01":{s+=box(110,86,370,110,"#285b78")+line(115,106,475,106,"#9bc9e5",2)+line(115,177,475,177,"#9bc9e5",2);for(let i=-2;i<=2;i++){const yy=142+i*12,v=85*(1-(i/3)**2);s+=arrow(160,yy,160+v,yy,"#7ce8ae",2)}s+=text(32,39,"Écoulement laminaire : Re = "+N(x))+text(32,225,"fD = "+N(result)+" (sans unité) ; fF = fD/4");s+='<g data-reynolds="'+x.toFixed(3)+'" data-darcy-factor="'+result.toFixed(6)+'"></g>';break;}
case "triangle-actuator-angle-01":{const th=result*Math.PI/180,O=[240,174],B=[325.5,174],C=[240+123.5*Math.cos(th),174-123.5*Math.sin(th)];s+=line(O[0],O[1],B[0],B[1],"#ffd17d",6)+line(O[0],O[1],C[0].toFixed(3),C[1].toFixed(3),"#7ce8ae",6)+line(B[0],B[1],C[0].toFixed(3),C[1].toFixed(3),"#8ddcff",9)+circle(O[0],O[1],7,"#ffd17d")+circle(B[0],B[1],7,"#ffd17d")+circle(C[0].toFixed(3),C[1].toFixed(3),7,"#ffd17d")+text(32,38,"OB = 0,45 m ; OC = 0,65 m")+text(32,225,"BC = "+N(x)+" m ; θ = "+N(result)+" °");s+='<g data-actuator-length-m="'+x.toFixed(5)+'" data-angle-deg="'+result.toFixed(5)+'" data-cx="'+C[0].toFixed(3)+'" data-cy="'+C[1].toFixed(3)+'"></g>';break;}

case "hydraulic-oil-compressibility-01":{const ratio=result/2000,fluid=305*(1-ratio);s+=box(125,85,335,100,'#2a536c')+'<rect x="137" y="98" width="'+fluid.toFixed(2)+'" height="74" fill="#3286a4"/>'+line(137+fluid,98,137+fluid,172,'#ffd17d',5);s+=arrow(90,136,124,136,'#7ce8ae',4)+text(32,39,'V₀ = 2,00 L ; K = 1,50 GPa')+text(32,221,'Δp = '+N(x)+' bar ; réduction ΔV = '+N(result)+' mL');s+='<g data-compression-ml="'+result.toFixed(6)+'" data-fluid-length-px="'+fluid.toFixed(3)+'"></g>';break;}
case "hollow-shaft-polar-inertia-01":{const ri=67*x/60;s+=circle(295,131,67,'#427b98')+circle(295,131,ri,'#092236')+line(295,131,362,131,'#ffd17d',3)+line(295,131,295+ri,131,'#7ce8ae',3);s+=text(32,38,'Section : D = 60 mm ; d = '+N(x)+' mm')+text(32,219,'Jₚ = '+N(result)+' cm⁴ ; anneau non massique');s+='<g data-inner-radius-px="'+ri.toFixed(5)+'" data-outer-radius-px="67" data-polar-cm4="'+result.toFixed(6)+'"></g>';break;}
case "wheel-braking-slip-01":{const a=x*.13,px=290+65*Math.cos(a),py=145-65*Math.sin(a);s+=line(80,210,525,210,'#8cc8df',4)+circle(290,145,65,'#356a88')+circle(290,145,11,'#ffd17d')+line(290,145,px,py,'#ffd17d',5);s+=arrow(380,192,510,192,'#7ce8ae',4)+text(32,38,'v = 5,00 m/s ; R = 0,400 m')+text(32,228,'ω = '+N(x)+' rad/s ; s = '+N(result)+' %');s+='<g data-slip-percent="'+result.toFixed(6)+'" data-wheel-angle-rad="'+a.toFixed(6)+'"></g>';break;}
case "lumped-cooling-time-constant-01":{const w=200*Math.min(1,200/result);s+=box(150,92,260,85,'#50788e')+line(150,180,410,180,'#ffd17d',4);for(let i=0;i<4;i++)s+=arrow(190+i*58,85,190+i*58,49,'#7ce8ae',3);s+=box(450,95,36,90,'#173f59')+'<rect x="453" y="'+(180-w*.4).toFixed(2)+'" width="30" height="'+(w*.4).toFixed(2)+'" fill="#ffca7d"/>';s+=text(32,38,'m = 12 kg ; cₚ = 460 J/(kg·K)')+text(32,224,'h = '+N(x)+' W/(m²·K) ; τ = '+N(result)+' s');s+='<g data-biot="'+(x*.0019230769/45).toFixed(7)+'" data-time-constant-s="'+result.toFixed(5)+'"></g>';break;}
case "adc-voltage-step-01":{const n=10,step=315/n;s+=line(120,195,495,195,'#8ddcff',3)+line(120,60,120,195,'#8ddcff',3);for(let i=0;i<n;i++){const h=11*i;s+=line(125+i*step,180-h,125+(i+1)*step,180-h,'#7ce8ae',3)+line(125+(i+1)*step,180-h,125+(i+1)*step,180-h-11,'#7ce8ae',2)}s+=text(32,38,'CAN idéal 12 bits : 4 096 codes')+text(32,222,'Uref = '+N(x)+' V ; q = '+N(result)+' mV');s+='<g data-reference-v="'+x.toFixed(3)+'" data-step-mv="'+result.toFixed(7)+'" data-codes="4096"></g>';break;}

case 'accumulator-polytropic-delivery-01':{const v=10*(100/x)**(1/1.4),b=165+270*v/10;s+=box(155,73,300,117,'#28536b')+'<rect x="165" y="84" width="'+(b-165).toFixed(2)+'" height="95" fill="#315a73"/><rect x="'+b.toFixed(2)+'" y="84" width="'+(445-b).toFixed(2)+'" height="95" fill="#2477aa"/>'+line(b,84,b,179,'#ffd17d',5);s+=text(35,38,'p₀ = 100 bar abs ; p_haut = 180 bar abs')+text(175,116,'Gaz')+text(388,155,'Huile')+text(35,220,'p_bas = '+N(x)+' bar abs ; V_g = '+N(v)+' L');s+='<g data-gas-volume-l="'+v.toFixed(5)+'" data-boundary-x="'+b.toFixed(3)+'"></g>';break;}
case 'three-phase-capacitor-sizing-01':{const branch=(ax,ay,bx,by)=>{const dx=bx-ax,dy=by-ay,l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l,a=[ax+dx*.45,ay+dy*.45],b=[ax+dx*.55,ay+dy*.55];return line(ax,ay,...a,'#8ddcff')+line(...b,bx,by,'#8ddcff')+line(a[0]+12*nx,a[1]+12*ny,a[0]-12*nx,a[1]-12*ny,'#ffd17d',4)+line(b[0]+12*nx,b[1]+12*ny,b[0]-12*nx,b[1]-12*ny,'#ffd17d',4)};s+=branch(300,72,170,188)+branch(170,188,430,188)+branch(430,188,300,72)+circle(300,72,5,'#7ce8ae')+circle(170,188,5,'#7ce8ae')+circle(430,188,5,'#7ce8ae');s+=text(305,62,'L1')+text(126,209,'L2')+text(437,209,'L3')+text(30,38,'Triangle : U = 400 V ; f = 50 Hz')+text(30,226,'cos φ₂ = '+N(x)+' ; C_Δ = '+N(result)+' µF / branche');s+='<g data-capacitors="3" data-wiring="delta" data-capacitance-uf="'+result.toFixed(5)+'"></g>';break;}
case 'pump-affinity-power-01':{s+=circle(215,130,70,'#315a73')+circle(215,130,18,'#ffd17d');for(let i=0;i<6;i++){const a=i*Math.PI/3;s+=line(215+24*Math.cos(a),130+24*Math.sin(a),215+62*Math.cos(a+.32),130+62*Math.sin(a+.32),'#8ddcff',5)}s+=box(355,92,180,45,'#173f59')+'<rect x="360" y="97" width="'+(170*Math.min(1,result/20)).toFixed(2)+'" height="35" fill="#7ce8ae"/>';s+=text(35,38,'n₁ = 1 200 tr/min ; P₁ = 8 kW')+text(354,80,'P₂ / 20 kW')+text(35,224,'n₂ = '+N(x)+' tr/min ; P₂ = '+N(result)+' kW');s+='<g data-speed-rpm="'+x.toFixed(2)+'" data-power-kw="'+result.toFixed(6)+'" data-static-diagram="true"></g>';break;}
case 'spring-stored-energy-01':{const b=432-150*x/80,pts=['M 110 137','L 128 137'];for(let i=1;i<=12;i++)pts.push('L '+(128+(b-140)*i/13).toFixed(2)+' '+(i%2?119:155));pts.push('L '+(b-12).toFixed(2)+' 137','L '+b.toFixed(2)+' 137');s+=box(82,75,28,127,'#8b9eac')+'<path d="'+pts.join(' ')+'" fill="none" stroke="#8ddcff" stroke-width="4"/>'+box(b,102,40,70,'#bc925e')+arrow(432,197,b,197,'#ffca7d',4)+text(35,38,'k = 18 000 N/m ; x = '+N(x)+' mm')+text(35,225,'F = '+N(18*x)+' N ; E_e = '+N(result)+' J');s+='<g data-spring-length-px="'+(b-128).toFixed(3)+'" data-compression-mm="'+x.toFixed(3)+'"></g>';break;}
case 'goodman-fatigue-factor-01':{const xp=100+420*x/600,yp=205-150*80/180;s+=line(100,205,540,205)+line(100,205,100,40)+line(100,55,520,205,'#ffca7d',4)+line(100,yp,520,yp,'#8ddcff',2,'stroke-dasharray="6 6"')+circle(xp,yp,7,'#7ce8ae');s+=text(30,38,'σ_a = 80 MPa ; S_e = 180 MPa')+text(340,62,'Goodman : n = 1')+text(350,225,'σ_m (MPa)')+text(15,82,'σ_a')+text(35,242,'n = '+N(result)+' (sans unité)');s+='<g data-mean-stress-mpa="'+x.toFixed(3)+'" data-factor="'+result.toFixed(6)+'"></g>';break;}
case 'cylinder-stroke-time-01':{const px=185+190*x/600;s+=box(115,89,330,84,'#28536b')+box(px,95,15,72,'#d4e6ee')+line(px+15,130,px+150,130,'#d4e6ee',14)+arrow(140,190,140+190*x/600,190,'#7ce8ae',4)+text(35,38,'D = 80 mm ; Q = 24 L/min')+text(35,222,'Course = '+N(x)+' mm ; t = '+N(result)+' s');s+='<g data-piston-x="'+px.toFixed(3)+'" data-stroke-mm="'+x.toFixed(3)+'"></g>';break;}
case 'gas-isothermal-work-01':{const len=210/x;s+=box(130,80,335,100,'#28536b')+box(145+len,86,16,88,'#d4e6ee')+line(161+len,130,510,130,'#d4e6ee',12)+arrow(515,130,450,130,'#ffca7d',4)+text(35,38,'p₁ = 1 bar abs ; V₁ = 20 L')+text(35,222,'V₂ = '+N(20/x)+' L ; W = '+N(result)+' kJ');s+='<g data-volume-ratio="'+x.toFixed(3)+'" data-piston-x="'+(145+len).toFixed(3)+'"></g>';break;}
case 'symmetric-sling-tension-01':{const a=x*Math.PI/180,dx=120*Math.cos(a),dy=120*Math.sin(a),lx=300-dx,rx=300+dx,ty=170-dy;s+=line(lx,ty,300,170,'#8ddcff',5)+line(rx,ty,300,170,'#8ddcff',5)+circle(lx,ty,7,'#ffd17d')+circle(rx,ty,7,'#ffd17d')+circle(300,170,8,'#ffd17d')+arrow(300,170,lx,ty,'#7ce8ae',3)+arrow(300,170,rx,ty,'#7ce8ae',3)+arrow(300,170,300,217,'#ffca7d',4)+text(35,38,'P = 8 kN ; θ = '+N(x)+'°')+text(35,224,'T = '+N(result)+' kN dans chaque brin');s+='<g data-sling-angle-deg="'+x.toFixed(3)+'" data-anchor-y="'+ty.toFixed(3)+'"></g>';break;}
case 'voltage-divider-sensor-01':{s+=line(135,55,300,55)+line(300,55,300,75)+box(275,75,50,35,'#b98a50')+line(300,110,300,145)+box(275,145,50,35,'#b98a50')+line(300,180,300,200)+line(300,200,135,200)+line(135,55,135,100)+line(115,100,155,100,'#ffd17d',4)+line(123,120,147,120,'#ffd17d',4)+line(135,120,135,200)+line(300,128,480,128,'#7ce8ae',4)+text(342,118,'U₂')+text(355,91,'R₁ = 2,2 kΩ')+text(355,164,'R₂ = '+N(x)+' kΩ')+text(35,38,'Uₛ = 5 V ; sortie / masse')+text(35,222,'U₂ = '+N(result)+' V ; charge négligée');s+='<g data-divider-r2-kohm="'+x.toFixed(4)+'" data-output-v="'+result.toFixed(7)+'"></g>';break;}
case 'restrained-thermal-stress-01':{s+=box(105,70,30,145,'#8b9eac')+box(465,70,30,145,'#8b9eac')+box(135,115,330,52,'#457c94')+arrow(180,142,245,142,'#ffca7d',4)+arrow(420,142,355,142,'#ffca7d',4)+text(35,38,'Acier bloqué ; ΔT = '+N(x)+' K')+text(35,224,'σ = '+N(result)+' MPa (compression si < 0)');s+='<g data-compressive-stress-mpa="'+result.toFixed(5)+'"></g>';break;}

case 'stepped-bar-extension-01':{
 const e1=x*1000/210e9*.8/(400e-6)*1000,e2=result-e1;
 s+=box(75,70,25,120,'#607f90')+box(100,100,205,52,'#477a93')+box(305,107,170,38,'#bc925e');
 s+=arrow(475,126,552,126,'#ffd17d',5)+text(130,91,'A₁ = 400 mm²')+text(322,91,'A₂ = 250 mm²');
 s+=text(35,39,'F = '+N(x)+' kN ; E = 210 GPa')+text(35,217,'δ₁ = '+N(e1)+' mm ; δ₂ = '+N(e2)+' mm');
 s+='<g data-extension-mm="'+result.toFixed(6)+'"></g>';break;}
case 'motor-slip-01':{
 const ns=30*x,as=2*Math.PI*(ns/60)*.05,ar=2*Math.PI*(1440/60)*.05;
 s+=circle(300,125,77,'#315a73')+circle(300,125,53,'#1a405c')+circle(300,125,8,'#ffd17d');
 s+=line(300,125,300+64*Math.cos(as),125-64*Math.sin(as),'#7ce8ae',5);
 s+=line(300,125,300+43*Math.cos(ar),125-43*Math.sin(ar),'#ffd17d',5);
 s+=text(30,38,'4 pôles ; n rotor = 1 440 tr/min')+text(30,215,'nₛ = '+N(ns)+' tr/min ; s = '+N(result)+' %');
 s+='<g data-stator-phase-rad="'+as.toFixed(6)+'" data-rotor-phase-rad="'+ar.toFixed(6)+'" data-slip-percent="'+result.toFixed(6)+'"></g>';break;}
case 'log-decrement-01':{
 const delta=result,pts=[],top=[],bottom=[];
 for(let i=0;i<=120;i++){const t=i/40,amp=20*Math.exp(-delta*t)*3,px=90+t*140;pts.push((i?'L':'M')+px.toFixed(2)+' '+(130-amp*Math.cos(2*Math.PI*t)).toFixed(2));top.push((i?'L':'M')+px.toFixed(2)+' '+(130-amp).toFixed(2));bottom.push((i?'L':'M')+px.toFixed(2)+' '+(130+amp).toFixed(2));}
 s+=line(90,130,510,130,'#9bc9e5',2)+ '<path d="'+pts.join(' ')+'" fill="none" stroke="#8ddcff" stroke-width="3"/><path d="'+top.join(' ')+'" fill="none" stroke="#ffd17d" stroke-width="2" stroke-dasharray="5 5"/><path d="'+bottom.join(' ')+'" fill="none" stroke="#ffd17d" stroke-width="2" stroke-dasharray="5 5"/>';
 s+=text(35,37,'A₀ = 20 mm ; A₃ = '+N(x)+' mm')+text(35,218,'3 périodes ; δ = '+N(result)+' (sans unité)');
 s+='<g data-log-decrement="'+result.toFixed(7)+'"></g>';break;}
case 'exchanger-effectiveness-01':{
 const hot=80-x/2,cold=20+x/3;
 s+=box(145,76,305,117,'#305c76')+line(65,103,530,103,'#ef997a',13)+line(65,166,530,166,'#8ddcff',13);
 s+=arrow(255,103,345,103,'#ffca7d',4)+arrow(375,166,285,166,'#7ce8ae',4);
 s+=text(35,36,'Chaud : 80 °C → '+N(hot)+' °C')+text(35,220,'Froid : 20 °C → '+N(cold)+' °C ; ε = '+N(result));
 s+='<g data-hot-out-c="'+hot.toFixed(6)+'" data-cold-out-c="'+cold.toFixed(6)+'" data-effectiveness="'+result.toFixed(6)+'"></g>';break;}
case 'darcy-pipe-loss-01':{
 const v=(x/60000)/(Math.PI*.025**2/4),scale=Math.min(65,result*160);
 s+=box(80,101,430,63,'#2b617c')+line(90,133,500,133,'#8ddcff',3,'stroke-dasharray="8 5"');
 for(let i=0;i<3;i++)s+=arrow(170+i*100,132,212+i*100,132,'#7ce8ae',4);
 s+=line(145,101,145,61,'#ffd17d',3)+line(445,101,445,61+scale,'#ffd17d',3);
 s+=text(35,36,'L = 20 m ; D = 25 mm ; fᴅ = 0,030')+text(35,219,'v = '+N(v)+' m/s ; Δp = '+N(result)+' bar');
 s+='<g data-velocity-ms="'+v.toFixed(7)+'" data-pressure-loss-bar="'+result.toFixed(7)+'"></g>';break;}


case 'flywheel-angular-momentum-01':{
 const a=2*Math.PI*x/60*.1,px=290+60*Math.cos(a),py=127-60*Math.sin(a);
 s+=circle(290,127,72,'#315f77')+circle(290,127,14,'#ffd17d')+line(290,127,px,py,'#ffd17d',6);
 s+='<path d="M380 75 A106 106 0 0 1 390 160" fill="none" stroke="#7ce8ae" stroke-width="5" marker-end="url(#pointe)"/>';
 s+=text(32,40,'J = 8,00 kg·m² ; axe fixe')+text(32,218,'Position à t = 0,10 s ; angle = ωt (modulo 2π)');
 s+='<g data-angular-momentum="'+result.toFixed(6)+'" data-angle-rad="'+a.toFixed(6)+'"></g>';break;}
case 'rc-charge-threshold-01':{
 const level=x/24;
 s+=line(115,88,210,88)+box(210,72,120,32,'#a57551')+line(330,88,490,88)+line(490,88,490,110);
 s+=line(455,110,525,110,'#ffd17d',5)+line(455,135,525,135,'#ffd17d',5)+line(490,135,490,177)+line(490,177,115,177);
 s+=line(115,88,115,115)+line(115,145,115,177)+line(96,115,134,115,'#fff',5)+line(103,145,127,145,'#fff',5);
 s+=box(355,100,45,60,'#315f77')+box(357,160-50*level,41,50*level,'#59b9e1');
 s+=text(32,40,'U₀ = 24 V ; R = 10 kΩ ; C = 470 µF')+text(32,218,'Seuil U = '+N(x)+' V ; charge idéale exponentielle');
 s+='<g data-charge-fraction="'+level.toFixed(6)+'"></g>';break;}
case 'thermal-clearance-01':{
 const g=result,delta=1-g;
 s+=box(95,68,25,118,'#667f92')+box(120,87,290,27,'#426d87')+box(120,145,290+Math.min(65,delta*90),27,'#b88b55');
 s+=line(410,65,410,187,'#7ce8ae',2,'stroke-dasharray="5 4"');
 s+=line(410+Math.min(65,delta*90),128,410+Math.min(65,delta*90),192,'#ffd17d',2,'stroke-dasharray="5 4"');
 s+=text(32,40,'Acier α = 12 ; aluminium α = 23 (µ/K)')+text(32,218,'Allongements différentiels amplifiés ; jeu g = '+N(g)+' mm');
 s+='<g data-clearance-mm="'+g.toFixed(6)+'"></g>';break;}
case 'venturi-pressure-01':{
 const q=x/60000,v1=q/(Math.PI*.04**2/4),v2=q/(Math.PI*.02**2/4);
 s+='<path d="M80 80 L225 80 L300 110 L380 110 L450 80 L530 80 L530 180 L450 180 L380 150 L300 150 L225 180 L80 180 Z" fill="#245a7a" stroke="#9bc9e5" stroke-width="3"/>';
 s+=line(150,80,150,55,'#ffd17d',3)+line(340,110,340,55,'#ffd17d',3)+circle(150,55,5,'#ffd17d')+circle(340,55,5,'#ffd17d');
 if(x>0)s+=arrow(150,130,210,130,'#7ce8ae',4)+arrow(305,130,370,130,'#7ce8ae',4);
 s+=text(32,40,'D₁ = 40 mm ; D₂ = 20 mm ; ρ = 1 000 kg/m³');
 s+=text(32,218,'v₁ = '+N(v1)+' m/s ; v₂ = '+N(v2)+' m/s');
 s+='<g data-dp-pa="'+(result*1e5).toFixed(6)+'"></g>';break;}
case 'spring-series-01':{
 const e1=100/20000,e2=100/x,scale=1000,mid=270,tip=410+e2*scale;
 const coil=(a,b,y)=>{let pts=a+','+y;for(let j=1;j<=12;j++)pts+=' '+(a+(b-a)*j/13).toFixed(2)+','+(y+(j%2?-18:18));return '<polyline points="'+pts+' '+b+','+y+'" fill="none" stroke="#8ddcff" stroke-width="4"/>';};
 s+=box(85,85,25,100,'#607f90')+line(110,130,140,130)+coil(140,mid,130)+line(mid,130,300,130)+coil(300,tip,130)+line(tip,130,Math.min(535,tip+35),130);
 s+=arrow(Math.min(535,tip+20),130,Math.min(560,tip+65),130,'#ffd17d',4);
 s+=text(32,40,'k₁ = 20 000 N/m ; F = 100 N')+text(32,218,'x₁ = '+N(e1*1000)+' mm ; x₂ = '+N(e2*1000)+' mm');
 s+='<g data-extension-total-mm="'+((e1+e2)*1000).toFixed(6)+'"></g>';break;}
case 'hydraulic-pump-shaft-01':{s+=box(85,85,125,80,'#315d79')+circle(275,125,48,'#244c66')+circle(275,125,8,'#ffd17d')+line(210,125,227,125,'#ffd17d',9)+line(323,125,490,125,'#8ddcff',8);if(x>0)s+=arrow(360,125,470,125,'#7ce8ae',4);s+=text(35,42,'Q = 24 L/min ; η = 0,80')+text(35,220,'Δp = '+N(x)+' bar ; Pₐ = '+N(result)+' kW');break;}
case 'braking-stop-time-01':{const px=125+Math.min(310,x/90*310);s+=line(60,184,545,184,'#9bc9e5',4)+box(px-70,116,110,48,'#3e6f87')+circle(px-44,176,12,'#d4e6ee')+circle(px+16,176,12,'#d4e6ee');if(x>0)s+=arrow(px-8,103,px+55,103,'#8ddcff',4)+arrow(px-30,153,px-88,153,'#ffca7d',4);s+=text(35,40,'m = 1 200 kg ; F = 3 000 N')+text(35,220,'v₀ = '+N(x)+' km/h ; t = '+N(result)+' s');break;}
case 'beam-curvature-01':{const dy=Math.min(35,result*15000);s+=line(100,128,500,128,'#7ce8ae',2,'stroke-dasharray="6 5"');s+='<path d="M100 128 Q300 '+(128+2*dy).toFixed(3)+' 500 128" fill="none" stroke="#8ddcff" stroke-width="6"/>';s+=arrow(305,75,305,113,'#ffca7d',4)+text(35,40,'E = 210 GPa ; I = 8×10⁻⁶ m⁴')+text(35,220,'κ = '+N(result)+' m⁻¹ ; déformée amplifiée');break;}
case 'battery-autonomy-01':{s+=box(110,88,175,90,'#315f77')+box(285,112,12,42,'#ffd17d')+line(297,132,365,132,'#8ddcff',5)+box(365,98,125,70,'#9a7253');if(x>0)s+=arrow(307,132,355,132,'#7ce8ae',4);s+=text(35,40,'U = 24 V ; P = 120 W')+text(35,220,'C = '+N(x)+' Ah ; t = '+N(result)+' h');break;}
case 'strain-gauge-bridge-01':{s+=line(300,60,180,126,'#8ddcff',3)+line(180,126,300,190,'#8ddcff',3)+line(300,190,420,126,'#8ddcff',3)+line(420,126,300,60,'#8ddcff',3);s+=box(221,80,58,25,'#9b7151')+box(221,149,58,25,'#9b7151')+box(335,80,58,25,'#315f77')+box(335,149,58,25,'#9b7151');s+=circle(300,60,5,'#ffd17d')+circle(300,190,5,'#ffd17d')+circle(180,126,5,'#ffd17d')+circle(420,126,5,'#ffd17d');s+=text(35,40,'Quart de pont : Uexc = 5 V')+text(35,220,'ε = '+N(x)+' µm/m ; ΔU ≈ '+N(result)+' mV');break;}


case 'double-shear-pin-01':{
 s+=box(125,70,345,35,'#386e89')+box(125,112,345,35,'#517e94')+box(125,154,345,35,'#386e89');
 s+=line(300,75,300,186,'#ffd17d',13)+circle(300,130,9,'#ffd17d');
 if(x>0){s+=arrow(325,129,425,129,'#ffca7d',4)+arrow(290,89,200,89,'#7ce8ae',3)+arrow(290,171,200,171,'#7ce8ae',3);}
 s+=text(30,38,'Axe Ø12 mm ; deux plans de cisaillement')+text(30,218,'F = '+N(x)+' kN ; F/2 sur chaque plan');
 s+='<g data-shear-planes="2" data-shear-MPa="'+result.toFixed(5)+'"></g>';break;}
case 'hydraulic-reynolds-01':{
 const regime=x===0?'sans écoulement':result<2300?'laminaire':result<=4000?'transition':'turbulent';
 s+=box(90,89,420,90,'#164866')+line(90,105,510,105,'#8ddcff',3)+line(90,165,510,165,'#8ddcff',3);
 if(x>0)s+=arrow(145,135,195+Math.min(270,x/80*270),135,'#7ce8ae',4);
 s+=text(30,38,'ρ = 850 kg/m³ ; μ = 0,040 Pa·s')+text(30,219,'D = 8 mm ; régime indicatif : '+regime);
 s+='<g data-reynolds="'+result.toFixed(3)+'" data-regime="'+regime+'"></g>';break;}
case 'composite-wall-01':{
 const tint=20+x-result;
 s+=box(210,72,80,128,'#3f7191')+box(290,72,100,128,'#9b7151');
 if(x>0)s+=arrow(95,136,195,136,'#ffca7d',4)+arrow(405,136,510,136,'#ffca7d',4);
 s+=text(30,38,'Conduction 1D ; A = 2,00 m²')+text(230,105,'λ₁')+text(330,105,'λ₂');
 s+=text(30,219,'Tchaude = '+N(20+x)+' °C ; Tinterface = '+N(tint)+' °C ; Tfroide = 20 °C');
 s+='<g data-r1-KW="1.0000" data-r2-KW="0.0625" data-interface-C="'+tint.toFixed(4)+'"></g>';break;}
case 'combined-uncertainty-01':{
 const dx=160*x/.2,dy=64;
 s+=line(160,179,160+dx,179,'#8ddcff',4)+line(160+dx,179,160+dx,179-dy,'#7ce8ae',4)+line(160,179,160+dx,179-dy,'#ffca7d',5)+circle(160+dx,179-dy,6,'#ffd17d');
 s+=text(30,38,'Composition quadratique ; k = 2')+text(35,215,'u₁ = '+N(x)+' mm ; u₂ = 0,080 mm ; U = 2 u_c');
 s+='<g data-variance-mm2="'+(x*x+.08*.08).toFixed(7)+'" data-expanded-mm="'+result.toFixed(5)+'"></g>';break;}
case 'stability-overturn-angle-01':{
 const cy=190-70*x,projection=300+70*x*Math.tan(25*Math.PI/180);
 s+=line(220,190,380,190,'#9bc9e5',6)+line(244,183,244,198,'#7ce8ae',5)+line(356,183,356,198,'#7ce8ae',5)+line(300,190,300,cy,'#8ddcff',3,'stroke-dasharray="6 4"')+circle(300,cy,8,'#ffd17d');
 s+=arrow(300,cy,projection,190,'#ffca7d',4)+circle(projection,190,5,'#ffca7d');
 s+=text(30,38,'Demi-voie = 0,80 m ; dévers = 25°')+text(30,219,'Déport = '+N(x*Math.tan(25*Math.PI/180))+' m ; limite = '+N(result)+'°');
 s+='<g data-projection-x="'+projection.toFixed(3)+'" data-edge-x="356" data-stable-25deg="'+(projection<=356)+'"></g>';break;}

case 'hydro-motor-speed-01':{
 s+=line(90,112,206,112,'#8ddcff',8) +circle(270,135,59,'#315c76')+circle(270,135,12,'#ffd17d')+line(270,135,490,135,'#d5e8f4',10)+line(270,194,270,213,'#8ddcff',8)+line(270,213,490,213,'#8ddcff',8);
 if(x>0){s+=arrow(110,112,186,112,'#7ce8ae',4);s+=arrow(345,135,345+Math.min(125,result/5),135,'#ffca7d',4);}
 s+=text(30,40,'Moteur : Vg = 80 cm³/tr ; ηᵥ = 0,88');
 s+='<g data-motor-rpm="'+result.toFixed(3)+'" data-flow-Lmin="'+x.toFixed(2)+'"></g>';break;}
case 'beam-center-deflection-01':{
 const L=1.2,EI=210e9*8e-6;
 const def=z=>{const a=Math.min(z,L-z);return x*a*(3*L*L-4*a*a)/(48*EI)*1000};
 const path=Array.from({length:41},(_,i)=>{const z=L*i/40;return(i?'L':'M')+(150+300*z/L).toFixed(2)+' '+(112+300*def(z)).toFixed(2)}).join(' ');
 s+=line(150,112,450,112,'#9bc9e5',2)+'<path d="'+path+'" fill="none" stroke="#ffd17d" stroke-width="5" data-deflection-mm="'+result.toFixed(6)+'"/>';
 s+='<path d="M135 135 L165 135 L150 112 Z M435 135 L465 135 L450 112 Z" fill="#315c76" stroke="#d5e8f4" stroke-width="2"/>';
 if(x>0)s+=arrow(300,45,300,112+300*result,'#ffca7d',4);
 s+=text(30,38,'Traverse bi-appuyée : L = 1,20 m ; E I = 1,68 MN·m²');
 s+=text(30,210,'Déformée amplifiée ×1 200 à l’écran');break;}
case 'reactive-three-phase-01':{
 const S=Math.sqrt(3)*400*10/1000,dx=220*x,dy=220*Math.sqrt(1-x*x),bx=170+dx,by=185-dy;
 s+=line(170,185,bx,185,'#8ddcff',5)+line(bx,185,bx,by,'#7ce8ae',5)+line(170,185,bx,by,'#ffd17d',5)+circle(bx,by,5,'#ffd17d');
 s+=text(30,38,'Triangle : S = '+N(S)+' kVA');
 s+=text(30,218,'P horizontal (kW) ; Q vertical (kVAr)');
 s+='<g data-reactive-kvar="'+result.toFixed(5)+'" data-cosphi="'+x.toFixed(3)+'"></g>';break;}
case 'rl-step-current-01':{
 s+=line(110,75,205,75,'#8ddcff',4)+box(205,58,100,34,'#315c76')+line(305,75,410,75,'#8ddcff',4)+line(410,75,410,98,'#8ddcff',4);
 s+='<path d="M410 98 C386 98 386 110 410 110 C434 110 434 122 410 122 C386 122 386 134 410 134 C434 134 434 146 410 146 C386 146 386 158 410 158" fill="none" stroke="#ffd17d" stroke-width="4"/>';
 s+=line(410,158,410,188,'#8ddcff',4)+line(410,188,110,188,'#8ddcff',4)+line(110,75,110,115,'#8ddcff',4)+line(82,119,138,119,'#d5e8f4',4)+line(94,140,126,140,'#d5e8f4',4)+line(110,144,110,188,'#8ddcff',4);
 if(x>0)s+=arrow(140,75,140+Math.round(45*result/2),75,'#7ce8ae',4);
 s+=text(30,37,'Échelon 12 V ; R = 6 Ω ; L = 60 mH')+text(30,222,'τ = 10 ms ; courant orienté sens horaire');
 s+='<g data-rl-current-A="'+result.toFixed(6)+'" data-time-ms="'+x.toFixed(3)+'"></g>';break;}
case 'npsh-available-01':{
 const py=145-12*x;
 s+=box(90,145,170,70,'#237c9b')+line(85,145,265,145,'#7ce8ae',3)+line(235,190,285,190,'#8ddcff',8)+line(285,190,285,py,'#8ddcff',8)+line(285,py,387,py,'#8ddcff',8)+circle(420,py,33,'#315c76')+circle(420,py,8,'#ffd17d')+line(453,py,525,py,'#d5e8f4',9);
 if(x>0)s+=arrow(337,145,337,py,'#ffca7d',4);
 s+=text(30,36,'Cuve ouverte ; eau 20 °C ; h𝒻 = 0,80 m')+text(30,229,'H = '+N(x)+' m ; pompe au-dessus du plan libre');
 s+='<g data-lift-m="'+x.toFixed(3)+'" data-pump-y="'+py.toFixed(2)+'"></g>';break;}
 case 'hydraulic-relief-setpoint-01':{
 const adjuster=475-3*x,coilStart=329,coilEnd=adjuster-8;
 s+=line(85,170,281,170,'#8ddcff',8)+line(281,145,281,194,'#d5e8f4',5);
 s+=circle(295,170,16,'#315c76')+line(311,170,coilStart,170,'#8ddcff',4);
 const points=[[coilStart,170]];for(let k=0;k<10;k++)points.push([coilStart+(coilEnd-coilStart)*(k+.5)/10, k%2?183:157],[coilStart+(coilEnd-coilStart)*(k+1)/10,170]);
 s+='<path d="'+points.map((p,i)=>(i?'L':'M')+p[0].toFixed(2)+' '+p[1]).join(' ')+'" fill="none" stroke="#7ce8ae" stroke-width="3" data-spring-end="'+coilEnd.toFixed(2)+'"/>';
 s+=line(adjuster,130,adjuster,210,'#ffd17d',7)+arrow(125,170,245,170,'#ffca7d',4);
 s+=text(32,40,'A = 100 mm² ; k = 80 N/mm ; x = '+N(x)+' mm');
 s+=text(32,226,'Tarage théorique p = '+N(result)+' bar ; clapet fermé avant ouverture');break;
}
case 'beam-support-reaction-01':{
 const load=130+160*x,RA=8*(2-x)/2,RB=8-RA;
 s+=line(130,124,450,124,'#9bc9e5',9)+line(130,135,130,177,'#9bc9e5',2)+line(450,135,450,177,'#9bc9e5',2);
 s+='<path d="M115 179 L145 179 L130 152 Z M435 179 L465 179 L450 152 Z" fill="#315c76" stroke="#d5e8f4" stroke-width="2"/>';
 s+=arrow(load,55,load,113,'#ffca7d',5);
 if(RA>0)s+=arrow(130,190,130,190-RA*11,'#7ce8ae',4);
 if(RB>0)s+=arrow(450,190,450,190-RB*11,'#7ce8ae',4);
 s+=text(32,36,'F = 8,00 kN ; L = 2,00 m ; a = '+N(x)+' m');
 s+=text(32,223,'R_A = '+N(RA)+' kN ; R_B = '+N(RB)+' kN');
 s+='<g data-load-x="'+load.toFixed(2)+'" data-reaction-sum-kN="'+(RA+RB).toFixed(3)+'"></g>';break;
}
case 'lc-resonance-01':{
 s+=line(155,65,445,65,'#9bc9e5',4)+line(155,190,445,190,'#9bc9e5',4);
 s+=line(210,65,210,88,'#8ddcff',4)+line(210,164,210,190,'#8ddcff',4);
 s+='<path d="M210 88 C180 92 180 104 210 108 C240 112 240 124 210 128 C180 132 180 144 210 148 C240 152 240 160 210 164" fill="none" stroke="#8ddcff" stroke-width="4"/>';
 s+=line(390,65,390,111,'#ffd17d',4)+line(366,111,414,111,'#ffd17d',5)+line(366,137,414,137,'#ffd17d',5)+line(390,137,390,190,'#ffd17d',4);
 s+=text(32,35,'L = 50 mH ; C = '+N(x)+' µF');
 s+=text(220,118,'L')+text(418,130,'C');
 s+=text(32,223,'Circuit LC idéal ; f₀ = '+N(result)+' Hz');
 s+='<g data-capacitance-uF="'+N(x)+'" data-inductance-H="0.05"></g>';break;
}
case 'screw-efficiency-01':{
 const lam=8*Math.PI/180,fl=55+150*x/.3;
 s+=line(125,174,492,174,'#9bc9e5',2)+line(125,174,492,174-367*Math.tan(lam),'#8ddcff',6);
 s+='<path d="M125 174 L492 174 L492 '+(174-367*Math.tan(lam)).toFixed(2)+' Z" fill="#315c76" opacity=".4"/>';
 s+='<path d="M338 144 L398 '+(144-60*Math.tan(lam)).toFixed(2)+' L398 '+(112-60*Math.tan(lam)).toFixed(2)+' L338 112 Z" fill="#315c76" stroke="#9bc9e5" stroke-width="2" data-bloc-tangent="true"/>';
 s+=arrow(345,142,345-fl,142+fl*Math.tan(lam),'#ffca7d',4);
 s+=arrow(405,118,470,118-65*Math.tan(lam),'#7ce8ae',4);
 s+=text(32,35,'λ = 8° ; µ = '+N(x)+' (sans unité)');
 s+=text(32,223,'Vis à filet carré idéalisé ; η = '+N(result)+' (sans unité)');
 s+='<g data-friction-arrow-length="'+fl.toFixed(2)+'" data-helix-angle-deg="8"></g>';break;
}
case 'adiabatic-compressor-01':{
 const ratio=Math.pow(1/x,1/1.4),gas=250*ratio,piston=155+gas;
 s+=box(145,74,310,122,'#173f59');
 s+='<rect x="154" y="82" width="'+gas.toFixed(2)+'" height="106" fill="#2477aa" opacity=".65" data-gas-length="'+gas.toFixed(2)+'"/>';
 s+=box(piston,80,16,110,'#d5e8f4')+line(piston+16,135,530,135,'#d5e8f4',11);
 s+=arrow(530,108,485,108,'#ffca7d',4);
 s+=text(32,36,'p₁ = 1 bar abs ; T₁ = 293,15 K ; γ = 1,4');
 s+=text(32,223,'p₂ = '+N(x)+' bar abs ; T₂ = '+N(result)+' °C');
 s+='<g data-volume-ratio="'+ratio.toFixed(6)+'" data-piston-x="'+piston.toFixed(2)+'"></g>';break;
}

 case 'convective-heat-flux-01':{
  const length=30+Math.round(90*(x-5)/55);
  s+=box(185,66,115,142,'#925a3c')+line(185,66,185,208,'#ffd17d',5);
  for(let k=0;k<3;k++){const y=91+k*44;s+=arrow(305,y,305+length,y,'#7ce8ae',4);}
  s+=text(30,35,'Paroi 65 °C ; air 20 °C')+text(30,230,'A = 1,50 m² ; h = '+N(x)+' W/(m²·K)');
  s+='<g data-convection-arrow-length="'+length+'" data-thermal-gradient-K="45"></g>';break;
 }
 case 'orifice-flow-01':{
  const len=25+Math.round(75*Math.sqrt(x/40));
  s+=box(100,91,145,98,'#315c76')+line(245,139,323,139,'#8ddcff',10);
  s+=line(323,107,323,171,'#d5e8f4',7)+line(323,132,323,146,'#8ddcff',5);
  s+=line(323,139,500,139,'#8ddcff',5);
  if(x>0)s+=arrow(350,139,350+len,139,'#7ce8ae',4);
  s+=text(105,82,'Amont')+text(411,116,'Aval');
  s+=text(30,36,'d = 2,00 mm ; Cd = 0,62 ; ρ = 850 kg/m³');
  s+=text(32,225,'Δp = '+N(x)+' bar ; débit vers la droite');
  s+='<g data-orifice-d-mm="2" data-flow-arrow-length="'+(x>0?len:0)+'"></g>';break;
 }
 case 'hydrostatic-gate-force-01':{
  const depth=150*x/2.5,base=35*x,cp=55+depth*2/3;
  s+=line(315,48,315,214,'#d5e8f4',8)+line(95,55,315,55,'#7ce8ae',2);
  if(depth>0){s+='<rect x="95" y="55" width="216" height="'+depth.toFixed(2)+'" fill="#237c9b" opacity=".55" data-water-depth="'+depth.toFixed(2)+'"/>';
   s+='<path d="M410 55 L410 '+(55+depth).toFixed(2)+' L'+(410+base).toFixed(2)+' '+(55+depth).toFixed(2)+' Z" fill="#ffca7d" opacity=".6" data-pressure-base="'+base.toFixed(2)+'"/>';
   s+=arrow(315,cp,395,cp,'#ffca7d',4)+circle(315,cp,5,'#ffd17d','data-center-depth="'+(2*x/3).toFixed(4)+'"');}
  s+=text(35,33,'Eau au repos ; b = 1,20 m')+text(330,77,'p(z) = ρgz','font-size="16"')+text(100,225,'h = '+N(x)+' m ; F = '+N(result)+' kN');break;
 }
 case 'capstan-tension-01':{
  s+=circle(300,135,70,'#315c76')+circle(300,135,12,'#092236');
  s+='<path d="M300 65 A70 70 0 0 1 300 205" fill="none" stroke="#7ce8ae" stroke-width="8" data-wrap-angle-rad="3.141592653589793"/>';
  s+=line(95,65,300,65,'#7ce8ae',4)+line(95,205,300,205,'#7ce8ae',5);
  s+=arrow(240,65,135,65,'#ffca7d',4)+arrow(240,205,135,205,'#ffca7d',5);
  s+=text(35,35,'T_mou = 200 N')+text(35,230,'T_tendu,lim = '+N(result)+' N');
  s+=text(386,114,'θ = π rad')+text(386,144,'μ = '+N(x)+' (sans unité)');break;
 }
 case 'bearing-l10-life-01':{
  const cx=295,cy=130;
  s+=circle(cx,cy,82,'none')+circle(cx,cy,32,'#315c76');
  for(let k=0;k<8;k++){const t=2*Math.PI*k/8;s+=circle(Number((cx+58*Math.cos(t)).toFixed(2)),Number((cy+58*Math.sin(t)).toFixed(2)),10,'#8ddcff');}
  s+=circle(cx,cy,16,'#092236')+arrow(cx,26,cx,94,'#ffca7d',4);
  s+=text(42,36,'Charge radiale P = 6,0 kN')+text(45,209,'C = 24,0 kN ; n = '+N(x)+' tr/min')+text(45,227,'Coupe de principe ; L10 nominal, pas panne certaine');break;
 }
 case 'sensor-4-20ma-01':{
  s+=line(85,185,515,185,'#8ddcff',7)+line(260,185,260,143,'#8ddcff',6);
  s+=circle(260,105,37,'#315c76')+text(247,112,'PT','font-size="20"');
  s+=arrow(297,105,385,105,'#7ce8ae',4)+box(389,75,147,64,'#315c76')+text(408,112,'Acquisition');
  s+=text(42,39,'Capteur : 0–250 bar')+text(311,85,'I = '+N(x)+' mA');
  const px=99+410*(x-4)/16;
  s+=line(99,215,509,215,'#9bc9e5',3)+circle(px,215,6,'#ffd17d','data-signal-x="'+px.toFixed(2)+'"');
  s+=text(105,205,'4 mA')+text(443,205,'20 mA')+text(41,228,'Schéma fonctionnel, pas un câblage électrique');break;
 }
 case 'natural-frequency-01':{
  const f=Math.sqrt(18000/x)/(2*Math.PI),side=40+4*Math.sqrt(x);
  s+=line(110,105,160,105,'#d5e8f4',6);
  const coil=Array.from({length:17},(_,k)=>[160+k*10,105+(k===0||k===16?0:(k%2?18:-18))]);
  s+='<path d="'+coil.map((p,k)=>(k?'L':'M')+p[0]+' '+p[1]).join(' ')+'" fill="none" stroke="#8ddcff" stroke-width="4"/>';
  s+=line(320,105,332,105,'#8ddcff',4)+box(332,105-side/2,side,side,'#315c76')+text(348,112,'m');
  const wave=Array.from({length:201},(_,k)=>{const t=k/200;return [60+470*t,188-16*Math.sin(2*Math.PI*f*t)]});
  s+=line(60,188,530,188,'#9bc9e5',1.5);
  s+='<path data-signal="libre" d="'+wave.map((p,k)=>(k?'L':'M')+p[0].toFixed(2)+' '+p[1].toFixed(2)).join(' ')+'" fill="none" stroke="#7ce8ae" stroke-width="2"/>';
  s+=text(43,37,'k = 18 000 N/m ; m = '+N(x)+' kg')+text(43,220,'Signal libre idéal, amplitude illustrative, durée 1 s');break;
 }
 case 'rectangular-tube-inertia-01':{
  const t=1.25*x;
  s+='<rect x="245" y="54" width="100" height="150" fill="#315c76" stroke="#9bc9e5" stroke-width="2"/>';
  s+='<rect data-epaisseur-mm="'+N(x)+'" x="'+(245+t)+'" y="'+(54+t)+'" width="'+(100-2*t)+'" height="'+(150-2*t)+'" fill="#092236" stroke="#9bc9e5" stroke-width="2"/>';
  s+=line(205,129,385,129,'#ffd17d',2,'stroke-dasharray="5 5"');
  s+=text(43,37,'b = 80 mm ; h = 120 mm')+text(390,90,'e = '+N(x)+' mm')+text(390,115,'Axe z');
  s+=text(43,220,'Coupe à 1,25 px/mm ; angles vifs idéalisés');break;
 }

 case 'three-phase-power-01':{
  s+=box(265,57,205,144,'#244963');
  for(let k=0;k<3;k++){const y=85+40*k;s+=line(95,y,265,y,'#8ddcff',4)+circle(265,y,4,'#ffd17d')+text(54,y+5,'L'+(k+1));}
  s+=circle(369,128,44,'#315c76')+text(357,135,'M','font-size="24"');
  s+=text(44,35,'Uₗ = 400 V ; cos φ = 0,82')+text(48,222,'Trois phases, réseau équilibré ; P active');break;
 }
 case 'hydrostatic-column-01':{
  const yLow=84+Math.round(100*x/6);
  s+=box(264,67,110,134,'#143c56')+'<rect x="270" y="73" width="98" height="122" fill="#2477aa" opacity="0.55"/>';
  s+=line(374,84,453,84,'#7ce8ae',4)+line(374,yLow,453,yLow,'#ffca7d',4,'data-depth-y="'+yLow+'"');
  s+=circle(453,84,5,'#7ce8ae')+circle(453,yLow,5,'#ffca7d');
  if(x>0)s+=arrow(223,84,223,yLow,'#ffd17d',4);
  s+=text(49,36,'ρ = 850 kg/m³ ; g = 9,81 m/s²')+text(145,141,'h = '+N(x)+' m')+text(461,75,'haut')+text(461,yLow+18,'bas');
  s+=text(48,223,'Échelle verticale : 100 px pour 6 m');break;
 }
 case 'planetary-fixed-ring-01':{
  const cx=300,cy=130;s+=circle(cx,cy,90,'none','stroke-dasharray="6 5"')+circle(cx,cy,30,'#315c76');
  for(let i=0;i<3;i++){const a=i*2*Math.PI/3;s+=circle(cx+60*Math.cos(a),cy+60*Math.sin(a),30,'#254d69');}
  s+=circle(cx,cy,6,'#ffd17d')+line(cx,cy,cx+60,cy,'#7ce8ae',3);
  s+=text(40,40,'zₛ = 24 ; zᵣ = 72 ; zₚ = 24 dents')+text(40,204,'Couronne fixe : nᵣ = 0 tr/min')+text(40,224,'Cercles primitifs, sans denture');break;
 }
 case 'thermal-radiation-01':{
  const frac=Math.max(0,Math.min(1,result/400));s+=box(235,74,130,120,'#975b3c')+line(235,74,235,194,'#ffd17d',5);
  for(let i=0;i<3;i++){const y=92+i*36;s+=arrow(372,y,372+40+80*frac,y,'#ffca7d',3);}
  s+=text(45,40,'A = 0,50 m² ; ε = 0,85')+text(45,115,'Tₛ = '+N(x)+' °C')+text(440,180,'Tₐ = 20 °C')+text(40,218,'Flèches : flux net sortant');break;
 }
 case 'rotation-energy-01':{
  const angle=0.25+1.5*x/450,ex=300+72*Math.cos(angle),ey=129-72*Math.sin(angle);
  s+=circle(300,129,72,'#315c76')+circle(300,129,8,'#ffd17d')+line(300,129,363,129,'#8ddcff',3);
  s+='<path d="M372 129 A72 72 0 0 0 '+ex.toFixed(2)+' '+ey.toFixed(2)+'" fill="none" stroke="#ffca7d" stroke-width="5" marker-end="url(#pointe)"/>';
  s+=text(45,43,'J = 12 kg·m² ; n = '+N(x)+' tr/min')+text(50,204,'Vue axiale ; sens anti-horaire ; ω = '+N(2*Math.PI*x/60)+' rad/s');
  break;
 }
 case 'center-mass-01':{
  const g=(120*.4+2*x)/(120+x),gx=90+420*g/2.4;
  s+=line(90,160,510,160,'#9bc9e5',7)+line(90,146,90,175,'#9bc9e5',3)+line(510,146,510,175,'#9bc9e5',3);
  s+=circle(160,160,16,'#315c76')+circle(440,160,16,'#315c76')+circle(gx,160,7,'#ffd17d');
  s+=arrow(gx,173,gx,209,'#ffca7d',4);
  s+=text(45,42,'A : x = 0 m ; x₁ = 0,40 m ; x₂ = 2,00 m');
  s+=text(95,89,'m₁ = 120 kg')+text(405,89,'m₂ = '+N(x)+' kg');
  s+=text(gx-42,133,'G : '+N(g)+' m')+text(gx+12,205,'P');
  break;
 }

 case 'torsion-angle-01':{
  const a=result*Math.PI/180*20;
  s+=box(140,103,310,46,'#315c76')+line(140,126,450,126,'#d5e8f4',3,'stroke-dasharray="8 5"')+circle(450,126,30,'#315c76');
  s+=line(450,126,450+26*Math.cos(a),126-26*Math.sin(a),'#ffd17d',5);
  s+=arrow(70,126,125,126,'#ffca7d',4)+text(45,42,'G = 80 GPa ; d = 40 mm ; L = 1,20 m');
  s+=text(44,197,'Angle de section amplifié ×20, non à l’échelle');break;
 }
 case 'hydro-motor-torque-01':{
  s+=circle(280,128,64,'#315c76')+circle(280,128,8,'#ffd17d')+line(344,128,480,128,'#d5e8f4',13);
  s+=line(240,65,240,40,'#8ddcff',7)+line(320,65,320,40,'#ffca7d',7)+arrow(180,40,238,40,'#8ddcff',4)+arrow(320,40,390,40,'#ffca7d',4);
  s+=text(45,82,'Δp = '+N(x)+' bar')+text(65,200,'Vg = 80 cm³/tr ; ηm = 0,90');break;
 }
 case 'accumulator-isothermal-01':{
  const width=360*80/x,interfaceX=130+width,highX=130+360*80/200;
  s+=box(130,80,360,112,'#254d69')+box(136,86,Math.max(0,width-6),100,'#315e81');
  s+=line(interfaceX,86,interfaceX,186,'#ffd17d',7)+line(highX,75,highX,195,'#7ce8ae',2,'stroke-dasharray="5 5"');
  s+=line(490,137,545,137,'#8ddcff',8)+arrow(505,137,558,137,'#ffca7d',4);
  s+=text(45,42,'p₀ = 80 bar abs ; V₀ = 10,0 L')+text(152,122,'Gaz')+text(445,122,'Huile');
  s+=text(38,219,'Trait vert : interface à 200 bar abs');break;
 }
 case 'wheatstone-bridge-01':{
  s+=line(185,54,405,54,'#9bc9e5',4)+line(185,205,405,205,'#9bc9e5',4);
  s+=line(185,54,185,72)+box(163,72,44,40,'#315c76')+line(185,112,185,150)+box(163,150,44,40,'#315c76')+line(185,190,185,205);
  s+=line(405,54,405,72)+box(383,72,44,40,'#315c76')+line(405,112,405,150)+box(383,150,44,40,'#315c76')+line(405,190,405,205);
  s+=circle(185,131,5,'#ffd17d')+circle(405,131,5,'#ffd17d')+arrow(220,131,367,131,'#7ce8ae',3);
  s+=text(105,45,'+5 V')+text(460,213,'0 V')+text(113,101,'R₁')+text(112,181,'R₂')+text(443,101,'R₃')+text(443,181,'R₄');
  s+=text(245,110,'Uout = Ud − Ug')+text(245,187,'R₄ = '+N(x)+' Ω');break;
 }
 case 'hydro-backpressure-01':{
  s+=box(115,90,355,80,'#173f59')+box(275,96,16,68,'#c8d8e2')+line(291,130,530,130,'#c8d8e2',14);
  s+=line(123,100,123,160,'#8ddcff',6)+line(462,100,462,160,'#7ce8ae',6);
  s+=arrow(180,130,256,130,'#8ddcff',5)+arrow(438,130,322,130,'#ffca7d',5);
  s+=text(62,42,'pA = 120 bar ; pB = '+N(x)+' bar')+text(82,202,'D = 80 mm ; d = 40 mm');
  break;
 }
 case 'euler-buckling-01':{
  const yTop=65,yBottom=190;
  s+=line(300,yTop,300,yBottom,'#d5e8f4',7)+circle(300,yTop,8,'#ffd17d')+circle(300,yBottom,8,'#ffd17d');
  s+='<path d="M280 57L320 57L300 43Z M280 198L320 198L300 212Z" fill="#315c76" stroke="#9bc9e5" stroke-width="2"/>';
  s+=arrow(300,20,300,47,'#ffca7d',5)+arrow(300,225,300,201,'#7ce8ae',5);
  s+=line(360,yTop,360,yBottom,'#7ce8ae',2,'stroke-dasharray="4 4"')+text(370,135,'L = '+N(x)+' m');
  s+=text(42,42,'E = 210 GPa ; d = 20 mm');
  break;
 }

 case 'hose-pressure-drop-01':{
  s+=box(95,90,410,70,'#143c56')+line(105,116,495,116,'#8ddcff',7)+line(105,141,495,141,'#8ddcff',7)+arrow(220,128,370,128,'#ffd17d',4);
  s+=circle(132,72,25,'#315c76')+circle(468,72,25,'#315c76')+line(132,96,132,90)+line(468,96,468,90);
  s+=text(40,40,'p₁')+text(510,40,'p₂')+text(230,82,'L = 5,0 m')+text(190,185,'D = 12 mm')+valueLabel(id,x,result);break;
 }
 case 'dc-voltage-drop-01':{
  s+=line(100,82,170,82)+box(170,65,100,34,'#315c76')+line(270,82,430,82)+box(430,65,80,34,'#7a5b37')+line(510,82,540,82)+line(540,82,540,172)+line(540,172,430,172)+box(330,155,100,34,'#315c76')+line(330,172,100,172)+line(100,172,100,130)+line(100,105,100,82)+line(83,105,117,105,'#ffd17d',4)+line(90,130,110,130,'#ffd17d',4)+arrow(290,56,380,56,'#7ce8ae',4);
  s+=text(38,40,'U = 12 V')+text(175,120,'R₁')+text(335,212,'R₂')+text(435,53,'Charge')+valueLabel(id,x,result);break;
 }
 case 'moment-arm-02':{s+=line(150,168,430,168,'#9bc9e5',9)+circle(150,168,11,'#ffd17d')+arrow(430,168,430+95*Math.cos(x*Math.PI/180),168-95*Math.sin(x*Math.PI/180));s+=text(145,195,'Pivot')+text(255,150,'L = 0,45 m')+text(405,60,'θ = '+N(x)+'°');s+=text(32,40,"Levier, bras de levier et force inclinée")+valueLabel(id,x,result);break;}
case 'kinetic-friction-01':{
  s+=line(80,172,520,172,'#9bc9e5',3)+box(145,95,300,72,'#315c76');
  s+=arrow(320,74,470,74,'#7ce8ae',4);
  if(x>0){const longueur=130*x/.7;s+=arrow(300,168,Number((300-longueur).toFixed(3)),168,'#ffca7d',5)+'<g data-frottement-longueur-px="'+longueur.toFixed(3)+'"></g>';}
  s+=circle(300,168,4,'#ffd17d','data-contact-y="168"');
  s+=text(32,40,'Patin : v vers la droite, frottement au contact vers la gauche');
  s+=text(33,210,'Fₜ = '+N(result)+' N ; N = 80 kg × 9,81 m/s²');
  s+=valueLabel(id,x,result);break;
}
case 'spring-stiffness-01':{
  s+=line(95,80,95,173,'#d5e8f4',7)+line(95,125,145,125,'#8ddcff',4);
  const pts=[[145,125],[160,125]];
  for(let k=0;k<8;k++)pts.push([160+k*34+17,k%2?152:98],[160+(k+1)*34,125]);
  pts.push([450,125],[485,125]);
  s+='<path d="'+pts.map((p,i)=>(i?'L':'M')+p[0]+' '+p[1]).join(' ')+'" fill="none" stroke="#8ddcff" stroke-width="4" data-ressort-continu="true"/>';
  s+=box(485,99,37,52,'#315c76')+arrow(522,125,567,125,'#ffca7d',4);
  s+=text(32,40,'Ressort axial : allongement fixé à 25 mm');
  s+=valueLabel(id,x,result);break;
}
case 'beam-stress-02':{s+=line(110,135,500,135,'#9bc9e5',10)+'<path d="M145 103 A42 42 0 1 1 145 167" fill="none" stroke="#ffca7d" stroke-width="5" marker-end="url(#pointe)"/>'+'<path d="M465 167 A42 42 0 1 1 465 103" fill="none" stroke="#ffca7d" stroke-width="5" marker-end="url(#pointe)"/>'+text(55,65,'Couple de flexion : M = '+N(x)+' N·m')+text(350,192,'Section : b = 40 mm ; h = 80 mm');s+=text(32,40,"Poutre en flexion et moment appliqué")+valueLabel(id,x,result);break;}
case 'gear-ratio-02':{const r1=45,r2=45*x/18,scale=Math.min(1,58/Math.max(r1,r2)),a=r1*scale,b=r2*scale,c1=300-(a+b)/2,c2=c1+a+b;s+=circle(c1,132,a)+circle(c2,132,b)+circle(c1,132,6,'#ffd17d')+circle(c2,132,6,'#ffd17d')+text(55,85,'z₁ = 18 dents')+text(410,85,'z₂ = '+N(x)+' dents')+text(55,180,'Sens de rotation opposés');s+=text(32,40,"Engrenages extérieurs, sens opposés")+valueLabel(id,x,result);break;}
case 'screw-lead-01':{s+=box(100,96,400,56,'#315c76');for(let k=0;k<8;k++)s+=line(125+k*48,96,155+k*48,152,'#ffca7d',4);s+=arrow(150,177,450,177)+text(70,74,'2 filets ; p = '+N(x)+' mm')+text(80,205,'Avance = '+N(result)+' mm/tr');s+=text(32,40,"Vis à deux filets et avance par tour")+valueLabel(id,x,result);break;}
case 'hydro-cylinder-speed-02':{s+=box(130,77,320,95)+box(265,85,16,78,'#c8d8e2')+line(281,123,515,123,'#c8d8e2',14)+'<rect x="285" y="88" width="155" height="26" fill="#2477aa" opacity=".65"/><rect x="285" y="136" width="155" height="26" fill="#2477aa" opacity=".65"/>'+line(450,88,450,105,'#8ddcff',3);if(x>0)s+=arrow(510,65,452,65,'#ffca7d',4);s+=text(32,40,'Rentrée de tige ; D = 80 mm ; d = 50 mm')+text(32,216,'Q = '+N(x)+' L/min ; v = '+N(result)+' m/s')+'<g data-annular-area-m2="0.003063053" data-retraction-speed-m-s="'+result.toFixed(7)+'"></g>';break;}
case 'hydro-annular-force-01':{
  s+=box(120,80,330,92,'#173f59');
  s+='<rect x="259" y="87" width="183" height="29" fill="#2477aa" opacity=".65" data-fluid-zone="superieure"/>';
  s+='<rect x="259" y="138" width="183" height="27" fill="#2477aa" opacity=".65" data-fluid-zone="inferieure"/>';
  s+=box(240,86,18,80,'#c8d8e2')+line(258,126,520,126,'#c8d8e2',14);
  if(x>0)s+=arrow(400,60,310,60);s+=text(65,52,'Chambre annulaire sous pression')+text(65,73,'D = 80 mm ; d = 40 mm');
  s+=valueLabel(id,x,result);break;
 }
case 'pneumatic-consumption-01':{const pistonX=137+155*x/400,rodEnd=pistonX+267;s+=box(125,80,280,92,'#173f59')+'<rect x="137" y="87" width="'+(pistonX-137).toFixed(2)+'" height="78" fill="#2477aa" opacity=".55"/>'+line(137,72,137,177,'#7ce8ae',2,'stroke-dasharray="5 5"')+box(pistonX,87,12,78,'#c8d8e2','data-piston-x="'+pistonX.toFixed(2)+'"')+line(pistonX+12,126,rodEnd,126,'#c8d8e2',12)+line(137,190,pistonX,190,'#ffd17d',3)+text(35,42,'Volume balayé côté plein : D = 50 mm ; course = '+N(x)+' mm')+valueLabel(id,x,result);s+='<g data-rod-length-px="255" data-rod-end-x="'+rodEnd.toFixed(3)+'" data-piston-x="'+pistonX.toFixed(3)+'"></g>';break;}
case 'electrical-series-01':{s+=line(110,125,205,125)+box(205,105,85,40,'#315c76')+line(290,125,320,125)+box(320,105,85,40,'#315c76')+line(405,125,500,125)+text(200,96,'R₁ = 12 Ω')+text(355,96,'R₂ = '+N(x)+' Ω');s+=text(32,40,"Résistances en série")+valueLabel(id,x,result);break;}
case 'electrical-parallel-01':{s+=line(115,82,115,169)+line(485,82,485,169)+line(115,82,205,82)+box(205,62,175,40,'#315c76')+line(380,82,485,82)+line(115,169,205,169)+box(205,149,175,40,'#315c76')+line(380,169,485,169)+text(225,55,'R₁ = 12 Ω')+text(235,213,'R₂ = '+N(x)+' Ω');s+=text(32,40,"Résistances en parallèle")+valueLabel(id,x,result);break;}
case 'inductor-energy-01':{s+=line(90,132,180,132);for(let k=0;k<6;k++)s+='<path d="M'+(180+k*40)+' 132 A20 32 0 0 1 '+(220+k*40)+' 132" fill="none" stroke="#ffca7d" stroke-width="4"/>';s+=line(420,132,510,132)+text(85,80,'L = 0,20 H')+text(340,80,'I = '+N(x)+' A');s+=text(32,40,"Bobine et énergie magnétique")+valueLabel(id,x,result);break;}
case 'mechanical-efficiency-02':{s+=box(145,95,300,72)+arrow(320,74,470,74)+arrow(300,187,170,187);s+=text(32,40,"Chaîne de transmission et rendement")+valueLabel(id,x,result);break;}
case 'rolling-torque-01':{s+=line(100,190,520,190,'#9bc9e5',5)+circle(305,129,61)+circle(305,129,8,'#ffd17d')+arrow(305,190,305,129,'#7ce8ae',4)+arrow(305,129,305,175,'#ff9999',3)+'<path d="M 366 129 A 61 61 0 0 0 305 68" fill="none" stroke="#ffd17d" stroke-width="4" marker-end="url(#pointe)"/>'+text(32,38,'R = 0,35 m ; force résistante équivalente = '+N(x)+' N')+text(32,223,'Cᵣ = '+N(result)+' N·m ; couple opposé à la rotation horaire');s+='<g data-rolling-torque-nm="'+result.toFixed(6)+'" data-moment-sense="antihoraire"></g>';break;}
case 'thermal-resistance-01':{s+=box(240,80,110,120,'#315c76')+text(32,38,'Conduction 1D ; S = 2 m²')+text(32,64,'e = 0,12 m ; λ = '+N(x)+' W/(m·K)')+text(65,112,'T₁ ?')+text(425,112,'T₂ ?')+text(35,165,'ΔT inconnu')+text(390,165,'Sens indéterminé')+valueLabel(id,x,result,223);s+='<g data-wall-thickness-m="0.12" data-conductivity="'+x.toFixed(4)+'"></g>';break;}
case 'measurement-uncertainty-01':{s+=line(110,135,490,135,'#9bc9e5',4)+box(245,90,110,85)+arrow(300,65,300,90);s+=text(32,40,"Mesure et incertitude relative")+valueLabel(id,x,result);break;}
case 'motion-01':{
  const p=65+430*Math.min(1,Math.max(0,x/30));
  s+=line(45,172,570,172,'#91d0e8',5)+box(p,115,70,39,'#386e89')+circle(p+16,163,9,'#071927')+circle(p+55,163,9,'#071927');
  s+=arrow(65,95,p+30,95)+text(65,55,'d = '+N(result)+' m')+text(65,210,'t = '+N(x)+' s');
  break;
 }
 case 'accel-01':{
  const p=65+430*Math.min(1,Math.max(0,(x/20)**2)),v=.8*x;
  s+=line(45,172,570,172,'#91d0e8',5)+box(p,115,70,39,'#386e89')+circle(p+16,163,9,'#071927')+circle(p+55,163,9,'#071927');
  s+=arrow(70,80,70+130*x/20,80)+text(70,48,'v = '+N(v)+' m/s')+text(70,210,'d = '+N(.4*x*x)+' m');
  break;
 }
 case 'rotation-01':{
  const a=2*Math.PI*x/60*.07;
  s+=circle(300,113,69)+circle(300,113,12,'#ffd17d')+line(300,113,300+62*Math.cos(a),113-62*Math.sin(a),'#ffca7d',7);
  s+='<path d="M395 76 A105 105 0 0 1 393 152" fill="none" stroke="#ffca7d" stroke-width="5" marker-end="url(#pointe)"/>'+text(55,45,'n = '+N(x)+' tr/min')+text(55,205,'t = 0,07 s');
  break;
 }
 case 'torque-01':{
  const start=95-60*Math.min(1,x/300);
  s+=line(145,112,480,112,'#b8e7fa',12)+'<path d="M177 121L151 167H203Z" fill="#ffd17d"/>'+line(143,170,212,170,'#fff',3)+arrow(440,start,440,104,'#ff9999',5);
  s+=text(65,45,'F = '+N(x)+' N')+text(265,166,'d = 0,40 m')+text(65,205,'M = '+N(result)+' N·m');
  break;
 }
 case 'pressure-01':{
  s+=box(130,65,330,110,'#102f47')+box(139,75,138,90,'#1d5e9c')+box(278,70,15,100,'#c8d8e2')+box(292,109,225,22,'#bccad4');
  s+=arrow(570,120,527,120,'#ffca7d',Math.max(2,2+6*x/30000));
  s+=text(65,45,'F = '+N(x)+' N')+text(65,210,'p = '+N(result)+' bar');
  break;
 }
 case 'flow-01':{
  s+=box(45,100,100,75,'#153a58')+box(52,130,86,38,'#2477aa')+circle(240,132,40)+line(145,132,200,132,'#8cd3f1',10)+line(280,132,550,132,'#8cd3f1',10);
  s+=arrow(300,110,300+170*Math.min(1,result/108),110)+text(45,45,'V = 18 L')+text(45,205,'Q = '+N(result)+' L/min ; t = '+N(x)+' s');
  break;
 }
 case 'power-01':{
  const a=2*Math.PI*x/60*.07;
  s+=box(80,76,205,95,'#285b76')+line(285,123,480,123,'#c6d6e1',18)+circle(470,123,50,'#173f59')+line(470,123,470+44*Math.cos(a),123-44*Math.sin(a),'#ffd17d',6);
  s+=text(65,45,'C = 120 N·m')+text(65,210,'P = '+N(result)+' kW ; t = 0,07 s');
  break;
 }
 case 'ohm-01':{
  s+=line(120,65,235,65)+line(365,65,475,65)+line(475,65,475,174)+line(475,174,120,174)+line(120,174,120,143)+line(120,120,120,65);
  s+='<polyline points="235,65 250,53 270,77 290,53 310,77 330,53 350,77 365,65" fill="none" stroke="#ffd17d" stroke-width="4"/>';
  s+=line(99,120,141,120,'#fff',5)+line(108,143,132,143,'#fff',5);
  s+=arrow(395,155,310,155,'#7ce8ae')+text(65,45,'U = 12 V ; R = '+N(x)+' Ω')+text(65,210,'I = '+N(result)+' A');
  break;
 }
 case 'energy-01':{
  s+=box(65,75,165,95,'#295f81')+box(230,109,25,27,'#d7e5ed')+line(255,123,380,123,'#b8e7fa',5)+circle(415,123,36,'#ffd17d');
  s+=box(70,185,460,12,'#173f59')+box(70,185,460*Math.min(1,x/8),12,'#ffd17d');
  s+=text(65,45,'P = 240 W')+text(65,220,'E = '+N(result)+' Wh');
  break;
 }
 case 'heat-01':{
  const h=100*x/80;
  s+=box(120,80,315,105,'#8c573e')+box(505,60,28,128,'#173f59')+box(512,175-h,14,h,'#ff9999')+circle(519,188,17,'#ff9999');
  s+=text(55,45,'ΔT = '+N(x)+' K')+text(55,215,'Q = '+N(result)+' kJ');
  break;
 }
 case 'stress-01':{
  const l=25+70*x/24000;
  s+=box(170,90,260,68,'#386e89')+arrow(170,124,170-l,124,'#ffca7d')+arrow(430,124,430+l,124,'#ffca7d');
  s+=text(65,45,'S = 120 mm²')+text(65,210,'F = '+N(x)+' N ; σ = '+N(result)+' MPa');
  break;
 }
 case 'strain-01':{
  const ext=60*result;
  s+=box(130,90,290+ext,60,'#386e89')+line(420,80,420,165,'#ffd17d',2,'stroke-dasharray="6 5"')+arrow(420,178,420+ext,178);
  s+=text(65,45,'L₀ = 1 000 mm')+text(65,211,'ΔL = '+N(result)+' mm ; × ≠ 1');
  break;
 }
 case 'density-01':{
  s+=box(235,92,140,93,'#326785')+line(235,92,265,60)+line(375,92,405,60)+line(265,60,405,60)+line(405,60,405,153)+line(375,185,405,153);
  s+=arrow(310,100,310,115+65*x/12,'#ffca7d')+text(55,45,'V = 0,001 m³ ; P ∝ m')+text(55,215,'m = '+N(x)+' kg ; ρ = '+N(result)+' kg/m³');
  break;
 }
 case 'accuracy-01':{
  const p=100+420*Math.min(1,Math.max(0,(x-49)/2));
  s+=line(100,132,520,132,'#a9d9ed',5)+line(310,98,310,165,'#7ce8ae',4)+line(p,76,p,155,'#ffca7d',5);
  for(let i=0;i<=10;i++)s+=line(100+i*42,132,100+i*42,i%5===0?148:142,'#fff',2);
  s+=text(95,173,'49 mm')+text(275,190,'50 mm')+text(478,173,'51 mm')+text(55,45,'x₀ = 50,00 mm')+text(55,220,'e = '+N(result)+' mm');
  break;
 }
 case 'kinetic-01':{
  s+=line(55,173,550,173,'#91d0e8',5)+box(180,95,190,60,'#386e89')+circle(218,165,14,'#071927')+circle(333,165,14,'#071927');
  s+=arrow(380,77,380+140*x/20,77)+box(80,190,400,12,'#173f59')+box(80,190,400*Math.min(1,result/240),12,'#ffd17d');
  s+=text(55,42,'m = 1 200 kg ; v = '+N(x)+' m/s')+text(55,223,'Eₖ = '+N(result)+' kJ');
  break;
 }
 case "potential-01":{s+=line(120,175,480,175)+line(300,175,300,50)+box(270,75,60,65)+arrow(350,150,350,70)+text(55,40,'h = '+N(x)+' m');break;}
case "impulse-01":{s+=box(180,105,180,65)+arrow(65,137,170,137)+line(100,195,500,195)+text(55,40,'F = 800 N ; Δt = '+N(x)+' s');break;}
case "friction-02":{s+=line(65,174,540,174)+box(210,114,150,60)+arrow(285,110,285,55)+arrow(285,178,285,213)+arrow(210,144,120,144)+text(55,40,'μ = '+N(x));break;}
case "buoyancy-01":{s+=box(130,65,350,145,'#164866')+box(245,115,120,85)+arrow(305,190,305,70)+text(55,40,'V = '+N(x)+' m³');break;}
case "gear-eff-01":{s+=circle(180,125,65)+circle(420,125,45)+line(245,125,375,125,'#d5e8f4',12)+arrow(90,125,120,125)+arrow(465,125,525,125)+text(55,40,'η = '+N(x));s+=valueLabel(id,x,result,216);break;}
case "pulley-01":{s+=circle(180,120,50)+circle(430,120,Math.max(30,Math.min(78,x/5)))+line(180,70,430,120-Math.max(30,Math.min(78,x/5)))+line(180,170,430,120+Math.max(30,Math.min(78,x/5)))+text(55,40,'D₂ = '+N(x)+' mm');s+=valueLabel(id,x,result,216);break;}
case "capacitor-01":{s+=line(100,110,270,110)+line(270,65,270,155,'#ffd17d',6)+line(300,65,300,155,'#ffd17d',6)+line(300,110,480,110)+text(55,40,'U = '+N(x)+' V');s+=valueLabel(id,x,result,216);break;}
case "resistance-02":{s+=line(60,120,130,120)+box(130,105,100,30)+line(230,120,310,120)+box(310,105,110,30)+line(420,120,530,120)+text(55,40,'R₂ = '+N(x)+' Ω');s+=valueLabel(id,x,result,216);break;}
case "thermal-exp-01":{s+=box(100,95,370+Math.min(60,x*.5),55)+line(470,75,470,170,'#ffd17d',2,'stroke-dasharray="5 5"')+arrow(470,185,470+Math.min(60,x*.5),185)+text(55,40,'ΔT = '+N(x)+' K ; déplacement amplifié');s+=valueLabel(id,x,result,216);break;}
case "hydro-speed-01":{s+=box(100,75,350,100)+box(245,82,16,86,'#d8e8f2')+box(261,115,250,20,'#d8e8f2')+(x>0?arrow(110,65,220,65):'')+text(55,40,'Q = '+N(x)+' L/min')+text(55,218,'v = '+N(result)+' m/s ; modèle sans pertes');break;}
case "work-01":{s+=line(50,180,550,180)+box(210,120,120,55)+circle(235,177,12)+circle(305,177,12)+arrow(335,140,500,140)+text(55,40,'d = '+N(x)+' m ; F = 400 N')+text(55,219,'W = '+N(result)+' J ; force alignée');break;}
case "frequency-period-01":{s+='<path d="M60 125 L130 125 L130 75 L200 75 L200 125 L270 125 L270 75 L340 75 L340 125 L410 125 L410 75 L480 75 L480 125 L550 125" fill="none" stroke="#8ddcff" stroke-width="4"/>'+text(55,40,'f = '+N(x)+' Hz')+text(55,219,'T = '+N(result)+' s ; tracé illustratif');break;}
case "hydro-force-02":{s+=box(110,75,350,100)+box(250,83,18,85,'#d8e8f2')+box(268,115,250,20,'#d8e8f2')+(x>0?arrow(515,145,565,145):'')+text(55,40,'p = '+N(x)+' bar ; D = 80 mm')+text(55,219,'F = '+N(result)+' N ; effort théorique');break;}
case "beam-defl-01":{s+=box(85,60,28,145,'#a2b5c2')+'<path d="M113 110 Q320 115 510 '+(110+Math.min(55,x*.25))+'" fill="none" stroke="#8ddcff" stroke-width="12"/>'+(x>0?arrow(510,60,510,100+Math.min(55,x*.25)):'')+text(55,40,'F = '+N(x)+' N ; flèche amplifiée')+text(55,219,'δ = '+N(result)+' mm ; amplification graphique');break;}
case 'circular-02':{s+=circle(270,126,70)+circle(270,126,8,'#ffd17d')+line(270,126,340,126,'#8ddcff',5)+arrow(340,126,290,126)+arrow(340,126,340,56,'#7ce8ae')+text(50,45,'r = 0,5 m ; v = '+N(x)+' m/s');break;}
 case 'angular-accel-01':{s+=circle(270,125,74)+line(270,125,335,125,'#ffd17d',6)+'<path d="M345 85 A90 90 0 0 1 355 145" fill="none" stroke="#ffca7d" stroke-width="4" marker-end="url(#pointe)"/>'+text(55,42,'Δω = 120 rad/s ; Δt = '+N(x)+' s')+text(55,214,'α = '+N(result)+' rad/s²');break;}
 case 'brake-torque-01':{s+=circle(250,125,74)+box(320,85,35,80,'#ab7156')+'<path d="M177 115 A74 74 0 0 1 260 51" fill="none" stroke="#7ce8ae" stroke-width="4" marker-end="url(#pointe)"/>'+(x>0?'<path d="M322 174 A88 88 0 0 1 238 213" fill="none" stroke="#ffca7d" stroke-width="4" marker-end="url(#pointe)"/>':'')+text(55,42,'J = 8 kg·m² ; |α| = '+N(x)+' rad/s²')+text(55,220,'Couple résistant : '+N(result)+' N·m');break;}
 case 'incline-force-01':{const a=x*Math.PI/180,ux=Math.cos(a),uy=-Math.sin(a),bx=145,by=193,L=Math.min(280,155/Math.max(.001,Math.sin(a))),cx=bx+L/2*ux,cy=by+L/2*uy; s+=line(bx,by,bx+L*ux,by+L*uy,'#d4e8f2',7)+'<g transform="translate('+cx.toFixed(2)+' '+cy.toFixed(2)+') rotate('+(-x).toFixed(2)+')"><rect x="-48" y="-52" width="96" height="52" rx="4" fill="#376984" stroke="#9bc9e5" stroke-width="2"/></g>'+arrow(cx,cy-25,cx,cy+35,'#ffd17d')+(x>0?arrow(cx,cy-25,cx-90*Math.sin(a)*ux,cy-25-90*Math.sin(a)*uy,'#7ce8ae'):'')+text(55,42,'m = 600 kg ; θ = '+N(x)+'°')+text(55,224,'F∥ = '+N(result)+' N ; vers le bas de la pente')+'<g data-force-parallel-n="'+result.toFixed(5)+'" data-vector-length-px="'+(90*Math.sin(a)).toFixed(5)+'"></g>';break;}
 case 'resultant-01':{const scale=120/Math.max(300,x),fx=300*scale,fy=x*scale,x0=160,y0=190,x1=x0+fx,y1=y0-fy;s+=arrow(x0,y0,x1,y0,'#8ddcff',4)+(x>0?arrow(x1,y0,x1,y1,'#7ce8ae',4)+arrow(x0,y0,x1,y1,'#ffca7d',4):'')+text(35,42,'Fₓ = 300 N ; Fᵧ = '+N(x)+' N')+text(35,218,'R = '+N(result)+' N ; vecteurs à échelle commune')+'<g data-fx-n="300" data-fy-n="'+x.toFixed(5)+'" data-resultant-n="'+result.toFixed(7)+'"></g>';break;}
 case 'torsion-01':{s+=box(120,100,350,55,'#527d94')+circle(120,128,29)+circle(470,128,29)+'<path d="M489 92 A46 46 0 0 1 510 142" fill="none" stroke="#ffca7d" stroke-width="5" marker-end="url(#pointe)"/>'+text(55,42,'Arbre plein Ø 30 mm ; C = '+N(x)+' N·m')+text(55,218,'τmax = '+N(result)+' MPa (surface)');break;}
 case 'axial-strain-01':{const ext=45*Math.min(1,x/1.2);s+=box(110,110,355+ext,42)+line(465,95,465,180,'#ffd17d',2,'stroke-dasharray="5 4"')+(x>0?arrow(465,188,465+ext,188,'#7ce8ae'):'')+text(55,42,'L₀ = 1 200 mm ; ΔL = '+N(x)+' mm')+text(55,221,'ε = '+result.toFixed(6)+' ; allongement amplifié')+'<g data-extension-mm="'+x.toFixed(5)+'" data-extension-px="'+ext.toFixed(5)+'"></g>';break;}
 case 'gear-mesh-01':{const r1b=32,r2b=32*x/20,scale=Math.min(1,70/Math.max(r1b,r2b)),r1=r1b*scale,r2=r2b*scale,center=300-(r1+r2)/2,c1=center,c2=center+r1+r2;s+=circle(c1,130,r1)+circle(c2,130,r2)+circle(c1,130,6,'#ffd17d')+circle(c2,130,6,'#ffd17d')+line(c1,130,c2,130,'#ffd17d',2,'stroke-dasharray="5 5"')+text(55,42,'m = 3 mm ; z₁ = 20 ; z₂ = '+N(x))+text(55,224,'a = '+N(result)+' mm ; cercles primitifs tangents');break;}
 case 'belt-speed-01':{s+=circle(210,130,55)+circle(435,130,55)+line(210,75,435,75,'#d5e8f4',5)+line(210,185,435,185,'#d5e8f4',5)+(x>0?arrow(280,75,355,75):'')+text(55,42,'D motrice = 200 mm ; n = '+N(x)+' tr/min')+text(55,224,'v = '+N(result)+' m/s ; galet illustratif identique');break;}
 case 'hydro-power-01':{s+=circle(180,130,46,'#315c76')+'<path d="M168 116 L168 144 L197 130 Z" fill="#8ddcff"/>'+line(226,130,385,130,'#8ddcff',6)+arrow(270,130,350,130,'#ffca7d',3)+box(385,94,145,72,'#315c76')+text(398,137,'Récepteur')+text(45,42,'Δp = '+N(x)+' bar ; Q = 24 L/min')+text(45,218,'Chaîne simplifiée ; retour non représenté');break;}
 case 'hydro-volume-01':{const piston=110+0.52*x;s+=box(100,80,370,100)+'<rect x="110" y="86" width="'+(piston-110).toFixed(2)+'" height="88" fill="#227a9b" opacity=".65"/>'+line(piston+14,130,piston+100,130,'#d5e8f4',12)+box(piston,86,14,88,'#d5e8f4','data-piston-x="'+piston.toFixed(2)+'"')+text(55,42,'L = '+N(x)+' mm ; V = '+N(result)+' L');break;}
 case 'pneumatic-force-01':{s+=box(95,80,370,100)+box(245,85,14,90,'#d5e8f4')+box(259,117,250,25,'#d5e8f4')+(x>0?arrow(510,129,Number((510+45*x/10).toFixed(3)),129):'')+text(55,42,'p = '+N(x)+' bar');break;}
 case 'electric-power-02':{s+=line(120,90,250,90)+box(250,75,115,30)+line(365,90,475,90)+line(475,90,475,175)+line(475,175,120,175)+line(120,175,120,143)+line(120,120,120,90)+line(100,120,140,120,'#fff',5)+line(109,143,131,143,'#fff',5)+(x>0?arrow(390,90,430,90,'#7ce8ae'):'')+text(55,42,'U = 24 V ; I = '+N(x)+' A')+text(55,222,'P = '+N(result)+' W ; circuit continu');break;}
 case 'joule-heat-01':{s+=line(120,115,230,115)+box(230,95,150,40,'#9b6748')+line(380,115,500,115)+(x>0?arrow(145,115,210,115):'')+text(55,42,'I = '+N(x));break;}
 case 'rc-time-01':{s+=line(95,105,185,105)+box(185,90,100,30)+line(285,105,340,105)+line(340,65,340,145,'#ffd17d',5)+line(365,65,365,145,'#ffd17d',5)+line(365,105,510,105)+line(510,105,510,185)+line(510,185,95,185)+line(95,185,95,147)+line(95,122,95,105)+line(75,122,115,122,'#fff',5)+line(84,147,106,147,'#fff',5)+text(55,42,'C = 470 µF ; R = '+N(x)+' Ω')+text(55,223,'τ = '+N(result)+' s ; RC série idéal');break;}
 case 'sampling-01':{
  const T=x,tMax=60,origin=90,scale=420/tMax,signal=t=>125-40*Math.sin(2*Math.PI*t/50);
  const waveform=Array.from({length:121},(_,k)=>{const t=k/2;return (k?'L':'M')+(origin+t*scale).toFixed(2)+' '+signal(t).toFixed(2)}).join(' ');
  s+=line(origin,185,510,185,'#9bc9e5',2)+line(origin,65,origin,185,'#9bc9e5',2);
  s+='<path d="'+waveform+'" fill="none" stroke="#8ddcff" stroke-width="2"/>';
  const count=Math.floor(tMax/T+1e-9)+1;s+='<g data-sample-count="'+count+'">';
  for(let k=0;k<count;k++){const t=k*T,px=origin+t*scale,py=signal(t);s+=line(px,185,px,py,'#7ce8ae',1.5)+circle(px,py,3,'#ffd17d','data-sample-t="'+N(t)+'"');}
  s+='</g>'+text(35,39,'T = '+N(T)+' ms ; fₑ = '+N(result)+' Hz')+text(110,215,'Signal témoin 20 Hz ; fenêtre 60 ms');break;
 }
 case 'efficiency-chain-01':{s+=box(100,95,145,65)+box(350,95,145,65)+arrow(245,127,345,127)+text(55,42,'η₂ = '+N(x));break;}
 case 'rolling-load-01':{s+=line(60,190,540,190)+circle(275,130,60)+circle(275,130,7,'#ffd17d')+arrow(275,130,275,177,'#ffca7d')+arrow(275,190,275,132,'#7ce8ae')+(x>0?line(275,190,Number((275-110*x/.05).toFixed(3)),190,'#ff9999',5,'marker-end="url(#pointe)" data-roulement-longueur-px="'+Number((110*x/.05).toFixed(3))+'"'):'')+text(55,42,'N = 8 000 N ; cᵣ = '+N(x))+text(55,224,'Fᵣ = '+N(result)+' N ; P vers le bas, N vers le haut');break;}
 case 'heat-transfer-01':{s+=box(245,65,110,140,'#9c7157')+text(55,42,'|ΔT| = '+N(x)+' K')+text(45,224,'Sens du flux non orienté : faces chaude/froide inconnues');break;}
 case 'measurement-relative-01':{const xp=300+(x-80)*75;s+=line(85,155,525,155,'#d5e8f4',5)+box(150,120,310,32)+line(300,90,300,195,'#7ce8ae',3)+line(xp,85,xp,200,'#ffca7d',4)+text(55,42,'x₀ = 80 mm ; x = '+N(x)+' mm')+text(55,223,'Écart relatif = '+N(result)+' %');break;}
 case 'frequency-01':{
  const t=0.07, a=2*Math.PI*x/60*t;
  s+=circle(260,119,68)+circle(260,119,9,'#ffd17d')+line(260,119,260+62*Math.cos(a),119-62*Math.sin(a),'#ffd17d',7);
  s+=box(354,92,60,45,'#446d87')+line(414,115,515,115,'#7ce8ae',4);
  s+=text(55,45,'Instantané t = 0,07 s')+text(55,211,'f = '+N(result)+' Hz ; n = '+N(x)+' tr/min')+'<g data-instant-s="0.07" data-angle-rad="'+a.toFixed(6)+'"></g>';
  break;
 }
 }
 if(legacyFooterIds.has(id))s+=line(20,232,580,232,'#507895',1)+valueLabel(id,x,result,255);
 const viewHeight=legacyFooterIds.has(id)?272:235;
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 '+viewHeight+'" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma technique bidimensionnel ; représentation indicative et non à l’échelle. Les grandeurs numériques sont également indiquées sous le schéma.</desc><defs><marker id="pointe" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#ffca7d" stroke-width="1.5"/></marker></defs><rect x="1" y="1" width="598" height="'+(viewHeight-3)+'" rx="12" fill="#092236" stroke="#507895"/>'+s+'</svg>';
}
const api=Object.freeze({render,titles});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.SIInvestigationDiagrams=api;
})(typeof window==='undefined'?globalThis:window);

(function(root){
'use strict';
const N=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(x1,y1,x2,y2,c='#a9d9ed',w=3,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+w+'" '+extra+'/>';
const box=(x,y,w,h,fill='#173f59',extra='')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="'+fill+'" stroke="#9bc9e5" stroke-width="2" '+extra+'/>';
const circle=(x,y,r,fill='#173f59',extra='')=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="#9bc9e5" stroke-width="3" '+extra+'/>';
const text=(x,y,s,extra='')=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="17" '+extra+'>'+s+'</text>';
const arrow=(x1,y1,x2,y2,c='#ffca7d',w=5)=>line(x1,y1,x2,y2,c,w,'marker-end="url(#pointe)"');
const titles=Object.freeze({
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
const legacyFooterIds=new Set(["natural-frequency-01","rectangular-tube-inertia-01","three-phase-power-01","hydrostatic-column-01","planetary-fixed-ring-01","thermal-radiation-01","rotation-energy-01","center-mass-01","torsion-angle-01","hydro-motor-torque-01","accumulator-isothermal-01","wheatstone-bridge-01","hydro-backpressure-01","euler-buckling-01","circular-02","angular-accel-01","brake-torque-01","incline-force-01","resultant-01","torsion-01","axial-strain-01","gear-mesh-01","belt-speed-01","hydro-power-01","hydro-volume-01","pneumatic-force-01","electric-power-02","joule-heat-01","rc-time-01","sampling-01","efficiency-chain-01","rolling-load-01","heat-transfer-01","measurement-relative-01"]);
function render(id,x,result){
 if(!Object.prototype.hasOwnProperty.call(titles,id)||!Number.isFinite(x)||!Number.isFinite(result))throw new RangeError('Dessin invalide');
 let s='';
 switch(id){
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
case 'kinetic-friction-01':{s+=box(145,95,300,72)+arrow(320,74,470,74)+arrow(300,187,170,187);s+=text(32,40,"Patin en glissement et effort de frottement")+valueLabel(id,x,result);break;}
case 'spring-stiffness-01':{s+=line(80,125,160,125)+Array.from({length:8},(_,k)=>line(160+k*32,125+(k%2?28:-28),192+k*32,125+(k%2?-28:28),'#9bc9e5',4)).join('')+arrow(500,125,550,125);s+=text(32,40,"Ressort sollicité axialement")+valueLabel(id,x,result);break;}
case 'beam-stress-02':{s+=line(110,135,500,135,'#9bc9e5',10)+'<path d="M145 103 A42 42 0 1 1 145 167" fill="none" stroke="#ffca7d" stroke-width="5" marker-end="url(#pointe)"/>'+'<path d="M465 167 A42 42 0 1 1 465 103" fill="none" stroke="#ffca7d" stroke-width="5" marker-end="url(#pointe)"/>'+text(55,65,'Couple de flexion : M = '+N(x)+' N·m')+text(350,192,'Section : b = 40 mm ; h = 80 mm');s+=text(32,40,"Poutre en flexion et moment appliqué")+valueLabel(id,x,result);break;}
case 'gear-ratio-02':{const r1=45,r2=45*x/18,scale=Math.min(1,80/r2),a=r1*scale,b=r2*scale,c1=300-(a+b)/2,c2=c1+a+b;s+=circle(c1,132,a)+circle(c2,132,b)+circle(c1,132,6,'#ffd17d')+circle(c2,132,6,'#ffd17d')+text(55,85,'z₁ = 18 dents')+text(370,85,'z₂ = '+N(x)+' dents')+text(55,180,'Sens de rotation opposés');s+=text(32,40,"Engrenages extérieurs, sens opposés")+valueLabel(id,x,result);break;}
case 'screw-lead-01':{s+=box(100,96,400,56,'#315c76');for(let k=0;k<8;k++)s+=line(125+k*48,96,155+k*48,152,'#ffca7d',4);s+=arrow(150,177,450,177)+text(70,74,'2 filets ; p = '+N(x)+' mm')+text(80,205,'Avance = '+N(result)+' mm/tr');s+=text(32,40,"Vis à deux filets et avance par tour")+valueLabel(id,x,result);break;}
case 'hydro-cylinder-speed-02':{s+=box(130,77,320,95)+box(265,85,16,78,'#c8d8e2')+line(280,123,515,123,'#a9d9ed',14)+arrow(500,65,555,65);s+=text(32,40,"Vérin hydraulique et vitesse de tige")+valueLabel(id,x,result);break;}
case 'hydro-annular-force-01':{
  s+=box(120,80,330,92,'#173f59');
  s+='<rect x="259" y="87" width="183" height="29" fill="#2477aa" opacity=".65" data-fluid-zone="superieure"/>';
  s+='<rect x="259" y="138" width="183" height="27" fill="#2477aa" opacity=".65" data-fluid-zone="inferieure"/>';
  s+=box(240,86,18,80,'#c8d8e2')+line(258,126,520,126,'#c8d8e2',14);
  s+=arrow(400,60,310,60)+text(65,52,'Chambre annulaire sous pression')+text(65,73,'D = 80 mm ; d = 40 mm');
  s+=valueLabel(id,x,result);break;
 }
case 'pneumatic-consumption-01':{
  const pistonX=140+300*x/400;
  s+=box(125,80,350,92,'#173f59');
  s+='<rect x="137" y="87" width="'+(pistonX-137).toFixed(2)+'" height="78" fill="#2477aa" opacity="0.55"/>';
  s+=line(140,72,140,177,'#7ce8ae',2,'stroke-dasharray="5 5"');
  s+=box(pistonX,87,12,78,'#c8d8e2','data-piston-x="'+pistonX.toFixed(2)+'"');
  s+=line(pistonX+12,126,537,126,'#c8d8e2',12);
  s+=line(140,190,pistonX,190,'#ffd17d',3);
  s+=text(35,42,'Volume balayé côté plein : D = 50 mm ; course = '+N(x)+' mm');
  s+=valueLabel(id,x,result);break;
 }
case 'electrical-series-01':{s+=line(110,125,205,125)+box(205,105,85,40,'#315c76')+line(290,125,320,125)+box(320,105,85,40,'#315c76')+line(405,125,500,125)+text(200,96,'R₁ = 12 Ω')+text(355,96,'R₂ = '+N(x)+' Ω');s+=text(32,40,"Résistances en série")+valueLabel(id,x,result);break;}
case 'electrical-parallel-01':{s+=line(115,82,115,169)+line(485,82,485,169)+line(115,82,205,82)+box(205,62,175,40,'#315c76')+line(380,82,485,82)+line(115,169,205,169)+box(205,149,175,40,'#315c76')+line(380,169,485,169)+text(225,55,'R₁ = 12 Ω')+text(235,213,'R₂ = '+N(x)+' Ω');s+=text(32,40,"Résistances en parallèle")+valueLabel(id,x,result);break;}
case 'inductor-energy-01':{s+=line(90,132,180,132);for(let k=0;k<6;k++)s+='<path d="M'+(180+k*40)+' 132 A20 32 0 0 1 '+(220+k*40)+' 132" fill="none" stroke="#ffca7d" stroke-width="4"/>';s+=line(420,132,510,132)+text(85,80,'L = 0,20 H')+text(340,80,'I = '+N(x)+' A');s+=text(32,40,"Bobine et énergie magnétique")+valueLabel(id,x,result);break;}
case 'mechanical-efficiency-02':{s+=box(145,95,300,72)+arrow(320,74,470,74)+arrow(300,187,170,187);s+=text(32,40,"Chaîne de transmission et rendement")+valueLabel(id,x,result);break;}
case 'rolling-torque-01':{s+=line(100,190,520,190,'#9bc9e5',5)+circle(305,129,61)+circle(305,129,8,'#ffd17d')+arrow(305,190,305,105,'#7ce8ae')+arrow(305,190,170,190)+text(65,75,'R = 0,35 m')+text(317,112,'N');s+=text(32,40,"Roue et couple résistant")+valueLabel(id,x,result);break;}
case 'thermal-resistance-01':{s+=box(210,65,160,130,'#315c76')+arrow(95,125,205,125)+arrow(375,125,500,125);s+=text(32,40,"Paroi et conduction thermique")+valueLabel(id,x,result);break;}
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
case "gear-eff-01":{s+=circle(180,125,65)+circle(420,125,45)+line(245,125,375,125,'#d5e8f4',12)+arrow(90,125,120,125)+arrow(465,125,525,125)+text(55,40,'η = '+N(x));break;}
case "pulley-01":{s+=circle(180,120,50)+circle(430,120,Math.max(30,Math.min(78,x/5)))+line(180,70,430,120-Math.max(30,Math.min(78,x/5)))+line(180,170,430,120+Math.max(30,Math.min(78,x/5)))+text(55,40,'D₂ = '+N(x)+' mm');break;}
case "capacitor-01":{s+=line(100,110,270,110)+line(270,65,270,155,'#ffd17d',6)+line(300,65,300,155,'#ffd17d',6)+line(300,110,480,110)+text(55,40,'U = '+N(x)+' V');break;}
case "resistance-02":{s+=line(60,120,130,120)+box(130,105,100,30)+line(230,120,310,120)+box(310,105,110,30)+line(420,120,530,120)+text(55,40,'R₂ = '+N(x)+' Ω');break;}
case "thermal-exp-01":{s+=box(100,95,370+Math.min(60,x*.5),55)+line(470,75,470,170,'#ffd17d',2,'stroke-dasharray="5 5"')+arrow(470,185,470+Math.min(60,x*.5),185)+text(55,40,'ΔT = '+N(x)+' K ; déplacement amplifié');break;}
case "hydro-speed-01":{s+=box(100,75,350,100)+box(245,82,16,86,'#d8e8f2')+box(261,115,250,20,'#d8e8f2')+arrow(110,65,220,65)+text(55,40,'Q = '+N(x)+' L/min');break;}
case "work-01":{s+=line(50,180,550,180)+box(210,120,120,55)+circle(235,177,12)+circle(305,177,12)+arrow(335,140,500,140)+text(55,40,'d = '+N(x)+' m ; F = 400 N');break;}
case "frequency-period-01":{s+='<path d="M60 125 L130 125 L130 75 L200 75 L200 125 L270 125 L270 75 L340 75 L340 125 L410 125 L410 75 L480 75 L480 125 L550 125" fill="none" stroke="#8ddcff" stroke-width="4"/>'+text(55,40,'f = '+N(x)+' Hz');break;}
case "hydro-force-02":{s+=box(110,75,350,100)+box(250,83,18,85,'#d8e8f2')+box(268,115,250,20,'#d8e8f2')+arrow(515,145,565,145)+text(55,40,'p = '+N(x)+' bar ; D = 80 mm');break;}
case "beam-defl-01":{s+=box(85,60,28,145,'#a2b5c2')+'<path d="M113 110 Q320 115 510 '+(110+Math.min(55,x*.25))+'" fill="none" stroke="#8ddcff" stroke-width="12"/>'+arrow(510,60,510,100+Math.min(55,x*.25))+text(55,40,'F = '+N(x)+' N ; flèche amplifiée');break;}
case 'circular-02':{s+=circle(270,126,70)+circle(270,126,8,'#ffd17d')+line(270,126,340,126,'#8ddcff',5)+arrow(340,126,290,126)+arrow(340,126,340,56,'#7ce8ae')+text(50,45,'r = 0,5 m ; v = '+N(x)+' m/s');break;}
 case 'angular-accel-01':{s+=circle(270,125,74)+line(270,125,335,125,'#ffd17d',6)+'<path d="M345 85 A90 90 0 0 1 355 145" fill="none" stroke="#ffca7d" stroke-width="4" marker-end="url(#pointe)"/>'+text(55,42,'Δω = 120 rad/s ; Δt = '+N(x)+' s')+text(55,214,'α = '+N(result)+' rad/s²');break;}
 case 'brake-torque-01':{s+=circle(250,125,74)+box(320,85,35,80,'#ab7156')+'<path d="M177 115 A74 74 0 0 1 260 51" fill="none" stroke="#7ce8ae" stroke-width="4" marker-end="url(#pointe)"/>'+'<path d="M322 174 A88 88 0 0 1 238 213" fill="none" stroke="#ffca7d" stroke-width="4" marker-end="url(#pointe)"/>'+text(55,42,'J = 8 kg·m² ; |α| = '+N(x)+' rad/s²')+text(55,220,'Couple résistant : '+N(result)+' N·m');break;}
 case 'incline-force-01':{const a=x*Math.PI/180,ux=Math.cos(a),uy=-Math.sin(a),bx=145,by=193,L=280,cx=bx+140*ux,cy=by+140*uy; s+=line(bx,by,bx+L*ux,by+L*uy,'#d4e8f2',7)+'<g transform="translate('+cx.toFixed(2)+' '+cy.toFixed(2)+') rotate('+(-x).toFixed(2)+')"><rect x="-48" y="-52" width="96" height="52" rx="4" fill="#376984" stroke="#9bc9e5" stroke-width="2"/></g>'+arrow(cx,cy-25,cx,cy+72,'#ffd17d')+arrow(cx,cy-25,cx-90*ux,cy-25-90*uy,'#7ce8ae')+text(55,42,'m = 600 kg ; θ = '+N(x)+'°')+text(55,224,'F∥ = '+N(result)+' N ; vers le bas de la pente');break;}
 case 'resultant-01':{s+=arrow(180,175,360,175,'#8ddcff')+arrow(360,175,360,65,'#7ce8ae')+arrow(180,175,360,65)+text(55,42,'Fᵧ = '+N(x));break;}
 case 'torsion-01':{s+=box(120,100,350,55,'#527d94')+circle(120,128,29)+circle(470,128,29)+'<path d="M489 92 A46 46 0 0 1 510 142" fill="none" stroke="#ffca7d" stroke-width="5" marker-end="url(#pointe)"/>'+text(55,42,'Arbre plein Ø 30 mm ; C = '+N(x)+' N·m')+text(55,218,'τmax = '+N(result)+' MPa (surface)');break;}
 case 'axial-strain-01':{const ext=45*Math.min(1,x/1.2);s+=box(110,110,355+ext,42)+line(465,95,465,180,'#ffd17d',2,'stroke-dasharray="5 4"')+arrow(110,130,55,130)+arrow(465+ext,130,535,130)+arrow(465,188,465+ext,188,'#7ce8ae')+text(55,42,'L₀ = 1 200 mm ; ΔL = '+N(x)+' mm')+text(55,221,'ε = '+result.toFixed(6)+' ; allongement amplifié');break;}
 case 'gear-mesh-01':{const r1=32,r2=32*x/20,center=280-(r1+r2)/2,c1=center,c2=center+r1+r2;s+=circle(c1,130,r1)+circle(c2,130,r2)+circle(c1,130,6,'#ffd17d')+circle(c2,130,6,'#ffd17d')+line(c1,130,c2,130,'#ffd17d',2,'stroke-dasharray="5 5"')+text(55,42,'m = 3 mm ; z₁ = 20 ; z₂ = '+N(x))+text(55,224,'a = '+N(result)+' mm ; cercles primitifs tangents');break;}
 case 'belt-speed-01':{s+=circle(210,130,55)+circle(435,130,55)+line(210,75,435,75,'#d5e8f4',5)+line(210,185,435,185,'#d5e8f4',5)+arrow(280,75,355,75)+text(55,42,'D motrice = 200 mm ; n = '+N(x)+' tr/min')+text(55,224,'v = '+N(result)+' m/s ; galet illustratif identique');break;}
 case 'hydro-power-01':{s+=circle(180,130,46,'#315c76')+'<path d="M168 116 L168 144 L197 130 Z" fill="#8ddcff"/>'+line(226,130,385,130,'#8ddcff',6)+arrow(270,130,350,130,'#ffca7d',3)+box(385,94,145,72,'#315c76')+text(398,137,'Récepteur')+text(45,42,'Δp = '+N(x)+' bar ; Q = 24 L/min')+text(45,218,'Chaîne simplifiée ; retour non représenté');break;}
 case 'hydro-volume-01':{s+=box(100,80,370,100)+box(220+Math.min(180,x*.3),86,14,88,'#d5e8f4')+text(55,42,'L = '+N(x));break;}
 case 'pneumatic-force-01':{s+=box(95,80,370,100)+box(245,85,14,90,'#d5e8f4')+box(259,117,250,25,'#d5e8f4')+arrow(510,129,555,129)+text(55,42,'p = '+N(x));break;}
 case 'electric-power-02':{s+=line(120,90,250,90)+box(250,75,115,30)+line(365,90,475,90)+line(475,90,475,175)+line(475,175,120,175)+line(120,175,120,143)+line(120,120,120,90)+line(100,120,140,120,'#fff',5)+line(109,143,131,143,'#fff',5)+arrow(390,90,430,90,'#7ce8ae')+text(55,42,'U = 24 V ; I = '+N(x)+' A')+text(55,222,'P = '+N(result)+' W ; circuit continu');break;}
 case 'joule-heat-01':{s+=line(120,115,230,115)+box(230,95,150,40,'#9b6748')+line(380,115,500,115)+arrow(145,115,210,115)+text(55,42,'I = '+N(x));break;}
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
 case 'rolling-load-01':{s+=line(60,190,540,190)+circle(275,130,60)+circle(275,130,7,'#ffd17d')+arrow(275,130,275,205,'#ffca7d')+arrow(275,190,275,115,'#7ce8ae')+arrow(275,190,165,190,'#ff9999')+arrow(350,130,445,130,'#8ddcff')+text(55,42,'N = 8 000 N ; cᵣ = '+N(x))+text(55,224,'Fᵣ = '+N(result)+' N ; opposition au roulement');break;}
 case 'heat-transfer-01':{s+=box(245,65,110,140,'#9c7157')+arrow(110,105,230,105)+arrow(370,105,490,105)+text(55,42,'ΔT = '+N(x));break;}
 case 'measurement-relative-01':{const xp=300+(x-80)*75;s+=line(85,155,525,155,'#d5e8f4',5)+box(150,120,310,32)+line(300,90,300,195,'#7ce8ae',3)+line(xp,85,xp,200,'#ffca7d',4)+text(55,42,'x₀ = 80 mm ; x = '+N(x)+' mm')+text(55,223,'Écart relatif = '+N(result)+' %');break;}
 case 'frequency-01':{
  const a=2*Math.PI*x/60*.07;
  s+=circle(260,119,68)+circle(260,119,9,'#ffd17d')+line(260,119,260+62*Math.cos(a),119-62*Math.sin(a),'#ffd17d',7);
  s+=box(354,92,60,45,'#446d87')+line(414,115,515,115,'#7ce8ae',4);
  s+=text(55,45,'1/tr')+text(55,211,'f = '+N(result)+' Hz ; n = '+N(x)+' tr/min');
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

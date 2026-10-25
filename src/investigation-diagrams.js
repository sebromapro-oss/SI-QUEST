(function(root){
'use strict';
const N=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(x1,y1,x2,y2,c='#a9d9ed',w=3,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+w+'" '+extra+'/>';
const box=(x,y,w,h,fill='#173f59',extra='')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="'+fill+'" stroke="#9bc9e5" stroke-width="2" '+extra+'/>';
const circle=(x,y,r,fill='#173f59',extra='')=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="#9bc9e5" stroke-width="3" '+extra+'/>';
const text=(x,y,s,extra='')=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="17" '+extra+'>'+s+'</text>';
const arrow=(x1,y1,x2,y2,c='#ffca7d',w=5)=>line(x1,y1,x2,y2,c,w,'marker-end="url(#pointe)"');
const titles=Object.freeze({
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
const legacyFooterIds=new Set(["circular-02","angular-accel-01","brake-torque-01","incline-force-01","resultant-01","torsion-01","axial-strain-01","gear-mesh-01","belt-speed-01","hydro-power-01","hydro-volume-01","pneumatic-force-01","electric-power-02","joule-heat-01","rc-time-01","sampling-01","efficiency-chain-01","rolling-load-01","heat-transfer-01","measurement-relative-01"]);
function render(id,x,result){
 if(!Object.prototype.hasOwnProperty.call(titles,id)||!Number.isFinite(x)||!Number.isFinite(result))throw new RangeError('Dessin invalide');
 let s='';
 switch(id){
 case 'moment-arm-02':{s+=line(150,168,430,168,'#9bc9e5',9)+circle(150,168,11,'#ffd17d')+arrow(430,168,430+95*Math.cos(x*Math.PI/180),168-95*Math.sin(x*Math.PI/180));s+=text(145,195,'Pivot')+text(255,150,'L = 0,45 m')+text(405,60,'θ = '+N(x)+'°');s+=text(32,40,"Levier, bras de levier et force inclinée")+valueLabel(id,x,result);break;}
case 'kinetic-friction-01':{s+=box(145,95,300,72)+arrow(320,74,470,74)+arrow(300,187,170,187);s+=text(32,40,"Patin en glissement et effort de frottement")+valueLabel(id,x,result);break;}
case 'spring-stiffness-01':{s+=line(80,125,160,125)+Array.from({length:8},(_,k)=>line(160+k*32,125+(k%2?28:-28),192+k*32,125+(k%2?-28:28),'#9bc9e5',4)).join('')+arrow(500,125,550,125);s+=text(32,40,"Ressort comprimé et force axiale")+valueLabel(id,x,result);break;}
case 'beam-stress-02':{s+=line(110,135,500,135,'#9bc9e5',10)+'<path d="M145 103 A42 42 0 1 1 145 167" fill="none" stroke="#ffca7d" stroke-width="5" marker-end="url(#pointe)"/>'+'<path d="M465 167 A42 42 0 1 1 465 103" fill="none" stroke="#ffca7d" stroke-width="5" marker-end="url(#pointe)"/>'+text(55,65,'Couple de flexion : M = '+N(x)+' N·m')+text(350,192,'Section : b = 40 mm ; h = 80 mm');s+=text(32,40,"Poutre en flexion et moment appliqué")+valueLabel(id,x,result);break;}
case 'gear-ratio-02':{const r1=45,r2=45*x/18,scale=Math.min(1,80/r2),a=r1*scale,b=r2*scale,c1=300-(a+b)/2,c2=c1+a+b;s+=circle(c1,132,a)+circle(c2,132,b)+circle(c1,132,6,'#ffd17d')+circle(c2,132,6,'#ffd17d')+text(55,85,'z₁ = 18 dents')+text(370,85,'z₂ = '+N(x)+' dents')+text(55,180,'Sens de rotation opposés');s+=text(32,40,"Engrenages extérieurs, sens opposés")+valueLabel(id,x,result);break;}
case 'screw-lead-01':{s+=box(100,96,400,56,'#315c76');for(let k=0;k<8;k++)s+=line(125+k*48,96,155+k*48,152,'#ffca7d',4);s+=arrow(150,177,450,177)+text(70,74,'2 filets ; p = '+N(x)+' mm')+text(80,205,'Avance = '+N(result)+' mm/tr');s+=text(32,40,"Vis à deux filets et avance par tour")+valueLabel(id,x,result);break;}
case 'hydro-cylinder-speed-02':{s+=box(130,77,320,95)+box(265,85,16,78,'#c8d8e2')+line(280,123,515,123,'#a9d9ed',14)+arrow(500,65,555,65);s+=text(32,40,"Vérin hydraulique et vitesse de tige")+valueLabel(id,x,result);break;}
case 'hydro-annular-force-01':{s+=box(120,80,330,92,'#173f59')+box(240,86,18,80,'#c8d8e2')+line(258,126,520,126,'#c8d8e2',14)+box(280,91,160,69,'#2477aa')+arrow(400,60,310,60)+text(65,52,'Chambre annulaire sous pression')+text(65,211,'D = 80 mm ; d = 40 mm');s+=text(32,40,"Vérin différentiel, chambre annulaire")+valueLabel(id,x,result);break;}
case 'pneumatic-consumption-01':{s+=box(130,77,320,95)+box(265,85,16,78,'#c8d8e2')+line(280,123,515,123,'#a9d9ed',14)+arrow(500,65,555,65);s+=text(32,40,"Vérin pneumatique et volume balayé")+valueLabel(id,x,result);break;}
case 'electrical-series-01':{s+=line(110,125,205,125)+box(205,105,85,40,'#315c76')+line(290,125,320,125)+box(320,105,85,40,'#315c76')+line(405,125,500,125)+text(200,96,'R₁ = 12 Ω')+text(355,96,'R₂ = '+N(x)+' Ω');s+=text(32,40,"Résistances en série")+valueLabel(id,x,result);break;}
case 'electrical-parallel-01':{s+=line(115,82,115,169)+line(485,82,485,169)+line(115,82,205,82)+box(205,62,175,40,'#315c76')+line(380,82,485,82)+line(115,169,205,169)+box(205,149,175,40,'#315c76')+line(380,169,485,169)+text(225,55,'R₁ = 12 Ω')+text(235,213,'R₂ = '+N(x)+' Ω');s+=text(32,40,"Résistances en parallèle")+valueLabel(id,x,result);break;}
case 'inductor-energy-01':{s+=line(90,132,180,132);for(let k=0;k<6;k++)s+='<path d="M'+(180+k*40)+' 132 A20 32 0 0 1 '+(220+k*40)+' 132" fill="none" stroke="#ffca7d" stroke-width="4"/>';s+=line(420,132,510,132)+text(85,80,'L = 0,20 H')+text(340,80,'I = '+N(x)+' A');s+=text(32,40,"Bobine et énergie magnétique")+valueLabel(id,x,result);break;}
case 'mechanical-efficiency-02':{s+=box(145,95,300,72)+arrow(320,74,470,74)+arrow(300,187,170,187);s+=text(32,40,"Chaîne de transmission et rendement")+valueLabel(id,x,result);break;}
case 'rolling-torque-01':{s+=line(100,190,520,190,'#9bc9e5',5)+circle(305,128,61)+circle(305,128,8,'#ffd17d')+arrow(305,128,305,65)+arrow(305,190,170,190)+text(65,75,'R = 0,35 m')+text(55,215,'Fᵣ = '+N(x)+' N');s+=text(32,40,"Roue et couple résistant")+valueLabel(id,x,result);break;}
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
 case 'hydro-power-01':{s+=circle(205,125,60)+arrow(265,125,390,125)+box(390,100,100,50)+text(55,42,'p = '+N(x));break;}
 case 'hydro-volume-01':{s+=box(100,80,370,100)+box(220+Math.min(180,x*.3),86,14,88,'#d5e8f4')+text(55,42,'L = '+N(x));break;}
 case 'pneumatic-force-01':{s+=box(95,80,370,100)+box(245,85,14,90,'#d5e8f4')+box(259,117,250,25,'#d5e8f4')+arrow(510,129,555,129)+text(55,42,'p = '+N(x));break;}
 case 'electric-power-02':{s+=line(120,90,250,90)+box(250,75,115,30)+line(365,90,475,90)+line(475,90,475,175)+line(475,175,120,175)+line(120,175,120,143)+line(120,120,120,90)+line(100,120,140,120,'#fff',5)+line(109,143,131,143,'#fff',5)+arrow(390,90,430,90,'#7ce8ae')+text(55,42,'U = 24 V ; I = '+N(x)+' A')+text(55,222,'P = '+N(result)+' W ; circuit continu');break;}
 case 'joule-heat-01':{s+=line(120,115,230,115)+box(230,95,150,40,'#9b6748')+line(380,115,500,115)+arrow(145,115,210,115)+text(55,42,'I = '+N(x));break;}
 case 'rc-time-01':{s+=line(95,105,185,105)+box(185,90,100,30)+line(285,105,340,105)+line(340,65,340,145,'#ffd17d',5)+line(365,65,365,145,'#ffd17d',5)+line(365,105,510,105)+line(510,105,510,185)+line(510,185,95,185)+line(95,185,95,147)+line(95,122,95,105)+line(75,122,115,122,'#fff',5)+line(84,147,106,147,'#fff',5)+text(55,42,'C = 470 µF ; R = '+N(x)+' Ω')+text(55,223,'τ = '+N(result)+' s ; RC série idéal');break;}
 case 'sampling-01':{s+=line(75,185,525,185)+line(75,185,75,65);for(let i=0;i<7;i++){const xx=100+i*65,yy=122-35*Math.sin(i*.8);s+=line(xx,185,xx,yy,'#7ce8ae',2)+circle(xx,yy,4,'#ffd17d')}s+=text(55,42,'T = '+N(x)+' ms')+text(55,220,'fₑ = '+N(result)+' Hz ; échantillons réguliers');break;}
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

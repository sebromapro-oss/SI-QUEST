(function(root){
'use strict';
const N=v=>Number(v.toFixed(2)).toLocaleString('fr-FR');
const line=(x1,y1,x2,y2,c='#a9d9ed',w=3,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+w+'" '+extra+'/>';
const box=(x,y,w,h,fill='#173f59',extra='')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="'+fill+'" stroke="#9bc9e5" stroke-width="2" '+extra+'/>';
const circle=(x,y,r,fill='#173f59',extra='')=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="#9bc9e5" stroke-width="3" '+extra+'/>';
const text=(x,y,s,extra='')=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="17" '+extra+'>'+s+'</text>';
const arrow=(x1,y1,x2,y2,c='#ffca7d',w=5)=>line(x1,y1,x2,y2,c,w,'marker-end="url(#pointe)"');
const titles=Object.freeze({
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
'kinetic-01':'Engin mobile et énergie cinétique'
});
function render(id,x,result){
 if(!Object.prototype.hasOwnProperty.call(titles,id)||!Number.isFinite(x)||!Number.isFinite(result))throw new RangeError('Dessin invalide');
 let s='';
 switch(id){
 case 'motion-01':{
  const p=65+430*x/30;
  s+=line(45,172,570,172,'#91d0e8',5)+box(p,115,70,39,'#386e89')+circle(p+16,163,9,'#071927')+circle(p+55,163,9,'#071927');
  s+=arrow(65,95,p+30,95)+text(65,55,'d = '+N(result)+' m')+text(65,210,'t = '+N(x)+' s');
  break;
 }
 case 'accel-01':{
  const p=65+430*(x/20)**2,v=.8*x;
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
  const start=95-60*x/300;
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
  s+=box(70,185,460,12,'#173f59')+box(70,185,460*x/8,12,'#ffd17d');
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
  const p=100+420*(x-49)/2;
  s+=line(100,132,520,132,'#a9d9ed',5)+line(310,98,310,165,'#7ce8ae',4)+line(p,76,p,155,'#ffca7d',5);
  for(let i=0;i<=10;i++)s+=line(100+i*42,132,100+i*42,i%5===0?148:142,'#fff',2);
  s+=text(95,173,'49 mm')+text(275,190,'50 mm')+text(478,173,'51 mm')+text(55,45,'x₀ = 50,00 mm')+text(55,220,'e = '+N(result)+' mm');
  break;
 }
 case 'kinetic-01':{
  s+=line(55,173,550,173,'#91d0e8',5)+box(180,95,190,60,'#386e89')+circle(218,165,14,'#071927')+circle(333,165,14,'#071927');
  s+=arrow(380,77,380+140*x/20,77)+box(80,190,400,12,'#173f59')+box(80,190,400*result/240,12,'#ffd17d');
  s+=text(55,42,'m = 1 200 kg ; v = '+N(x)+' m/s')+text(55,223,'Eₖ = '+N(result)+' kJ');
  break;
 }
 case 'frequency-01':{
  const a=2*Math.PI*x/60*.07;
  s+=circle(260,119,68)+circle(260,119,9,'#ffd17d')+line(260,119,260+62*Math.cos(a),119-62*Math.sin(a),'#ffd17d',7);
  s+=box(354,92,60,45,'#446d87')+line(414,115,515,115,'#7ce8ae',4);
  s+=text(55,45,'1/tr')+text(55,211,'f = '+N(result)+' Hz ; n = '+N(x)+' tr/min');
  break;
 }
 }
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 235" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma technique bidimensionnel ; représentation indicative et non à l’échelle. Les grandeurs numériques sont également indiquées sous le schéma.</desc><defs><marker id="pointe" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#ffca7d" stroke-width="1.5"/></marker></defs><rect x="1" y="1" width="598" height="232" rx="12" fill="#092236" stroke="#507895"/>'+s+'</svg>';
}
const api=Object.freeze({render,titles});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.SIInvestigationDiagrams=api;
})(typeof window==='undefined'?globalThis:window);

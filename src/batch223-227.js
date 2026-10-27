(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./investigations.js'):root.SIInvestigations;
const prior=typeof module!=='undefined'&&module.exports?require('./investigation-diagrams.js'):root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"sinusoidal-vibration-rms-01","min":0,"max":60,"lo":0,"hi":12,"iu":"Hz","u":"m/s²","title":"Banc vibratoire — Accélération efficace","policy":{"absoluteTolerance":0.03,"relativeTolerance":0,"precision":3,"assumptions":"Déplacement harmonique x(t)=A sin(2πft), amplitude A = 0,50 mm = 0,00050 m ; fréquence f de 0 à 60 Hz ; accélération efficace calculée sur une période pour f > 0 ; f = 0 correspond à l'état statique ; pas de résonance modélisée.","solution":"1. A = 0,50 mm = 5,0×10⁻⁴ m ; f = 25 Hz ; ω = 2π×25 = 157,080 rad/s.\n2. x(t) = A sin(ωt) ; a(t) = −ω² A sin(ωt) : l'accélération est opposée au déplacement.\n3. aₘₐₓ = ω²A = 12,3370 m/s² ; aₑff = aₘₐₓ/√2 = 8,72358 m/s².\n4. (rad/s)²×m = m/s² ; à f = 0, aₑff = 0 ; si f double, aₑff quadruple.\n5. Seuil pédagogique fictif 12 m/s² respecté ; une mesure réelle doit vérifier amplitude, harmoniques et résonances."}},{"id":"thick-cylinder-hoop-stress-01","min":0,"max":15,"lo":0,"hi":35,"iu":"MPa","u":"MPa","title":"Tube épais — Contrainte circonférentielle","policy":{"absoluteTolerance":0.08,"relativeTolerance":0,"precision":3,"assumptions":"Cylindre épais élastique isotrope, rᵢ = 25 mm, rₒ = 40 mm, pression interne relative p de 0 à 15 MPa, pression externe nulle ; état axisymétrique, contraintes résiduelles et concentrations exclues ; contrainte circonférentielle de Lamé au bord intérieur, pas un calcul de résistance admissible.","solution":"1. rᵢ = 25 mm ; rₒ = 40 mm ; p = 8 MPa ; les rayons sont dans la même unité dans leur rapport.\n2. rₒ²+rᵢ² = 1 600+625 = 2 225 mm² ; rₒ²−rᵢ² = 975 mm².\n3. σθ(rᵢ) = 8×2 225/975 = 18,25641 MPa (traction circonférentielle).\n4. Rapport mm²/mm² sans dimension ; σθ a l'unité de p. À p = 0, σθ = 0 ; σθ varie linéairement avec p.\n5. Seuil fictif 35 MPa respecté ; vérifier ensuite contrainte équivalente, fatigue, matériau et coefficients réglementaires."}},{"id":"three-phase-neutral-imbalance-01","min":0,"max":20,"lo":0,"hi":7,"iu":"A","u":"A","title":"Réseau triphasé — Courant de neutre","policy":{"absoluteTolerance":0.03,"relativeTolerance":0,"precision":3,"assumptions":"Réseau triphasé à neutre, trois courants sinusoïdaux de même fréquence avec angles 0°, −120°, +120° ; Iᵦ = 8 A, I𝒸 = 12 A, Iₐ de 0 à 20 A ; facteurs de puissance identiques, harmoniques et déséquilibres angulaires exclus ; Iₙ est la valeur efficace du courant de retour.","solution":"1. Iₐ = 14 A à 0° ; Iᵦ = 8 A à −120° ; I𝒸 = 12 A à +120°.\n2. Somme des composantes : Iₓ = 14−(8+12)/2 = 4 A ; Iᵧ = (12−8)√3/2 = 3,46410 A.\n3. Le courant de neutre est opposé à la somme ; son module Iₙ = √(4²+3,46410²) = √28 = 5,29150 A.\n4. Somme de carrés en A² puis racine en A ; le sens de retour est opposé au résultant des phases.\n5. Critère fictif 7 A respecté ; mesurer le neutre réel et les harmoniques (notamment rang 3)."}},{"id":"source-matched-load-power-01","min":0.2,"max":1.2,"lo":50,"hi":null,"iu":"Ω","u":"W","title":"Source continue — Puissance maximale transférée","policy":{"absoluteTolerance":0.4,"relativeTolerance":0,"precision":3,"assumptions":"Source de Thévenin idéale E = 12 V avec résistance interne r de 0,20 à 1,20 Ω, charge purement résistive Rcharge ajustée égale à r ; régime continu stationnaire ; échauffement et limites de courant non modélisés ; rendement à l'adaptation = 50 %.","solution":"1. E = 12 V ; r = 0,50 Ω ; Pcharge = E² Rcharge/(r+Rcharge)².\n2. La dérivée par rapport à Rcharge s'annule pour Rcharge = r ; il s'agit du maximum pour Rcharge > 0.\n3. I = E/(2r) = 12 A ; Ucharge = E/2 = 6 V ; Pmax = 6×12 = 72 W.\n4. V²/Ω = W ; à l'adaptation Pinterne = Pcharge = 72 W, rendement = 50 %.\n5. Critère fictif 50 W atteint ; ce point peut être thermiquement défavorable : ne pas le choisir sans bilan de pertes."}},{"id":"couette-viscous-shear-01","min":0,"max":2,"lo":0,"hi":4,"iu":"m/s","u":"N","title":"Film lubrifiant — Effort de cisaillement","policy":{"absoluteTolerance":0.03,"relativeTolerance":0,"precision":3,"assumptions":"Fluide newtonien incompressible, viscosité μ = 0,12 Pa·s, surface A = 0,020 m², épaisseur h = 1,0 mm, plaque inférieure fixe, supérieure à vitesse v de 0 à 2 m/s ; profil de vitesse linéaire, sans gradient de pression, effets de bord ni échauffement.","solution":"1. μ = 0,12 Pa·s ; A = 0,020 m² ; h = 1,0 mm = 0,0010 m ; v = 1,25 m/s.\n2. Gradient de vitesse du/dy = v/h = 1 250 s⁻¹ ; contrainte τ = μ v/h = 150 Pa.\n3. Module de l'effort F = τA = 150×0,020 = 3,00 N, opposé au mouvement de la plaque.\n4. Pa·s×m²×(m/s)/m = Pa·m² = N ; à v = 0, F = 0 ; si v double, F double.\n5. Seuil fictif 4 N respecté ; mesurer la viscosité en température et vérifier le régime réel."}}],byId=Object.fromEntries(meta.map(q=>[q.id,q]));
const models={"sinusoidal-vibration-rms-01":x=>(2*Math.PI*x)**2*.0005/Math.SQRT2,
"thick-cylinder-hoop-stress-01":x=>x*(.04**2+.025**2)/(.04**2-.025**2),
"three-phase-neutral-imbalance-01":x=>Math.hypot(x-10,2*Math.sqrt(3)),
"source-matched-load-power-01":x=>144/(4*x),
"couette-viscous-shear-01":x=>.12*.02*x/.001};
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(q=>[q.id,{min:q.lo,max:q.hi,unit:q.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(q=>[q.id,Object.freeze(q.policy)]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(q=>[q.id,q.iu]))));
function calculate(id,x){const q=byId[id];if(!q)return base.calculate(id,x);if(!Number.isFinite(x)||x<q.min||x>q.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y;}
function assess(id,x){const q=byId[id];if(!q)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=(q.lo??-Infinity)-1e-9&&value<=(q.hi??Infinity)+1e-9,min:q.lo,max:q.hi,unit:q.u});}
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(q=>[q.id,q.title]))));
const n=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(a,b,c,d,col='#a9d9ed',w=3,extra='')=>'<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+col+'" stroke-width="'+w+'" '+extra+'/>';
const txt=(x,y,s)=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="16">'+s+'</text>';
const arrow=(a,b,c,d,col='#7ce8ae')=>line(a,b,c,d,col,4,'marker-end="url(#pointe)"');
const rect=(x,y,w,h,col='#315c76')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+col+'" stroke="#a9d9ed" stroke-width="2"/>';
function render(id,x,y){if(!byId[id])return prior.render(id,x,y);if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('État graphique désynchronisé');let s='';
switch(id){
case 'sinusoidal-vibration-rms-01':{
s+=rect(195,165,290,18)+rect(290,127,105,38,'#477e9b')+line(340,165,340,183,'#ffd17d',4);
if(x>0){const wave=Array.from({length:81},(_,i)=>(i?'L':'M')+(195+i*3.6).toFixed(2)+' '+(83-27*Math.sin(i*4*Math.PI/80)).toFixed(2)).join(' ');s+='<path d="'+wave+'" stroke="#7ce8ae" stroke-width="3" fill="none"/>'+txt(415,115,'T = '+n(1/x)+' s');}
else s+=txt(375,95,'État statique');
s+=txt(34,39,'f = '+n(x)+' Hz ; A = 0,50 mm')+txt(34,219,'aₑff = '+n(y)+' m/s² ; axe vertical');break;}
case 'thick-cylinder-hoop-stress-01':{
s+='<circle cx="310" cy="139" r="68" fill="#3c708c" stroke="#9bc9e5" stroke-width="3"/><circle cx="310" cy="139" r="42.5" fill="#092236" stroke="#9bc9e5" stroke-width="3"/>';
if(x>0){const len=22*x/15;s+=arrow(267.5,139,267.5-len,139,'#ffca7d')+arrow(352.5,139,352.5+len,139,'#ffca7d');}
s+=txt(400,112,'rᵢ = 25 mm')+txt(400,136,'rₒ = 40 mm')+txt(34,39,'p = '+n(x)+' MPa')+txt(34,219,'σθ(rᵢ) = '+n(y)+' MPa ; traction');break;}
case 'three-phase-neutral-imbalance-01':{
const ox=300,oy=128,sc=6;const ph=[[x,0,'#7ce8ae'],[8,-2*Math.PI/3,'#ffca7d'],[12,2*Math.PI/3,'#8ddcff']];
for(const [v,a,col] of ph)if(v>0)s+=arrow(ox,oy,ox+sc*v*Math.cos(a),oy-sc*v*Math.sin(a),col);
const dx=(x-10)*sc,dy=-2*Math.sqrt(3)*sc;
s+=arrow(ox,oy,ox-dx,oy-dy,'#ff8fb2');
s+=txt(34,39,'Iₐ = '+n(x)+' A ; Iᵦ = 8 A ; I𝒸 = 12 A')+txt(34,194,'Vert : A ; orange : B ; bleu : C ; rose : neutre')+txt(34,219,'Iₙ = '+n(y)+' A ; angles 0°, −120°, +120°');break;}
case 'source-matched-load-power-01':{
s+=line(160,105,246,105)+rect(246,93,90,24)+line(336,105,450,105)+line(450,105,450,124)+rect(434,124,32,42)+line(450,166,450,183)+line(450,183,160,183)+line(160,183,160,153)+line(160,119,160,105)+line(139,125,181,125,'#ffd17d',4)+line(149,147,171,147,'#ffd17d',4);
s+=txt(256,87,'r')+txt(475,145,'R = r')+txt(100,145,'12 V')+txt(34,39,'r = '+n(x)+' Ω ; charge adaptée')+txt(34,219,'Pmax = '+n(y)+' W ; rendement = 50 %');break;}
case 'couette-viscous-shear-01':{
s+=rect(160,168,300,17,'#54768a')+rect(160,121,300,47,'#225b78')+rect(160,108,300,13,'#9bc9e5');
for(let k=1;k<5;k++){const yy=121+k*9;s+=line(176,yy,176+k*22,yy,'#7aaec5',2);}
if(x>0){s+=arrow(300,87,300+95*x/2,87)+arrow(310,113,310-95*x/2,113,'#ffca7d');}
s+=txt(34,39,'v = '+n(x)+' m/s ; h = 1,0 mm')+txt(34,219,'F = '+n(y)+' N ; effort opposé à v');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 235" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma 2D paramétrique de principe ; valeurs et unités disponibles en texte. Les dimensions schématiques sont amplifiées et ne constituent pas une échelle métrique.</desc><defs><marker id="pointe" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#7ce8ae"/></marker></defs><rect x="1" y="1" width="598" height="232" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);

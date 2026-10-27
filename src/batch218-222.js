(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./investigations.js'):root.SIInvestigations;
const previous=typeof module!=='undefined'&&module.exports?require('./investigation-diagrams.js'):root.SIInvestigationDiagrams;
if(!base||!previous)throw Error('Moteur scientifique absent');
const meta=[{"id":"stokes-sphere-drag-01","min":0,"max":10,"lo":0,"hi":0.3,"iu":"mm/s","u":"mN","title":"Bille dans une huile — Traînée de Stokes","policy":{"absoluteTolerance":0.003,"relativeTolerance":0,"precision":3,"assumptions":"Sphère rigide isolée, rayon r = 0,002 m, μ = 1 Pa·s, ρ = 1 000 kg/m³ ; vitesse relative positive de 0 à 10 mm/s ; Re ≤ 0,04 ; écoulement rampant, sans parois proches.","solution":"1. r = 2 mm = 0,002 m ; v = 5 mm/s = 0,005 m/s ; μ = 1 Pa·s.\n2. Re = 2×1 000×0,002×0,005/1 = 0,020 ≪ 1 : loi de Stokes admissible.\n3. Fᴅ = 6π×1×0,002×0,005 = 1,88496×10⁻⁴ N = 0,188496 mN.\n4. (Pa·s)×m×(m/s) = Pa·m² = N ; force opposée au mouvement relatif.\n5. Critère fictif 0,30 mN respecté ; corriger le modèle si Re augmente."}},{"id":"magnetic-airgap-force-01","min":0,"max":0.8,"lo":0,"hi":25,"iu":"T","u":"N","title":"Électroaimant — Force d'attraction idéale","policy":{"absoluteTolerance":0.1,"relativeTolerance":0,"precision":3,"assumptions":"Champ normal uniforme dans un entrefer, A = 2 cm² = 2×10⁻⁴ m², μ₀ = 4π×10⁻⁷ H/m ; B de 0 à 0,8 T ; fuites, franges, saturation et jeu mécanique négligés.","solution":"1. A = 2 cm² = 2×10⁻⁴ m² ; B = 0,40 T ; μ₀ = 4π×10⁻⁷ H/m.\n2. Pression magnétique p = B²/(2μ₀) = 0,16/(8π×10⁻⁷) = 63 662 Pa.\n3. F = pA = 63 662×2×10⁻⁴ = 12,732 N.\n4. T²/(H/m) = N/m² ; multiplication par m² donne N ; F varie comme B².\n5. Critère fictif 25 N respecté ; mesurer la force avec le véritable entrefer et vérifier la saturation."}},{"id":"gear-tooth-tangential-force-01","min":0,"max":300,"lo":0,"hi":2500,"iu":"N·m","u":"N","title":"Engrenage — Effort tangentiel sur dent","policy":{"absoluteTolerance":5,"relativeTolerance":0,"precision":3,"assumptions":"Pignon de diamètre primitif d = 0,150 m, couple positif de 0 à 300 N·m ; force tangentielle idéale appliquée au cercle primitif ; frottement, efforts radiaux et hélice exclus.","solution":"1. Diamètre primitif d = 150 mm = 0,150 m ; rayon r = 0,075 m ; T = 120 N·m.\n2. Équilibre des moments au centre : T = Fₜr.\n3. Fₜ = T/r = 120/0,075 = 1 600 N ; équivalent 2T/d.\n4. N·m/m = N ; à diamètre constant, Fₜ est proportionnel à T ; à T = 0, Fₜ = 0.\n5. Seuil fictif 2 500 N respecté ; les composantes radiales et les charges dynamiques restent à étudier."}},{"id":"pendulum-small-angle-period-01","min":0.2,"max":2,"lo":1.5,"hi":2.5,"iu":"m","u":"s","title":"Pendule d'essai — Période aux petits angles","policy":{"absoluteTolerance":0.01,"relativeTolerance":0,"precision":3,"assumptions":"Pendule simple ponctuel, fil inextensible sans masse, L de 0,20 à 2,00 m, g = 9,81 m/s² ; oscillations de faible amplitude (≈ 8°), sans amortissement ; approximation sinθ ≈ θ.","solution":"1. L = 1,000 m ; g = 9,81 m/s² ; amplitude faible (environ 8°).\n2. Équation linéarisée θ¨ + (g/L)θ = 0 ; pulsation propre ω₀ = √(g/L).\n3. T = 2π/ω₀ = 2π√(1/9,81) = 2,00607 s.\n4. m/(m/s²) = s² ; racine = s ; si L quadruple, T double.\n5. Période dans la plage fictive ; la formule perd de la précision aux grandes amplitudes."}},{"id":"radial-insulation-resistance-01","min":30,"max":80,"lo":2,"hi":null,"iu":"mm","u":"K/W","title":"Conduite isolée — Résistance thermique radiale","policy":{"absoluteTolerance":0.02,"relativeTolerance":0,"precision":3,"assumptions":"Conduction radiale stationnaire, cylindre de longueur L = 1 m, rayon intérieur r₁ = 25 mm, rayon extérieur r₂ de 30 à 80 mm, λ = 0,045 W/(m·K), sans pertes d'extrémité ni résistance de contact ; aucune température imposée.","solution":"1. r₁ = 25 mm = 0,025 m ; r₂ = 50 mm = 0,050 m ; L = 1 m ; λ = 0,045 W/(m·K).\n2. ln(r₂/r₁) = ln(2) = 0,693147 (sans unité).\n3. 2πλL = 2π×0,045×1 = 0,282743 W/K ; Rₜₕ = 0,693147/0,282743 = 2,45151 K/W.\n4. 1/[W/(m·K)×m] = K/W ; la résistance croît avec r₂ pour une conduction radiale seule.\n5. Objectif fictif 2 K/W respecté ; ajouter convection et températures pour estimer la puissance thermique."}}],byId=Object.fromEntries(meta.map(q=>[q.id,q]));
const models={"stokes-sphere-drag-01":x=>6*Math.PI*1*.002*(x/1000)*1000,
"magnetic-airgap-force-01":x=>x*x*2e-4/(2*4*Math.PI*1e-7),
"gear-tooth-tangential-force-01":x=>2*x/.15,
"pendulum-small-angle-period-01":x=>2*Math.PI*Math.sqrt(x/9.81),
"radial-insulation-resistance-01":x=>Math.log(x/25)/(2*Math.PI*.045)};
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(q=>[q.id,{min:q.lo,max:q.hi,unit:q.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(q=>[q.id,Object.freeze(q.policy)]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(q=>[q.id,q.iu]))));
function calculate(id,x){const q=byId[id];if(!q)return base.calculate(id,x);if(!Number.isFinite(x)||x<q.min||x>q.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y;}
function assess(id,x){const q=byId[id];if(!q)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=(q.lo??-Infinity)-1e-9&&value<=(q.hi??Infinity)+1e-9,min:q.lo,max:q.hi,unit:q.u});}
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},previous.titles,Object.fromEntries(meta.map(q=>[q.id,q.title]))));
const n=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(x1,y1,x2,y2,color='#a9d9ed',width=3,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+width+'" '+extra+'/>';
const circle=(x,y,r,fill='#315c76')=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="#9bc9e5" stroke-width="3"/>';
const text=(x,y,t)=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="16">'+t+'</text>';
const arrow=(x1,y1,x2,y2)=>line(x1,y1,x2,y2,'#7ce8ae',4,'marker-end="url(#pointe)"');
function render(id,x,y){if(!byId[id])return previous.render(id,x,y);if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('État graphique désynchronisé');
let s='';switch(id){
case 'stokes-sphere-drag-01':{
s+=circle(285,138,37)+text(280,144,'●')+text(34,42,'v = '+n(x)+' mm/s')+text(34,217,'Fᴅ = '+n(y)+' mN ; Re ≤ 0,04');
if(x>0){s+=arrow(285,80,285+85*x/10,80)+text(295,69,'v');s+=arrow(285,138,285-100*x/10,138)+text(162,160,'Fᴅ');}
break;}
case 'magnetic-airgap-force-01':{
s+='<rect x="205" y="74" width="190" height="38" rx="4" fill="#476d87" stroke="#9bc9e5"/><rect x="205" y="161" width="190" height="38" rx="4" fill="#476d87" stroke="#9bc9e5"/>';
s+=text(36,42,'B = '+n(x)+' T')+text(36,221,'F = '+n(y)+' N ; entrefer idéal')+text(420,145,'Entrefer');
if(x>0)s+=arrow(300,159,300,159-37*x/.8);
break;}
case 'gear-tooth-tangential-force-01':{
s+=circle(285,142,65)+circle(285,142,10,'#ffd17d')+line(220,142,350,142,'#507895',2)+line(285,77,285,207,'#507895',2);
s+=text(35,42,'T = '+n(x)+' N·m')+text(35,220,'Fₜ = '+n(y)+' N ; d = 150 mm');
if(x>0)s+=arrow(350,142,350,142-72*x/300)+text(366,95,'Fₜ');
break;}
case 'pendulum-small-angle-period-01':{
const len=55+65*(x-.2)/1.8,angle=8*Math.PI/180,bx=295+len*Math.sin(angle),by=49+len*Math.cos(angle);
s+=circle(295,49,7,'#ffd17d')+line(295,49,bx,by,'#cbe7f5',4)+circle(bx,by,15,'#ffca7d')+line(295,49,295,195,'#507895',2);
s+=text(35,42,'L = '+n(x)+' m')+text(35,220,'T = '+n(y)+' s ; amplitude ≈ 8°');
break;}
case 'radial-insulation-resistance-01':{
const outer=42+(x-30)*.8;
s+=circle(300,139,outer,'#477e9b')+circle(300,139,28,'#092236')+line(300,139,300+outer,139,'#ffd17d',2)+text(315,127,'r₂')+text(253,131,'r₁');
s+=text(35,42,'r₂ = '+n(x)+' mm ; r₁ = 25 mm')+text(35,221,'Rₜₕ = '+n(y)+' K/W ; ΔT non imposé');
break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 235" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma 2D paramétrique de principe non à l’échelle ; résultat et unité disponibles en texte.</desc><defs><marker id="pointe" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#7ce8ae"/></marker></defs><rect x="1" y="1" width="598" height="232" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},previous,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);

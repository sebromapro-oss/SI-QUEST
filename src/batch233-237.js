(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./investigations.js'):root.SIInvestigations;
const prior=typeof module!=='undefined'&&module.exports?require('./investigation-diagrams.js'):root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"shaft-key-shear-stress-01","title":"Clavette d'arbre — Contrainte de cisaillement","min":0,"max":400,"lo":0,"hi":25,"iu":"N·m","u":"MPa","policy":{"absoluteTolerance":0.08,"relativeTolerance":0,"precision":2,"assumptions":"Arbre d=40 mm ; clavette de largeur b=12 mm et longueur utile L=40 mm ; effort tangent uniformément réparti, un seul plan de cisaillement, pas de concentration de contraintes.","solution":"1. Couple transmis T=180 N·m ; diamètre d=40 mm=0,040 m, rayon r=0,020 m.\n2. Équilibre des moments : T=Fₜr, donc Fₜ=T/r=180/0,020=9 000 N.\n3. Aire de cisaillement A=bL=(0,012 m)×(0,040 m)=4,80×10⁻⁴ m².\n4. Contrainte moyenne τ=Fₜ/A=9 000/(4,80×10⁻⁴)=18 750 000 Pa=18,75 MPa.\n5. Vérification dimensionnelle : (N·m)/m/m²=N/m²=Pa ; à T=0, τ=0 ; τ est proportionnelle à T.\n6. Critère fictif 25 MPa respecté au nominal ; la résistance au matage et la fatigue restent à étudier."}},{"id":"transformer-winding-copper-loss-01","title":"Transformateur triphasé — Pertes cuivre","min":0,"max":40,"lo":0,"hi":500,"iu":"A","u":"W","policy":{"absoluteTolerance":2,"relativeTolerance":0,"precision":1,"assumptions":"Trois enroulements équilibrés ; résistance de chaque enroulement R=0,25 Ω à température constante ; courant efficace I entre 0 et 40 A ; pertes fer et effets thermiques exclus.","solution":"1. Courant efficace par enroulement I=20 A ; résistance R=0,25 Ω par phase.\n2. Pour un enroulement : P₁=RI²=0,25 Ω×(20 A)²=100 W.\n3. Trois enroulements identiques : Pcu=3×100 W=300 W.\n4. Contrôle dimensionnel : Ω·A²=(V/A)·A²=V·A=W.\n5. À I=0 A, Pcu=0 W ; à 40 A, Pcu=1 200 W ; doubler I multiplie les pertes par quatre.\n6. Plafond fictif 500 W respecté au nominal, mais pas à 40 A ; vérifier l'échauffement réel."}},{"id":"straight-fin-efficiency-01","title":"Ailette thermique — Efficacité d'une ailette","min":10,"max":100,"lo":0.7,"hi":1,"iu":"W/(m²·K)","u":"sans unité","policy":{"absoluteTolerance":0.01,"relativeTolerance":0,"precision":3,"assumptions":"Ailette droite uniforme de longueur L=0,080 m, largeur w=0,040 m, épaisseur e=0,002 m ; k=200 W/(m·K), h constant ; extrémité adiabatique, régime permanent, température de base imposée, rayonnement négligé ; A=we et P=2(w+e).","solution":"1. Géométrie : A=we=0,040×0,002=8,00×10⁻⁵ m² ; P=2(w+e)=2(0,040+0,002)=0,084 m.\n2. h=30 W/(m²·K), k=200 W/(m·K), L=0,080 m.\n3. m=√[hP/(kA)]=√[(30×0,084)/(200×8,00×10⁻⁵)]=√157,5=12,5499 m⁻¹.\n4. mL=12,5499×0,080=1,00399, sans unité ; η=tanh(1,00399)/1,00399≈0,760.\n5. Contrôle : 0<η≤1 ; lorsque h augmente, η diminue dans ce modèle à géométrie constante.\n6. Critère fictif η≥0,70 respecté au nominal ; ce résultat ne donne pas seul le flux thermique sans températures."}},{"id":"brake-pad-sector-pressure-01","title":"Plaquette de frein — Pression sur secteur annulaire","min":500,"max":2000,"lo":0,"hi":0.2,"iu":"N","u":"MPa","policy":{"absoluteTolerance":0.002,"relativeTolerance":0,"precision":3,"assumptions":"Une plaquette couvre un secteur annulaire de 60° (π/3 rad), rayon extérieur Re=0,160 m, intérieur Ri=0,100 m ; effort normal F uniformément réparti ; contact intégral, effets de bord et gradients de pression négligés.","solution":"1. Angle du secteur α=60°=π/3 rad ; rayons Re=0,160 m et Ri=0,100 m.\n2. Aire A=(α/2)(Re²−Ri²)=(π/6)(0,160²−0,100²) m².\n3. A=(π/6)×0,0156=0,00816814 m².\n4. Effort normal F=1 000 N ; p=F/A=1 000/0,00816814=122 426 Pa≈0,122426 MPa.\n5. Unités : N/m²=Pa ; à aire constante, doubler F double p.\n6. Critère fictif p≤0,200 MPa respecté au nominal ; la distribution réelle de pression peut être non uniforme."}},{"id":"hydrostatic-wheel-traction-01","title":"Transmission hydrostatique — Effort à la roue","min":0,"max":200,"lo":4000,"hi":null,"iu":"bar","u":"N","policy":{"absoluteTolerance":20,"relativeTolerance":0,"precision":0,"assumptions":"Pression différentielle Δp de 0 à 200 bar ; cylindrée moteur D=80 cm³/tr=80×10⁻⁶ m³/tr ; rendement mécanique ηm=0,85, réducteur i=15, rendement ηg=0,90, rayon de roue R=0,45 m ; régime quasi statique ; adhérence et pertes supplémentaires exclues.","solution":"1. Δp=120 bar=12,0×10⁶ Pa ; D=80 cm³/tr=80×10⁻⁶ m³/tr.\n2. Couple moteur idéal Cid=ΔpD/(2π)=(12,0×10⁶×80×10⁻⁶)/(2π)=152,789 N·m.\n3. Couple utile moteur Cm=ηm Cid=0,85×152,789=129,870 N·m.\n4. Couple à la roue Croue=Cm i ηg=129,870×15×0,90=1 753,25 N·m.\n5. Effort théorique F=Croue/R=1 753,25/0,45=3 896,12 N ; Pa·m³=N·m ; N·m/m=N.\n6. Objectif fictif 4 000 N non atteint au nominal ; adhérence, vitesse et stabilité restent hors modèle."}}],byId=Object.fromEntries(meta.map(q=>[q.id,q]));
const models={"shaft-key-shear-stress-01":x=>2*x/(.04*.012*.04)/1e6,
"transformer-winding-copper-loss-01":x=>3*.25*x*x,
"straight-fin-efficiency-01":x=>{let z=.08*Math.sqrt(x*.084/(200*.04*.002));return Math.tanh(z)/z},
"brake-pad-sector-pressure-01":x=>x/((Math.PI/6)*(.16**2-.10**2))/1e6,
"hydrostatic-wheel-traction-01":x=>x*1e5*80e-6/(2*Math.PI)*.85*15*.9/.45};
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(q=>[q.id,{min:q.lo,max:q.hi,unit:q.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(q=>[q.id,Object.freeze(q.policy)]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(q=>[q.id,q.iu]))));
function calculate(id,x){const q=byId[id];if(!q)return base.calculate(id,x);if(!Number.isFinite(x)||x<q.min||x>q.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y}
function assess(id,x){const q=byId[id];if(!q)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=(q.lo??-Infinity)-1e-9&&value<=(q.hi??Infinity)+1e-9,min:q.lo,max:q.hi,unit:q.u})}
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(q=>[q.id,q.title]))));

const n=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(a,b,c,d,col='#a9d9ed',w=3,extra='')=>'<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+col+'" stroke-width="'+w+'" '+extra+'/>';
const rect=(a,b,c,d,fill='#315c76')=>'<rect x="'+a+'" y="'+b+'" width="'+c+'" height="'+d+'" fill="'+fill+'" stroke="#a9d9ed" stroke-width="2"/>';
const label=(a,b,s)=>'<text x="'+a+'" y="'+b+'" fill="#fff" font-size="15">'+s+'</text>';
const arrow=(a,b,c,d)=>line(a,b,c,d,'#7ce8ae',3,'marker-end="url(#pointe)"');
function render(id,x,y){
if(!byId[id])return prior.render(id,x,y);
if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');
let z='';
switch(id){
case 'shaft-key-shear-stress-01':{
z+='<circle cx="215" cy="137" r="62" fill="#315c76" stroke="#a9d9ed" stroke-width="3"/>'+rect(265,125,27,24,'#e1a65e');
if(x>0){const len=10+45*x/400;z+=arrow(279,125,279,125-len)}
z+=label(35,39,'T = '+n(x)+' N·m ; d = 40 mm')+label(35,220,'τ = '+n(y)+' MPa ; aire b × L')+label(336,105,'Clavette : b = 12 mm')+label(336,128,'L = 40 mm ; 1 plan');break}
case 'transformer-winding-copper-loss-01':{
for(let i=0;i<3;i++){let yy=80+i*53;z+=line(112,yy,218,yy)+rect(218,yy-16,137,32,'#315c76')+line(355,yy,468,yy);if(x>0)z+=arrow(399,yy,399+12+32*x/40,yy);z+=label(35,yy+5,'Phase '+(i+1))}
z+=label(35,39,'I = '+n(x)+' A ; R = 0,25 Ω/phase')+label(35,220,'Pcu = '+n(y)+' W ; 3 enroulements');break}
case 'straight-fin-efficiency-01':{
z+=rect(105,78,48,113,'#54768a')+rect(153,117,345,34,'#477e9b');
for(let i=0;i<5;i++){let px=190+i*64;z+=line(px,105,px,117,'#ffd17d',2)+line(px,151,px,163,'#ffd17d',2)}
z+=label(35,39,'h = '+n(x)+' W/(m²·K)')+label(35,220,'η = '+n(y)+' sans unité ; bout isolé')+label(350,94,'L = 80 mm');break}
case 'brake-pad-sector-pressure-01':{
z+='<path d="M355.26 75 A110 110 0 0 1 355.26 185 L319.76 164.5 A69 69 0 0 0 319.76 95.5 Z" fill="#477e9b" stroke="#a9d9ed" stroke-width="3"/>';
z+=label(35,39,'F = '+n(x)+' N ; secteur α = 60°')+label(35,220,'p = '+n(y)+' MPa ; pression moyenne')+label(360,115,'Re = 160 mm')+label(360,140,'Ri = 100 mm');break}
case 'hydrostatic-wheel-traction-01':{
z+=rect(40,105,112,58)+rect(213,105,112,58)+rect(370,105,102,58);
z+=label(49,139,'Hydraulique')+label(234,139,'Moteur')+label(383,139,'Réducteur');
z+=line(152,134,213,134,'#8ddcff',5)+line(325,134,370,134,'#ffd17d',5);
z+='<circle cx="528" cy="145" r="44" fill="#315c76" stroke="#a9d9ed" stroke-width="3"/>'+line(484,190,579,190,'#a9d9ed',3);
if(x>0)z+=arrow(160,134,205,134)+arrow(528,190,582,190);
z+=label(35,39,'Δp = '+n(x)+' bar ; i = 15')+label(35,220,'F = '+n(y)+' N ; adhérence non modélisée');break}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 235" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma technique bidimensionnel paramétrique non à l’échelle ; grandeur calculée également disponible en texte. Représentation statique sans animation temporelle inventée.</desc><defs><marker id="pointe" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#7ce8ae"/></marker></defs><rect x="1" y="1" width="598" height="232" rx="12" fill="#092236" stroke="#507895"/>'+z+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}

const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);

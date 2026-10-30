(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./investigations.js'):root.SIInvestigations;
const prior=typeof module!=='undefined'&&module.exports?require('./investigation-diagrams.js'):root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"shaft-key-bearing-pressure-01","title":"Clavette — Pression moyenne de matage","min":0,"max":320,"lo":0,"hi":60,"iu":"N·m","u":"MPa","policy":{"absoluteTolerance":0.2,"relativeTolerance":0,"precision":2,"assumptions":"Arbre d=40 mm ; clavette h=8 mm et L=40 mm ; demi-hauteur engagée et pression uniforme ; un seul flanc chargé, effets de bord et fatigue exclus.","solution":"1. T=160 N·m, d=40 mm=0,040 m ; rayon r=d/2=0,020 m.\n2. Effort tangent Fₜ=T/r=160/0,020=8 000 N.\n3. Aire de matage A=(h/2)L=(0,008/2)×0,040=1,60×10⁻⁴ m².\n4. p=8 000/(1,60×10⁻⁴)=50×10⁶ Pa=50 MPa.\n5. Homogénéité : N/m²=Pa ; à T=0, p=0 ; doubler T double p.\n6. Seuil fictif respecté au nominal ; la distribution réelle des pressions n'est pas étudiée."}},{"id":"ultrasonic-time-of-flight-01","title":"Capteur ultrasonore — Distance par écho","min":2,"max":12,"lo":0,"hi":1.5,"iu":"ms","u":"m","policy":{"absoluteTolerance":0.01,"relativeTolerance":0,"precision":3,"assumptions":"Célérité c=343 m/s dans l'air supposée constante ; trajet rectiligne aller-retour, réflexion unique et normale ; t de 2 à 12 ms.","solution":"1. Temps t=8 ms=0,008 s ; célérité c=343 m/s.\n2. Le trajet parcouru vaut 2d=c t.\n3. d=c t/2=(343×0,008)/2=1,372 m.\n4. Homogénéité : (m/s)×s=m.\n5. À t=2 ms, d=0,343 m ; à 12 ms, d=2,058 m ; doubler t double d.\n6. L'obstacle appartient à la zone fictive d≤1,50 m ; la célérité dépend de l'environnement."}},{"id":"square-screw-lead-angle-01","title":"Vis de levage — Angle d'hélice idéal","min":1,"max":14,"lo":0,"hi":6.84277341263094,"iu":"mm","u":"°","policy":{"absoluteTolerance":0.08,"relativeTolerance":0,"precision":2,"assumptions":"Filet carré idéal, diamètre moyen dₘ=24 mm ; avance l entre 1 et 14 mm ; coefficient de frottement statique supposé μ=0,12 ; collet, usure et chocs exclus.","solution":"1. Avance l=6 mm=0,006 m ; diamètre moyen dₘ=24 mm=0,024 m.\n2. Circonférence πdₘ=0,075398 m.\n3. tan λ=0,006/0,075398=0,0795775, sans unité.\n4. λ=atan(0,0795775)=0,079410 rad=4,5499°.\n5. Angle de frottement φ=atan(0,12)=6,8428° ; λ<φ au nominal ; à 14 mm, λ≈10,519°.\n6. Le modèle ne tient compte ni du collet ni des vibrations ; aucun maintien réel n'est garanti."}},{"id":"capillary-rise-water-01","title":"Tube capillaire — Hauteur d'ascension","min":0.2,"max":1,"lo":20,"hi":null,"iu":"mm","u":"mm","policy":{"absoluteTolerance":0.3,"relativeTolerance":0,"precision":2,"assumptions":"Eau/verre parfaitement mouillant θ=0° ; γ=0,0728 N/m ; ρ=998 kg/m³ ; g=9,81 m/s² ; rayon intérieur de 0,2 à 1 mm ; équilibre statique.","solution":"1. Rayon r=0,5 mm=0,0005 m ; γ=0,0728 N/m ; θ=0° donc cos θ=1.\n2. Masse volumique ρ=998 kg/m³ ; g=9,81 m/s².\n3. h=2γ/(ρgr)=0,1456/(998×9,81×0,0005)=0,0297435 m.\n4. Conversion : h=29,7435 mm, soit 29,74 mm.\n5. Homogénéité : (N/m)/[(kg/m³)(m/s²)m]=m ; doubler r divise h par deux.\n6. Seuil fictif atteint au nominal ; à r=1 mm, h≈14,87 mm."}},{"id":"sample-hold-phase-lag-01","title":"Commande numérique — Déphasage du maintien","min":0,"max":20,"lo":-30,"hi":0,"iu":"Hz","u":"°","policy":{"absoluteTolerance":0.5,"relativeTolerance":0,"precision":1,"assumptions":"Maintien d'ordre zéro idéal, Tₛ=20 ms ; f de 0 à 20 Hz sous Nyquist 25 Hz ; phase déroulée, délais de calcul et procédé exclus.","solution":"1. Période Tₛ=20 ms=0,020 s ; f=5 Hz ; ω=2πf=31,4159 rad/s.\n2. φ=−ωTₛ/2=−31,4159×0,010=−0,314159 rad.\n3. En degrés : φ=−0,314159×180/π=−18,0°.\n4. Homogénéité : Hz×s sans dimension ; fréquence de Nyquist 1/(2Tₛ)=25 Hz.\n5. À f=0, φ=0° ; à f=20 Hz, φ=−72°.\n6. Seuil fictif de 30° respecté au nominal ; stabilité réelle non démontrée."}}],byId=Object.fromEntries(meta.map(q=>[q.id,q]));
const models={
"shaft-key-bearing-pressure-01":x=>4*x/(.04*.008*.04)/1e6,
"ultrasonic-time-of-flight-01":x=>343*x/2000,
"square-screw-lead-angle-01":x=>Math.atan(x/(Math.PI*24))*180/Math.PI,
"capillary-rise-water-01":x=>.1456/(998*9.81*x/1000)*1000,
"sample-hold-phase-lag-01":x=>-180*x*.02
};
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(q=>[q.id,{min:q.lo,max:q.hi,unit:q.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(q=>[q.id,Object.freeze(q.policy)]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(q=>[q.id,q.iu]))));
function calculate(id,x){const q=byId[id];if(!q)return base.calculate(id,x);if(!Number.isFinite(x)||x<q.min||x>q.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y}
function assess(id,x){const q=byId[id];if(!q)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=(q.lo??-Infinity)-1e-9&&value<=(q.hi??Infinity)+1e-9,min:q.lo,max:q.hi,unit:q.u})}
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(q=>[q.id,q.title]))));
const n=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const ln=(a,b,c,d,col='#a9d9ed',w=3,extra='')=>'<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+col+'" stroke-width="'+w+'" '+extra+'/>';
const ar=(a,b,c,d)=>ln(a,b,c,d,'#ffca7d',4,'marker-end="url(#pointe)"');
const tx=(a,b,t)=>'<text x="'+a+'" y="'+b+'" fill="#fff" font-size="16">'+t+'</text>';
function render(id,x,y){
if(!byId[id])return prior.render(id,x,y);
if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');
let s='';
switch(id){
case 'shaft-key-bearing-pressure-01':
s+='<circle cx="250" cy="130" r="65" fill="#315c76" stroke="#a9d9ed" stroke-width="3"/><rect x="307" y="118" width="26" height="24" fill="#dba661" stroke="#fff"/>';
if(x>0)s+=ar(321,116,321,(116-55*x/320).toFixed(3));
s+=tx(35,39,'T = '+n(x)+' N·m ; d = 40 mm')+tx(35,219,'p = '+n(y)+' MPa ; h = 8 mm ; L = 40 mm')+tx(360,120,'Flanc de clavette');break;
case 'ultrasonic-time-of-flight-01':{
const wall=190+260*(x-2)/10;
s+='<rect x="65" y="90" width="65" height="90" fill="#315c76" stroke="#a9d9ed"/><rect x="'+wall.toFixed(2)+'" y="77" width="18" height="119" fill="#dba661" stroke="#fff"/>';
s+=ar(145,110,wall-12,110)+ar(wall-12,156,145,156);
s+=tx(35,39,'t = '+n(x)+' ms ; c = 343 m/s')+tx(35,219,'d = '+n(y)+' m ; trajet aller-retour');break;}
case 'square-screw-lead-angle-01':{
const rise=330*x/(Math.PI*24);
s+=ln(135,183,485,183)+ln(135,183,465,(183-rise).toFixed(3),'#ffca7d',5)+ln(465,(183-rise).toFixed(3),465,183);
s+=tx(35,39,'l = '+n(x)+' mm ; dₘ = 24 mm')+tx(35,219,'λ = '+n(y)+'° ; μ = 0,12 ; filet carré');break;}
case 'capillary-rise-water-01':{
const top=181-y,cx=277.5,rp=5+5*x,left=cx-rp,right=cx+rp;
s+='<rect x="100" y="181" width="410" height="33" fill="#225d8a" opacity=".8"/><path d="M'+left.toFixed(3)+' 80 V209 M'+right.toFixed(3)+' 80 V209" stroke="#a9d9ed" stroke-width="5" fill="none"/>';
s+='<path data-meniscus-radius-px="'+rp.toFixed(3)+'" data-contact-angle="0" d="M'+left.toFixed(3)+' '+top.toFixed(3)+' A'+rp.toFixed(3)+' '+rp.toFixed(3)+' 0 0 0 '+right.toFixed(3)+' '+top.toFixed(3)+' L'+right.toFixed(3)+' 208 L'+left.toFixed(3)+' 208 Z" fill="#3486b6" opacity=".85"/>';
s+=ln(333,top.toFixed(3),333,181,'#ffd17d',2)+ln(327,top.toFixed(3),339,top.toFixed(3),'#ffd17d',2)+ln(327,181,339,181,'#ffd17d',2);
s+=tx(35,39,'r = '+n(x)+' mm ; γ = 0,0728 N/m')+tx(35,230,'h = '+n(y)+' mm ; θ = 0°');break;}
case 'sample-hold-phase-lag-01':{
const a=y*Math.PI/180,px=(300+68*Math.cos(a)).toFixed(3),py=(118-68*Math.sin(a)).toFixed(3);
s+='<circle cx="300" cy="118" r="68" fill="none" stroke="#517b96" stroke-width="2"/>'+ln(205,118,395,118)+ln(300,35,300,205,'#517b96',2)+ar(300,118,px,py);
s+=tx(35,39,'f = '+n(x)+' Hz ; Tₛ = 20 ms')+tx(35,220,'φ = '+n(y)+'° ; retard ZOH');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 235" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma technique 2D paramétrique de principe ; résultat disponible en texte ; aucune animation temporelle.</desc><defs><marker id="pointe" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#ffca7d"/></marker></defs><rect x="1" y="1" width="598" height="232" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);
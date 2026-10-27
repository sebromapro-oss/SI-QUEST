(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./batch253-257.js').physics:root.SIInvestigations;
const prior=typeof module!=='undefined'&&module.exports?require('./batch253-257.js').diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"screw-jack-self-locking-01","title":"Vis de levage — Marge d'autoblocage","min":0.02,"max":0.35,"lo":0,"hi":10,"iu":"μ (sans unité)","u":"°","policy":{"absoluteTolerance":0.15,"relativeTolerance":0,"precision":4,"assumptions":"Vis carrée idéale, frottement sec constant, angle d'hélice λ=6°, sans frottement de butée ni vibrations ; μ de 0,02 à 0,35 ; angles affichés en degrés.","solution":"1. Données : μ=0,20, sans unité ; angle d'hélice λ=6°.\n2. Angle de frottement : φ=arctan(0,20)=11,309932°.\n3. Marge : m=φ−λ=11,309932−6=5,309932°.\n4. Dimension : l'arctangente d'un nombre sans dimension donne un angle ; soustraction en degrés.\n5. Limite d'autoblocage : μ=tan(6°)≈0,105104 donne m=0° ; si μ est inférieur, pas d'autoblocage théorique.\n6. Décision fictive : marge positive et inférieure à 10° ; contrôler l'usure, la lubrification, les vibrations et les dispositifs de retenue indépendants."}},{"id":"sensor-hysteresis-fullscale-01","title":"Capteur — Hystérésis sur pleine échelle","min":0,"max":0.6,"lo":0,"hi":2,"iu":"mA","u":"%","policy":{"absoluteTolerance":0.05,"relativeTolerance":0,"precision":4,"assumptions":"Étendue de sortie de 16 mA ; écart maximal ΔI de 0 à 0,60 mA mesuré à entrée identique ; linéarité et incertitudes non évaluées.","solution":"1. Sortie basse 4 mA, sortie haute 20 mA.\n2. Étendue de sortie : 20−4=16 mA.\n3. Écart maximal montée-descente à même entrée : ΔI=0,24 mA.\n4. Rapport H=100×0,24/16=1,50 %.\n5. Vérification : mA/mA est sans dimension ; si ΔI=0, H=0 % ; si ΔI=0,60 mA, H=3,75 %.\n6. Décision fictive : 1,50 % respecte 2 % ; la répétabilité, la dérive et l'incertitude de mesure restent à contrôler."}},{"id":"gear-backlash-pitch-01","title":"Engrenage — Jeu au cercle primitif","min":0,"max":2,"lo":0,"hi":1.2,"iu":"°","u":"mm","policy":{"absoluteTolerance":0.025,"relativeTolerance":0,"precision":4,"assumptions":"Rayon primitif r=60 mm ; angle de rotation libre entre 0° et 2° ; géométrie rigide, sans déformation des dents ; jeu tangentiel théorique.","solution":"1. Rayon primitif r=60 mm=0,060 m ; rotation libre θ=0,80°.\n2. Conversion : θ=0,80×π/180=0,013962634 rad.\n3. Longueur d'arc j=rθ=60×0,013962634=0,837758 mm.\n4. Contrôle SI : 0,060 m×0,013962634=0,000837758 m ; radian sans dimension.\n5. À 0°, j=0 ; à 2°, j=2,094395 mm ; proportionnalité exacte pour la longueur d'arc.\n6. Décision fictive : 0,838 mm respecte 1,20 mm ; vérifier ensuite le module, l'entraxe et les prescriptions réelles."}},{"id":"hydraulic-filter-captured-mass-01","title":"Filtre hydraulique — Masse de particules retenues","min":0,"max":20,"lo":0,"hi":40,"iu":"mg/L","u":"g","policy":{"absoluteTolerance":0.5,"relativeTolerance":0,"precision":4,"assumptions":"Concentration amont de 0 à 20 mg/L, débit constant 25 L/min, durée 120 min, fraction captée η=0,95 ; ni colmatage, ni relargage, ni variation de concentration.","solution":"1. Concentration c=8 mg/L ; débit Q=25 L/min ; durée t=120 min ; η=0,95.\n2. Volume traité : V=Qt=25×120=3 000 L.\n3. Masse entrante : mentrée=cV=8×3 000=24 000 mg.\n4. Masse retenue : m=0,95×24 000=22 800 mg=22,8 g.\n5. Contrôle dimensionnel : (mg/L)×(L/min)×min=mg ; à c=0, m=0 ; à c=20 mg/L, m=57 g.\n6. Décision fictive : 22,8 g respecte 40 g ; vérifier la capacité, le colmatage et la pression différentielle réelle."}},{"id":"transformer-load-voltage-01","title":"Transformateur — Tension en charge simplifiée","min":0,"max":50,"lo":224,"hi":230,"iu":"A","u":"V","policy":{"absoluteTolerance":0.2,"relativeTolerance":0,"precision":4,"assumptions":"Secondaire représenté par U0=230 V efficaces et Req=0,18 Ω ; I de 0 à 50 A ; facteur de puissance voisin de 1 ; réactance, saturation et échauffement négligés.","solution":"1. Modèle de Thévenin : U0=230 V et Req=0,18 Ω.\n2. Courant nominal I=20 A.\n3. Chute résistive : ΔU=Req×I=0,18×20=3,60 V.\n4. Tension en charge : U=U0−ΔU=230−3,60=226,40 V.\n5. Contrôle SI : Ω×A=V ; à I=0, U=230 V ; à I=50 A, U=221 V.\n6. Décision fictive : 226,40 V respecte [224 ; 230] V ; le transformateur réel impose de mesurer aussi réactance, échauffement et facteur de puissance."}}];
const byId=Object.fromEntries(meta.map(m=>[m.id,m]));
const models={"screw-jack-self-locking-01":x=>Math.atan(x)*180/Math.PI-6,"sensor-hysteresis-fullscale-01":x=>100*x/16,"gear-backlash-pitch-01":x=>60*x*Math.PI/180,"hydraulic-filter-captured-mass-01":x=>x*25*120*.95/1000,"transformer-load-voltage-01":x=>230-.18*x};
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(m=>[m.id,{min:m.lo,max:m.hi,unit:m.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(m=>[m.id,Object.freeze(m.policy)]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(m=>[m.id,m.iu]))));
function calculate(id,x){const m=byId[id];if(!m)return base.calculate(id,x);if(!Number.isFinite(x)||x<m.min||x>m.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y}
function assess(id,x){const m=byId[id];if(!m)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=m.lo-1e-9&&value<=m.hi+1e-9,min:m.lo,max:m.hi,unit:m.u})}
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(m=>[m.id,m.title]))));
const n=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(a,b,c,d,col='#a9d9ed',w=3,extra='')=>'<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+col+'" stroke-width="'+w+'" '+extra+'/>';
const label=(a,b,t)=>'<text x="'+a+'" y="'+b+'" fill="#fff" font-size="16">'+t+'</text>';
function render(id,x,y){
if(!byId[id])return prior.render(id,x,y);
if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');
let s='';
switch(id){
case 'screw-jack-self-locking-01':{
 const phi=Math.atan(x),lam=6*Math.PI/180,ox=210,oy=166,R=168;
 s+=line(85,166,465,166,'#8bb6d0',2)+line(ox,oy,ox+R*Math.cos(lam),oy-R*Math.sin(lam),'#ffd17d',4);
 s+=line(ox,oy,ox+R*Math.cos(phi),oy-R*Math.sin(phi),'#7ce8ae',4);
 s+=label(22,42,'μ = '+n(x)+' ; λ = 6°')+label(22,68,'φ = '+n(phi*180/Math.PI)+'°')+label(22,226,'Marge φ − λ = '+n(y)+'°');
 s+='<circle cx="'+ox+'" cy="'+oy+'" r="6" fill="#fff"/><g data-angle-frottement-deg="'+(phi*180/Math.PI).toFixed(6)+'" data-angle-helice-deg="6"></g>';break;}
case 'sensor-hysteresis-fullscale-01':{
 const d=Number((28*x/.6).toFixed(3));
 s+=line(100,200,100,65)+line(100,200,510,200);
 s+=line(140,177-d,450,84-d,'#7ce8ae',4)+line(140,177+d,450,84+d,'#ffd17d',4);
 if(x>0)s+=line(300,129-d,300,129+d,'#fff',2,'data-ecart-px="'+(2*d).toFixed(3)+'"');
 s+=label(20,40,'ΔImax = '+n(x)+' mA ; étendue = 16 mA')+label(370,176,'montée / descente')+label(20,226,'H = '+n(y)+' % pleine échelle');break;}
case 'gear-backlash-pitch-01':{
 const w=Number((150*x/2).toFixed(3));
 s+='<circle cx="230" cy="133" r="66" fill="none" stroke="#a9d9ed" stroke-width="5"/><circle cx="230" cy="133" r="6" fill="#ffd17d"/>';
 s+=line(230,133,296,133,'#ffd17d',3)+line(296,65,296,200,'#7ce8ae',2);
 if(x>0)s+='<rect x="360" y="132" width="'+w+'" height="15" fill="#7ce8ae" data-jeu-largeur-px="'+w+'"/>';
 s+=label(25,38,'Rayon primitif r = 60 mm')+label(25,62,'Jeu angulaire θ = '+n(x)+'°')+label(355,119,'Échelle de jeu linéaire')+label(25,226,'Arc au primitif j = '+n(y)+' mm');break;}
case 'hydraulic-filter-captured-mass-01':{
 const w=Number((140*y/57).toFixed(3));
 s+=line(60,129,218,129,'#8ddcff',10)+line(375,129,540,129,'#8ddcff',10);
 s+='<rect x="218" y="85" width="157" height="91" rx="9" fill="#294b63" stroke="#ffd17d" stroke-width="4"/>';
 for(let k=0;k<5;k++)s+=line(245+k*24,92,245+k*24,169,'#7ce8ae',3);
 if(y>0)s+='<rect x="70" y="195" width="'+w+'" height="11" fill="#ffd17d" data-masse-largeur-px="'+w+'"/>';
 s+=label(25,38,'c = '+n(x)+' mg/L ; Q = 25 L/min')+label(25,64,'t = 120 min ; η = 95 %')+label(25,226,'Masse captée = '+n(y)+' g');break;}
case 'transformer-load-voltage-01':{
 s+=line(115,95,250,95)+line(338,95,475,95)+line(115,185,475,185);
 s+='<rect x="250" y="78" width="88" height="34" fill="#294b63" stroke="#ffd17d" stroke-width="3"/>';
 s+=line(115,95,115,126)+line(95,126,135,126,'#ffd17d',4)+line(102,142,128,142,'#ffd17d',4)+line(115,142,115,185);
 s+=line(475,95,475,114)+'<rect x="456" y="114" width="38" height="49" fill="#294b63" stroke="#7ce8ae" stroke-width="3"/>'+line(475,163,475,185);
 s+=label(25,38,'U₀ = 230 V ; Rₑq = 0,18 Ω')+label(25,63,'I = '+n(x)+' A ; charge résistive')+label(262,72,'Rₑq')+label(25,226,'U charge = '+n(y)+' V');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma bidimensionnel paramétrique, sans animation temporelle. Valeurs accessibles en texte ; barres schématiques non à l’échelle physique.</desc><rect x="1" y="1" width="598" height="238" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);

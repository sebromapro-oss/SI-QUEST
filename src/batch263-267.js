(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./batch258-262.js').physics:root.SIInvestigations;
const prior=typeof module!=='undefined'&&module.exports?require('./batch258-262.js').diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"bearing-static-safety-01","title":"Roulement — Coefficient de sécurité statique","min":5000,"max":40000,"lo":2,"hi":12,"iu":"N","u":"sans unité","policy":{"absoluteTolerance":0.05,"relativeTolerance":0,"precision":3,"assumptions":"Capacité statique de base C₀=45 000 N ; P₀ entre 5 000 et 40 000 N déjà déterminée selon la géométrie du roulement ; pas de chocs ni de correction constructeur.","solution":"Données : C₀=45 000 N ; P₀=15 000 N.\nRelation : S₀=C₀/P₀.\nSubstitution : S₀=45 000/15 000=3,000, sans unité.\nHomogénéité : N/N=1 ; si P₀ double, S₀ est divisé par deux.\nÀ P₀=40 000 N, S₀=1,125 ; la réserve diminue avec la charge.\nDécision fictive : 3,000 ≥ 2,0 ; vérifier les efforts réels, chocs et prescriptions constructeur."}},{"id":"vibration-critical-damping-01","title":"Support antivibratoire — Amortissement critique","min":25,"max":400,"lo":0,"hi":5000,"iu":"kg","u":"N·s/m","policy":{"absoluteTolerance":50,"relativeTolerance":0,"precision":2,"assumptions":"Système linéaire à un degré de liberté ; k=40 000 N/m ; masse de 25 à 400 kg ; amortissement visqueux équivalent ; sans excitation extérieure dans le calcul.","solution":"Données : k=40 000 N/m ; m=100 kg.\nRelation : ccrit=2√(km).\nCalcul : km=4 000 000 kg·N/m ; √(km)=2 000 kg/s.\nRésultat : ccrit=4 000 N·s/m ; N·s/m=kg/s.\nSi m=400 kg, ccrit=8 000 N·s/m ; dépendance en √m. Le cas critique correspond à un taux d’amortissement réduit ζ=1.\nDécision fictive : 4 000 ≤ 5 000 ; le choix d'un amortisseur exige ses caractéristiques réelles."}},{"id":"material-thermal-effusivity-01","title":"Matériau — Effusivité thermique","min":0.2,"max":3,"lo":800,"hi":2000,"iu":"W/(m·K)","u":"W·√s/(m²·K)","policy":{"absoluteTolerance":10,"relativeTolerance":0,"precision":2,"assumptions":"Matériau homogène isotrope ; ρ=900 kg/m³, cₚ=1 000 J/(kg·K), λ de 0,2 à 3 W/(m·K) ; propriétés constantes, régime local semi-infini.","solution":"Données : λ=1,00 W/(m·K), ρ=900 kg/m³, cₚ=1 000 J/(kg·K).\nRelation : e=√(λρcₚ).\nProduit : λρcₚ=900 000 W·J/(m⁴·K²).\nRacine : e=948,683 W·√s/(m²·K), puisque J=W·s.\nSi λ est multipliée par quatre, e est multipliée par deux.\nDécision fictive : 948,683 ≥ 800 ; vérifier les conditions de contact et les données matière."}},{"id":"metrology-worstcase-stack-01","title":"Montage — Jeu minimal en pire cas","min":79.8,"max":80.4,"lo":0.05,"hi":1,"iu":"mm","u":"mm","policy":{"absoluteTolerance":0.01,"relativeTolerance":0,"precision":3,"assumptions":"Chaîne axiale unidimensionnelle ; A nominal variable de 79,80 à 80,40 mm avec ±0,10 mm ; B=30,00±0,05 mm ; C=49,70±0,08 mm ; pas de dilatation ni de défaut géométrique.","solution":"A=80,00±0,10 mm ; B=30,00±0,05 mm ; C=49,70±0,08 mm.\nExtrêmes : Amin=79,90 mm ; Bmax=30,05 mm ; Cmax=49,78 mm.\nRelation : Jmin=Amin−Bmax−Cmax.\nSubstitution : Jmin=79,90−30,05−49,78=+0,07 mm.\nSi A=79,80 mm, Jmin=−0,13 mm : interférence possible ; le schéma amplifie le jeu.\nDécision fictive : +0,07 ≥ 0,05 mm ; confirmer les tolérances géométriques et les mesures."}},{"id":"hydraulic-wave-roundtrip-01","title":"Conduite — Temps aller-retour d'une onde","min":5,"max":100,"lo":0,"hi":80,"iu":"m","u":"ms","policy":{"absoluteTolerance":1,"relativeTolerance":0,"precision":3,"assumptions":"Conduite droite de longueur L entre 5 et 100 m ; célérité supposée constante a=1 200 m/s ; réflexion idéale en extrémité ; dispersion et pertes négligées.","solution":"Longueur L=30 m ; célérité a=1 200 m/s.\nL'onde parcourt L jusqu'à l'extrémité puis L au retour, soit 2L=60 m.\nRelation : t=2L/a=60/1 200=0,0500 s.\nConversion : 0,0500 s=50,0 ms ; m/(m/s)=s.\nÀ L=100 m, t=166,667 ms ; le temps est proportionnel à la longueur.\nDécision fictive : 50,0 ≤ 80 ms ; la surpression nécessite un autre modèle."}}];
const byId=Object.fromEntries(meta.map(m=>[m.id,m]));
const models={"bearing-static-safety-01":x=>45000/x,"vibration-critical-damping-01":x=>2*Math.sqrt(40000*x),"material-thermal-effusivity-01":x=>Math.sqrt(x*900*1000),"metrology-worstcase-stack-01":x=>(x-.1)-30.05-49.78,"hydraulic-wave-roundtrip-01":x=>2000*x/1200};
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
case 'bearing-static-safety-01':{
 const h=Number((25+65*(x-5000)/35000).toFixed(3));
 s+='<circle cx="315" cy="155" r="45" fill="none" stroke="#a9d9ed" stroke-width="9"/><circle cx="315" cy="155" r="20" fill="none" stroke="#ffd17d" stroke-width="5"/>';
 s+=line(315,110-h,315,110,'#ffb68a',5,'marker-end="url(#arr)" data-charge-longueur-px="'+h+'"');
 s+=label(22,40,'C₀ = 45 000 N ; P₀ = '+n(x)+' N')+label(22,65,'Effort radial équivalent déjà déterminé')+label(22,224,'S₀ = '+n(y)+' (sans unité)');break;}
case 'vibration-critical-damping-01':{
 const w=Number((80+4*Math.sqrt(x)).toFixed(3));
 s+='<rect x="230" y="74" width="'+w+'" height="48" fill="#41647b" stroke="#ffd17d" stroke-width="3"/>';
 s+=line(260,122,260,136)+line(260,136,244,146)+line(244,146,276,157)+line(276,157,244,168)+line(244,168,260,181);
 s+=line(355,122,355,140)+line(340,140,370,140)+line(355,140,355,165)+line(338,165,372,165)+line(338,165,338,181)+line(372,165,372,181);
 s+=line(200,185,455,185,'#b8cbd9',5);
 s+=label(22,40,'k = 40 000 N/m ; m = '+n(x)+' kg')+label(22,65,'Masse – ressort – amortisseur idéal')+label(22,224,'c critique = '+n(y)+' N·s/m');break;}
case 'material-thermal-effusivity-01':{
 const w=Number((390*y/Math.sqrt(2700000)).toFixed(3));
 s+='<rect x="225" y="80" width="150" height="82" fill="#426878" stroke="#ffd17d" stroke-width="3"/>';
 for(let k=0;k<6;k++)s+=line(231+k*24,86,231+k*24,155,'#7ce8ae',2);
 s+='<rect x="85" y="184" width="'+w+'" height="12" fill="#7ce8ae" data-effusivite-largeur-px="'+w+'"/>';
 s+=label(22,40,'λ = '+n(x)+' W/(m·K)')+label(22,64,'ρ = 900 kg/m³ ; cₚ = 1 000 J/(kg·K)')+label(22,224,'e = '+n(y)+' W·√s/(m²·K)');break;}
case 'metrology-worstcase-stack-01':{
 const gap=Number((Math.abs(y)*90/.47).toFixed(3)),positive=y>=0;
 s+='<rect x="90" y="100" width="144" height="42" fill="#32566d" stroke="#ffd17d" stroke-width="2"/><rect x="234" y="100" width="239" height="42" fill="#32566d" stroke="#7ce8ae" stroke-width="2"/>';
 s+=label(140,127,'B')+label(345,127,'C');
 if(gap>0)s+='<rect x="'+(positive?473:(473-gap))+'" y="100" width="'+gap+'" height="42" fill="'+(positive?'#7ce8ae':'#ff9999')+'" data-jeu-amplifie-px="'+gap+'"/>';
 s+=label(22,40,'A nominal = '+n(x)+' mm ; A ± 0,10 mm')+label(22,65,'B = 30,00 ± 0,05 ; C = 49,70 ± 0,08 mm')+label(22,179,'Jeu représenté avec amplification graphique')+label(22,224,'J minimum = '+n(y)+' mm ('+(positive?'jeu':'serrage possible')+')');break;}
case 'hydraulic-wave-roundtrip-01':{
 const w=Number((3.5*x).toFixed(3)),end=110+w;
 s+=line(110,107,end,107,'#8ddcff',8)+line(110,151,end,151,'#8ddcff',8)+line(end,100,end,160,'#ffd17d',5);
 s+=line(120,116,end-5,116,'#7ce8ae',3,'marker-end="url(#arr)"');
 s+=line(end-5,143,120,143,'#ffb68a',3,'marker-end="url(#arr)"');
 s+=label(22,40,'Longueur L = '+n(x)+' m ; a = 1 200 m/s')+label(22,65,'Trajet de l’onde : aller puis retour')+label(22,224,'t aller-retour = '+n(y)+' ms');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma technique 2D paramétrique, sans animation temporelle ; valeurs accessibles en texte. Dessin de principe non à l’échelle, jeu amplifié si indiqué.</desc><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#ffb68a" stroke-width="1.5"/></marker></defs><rect x="1" y="1" width="598" height="238" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);
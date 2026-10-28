(function(root){'use strict';
const prev=typeof module!=='undefined'&&module.exports?require('./batch338-342.js'):null;
const base=prev?prev.physics:root.SIInvestigations,prior=prev?prev.diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"hydraulic-throttle-temperature-rise-01","world":"SI-06","title":"Étranglement hydraulique — Échauffement idéal de l'huile","subskill":"Élévation thermique adiabatique liée à une chute de pression d'un liquide incompressible","context":"Un technicien mesure une chute de pression sur un étranglement d'un banc hydraulique et estime l'échauffement local de l'huile.","objective":"Calculer ΔT et vérifier la validité d'un bilan énergétique stationnaire.","prereq":"Bar et pascal ; masse volumique ; chaleur massique ; conservation de l'énergie.","flash":["Combien de pascals vaut 1 bar ?","Quelle unité a ρ cₚ ?","Pourquoi ne calcule-t-on pas la température de toute la cuve ?"],"formula":"ΔT=Δp/(ρ cₚ)","assumptions":"Huile incompressible idéale : ρ=850 kg/m³ ; cₚ=2 000 J/(kg·K). Perte Δp de 20 à 120 bar. Écoulement stationnaire et adiabatique, variations de vitesse et de hauteur négligées ; dissipation locale complète de l'énergie de pression. ΔT est un écart en K.","min":20,"max":120,"initial":80,"iu":"bar","u":"K","tol":0.06,"lo":0,"hi":5,"precision":4,"decision":"Plafond fictif ΔT≤5 K. Vérifier les mesures et propriétés réelles avant tout diagnostic.","error":"Oublier bar→Pa ou assimiler ΔT à une température absolue.","solution":"Δp=80 bar=8 000 000 Pa ; ρcₚ=850×2 000=1 700 000 J/(m³·K). ΔT=8 000 000/1 700 000=4,70588 K. Contrôle : ρcₚΔT=8 MPa. Plafond fictif respecté."},{"id":"cantilever-uniform-load-tip-deflection-01","world":"SI-04","title":"Console — Flèche sous charge uniformément répartie","subskill":"Flèche en bout d'une console d'Euler-Bernoulli sous charge répartie constante","context":"Un mécanicien vérifie la déformation d'un support encastré soumis au poids uniformément réparti d'un carter.","objective":"Déterminer la flèche en bout, avec la bonne condition d'encastrement.","prereq":"Charge linéique ; rigidité EI ; déformée ; conversions m/mm.","flash":["Qu'impose un encastrement au déplacement ?","Quelle unité donne qL⁴/(EI) ?","Pourquoi la formule bi-appuyée ne convient-elle pas ?"],"formula":"δ=qL⁴/(8EI)","assumptions":"Console de L=1,20 m encastrée à gauche, charge verticale q de 200 à 800 N/m vers le bas ; E=210 GPa, I=1,0×10⁻⁶ m⁴. Euler-Bernoulli, petites déformations, poids propre négligé. Flèche positive vers le bas, affichée en mm.","min":200,"max":800,"initial":600,"iu":"N/m","u":"mm","tol":0.02,"lo":0,"hi":0.8,"precision":4,"decision":"Limite fictive de service δ≤0,80 mm. Vérifier contraintes et assemblages réels.","error":"Employer la formule bi-appuyée ou oublier la conversion m→mm.","solution":"L⁴=2,0736 m⁴ ; EI=210 000 N·m² ; δ=600×2,0736/(8×210 000)=0,000740571 m=0,740571 mm. Contrôle dimensionnel : (N/m)m⁴/(N·m²)=m. Limite fictive respectée."},{"id":"faraday-flux-rate-emf-01","world":"SI-08","title":"Induction — FEM par variation de flux","subskill":"Force électromotrice induite par une variation uniforme du flux lié","context":"Un électrotechnicien étudie la FEM aux bornes d'une bobine de 250 spires soumise à un flux variable.","objective":"Calculer le module de la FEM et expliquer le signe de Faraday-Lenz.","prereq":"Flux magnétique en Wb ; dérivée temporelle ; spires ; volt.","flash":["Quelle unité a Wb/s ?","Que traduit le signe moins de Lenz ?","Le flux est-il défini par spire ?"],"formula":"e=−N dΦ/dt ; |e|=N|dΦ/dt|","assumptions":"N=250 spires identiques ; flux par spire croissant uniformément, dΦ/dt de 2 à 12 mWb/s. Couplage parfait, bobine ouverte, pas de pertes. Réponse : module |e| en V ; FEM algébrique négative.","min":2,"max":12,"initial":6,"iu":"mWb/s","u":"V","tol":0.03,"lo":0,"hi":2,"precision":3,"decision":"Seuil fictif |e|≤2 V. Contrôler l'impédance et les mesures sur bobine réelle.","error":"Oublier mWb→Wb ou confondre module et FEM signée.","solution":"dΦ/dt=6 mWb/s=0,006 Wb/s ; e=−250×0,006=−1,50 V ; |e|=1,50 V. Wb/s=V. La FEM s'oppose à l'augmentation du flux. Seuil fictif respecté."},{"id":"planetary-fixed-ring-reaction-torque-01","world":"SI-05","title":"Train épicycloïdal — Réaction de couronne fixe","subskill":"Réaction de couple d'une couronne immobilisée dans un train planétaire idéal","context":"Un technicien vérifie le couple repris par le carter d'un train planétaire à couronne immobilisée.","objective":"Déterminer le module de réaction de la couronne et contrôler le bilan de puissance.","prereq":"Couples ; nombres de dents ; relation de Willis ; puissance Tω.","flash":["Quelle vitesse a la couronne fixe ?","Une réaction à vitesse nulle fournit-elle de la puissance ?","Quel rapport de dents intervient ?"],"formula":"|Tᵣ|=(Zᵣ/Zₛ)|Tₛ|","assumptions":"Train idéal à couronne interne Zᵣ=72 dents, soleil Zₛ=24, satellites Zₚ=24, même module ; couronne fixe, soleil moteur, porte-satellites en sortie ; Tₛ positif de 20 à 100 N·m. Pas de pertes ni inerties ; module de réaction au carter demandé.","min":20,"max":100,"initial":60,"iu":"N·m","u":"N·m","tol":2,"lo":0,"hi":220,"precision":2,"decision":"Limite fictive de fixation |Tᵣ|≤220 N·m. Contrôler transitoires et assemblages réels.","error":"Confondre couple de sortie et couple de réaction, ou oublier ωᵣ=0.","solution":"Zᵣ/Zₛ=72/24=3 ; |Tᵣ|=3×60=180 N·m. Couple idéal de sortie : 240 N·m ; vitesse de sortie ωₛ/4, donc 240×ωₛ/4=60×ωₛ. Couronne fixe : puissance nulle. Limite fictive respectée."},{"id":"quarter-bridge-linearization-error-01","world":"SI-13","title":"Jauge — Erreur de linéarisation du quart de pont","subskill":"Sensibilité électrique d'un quart de pont","context":"Un métrologue compare la tension exacte d'un quart de pont à son approximation linéaire.","objective":"Calculer l'erreur relative de linéarisation, rapportée à la tension linéaire.","prereq":"Facteur de jauge ; µε ; pont diviseur ; écart relatif.","flash":["Que vaut 1 µε en valeur sans dimension ?","Pourquoi le pont n'est-il pas strictement linéaire ?","Quel dénominateur utilise-t-on pour l'écart ?"],"formula":"δₗ=100×(|Vₗ|−|Vₑ|)/|Vₗ|","assumptions":"Quart de pont idéal, une jauge active en bras supérieur, trois résistances fixes identiques ; Vs=5 V, GF=2, ε de 500 à 4 000 µε en traction ; g=GFε ; |Vₑ|=Vs g/[2(2+g)], |Vₗ|=Vs g/4. Écart positif en %, sans compensation thermique ni fils.","min":500,"max":4000,"initial":2000,"iu":"µε","u":"%","tol":0.012,"lo":0,"hi":0.3,"precision":5,"decision":"Critère fictif δₗ≤0,30 %. Vérifier la chaîne métrologique réelle et l'étalonnage.","error":"Confondre µε et %, ou diviser par la tension exacte.","solution":"ε=2 000 µε=0,002 ; g=2×0,002=0,004 ; |Vₗ|=5×0,004/4=5,000 mV ; |Vₑ|=5×0,004/[2×2,004]=4,99002 mV ; δₗ=100×(5−4,99002)/5=0,199601 %. Critère fictif respecté."}];
const byId=Object.fromEntries(meta.map(a=>[a.id,a]));
const models={
'hydraulic-throttle-temperature-rise-01':x=>x*1e5/(850*2000),
'cantilever-uniform-load-tip-deflection-01':x=>x*1.2**4/(8*210e9*1e-6)*1000,
'faraday-flux-rate-emf-01':x=>250*x*1e-3,
'planetary-fixed-ring-reaction-torque-01':x=>x*72/24,
'quarter-bridge-linearization-error-01':x=>{const g=2*x*1e-6;return 100*g/(2+g)}
};
function calculate(id,x){const a=byId[id];if(!a)return base.calculate(id,x);if(!Number.isFinite(x)||x<a.min||x>a.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y;}
function assess(id,x){const a=byId[id];if(!a)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=a.lo&&value<=a.hi,min:a.lo,max:a.hi,unit:a.u});}
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(a=>[a.id,{min:a.lo,max:a.hi,unit:a.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(a=>[a.id,{absoluteTolerance:a.tol,relativeTolerance:0,precision:a.precision,assumptions:a.assumptions,solution:a.solution}]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(a=>[a.id,a.iu]))));
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(a=>[a.id,a.title]))));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const N=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const L=(x1,y1,x2,y2,c='#8ddcff',w=3,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+w+'" '+extra+'/>';
const T=(x,y,s)=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="14">'+esc(s)+'</text>';
const bar=(x,y,w,attr)=>'<rect x="'+x+'" y="'+y+'" width="'+w.toFixed(5)+'" height="18" rx="3" fill="#7ce8ae" '+attr+'="'+w.toFixed(5)+'"/>';
function render(id,x,y){const a=byId[id];if(!a)return prior.render(id,x,y);if(!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');
let s='',w=0;
switch(id){
case 'hydraulic-throttle-temperature-rise-01':
w=30*y;s=T(40,38,'Étranglement : ρ=850 kg/m³ ; cₚ=2 000 J/(kg·K)')+T(40,63,'Δp='+N(x)+' bar ; ΔT='+N(y)+' K')+
L(75,145,255,145,'#8ddcff',14)+L(345,145,525,145,'#8ddcff',14)+
'<path d="M255 112 L300 145 L255 178 Z M345 112 L300 145 L345 178 Z" fill="#24435c" stroke="#ffca7d" stroke-width="3"/>'+
L(105,145,210,145,'#7ce8ae',3,'marker-end="url(#a-'+id+')"')+
L(385,145,490,145,'#7ce8ae',3,'marker-end="url(#a-'+id+')"')+
T(60,113,'Amont')+T(425,113,'Aval')+T(255,210,'Perte Δp')+bar(85,242,w,'data-rise-px')+T(350,255,'30 px/K (échelle de ΔT)');break;
case 'cantilever-uniform-load-tip-deflection-01':{
w=36*y;const pts=[];for(let i=0;i<=24;i++){const t=i/24,dy=w*t*t*(6-4*t+t*t)/3;pts.push((i?'L':'M')+(110+350*t).toFixed(2)+' '+(120+dy).toFixed(2));}
s=T(35,38,'Console : L=1,20 m ; E=210 GPa ; I=10⁻⁶ m⁴')+T(35,63,'q='+N(x)+' N/m ; δ='+N(y)+' mm')+
'<rect x="85" y="91" width="24" height="102" fill="#507895"/>'+L(110,120,460,120,'#8ddcff',3,'stroke-dasharray="8 6"')+
'<path d="'+pts.join(' ')+'" stroke="#7ce8ae" stroke-width="6" fill="none" data-tip-px="'+w.toFixed(5)+'"/>'+
[170,230,290,350,410].map(px=>L(px,85,px,113,'#ffca7d',3,'marker-end="url(#a-'+id+')"')).join('')+
T(145,217,'Charge répartie verticale vers le bas')+T(45,265,'Déformée amplifiée ×123 ; flèche positive vers le bas');break;}
case 'faraday-flux-rate-emf-01':
w=65*y;s=T(40,38,'Bobine : N=250 spires ; flux par spire croissant')+T(40,63,'dΦ/dt='+N(x)+' mWb/s ; |e|='+N(y)+' V')+
L(80,150,180,150,'#8ddcff',4)+L(410,150,520,150,'#8ddcff',4)+
[0,1,2,3,4].map(i=>'<ellipse cx="'+(208+i*43)+'" cy="150" rx="18" ry="42" fill="none" stroke="#ffca7d" stroke-width="4"/>').join('')+
L(230,150,395,150,'#7ce8ae',4,'marker-end="url(#a-'+id+')"')+
T(240,120,'Flux Φ croissant →')+T(65,215,'e algébrique négative (Lenz)')+bar(90,243,w,'data-emf-px')+T(370,257,'65 px/V ; module |e|');break;
case 'planetary-fixed-ring-reaction-torque-01':
w=.65*y;s=T(35,35,'Train idéal : Zsoleil=24 ; Zcouronne=72 ; Zsatellite=24')+T(35,58,'Tsoleil='+N(x)+' N·m ; |Tréaction|='+N(y)+' N·m')+
'<circle cx="205" cy="162" r="90" fill="none" stroke="#ffca7d" stroke-width="7"/>'+
'<circle cx="205" cy="162" r="30" fill="#1c465f" stroke="#8ddcff" stroke-width="4"/>'+
[[265,162],[145,162],[205,102],[205,222]].map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="30" fill="#24435c" stroke="#7ce8ae" stroke-width="3"/>').join('')+
'<circle cx="205" cy="162" r="7" fill="#ffd17d"/>'+
T(345,120,'Couronne immobilisée : ωr=0')+T(345,145,'Cercles primitifs : rs:rp:rr')+T(345,167,'= 24:24:72 (même module)')+
bar(345,205,w,'data-reaction-px')+T(345,248,'0,65 px/(N·m)');break;
case 'quarter-bridge-linearization-error-01':{
w=450*y;const g=2*x*1e-6,vl=5*g/4*1000,ve=5*g/(2*(2+g))*1000;
s=T(40,38,'Quart de pont : Vs=5 V ; GF=2 ; jauge active')+T(40,63,'ε='+N(x)+' µε ; écart relatif='+N(y)+' %')+
'<rect x="70" y="105" width="470" height="110" rx="10" fill="#153e56" stroke="#8ddcff"/>'+
T(95,137,'Linéaire : |Vl|='+N(vl)+' mV')+T(95,169,'Exact : |Ve|='+N(ve)+' mV')+
T(95,198,'Écart rapporté à |Vl|')+bar(80,238,w,'data-error-px')+
T(290,253,'450 px/point de % ; échelle amplifiée');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-labelledby="t-'+id+' d-'+id+'" class="machine"><title id="t-'+id+'">'+esc(a.title)+'</title><desc id="d-'+id+'">Schéma 2D paramétrique : '+esc(a.assumptions)+'</desc><defs><marker id="a-'+id+'" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#7ce8ae"/></marker></defs><rect x="1" y="1" width="598" height="298" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(10)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams,meta};
})(typeof window==='undefined'?globalThis:window);

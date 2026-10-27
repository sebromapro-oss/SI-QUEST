(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./batch238-242.js').physics:root.SIInvestigations;
const prior=typeof module!=='undefined'&&module.exports?require('./batch238-242.js').diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"planetary-carrier-speed-01","title":"Train épicycloïdal — Vitesse du porte-satellites","min":-100,"max":300,"lo":100,"hi":300,"iu":"tr/min","u":"tr/min","policy":{"absoluteTolerance":1,"relativeTolerance":0,"precision":1,"assumptions":"Train simple idéal, Zₛ=24 dents, Zᵣ=72 dents, nₛ=+600 tr/min ; nᵣ entre −100 et +300 tr/min ; engrènements sans glissement, même axe, convention positive antihoraire.","solution":"1. Fixer le sens antihoraire positif : nₛ=+600 tr/min, nᵣ=+100 tr/min.\n2. Pour un train simple : Zₛ(nₛ−n꜀)+Zᵣ(nᵣ−n꜀)=0.\n3. Isoler n꜀=(Zₛnₛ+Zᵣnᵣ)/(Zₛ+Zᵣ).\n4. n꜀=(24×600+72×100)/(24+72)=21 600/96=225 tr/min.\n5. Homogénéité : dents sans dimension × tr/min / dents = tr/min. Si nₛ=nᵣ, alors n꜀=nₛ.\n6. Plage fictive respectée au nominal ; à nᵣ=−100 tr/min, n꜀=75 tr/min, hors plage. Vérifier les conditions mécaniques réelles."}},{"id":"capacitor-stored-energy-01","title":"Condensateur — Énergie électrique stockée","min":0,"max":100,"lo":0,"hi":8,"iu":"V","u":"J","policy":{"absoluteTolerance":0.05,"relativeTolerance":0,"precision":3,"assumptions":"Condensateur idéal C=4 700 µF=0,0047 F ; tension continue U de 0 à 100 V ; capacité indépendante de U, pertes et vieillissement exclus.","solution":"1. C=4 700 µF=4 700×10⁻⁶ F=0,0047 F ; U=48 V.\n2. Énergie d'un condensateur idéal : E=½ C U².\n3. U²=48²=2 304 V².\n4. E=0,5×0,0047×2 304=5,4144 J, soit 5,414 J.\n5. Homogénéité : F×V²=(C/V)×V²=C×V=J ; à U=0 V, E=0 ; doubler U multiplie E par quatre.\n6. Seuil fictif respecté au nominal ; une mesure de tension et une procédure adaptée restent obligatoires sur tout équipement réel."}},{"id":"sensor-temperature-drift-01","title":"Capteur — Dérive thermique du signal","min":-20,"max":80,"lo":-50,"hi":50,"iu":"K","u":"mV","policy":{"absoluteTolerance":0.5,"relativeTolerance":0,"precision":1,"assumptions":"Sortie nominale U₀=12 V à la température de référence ; α=+120 ppm/K constant ; ΔT entre −20 et +80 K ; modèle linéaire sans dérive d'offset ni hystérésis.","solution":"1. U₀=12 V ; α=120 ppm/K=120×10⁻⁶ K⁻¹ ; ΔT=+30 K.\n2. Loi linéaire : ΔU=U₀ α ΔT.\n3. ΔU=12×120×10⁻⁶×30=0,0432 V.\n4. Conversion : ΔU=43,2 mV ; le signe est positif pour α et ΔT positifs.\n5. Homogénéité : V×K⁻¹×K=V ; pour ΔT=0 K, ΔU=0 ; pour −20 K, ΔU=−28,8 mV.\n6. Tolérance fictive respectée au nominal ; contrôler l'étalonnage et les conditions thermiques réelles."}},{"id":"belt-centrifugal-tension-01","title":"Courroie — Contribution centrifuge à la tension","min":0,"max":20,"lo":0,"hi":100,"iu":"m/s","u":"N","policy":{"absoluteTolerance":1,"relativeTolerance":0,"precision":1,"assumptions":"Courroie uniforme de masse linéique m′=0,50 kg/m, vitesse constante de 0 à 20 m/s ; approximation de courroie souple en régime permanent ; flexion, glissement et tensions de traction préexistantes exclus.","solution":"1. Masse linéique m′=0,50 kg/m ; vitesse v=12 m/s.\n2. Modèle idéal : T꜀=m′ v².\n3. v²=144 m²/s².\n4. T꜀=0,50×144=72,0 N.\n5. Homogénéité : (kg/m)×(m²/s²)=kg·m/s²=N ; à v=0, T꜀=0 ; doubler v multiplie T꜀ par quatre.\n6. Seuil fictif respecté au nominal ; mesurer les tensions totales et consulter le fabricant pour la transmission réelle."}},{"id":"thermal-penetration-length-01","title":"Paroi — Longueur caractéristique de diffusion thermique","min":1,"max":200,"lo":0,"hi":60,"iu":"s","u":"mm","policy":{"absoluteTolerance":0.3,"relativeTolerance":0,"precision":2,"assumptions":"Solide homogène semi-infini, α=1,2×10⁻⁵ m²/s constant ; chauffe de surface en échelon ; t entre 1 et 200 s ; δ=2√(αt) est une échelle conventionnelle, pas un front net ni une isotherme universelle.","solution":"1. Diffusivité α=1,2×10⁻⁵ m²/s ; durée t=50 s.\n2. Produit αt=1,2×10⁻⁵×50=6,0×10⁻⁴ m².\n3. Racine √(αt)=0,0244949 m.\n4. Longueur conventionnelle δ=2√(αt)=0,0489898 m=48,9898 mm, soit 48,99 mm.\n5. Homogénéité : √[(m²/s)×s]=m ; quadrupler t double δ.\n6. Seuil fictif respecté au nominal ; cette longueur n'est pas un front thermique réel. Vérifier les températures et les conditions aux limites."}}],byId=Object.fromEntries(meta.map(q=>[q.id,q]));
const models={"planetary-carrier-speed-01":x=>(24*600+72*x)/96,
"capacitor-stored-energy-01":x=>.5*.0047*x*x,
"sensor-temperature-drift-01":x=>12*120e-6*x*1000,
"belt-centrifugal-tension-01":x=>.5*x*x,
"thermal-penetration-length-01":x=>2000*Math.sqrt(1.2e-5*x)};
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(q=>[q.id,{min:q.lo,max:q.hi,unit:q.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(q=>[q.id,Object.freeze(q.policy)]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(q=>[q.id,q.iu]))));
function calculate(id,x){const q=byId[id];if(!q)return base.calculate(id,x);if(!Number.isFinite(x)||x<q.min||x>q.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y}
function assess(id,x){const q=byId[id];if(!q)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=(q.lo??-Infinity)-1e-9&&value<=(q.hi??Infinity)+1e-9,min:q.lo,max:q.hi,unit:q.u})}
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(q=>[q.id,q.title]))));
const n=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(a,b,c,d,col='#a9d9ed',w=3,extra='')=>'<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+col+'" stroke-width="'+w+'" '+extra+'/>';
const arrow=(a,b,c,d)=>line(a,b,c,d,'#ffca7d',4,'marker-end="url(#pointe)"');
const text=(a,b,t)=>'<text x="'+a+'" y="'+b+'" fill="#fff" font-size="16">'+t+'</text>';
const circle=(cx,cy,r,fill='#315c76')=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+fill+'" stroke="#a9d9ed" stroke-width="3"/>';
function render(id,x,y){
if(!byId[id])return prior.render(id,x,y);
if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');
let s='';
switch(id){
case 'planetary-carrier-speed-01':{
s+=circle(275,135,90,'#173a56')+circle(275,135,30)+circle(215,135,30,'#40637a')+circle(335,135,30,'#40637a');
s+=circle(275,135,7,'#ffd17d')+line(215,135,335,135,'#ffd17d',2);
if(x!==0)s+=x>0?arrow(350,54,310,48):arrow(310,48,350,54);
s+=text(25,36,'nᵣ = '+n(x)+' tr/min ; nₛ = +600 tr/min')+text(35,224,'n꜀ = '+n(y)+' tr/min ; Zₛ = 24 ; Zᵣ = 72');break;}
case 'capacitor-stored-energy-01':{
s+=line(110,126,270,126)+line(300,126,490,126)+line(270,82,270,171,'#ffd17d',6)+line(300,82,300,171,'#ffd17d',6);
if(x>0)s+=text(247,70,'+')+text(307,70,'−');
const width=Number((340*y/23.5).toFixed(3));
s+='<rect x="125" y="185" width="340" height="12" fill="#214157"/><rect x="125" y="185" width="'+width+'" height="12" fill="#7ce8ae" data-energie-largeur-px="'+width+'"/>';
s+=text(35,36,'U = '+n(x)+' V ; C = 4 700 µF')+text(35,225,'E = '+n(y)+' J ; énergie stockée');break;}
case 'sensor-temperature-drift-01':{
s+='<rect x="105" y="85" width="130" height="92" rx="8" fill="#315c76" stroke="#a9d9ed"/>'+line(235,132,470,132);
s+=text(124,121,'CAPTEUR')+text(124,148,'12 V');
s+=line(325,173,325,195,'#fff',2);
const end=Number((325+1.3*y).toFixed(3));
if(y!==0)s+=arrow(325,184,end,184);
s+=text(35,36,'ΔT = '+n(x)+' K ; α = +120 ppm/K')+text(35,226,'ΔU = '+n(y)+' mV ; dérive signée');break;}
case 'belt-centrifugal-tension-01':{
s+=circle(175,135,40)+circle(425,135,40)+line(175,95,425,95,'#7ce8ae',7)+line(175,175,425,175,'#7ce8ae',7);
s+=circle(175,135,8,'#ffd17d')+circle(425,135,8,'#ffd17d');
if(x>0)s+=arrow(270,83,270+110*y/200,83);
s+=text(35,36,'v = '+n(x)+' m/s ; m′ = 0,50 kg/m')+text(35,225,'T꜀ = '+n(y)+' N ; contribution centrifuge');break;}
case 'thermal-penetration-length-01':{
s+='<rect x="145" y="88" width="300" height="102" fill="#244a64" stroke="#a9d9ed" stroke-width="3"/>';
const width=Number((3*y).toFixed(3)),end=Number((145+width).toFixed(3));
s+='<rect x="145" y="88" width="'+width+'" height="102" fill="#d28e58" opacity=".42" data-diffusion-largeur-px="'+width+'"/>';
s+=line(end,81,end,198,'#ffca7d',2,'stroke-dasharray="6 4"')+text(35,36,'t = '+n(x)+' s ; α = 1,2×10⁻⁵ m²/s')+text(35,225,'δ = '+n(y)+' mm ; échelle, pas de front net');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 235" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma technique bidimensionnel paramétrique ; les résultats sont également disponibles en texte. Aucune animation temporelle non justifiée.</desc><defs><marker id="pointe" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#ffca7d"/></marker></defs><rect x="1" y="1" width="598" height="232" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);

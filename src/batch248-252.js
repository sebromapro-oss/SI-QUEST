(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./batch243-247.js').physics:root.SIInvestigations;
const prior=typeof module!=='undefined'&&module.exports?require('./batch243-247.js').diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"hydrostatic-center-pressure-01","title":"Porte immergée — Centre de poussée hydrostatique","min":0,"max":5,"lo":0,"hi":3,"iu":"m","u":"m","policy":{"absoluteTolerance":0.02,"relativeTolerance":0,"precision":3,"assumptions":"Eau au repos de masse volumique constante ; porte verticale de hauteur H=1,50 m et largeur constante ; bord supérieur à la profondeur a ; pression relative nulle à la surface libre ; a entre 0 et 5 m. yₚ est mesuré depuis la surface libre.","solution":"1. Porte verticale de hauteur H = 1,50 m ; profondeur du bord supérieur a = 1,50 m. La largeur b s'élimine dans I_G/A.\n2. Profondeur du centre géométrique : y_G = a + H/2 = 1,50 + 0,75 = 2,25 m.\n3. Pour un rectangle : I_G/A = (bH³/12)/(bH) = H²/12 = 1,50²/12 = 0,1875 m².\n4. Centre de pression : yₚ = y_G + (I_G/A)/y_G = 2,25 + 0,1875/2,25 = 2,33333 m.\n5. Contrôle dimensionnel : m + m²/m = m ; yₚ > y_G. Pour a=0, yₚ=2H/3=1,00 m.\n6. Au nominal, le seuil fictif de 3,00 m est respecté. En atelier, les moments et la résistance de la porte restent à déterminer."}},{"id":"induction-rotor-frequency-01","title":"Moteur asynchrone — Fréquence rotorique","min":0,"max":0.12,"lo":0,"hi":3,"iu":"sans unité","u":"Hz","policy":{"absoluteTolerance":0.1,"relativeTolerance":0,"precision":2,"assumptions":"Alimentation sinusoïdale triphasée f₁=50 Hz, moteur asynchrone en régime établi ; glissement positif s entre 0 et 0,12 ; harmonique fondamental seulement ; pas d'inversion ni de freinage.","solution":"1. La fréquence du réseau vaut f₁ = 50 Hz. Le glissement nominal est s = 0,040, soit 4,0 %.\n2. Le rotor voit le champ tournant à une vitesse relative liée au glissement : fᵣ = s × f₁.\n3. Substitution : fᵣ = 0,040 × 50 Hz = 2,00 Hz.\n4. Homogénéité : s est sans dimension, donc le produit possède l'unité Hz.\n5. À s=0, la fréquence rotorique fondamentale vaut 0 Hz ; à s=0,12, elle vaut 6 Hz.\n6. Le seuil fictif de 3 Hz est respecté au nominal ; ce modèle ne remplace pas les mesures électriques et mécaniques sur la machine réelle."}},{"id":"fillet-weld-double-shear-01","title":"Deux cordons d'angle — Cisaillement moyen","min":0,"max":12,"lo":0,"hi":12,"iu":"kN","u":"MPa","policy":{"absoluteTolerance":0.15,"relativeTolerance":0,"precision":3,"assumptions":"Deux cordons identiques de longueur utile L=80 mm chacun ; pied de cordon a=6 mm, gorge théorique t=a/√2 ; effort F entre 0 et 12 kN, centré et parallèle aux cordons ; répartition uniforme idéalisée, sans flexion, fatigue ni défaut de soudure.","solution":"1. Deux cordons de longueur utile L=80 mm ; pied a=6 mm ; effort nominal F=6 kN=6 000 N.\n2. Gorge théorique de chaque cordon : t=a/√2=6/√2=4,24264 mm.\n3. Aire résistante totale : A=2Lt=2×80×4,24264=678,823 mm².\n4. Contrainte moyenne : τ=F/A=6 000/678,823=8,83883 N/mm²=8,83883 MPa.\n5. Contrôle dimensionnel : N/mm² = MPa. À F=0, τ=0 ; doubler F double τ.\n6. Le seuil fictif de 12 MPa est respecté au nominal, mais aucune vérification normative de soudure, de fatigue ou de rupture n'est réalisée."}},{"id":"parallel-plate-capacitance-01","title":"Condensateur plan — Capacité géométrique","min":0.5,"max":5,"lo":0.3,"hi":1.2,"iu":"mm","u":"nF","policy":{"absoluteTolerance":0.01,"relativeTolerance":0,"precision":4,"assumptions":"Plaques planes parallèles, surface active A=0,020 m², diélectrique homogène εᵣ=3, ε₀=8,8541878128×10⁻¹² F/m ; écart d entre 0,5 et 5 mm ; champs de bord, fuites et tension de claquage négligés.","solution":"1. A=0,020 m² ; εᵣ=3 ; ε₀=8,8541878128×10⁻¹² F/m ; d=1 mm=0,001 m.\n2. Modèle plan idéal : C=ε₀ εᵣ A/d.\n3. Produit ε₀ εᵣ A = 8,8541878128×10⁻¹²×3×0,020=5,31251268768×10⁻¹³ F·m.\n4. Division par d : C=5,31251268768×10⁻¹⁰ F = 0,531251268768 nF.\n5. Homogénéité : (F/m)×m²/m=F ; si d double, C est divisée par deux. Le modèle exclut les effets de bord.\n6. Le critère fictif C≥0,30 nF est respecté au nominal ; aucun dimensionnement réel du diélectrique n'est validé."}},{"id":"isotropic-volume-expansion-01","title":"Réservoir libre — Dilatation volumique","min":-30,"max":100,"lo":-10,"hi":10,"iu":"K","u":"mL","policy":{"absoluteTolerance":0.15,"relativeTolerance":0,"precision":2,"assumptions":"Solide isotrope libre, volume initial V₀=2,00 L, coefficient linéaire α=23×10⁻⁶ K⁻¹ constant ; ΔT entre −30 et +100 K ; approximation au premier ordre |αΔT|≪1 ; aucune cavité ni liquide enfermé.","solution":"1. Volume initial V₀=2,00 L=2 000 mL ; α=23×10⁻⁶ K⁻¹ ; ΔT=+50 K.\n2. Approximation isotrope au premier ordre : β≈3α=69×10⁻⁶ K⁻¹.\n3. Variation volumique : ΔV≈βV₀ΔT=69×10⁻⁶×2 000×50=6,90 mL.\n4. Le volume final approximatif vaut V≈2 006,90 mL ; le signe est positif pour un échauffement.\n5. Homogénéité : K⁻¹×mL×K=mL. À ΔT=0 K, ΔV=0 ; à ΔT=−30 K, ΔV≈−4,14 mL.\n6. Le seuil fictif de 10 mL est respecté au nominal ; l'approximation n'inclut ni les contraintes mécaniques ni les variations de α."}}];
const byId=Object.fromEntries(meta.map(m=>[m.id,m]));
const models={
"hydrostatic-center-pressure-01":a=>a+.75+.1875/(a+.75),
"induction-rotor-frequency-01":s=>50*s,
"fillet-weld-double-shear-01":f=>f*1000/(2*80*6/Math.sqrt(2)),
"parallel-plate-capacitance-01":d=>8.8541878128e-12*3*.02/(d*.001)*1e9,
"isotropic-volume-expansion-01":dt=>3*23e-6*2000*dt
};
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(m=>[m.id,{min:m.lo,max:m.hi,unit:m.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(m=>[m.id,Object.freeze(m.policy)]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(m=>[m.id,m.iu]))));
function calculate(id,x){const m=byId[id];if(!m)return base.calculate(id,x);if(!Number.isFinite(x)||x<m.min||x>m.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y}
function assess(id,x){const m=byId[id];if(!m)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=m.lo-1e-9&&value<=m.hi+1e-9,min:m.lo,max:m.hi,unit:m.u})}
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(m=>[m.id,m.title]))));
const n=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(x1,y1,x2,y2,color='#a9d9ed',width=3,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+width+'" '+extra+'/>';
const label=(x,y,t)=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="16">'+t+'</text>';
const dot=(cx,cy,r=6,color='#ffd17d')=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+color+'"/>';
function render(id,x,y){
if(!byId[id])return prior.render(id,x,y);
if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');
let s='';
switch(id){
case 'hydrostatic-center-pressure-01':{
const cp=100+80*(y-x)/1.5,pt=280-12*x,pb=280-12*(x+1.5);
s+=line(80,60,515,60,'#7ce8ae',3)+label(85,48,'Surface libre : p = 0 (relative)');
s+='<rect x="280" y="100" width="22" height="80" fill="#a9d9ed" stroke="#fff" stroke-width="2"/>';
s+='<polygon points="280,100 '+pt+',100 '+pb+',180 280,180" fill="#64c6ee" opacity=".6"/>';
s+=dot(302,cp,7)+line(309,cp,354,cp,'#ffd17d',3,'data-centre-pression-y-px="'+Number(cp.toFixed(4))+'"');
s+=label(355,cp-8,'Centre de pression')+label(25,208,'a = '+n(x)+' m ; H = 1,50 m')+label(25,228,'yₚ = '+n(y)+' m depuis la surface libre');break;}
case 'induction-rotor-frequency-01':{
s+='<circle cx="300" cy="132" r="70" fill="#24465f" stroke="#a9d9ed" stroke-width="12"/>';
s+='<circle cx="300" cy="132" r="38" fill="#406b7f" stroke="#ffd17d" stroke-width="4"/>';
for(let k=0;k<6;k++){const a=k*Math.PI/3;s+=dot(Number((300+55*Math.cos(a)).toFixed(3)),Number((132+55*Math.sin(a)).toFixed(3)),5,'#7ce8ae')}
s+=label(28,39,'Stator : f₁ = 50 Hz')+label(28,65,'Glissement s = '+n(x)+' (sans unité)');
s+=label(25,218,'Fondamental rotorique : fᵣ = '+n(y)+' Hz');break;}
case 'fillet-weld-double-shear-01':{
s+='<rect x="170" y="83" width="245" height="112" rx="4" fill="#315c76" stroke="#a9d9ed" stroke-width="3"/>';
s+=line(180,91,400,91,'#ffca7d',7)+line(180,187,400,187,'#ffca7d',7);
s+=label(190,114,'Cordon 1')+label(190,179,'Cordon 2');
const length=Number((105*x/12).toFixed(3));if(x>0)s+=line(420,137,420+length,137,'#7ce8ae',5,'marker-end="url(#pointe)" data-effort-longueur-px="'+length+'"');
s+=label(25,39,'F = '+n(x)+' kN ; 2 cordons × 80 mm')+label(25,218,'a = 6 mm ; τ = '+n(y)+' MPa');break;}
case 'parallel-plate-capacitance-01':{
const gap=Number((x*11).toFixed(3)),left=300-gap/2,right=300+gap/2;
s+=line(left,70,left,188,'#ffca7d',8)+line(right,70,right,188,'#ffca7d',8);
s+=line(left,203,right,203,'#7ce8ae',3,'data-entrefer-px="'+gap+'"');
s+=label(25,38,'A = 0,020 m² ; εᵣ = 3')+label(25,226,'d = '+n(x)+' mm ; C = '+n(y)+' nF');break;}
case 'isotropic-volume-expansion-01':{
const width=Number((145+2.5*y).toFixed(3));
s+='<rect x="75" y="93" width="145" height="90" fill="#315c76" stroke="#a9d9ed" stroke-width="3"/>';
s+='<rect x="330" y="93" width="'+width+'" height="90" fill="#386d7b" stroke="#ffd17d" stroke-width="3" data-volume-largeur-px="'+width+'"/>';
s+=label(90,84,'V₀ = 2,00 L')+label(350,84,'V final (amplifié)');
s+=label(25,39,'ΔT = '+n(x)+' K ; β ≈ 69×10⁻⁶ K⁻¹')+label(25,225,'ΔV = '+n(y)+' mL ; échelle exagérée');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 235" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma paramétrique bidimensionnel. Les valeurs sont aussi accessibles en texte ; aucune animation temporelle non justifiée.</desc><defs><marker id="pointe" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#7ce8ae"/></marker></defs><rect x="1" y="1" width="598" height="232" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);

(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./batch268-272.js').physics:root.SIInvestigations;
const prior=typeof module!=='undefined'&&module.exports?require('./batch268-272.js').diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"differential-outer-wheel-speed-01","title":"Virage — Vitesse de la roue extérieure","min":4,"max":16,"lo":0,"hi":3.45,"iu":"m","u":"m/s","policy":{"absoluteTolerance":0.02,"relativeTolerance":0,"precision":5,"assumptions":"Virage plan circulaire, vitesse du milieu de l'essieu v=3 m/s ; voie b=1,60 m ; R de 4 à 16 m mesuré au milieu de l'essieu ; roulement sans glissement, roues de même rayon.","solution":"1. v=3,00 m/s ; R=8,00 m ; b=1,60 m.\n2. Rayon extérieur Rₑ=R+b/2=8,80 m.\n3. Vitesse angulaire ω=v/R=3/8=0,375 rad/s.\n4. vₑ=ωRₑ=0,375×8,80=3,300 m/s.\n5. Vérification : vᵢ=3×(8−0,8)/8=2,700 m/s et (vₑ+vᵢ)/2=3,000 m/s. Dimension : m/s.\n6. Bornes : R=4 m donne 3,600 m/s ; R=16 m donne 3,150 m/s.\n7. Décision fictive : 3,300≤3,45 m/s ; la simulation ne garantit pas l'adhérence."}},{"id":"repeatability-sample-std-01","title":"Métrologie — Écart-type de répétabilité","min":9.96,"max":10.1,"lo":0,"hi":0.03,"iu":"mm","u":"mm","policy":{"absoluteTolerance":0.001,"relativeTolerance":0,"precision":5,"assumptions":"Cinq relevés indépendants de même grandeur, quatre valeurs fixes et cinquième x entre 9,96 et 10,10 mm ; n=5 ; résolution, biais et incertitude d'étalonnage exclus.","solution":"1. Relevés : 10,00 ; 10,02 ; 10,01 ; 10,03 ; 10,04 mm.\n2. Moyenne x̄=50,10/5=10,020 mm.\n3. Écarts : −0,020 ; 0 ; −0,010 ; +0,010 ; +0,020 mm.\n4. Somme des carrés : 0,0010 mm².\n5. Variance corrigée s²=0,0010/4=0,00025 mm².\n6. Écart-type s=√0,00025=0,015811 mm ; dimension √(mm²)=mm. Pour la moyenne : s/√5≈0,007071 mm, grandeur différente.\n7. Décision fictive : 0,015811≤0,030 mm ; compléter par étalonnage et incertitude."}},{"id":"maintenance-mttr-four-jobs-01","title":"Maintenance — Temps moyen de réparation","min":10,"max":120,"lo":0,"hi":55,"iu":"min","u":"min","policy":{"absoluteTolerance":0.5,"relativeTolerance":0,"precision":5,"assumptions":"Quatre réparations achevées de même périmètre ; durées effectives 35, 45, 50 et x min ; x entre 10 et 120 min ; attentes de pièces et déplacements exclus.","solution":"1. Durées observées : 35, 45, 50 et 70 min.\n2. Somme : 35+45+50+70=200 min.\n3. MTTR empirique : 200/4=50,00 min.\n4. Unité : min divisé par un nombre sans dimension donne min.\n5. À x=10 min : MTTR=35 min ; à x=120 min : 62,50 min.\n6. Décision fictive : 50≤55 min ; quatre observations ne suffisent pas à prédire le MTTR futur."}},{"id":"ice-latent-fusion-energy-01","title":"Thermique — Énergie de fusion de glace","min":0.2,"max":5,"lo":0,"hi":700,"iu":"kg","u":"kJ","policy":{"absoluteTolerance":2,"relativeTolerance":0,"precision":5,"assumptions":"Glace pure à 0 °C, pression atmosphérique, fusion complète isotherme ; chaleur latente L𝒇≈334 kJ/kg ; masse 0,2 à 5 kg ; pertes et échauffement de l'eau exclus.","solution":"1. Masse m=2,00 kg ; L𝒇=334 kJ/kg.\n2. Relation Q=mL𝒇.\n3. Calcul Q=2×334=668 kJ=668 000 J.\n4. Unités : kg×kJ/kg=kJ ; Q>0.\n5. Limites : m=0,2 kg donne 66,8 kJ ; m=5 kg donne 1 670 kJ.\n6. Décision fictive : 668≤700 kJ ; un chauffage réel exige davantage à cause des pertes.\n7. Distinction : le terme mcΔT représenterait un échauffement sensible, absent ici car la glace est déjà à sa température de fusion. Le temps de fusion dépend de la puissance réellement transmise et non de Q seul.\n8. Vérifier les pertes vers l'ambiance et les propriétés réelles de l'eau avant le choix d'une résistance chauffante."}},{"id":"proportional-loop-static-error-01","title":"Régulation — Erreur statique en boucle fermée","min":0.5,"max":10,"lo":0,"hi":1,"iu":"sans unité","u":"K","policy":{"absoluteTolerance":0.05,"relativeTolerance":0,"precision":5,"assumptions":"Variation de consigne Δr=10 K autour du point de fonctionnement ; procédé de gain statique G=2 ; correcteur proportionnel Kₚ de 0,5 à 10, sans unité ; retour unitaire négatif, boucle stable supposée, sans saturation ni perturbation.","solution":"1. Δr=10 K, G=2, Kₚ=2, retour unitaire négatif.\n2. À l'équilibre : y=GKₚe et e=Δr−y.\n3. Donc e(1+GKₚ)=Δr.\n4. e∞=10/(1+2×2)=2,000 K.\n5. Homogénéité : GKₚ sans unité ; erreur en K. À Kₚ=0,5 : e=5 K ; à Kₚ=10 : e≈0,476 K.\n6. Décision fictive : 2>1 K ; augmenter le gain peut diminuer l'erreur mais dégrader la stabilité."}}],byId=Object.fromEntries(meta.map(m=>[m.id,m]));
const models={
'differential-outer-wheel-speed-01':x=>3*(x+.8)/x,
'repeatability-sample-std-01':x=>{const a=[10,10.02,10.01,10.03,x],avg=a.reduce((s,v)=>s+v,0)/5;return Math.sqrt(a.reduce((s,v)=>s+(v-avg)**2,0)/4)},
'maintenance-mttr-four-jobs-01':x=>(130+x)/4,
'ice-latent-fusion-energy-01':x=>334*x,
'proportional-loop-static-error-01':x=>10/(1+2*x)};
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(m=>[m.id,{min:m.lo,max:m.hi,unit:m.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(m=>[m.id,Object.freeze(m.policy)]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(m=>[m.id,m.iu]))));
function calculate(id,x){const m=byId[id];if(!m)return base.calculate(id,x);if(!Number.isFinite(x)||x<m.min||x>m.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y}
function assess(id,x){const m=byId[id];if(!m)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=m.lo-1e-9&&value<=m.hi+1e-9,min:m.lo,max:m.hi,unit:m.u})}
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(m=>[m.id,m.title]))));
const n=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(a,b,c,d,col='#a9d9ed',w=3,extra='')=>'<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+col+'" stroke-width="'+w+'" '+extra+'/>';
const label=(a,b,t)=>'<text x="'+a+'" y="'+b+'" fill="#fff" font-size="15">'+t+'</text>';
function render(id,x,y){if(!byId[id])return prior.render(id,x,y);if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');let s='';
switch(id){
case 'differential-outer-wheel-speed-01':{
const ri=10*(x-.8),re=10*(x+.8),vi=3*(x-.8)/x;
s+='<path d="M '+(150+re)+' 230 A '+re+' '+re+' 0 0 0 150 '+(230-re)+'" fill="none" stroke="#7ce8ae" stroke-width="3" data-rayon-exterieur-px="'+re.toFixed(3)+'"/>';
s+='<path d="M '+(150+ri)+' 230 A '+ri+' '+ri+' 0 0 0 150 '+(230-ri)+'" fill="none" stroke="#8ddcff" stroke-width="3" data-rayon-interieur-px="'+ri.toFixed(3)+'"/>';
s+='<circle cx="150" cy="230" r="5" fill="#ffd17d"/>'+line(150,230,150+re,230,'#ffd17d',2);
s+=label(20,38,'R = '+n(x)+' m ; voie b = 1,60 m ; v = 3 m/s');
s+=label(365,106,'Roue extérieure')+line(365,125,365+70*y/3.6,125,'#7ce8ae',4,'marker-end="url(#arr)" data-vitesse-exterieure-px="'+(70*y/3.6).toFixed(3)+'"');
s+=label(365,168,'Roue intérieure')+line(365,185,365+70*vi/3.6,185,'#8ddcff',4,'marker-end="url(#arr)" data-vitesse-interieure-px="'+(70*vi/3.6).toFixed(3)+'"');
s+=label(20,252,'vₑ = '+n(y)+' m/s ; vᵢ = '+n(vi)+' m/s');break;}
case 'repeatability-sample-std-01':{
const a=[10,10.02,10.01,10.03,x],avg=a.reduce((v,z)=>v+z,0)/5,yy=v=>Number((190-(v-9.94)*800).toFixed(3));
s+=line(105,200,520,200,'#b8cbd9',2)+line(105,35,105,200,'#b8cbd9',2)+line(125,yy(avg),505,yy(avg),'#7ce8ae',2,'stroke-dasharray="7 4" data-moyenne-y="'+yy(avg)+'"');
a.forEach((v,i)=>{const px=145+i*85;s+=line(px,yy(v)-10,px,yy(v)+10,'#ffd17d',4)+'<circle cx="'+px+'" cy="'+yy(v)+'" r="6" fill="#8ddcff" data-mesure-mm="'+v.toFixed(4)+'"/>'+label(px-5,219,String(i+1));});
s+=label(20,30,'Relevés (mm) : 10,00 ; 10,02 ; 10,01 ; 10,03 ; '+n(x))+label(20,249,'Moyenne = '+n(avg)+' mm ; s = '+n(y)+' mm');break;}
case 'maintenance-mttr-four-jobs-01':{
const a=[35,45,50,x];s+=line(90,195,520,195,'#b8cbd9',3);
a.forEach((v,i)=>{const h=Number((110*v/120).toFixed(3)),px=120+100*i;s+='<rect x="'+px+'" y="'+(195-h).toFixed(3)+'" width="56" height="'+h+'" fill="'+(i===3?'#ffd17d':'#8ddcff')+'" data-duree-min="'+v.toFixed(3)+'" data-hauteur-px="'+h+'"/>'+label(px+18,216,String(i+1));});
const ym=Number((195-110*y/120).toFixed(3));s+=line(105,ym,505,ym,'#7ce8ae',2,'stroke-dasharray="6 4" data-moyenne-y="'+ym+'"');
s+=label(20,38,'Durées : 35 ; 45 ; 50 ; '+n(x)+' min')+label(20,249,'MTTR observé = '+n(y)+' min ; n = 4');break;}
case 'ice-latent-fusion-energy-01':{
const w=Number((180*x/5).toFixed(3)),a=Number((110*x/5).toFixed(3));
s+='<rect x="160" y="82" width="170" height="106" rx="8" fill="#3c718d" stroke="#8ddcff" stroke-width="3"/>';
for(let k=0;k<4;k++)s+=line(178+k*38,88,190+k*38,179,'#b8eaff',2);
s+='<rect x="370" y="185" width="'+w+'" height="14" fill="#7ce8ae" data-masse-largeur-px="'+w+'"/>';
s+=line(65,144,65+a,144,'#ffb68a',5,'marker-end="url(#arr)" data-chaleur-longueur-px="'+a+'"');
s+=label(20,38,'Glace à 0 °C ; L𝒇 = 334 kJ/kg')+label(20,65,'Masse = '+n(x)+' kg ; fusion isotherme')+label(20,249,'Énergie de fusion Q = '+n(y)+' kJ');break;}
case 'proportional-loop-static-error-01':{
s+=line(55,130,138,130)+'<circle cx="153" cy="130" r="15" fill="#20465e" stroke="#ffd17d" stroke-width="3"/>'+label(145,124,'+')+label(145,148,'−')+line(168,130,230,130);
s+='<rect x="230" y="102" width="85" height="55" fill="#315c76" stroke="#8ddcff" stroke-width="3"/>'+line(315,130,365,130)+'<rect x="365" y="102" width="85" height="55" fill="#315c76" stroke="#8ddcff" stroke-width="3"/>';
s+=line(450,130,525,130)+line(500,130,500,198)+line(500,198,153,198)+line(153,198,153,147);
s+=label(63,113,'Δr = 10 K')+label(255,134,'Kₚ = '+n(x))+label(391,134,'G = 2')+label(335,187,'Retour unitaire négatif')+label(20,42,'Modèle linéarisé sans saturation');
const w=Number((150*y/5).toFixed(3));s+='<rect x="100" y="222" width="'+w+'" height="12" fill="#7ce8ae" data-erreur-longueur-px="'+w+'"/>'+label(275,233,'Erreur e∞ = '+n(y)+' K');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 260" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma scientifique 2D paramétrique ; résultats disponibles en texte après déverrouillage. Aucun mouvement temporel fictif.</desc><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#ffb68a" stroke-width="1.5"/></marker></defs><rect x="1" y="1" width="598" height="258" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);
(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./batch263-267.js').physics:root.SIInvestigations;
const prior=typeof module!=='undefined'&&module.exports?require('./batch263-267.js').diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"thinwall-bredt-shear-01","title":"Profilé fermé — Cisaillement de Bredt","min":1,"max":4,"lo":0,"hi":12,"iu":"mm","u":"MPa","policy":{"absoluteTolerance":0.2,"relativeTolerance":0,"precision":4,"assumptions":"Section fermée monocellulaire à paroi mince uniforme ; aire délimitée par la fibre moyenne Aₘ=0,004 m² (80 × 50 mm) constante ; T=200 N·m ; t de 1 à 4 mm ; torsion de Saint-Venant, pas de concentration de contrainte.","solution":"1. Système : profilé fermé mince soumis à T=200 N·m ; Aₘ=0,004 m² et t=2,5 mm.\\n2. Conversion : t=2,5×10⁻³ m.\\n3. Flux de cisaillement : q=T/(2Aₘ)=200/(2×0,004)=25 000 N/m.\\n4. Contrainte : τ=q/t=25 000/0,0025=10 000 000 Pa=10,00 MPa.\\n5. Homogénéité : (N·m)/(m²×m)=N/m²=Pa. À t=1 mm, τ=25 MPa ; à 4 mm, τ=6,25 MPa.\\n6. Décision fictive : 10,00 ≤ 12 MPa ; vérifier l'hypothèse de paroi mince, les soudures et les concentrations de contrainte avant toute utilisation réelle."}},{"id":"threephase-power-factor-pq-01","title":"Tableau triphasé — Facteur de puissance P/Q","min":0,"max":20,"lo":0.85,"hi":1,"iu":"kvar","u":"sans unité","policy":{"absoluteTolerance":0.01,"relativeTolerance":0,"precision":4,"assumptions":"Réseau triphasé équilibré en régime sinusoïdal ; P=12 kW constante, Q inductive entre 0 et 20 kvar ; sans harmoniques ; cos φ positif.","solution":"1. Mesures fictives : P=12 kW et Q=6 kvar, charge équilibrée sinusoïdale.\\n2. Puissance apparente : S=√(P²+Q²)=√(144+36)=√180=13,416 kVA.\\n3. Facteur de puissance : cos φ=P/S=12/13,416=0,894427, sans unité.\\n4. Homogénéité : kW/kVA est sans dimension pour les modules de puissances.\\n5. Limites : à Q=0, cos φ=1 ; à Q=20 kvar, cos φ=12/√544≈0,5145.\\n6. Décision fictive : 0,894 ≥ 0,85 ; mesurer aussi les harmoniques et contrôler le besoin réel de compensation."}},{"id":"battery-internal-joule-heat-01","title":"Batterie — Pertes internes par effet Joule","min":0,"max":150,"lo":0,"hi":400,"iu":"A","u":"W","policy":{"absoluteTolerance":5,"relativeTolerance":0,"precision":4,"assumptions":"Modèle électrique simplifié : résistance interne Rᵢ=0,050 Ω constante ; courant continu de 0 à 150 A ; pas de variation avec la température, l'état de charge ou la fréquence.","solution":"1. Données fictives : I=80 A ; Rᵢ=0,050 Ω.\\n2. Loi de Joule : Pₚ=RᵢI².\\n3. Carré du courant : I²=80²=6 400 A².\\n4. Résultat : Pₚ=0,050×6 400=320 W.\\n5. Dimension : Ω·A²=(V/A)×A²=V·A=W. À 0 A, pertes nulles ; à 150 A, 1 125 W.\\n6. Décision fictive : 320 ≤ 400 W ; la température et les limites constructeur doivent être mesurées avant toute mise en charge."}},{"id":"sensor-two-point-sensitivity-01","title":"Capteur — Sensibilité par étalonnage deux points","min":2,"max":5,"lo":35,"hi":45,"iu":"V","u":"mV/bar","policy":{"absoluteTolerance":0.5,"relativeTolerance":0,"precision":4,"assumptions":"Capteur supposé linéaire entre p₁=0 bar et p₂=100 bar ; V₁=0,50 V ; V₂ entre 2 et 5 V ; incertitudes et hystérésis négligées.","solution":"1. Points fictifs : (p₁,V₁)=(0 bar,0,50 V) ; (p₂,V₂)=(100 bar,4,50 V).\\n2. Différences : Δp=100 bar ; ΔV=4,00 V.\\n3. Sensibilité : S=ΔV/Δp=4,00/100=0,040 V/bar.\\n4. Conversion : S=40,0 mV/bar=4,00×10⁻⁷ V/Pa.\\n5. Vérification : V/bar est bien l'unité de pente ; à V₂=2 V, S=15 mV/bar ; à 5 V, S=45 mV/bar.\\n6. Décision fictive : 40 mV/bar appartient à [35 ; 45] ; vérifier linéarité, hystérésis et incertitudes avec un étalon."}},{"id":"cylinder-critical-insulation-radius-01","title":"Conduite isolée — Rayon critique d'isolation","min":5,"max":30,"lo":0,"hi":3,"iu":"W/(m²·K)","u":"mm","policy":{"absoluteTolerance":0.1,"relativeTolerance":0,"precision":4,"assumptions":"Conduite cylindrique longue, rayon nu r₀=3 mm ; isolant homogène λ=0,040 W/(m·K) ; coefficient de convection extérieur h entre 5 et 30 W/(m²·K) constant ; régime stationnaire, rayonnement négligé.","solution":"1. Données : λ=0,040 W/(m·K) ; h=10 W/(m²·K) ; rayon nu r₀=3 mm.\\n2. Relation du rayon critique d'un cylindre : rcrit=λ/h.\\n3. Calcul : rcrit=0,040/10=0,0040 m=4,0 mm.\\n4. Homogénéité : [W/(m·K)]/[W/(m²·K)]=m.\\n5. À h=5 W/(m²·K), rcrit=8 mm ; à 30, rcrit≈1,333 mm. Si r₀<rcrit, une faible épaisseur peut d'abord augmenter les pertes.\\n6. Décision fictive : 4,0>3,0 mm ; ne pas conclure qu'isoler est inutile : comparer les résistances complètes pour l'épaisseur réelle."}}];
const byId=Object.fromEntries(meta.map(m=>[m.id,m]));
const models={"thinwall-bredt-shear-01":x=>25/x,
"threephase-power-factor-pq-01":x=>12/Math.hypot(12,x),
"battery-internal-joule-heat-01":x=>.05*x*x,
"sensor-two-point-sensitivity-01":x=>10*(x-.5),
"cylinder-critical-insulation-radius-01":x=>40/x};
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
case 'thinwall-bredt-shear-01':{
 const t=Number((1.875*x).toFixed(3));
 s+='<rect x="248" y="92" width="150" height="94" fill="none" stroke="#7ce8ae" stroke-width="'+t+'" data-paroi-epaisseur-px="'+t+'"/>';
 s+=line(400,132,455,132,'#ffb68a',4,'marker-end="url(#arr)"');
 s+=label(22,40,'T = 200 N·m ; Aₘ = 0,004 m²')+label(22,65,'Paroi t = '+n(x)+' mm ; fibre moyenne fixe')+label(22,224,'τ = '+n(y)+' MPa ; flux q = 25 000 N/m');break;}
case 'threephase-power-factor-pq-01':{
 const scale=7,p=12*scale,q=Number((scale*x).toFixed(3)),x0=225,x1=x0+p,y0=207;
 s+=line(x0,y0,x1,y0,'#7ce8ae',4,'data-p-px="'+p+'"')+line(x1,y0,x1,y0-q,'#ffb68a',4,'data-q-px="'+q+'"')+line(x0,y0,x1,y0-q,'#8ddcff',4);
 s+=label(225,225,'P = 12 kW')+label(327,110,'Q')+label(22,88,'Échelle commune : 7 px/kW ou kvar')+label(22,40,'Q = '+n(x)+' kvar ; P = 12 kW')+label(22,65,'S² = P² + Q² ; charge sinusoïdale')+label(22,224,'cos φ = '+n(y)+' (sans unité)');break;}
case 'battery-internal-joule-heat-01':{
 const a=Number((130*x/150).toFixed(3));
 s+=line(130,115,215,115)+line(215,115,215,90)+line(215,90,235,90)+line(380,90,400,90)+line(400,90,400,115)+line(400,115,480,115);
 s+='<rect x="235" y="75" width="145" height="30" fill="#406b7d" stroke="#ffd17d" stroke-width="3" data-serie="resistance-interne"/>';
 if(x>0)s+=line(150,150,150+a,150,'#ffb68a',4,'marker-end="url(#arr)" data-courant-longueur-px="'+a+'"');
 s+=label(22,40,'Rᵢ = 0,050 Ω ; I = '+n(x)+' A')+label(250,96,'Rᵢ')+label(22,224,'P pertes = '+n(y)+' W ; I²R');break;}
case 'sensor-two-point-sensitivity-01':{
 const yy=Number((188-24*(x-.5)).toFixed(3));
 s+=line(130,202,505,202,'#b8cbd9',2)+line(130,202,130,70,'#b8cbd9',2);
 s+=line(165,188,445,yy,'#7ce8ae',4)+
 '<circle cx="165" cy="188" r="6" fill="#ffd17d"/><circle cx="445" cy="'+yy+'" r="6" fill="#ffd17d" data-v2-ord-px="'+yy+'"/>';
 s+=label(145,214,'0 bar')+label(435,214,'100 bar')+label(22,40,'V₁ = 0,50 V ; V₂ = '+n(x)+' V')+label(22,65,'Étalonnage linéaire à deux points')+label(22,235,'S = '+n(y)+' mV/bar');break;}
case 'cylinder-critical-insulation-radius-01':{
 const rr=Number(((32/3)*y).toFixed(3));
 s+='<circle cx="350" cy="145" r="32" fill="#335a72" stroke="#ffd17d" stroke-width="4"/>';
 s+='<circle cx="350" cy="145" r="'+rr+'" fill="none" stroke="#7ce8ae" stroke-dasharray="6 4" stroke-width="3" data-rayon-critique-px="'+rr+'"/>';
 s+=line(350,145,350+rr,145,'#ffb68a',3,'marker-end="url(#arr)"');
 s+=label(22,40,'λ = 0,040 W/(m·K) ; h = '+n(x)+' W/(m²·K)')+label(22,65,'Rayon nu 3 mm ; cercle vert : r critique')+label(22,224,'r critique = '+n(y)+' mm');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 250" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma 2D paramétrique non à l’échelle ; les valeurs calculées sont disponibles en texte. Aucun mouvement temporel fictif.</desc><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#ffb68a" stroke-width="1.5"/></marker></defs><rect x="1" y="1" width="598" height="248" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);

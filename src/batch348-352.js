(function(root){'use strict';
const prev=typeof module!=='undefined'&&module.exports?require('./batch343-347.js'):null;
const base=prev?prev.physics:root.SIInvestigations,prior=prev?prev.diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"helical-gear-opposed-thrust-01","world":"SI-05","title":"Denture hélicoïdale — Compensation de deux poussées axiales","subskill":"Poussée axiale d'une denture hélicoïdale","context":"Dans un réducteur, deux roues hélicoïdales exercent des poussées axiales opposées sur le même arbre. Le technicien estime l'effort résiduel repris par le palier A.","objective":"Calculer la somme algébrique des deux poussées et identifier le sens de la réaction du palier.","prereq":"Couple, diamètre primitif, tangente d'un angle, signe des forces.","flash":["Comment obtenir l'effort tangentiel à partir du couple ?","Quel angle de denture intervient dans la poussée axiale ?","Pourquoi les deux poussées peuvent-elles se compenser ?"],"formula":"F_A=2T₁ tan(β₁)/d₁−2T₂ tan(β₂)/d₂","assumptions":"Régime stationnaire ; T₁=120 N·m ; d₁=0,120 m ; β₁=20° ; d₂=0,160 m ; β₂=15°. T₂ de 40 à 160 N·m. Deux poussées axiales opposées, sans autres efforts axiaux. F_A positif vers le palier A, calcul en N. Les forces radiales ne sont pas étudiées.","min":40,"max":160,"initial":80,"iu":"N·m","u":"N","tol":1,"lo":0,"hi":500,"precision":2,"decision":"Seuil pédagogique fictif |F_A| ≤ 500 N ; ne pas dimensionner le roulement réel sans charges radiales, fatigue et documentation constructeur.","error":"Additionner les modules des deux poussées ou oublier de convertir les angles en radians pour la tangente.","solution":"Fₜ₁=2×120/0,120=2 000 N ; Fₐ₁=2 000 tan20°=727,94 N vers A. Fₜ₂=2×80/0,160=1 000 N ; Fₐ₂=1 000 tan15°=267,95 N en sens opposé. F_A=727,94−267,95=459,99 N vers A. Dimension : (N·m)/m=N. Seuil fictif respecté."},{"id":"hydraulic-laminar-critical-flow-01","world":"SI-06","title":"Conduite d'eau — Débit indicatif de transition laminaire","subskill":"Régime d'écoulement en conduite circulaire","context":"Sur un banc hydraulique à eau, un technicien cherche le débit associé à un nombre de Reynolds de référence pour préparer une mesure de pertes de charge.","objective":"Déterminer le débit volumique correspondant à Re=2 300 pour un diamètre intérieur mesuré.","prereq":"Nombre de Reynolds, viscosité dynamique, débit et section, conversions mm/m et m³/s en L/min.","flash":["Quelle relation relie Re, vitesse moyenne et diamètre ?","Quelle est l'unité SI de la viscosité dynamique ?","Pourquoi Re=2 300 n'est-il pas une garantie de transition universelle ?"],"formula":"Q=Re₀ π μ D/(4ρ)","assumptions":"Eau newtonienne à température fixée ; ρ=998 kg/m³ ; μ=0,001 Pa·s ; conduite circulaire, diamètre intérieur D de 10 à 30 mm ; écoulement pleinement développé ; Re₀=2 300 est un repère indicatif, pas un seuil universel de transition. Résultat en L/min.","min":10,"max":30,"initial":20,"iu":"mm","u":"L/min","tol":0.03,"lo":2,"hi":20,"precision":3,"decision":"Critère fictif : débit repère ≥2,0 L/min. Mesurer le débit réel et vérifier les perturbations d'entrée ; aucune garantie de régime laminaire.","error":"Oublier la conversion du diamètre en mètres ou confondre viscosités dynamique et cinématique.","solution":"D=20 mm=0,020 m ; v=Re₀ μ/(ρD)=2 300×0,001/(998×0,020)=0,11523 m/s ; S=πD²/4=3,14159×10⁻⁴ m² ; Q=vS=3,62007×10⁻⁵ m³/s=2,17204 L/min. Contrôle : ρvD/μ=2 300. Critère fictif respecté."},{"id":"thermal-contact-heat-power-01","world":"SI-12","title":"Interface thermique — Puissance transférée par contact","subskill":"Résistance thermique d'interface en fonction de la conductance surfacique","context":"En maintenance d'un dissipateur, une équipe estime le flux de chaleur passant entre deux surfaces métalliques pressées.","objective":"Calculer la puissance transférée par l'interface à partir de sa conductance surfacique.","prereq":"Flux thermique, conductance, surface, différence de température et watt.","flash":["Quelle unité possède la conductance thermique surfacique ?","Dans quel sens la chaleur passe-t-elle spontanément ?","Une conductance de contact est-elle une conductivité de matériau ?"],"formula":"P=h_c A(T_chaud−T_froid)","assumptions":"Deux faces isothermes à 52 °C et 40 °C ; aire A=0,060 m² ; conductance de contact h_c de 100 à 500 W/(m²·K). Échange stationnaire unidimensionnel ; résistances de conduction et convection externes non prises en compte. P positif du chaud vers le froid.","min":100,"max":500,"initial":300,"iu":"W/(m²·K)","u":"W","tol":2,"lo":180,"hi":400,"precision":2,"decision":"Objectif fictif P≥180 W et P≤400 W. Ne pas conclure sur la tenue thermique réelle sans mesurer l'interface et les autres résistances.","error":"Employer des kelvins absolus au lieu de la différence de 12 K ou oublier la surface.","solution":"ΔT=52−40=12 K ; G_c=h_c A=300×0,060=18 W/K ; P=G_c ΔT=18×12=216 W, du chaud vers le froid. Contrôle dimensionnel : [W/(m²·K)]×m²×K=W. Objectif fictif respecté."},{"id":"process-capability-cp-01","world":"SI-13","title":"Métrologie — Indice Cp d'un procédé centré ou décentré","subskill":"Capabilité par position moyenne et dispersion","context":"Un responsable métrologie évalue la dispersion d'un procédé d'usinage avant de vérifier séparément son centrage.","objective":"Calculer Cp à partir de la largeur de tolérance et de l'écart-type, puis distinguer Cp et Cpk.","prereq":"Tolérances dimensionnelles, écart-type, intervalle à six écarts-types, indices Cp et Cpk.","flash":["Quelle est la largeur de l'intervalle 19,90–20,10 mm ?","Pourquoi utilise-t-on 6σ dans Cp ?","Cp suffit-il à prouver que la moyenne est centrée ?"],"formula":"Cp=(LS−LI)/(6σ)","assumptions":"Limite inférieure LI=19,90 mm ; limite supérieure LS=20,10 mm ; écart-type de procédé σ de 0,015 à 0,050 mm ; hypothèse de procédé stable et distribution approximativement normale. Cp est sans unité et ne tient pas compte du centrage de la moyenne.","min":0.015,"max":0.05,"initial":0.025,"iu":"mm","u":"sans unité","tol":0.02,"lo":1.33,"hi":5,"precision":4,"decision":"Cible fictive Cp≥1,33. Vérifier Cpk, stabilité et plan d'échantillonnage avant toute décision de conformité.","error":"Oublier le facteur six ou confondre Cp avec Cpk en négligeant un éventuel décentrage.","solution":"Largeur de tolérance =20,10−19,90=0,20 mm ; dispersion théorique 6σ=6×0,025=0,150 mm ; Cp=0,20/0,150=1,3333 (sans unité). La cible fictive est atteinte, mais Cp seul ne démontre pas le centrage ni la conformité des pièces."},{"id":"second-order-damping-from-overshoot-01","world":"SI-09","title":"Automatique — Identifier l'amortissement à partir du dépassement","subskill":"Dépassement maximal d'une réponse indicielle sous-amortie du second ordre","context":"Un automaticien relève le dépassement d'une réponse indicielle sur un banc asservi et identifie le coefficient d'amortissement réduit.","objective":"Déduire ζ du dépassement relatif mesuré, puis interpréter la réponse transitoire.","prereq":"Réponse indicielle, logarithme népérien, second ordre sous-amorti, grandeur sans dimension.","flash":["À quoi correspond un dépassement de 20 % ?","Quelle plage de ζ correspond à un régime sous-amorti ?","Pourquoi utilise-t-on le logarithme d'un rapport et non celui de 20 ?"],"formula":"ζ=−ln(Mp)/√[π²+ln²(Mp)] ; Mp=dépassement/100","assumptions":"Système linéaire du second ordre sans zéro, gain statique unitaire, conditions initiales nulles ; dépassement Mp strictement entre 0 et 1 ; entrée échelon unitaire ; paramètre mesuré entre 10 et 40 %. Pour le tracé, pulsation propre conventionnelle ω_n=1 rad/s ; ζ sans unité.","min":10,"max":40,"initial":20,"iu":"%","u":"sans unité","tol":0.012,"lo":0.45,"hi":1,"precision":4,"decision":"Critère fictif ζ≥0,45. Mesurer également temps de réponse, marges et stabilité réelle de la boucle.","error":"Prendre ln(20) au lieu de ln(0,20) ou confondre amortissement ζ et pulsation propre.","solution":"Mp=20/100=0,20 ; ln(Mp)=−1,609438 ; √(π²+ln² Mp)=3,5299 ; ζ=1,609438/3,5299=0,45595 sans unité. Contrôle : exp[−πζ/√(1−ζ²)]=0,20. Critère fictif respecté."}];
const byId=Object.fromEntries(meta.map(a=>[a.id,a]));
const models={"helical-gear-opposed-thrust-01":x=>2*120/.12*Math.tan(20*Math.PI/180)-2*x/.16*Math.tan(15*Math.PI/180),
"hydraulic-laminar-critical-flow-01":x=>2300*Math.PI*.001*(x/1000)/(4*998)*60000,
"thermal-contact-heat-power-01":x=>x*.06*12,
"process-capability-cp-01":x=>.2/(6*x),
"second-order-damping-from-overshoot-01":x=>{const v=Math.log(x/100);return -v/Math.hypot(Math.PI,v)}};
function calculate(id,x){const a=byId[id];if(!a)return base.calculate(id,x);if(!Number.isFinite(x)||x<a.min||x>a.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y;}
function assess(id,x){const a=byId[id];if(!a)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=a.lo&&value<=a.hi,min:a.lo,max:a.hi,unit:a.u});}
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(a=>[a.id,{min:a.lo,max:a.hi,unit:a.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(a=>[a.id,{absoluteTolerance:a.tol,relativeTolerance:0,precision:a.precision,assumptions:a.assumptions,solution:a.solution}]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(a=>[a.id,a.iu]))));
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(a=>[a.id,a.title]))));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const N=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(x1,y1,x2,y2,c='#8ddcff',w=3,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+w+'" '+extra+'/>';
const label=(x,y,s)=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="14">'+esc(s)+'</text>';
const rect=(x,y,w,h,c)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"/>';
function render(id,x,y){const a=byId[id];if(!a)return prior.render(id,x,y);
if(!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');
let s='',g=0;
switch(id){
case 'helical-gear-opposed-thrust-01':{
const f1=2*120/.12*Math.tan(20*Math.PI/180),f2=2*x/.16*Math.tan(15*Math.PI/180);
g=.25*y;s=label(35,35,'Deux engrenages : poussées axiales opposées')+label(35,57,'T₂='+N(x)+' N·m ; F_A='+N(y)+' N vers A')+
line(70,151,540,151,'#8ddcff',7)+
'<circle cx="170" cy="151" r="37" fill="#31566c" stroke="#ffca7d" stroke-width="4"/>'+
'<circle cx="420" cy="151" r="37" fill="#31566c" stroke="#ffca7d" stroke-width="4"/>'+
line(170,151,170+f1*.14,151,'#7ce8ae',5,'marker-end="url(#a-'+id+')"')+
line(420,151,420-f2*.14,151,'#ffca7d',5,'marker-end="url(#b-'+id+')"')+
label(135,103,'Fₐ₁ →')+label(396,103,'← Fₐ₂')+
rect(65,240,g,17,'#7ce8ae')+label(255,255,'Effort résultant : 0,25 px/N');break;}
case 'hydraulic-laminar-critical-flow-01':{
const rad=x*1.6;g=40*y;
s=label(35,35,'Eau : ρ=998 kg/m³ ; μ=0,001 Pa·s ; Re₀=2 300')+
label(35,57,'D='+N(x)+' mm ; Qrepère='+N(y)+' L/min')+
rect(100,145-rad,400,2*rad,'#23435c')+
line(100,145-rad,500,145-rad,'#8ddcff',4)+line(100,145+rad,500,145+rad,'#8ddcff',4)+
line(150,145,150+g,145,'#7ce8ae',5,'marker-end="url(#a-'+id+')"')+
label(85,220,'Section circulaire ; diamètre affiché ×3,2 px/mm')+
label(85,250,'Flèche Q : 40 px/(L/min) ; seuil indicatif');break;}
case 'thermal-contact-heat-power-01':
g=.5*y;s=label(35,35,'Contact plan : A=0,060 m² ; ΔT=12 K')+label(35,57,'h_c='+N(x)+' W/(m²·K) ; P='+N(y)+' W')+
rect(80,100,180,112,'#8b4d43')+rect(266,100,180,112,'#315d78')+
rect(260,100,6,112,'#ffca7d')+
line(145,155,145+g,155,'#7ce8ae',6,'marker-end="url(#a-'+id+')"')+
label(90,126,'52 °C')+label(352,126,'40 °C')+
label(70,249,'Flux du chaud vers le froid ; flèche : 0,5 px/W');break;
case 'process-capability-cp-01':{
g=4800*x;const left=300-g/2,right=300+g/2;
s=label(35,35,'Tolérance : LI=19,90 mm ; LS=20,10 mm')+label(35,57,'σ='+N(x)+' mm ; Cp='+N(y)+' (sans unité)')+
rect(220,100,160,115,'#244a5e')+
line(220,100,220,215,'#ffca7d',4)+line(380,100,380,215,'#ffca7d',4)+
rect(left,140,g,35,'#7ce8ae')+
label(207,236,'LI')+label(369,236,'LS')+label(85,263,'Largeur tolérance 160 px ; dispersion 6σ : 800 px/mm');break;}
case 'second-order-damping-from-overshoot-01':{
g=.85*x;const z=y,wd=Math.sqrt(1-z*z),pts=[];
for(let i=0;i<=112;i++){const t=i/8;const out=1-Math.exp(-z*t)*(Math.cos(wd*t)+z/wd*Math.sin(wd*t));pts.push((i?'L':'M')+(60+34*t).toFixed(2)+' '+(220-85*out).toFixed(2));}
s=label(35,35,'Réponse indicielle idéale : ω_n=1 rad/s')+label(35,57,'Dépassement='+N(x)+' % ; ζ='+N(y))+
line(60,220,555,220,'#8ddcff',2)+line(60,135,555,135,'#ffca7d',2,'stroke-dasharray="7 5"')+
'<path d="'+pts.join(' ')+'" fill="none" stroke="#7ce8ae" stroke-width="4"/>'+
label(440,123,'Consigne 1')+label(60,255,'t (s) ; pic au-dessus de 1 : '+N(x)+' %');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-labelledby="t-'+id+' d-'+id+'" class="machine"><title id="t-'+id+'">'+esc(a.title)+'</title><desc id="d-'+id+'">Modèle 2D paramétrique. '+esc(a.assumptions)+'</desc><defs><marker id="a-'+id+'" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#7ce8ae"/></marker><marker id="b-'+id+'" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#ffca7d"/></marker></defs><rect x="1" y="1" width="598" height="298" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(10)+'" data-geom-px="'+g.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams,meta};
})(typeof window==='undefined'?globalThis:window);
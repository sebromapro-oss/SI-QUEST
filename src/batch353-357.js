(function(root){'use strict';
const prev=typeof module!=='undefined'&&module.exports?require('./batch348-352.js'):null;
const base=prev?prev.physics:root.SIInvestigations,prior=prev?prev.diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"hydraulic-pump-shaft-torque-01","world":"SI-06","title":"Pompe hydraulique — Couple théorique à l'arbre","subskill":"Puissance absorbée et rendement de pompe","context":"Un technicien prépare l'essai d'une pompe volumétrique de 25 cm³/tr et vérifie le couple demandé à son entraînement.","objective":"Calculer le couple mécanique d'entraînement à partir de la pression différentielle et de la cylindrée.","prereq":"Pression différentielle, travail par tour, rendement mécanique, conversions bar/Pa et cm³/m³.","flash":["Combien de pascals représentent 1 bar ?","Quel travail hydraulique fournit une cylindrée par tour ?","Pourquoi divise-t-on par le rendement mécanique ?"],"formula":"C = Δp Vg/(2π ηm)","assumptions":"Pompe idéale en débit, cylindrée Vg=25 cm³/tr, rendement mécanique constant ηm=0,90, pression différentielle de 40 à 220 bar, régime stationnaire ; frottements représentés par ηm. Couple positif dans le sens moteur ; aucun couple de démarrage calculé.","min":40,"max":220,"initial":160,"iu":"bar","u":"N·m","tol":0.3,"lo":0,"hi":80,"precision":3,"decision":"Seuil pédagogique fictif C≤80 N·m. Vérifier au banc les couples de démarrage et la courbe constructeur.","error":"Oublier le facteur 2π ou multiplier par ηm au lieu de diviser.","solution":"Δp=160 bar=16 000 000 Pa ; Vg=25 cm³/tr=25×10⁻⁶ m³/tr ; W_h=Δp Vg=400 J/tr ; C_h=400/(2π)=63,662 N·m ; C_arbre=C_h/0,90=70,736 N·m. Dimensions : Pa·m³/rad=J/rad=N·m. Seuil fictif respecté."},{"id":"hollow-shaft-elastic-twist-01","world":"SI-04","title":"Arbre creux — Rotation élastique entre deux sections","subskill":"Calcul de Jp pour une section annulaire","context":"Après remplacement d'un arbre creux de transmission, un mécanicien estime sa déformation angulaire sous couple.","objective":"Déterminer la rotation relative des sections d'un arbre creux soumis à un couple constant.","prereq":"Torsion de Saint-Venant, module de cisaillement, moment quadratique polaire, radians et degrés.","flash":["Quelle est l'unité du moment quadratique polaire J ?","Comment convertir des radians en degrés ?","La rotation double-t-elle si le couple double en élasticité linéaire ?"],"formula":"φ = TL/(GJ) ; J=π(Do⁴−Di⁴)/32","assumptions":"Arbre circulaire creux homogène, Do=60 mm, Di=40 mm, longueur L=1,20 m, G=80 GPa ; torsion de Saint-Venant, petites déformations, couple T de 80 à 420 N·m, pas de concentration de contrainte. Rotation positive selon le sens du couple ; résultat en degrés.","min":80,"max":420,"initial":240,"iu":"N·m","u":"°","tol":0.002,"lo":0,"hi":0.25,"precision":4,"decision":"Seuil fictif φ≤0,25°. Contrôler aussi la contrainte maximale, les liaisons et la fatigue.","error":"Utiliser le moment quadratique de flexion à la place du moment polaire ou oublier la conversion rad→°.","solution":"Do=0,060 m ; Di=0,040 m ; J=π(0,060⁴−0,040⁴)/32=1,02102×10⁻⁶ m⁴ ; GJ=81 681,4 N·m² ; TL=240×1,20=288 N·m² ; φ=288/81 681,4=0,003526 rad=0,20202°. Dimensions : N·m²/(Pa·m⁴)=1. Seuil fictif respecté."},{"id":"hydraulic-filter-bypass-capture-01","world":"SI-15","title":"Filtration — Efficacité globale avec dérivation","subskill":"Efficacité de capture particulaire issue d'un rapport bêta de filtration","context":"Un circuit hydraulique dispose d'un filtre β=100 ; une fraction du débit contourne la cartouche par un by-pass.","objective":"Déterminer la fraction totale de particules retenues lorsque le débit se partage entre filtre et dérivation.","prereq":"Rapport bêta, rendement de capture, bilan de particules et pourcentages.","flash":["Quelle efficacité correspond à β=100 sans dérivation ?","Les particules du débit dérivé sont-elles capturées ?","Quel bilan de particules permet de calculer le rendement global ?"],"formula":"ηglobale = (1−b)(1−1/β) × 100 %","assumptions":"Concentration amont identique dans les deux branches ; fraction de débit dérivé b de 0 à 25 %, β=100 constant sur la branche filtrée ; régime établi, mélange parfait en aval, absence de dépôt dans le by-pass ; nombre de particules proportionnel au débit.","min":0,"max":25,"initial":8,"iu":"%","u":"%","tol":0.2,"lo":90,"hi":100,"precision":2,"decision":"Cible fictive ηglobale≥90 %. Mesurer les débits et les particules réelles avant de conclure sur la filtration.","error":"Appliquer β=100 au débit dérivé ou confondre 8 % et 0,08.","solution":"Débit dérivé b=8/100=0,08 ; fraction filtrée 0,92 ; efficacité du filtre ηf=1−1/100=0,99 ; ηglobale=0,92×0,99=0,9108=91,08 %. Vérification sur 10 000 particules : 800 contournent, 92 passent la cartouche, 9 108 sont capturées. Cible fictive respectée."},{"id":"threephase-compensated-line-current-01","world":"SI-08","title":"Tableau triphasé — Courant après compensation réactive","subskill":"Triangle des puissances en triphasé","context":"Un électrotechnicien estime le courant de ligne d'un atelier après réglage d'une batterie de condensateurs.","objective":"Calculer le courant efficace après compensation de puissance réactive à tension et puissance active constantes.","prereq":"Triangle P-Q-S, puissance apparente triphasée, tension composée, déphasage et kvar.","flash":["Comment obtenir S à partir de P et Q ?","Quelle relation lie S, U et I en triphasé équilibré ?","Pourquoi une surcompensation peut-elle faire remonter le courant ?"],"formula":"I = √[P²+(Q−Qc)²]/(√3 U)","assumptions":"Réseau triphasé sinusoïdal équilibré, U=400 V entre phases, P=5,0 kW, Q=4,0 kvar inductif avant compensation ; puissance capacitive Qc de 0 à 5 kvar ; pertes et harmoniques négligées. I est une valeur efficace positive, la surcompensation peut inverser Q net.","min":0,"max":5,"initial":3,"iu":"kvar","u":"A","tol":0.06,"lo":0,"hi":9,"precision":3,"decision":"Plafond fictif I≤9 A. Vérifier protections, harmoniques, tensions et risque de surcompensation sur l'installation réelle.","error":"Soustraire directement Qc au courant ou oublier √3 et la conversion kW→W.","solution":"P=5 000 W ; Qnet=(4−3) kvar=1 000 var ; S=√(5 000²+1 000²)=5 099,02 VA ; √3 U=692,82 V ; I=5 099,02/692,82=7,360 A. Dimensions : VA/V=A. Plafond fictif respecté."},{"id":"acoustic-energy-reflectance-01","world":"SI-07","title":"Acoustique — Fraction d'énergie réfléchie à une interface","subskill":"Coefficient de réflexion de pression à incidence normale entre deux milieux","context":"Sur un banc ultrasonore simplifié, un technicien compare l'énergie acoustique réfléchie par une interface plane entre deux milieux.","objective":"Calculer la part d'intensité incidente réfléchie à partir des impédances acoustiques.","prereq":"Impédance acoustique Z=ρc, coefficient de pression signé, énergie/intensité et pourcentage.","flash":["Que vaut la réflexion si Z₁=Z₂ ?","Le coefficient de pression peut-il être négatif ?","Pourquoi la fraction d'énergie réfléchie est-elle le carré du coefficient de pression ?"],"formula":"R_E = [(Z₂−Z₁)/(Z₂+Z₁)]² × 100 %","assumptions":"Onde plane, incidence normale, milieux semi-infinis non absorbants, Z₁=1,50 MRayl et Z₂ de 0,50 à 4,50 MRayl, impédances réelles positives ; interface sans couche intermédiaire. R_E est la fraction d'intensité réfléchie, non le coefficient de pression signé.","min":0.5,"max":4.5,"initial":3,"iu":"MRayl","u":"%","tol":0.2,"lo":0,"hi":15,"precision":3,"decision":"Seuil fictif R_E≤15 %. Une mesure réelle dépend aussi de l'angle, de l'atténuation et de la géométrie.","error":"Confondre coefficient de pression r et fraction d'intensité R_E=r², ou oublier de mettre le rapport au carré.","solution":"Z₁=1,50 MRayl ; Z₂=3,00 MRayl ; r=(3,00−1,50)/(3,00+1,50)=1/3 ; R_E=r²=1/9=0,111111=11,111 %. Contrôle d'énergie : T_E=1−R_E=88,889 % et R_E+T_E=100 %. Seuil fictif respecté."}];
const byId=Object.fromEntries(meta.map(a=>[a.id,a]));
const J=Math.PI*(.06**4-.04**4)/32;
const models={
'hydraulic-pump-shaft-torque-01':x=>x*1e5*25e-6/(2*Math.PI*.90),
'hollow-shaft-elastic-twist-01':x=>x*1.2/(80e9*J)*180/Math.PI,
'hydraulic-filter-bypass-capture-01':x=>(1-x/100)*.99*100,
'threephase-compensated-line-current-01':x=>Math.hypot(5000,(4-x)*1000)/(Math.sqrt(3)*400),
'acoustic-energy-reflectance-01':x=>100*((x-1.5)/(x+1.5))**2};
function calculate(id,x){const a=byId[id];if(!a)return base.calculate(id,x);
if(typeof x!=='number'||!Number.isFinite(x)||x<a.min||x>a.max)throw new RangeError('Paramètre hors domaine');
const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y;}
function assess(id,x){const a=byId[id];if(!a)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=a.lo&&value<=a.hi,min:a.lo,max:a.hi,unit:a.u});}
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(a=>[a.id,{min:a.lo,max:a.hi,unit:a.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(a=>[a.id,{absoluteTolerance:a.tol,relativeTolerance:0,precision:a.precision,assumptions:a.assumptions,solution:a.solution}]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(a=>[a.id,a.iu]))));
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(a=>[a.id,a.title]))));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const n=v=>Number(v.toPrecision(6)).toLocaleString('fr-FR',{maximumFractionDigits:6});
const line=(x1,y1,x2,y2,color='#8ddcff',w=3,attr='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+w+'" '+attr+'/>';
const text=(x,y,s)=>'<text x="'+x+'" y="'+y+'" font-size="15" fill="#fff">'+esc(s)+'</text>';
const box=(x,y,w,h,c)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"/>';
function render(id,x,y){const a=byId[id];if(!a)return prior.render(id,x,y);
if(!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');
let s='',g=0;switch(id){
case 'hydraulic-pump-shaft-torque-01':{
g=2*y;s=text(30,34,'Pompe : Vg = 25 cm³/tr ; ηm = 0,90')+text(30,57,'Δp = '+n(x)+' bar ; C = '+n(y)+' N·m')+
'<circle cx="190" cy="158" r="63" fill="#22445b" stroke="#8ddcff" stroke-width="4"/>'+
'<path d="M190 112 L220 158 L190 204 L160 158 Z" fill="#ffca7d" opacity=".9"/>'+
'<path d="M245 106 Q285 145 245 194" fill="none" stroke="#7ce8ae" stroke-width="5" marker-end="url(#a-'+id+')"/>'+
line(300,175,300+g,175,'#7ce8ae',7)+text(300,146,'Couple moteur : 2 px/(N·m)')+
text(60,265,'Modèle en régime établi ; pas de couple de démarrage');break;}
case 'hollow-shaft-elastic-twist-01':{
g=400*y;const ang=y*20*Math.PI/180;const cx=460,cy=158;
s=text(30,34,'Arbre creux : Dext=60 mm ; Dint=40 mm ; L=1,20 m')+text(30,57,'T='+n(x)+' N·m ; rotation φ='+n(y)+'°')+
box(110,133,340,50,'#27516a')+line(110,133,450,133,'#8ddcff',3)+line(110,183,450,183,'#8ddcff',3)+
'<circle cx="110" cy="158" r="35" fill="#31566c" stroke="#ffca7d" stroke-width="4"/>'+
'<circle cx="110" cy="158" r="22" fill="#092236" stroke="#ffca7d" stroke-width="3"/>'+
'<circle cx="460" cy="158" r="35" fill="#31566c" stroke="#7ce8ae" stroke-width="4"/>'+
'<circle cx="460" cy="158" r="22" fill="#092236" stroke="#7ce8ae" stroke-width="3"/>'+
line(460,158,460+30*Math.cos(ang),158-30*Math.sin(ang),'#ffca7d',4)+
box(75,235,g,12,'#7ce8ae')+text(75,275,'Rotation visuelle ×20 ; barre 400 px/°');break;}
case 'hydraulic-filter-bypass-capture-01':{
g=4*y;const bypass=2*x;
s=text(30,34,'Filtre β=100 ; fraction dérivée='+n(x)+' %')+text(30,57,'Particules capturées='+n(y)+' %')+
line(70,150,155,150,'#8ddcff',5)+line(155,150,155,110,'#8ddcff',4)+line(155,150,155,205,'#ffca7d',4)+
box(205,88,135,45,'#31566c')+text(218,115,'Filtre β=100')+
line(155,110,205,110,'#8ddcff',4)+line(340,110,445,110,'#8ddcff',4)+
line(155,205,445,205,'#ffca7d',Math.max(1,1+bypass/10))+
line(445,110,445,205,'#8ddcff',3)+line(445,150,530,150,'#8ddcff',5)+
box(75,246,g,12,'#7ce8ae')+text(75,280,'Barre capturée : 4 px/% ; dérivation non filtrée');break;}
case 'threephase-compensated-line-current-01':{
g=12*y;const q=4-x,py=210-18*q;
s=text(30,34,'Réseau 400 V ; P=5 kW ; Q=4 kvar avant correction')+text(30,57,'Qc='+n(x)+' kvar ; I='+n(y)+' A')+
line(125,210,295,210,'#8ddcff',4)+line(295,210,295,py,'#ffca7d',4)+
line(125,210,295,py,'#7ce8ae',5)+text(190,233,'P = 5 kW')+
text(310,q<0?244:195,'Q net='+n(q)+' kvar')+
box(385,236,g,13,'#7ce8ae')+text(385,273,'Courant : 12 px/A')+
text(75,90,'Triangle P–Q–S (Q signé ; schéma de principe)');break;}
case 'acoustic-energy-reflectance-01':{
const r=(x-1.5)/(x+1.5);g=160*Math.abs(r);
s=text(30,34,'Onde plane normale ; Z1=1,50 MRayl')+text(30,57,'Z2='+n(x)+' MRayl ; énergie réfléchie='+n(y)+' %')+
box(70,95,250,125,'#23435c')+box(325,95,210,125,'#315d78')+
line(322,90,322,226,'#ffca7d',4)+
line(110,154,300,154,'#7ce8ae',5,'marker-end="url(#a-'+id+')"')+
(g>1e-8?line(300,184,300-g,184,'#ffca7d',5,'marker-end="url(#b-'+id+')"'):'')+
text(85,117,'Milieu 1')+text(380,117,'Milieu 2')+
text(70,255,'Flèche réfléchie : 160|r| px ; r='+n(r))+
text(70,281,r<0?'Inversion de phase de la pression réfléchie':'Phase de pression conservée');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" class="machine" viewBox="0 0 600 300" role="img" aria-labelledby="t-'+id+' d-'+id+'"><title id="t-'+id+'">'+esc(a.title)+'</title><desc id="d-'+id+'">Scène 2D paramétrique : '+esc(a.assumptions)+'</desc><defs><marker id="a-'+id+'" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#7ce8ae"/></marker><marker id="b-'+id+'" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#ffca7d"/></marker></defs><rect x="1" y="1" width="598" height="298" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(10)+'" data-geom-px="'+g.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams,meta};
})(typeof window==='undefined'?globalThis:window);
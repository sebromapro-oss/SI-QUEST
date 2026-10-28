(function(root){'use strict';
const prev=typeof module!=='undefined'&&module.exports?require('./batch333-337.js'):null;
const base=prev?prev.physics:root.SIInvestigations,prior=prev?prev.diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"battery-coulomb-soc-01","world":"SI-10","title":"Batterie — État de charge par comptage de coulombs","subskill":"État de charge idéal par intégration d'un courant constant","context":"Un technicien évalue l'état de charge théorique d'une batterie de traction de 100 Ah après une décharge à courant constant de 8 A.","objective":"Déterminer le pourcentage de charge restant et interpréter la limite du modèle.","prereq":"Charge électrique Q=It, ampère-heure, coulomb, pourcentage.","flash":["Combien de coulombs représentent 1 Ah ?","Une batterie de 100 Ah contient-elle 100 A de courant ?","Pourquoi l'estimation par comptage dérive-t-elle sans recalage ?"],"formula":"SOC=90−100×(I t/C), I=8 A, C=100 Ah","assumptions":"Batterie initialement à 90 % de charge ; capacité nominale C=100 Ah=360 000 C ; courant constant de décharge I=8 A ; durée t de 1 à 8 h ; rendement coulombique supposé égal à 1, sans autodécharge, température ni vieillissement ; SOC sans dimension affiché en %.","min":1,"max":8,"initial":4,"iu":"h","u":"%","tol":0.2,"lo":30,"hi":100,"decision":"Seuil fictif de mission : conserver SOC≥30 %. Une estimation réelle nécessite étalonnage du capteur, état de santé et recalage.","error":"Confondre Ah et A, oublier la durée ou prendre 90 % comme 90 Ah supplémentaires.","solution":"C=100 Ah=360 000 C ; I=8 A ; t=4 h=14 400 s. ΔQ=I t=115 200 C=32 Ah. SOC initial=90 %, SOC final=90−100×32/100=58 %. Bilan : 90 Ah initiaux−32 Ah=58 Ah. Critère fictif atteint."},{"id":"pump-displacement-from-flow-01","world":"SI-06","title":"Pompe hydraulique — Cylindrée déduite du débit","subskill":"Identification de cylindrée géométrique à partir du débit et du rendement volumétrique","context":"En atelier, un technicien mesure le débit réel d'une pompe à 1 500 tr/min pour estimer sa cylindrée géométrique.","objective":"Déduire la cylindrée en cm³/tr à partir du débit et du rendement volumétrique.","prereq":"Débit volumique, vitesse de rotation, rendement et conversions L/cm³.","flash":["Pourquoi le débit réel est-il inférieur au débit théorique d'une pompe ?","Combien de cm³ dans un litre ?","Quelle est l'unité de Q/n lorsque Q est en L/min et n en tr/min ?"],"formula":"Vg=1000 Q/(ηv n)","assumptions":"Pompe à cylindrée fixe, vitesse n=1 500 tr/min, rendement volumétrique constant ηv=0,90 ; débit réel Q de 12 à 36 L/min ; régime stabilisé sans fuite externe ; Vg en cm³/tr ; ηv est supposé connu et ne remplace pas un essai constructeur.","min":12,"max":36,"initial":24,"iu":"L/min","u":"cm³/tr","tol":0.12,"lo":0,"hi":25,"decision":"Critère fictif : cylindrée estimée ≤25 cm³/tr pour la pièce de rechange étudiée. Vérifier la plaque pompe, les fuites et le régime réel.","error":"Oublier ηv, inverser le rendement ou confondre litres et centimètres cubes.","solution":"Q=24 L/min=24 000 cm³/min ; n=1 500 tr/min ; ηv=0,90. Vg=24 000/(0,90×1 500)=17,7778 cm³/tr. Contrôle : 17,7778×1 500×0,90/1000=24 L/min. Critère fictif atteint."},{"id":"peltier-ideal-heat-01","world":"SI-12","title":"Module thermoélectrique — Contribution Peltier idéale","subskill":"Puissance thermique réversible de Peltier à une jonction","context":"Un technicien caractérise la contribution thermoélectrique idéale d'un module de banc à 300 K.","objective":"Calculer le terme réversible de Peltier et le distinguer du refroidissement net.","prereq":"Effet Seebeck, kelvin, intensité et puissance.","flash":["Quelle est l'unité du coefficient de Seebeck α ?","Pourquoi utiliser la température absolue T ?","La contribution Peltier suffit-elle à connaître la puissance frigorifique nette ?"],"formula":"Q̇P=α T I","assumptions":"Coefficient Seebeck équivalent α=0,040 V/K supposé constant, jonction froide à T=300 K ; courant I de 0,5 à 4 A dans le sens du pompage ; terme réversible seul, sans effet Joule, conduction parasite, résistance thermique ni limites du module ; Q̇P en W, pas puissance frigorifique nette.","min":0.5,"max":4,"initial":2,"iu":"A","u":"W","tol":0.25,"lo":20,"hi":50,"decision":"Seuil fictif : contribution idéale ≥20 W. Ne pas conclure à une capacité réelle de refroidissement sans bilan Joule, conduction et données constructeur.","error":"Prendre des °C dans la formule ou assimiler Q̇P à la puissance frigorifique réelle.","solution":"α=0,040 V/K ; T=300 K ; I=2 A. Π=αT=12 V ; Q̇P=ΠI=12 V×2 A=24 W. L'unité V·A vaut W. Le seuil fictif est atteint, mais les pertes restent exclues."},{"id":"acoustic-normal-reflection-01","world":"SI-07","title":"Acoustique — Réflexion de pression à une interface","subskill":"Coefficient de réflexion de pression à incidence normale entre deux milieux","context":"Un technicien étudie une impulsion acoustique plane arrivant normalement sur une interface entre deux conduits idéalisés.","objective":"Calculer le coefficient signé de réflexion de pression et interpréter le sens de propagation.","prereq":"Impédance acoustique spécifique Z=ρc, onde plane, rapport d'amplitudes.","flash":["Quel sens prend l'onde réfléchie par rapport à l'onde incidente ?","L'impédance acoustique Z est-elle une résistance électrique ?","Que devient le coefficient si Z₂=Z₁ ?"],"formula":"r=(Z₂−Z₁)/(Z₂+Z₁)","assumptions":"Incidence normale d'une onde plane linéaire ; milieux non dissipatifs ; impédance spécifique Z₁=400 Rayl, Z₂ de 600 à 1 600 Rayl ; absence de résonance, de pertes et de réflexion multiple ; coefficient r sans dimension, positif dans ce domaine.","min":600,"max":1600,"initial":1000,"iu":"Rayl","u":"sans unité","tol":0.008,"lo":0,"hi":0.5,"decision":"Critère fictif r≤0,5 ; pour une mesure réelle vérifier fréquence, géométrie et impédances complexes.","error":"Inverser les impédances, omettre le dénominateur ou confondre amplitude r et énergie réfléchie r².","solution":"Z₁=400 Rayl, Z₂=1 000 Rayl ; r=(1000−400)/(1000+400)=600/1400=0,428571 (sans unité). Fraction d'intensité réfléchie r²≈0,1837 (18,37 %), sous hypothèses idéales. Seuil fictif respecté."},{"id":"entropy-two-reservoirs-01","world":"SI-12","title":"Thermodynamique — Entropie créée par transfert thermique","subskill":"Production d'entropie lors d'un transfert entre deux réservoirs isothermes","context":"Un technicien analyse une quantité de chaleur transférée spontanément d'une source chaude à une source froide.","objective":"Calculer l'entropie totale créée et vérifier son signe.","prereq":"Température absolue, entropie Q/T, second principe.","flash":["Pourquoi le réservoir chaud perd-il de l'entropie ?","Quelle unité possède Q/T ?","Le transfert spontané peut-il créer une entropie négative ?"],"formula":"Scréée=Q(1/Tc−1/Th)","assumptions":"Deux réservoirs isothermes Th=400 K et Tc=300 K, Q positif de 100 à 900 J transféré du chaud vers le froid ; système total isolé, sans travail ni variation de température des réservoirs ; bilan de transfert irréversible ; entropie créée en J/K.","min":100,"max":900,"initial":600,"iu":"J","u":"J/K","tol":0.008,"lo":0,"hi":0.6,"decision":"Plafond fictif Scréée≤0,6 J/K par opération ; analyser les échanges réels et les températures variables avant toute optimisation.","error":"Oublier le signe de la perte d'entropie du chaud ou utiliser les °C.","solution":"Q=600 J ; ΔSchaud=−600/400=−1,5 J/K ; ΔSfroid=+600/300=+2,0 J/K ; Scréée=−1,5+2,0=0,5 J/K≥0. Le second principe est respecté ; seuil fictif atteint."}];
const byId=Object.fromEntries(meta.map(a=>[a.id,a]));
const models={
'battery-coulomb-soc-01':x=>90-8*x,
'pump-displacement-from-flow-01':x=>1000*x/(.9*1500),
'peltier-ideal-heat-01':x=>.04*300*x,
'acoustic-normal-reflection-01':x=>(x-400)/(x+400),
'entropy-two-reservoirs-01':x=>x*(1/300-1/400)
};
function calculate(id,x){const a=byId[id];if(!a)return base.calculate(id,x);if(!Number.isFinite(x)||x<a.min||x>a.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y;}
function assess(id,x){const a=byId[id];if(!a)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=a.lo&&value<=a.hi,min:a.lo,max:a.hi,unit:a.u});}
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(a=>[a.id,{min:a.lo,max:a.hi,unit:a.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(a=>[a.id,{absoluteTolerance:a.tol,relativeTolerance:0,precision:6,assumptions:a.assumptions,solution:a.solution}]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(a=>[a.id,a.iu]))));
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(a=>[a.id,a.title]))));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const N=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const L=(x1,y1,x2,y2,c='#8ddcff',w=3,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+w+'" '+extra+'/>';
const T=(x,y,s)=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="14">'+esc(s)+'</text>';
function render(id,x,y){const a=byId[id];if(!a)return prior.render(id,x,y);
if(!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');
let s='',width=0;
switch(id){
case 'battery-coulomb-soc-01':
width=3.5*y;s=T(50,42,'Batterie : 100 Ah ; charge initiale 90 %')+T(50,70,'I=8 A ; t='+N(x)+' h ; SOC='+N(y)+' %')+
'<rect x="110" y="120" width="350" height="50" rx="5" fill="#28465b" stroke="#8ddcff"/>'+
'<rect x="110" y="120" width="'+width.toFixed(5)+'" height="50" fill="#7ce8ae" data-soc-px="'+width.toFixed(5)+'"/>'+
'<rect x="460" y="133" width="12" height="24" fill="#8ddcff"/>'+
T(110,205,'Échelle de charge : 0 %')+T(390,205,'100 %')+
T(50,260,'Comptage idéal ; ni vieillissement ni recalage modélisés');break;
case 'pump-displacement-from-flow-01':
width=10*y;s=T(50,42,'Pompe : n=1 500 tr/min ; ηv=0,90')+T(50,70,'Débit réel Q='+N(x)+' L/min ; Vg='+N(y)+' cm³/tr')+
'<circle cx="160" cy="157" r="57" fill="#1c465f" stroke="#8ddcff" stroke-width="4"/>'+
'<circle cx="160" cy="157" r="12" fill="#092236" stroke="#8ddcff"/>'+
L(160,100,160,214,'#6faec9',2)+L(103,157,217,157,'#6faec9',2)+
'<rect x="290" y="130" width="270" height="24" fill="#294d64"/>'+
'<rect x="290" y="130" width="'+width.toFixed(5)+'" height="24" fill="#7ce8ae" data-displacement-px="'+width.toFixed(5)+'"/>'+
T(290,190,'0')+T(480,190,'30 cm³/tr')+T(45,267,'Barre à échelle 10 px/(cm³/tr) ; rotor schématique');break;
case 'peltier-ideal-heat-01':
width=6*y;s=T(50,42,'Jonction froide T=300 K ; α=0,040 V/K')+T(50,70,'Courant I='+N(x)+' A ; terme Peltier='+N(y)+' W')+
'<rect x="248" y="115" width="105" height="96" fill="#244c68" stroke="#8ddcff" stroke-width="3"/>'+
T(112,132,'Face froide')+T(390,132,'Face chaude')+
L(154,170,247,170,'#7ce8ae',5,'marker-end="url(#arrow-'+id+')"')+
L(354,170,449,170,'#ffca7d',5,'marker-end="url(#arrow-'+id+')"')+
'<rect x="100" y="238" width="'+width.toFixed(5)+'" height="12" fill="#7ce8ae" data-peltier-px="'+width.toFixed(5)+'"/>'+
T(400,251,'6 px/W')+T(50,284,'Contribution réversible uniquement ; pas de bilan net');break;
case 'acoustic-normal-reflection-01':
width=120*y;s=T(45,40,'Onde plane à incidence normale ; Z₁=400 Rayl')+
T(45,67,'Z₂='+N(x)+' Rayl ; coefficient de pression r='+N(y))+
'<rect x="90" y="110" width="210" height="125" fill="#17435b" opacity="0.65"/>'+
'<rect x="300" y="110" width="210" height="125" fill="#37506b" opacity="0.75"/>'+
L(300,105,300,242,'#ffca7d',3)+
L(125,160,285,160,'#7ce8ae',5,'marker-end="url(#arrow-'+id+')"')+
L(300,202,300-width,202,'#ffca7d',5,'marker-end="url(#arrow-'+id+')" data-reflection-px="'+width.toFixed(5)+'"')+
T(105,142,'Incidente →')+T(110,229,'← Réfléchie')+
T(360,145,'Transmise →')+
T(48,275,'Longueur réfléchie : 120×r px (amplitude)');break;
case 'entropy-two-reservoirs-01':
width=400*y/.8;s=T(50,40,'Réservoirs isothermes : Th=400 K ; Tc=300 K')+
T(50,66,'Q='+N(x)+' J ; entropie créée='+N(y)+' J/K')+
'<rect x="65" y="110" width="130" height="85" rx="8" fill="#79442b" stroke="#ffca7d"/>'+
'<rect x="402" y="110" width="130" height="85" rx="8" fill="#1e5970" stroke="#8ddcff"/>'+
T(83,155,'Chaud 400 K')+T(415,155,'Froid 300 K')+
L(205,150,390,150,'#7ce8ae',5,'marker-end="url(#arrow-'+id+')"')+
T(275,130,'Q →')+
'<rect x="80" y="230" width="400" height="14" fill="#23495e"/>'+
'<rect x="80" y="230" width="'+width.toFixed(5)+'" height="14" fill="#7ce8ae" data-entropy-px="'+width.toFixed(5)+'"/>'+
T(80,267,'0')+T(382,267,'0,8 J/K');break;
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-labelledby="t-'+id+' d-'+id+'" class="machine"><title id="t-'+id+'">'+esc(a.title)+'</title><desc id="d-'+id+'">Schéma 2D paramétrique. '+esc(a.assumptions)+'</desc><defs><marker id="arrow-'+id+'" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#ffca7d"/></marker></defs><rect x="1" y="1" width="598" height="298" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(10)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams,meta};
})(typeof window==='undefined'?globalThis:window);

(function(root){
  'use strict';
  const titles=['Cinématique','Dynamique','Statique et torseurs','Résistance des matériaux',
    'Transmissions mécaniques','Hydraulique','Pneumatique','Électricité',
    'Automatique et régulation','Énergie et puissance','Frottement et roulement',
    'Thermique','Métrologie','Matériaux','Maintenance et diagnostic',
    'Sécurité des machines','Systèmes intégrateurs'];
  const worlds=Object.freeze(titles.map((title,i)=>Object.freeze({
    id:'SI-'+String(i+1).padStart(2,'0'),title
  })));
  const levels=Object.freeze([
    Object.freeze({id:'gear-01',world:'SI-05',title:'Atelier des engrenages — Réducteur',url:'missions/gear-01.html'}),
    Object.freeze({id:'hydro-01',world:'SI-06',title:'Levage hydraulique — Vérin double effet',url:'missions/hydro-01.html'}),
    Object.freeze({id:'slope-01',world:'SI-03',title:'Sécurité en pente — Retenue statique',url:'missions/slope-01.html'}),
    Object.freeze({id:'electric-01',world:'SI-08',title:'Contrôle électrique — Diagnostic 12 V',url:'missions/electric-01.html'}),
    Object.freeze({id:'braking-01',world:'SI-01',title:'Contrôle du freinage — Distance d’arrêt',url:'missions/braking-01.html'}),
    Object.freeze({id:'rolling-01',world:'SI-11',title:'Étude du roulement — Résistance au roulement',url:'missions/rolling-01.html'}),
    Object.freeze({id:'spring-01',world:'SI-04',title:'Contrôle du ressort — Compression',url:'missions/spring-01.html'}),
    Object.freeze({id:'lever-01',world:'SI-03',title:'Équilibre du levier — Moments',url:'missions/lever-01.html'}),
    Object.freeze({id:'cooling-01',world:'SI-12',title:'Refroidissement thermique — Loi exponentielle',url:'missions/cooling-01.html'}),
    Object.freeze({id:"motion-01",world:"SI-01",title:"Translation uniforme",url:'missions/motion-01.html'}),
    Object.freeze({id:"accel-01",world:"SI-01",title:"Accélération constante",url:'missions/accel-01.html'}),
    Object.freeze({id:"rotation-01",world:"SI-01",title:"Vitesse angulaire",url:'missions/rotation-01.html'}),
    Object.freeze({id:"torque-01",world:"SI-03",title:"Moment d'une force",url:'missions/torque-01.html'}),
    Object.freeze({id:"pressure-01",world:"SI-06",title:"Pression hydraulique",url:'missions/pressure-01.html'}),
    Object.freeze({id:"flow-01",world:"SI-06",title:"Débit volumique",url:'missions/flow-01.html'}),
    Object.freeze({id:"power-01",world:"SI-10",title:"Puissance mécanique",url:'missions/power-01.html'}),
    Object.freeze({id:"ohm-01",world:"SI-08",title:"Loi d'Ohm",url:'missions/ohm-01.html'}),
    Object.freeze({id:"energy-01",world:"SI-10",title:"Énergie électrique",url:'missions/energy-01.html'}),
    Object.freeze({id:"heat-01",world:"SI-12",title:"Énergie thermique",url:'missions/heat-01.html'}),
    Object.freeze({id:"stress-01",world:"SI-04",title:"Contrainte normale",url:'missions/stress-01.html'}),
    Object.freeze({id:"strain-01",world:"SI-04",title:"Allongement élastique",url:'missions/strain-01.html'}),
    Object.freeze({id:"density-01",world:"SI-14",title:"Masse volumique",url:'missions/density-01.html'}),
    Object.freeze({id:"accuracy-01",world:"SI-13",title:"Erreur de mesure",url:'missions/accuracy-01.html'}),
    Object.freeze({id:"frequency-01",world:"SI-09",title:"Fréquence de rotation",url:'missions/frequency-01.html'}),
    Object.freeze({id:"kinetic-01",world:"SI-02",title:"Énergie cinétique d’un engin",url:'missions/kinetic-01.html'})
  ]);
  const targets=Object.freeze({universes:17,subskills:249,levels:996});
  const api=Object.freeze({worlds,levels,targets,byId:id=>levels.find(level=>level.id===id)||null});
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.SICatalog=api;
})(typeof window==='undefined'?globalThis:window);

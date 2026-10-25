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
    Object.freeze({id:'gear-01',world:'SI-05',title:'Gear Forge — Réducteur',url:'missions/gear-01.html'}),
    Object.freeze({id:'hydro-01',world:'SI-06',title:'Hydro Lift — Vérin double effet',url:'missions/hydro-01.html'}),
    Object.freeze({id:'slope-01',world:'SI-03',title:'Slope Guard — Retenue sur pente',url:'missions/slope-01.html'}),
    Object.freeze({id:'electric-01',world:'SI-08',title:'Volt Check — Diagnostic 12 V',url:'missions/electric-01.html'}),
    Object.freeze({id:'braking-01',world:'SI-01',title:'Brake Check — Distance d’arrêt',url:'missions/braking-01.html'}),
    Object.freeze({id:'rolling-01',world:'SI-11',title:'Rolling Lab — Résistance au roulement',url:'missions/rolling-01.html'}),
    Object.freeze({id:'spring-01',world:'SI-04',title:'Spring Check — Ressort de compression',url:'missions/spring-01.html'}),
    Object.freeze({id:'lever-01',world:'SI-03',title:'Lever Balance — Équilibre des moments',url:'missions/lever-01.html'}),
    Object.freeze({id:'cooling-01',world:'SI-12',title:'Thermo Cool — Refroidissement exponentiel',url:'missions/cooling-01.html'})
  ]);
  const targets=Object.freeze({universes:17,subskills:249,levels:996});
  const api=Object.freeze({worlds,levels,targets,byId:id=>levels.find(level=>level.id===id)||null});
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.SICatalog=api;
})(typeof window==='undefined'?globalThis:window);

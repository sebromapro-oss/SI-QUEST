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
    Object.freeze({id:'hydro-01',world:'SI-06',title:'Hydro Lift — Vérin double effet',url:'missions/hydro-01.html'})
  ]);
  const targets=Object.freeze({universes:17,subskills:249,levels:996});
  const api=Object.freeze({worlds,levels,targets,byId:id=>levels.find(level=>level.id===id)||null});
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.SICatalog=api;
})(typeof window==='undefined'?globalThis:window);

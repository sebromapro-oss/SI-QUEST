'use strict';
// Recette spatiale transversale : 7 scènes × 2 orientations × 3 temps ×
// 2 modes d'affichage = 84 rendus indépendants de la validation d'une réponse.
const test=require('node:test'),assert=require('node:assert/strict');
const scene=require('../src/scene3d.js');
const samples=[
 ['circular-02',2],['angular-accel-01',4],['brake-torque-01',50],
 ['torsion-01',80],['gear-mesh-01',40],['belt-speed-01',1500],
 ['rolling-load-01',.15]
];
for(const [id,value] of samples){
 test(id+' : 12 rendus 3D finis, accessibles et avec repère',()=>{
  assert.ok(scene.allowed.has(id));
  let checked=0;
  for(const yaw of [0,.7])for(const time of [0,.5,2.5])for(const conceptOnly of [false,true]){
   const svg=scene.render(id,yaw,.3,value,{time,zoom:1,conceptOnly});
   assert.match(svg,/<svg /);
   assert.match(svg,/<title id="scene3-title">/);
   assert.match(svg,/<desc id="scene3-desc">/);
   assert.match(svg,/class="scene3-axes"/);
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
   if(conceptOnly)assert.match(svg,/Exploration qualitative/);
   checked++;
  }
  assert.equal(checked,12);
 });
}
test('marqueur de courroie : phases extrêmes finies et refus des non-finies',()=>{
 for(const phase of [0,Math.PI,1e20,1e100,1e300]){
  const p=scene.beltMarkerPosition(phase);
  assert.equal(p.length,3);
  assert.ok(p.every(Number.isFinite));
 }
 for(const phase of [NaN,Infinity,-Infinity])assert.throws(()=>scene.beltMarkerPosition(phase),RangeError);
});

'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const scene=require('../src/scene3d.js');
const models=require('../src/investigations.js');

const cases=[
 {id:'circular-02',inputs:[1,6,12],unit:'m/s²',oracle:v=>{
  const r=.5,omega=v/r;return {result:omega*omega*r,check:d=>d.radius===r&&close(d.angularSpeed,omega)&&close(d.acceleration,omega*omega*r)};
 }},
 {id:'angular-accel-01',inputs:[1,8,20],unit:'rad/s²',oracle:t=>{
  const deltaOmega=120;return {result:deltaOmega/t,check:d=>close(d.deltaOmega,deltaOmega)&&close(d.alpha,deltaOmega/t)};
 }},
 {id:'brake-torque-01',inputs:[0,4,10],unit:'N·m',oracle:alpha=>{
  const J=8;return {result:J*alpha,check:d=>close(d.inertia,J)&&close(d.torque,J*alpha)};
 }},
 {id:'torsion-01',inputs:[30,120,240],unit:'MPa',oracle:torque=>{
  const diameterMm=30,radiusMm=diameterMm/2,polarMm4=Math.PI*diameterMm**4/32;
  const stressMpa=(torque*1000)*radiusMm/polarMm4;
  return {result:stressMpa,check:d=>close(d.diameter,diameterMm)&&close(d.stress,stressMpa)};
 }},
 {id:'gear-mesh-01',inputs:[10,40,60],unit:'mm',oracle:z2=>{
  const m=3,z1=20,r1=m*z1/2,r2=m*z2/2;
  return {result:r1+r2,check:d=>close(d.r1,r1)&&close(d.r2,r2)&&close(d.centerDistance,r1+r2)&&close(d.angularRatio,-r1/r2)};
 }},
 {id:'belt-speed-01',inputs:[100,900,1500],unit:'m/s',oracle:n=>{
  const radiusM=.2/2,omega=n/60*(2*Math.PI);
  return {result:radiusM*omega,check:d=>close(d.radius,radiusM)&&close(d.angularSpeed,omega)&&close(d.beltSpeed,radiusM*omega)};
 }},
 {id:'rolling-load-01',inputs:[0,.025,.05],unit:'N',oracle:coefficient=>{
  const normal=8000;return {result:coefficient*normal,check:d=>close(d.normal,normal)&&close(d.coefficient,coefficient)&&close(d.resistance,coefficient*normal)};
 }}
];
function close(a,b){return Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=1e-10*Math.max(1,Math.abs(b));}
for(const item of cases){
 test('oracle indépendant 3D et calcul SI : '+item.id,()=>{
  const page=fs.readFileSync(path.join(__dirname,'../missions',item.id+'.html'),'utf8');
  const match=page.match(/window\.SI_MISSION=(\{[^\n]+?\})<\/script>/);
  assert.ok(match,'Configuration nominale manquante');
  const config=JSON.parse(match[1]);
  assert.equal(config.unit,item.unit,'Unité de sortie attendue');
  assert.equal(config.min,item.inputs[0],'Borne inférieure auditée');
  assert.equal(config.max,item.inputs[2],'Borne supérieure auditée');
  for(const input of item.inputs){
   const expected=item.oracle(input);
   const actual=models.calculate(item.id,input);
   const spatial=scene.describe(item.id,input);
   assert.ok(close(actual,expected.result),item.id+' calcul indépendant à '+input);
   assert.ok(expected.check(spatial),item.id+' modèle 3D à '+input);
   const svg=scene.render(item.id,.2,.3,input,{time:.5});
   assert.match(svg,/<svg\b/);
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
   if(input===config.initial)assert.ok(close(config.expected,expected.result),'Nominal '+item.id);
  }
 });
}

// Réception des invariants temporels et des cas limites des scènes spatiales.
for(const item of cases){
 test('scène 3D : temps, caméra et mode exploration '+item.id,()=>{
  const x=item.inputs[1];
  for(const time of [0,.125,1,5]){
   for(const [yaw,pitch] of [[0,0],[.4,-.2],[-.5,.3]]){
    const svg=scene.render(item.id,yaw,pitch,x,{time,conceptOnly:true});
    assert.match(svg,/role="img" aria-labelledby="scene3-title scene3-desc"/);
    assert.match(svg,/Exploration qualitative/);
    assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
    assert.doesNotMatch(svg,/valeur calculée masquée[^<]*<\/text><text[^>]*>[^<]*[0-9]+(?:\.[0-9]+)?\s*(?:m\/s|MPa|N·m)/);
   }
  }
  for(const time of [-1,NaN,Infinity])assert.throws(()=>scene.render(item.id,0,0,x,{time}),RangeError);
  for(const zoom of [0,.49,2.01,Infinity])assert.throws(()=>scene.render(item.id,0,0,x,{zoom}),RangeError);
 });
}

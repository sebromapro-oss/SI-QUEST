'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const scene=require('../src/scene3d.js');
test('sept scènes 3D : rejeter les valeurs qui débordent les calculs dérivés',()=>{
 const huge=Number.MAX_VALUE;
 for(const id of scene.allowed){
  if(id==='angular-accel-01'){
   const d=scene.describe(id,huge);
   assert.ok(Number.isFinite(d.alpha),'accélération tendant vers zéro reste définie');
   assert.throws(()=>scene.render(id,0,0,huge,{time:huge}),RangeError);
  }else{
   assert.throws(()=>scene.describe(id,huge),RangeError,id);
  }
 }
});
test('engrenages 3D : nombre de dents sûr pour la représentation entière',()=>{
 assert.throws(()=>scene.describe('gear-mesh-01',Number.MAX_SAFE_INTEGER+1),RangeError);
 assert.equal(scene.describe('gear-mesh-01',40).centerDistance,90);
});
test('phases temporelles non finies : refus plutôt que SVG NaN/Infinity',()=>{
 assert.throws(()=>scene.render('belt-speed-01',0,0,1e300,{time:1e300}),RangeError);
 assert.throws(()=>scene.render('circular-02',0,0,1e150,{time:1e300}),RangeError);
 assert.throws(()=>scene.render('angular-accel-01',0,0,Number.MAX_VALUE,{time:Number.MAX_VALUE}),RangeError);
});

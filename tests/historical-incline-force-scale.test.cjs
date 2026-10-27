'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const M=require('../src/investigations.js'),D=require('../src/investigation-diagrams.js');
test('P1 40–75 : composante du poids projetée à la même échelle',()=>{
 for(const angle of [0,15,35]){
  const y=M.calculate('incline-force-01',angle),svg=D.render('incline-force-01',angle,y);
  const m=svg.match(/data-vector-length-px="([0-9.]+)" data-weight-length-px="([0-9.]+)"/);
  assert.ok(m,'métadonnées des vecteurs');
  const parallel=Number(m[1]),weight=Number(m[2]);
  assert.equal(weight,60);
  assert.ok(Math.abs(parallel-weight*Math.sin(angle*Math.PI/180))<1e-4);
  assert.ok(parallel<=weight+1e-9,'une composante ne peut dépasser le poids');
  assert.ok(Math.abs(y-600*9.81*Math.sin(angle*Math.PI/180))<1e-8);
 }
});

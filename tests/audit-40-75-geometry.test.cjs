'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const physics=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
test('Audit 40–75 : force de frottement appliquée au contact, sens opposé à v',()=>{
 for(const mu of [0,.1,.3,.8]){
  const F=physics.calculate('kinetic-friction-01',mu);
  const svg=diagrams.render('kinetic-friction-01',mu,F);
  assert.match(svg,/data-contact-y="168"/);
  if(mu===0)assert.doesNotMatch(svg,/data-frottement-longueur-px=/);
  else {const m=svg.match(/data-frottement-longueur-px="([0-9.]+)"/);assert.ok(m);assert.ok(Math.abs(Number(m[1])-130*mu/.7)<.001);}
  assert.match(svg,/x1="320" y1="74" x2="470" y2="74"/);
  assert.ok(Math.abs(F-mu*80*9.81)<1e-9);
 }
});
test('Audit 40–75 : ressort continu jusqu’à la masse et effort axial',()=>{
 for(const F of [0,100,300,500]){
  const svg=diagrams.render('spring-stiffness-01',F,physics.calculate('spring-stiffness-01',F));
  assert.match(svg,/data-ressort-continu="true"/);
  assert.match(svg,/L450 125 L485 125/);
  if(F===0)assert.doesNotMatch(svg,/x1="522" y1="125" x2=/);else {const len=Number(svg.match(/data-force-arrow-px="([^"]+)"/)[1]);assert.ok(Math.abs(len-60*F/500)<1e-6);}
  assert.equal(physics.calculate('spring-stiffness-01',F),F/.025);
 }
});
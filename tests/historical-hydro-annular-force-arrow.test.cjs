'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const physics=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
test('historique 40–75 : effort annulaire, direction et échelle graphique',()=>{
 const id='hydro-annular-force-01', pressures=[20,100,180];
 const forces=pressures.map(p=>physics.calculate(id,p));
 assert.ok(Math.abs(forces[2]/forces[0]-9)<1e-10);
 for(const p of pressures){
  const svg=diagrams.render(id,p,physics.calculate(id,p));
  const m=svg.match(/data-effort-annulaire-fleche-px="([0-9.]+)"/);
  assert.ok(m,'flèche de pression absente');
  assert.ok(Math.abs(Number(m[1])-120*p/180)<0.001);
  assert.ok(svg.includes('p = '+p+' bar'));
  const x=svg.match(/<line x1="450" y1="200" x2="([0-9.]+)" y2="200"/);
  assert.ok(x&&Number(x[1])<450,'sens de la force incorrect');
 }
});

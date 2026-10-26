'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),m=require('../src/investigations.js'),d=require('../src/investigation-diagrams.js');
test('Missions 40–75 : cercles primitifs tangents et hors légende',()=>{
 for(const [id,values,z1] of [['gear-mesh-01',[10,20,40,60],20],['gear-ratio-02',[18,36,54,72],18]]){
  for(const z of values){const svg=d.render(id,z,m.calculate(id,z));
   const cs=[...svg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/g)].slice(0,2).map(a=>a.slice(1).map(Number));
   assert.equal(cs.length,2);const [[x1,y1,r1],[x2,y2,r2]]=cs;
   assert.ok(r1>0&&r2>0&&r1<=70&&r2<=70);
   assert.ok(Math.abs(x2-x1-r1-r2)<1e-8);
   assert.ok(Math.abs(r2/r1-z/z1)<1e-8);
   assert.ok(Math.min(y1-r1,y2-r2)>50&&Math.max(y1+r1,y2+r2)<205);
  }
 }
});

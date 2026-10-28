'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const M=require('../src/investigations.js'),D=require('../src/investigation-diagrams.js');
test('gear-mesh-01 : domaine entier, conversion et représentation',()=>{
 const h=fs.readFileSync('missions/gear-mesh-01.html','utf8');
 assert.match(h,/Objectifs, prérequis et réactivation/);assert.equal((h.match(/<li>/g)||[]).length,3);
 assert.match(h,/de 10 à 60 dents/);assert.match(h,/y="218" fill="white">dents/);
 const c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(c.id,'gear-mesh-01');
 for(const z of [10,40,60]){const a=M.calculate(c.id,z),d1=3*20,d2=3*z;assert.ok(Math.abs(a-(d1+d2)/2)<1e-10);const svg=D.render(c.id,z,a);assert.match(svg,/<svg/);assert.doesNotMatch(svg,/NaN|Infinity/);}
 for(const z of [9,61,40.5,0,-1,NaN,Infinity])assert.throws(()=>M.calculate(c.id,z),RangeError);
});

'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch378-382.js'),C=require('../src/catalog.js');
const refs={
'pump-affinity-shaft-power-01':x=>5*x*x*x/3375000000,
'sampling-nyquist-rate-01':x=>2*x+x/2,
'radiation-two-gray-plates-01':x=>(12/23)*5.670374419e-8*.8*(x*x*x*x-8100000000),
'shaft-key-allowable-torque-01':x=>9.6*x,
'sensor-4-20ma-pressure-01':x=>25*(x/1000-.004)/.016
};
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-8*Math.max(1,Math.abs(y)),x+' != '+y);
for(const a of meta)test(a.id+' : contre-calcul, SVG, bornes, domaine',()=>{
const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(c.id,a.id);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal(h.split('batch378-382.js').length,2);assert.equal(C.byId(a.id).subskill,a.subskill);
for(const x of [a.min,a.initial,a.max]){const y=M.calculate(a.id,x),svg=D.render(a.id,x,y);near(y,refs[a.id](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);near(Number(svg.match(/data-geom-px="([^"]+)/)[1]),a.scale*y);assert.equal(M.assess(a.id,x).acceptable,y>=a.lo&&y<=a.hi);}
for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);near(c.expected,M.calculate(a.id,a.initial));});
test('invariants et catalogue',()=>{
for(const x of [900,1200,1800])near(M.calculate('pump-affinity-shaft-power-01',x)/x**3,5/1500**3);
for(const x of [50,200,500])near(M.calculate('sampling-nyquist-rate-01',x)/(2*x),1.25);
for(const x of [320,420,480])near(M.calculate('radiation-two-gray-plates-01',x)/(x**4-300**4),5.670374419e-8*.8/(1/.8+1/.6-1));
for(const x of [25,40,65])near(M.calculate('shaft-key-allowable-torque-01',x)/x,9.6);
for(const x of [4,12,20])near(M.calculate('sensor-4-20ma-pressure-01',x),25*(x-4)/16);
assert.ok(C.levels.length >= 382);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(C.targets.subskills,249);assert.ok(new Set(C.levels.map(x=>x.subskill).filter(Boolean)).size>=249);assert.equal(C.worlds.length,17);});

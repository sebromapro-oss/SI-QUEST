'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch363-367.js'),C=require('../src/catalog.js');
const refs={
'euler-pinned-column-load-01':x=>Math.PI**3*210e9*.04**4/(64*1000*x*x),
'sudden-expansion-loss-01':x=>499*(.001*4/Math.PI*(1/.02**2-1/(x/1000)**2))**2/1000,
'regen-braking-soc-gain-01':x=>100*1200*.65*x*x/(2*3.6*3.6*72000000),
'lumped-cooling-threshold-time-01':x=>-180*Math.log((x-20)/100),
'pneumatic-receiver-added-mass-01':x=>(x-2)*5000/(287.05*293.15)
};
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-8*Math.max(1,Math.abs(y)),x+' != '+y);
for(const a of meta)test(a.id+' : contre-calcul, unités, géométrie et domaines',()=>{
const html=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,a.id);assert.equal((html.match(/<li>/g)||[]).length,3);assert.equal(html.split('batch363-367.js').length,2);assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(M.inputUnits[a.id],a.iu);
for(const x of [a.min,a.initial,a.max]){const y=M.calculate(a.id,x);near(y,refs[a.id](x));const svg=D.render(a.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-geom-px/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);near(Number(svg.match(/data-geom-px="([^"]+)/)[1]),a.scale*y);}
for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);near(cfg.expected,M.calculate(a.id,a.initial));
});
test('invariants, historicité et intégrité du catalogue',()=>{
for(const x of [1.2,2,3])near(M.calculate('euler-pinned-column-load-01',x)*x*x,M.calculate('euler-pinned-column-load-01',2)*4);
for(const x of [25,40,50])assert.ok(M.calculate('sudden-expansion-loss-01',x)>0);
for(const x of [30,60,90])near(M.calculate('regen-braking-soc-gain-01',x)/x**2,M.calculate('regen-braking-soc-gain-01',60)/3600);
for(const x of [50,60,90])near(Math.exp(-M.calculate('lumped-cooling-threshold-time-01',x)/180),(x-20)/100);
for(const x of [3,6,9])near(M.calculate('pneumatic-receiver-added-mass-01',x)/(x-2),.05*1e5/(287.05*293.15));
for(const id of ['circular-02','angular-accel-01']){const h=fs.readFileSync('missions/'+id+'.html','utf8');assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/Objectif/);assert.match(h,/Prérequis/);}
assert.equal(C.levels.length,367);assert.equal(new Set(C.levels.map(x=>x.id)).size,367);
});

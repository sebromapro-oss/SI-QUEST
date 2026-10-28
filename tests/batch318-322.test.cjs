'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{physics:M,diagrams:D,meta}=require('../src/batch318-322.js'),C=require('../src/catalog.js');
const refs={"pump-npsh-available-01":[[0.5,4.91335372069317],[0.8,7.971457696228338],[1.5,15.107033639143731]],"circular-shaft-bending-stress-01":[[30,4.77464829275686],[120,19.09859317102744],[250,39.78873577297383]],"mean-type-a-uncertainty-01":[[4,0.02],[16,0.01],[25,0.008]],"induction-motor-slip-01":[[1400,6.666666666666667],[1440,4],[1490,0.6666666666666666]],"first-order-lowpass-gain-01":[[10,0.9950371902099892],[200,0.4472135954999579],[1000,0.09950371902099892]]};
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const a of meta)test(a.id+' : contre-calculs, unités, domaine, SVG, tolérance',()=>{
const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,a.id);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(M.criteria[a.id].unit,a.u);assert.equal(M.inputUnits[a.id],a.iu);
for(const [x,y] of refs[a.id]){close(M.calculate(a.id,x),y);const svg=D.render(a.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-result=/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+10),RangeError);
assert.equal(M.validateAnswer(String(cfg.expected).replace('.',','),cfg.expected,a.tol).correct,true);
assert.equal(M.validateAnswer(String(cfg.expected+2*a.tol),cfg.expected,a.tol).correct,false);
});
test('propriétés physiques indépendantes et unicité du catalogue',()=>{
for(const [x,y] of refs['pump-npsh-available-01'])close((y-1/19.62)*9810+2300,x*1e5);
for(const [x,y] of refs['circular-shaft-bending-stress-01'])close(y*1e6*(Math.PI*.04**4/64)/(.04/2),x);
for(const [x,y] of refs['mean-type-a-uncertainty-01'])close(x*y*y,.04**2);
for(const [x,y] of refs['induction-motor-slip-01'])close(x+15*y,1500);
for(const [x,y] of refs['first-order-lowpass-gain-01'])close(y*y*(1+(x/100)**2),1);
assert.throws(()=>M.calculate('mean-type-a-uncertainty-01',8.5),RangeError);
assert.ok(C.levels.length>=322);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);
});
test('schémas paramétriques et amplification sans tromperie',()=>{
for(const a of meta){const lo=D.render(a.id,a.min,M.calculate(a.id,a.min)),hi=D.render(a.id,a.max,M.calculate(a.id,a.max));assert.notEqual(lo,hi);assert.match(lo,/data-parameter=/);assert.match(hi,/data-parameter=/);}
const s=D.render('first-order-lowpass-gain-01',200,M.calculate('first-order-lowpass-gain-01',200));assert.match(s,/data-gain-px=/);assert.match(s,/Barres proportionnelles/);
});

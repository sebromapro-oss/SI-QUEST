'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{physics:M,diagrams:D,meta}=require('../src/batch308-312.js'),C=require('../src/catalog.js');
const refs={
'pitot-incompressible-speed-01':[[50,0.316227766016838],[320,0.8],[800,1.264911064067352]],
'dc-parallel-current-divider-01':[[6,4],[18,2.4],[24,2]],
'exchanger-ntu-equal-capacity-01':[[0.2,16.666666666666668],[1.5,60],[4,80]],
'stepper-microstep-angle-01':[[1,1.8],[8,0.225],[16,0.1125]],
'fatigue-notch-factor-01':[[0,1],[0.6,1.9],[1,2.5]]
};
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const a of meta)test(a.id+' : calculs de référence, bornes, unités, géométrie et tolérance',()=>{
 const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,a.id);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(M.criteria[a.id].unit,a.u);assert.equal(M.inputUnits[a.id],a.iu);
 for(const [x,y] of refs[a.id]){close(M.calculate(a.id,x),y);const svg=D.render(a.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-result=/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
 for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
 assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+10),RangeError);
 assert.equal(M.validateAnswer(String(cfg.expected).replace('.',','),cfg.expected,a.tol).correct,true);
 assert.equal(M.validateAnswer(String(cfg.expected+2*a.tol),cfg.expected,a.tol).correct,false);
});
test('invariants indépendants et domaine entier des micropas',()=>{
 for(const [x,y] of refs['pitot-incompressible-speed-01'])close(500*y*y,x);
 for(const x of [6,18,24]){const r2=x,v=6/(1/12+1/r2);close(M.calculate('dc-parallel-current-divider-01',x),v/r2);close(v/12+v/r2,6);}
 for(const x of [0.2,1.5,4]){const e=M.calculate('exchanger-ntu-equal-capacity-01',x)/100;close(e/(1-e),x);}
 for(const x of [1,8,16])close(M.calculate('stepper-microstep-angle-01',x)*200*x,360);
 for(const q of [0,.6,1])close(M.calculate('fatigue-notch-factor-01',q),(1-q)*1+q*2.5);
 assert.throws(()=>M.calculate('stepper-microstep-angle-01',8.5),RangeError);
 const ui=fs.readFileSync('src/investigation-mission.js','utf8');assert.match(ui,/c\.inputStep===1/);
 assert.ok(C.levels.length>=312);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);
});

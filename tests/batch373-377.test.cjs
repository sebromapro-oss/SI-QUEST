'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch373-377.js'),C=require('../src/catalog.js');
const refs={
'rl-series-phase-angle-01':x=>Math.atan(Math.PI*x/100)*180/Math.PI,
'pump-affinity-head-01':x=>x*x/72000,
'metrology-expanded-uncertainty-01':x=>Math.sqrt(.0256+4*x*x),
'cylindrical-insulation-heat-flow-01':x=>6.4*Math.PI/Math.log(x/20),
'spur-gear-radial-load-01':x=>2000*Math.sin(x*Math.PI/180)/Math.cos(x*Math.PI/180)
};
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-8*Math.max(1,Math.abs(y)),x+' != '+y);
for(const a of meta)test(a.id+' : contre-calcul, géométrie, domaines, intégration',()=>{
 const html=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,a.id);assert.equal((html.match(/<li>/g)||[]).length,3);assert.equal(html.split('batch373-377.js').length,2);assert.equal(C.byId(a.id).subskill,a.subskill);
 assert.equal(M.inputUnits[a.id],a.iu);assert.equal(cfg.unit,a.u);assert.equal(cfg.inputUnit,a.iu);
 for(const x of [a.min,a.initial,a.max]){const y=M.calculate(a.id,x);near(y,refs[a.id](x));const svg=D.render(a.id,x,y);
 assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);near(Number(svg.match(/data-geom-px="([^"]+)/)[1]),a.scale*y);
 assert.equal(M.assess(a.id,x).acceptable,y>=a.lo&&y<=a.hi);
 }
 for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
 assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);
 near(cfg.expected,M.calculate(a.id,a.initial));
});
test('invariants scientifiques et audit pédagogique historique',()=>{
 for(const x of [20,50,100]){const phi=M.calculate('rl-series-phase-angle-01',x)*Math.PI/180;near(Math.tan(phi),2*Math.PI*x*.1/20);}
 for(const x of [800,1200,1600])near(M.calculate('pump-affinity-head-01',x)/x**2,20/1200**2);
 for(const x of [.02,.06,.12])near(M.calculate('metrology-expanded-uncertainty-01',x)**2-4*x*x,4*.08**2);
 for(const x of [30,50,80])near(M.calculate('cylindrical-insulation-heat-flow-01',x)*Math.log(x/20),6.4*Math.PI);
 for(const x of [14,20,25])near(M.calculate('spur-gear-radial-load-01',x)/Math.tan(x*Math.PI/180),2000);
 for(const id of ['brake-torque-01','incline-force-01']){const h=fs.readFileSync('missions/'+id+'.html','utf8');assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/Objectif/);assert.match(h,/Prérequis/);assert.match(h,/Repère et hypothèses/);}
 near(M.calculate('brake-torque-01',4),32);near(M.calculate('incline-force-01',15),600*9.81*Math.sin(Math.PI/12));
 assert.equal(C.levels.length,377);assert.equal(new Set(C.levels.map(x=>x.id)).size,377);
 assert.equal(new Set(C.levels.map(x=>x.subskill).filter(Boolean)).size,249);assert.equal(C.worlds.length,17);
});

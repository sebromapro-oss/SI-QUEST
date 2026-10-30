'use strict';const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');const {physics:M,diagrams:D}=require('../src/batch218-222.js'),C=require('../src/catalog.js');const cases=[{"id":"stokes-sphere-drag-01","x":5,"min":0,"max":10,"expected":0.1884955592153876,"iu":"mm/s","u":"mN","w":"SI-11","tol":0.003},{"id":"magnetic-airgap-force-01","x":0.4,"min":0,"max":0.8,"expected":12.73239544735163,"iu":"T","u":"N","w":"SI-08","tol":0.1},{"id":"gear-tooth-tangential-force-01","x":120,"min":0,"max":300,"expected":1600,"iu":"N·m","u":"N","w":"SI-05","tol":5},{"id":"pendulum-small-angle-period-01","x":1,"min":0.2,"max":2,"expected":2.0060666807106475,"iu":"m","u":"s","w":"SI-09","tol":0.01},{"id":"radial-insulation-resistance-01","x":50,"min":30,"max":80,"expected":2.4515066683627955,"iu":"mm","u":"K/W","w":"SI-12","tol":0.02}];
const reference={
'stokes-sphere-drag-01':x=>3*Math.PI*1*.004*(x*.001)*1000,
'magnetic-airgap-force-01':x=>(x*x/(8*Math.PI*1e-7))*(.0002),
'gear-tooth-tangential-force-01':x=>x/.075,
'pendulum-small-angle-period-01':x=>2*Math.PI/Math.sqrt(9.81/x),
'radial-insulation-resistance-01':x=>1/(2*Math.PI*.045/Math.log(x/25))
};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const q of cases)test(q.id+' : contre-calcul indépendant, limites, unités et SVG',()=>{
const h=fs.readFileSync('missions/'+q.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.equal(C.byId(q.id).world,q.w);assert.equal(M.criteria[q.id].unit,q.u);assert.equal(M.inputUnits[q.id],q.iu);near(c.expected,q.expected);
for(const x of [q.min,(q.min+q.x)/2,q.x,(q.x+q.max)/2,q.max]){const y=M.calculate(q.id,x);near(y,reference[q.id](x));const svg=D.render(q.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.ok(svg.includes(q.iu)&&svg.includes(q.u));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);assert.match(svg,/data-parameter=/);}
for(const x of [q.min-.001,q.max+.001,NaN,Infinity])assert.throws(()=>M.calculate(q.id,x),RangeError);
assert.ok(M.answerPolicy[q.id].solution.length>200);assert.equal(M.validateAnswer(String(q.expected).replace('.',','),q.expected,q.tol).correct,true);assert.match(h,/Questions flash/);
});
test('invariants physiques et vecteurs nuls',()=>{
near(M.calculate(cases[0].id,10),2*M.calculate(cases[0].id,5));near(M.calculate(cases[1].id,.8),4*M.calculate(cases[1].id,.4));near(M.calculate(cases[2].id,240),2*M.calculate(cases[2].id,120));near(M.calculate(cases[3].id,1),2*M.calculate(cases[3].id,.25));assert.ok(M.calculate(cases[4].id,80)>M.calculate(cases[4].id,50));
for(const id of [cases[0].id,cases[1].id,cases[2].id])assert.doesNotMatch(D.render(id,0,0),/marker-end=/);
assert.throws(()=>D.render(cases[2].id,120,500),RangeError);
});
test('P2 historique : piston et volume cohérents avec la course',()=>{
const B=require('../src/investigations.js'),G=require('../src/investigation-diagrams.js');const a=G.render('hydro-volume-01',0,B.calculate('hydro-volume-01',0)),b=G.render('hydro-volume-01',600,B.calculate('hydro-volume-01',600));assert.match(a,/data-piston-x="125.00"/);assert.match(b,/data-piston-x="245.00"/);assert.match(a,/V = 0 L/);assert.match(b,/V = 3 L/);assert.match(a,/L = 0 mm/);
});
test('catalogue : identifiants uniques et 17 univers',()=>{assert.ok(C.levels.length>=222);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);});

test('P1 scientifique : valeur numérique du corrigé radial',()=>{near(M.calculate('radial-insulation-resistance-01',50),2.4515066683627955);assert.match(M.answerPolicy['radial-insulation-resistance-01'].solution,/2,45151 K\/W/);});

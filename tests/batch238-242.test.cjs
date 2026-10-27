'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D}=require('../src/batch238-242.js'),C=require('../src/catalog.js');
const cases=[{"id":"shaft-key-bearing-pressure-01","x":160,"min":0,"max":320,"expected":50,"iu":"N·m","u":"MPa","w":"SI-04","tol":0.2},{"id":"ultrasonic-time-of-flight-01","x":8,"min":2,"max":12,"expected":1.372,"iu":"ms","u":"m","w":"SI-13","tol":0.01},{"id":"square-screw-lead-angle-01","x":6,"min":1,"max":14,"expected":4.5498653091210866,"iu":"mm","u":"°","w":"SI-05","tol":0.08},{"id":"capillary-rise-water-01","x":0.5,"min":0.2,"max":1,"expected":29.74348288830464,"iu":"mm","u":"mm","w":"SI-06","tol":0.3},{"id":"sample-hold-phase-lag-01","x":5,"min":0,"max":20,"expected":-18,"iu":"Hz","u":"°","w":"SI-09","tol":0.5}];
const refs={
"shaft-key-bearing-pressure-01":x=>(x/.02)/(.004*.04)/1e6,
"ultrasonic-time-of-flight-01":x=>343*(x*.001)/2,
"square-screw-lead-angle-01":x=>Math.asin((x/(Math.PI*24))/Math.hypot(1,x/(Math.PI*24)))*180/Math.PI,
"capillary-rise-water-01":x=>.1456/(998*9.81*(x*.001))*1000,
"sample-hold-phase-lag-01":x=>-360*x*.01
};
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const q of cases)test(q.id+' : contre-calcul indépendant, cinq états, unités, SVG et domaine',()=>{
const h=fs.readFileSync('missions/'+q.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(C.byId(q.id).world,q.w);assert.equal(M.criteria[q.id].unit,q.u);assert.equal(M.inputUnits[q.id],q.iu);near(c.expected,q.expected);
for(const x of [q.min,(q.min+q.x)/2,q.x,(q.x+q.max)/2,q.max]){const y=M.calculate(q.id,x),svg=D.render(q.id,x,y);near(y,refs[q.id](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-parameter=/);assert.ok(svg.includes(q.iu)&&svg.includes(q.u));assert.doesNotMatch(svg,/NaN|Infinity|undefined/)}
for(const x of [q.min-.001,q.max+.001,NaN,Infinity])assert.throws(()=>M.calculate(q.id,x),RangeError);
assert.ok(M.answerPolicy[q.id].solution.length>300);assert.equal(M.validateAnswer(String(q.expected).replace('.',','),q.expected,q.tol).correct,true);
assert.match(h,/Questions flash/);assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/aucune animation temporelle artificielle/);assert.throws(()=>D.render(q.id,q.x,q.expected+100),RangeError);
});
test('invariants physiques et décisions aux bornes',()=>{
near(M.calculate(cases[0].id,320),2*M.calculate(cases[0].id,160));near(M.calculate(cases[1].id,12),1.5*M.calculate(cases[1].id,8));
assert.ok(M.calculate(cases[2].id,14)>M.calculate(cases[2].id,6));near(M.calculate(cases[3].id,.5),2*M.calculate(cases[3].id,1));near(M.calculate(cases[4].id,20),4*M.calculate(cases[4].id,5));
for(const q of cases){assert.equal(M.assess(q.id,q.x).acceptable,true);assert.equal(M.assess(q.id,q.max).acceptable,false)}
});
test('catalogue extensible, cinq sous-savoirs et 17 univers',()=>{assert.ok(C.levels.length>=242);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);assert.equal(new Set(cases.map(q=>C.byId(q.id).subskill)).size,5)});
test('frottement historique : longueur de flèche proportionnelle à μ',()=>{const B=require('../src/investigations.js'),G=require('../src/investigation-diagrams.js');for(const mu of [.1,.25,.7]){const svg=G.render('kinetic-friction-01',mu,B.calculate('kinetic-friction-01',mu));const m=svg.match(/data-frottement-longueur-px="([0-9.]+)"/);assert.ok(m);assert.ok(Math.abs(Number(m[1])-130*mu/.7)<.001)}});

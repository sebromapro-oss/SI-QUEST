'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D}=require('../src/batch258-262.js'),C=require('../src/catalog.js');
const cases=[{"id":"screw-jack-self-locking-01","x":0.2,"min":0.02,"max":0.35,"expected":5.309932474020213,"iu":"μ (sans unité)","u":"°","w":"SI-05","tol":0.15},{"id":"sensor-hysteresis-fullscale-01","x":0.24,"min":0,"max":0.6,"expected":1.5,"iu":"mA","u":"%","w":"SI-13","tol":0.05},{"id":"gear-backlash-pitch-01","x":0.8,"min":0,"max":2,"expected":0.8377580409572781,"iu":"°","u":"mm","w":"SI-05","tol":0.025},{"id":"hydraulic-filter-captured-mass-01","x":8,"min":0,"max":20,"expected":22.8,"iu":"mg/L","u":"g","w":"SI-15","tol":0.5},{"id":"transformer-load-voltage-01","x":20,"min":0,"max":50,"expected":226.4,"iu":"A","u":"V","w":"SI-08","tol":0.2}];
const independent=[x=>Math.atan(x)*180/Math.PI-6,x=>100*x/(20-4),x=>60*(x*Math.PI/180),x=>x*(25*120)*.95/1000,x=>230-.18*x];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const [i,q] of cases.entries())test(q.id+' : cinq états, calcul indépendant, SVG, invalides',()=>{
 const h=fs.readFileSync('missions/'+q.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(C.byId(q.id).world,q.w);assert.equal(M.criteria[q.id].unit,q.u);assert.equal(M.inputUnits[q.id],q.iu);near(c.expected,q.expected);
 for(const x of [q.min,(q.min+q.x)/2,q.x,(q.x+q.max)/2,q.max]){const y=M.calculate(q.id,x),svg=D.render(q.id,x,y);
 near(y,independent[i](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-parameter=/);
 assert.ok(svg.includes(q.u));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
 for(const x of [q.min-.001,q.max+.001,NaN,Infinity])assert.throws(()=>M.calculate(q.id,x),RangeError);
 assert.ok(M.answerPolicy[q.id].solution.length>300);assert.equal(M.validateAnswer(String(q.expected).replace('.',','),q.expected,q.tol).correct,true);
 assert.match(h,/Questions flash/);assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/aucune animation temporelle artificielle/);
 assert.throws(()=>D.render(q.id,q.x,q.expected+100),RangeError);
});
test('propriétés et décisions physiques',()=>{
 near(M.calculate(cases[0].id,Math.tan(Math.PI/30)),0);
 near(M.calculate(cases[1].id,0),0);near(M.calculate(cases[2].id,2),2*Math.PI/3);
 near(M.calculate(cases[3].id,20),57);near(M.calculate(cases[4].id,0),230);
 for(const q of cases){assert.equal(M.assess(q.id,q.x).acceptable,true);assert.equal(M.assess(q.id,q.max).acceptable,false);}
});
test('historique 40–75 : instantané cinématique explicitement daté',()=>{
 const B=require('../src/investigations.js'),G=require('../src/investigation-diagrams.js');
 for(const x of [0,60,120]){const svg=G.render('frequency-01',x,B.calculate('frequency-01',x));
 assert.match(svg,/Instantané t = 0,07 s/);const m=svg.match(/data-angle-rad="([0-9.]+)"/);assert.ok(m);
 assert.ok(Math.abs(Number(m[1])-2*Math.PI*x/60*.07)<1e-6);}
});
test('catalogue extensible, unicité, 17 univers',()=>{
 assert.ok(C.levels.length>=262);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
 assert.equal(new Set(C.levels.map(x=>x.world)).size,17);assert.equal(new Set(cases.map(q=>C.byId(q.id).subskill)).size,5);
});

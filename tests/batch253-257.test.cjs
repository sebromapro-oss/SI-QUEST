'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D}=require('../src/batch253-257.js'),C=require('../src/catalog.js');
const cases=[{"id":"bearing-pv-factor-01","x":1200,"min":0,"max":2400,"expected":2.356194490192345,"iu":"tr/min","u":"MPa·m/s","w":"SI-15","tol":0.05},{"id":"three-phase-cable-voltage-drop-01","x":20,"min":0,"max":40,"expected":4.041451884327381,"iu":"A","u":"V","w":"SI-08","tol":0.1},{"id":"hydraulic-throttle-heat-01","x":40,"min":0,"max":100,"expected":1,"iu":"bar","u":"kW","w":"SI-06","tol":0.03},{"id":"pneumatic-receiver-fill-time-01","x":8,"min":6,"max":10,"expected":100,"iu":"bar manométrique","u":"s","w":"SI-07","tol":2},{"id":"half-power-damping-ratio-01","x":8,"min":2,"max":16,"expected":0.1,"iu":"Hz","u":"sans unité","w":"SI-09","tol":0.005}];
const independent={
'bearing-pv-factor-01':x=>(1500/(30*40))*(Math.PI*30*x/60000),
'three-phase-cable-voltage-drop-01':x=>Math.sqrt(3)*x*.8*(.0175*50/6),
'hydraulic-throttle-heat-01':x=>(x*100000)*(15/60/1000)/1000,
'pneumatic-receiver-fill-time-01':x=>50*(x-6),
'half-power-damping-ratio-01':x=>(x/2)/40
};
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const q of cases)test(q.id+' : cinq états, calcul indépendant, SVG et invalides',()=>{
 const h=fs.readFileSync('missions/'+q.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(C.byId(q.id).world,q.w);assert.equal(M.criteria[q.id].unit,q.u);assert.equal(M.inputUnits[q.id],q.iu);near(c.expected,q.expected);
 for(const x of [q.min,(q.min+q.x)/2,q.x,(q.x+q.max)/2,q.max]){const y=M.calculate(q.id,x),svg=D.render(q.id,x,y);
 near(y,independent[q.id](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-parameter=/);
 assert.ok(svg.includes(q.u));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
 for(const x of [q.min-.001,q.max+.001,NaN,Infinity])assert.throws(()=>M.calculate(q.id,x),RangeError);
 assert.ok(M.answerPolicy[q.id].solution.length>300);assert.equal(M.validateAnswer(String(q.expected).replace('.',','),q.expected,q.tol).correct,true);
 assert.match(h,/Questions flash/);assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/aucune animation temporelle artificielle/);
 assert.throws(()=>D.render(q.id,q.x,q.expected+100),RangeError);
});
test('limites physiques, seuils et géométries',()=>{
 for(const q of cases){assert.equal(M.assess(q.id,q.max).acceptable,false);assert.equal(M.assess(q.id,q.x).acceptable,true);}
 for(const id of cases.slice(0,3).map(x=>x.id))near(M.calculate(id,0),0);
 near(M.calculate('pneumatic-receiver-fill-time-01',6),0);near(M.calculate('half-power-damping-ratio-01',8),.1);
 assert.doesNotMatch(D.render(cases[0].id,0,0),/data-vitesse-largeur-px=/);
 assert.doesNotMatch(D.render(cases[2].id,0,0),/data-perte-largeur-px=/);
 assert.doesNotMatch(D.render(cases[3].id,6,0),/data-remplissage-largeur-px=/);
 assert.match(D.render(cases[4].id,8,.1),/data-bande-largeur-px="64"/);
});
test('historique 40–75 : conduction sans flèche de sens non justifiée',()=>{
 const B=require('../src/investigations.js'),G=require('../src/investigation-diagrams.js');
 for(const x of [0,15,40]){const svg=G.render('heat-transfer-01',x,B.calculate('heat-transfer-01',x));
 assert.match(svg,/Sens du flux non orienté/);assert.doesNotMatch(svg,/marker-end=/);}
});
test('catalogue extensible : 257 identifiants uniques, 17 univers, cinq sous-savoirs',()=>{
 assert.ok(C.levels.length>=257);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
 assert.equal(new Set(C.levels.map(x=>x.world)).size,17);assert.equal(new Set(cases.map(q=>C.byId(q.id).subskill)).size,5);
});

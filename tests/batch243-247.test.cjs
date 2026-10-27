'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D}=require('../src/batch243-247.js'),C=require('../src/catalog.js');
const cases=[{"id":"planetary-carrier-speed-01","x":100,"min":-100,"max":300,"expected":225,"iu":"tr/min","u":"tr/min","w":"SI-05","tol":1},{"id":"capacitor-stored-energy-01","x":48,"min":0,"max":100,"expected":5.4144,"iu":"V","u":"J","w":"SI-08","tol":0.05},{"id":"sensor-temperature-drift-01","x":30,"min":-20,"max":80,"expected":43.2,"iu":"K","u":"mV","w":"SI-13","tol":0.5},{"id":"belt-centrifugal-tension-01","x":12,"min":0,"max":20,"expected":72,"iu":"m/s","u":"N","w":"SI-05","tol":1},{"id":"thermal-penetration-length-01","x":50,"min":1,"max":200,"expected":48.98979485566356,"iu":"s","u":"mm","w":"SI-12","tol":0.3}];
const refs={
'planetary-carrier-speed-01':x=>600+(72/96)*(x-600),
'capacitor-stored-energy-01':x=>.0047*x*x/2,
'sensor-temperature-drift-01':x=>1.44*x,
'belt-centrifugal-tension-01':x=>x*x/2,
'thermal-penetration-length-01':x=>2*Math.sqrt(.000012*x)*1000
};
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const q of cases)test(q.id+' : contre-calcul indépendant, cinq états, unités, SVG et domaines',()=>{
const h=fs.readFileSync('missions/'+q.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(C.byId(q.id).world,q.w);assert.equal(M.criteria[q.id].unit,q.u);assert.equal(M.inputUnits[q.id],q.iu);near(c.expected,q.expected);
for(const x of [q.min,(q.min+q.x)/2,q.x,(q.x+q.max)/2,q.max]){const y=M.calculate(q.id,x),svg=D.render(q.id,x,y);near(y,refs[q.id](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-parameter=/);assert.ok(svg.includes(q.iu)&&svg.includes(q.u));assert.doesNotMatch(svg,/NaN|Infinity|undefined/)}
for(const x of [q.min-.001,q.max+.001,NaN,Infinity])assert.throws(()=>M.calculate(q.id,x),RangeError);
assert.ok(M.answerPolicy[q.id].solution.length>300);assert.equal(M.validateAnswer(String(q.expected).replace('.',','),q.expected,q.tol).correct,true);
assert.match(h,/Questions flash/);assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/aucune animation temporelle artificielle/);assert.throws(()=>D.render(q.id,q.x,q.expected+100),RangeError);
});
test('propriétés indépendantes et signes physiques',()=>{
near(M.calculate(cases[0].id,200),300);
near(M.calculate(cases[1].id,96),4*M.calculate(cases[1].id,48));
near(M.calculate(cases[2].id,-20),-28.8);
near(M.calculate(cases[3].id,20),4*M.calculate(cases[3].id,10));
near(M.calculate(cases[4].id,200),2*M.calculate(cases[4].id,50));
for(const q of cases)assert.equal(M.assess(q.id,q.max).acceptable,false);
});
test('géométries paramétriques et non-révélation des états nuls',()=>{
const ring=D.render(cases[0].id,100,225);assert.match(ring,/cx="275" cy="135" r="90"/);
const zero=D.render(cases[1].id,0,0);assert.match(zero,/data-energie-largeur-px="0"/);assert.doesNotMatch(zero,/>\+<\/text>/);
const cold=D.render(cases[2].id,-20,-28.8);assert.match(cold,/x2="287.56" y2="184"/);
const belt=D.render(cases[3].id,0,0);assert.doesNotMatch(belt,/x1="270" y1="83"/);
const depth=D.render(cases[4].id,50,M.calculate(cases[4].id,50));assert.match(depth,/data-diffusion-largeur-px="/);
});
test('catalogue extensible, cinq sous-savoirs et 17 univers',()=>{
assert.ok(C.levels.length>=247);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
assert.equal(new Set(C.levels.map(x=>x.world)).size,17);assert.equal(new Set(cases.map(q=>C.byId(q.id).subskill)).size,5);
});
test('historique 40–75 : flèche pneumatique proportionnelle à la pression',()=>{
const B=require('../src/investigations.js'),G=require('../src/investigation-diagrams.js');
assert.doesNotMatch(G.render('pneumatic-force-01',0,0),/x1="510" y1="129"/);
for(const x of [1,5,10]){const svg=G.render('pneumatic-force-01',x,B.calculate('pneumatic-force-01',x));
const m=svg.match(/x1="510" y1="129" x2="([0-9.]+)" y2="129"/);assert.ok(m);near(Number(m[1]),510+4.5*x);}
});

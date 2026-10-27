'use strict';const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{physics:M,diagrams:D}=require('../src/batch278-282.js'),C=require('../src/catalog.js');
const cases=[{"id":"welding-linear-energy-01","x":6,"min":4,"max":12,"expected":576,"u":"J/mm","iu":"mm/s","tol":4},{"id":"dc-motor-back-emf-01","x":25,"min":0,"max":60,"expected":38,"u":"V","iu":"A","tol":0.5},{"id":"first-order-95-response-time-01","x":2,"min":0.5,"max":5,"expected":5.991464547107982,"u":"s","iu":"s","tol":0.1},{"id":"fourbar-grashof-margin-01","x":110,"min":95,"max":150,"expected":20,"u":"mm","iu":"mm","tol":1},{"id":"copper-temperature-resistance-01","x":60,"min":0,"max":100,"expected":0.92576,"u":"Ω","iu":"°C","tol":0.005}];
const refs=[x=>(24*180*.8)/x,x=>48-(2*x/5),x=>x*Math.log(20),x=>(75+90)-(35+x),x=>.8+.8*.00393*(x-20)];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const [i,q] of cases.entries())test(q.id+' : calcul, cinq états, SVG et invalides',()=>{
 const h=fs.readFileSync('missions/'+q.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);near(cfg.expected,q.expected);assert.equal(M.inputUnits[q.id],q.iu);assert.equal(M.criteria[q.id].unit,q.u);assert.ok(C.byId(q.id));
 for(const x of [q.min,(q.min+q.x)/2,q.x,(q.x+q.max)/2,q.max]){const y=M.calculate(q.id,x),s=D.render(q.id,x,y);near(y,refs[i](x));assert.match(s,/<title/);assert.match(s,/<desc/);assert.ok(s.includes(q.u));assert.doesNotMatch(s,/NaN|Infinity|undefined/);}
 for(const x of [q.min-.001,q.max+.001,NaN,Infinity])assert.throws(()=>M.calculate(q.id,x),RangeError);
 assert.throws(()=>D.render(q.id,q.x,q.expected+100),RangeError);assert.equal((h.match(/<li>/g)||[]).length,3);assert.ok(M.answerPolicy[q.id].solution.length>300);
 assert.equal(M.validateAnswer(String(q.expected).replace('.',','),q.expected,q.tol).correct,true);
});
test('propriétés, tolérances et catalogue',()=>{
 near(M.calculate(cases[0].id,4),3*M.calculate(cases[0].id,12));for(const x of [0,25,60])near(M.calculate(cases[1].id,x)+.4*x,48);
 near(M.calculate(cases[2].id,4),2*M.calculate(cases[2].id,2));near(M.calculate(cases[3].id,130),0);near(M.calculate(cases[4].id,20),.8);
 for(const q of cases){assert.equal(M.assess(q.id,q.x).acceptable,true);assert.equal(M.validateAnswer(String(q.expected+1.2*q.tol),q.expected,q.tol,0).correct,false);}
 assert.ok(C.levels.length>=282);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);
});
test('diagrammes synchronisés et correction historique',()=>{
 for(const x of [.5,2,5]){const s=D.render(cases[2].id,x,M.calculate(cases[2].id,x));near(Number(s.match(/data-t95-x="([0-9.]+)"/)[1]),Number((85+440*M.calculate(cases[2].id,x)/16).toFixed(3)));}
 for(const x of [95,110,150]){const s=D.render(cases[3].id,x,M.calculate(cases[3].id,x));near(Number(s.match(/data-barre="l" data-longueur-px="([0-9.]+)"/)[1]),2*x);}
 const B=require('../src/investigations.js'),G=require('../src/investigation-diagrams.js');for(const eta of [.5,.85,1]){const s=G.render('mechanical-efficiency-02',eta,B.calculate('mechanical-efficiency-02',eta));assert.match(s,/data-power-in-kw="12"/);assert.match(s,/data-power-out-kw=/);assert.match(s,/x1="100" y1="130" x2="200" y2="130"/);}
});
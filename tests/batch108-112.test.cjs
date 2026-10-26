'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const m=require('../src/investigations.js'),d=require('../src/investigation-diagrams.js'),cat=require('../src/catalog.js');
const ids=["double-shear-pin-01","hydraulic-reynolds-01","composite-wall-01","combined-uncertainty-01","stability-overturn-angle-01"];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-8*Math.max(1,Math.abs(b)),a+' != '+b);
const cfg=id=>JSON.parse(fs.readFileSync('missions/'+id+'.html','utf8').split('window.SI_MISSION=')[1].split('</script>')[0]);
test('108–112 : intégration, politiques, bornes, unités, schémas et calculs',()=>{
 assert.ok(cat.levels.length>=112);assert.equal(new Set(cat.levels.map(x=>x.id)).size,cat.levels.length);
 assert.equal(new Set(ids.map(id=>cat.byId(id).subskill)).size,5);
 for(const id of ids){const c=cfg(id),p=m.answerPolicy[id];assert.ok(cat.byId(id));assert.equal(c.unit,m.criteria[id].unit);assert.equal(c.inputUnit,m.inputUnits[id]);near(m.calculate(id,c.initial),c.expected);
  assert.ok(p.assumptions.length>160&&p.solution.length>120);
  for(const x of [c.min,c.initial,c.max]){const y=m.calculate(id,x),svg=d.render(id,x,y);assert.ok(Number.isFinite(y));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.ok(svg.includes(c.unit)&&svg.includes(c.inputUnit));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
  assert.throws(()=>m.calculate(id,c.max+.01),RangeError);assert.throws(()=>m.calculate(id,-.01),RangeError);
  assert.equal(m.validateAnswer(String(c.expected).replace('.',','),c.expected,p.absoluteTolerance).correct,true);
  assert.equal(m.validateAnswer(String(c.expected+2*p.absoluteTolerance),c.expected,p.absoluteTolerance).correct,false);
 }
});
test('108 : deux plans de cisaillement, contre-calcul par rayon',()=>{
 for(const F of [0,5,12,30])near(m.calculate(ids[0],F)*1e6*(2*Math.PI*.006**2),F*1000);
 near(m.calculate(ids[0],12),53.05164769729844);assert.match(d.render(ids[0],12,m.calculate(ids[0],12)),/data-shear-planes="2"/);
});
test('109 : Reynolds via vitesse, seuils et absence de débit',()=>{
 const D=.008,A=Math.PI*D*D/4;for(const Q of [0,20,50,80])near(m.calculate(ids[1],Q),850*(Q/60000)/A*D/.04);
 near(m.calculate(ids[1],20),1127.347513567592);assert.equal(m.assess(ids[1],0).acceptable,false);assert.equal(m.assess(ids[1],20).acceptable,true);assert.equal(m.assess(ids[1],80).acceptable,false);assert.match(d.render(ids[1],80,m.calculate(ids[1],80)),/data-regime="turbulent"/);
});
test('110 : flux égal dans les deux couches',()=>{
 const R1=1,R2=.0625;for(const DT of [0,10,30,60])near(m.calculate(ids[2],DT)*(R1+R2),DT);
 near(m.calculate(ids[2],30),28.235294117647058);assert.match(d.render(ids[2],30,m.calculate(ids[2],30)),/data-interface-C="21.7647"/);
});
test('111 : composition indépendante par somme des variances',()=>{
 for(const u of [0,.04,.12,.2])near((m.calculate(ids[3],u)/2)**2,u*u+.08**2);
 near(m.calculate(ids[3],.12),.2884441020371191);assert.match(d.render(ids[3],.12,m.calculate(ids[3],.12)),/data-variance-mm2="0.0208000"/);
});
test('112 : basculement géométrique et projection',()=>{
 for(const h of [.5,1.2,2])near(h*Math.tan(m.calculate(ids[4],h)*Math.PI/180),.8);
 near(m.calculate(ids[4],1.2),33.69006752597979);assert.equal(m.assess(ids[4],1.2).acceptable,true);assert.equal(m.assess(ids[4],2).acceptable,false);assert.throws(()=>m.calculate(ids[4],0),RangeError);assert.match(d.render(ids[4],2,m.calculate(ids[4],2)),/data-stable-25deg="false"/);
});

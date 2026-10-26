'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const engine=require('../src/investigations.js'),diagrams=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const near=(actual,expected,tol=1e-10)=>assert.ok(Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),actual+' != '+expected);
function inspect(id){
 const h=fs.readFileSync(path.join(__dirname,'../missions',id+'.html'),'utf8');
 const m=h.match(/window\.SI_MISSION=(\{.*?\})<\/script>/);assert.ok(m,id+': configuration absente');
 const c=JSON.parse(m[1]);assert.equal(c.id,id);assert.equal(catalog.byId(id).url,'missions/'+id+'.html');
 assert.equal(engine.criteria[id].unit,c.unit);assert.equal(engine.inputUnits[id],c.inputUnit);
 near(engine.calculate(id,c.initial),c.expected);
 for(const x of [c.min,c.initial,c.max]){
  const y=engine.calculate(id,x),svg=diagrams.render(id,x,y);
  assert.ok(Number.isFinite(y));assert.match(svg,/<svg/);assert.match(svg,/<title/);assert.match(svg,/<desc/);
  assert.ok(svg.includes(c.inputUnit));assert.ok(svg.includes(c.unit));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 }
 for(const idPart of ['calc','hint','solution','trialValue','graphic','log','reset'])assert.ok(h.includes('id="'+idPart+'"'));
 return c;
}
test('84 — énergie de rotation : contre-calcul, loi quadratique et unités',()=>{
 const c=inspect('rotation-energy-01');
 for(const n of [100,300,450]){
  const omega=n/60*2*Math.PI;
  near(engine.calculate(c.id,n),6*omega*omega/1000);
 }
 near(engine.calculate(c.id,200),4*engine.calculate(c.id,100));
 near(engine.calculate(c.id,0),0);
 assert.throws(()=>engine.calculate(c.id,-1),RangeError);
 assert.equal(engine.assess(c.id,300).acceptable,true);
 assert.equal(engine.assess(c.id,450).acceptable,false);
 assert.ok(Math.abs(engine.calculate(c.id,300)-5.921762640653615)<1e-9);
 assert.match(engine.answerPolicy[c.id].solution,/5,922 kJ/);
});
test('85 — centre de masse : moments massiques, encadrement et monotonie',()=>{
 const c=inspect('center-mass-01');
 for(const m of [20,80,180]){
  const numerator=120*0.4+2*m,total=120+m;
  near(engine.calculate(c.id,m)*total,numerator);
  assert.ok(engine.calculate(c.id,m)>=0.4&&engine.calculate(c.id,m)<=2);
 }
 assert.ok(engine.calculate(c.id,20)<engine.calculate(c.id,80));
 assert.ok(engine.calculate(c.id,80)<engine.calculate(c.id,180));
 assert.equal(engine.assess(c.id,80).acceptable,true);
 assert.equal(engine.assess(c.id,180).acceptable,false);
 assert.throws(()=>engine.calculate(c.id,-2),RangeError);
 near(engine.calculate(c.id,80),1.04);
});
test('Audit 40–75 : schéma du volume pneumatique synchronisé avec la course',()=>{
 const id='pneumatic-consumption-01',xs=[50,200,400];
 const pistonXs=xs.map(x=>{
  const svg=diagrams.render(id,x,engine.calculate(id,x));
  const m=svg.match(/data-piston-x="([0-9.]+)"/);
  assert.ok(m,'position du piston absente');
  assert.ok(svg.includes('course = '+x+' mm'));
  return Number(m[1]);
 });
 assert.ok(pistonXs[0]<pistonXs[1]&&pistonXs[1]<pistonXs[2]);
 near(engine.calculate(id,400),2*engine.calculate(id,200));
 const h=fs.readFileSync(path.join(__dirname,'../missions',id+'.html'),'utf8');
 assert.match(h,/volume géométrique balayé/);
 assert.match(h,/ne correspond pas à la consommation d’air libre/);
});
test('Catalogue : deux questions nouvelles, aucune entrée dupliquée',()=>{
 assert.equal(catalog.levels.length,85);
 assert.equal(new Set(catalog.levels.map(l=>l.id)).size,85);
 assert.equal(catalog.byId('rotation-energy-01').world,'SI-02');
 assert.equal(catalog.byId('center-mass-01').world,'SI-03');
});

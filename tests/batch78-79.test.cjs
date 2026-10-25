'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const engine=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
const catalog=require('../src/catalog.js');
const root=path.resolve(__dirname,'..');
const near=(a,b,rtol=1e-10)=>assert.ok(Math.abs(a-b)<=rtol*Math.max(1,Math.abs(b)),a+' différent de '+b);
function config(id){
 const html=fs.readFileSync(path.join(root,'missions',id+'.html'),'utf8');
 const match=html.match(/window\.SI_MISSION=(\{.*?\})<\/script>/);
 assert.ok(match,id+': configuration manquante');
 const c=JSON.parse(match[1]);
 assert.equal(c.id,id);
 assert.equal(catalog.byId(id).url,'missions/'+id+'.html');
 assert.equal(engine.criteria[id].unit,c.unit);
 assert.equal(engine.inputUnits[id],c.inputUnit);
 assert.ok(html.includes('id="hint"')&&html.includes('id="solution"')&&html.includes('id="trialValue"'));
 assert.ok(html.includes('id="graphic"')&&html.includes('id="feedback"'));
 near(engine.calculate(id,c.initial),c.expected);
 for(const x of [c.min,c.initial,c.max]){
  const y=engine.calculate(id,x);
  const svg=diagrams.render(id,x,y);
  assert.match(svg,/<svg/);
  assert.ok(svg.includes(c.inputUnit),id+': unité entrée manquante');
  assert.ok(svg.includes(c.unit),id+': unité sortie manquante');
  assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
  assert.match(svg,/<title/);
  assert.match(svg,/<desc/);
 }
 return c;
}
test('Mission 78 : contre-pression du vérin, deux surfaces, équilibre axial',()=>{
 const c=config('hydro-backpressure-01');
 const Ap=Math.PI*(80e-3/2)**2;
 const Aa=Ap-Math.PI*(40e-3/2)**2;
 const pA=120*100000;
 const reference=pA*Ap-20*100000*Aa;
 near(engine.calculate(c.id,20)*1000,reference);
 near(engine.calculate(c.id,0)*1000,pA*Ap);
 near(engine.calculate(c.id,80)*1000,pA*Ap-80*100000*Aa);
 near(engine.calculate(c.id,40)-engine.calculate(c.id,20),-(20*100000*Aa/1000));
 assert.ok(engine.assess(c.id,20).acceptable);
 assert.equal(engine.assess(c.id,80).acceptable,false);
 assert.throws(()=>engine.calculate(c.id,-1),RangeError);
});
test('Mission 79 : flambement Euler, moment quadratique et loi inverse du carré',()=>{
 const c=config('euler-buckling-01');
 const diameter=20/1000,Young=210*1e9;
 const inertia=Math.PI*Math.pow(diameter,4)/64;
 near(inertia,7.853981633974484e-9);
 const reference=Math.PI*Math.PI*Young*inertia/(2*2);
 near(engine.calculate(c.id,2)*1000,reference);
 near(engine.calculate(c.id,2),engine.calculate(c.id,1)/4);
 near(engine.calculate(c.id,3),engine.calculate(c.id,1)/9);
 assert.ok(engine.assess(c.id,1).acceptable);
 assert.equal(engine.assess(c.id,2).acceptable,false);
 assert.throws(()=>engine.calculate(c.id,0),RangeError);
});
test('Catalogue : 79 missions indépendantes et deux savoirs distincts',()=>{
 assert.equal(catalog.levels.length,79);
 assert.equal(new Set(catalog.levels.map(x=>x.id)).size,79);
 assert.equal(catalog.byId('hydro-backpressure-01').world,'SI-06');
 assert.equal(catalog.byId('euler-buckling-01').world,'SI-04');
});
test('Audit : troisième essai n’annonce plus un corrigé disponible avant trois indices',()=>{
 const js=fs.readFileSync(path.join(root,'src/investigation-mission.js'),'utf8');
 assert.match(js,/demande les trois indices pour déverrouiller le corrigé/);
 assert.match(js,/disabled=tries<3\|\|hints<3\|\|mastered/);
});

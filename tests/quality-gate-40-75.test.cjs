'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const engine=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
const catalog=require('../src/catalog.js');
const root=path.resolve(__dirname,'..');
const historicalIds=["hydro-speed-01","work-01","frequency-period-01","hydro-force-02","beam-defl-01","circular-02","angular-accel-01","brake-torque-01","incline-force-01","resultant-01","torsion-01","axial-strain-01","gear-mesh-01","belt-speed-01","hydro-power-01","hydro-volume-01","pneumatic-force-01","electric-power-02","joule-heat-01","rc-time-01","sampling-01","efficiency-chain-01","rolling-load-01","heat-transfer-01","measurement-relative-01","moment-arm-02","kinetic-friction-01","spring-stiffness-01","beam-stress-02","gear-ratio-02","screw-lead-01","hydro-cylinder-speed-02","hydro-annular-force-01","pneumatic-consumption-01","electrical-series-01","electrical-parallel-01"];
const audited=historicalIds.map(id=>catalog.byId(id));
const approx=(actual,expected,label)=>assert.ok(Math.abs(actual-expected)<=1e-10*Math.max(1,Math.abs(expected)),label+': '+actual+' != '+expected);

test('36 missions 40–75 : paramètres, calcul, unités et SVG aux trois bornes',()=>{
 assert.ok(catalog.levels.length>=75);
 assert.equal(audited.length,36);
 assert.ok(audited.every(Boolean),'Une mission historique 40–75 manque au catalogue');
 assert.deepEqual(audited.map(m=>m.id),historicalIds);
 assert.equal(new Set(catalog.levels.map(x=>x.id)).size,catalog.levels.length);
 for(const level of audited){
  const html=fs.readFileSync(path.join(root,level.url),'utf8');
  const match=html.match(/window\.SI_MISSION=(\{.*?\})<\/script>/);
  assert.ok(match,level.id+': configuration absente');
  const c=JSON.parse(match[1]);
  assert.equal(c.id,level.id);
  assert.equal(engine.criteria[c.id].unit,c.unit,c.id+': unité résultat');
  assert.equal(engine.inputUnits[c.id],c.inputUnit,c.id+': unité entrée');
  approx(engine.calculate(c.id,c.initial),c.expected,c.id+': résultat de référence');
  for(const x of [c.min,c.initial,c.max]){
   const result=engine.calculate(c.id,x);
   const svg=diagrams.render(c.id,x,result);
   assert.ok(Number.isFinite(result),c.id+': résultat non fini');
   assert.match(svg,/<svg[^>]+viewBox="0 0 600 (235|272)"/);
   assert.ok(svg.includes(c.inputUnit),c.id+': unité entrée absente du SVG');
   assert.ok(svg.includes(c.unit),c.id+': unité résultat absente du SVG');
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
   assert.match(svg,/<title/);
   assert.match(svg,/<desc/);
  }
 }
});

test('rapport de denture : toutes les abscisses échantillonnées sont des entiers',()=>{
 const code=fs.readFileSync(path.join(root,'src/investigation-mission.js'),'utf8');
 assert.match(code,/const integerDomain=c\.id==='gear-mesh-01'\|\|c\.id==='gear-ratio-02'/);
 assert.match(code,/if\(c\.id==='gear-mesh-01'\|\|c\.id==='gear-ratio-02'\|\|c\.id==='transformer-turns-ratio-01'\)\$\('trialValue'\)\.step='1'/);
 for(const id of ['gear-mesh-01','gear-ratio-02']){
  const c=JSON.parse(fs.readFileSync(path.join(root,'missions',id+'.html'),'utf8').match(/window\.SI_MISSION=(\{.*?\})<\/script>/)[1]);
  const xs=Array.from({length:c.max-c.min+1},(_,i)=>c.min+i);
  for(const x of xs){assert.ok(Number.isInteger(x));assert.ok(Number.isFinite(engine.calculate(id,x)));}
  assert.throws(()=>engine.calculate(id,c.initial+.5),RangeError);
 }
});

test('16 missions 60–75 : invariants physiques métamorphiques indépendants',()=>{
 const f=(id,x)=>engine.calculate(id,x);
 approx(f('moment-arm-02',0),0,'moment nul');
 approx(f('moment-arm-02',90),126,'moment maximal');
 approx(f('kinetic-friction-01',.4),2*f('kinetic-friction-01',.2),'frottement linéaire');
 approx(f('spring-stiffness-01',400),2*f('spring-stiffness-01',200),'ressort linéaire');
 approx(f('beam-stress-02',1000),2*f('beam-stress-02',500),'flexion linéaire');
 approx(f('gear-ratio-02',72),f('gear-ratio-02',36)/2,'rapport de vitesse');
 approx(f('screw-lead-01',6),2*f('screw-lead-01',3),'vis multidépart');
 approx(f('hydro-cylinder-speed-02',20),2*f('hydro-cylinder-speed-02',10),'débit et vitesse');
 approx(f('hydro-annular-force-01',120),2*f('hydro-annular-force-01',60),'pression et effort');
 approx(f('pneumatic-consumption-01',300),2*f('pneumatic-consumption-01',150),'volume balayé');
 approx(f('electrical-series-01',19)-f('electrical-series-01',18),1,'résistances en série');
 assert.ok(f('electrical-parallel-01',6)<6&&f('electrical-parallel-01',6)<12);
 approx(f('inductor-energy-01',8),4*f('inductor-energy-01',4),'énergie inductive quadratique');
 approx(f('mechanical-efficiency-02',1),2*f('mechanical-efficiency-02',.5),'rendement');
 approx(f('rolling-torque-01',400),2*f('rolling-torque-01',200),'couple de roulement');
 approx(f('thermal-resistance-01',1.6),f('thermal-resistance-01',.8)/2,'conduction');
 approx(f('measurement-uncertainty-01',.2),2*f('measurement-uncertainty-01',.1),'incertitude relative');
});

test('représentation du levier : force dans le quadrant attendu à 30 degrés',()=>{
 const svg=diagrams.render('moment-arm-02',30,engine.calculate('moment-arm-02',30));
 const m=svg.match(/<line x1="430" y1="168" x2="([0-9.]+)" y2="([0-9.]+)"[^>]*marker-end/);
 assert.ok(m,'vecteur force manquant');
 assert.ok(Number(m[1])>430,'composante horizontale incorrecte');
 assert.ok(Number(m[2])<168,'composante verticale incorrecte');
});

test('diagnostic pédagogique : signe, facteur décimal, arrondi, sans révéler le résultat',()=>{
 const cases=[[-63,63,.5,'N·m','signe'],[630,63,.5,'N·m','facteur'],[63.7,63,.1,'N·m','arrondis'],[10,63,.5,'N·m','formule']];
 for(const [value,expected,tol,unit,keyword] of cases){
  const message=engine.diagnoseAnswer(value,expected,tol,unit);
  assert.ok(message.toLowerCase().includes(keyword));
  assert.ok(!message.includes('63 N·m'),'ne pas révéler la valeur de référence');
 }
});

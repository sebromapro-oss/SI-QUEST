'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
const ids=["hydro-speed-01","work-01","frequency-period-01","hydro-force-02","beam-defl-01","circular-02","angular-accel-01","brake-torque-01","incline-force-01","resultant-01","torsion-01","axial-strain-01","gear-mesh-01","belt-speed-01","hydro-power-01","hydro-volume-01","pneumatic-force-01","electric-power-02","joule-heat-01","rc-time-01","sampling-01","efficiency-chain-01","rolling-load-01","heat-transfer-01","measurement-relative-01","moment-arm-02","kinetic-friction-01","spring-stiffness-01","beam-stress-02","gear-ratio-02","screw-lead-01","hydro-cylinder-speed-02","hydro-annular-force-01","pneumatic-consumption-01","electrical-series-01","electrical-parallel-01"];
for(const id of ids)test('historique 40–75 : contrat nominal, bornes, unités et SVG '+id,()=>{
 const html=fs.readFileSync('missions/'+id+'.html','utf8');
 const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,id);
 assert.equal(model.criteria[id].unit,cfg.unit);
 assert.ok(cfg.min<=cfg.initial&&cfg.initial<=cfg.max);
 const actual=model.calculate(id,cfg.initial);
 assert.ok(Math.abs(actual-cfg.expected)<=1e-7*Math.max(1,Math.abs(actual)));
 for(const x of [cfg.min,cfg.initial,cfg.max]){
  const y=model.calculate(id,x);
  assert.ok(Number.isFinite(y));
  const svg=diagrams.render(id,x,y);
  assert.match(svg,/<title/);
  assert.match(svg,/<desc/);
  assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 }
});

'use strict';
/** Contre-réception V2.5 : dix modèles supplémentaires du lot 560–597.
 * Références SI tirées des hypothèses physiques des énoncés, sans appel
 * au moteur de production pour fabriquer les valeurs attendues. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const historic=require('../src/investigations.js');
const references=[
 ["laminar-darcy-factor-01",x=>64/x,"sans unité","sans unité"],
 ["triangle-actuator-angle-01",x=>Math.acos((0.45**2+0.65**2-x*x)/(2*0.45*0.65))*180/Math.PI,"°","m"],
 ["floating-cylinder-draft-01",x=>100*x/(1000*Math.PI*0.4**2/4),"cm","kg"],
 ["quarter-bridge-strain-from-voltage-01",x=>4*(x/1000)/(5*2.1)*1e6,"µε","mV"],
 ["hydrostatic-rectangular-gate-force-01",x=>1000*9.81*1.2*x*x/(2*1000),"kN","m"],
 ["battery-peukert-runtime-01",x=>20*(5/x)**1.15,"h","A"],
 ["bearing-outer-race-bpfo-01",x=>(8/2)*(x/60)*(1-10/50),"Hz","tr/min"],
 ["capillary-meniscus-pressure-01",x=>2*0.072/(x/1000),"Pa","mm"],
 ["vibrating-string-fundamental-01",x=>Math.sqrt(x/0.020)/(2*1.50),"Hz","N"],
 ["liquid-acoustic-impedance-01",x=>1480*x/1e6,"MRayl","kg/m³"]
];
function get(id){
 const m=catalog.byId(id);assert.ok(m,id+' : catalogue');
 const html=fs.readFileSync(path.join(__dirname,'..',m.url),'utf8');
 const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 const batch=html.split('src="').map(s=>s.split('"')[0])
  .filter(s=>s.startsWith('../src/batch')).at(-1)?.split('/').at(-1);
 const engine=batch?require('../src/'+batch).physics:historic;
 return {cfg,engine};
}
for(const [id,reference,unit,inputUnit] of references){
 test('contre-calcul indépendant complémentaire 560–597 : '+id,()=>{
  const {cfg,engine}=get(id);
  assert.equal(cfg.unit,unit,id+' : unité résultat');
  assert.equal(cfg.inputUnit,inputUnit,id+' : unité paramètre');
  const values=[cfg.min,cfg.initial,cfg.max];
  if(Number.isFinite(cfg.inputStep)&&cfg.inputStep>0&&cfg.min+cfg.inputStep<cfg.max)
   values.push(cfg.min+cfg.inputStep);
  else if(!Number.isFinite(cfg.inputStep))values.push((cfg.min+cfg.max)/2);
  for(const x of values){
   const actual=engine.calculate(id,x),expected=reference(x);
   assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),id+' : non fini');
   assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
    id+' : '+x+' '+inputUnit+' -> '+actual+' / '+expected+' '+unit);
  }
  assert.ok(Math.abs(cfg.expected-reference(cfg.initial))<=2e-8*Math.max(1,Math.abs(cfg.expected)),
   id+' : valeur HTML nominale différente de la référence');
  assert.throws(()=>engine.calculate(id,NaN),RangeError);
 });
}
test('invariants physiques de dix modèles',()=>{
 assert.equal(references.length,10);
 for(const id of ['laminar-darcy-factor-01','battery-peukert-runtime-01',
  'capillary-meniscus-pressure-01']){
  const {cfg,engine}=get(id);
  assert.ok(engine.calculate(id,cfg.min)>engine.calculate(id,cfg.max),id+' : décroissance attendue');
 }
 for(const id of ['floating-cylinder-draft-01','hydrostatic-rectangular-gate-force-01',
  'bearing-outer-race-bpfo-01','liquid-acoustic-impedance-01']){
  const {cfg,engine}=get(id);
  assert.ok(engine.calculate(id,cfg.max)>engine.calculate(id,cfg.min),id+' : croissance attendue');
 }
});

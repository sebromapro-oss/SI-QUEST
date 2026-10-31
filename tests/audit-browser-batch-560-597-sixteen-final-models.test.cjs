'use strict';
/** V2.5 : contre-calculs indépendants des 16 dernières lois du lot 560–597.
 * Les constantes sont celles des hypothèses des situations, pas des sorties
 * du moteur. Les valeurs attendues sont recalculées analytiquement. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const historic=require('../src/investigations.js');
const references=[
 ["parallel-load-resultant-position-01",x=>(300*0.20+x*1.40)/(300+x),"m","N"],
 ["clutch-synchronization-heat-01",x=>0.5*(0.60*0.40/(0.60+0.40))*(120-x)**2,"J","rad/s"],
 ["mutual-inductance-emf-01",x=>2*Math.PI*x*0.015*2,"V","Hz"],
 ["three-phase-current-thd-01",x=>100*Math.sqrt(x*x+3*3)/20,"%","A"],
 ["bearing-cage-ftf-01",x=>(x/120)*(1-8/40),"Hz","tr/min"],
 ["pneumatic-critical-pressure-ratio-01",x=>(2/(x+1))**(x/(x-1)),"sans unité","sans unité"],
 ["tapered-rod-axial-extension-01",x=>12000*0.8/(Math.PI*210e9*0.015*(x/1000))*1000,"mm","mm"],
 ["pt100-self-heating-error-01",x=>(x/1000)**2*110/0.002,"K","mA"],
 ["ballscrew-lifting-torque-01",x=>8000*(x/1000)/(2*Math.PI*0.90),"N·m","mm/tour"],
 ["elastic-pipe-pressure-wave-speed-01",x=>Math.sqrt(1.5e9/(850*(1+1.5e9*0.020/(210e9*(x/1000))))),"m/s","mm"],
 ["transformer-load-voltage-drop-01",x=>x*(0.080*0.8+0.150*0.6),"V","A"],
 ["rectangular-plate-polar-mass-inertia-01",x=>24*(0.8**2+x*x)/12,"kg·m²","m"],
 ["combined-axial-bending-stress-01",x=>(12000/(0.04*0.08)+x*(0.08/2)/(0.04*0.08**3/12))/1e6,"MPa","N·m"],
 ["spur-gear-transverse-contact-ratio-01",x=>{const a=20*Math.PI/180,m=2,r1=24,r2=48;return (Math.sqrt((r1+m*x)**2-(r1*Math.cos(a))**2)+Math.sqrt((r2+m*x)**2-(r2*Math.cos(a))**2)-72*Math.sin(a))/(Math.PI*m*Math.cos(a))},"sans unité","sans unité"],
 ["magnetic-gap-maxwell-force-01",x=>x*x*4e-4/(2*4*Math.PI*1e-7),"N","T"],
 ["loop-4-20ma-burden-limit-01",x=>(x-12)/0.020,"Ω","V"]
];
function load(id){
 const m=catalog.byId(id);assert.ok(m,id+' : mission absente');
 const html=fs.readFileSync(path.join(__dirname,'..',m.url),'utf8');
 const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 const batch=html.split('src="').map(s=>s.split('"')[0])
  .filter(s=>s.startsWith('../src/batch')).at(-1)?.split('/').at(-1);
 const engine=batch?require('../src/'+batch).physics:historic;
 return {cfg,engine};
}
for(const [id,reference,unit,inputUnit] of references){
 test('contre-calcul indépendant final 560–597 : '+id,()=>{
  const {cfg,engine}=load(id);
  assert.equal(cfg.unit,unit,id+' : unité résultat');
  assert.equal(cfg.inputUnit,inputUnit,id+' : unité entrée');
  const values=[cfg.min,cfg.initial,cfg.max];
  if(Number.isFinite(cfg.inputStep)&&cfg.inputStep>0&&cfg.min+cfg.inputStep<cfg.max)
   values.push(cfg.min+cfg.inputStep);
  else if(!Number.isFinite(cfg.inputStep))values.push((cfg.min+cfg.max)/2);
  for(const x of values){
   const expected=reference(x),actual=engine.calculate(id,x);
   assert.ok(Number.isFinite(expected)&&Number.isFinite(actual),id+' : valeur non finie');
   assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
    id+' : '+x+' '+inputUnit+' -> '+actual+' / '+expected+' '+unit);
  }
  assert.ok(Math.abs(cfg.expected-reference(cfg.initial))<=2e-8*Math.max(1,Math.abs(cfg.expected)),
   id+' : nominal HTML indépendant');
  assert.throws(()=>engine.calculate(id,NaN),RangeError);
 });
}
test('couverture scientifique indépendante : 16 dernières lois distinctes',()=>{
 assert.equal(references.length,16);
 assert.equal(new Set(references.map(x=>x[0])).size,16);
});

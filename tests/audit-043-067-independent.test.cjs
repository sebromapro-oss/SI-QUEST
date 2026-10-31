'use strict';
/** SI QUEST V2.5 — contre-calculs indépendants des missions historiques 43–67.
 * Références établies par les lois physiques avec conversions SI explicites.
 * 25 missions × 4 points (bornes, nominal et point intermédiaire).
 * Les contrôles de structure SVG ne remplacent pas une recette visuelle réelle.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const physics=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
const catalog=require('../src/catalog.js');
const cases=[
 ['incline-force-01',a=>600*9.81*Math.sin(a*Math.PI/180)],                         // N
 ['resultant-01',f=>Math.hypot(300,f)],                                            // N
 ['torsion-01',t=>16*(t*1000)/(Math.PI*30**3)],                                   // MPa : N·mm/mm³
 ['axial-strain-01',dl=>dl/1200],                                                  // mm/mm
 ['gear-mesh-01',z=>3*(20+z)/2],                                                  // mm : m(z1+z2)/2
 ['belt-speed-01',n=>2*Math.PI*.1*n/60],                                         // m/s
 ['hydro-power-01',p=>(p*1e5)*(24e-3/60)/1000],                                 // kW
 ['hydro-volume-01',stroke=>(50e-4)*(stroke/1000)*1000],                         // L
 ['pneumatic-force-01',p=>(p*1e5)*(Math.PI*.05**2/4)],                           // N
 ['electric-power-02',i=>24*i],                                                  // W
 ['joule-heat-01',i=>4*i*i],                                                      // W
 ['rc-time-01',r=>r*470e-6],                                                      // s
 ['sampling-01',dt=>1/(dt/1000)],                                                // Hz
 ['efficiency-chain-01',eta=>.92*eta],                                           // sans unité
 ['rolling-load-01',cr=>8000*cr],                                                // N
 ['heat-transfer-01',dt=>.8*2*dt/.1],                                            // W
 ['measurement-relative-01',x=>100*Math.abs(x-80)/80],                           // %
 ['moment-arm-02',deg=>280*.45*Math.sin(deg*Math.PI/180)],                       // N·m
 ['kinetic-friction-01',mu=>mu*80*9.81],                                         // N
 ['spring-stiffness-01',force=>force/.025],                                      // N/m
 ['beam-stress-02',moment=>6*(moment*1000)/(40*80**2)],                         // MPa
 ['gear-ratio-02',z=>18/z],                                                       // sans unité
 ['screw-lead-01',pitch=>2*pitch],                                               // mm/tr, deux filets
 ['hydro-cylinder-speed-02',flow=>(flow/60000)/(Math.PI*(.08**2-.05**2)/4)],     // m/s
 ['hydro-annular-force-01',p=>(p*1e5)*(Math.PI*(.08**2-.04**2)/4)]              // N
];
function near(a,b,label){
 assert.ok(Number.isFinite(a)&&Number.isFinite(b),label+': résultat non fini');
 assert.ok(Math.abs(a-b)<=2e-8*Math.max(1,Math.abs(b)),label+': '+a+' ≠ '+b);
}
for(const [i,[id,reference]] of cases.entries()){
 test('audit indépendant mission '+(43+i)+' — '+id,()=>{
  const item=catalog.byId(id);
  assert.ok(item,'mission absente du catalogue');
  assert.equal(item.url,'missions/'+id+'.html');
  const html=fs.readFileSync(path.join(__dirname,'..',item.url),'utf8');
  const raw=html.split('window.SI_MISSION=')[1]?.split('</script>')[0];
  assert.ok(raw,'configuration de mission absente');
  const cfg=JSON.parse(raw);
  assert.equal(cfg.id,id);
  assert.match(html,/<html lang="fr"/);
  assert.equal((html.match(/<li>/g)||[]).length,3,'trois questions flash');
  assert.equal(physics.criteria[id].unit,cfg.unit);
  assert.equal(physics.inputUnits[id],cfg.inputUnit);
  near(cfg.expected,reference(cfg.initial),id+' nominal HTML');
  const samples=[cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max];
  for(const x of samples){
   const y=physics.calculate(id,x);
   near(y,reference(x),id+' x='+x+' '+cfg.inputUnit);
   const svg=diagrams.render(id,x,y);
   assert.match(svg,/<svg/);assert.match(svg,/<title/);assert.match(svg,/<desc/);
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
  }
  for(const invalid of [NaN,Infinity,-Infinity])assert.throws(()=>physics.calculate(id,invalid),RangeError);
 });
}
test('lot 43–67 : 25 identifiants uniques et 597 missions conservées',()=>{
 assert.equal(cases.length,25);
 assert.equal(new Set(cases.map(c=>c[0])).size,25);
 assert.equal(catalog.levels.length,597);
});

const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const engine=require('../src/investigations.js');
const scene=require('../src/scene3d.js');
const diagrams=require('../src/investigation-diagrams.js');
const catalog=require('../src/catalog.js');
const ids=['circular-02','angular-accel-01','brake-torque-01','incline-force-01','resultant-01','torsion-01','axial-strain-01','gear-mesh-01','belt-speed-01','hydro-power-01','hydro-volume-01','pneumatic-force-01','electric-power-02','joule-heat-01','rc-time-01','sampling-01','efficiency-chain-01','rolling-load-01','heat-transfer-01','measurement-relative-01'];
const invalid=[NaN,Infinity,-Infinity];
for(const id of ids){
 test(id+' — rejette les paramètres non finis',()=>{for(const x of invalid)assert.throws(()=>engine.calculate(id,x))});
 test(id+' — schéma et résultat cohérents pour les trois paramètres',()=>{
  const mission=catalog.byId(id);assert.ok(mission);
  const html=fs.readFileSync(path.resolve(__dirname,'..',mission.url),'utf8');
  const initial=Number(html.match(/"initial"\\s*:\\s*([0-9.]+)/)?.[1]);
  assert.ok(Number.isFinite(initial),'Paramètre initial absent ou non numérique : '+id);
  for(const factor of [.9,1,1.1]){
   const x=initial*factor;
   if(id==='gear-mesh-01'&&!Number.isInteger(x))continue;
   const y=engine.calculate(id,x);
   assert.ok(Number.isFinite(y));
   const svg=diagrams.render(id,x,y);
   assert.match(svg,/<svg/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
  }
 });
}
test('3D réservée aux phénomènes ayant un modèle spatial',()=>{
 for(const id of scene.allowed){assert.ok(ids.includes(id));const d=scene.describe(id,id==='gear-mesh-01'?40:4);assert.ok(d);const a=scene.render(id,.2,.3,4),b=scene.render(id,1.1,.3,4);assert.notEqual(a,b);assert.doesNotMatch(a,/NaN|Infinity/)}
 assert.throws(()=>scene.render('heat-transfer-01',0,0,4));
});
test('trois aides progressives : pas de révélation globale après troisième essai',()=>{
 const code=fs.readFileSync(path.resolve(__dirname,'../src/investigation-mission.js'),'utf8');
 assert.doesNotMatch(code,/aids\\.map\\(\\(a,i\\)=>\\(i\\+1\\)/);
 assert.match(code,/aids\\[hints-1\\]/);
 assert.match(code,/tries>=3\\|\\|mastered/);
});

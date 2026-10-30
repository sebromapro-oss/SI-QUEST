'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const p=require('../src/investigations.js'),d=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const cases=[["circular-02",[0,3,6],x=>x*x/.5],
["angular-accel-01",[1,8,20],x=>120/x],
["brake-torque-01",[0,4,10],x=>8*x],
["incline-force-01",[0,15,35],x=>600*9.81*Math.sin(x*Math.PI/180)],
["resultant-01",[0,400,800],x=>Math.hypot(300,x)],
["torsion-01",[30,120,240],x=>16*(x*1000)/(Math.PI*30**3)],
["axial-strain-01",[0,0.6,1.2],x=>x/1200],
["gear-mesh-01",[10,40,60],x=>3*(20+x)/2],
["belt-speed-01",[100,900,1500],x=>2*Math.PI*.1*x/60],
["hydro-power-01",[0,150,250],x=>x*24/600],
["hydro-volume-01",[0,300,600],x=>50*x/10000],
["pneumatic-force-01",[0,6,10],x=>x*1e5*Math.PI*.05**2/4],
["electric-power-02",[0,5,12],x=>24*x],
["joule-heat-01",[0,3,6],x=>4*x*x],
["rc-time-01",[100,10000,20000],x=>x*.00047],
["sampling-01",[1,5,20],x=>1000/x],
["efficiency-chain-01",[0,0.9,1],x=>.92*x],
["rolling-load-01",[0,0.025,0.05],x=>8000*x],
["heat-transfer-01",[0,15,40],x=>.8*2*x/.1],
["measurement-relative-01",[78,80,80.4],x=>100*Math.abs(x-80)/80],
["moment-arm-02",[0,30,90],x=>280*.45*Math.sin(x*Math.PI/180)],
["kinetic-friction-01",[0.05,0.25,0.7],x=>x*80*9.81],
["spring-stiffness-01",[100,300,500],x=>x/.025],
["beam-stress-02",[200,800,1500],x=>6*x*1000/(40*80*80)],
["gear-ratio-02",[24,54,90],x=>18/x],
["screw-lead-01",[1,3,8],x=>2*x],
["hydro-cylinder-speed-02",[0,12,24],x=>(x/60000)/(Math.PI*(.08*.08-.05*.05)/4)],
["hydro-annular-force-01",[20,100,180],x=>x*100000*Math.PI*(.08*.08-.04*.04)/4],
["pneumatic-consumption-01",[50,200,400],x=>Math.PI*2500*x/4/1e6],
["electrical-series-01",[2,18,40],x=>12+x],
["electrical-parallel-01",[1,6,24],x=>12*x/(12+x)],
["inductor-energy-01",[1,4,8],x=>.5*.2*x*x],
["mechanical-efficiency-02",[0.5,0.85,1],x=>12*x],
["rolling-torque-01",[50,200,400],x=>.35*x],
["thermal-resistance-01",[0.2,0.8,2],x=>.06/x],
["measurement-uncertainty-01",[0.02,0.1,0.5],x=>2*x]];
test('36 missions historiques indépendantes',()=>{assert.equal(cases.length,36);assert.equal(new Set(cases.map(c=>c[0])).size,36);});
for(const [id,values,reference] of cases)test(id+' : trois états, référence contradictoire et SVG',()=>{
 const item=catalog.byId(id);assert.ok(item,id+' absent du catalogue');
 const h=fs.readFileSync(item.url,'utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.subskill,item.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);
 for(const x of values){const y=p.calculate(id,x),z=reference(x);assert.ok(Number.isFinite(y));assert.ok(Math.abs(y-z)<=1e-9*Math.max(1,Math.abs(z)),id+' '+x+' : '+y+' / '+z);const s=d.render(id,x,y);assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);}
});

'use strict';
/** Audit indépendant des 25 missions 243–267. Tests Node uniquement. */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D}=require('../src/batch263-267.js');
const ids=["planetary-carrier-speed-01","capacitor-stored-energy-01","sensor-temperature-drift-01","belt-centrifugal-tension-01","thermal-penetration-length-01","hydrostatic-center-pressure-01","induction-rotor-frequency-01","fillet-weld-double-shear-01","parallel-plate-capacitance-01","isotropic-volume-expansion-01","bearing-pv-factor-01","three-phase-cable-voltage-drop-01","hydraulic-throttle-heat-01","pneumatic-receiver-fill-time-01","half-power-damping-ratio-01","screw-jack-self-locking-01","sensor-hysteresis-fullscale-01","gear-backlash-pitch-01","hydraulic-filter-captured-mass-01","transformer-load-voltage-01","bearing-static-safety-01","vibration-critical-damping-01","material-thermal-effusivity-01","metrology-worstcase-stack-01","hydraulic-wave-roundtrip-01"];
const refs=[
x=>(24*600+72*x)/(24+72),
x=>.5*4700e-6*x*x,
x=>12*120e-6*x*1000,
x=>.5*x*x,
x=>2*Math.sqrt(1.2e-5*x)*1000,
x=>x+.75+1.5**2/(12*(x+.75)),
x=>50*x,
x=>x*1000/(2*80*(6/Math.SQRT2)),
x=>8.8541878128e-12*3*.02/(x/1000)*1e9,
x=>2000*3*23e-6*x,
x=>1500/(.03*.04)*Math.PI*.03*x/60/1e6,
x=>Math.sqrt(3)*x*.0175*50/6*.8,
x=>x*1e5*(15e-3/60)/1000,
x=>.1*(x-6)/.002,
x=>x/(2*40),
x=>Math.atan(x)*180/Math.PI-6,
x=>100*x/16,
x=>.06*x*Math.PI/180*1000,
x=>x*25*120*.95/1000,
x=>230-.18*x,
x=>45000/x,
x=>2*Math.sqrt(40000*x),
x=>Math.sqrt(x*900*1000),
x=>(x-.1)-(30+.05)-(49.7+.08),
x=>2*x/1200*1000
];
const near=(a,b)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=2e-7*Math.max(1,Math.abs(b)),a+' ≠ '+b);
const data=(s,k)=>{const m=s.match(new RegExp(k+'="([^"]+)"'));assert.ok(m,k+' manquant');return Number(m[1]);};
for(const [i,id] of ids.entries())test('243–267 : '+(243+i)+' '+id,()=>{
 const html=fs.readFileSync('missions/'+id+'.html','utf8'),cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,id);assert.match(html,/lang="fr"/);assert.equal((html.match(/<li>/g)||[]).length,3);
 assert.ok(M.answerPolicy[id].assumptions.length>30&&M.answerPolicy[id].solution.length>100);
 assert.equal(M.criteria[id].unit,cfg.unit);assert.equal(M.inputUnits[id],cfg.inputUnit);near(cfg.expected,refs[i](cfg.initial));
 for(const x of [cfg.min,cfg.initial,cfg.max]){
  const y=M.calculate(id,x),expected=refs[i](x),svg=D.render(id,x,y);near(y,expected);
  assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/aria-labelledby=/);
  assert.doesNotMatch(svg,/NaN|Infinity|undefined/);assert.ok(Math.abs(data(svg,'data-result')-y)<=5.1e-7);
  const c=M.criteria[id];assert.equal(M.assess(id,x).acceptable,y>=c.min-1e-9&&y<=c.max+1e-9);
 }
 for(const bad of [NaN,Infinity,-Infinity,cfg.min-1,cfg.max+1])assert.throws(()=>M.calculate(id,bad),RangeError);
 assert.throws(()=>D.render(id,cfg.initial,M.calculate(id,cfg.initial)+1),RangeError);
});
test('250 : deux cordons de 80 mm, sans erreur de longueur totale',()=>{const id=ids[7],s=D.render(id,6,M.calculate(id,6));assert.match(s,/2 cordons × 80 mm/);assert.doesNotMatch(s,/2 × L = 80 mm/);});
test('255 : étranglement hydraulique avec section de passage libre',()=>{const id=ids[12];for(const x of [0,50,100]){const s=D.render(id,x,M.calculate(id,x));near(data(s,'data-passage-libre-px'),28);assert.doesNotMatch(s,/L300 129/);}});
test('264 : amortisseur raccordé à la masse aux deux bornes',()=>{const id=ids[21];for(const x of [25,100,400]){const s=D.render(id,x,M.calculate(id,x)),w=80+4*Math.sqrt(x),d=data(s,'data-damper-x');near(d,230+w-35);assert.ok(d>=230&&d<=230+w);}});

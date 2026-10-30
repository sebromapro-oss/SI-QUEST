'use strict';
/** Audit scientifique indépendant 268–292. Tests Node, pas essais physiques. */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D}=require('../src/batch288-292.js');
const ids=["thinwall-bredt-shear-01","threephase-power-factor-pq-01","battery-internal-joule-heat-01","sensor-two-point-sensitivity-01","cylinder-critical-insulation-radius-01","differential-outer-wheel-speed-01","repeatability-sample-std-01","maintenance-mttr-four-jobs-01","ice-latent-fusion-energy-01","proportional-loop-static-error-01","welding-linear-energy-01","dc-motor-back-emf-01","first-order-95-response-time-01","fourbar-grashof-margin-01","copper-temperature-resistance-01","radiation-net-power-01","rc-series-phase-angle-01","thinwall-cylinder-axial-stress-01","pneumatic-choked-flow-margin-01","elastic-strain-energy-density-01","slider-crank-position-01","gear-base-circle-diameter-01","acoustic-time-leq-01","pneumatic-choked-massflow-01","resistor-johnson-noise-01"];
const refs=[
x=>200/(2*.004*x*.001)/1e6,
x=>12/Math.hypot(12,x),
x=>.05*x*x,
x=>(x-.5)*10,
x=>40/x,
x=>3*(1+.8/x),
x=>{const a=[10,10.02,10.01,10.03,x],avg=a.reduce((s,v)=>s+v,0)/5;return Math.sqrt(a.reduce((s,v)=>s+(v-avg)**2,0)/4)},
x=>(130+x)/4,
x=>334*x,
x=>10/(1+2*x),
x=>.8*24*180/x,
x=>48-.4*x,
x=>-Math.log(.05)*x,
x=>75+90-35-x,
x=>.8*(1+.00393*(x-20)),
x=>.8*.5*5.670374419e-8*(x**4-293.15**4),
x=>-Math.atan(1/(2*Math.PI*x*1000*10e-6))*180/Math.PI,
x=>(x*1e6*.2)/(4*.006)/1e6,
x=>Math.exp(x/(x-1)*Math.log(2/(x+1)))-.5,
x=>(x*1e6)**2/(2*200e9)/1e3,
x=>(.05*Math.cos(x*Math.PI/180)+Math.sqrt(.18**2-(.05*Math.sin(x*Math.PI/180))**2))*1000,
x=>120*Math.cos(x*Math.PI/180),
x=>10*Math.log10((20*10**8+40*10**(x/10))/60),
x=>1e-6*x*1e5*Math.sqrt(1.4/(287*293.15))*(2/2.4)**3*1e3,
x=>Math.sqrt(4*1.380649e-23*300*x*1000*10000)*1e6
];
const near=(a,b)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=2e-7*Math.max(1,Math.abs(b)),a+' ≠ '+b);
const data=(s,k)=>{const m=s.match(new RegExp(k+'="([^"]+)"'));assert.ok(m,k+' manquant');return Number(m[1]);};
for(const [i,id] of ids.entries())test('268–292 : '+(268+i)+' '+id,()=>{
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
test('269 : triangle P-Q-S à échelle commune',()=>{const id=ids[1];for(const x of [0,6,20]){const s=D.render(id,x,M.calculate(id,x));near(data(s,'data-p-px')/12,7);near(data(s,'data-q-px'),7*x);assert.ok(207-7*x>=60);}});
test('270 : résistance interne sans conducteur traversant',()=>{const id=ids[2];for(const x of [0,80,150]){const s=D.render(id,x,M.calculate(id,x));assert.match(s,/data-serie="resistance-interne"/);assert.doesNotMatch(s,/x1="235" y1="90" x2="380" y2="90"/);}});
test('279 : résistance d’induit et moteur sans trait traversant',()=>{const id=ids[11];for(const x of [0,25,60]){const s=D.render(id,x,M.calculate(id,x));assert.match(s,/data-serie="resistance-induit"/);assert.match(s,/data-serie="moteur"/);assert.doesNotMatch(s,/x1="115" y1="113" x2="480" y2="113"/);}});

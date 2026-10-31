'use strict';
// Audit indépendant des 25 missions historiques aux positions 143–167
// lors du cycle du 31/10/2026. Les oracles ci-dessous ne sont pas importés
// du moteur : les conversions et relations sont recalculées séparément.
const test=require('node:test'),assert=require('node:assert/strict');
const batches=[383,378,373,368,363,358].map(n=>require('../src/batch'+n+'-'+(n+4)+'.js'));
const physics=batches[0].physics;
const metadata=new Map(batches.flatMap(b=>b.meta).map(m=>[m.id,m]));
const pi=Math.PI,sigma=5.670374419e-8;
const oracles={
'adc-quantization-max-error-01':x=>x*1000/(2*4096),
'pneumatic-receiver-pressure-rise-01':x=>100*(x/1000/60)*30/.1,
'thevenin-source-efficiency-01':x=>100/(1+2/x),
'pump-affinity-shaft-power-01':x=>5*(x/1500)**3,
'sampling-nyquist-rate-01':x=>2*x*1.25,
'radiation-two-gray-plates-01':x=>sigma*.8*(x**4-300**4)/(1/.8+1/.6-1),
'shaft-key-allowable-torque-01':x=>(x*1e6)*(.04/2)*(.012*.04),
'sensor-4-20ma-pressure-01':x=>(x-4)*25/16,
'rl-series-phase-angle-01':x=>Math.atan((2*pi*x*.1)/20)*180/pi,
'pump-affinity-head-01':x=>20*(x/1200)**2,
'metrology-expanded-uncertainty-01':x=>2*Math.sqrt(.08**2+x**2),
'cylindrical-insulation-heat-flow-01':x=>(2*pi*.04*2*40)/Math.log((x/1000)/.02),
'spur-gear-radial-load-01':x=>(2*200/.2)*Math.tan(x*pi/180),
'three-phase-cable-max-length-01':x=>(.03*400)/(Math.sqrt(3)*x*.75*.85)*1000,
'regenerative-cylinder-net-force-01':x=>(x*1e5)*(pi*.03**2/4)/1000,
'slider-crank-retraction-speed-01':x=>{const a=x*pi/180,r=.08,l=.3;return 10*(r*Math.sin(a)+r*r*Math.sin(a)*Math.cos(a)/Math.sqrt(l*l-r*r*Math.sin(a)**2));},
'adc-minimum-bits-01':x=>Math.ceil(Math.log2(10/(2*x/1000))),
'forced-vibration-amplitude-01':x=>{const w=2*pi*x;return 20000/Math.sqrt((10000-10*w*w)**2+(120*w)**2);},
'euler-pinned-column-load-01':x=>pi*pi*210e9*(pi*.04**4/64)/x**2/1000,
'sudden-expansion-loss-01':x=>{const q=.001,v1=4*q/(pi*.02**2),v2=4*q/(pi*(x/1000)**2);return .5*998*(v1-v2)**2/1000;},
'regen-braking-soc-gain-01':x=>100*(.65*.5*1200*(x/3.6)**2)/(20*3.6e6),
'lumped-cooling-threshold-time-01':x=>180*Math.log((120-20)/(x-20)),
'pneumatic-receiver-added-mass-01':x=>.05*((x-2)*1e5)/(287.05*293.15),
'hydraulic-local-loss-coefficient-01':x=>2*x*1e5/(850*4**2),
'straight-fin-heat-rate-01':x=>{const h=x,P=.064,A=6e-5,L=.08,m=Math.sqrt(h*P/(200*A));return Math.tanh(m*L)/(m*L)*h*P*L*60;}
};
test('inventaire explicite de 25 missions sans doublons',()=>{
 const ids=Object.keys(oracles);
 assert.equal(ids.length,25);assert.equal(new Set(ids).size,25);
 for(const id of ids)assert.ok(metadata.has(id),id+' : métadonnées absentes');
});
for(const [id,reference] of Object.entries(oracles)){
 test(id+' : trois oracles physiques indépendants et domaines',()=>{
  const m=metadata.get(id);
  assert.ok(m&&Number.isFinite(m.min)&&Number.isFinite(m.initial)&&Number.isFinite(m.max));
  for(const x of [m.min,m.initial,m.max]){
   const actual=physics.calculate(id,x),expected=reference(x);
   assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),id+' '+x+' : résultat non fini');
   assert.ok(Math.abs(actual-expected)<=1e-8*Math.max(1,Math.abs(expected)),id+' '+x+' : '+actual+' vs '+expected);
  }
  for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>physics.calculate(id,x),RangeError);
 });
}

'use strict';
/** SI QUEST V2.5 : contre-audit numérique indépendant des missions 218–242.
 * Les références sont distinctes des implémentations de production.
 * Les essais DOM simulés existants ne remplacent pas une recette navigateur/lecteur d'écran.
 */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const batches=['218-222','223-227','228-232','233-237','238-242'].map(s=>require('../src/batch'+s+'.js'));
const ids=["stokes-sphere-drag-01","magnetic-airgap-force-01","gear-tooth-tangential-force-01","pendulum-small-angle-period-01","radial-insulation-resistance-01","sinusoidal-vibration-rms-01","thick-cylinder-hoop-stress-01","three-phase-neutral-imbalance-01","source-matched-load-power-01","couette-viscous-shear-01","series-spring-stiffness-01","poisson-lateral-contraction-01","differential-thermal-clearance-01","three-phase-voltage-unbalance-01","vibration-base-transmissibility-01","shaft-key-shear-stress-01","transformer-winding-copper-loss-01","straight-fin-efficiency-01","brake-pad-sector-pressure-01","hydrostatic-wheel-traction-01","shaft-key-bearing-pressure-01","ultrasonic-time-of-flight-01","square-screw-lead-angle-01","capillary-rise-water-01","sample-hold-phase-lag-01"];
const refs=[
x=>6*Math.PI*.002*(x/1000)*1000,
x=>x*x*.0002/(8*Math.PI*1e-7),
x=>x/.075,
x=>2*Math.PI*Math.sqrt(x/9.81),
x=>Math.log(x/25)/(2*Math.PI*.045),
x=>(2*Math.PI*x)**2*.0005/Math.sqrt(2),
x=>x*(40**2+25**2)/(40**2-25**2),
x=>Math.hypot(x+8*Math.cos(-2*Math.PI/3)+12*Math.cos(2*Math.PI/3),8*Math.sin(-2*Math.PI/3)+12*Math.sin(2*Math.PI/3)),
x=>12**2/(4*x),
x=>.12*x*.02/.001,
x=>1/(1/80+1/x),
x=>-.3*(x/210000)*30000,
x=>.25-(23e-6-12e-6)*150*x,
x=>{let v=[x,400,410],a=v.reduce((p,q)=>p+q,0)/3;return 100*Math.max(...v.map(z=>Math.abs(z-a)))/a},
x=>Math.sqrt((1+(.4*x)**2)/((1-x*x)**2+(.4*x)**2)),
x=>((2*x/.04)/(.012*.04))/1e6,
x=>3*x*x*.25,
x=>{let m=Math.sqrt(x*2*(.04+.002)/(200*.04*.002));return Math.tanh(m*.08)/(m*.08)},
x=>x/(.5*(Math.PI/3)*(.16**2-.10**2))/1e6,
x=>(x*1e5)*(80e-6)/(2*Math.PI)*.85*15*.9/.45,
x=>(2*x/.04)/(.008*.5*.04)/1e6,
x=>343*x*.001/2,
x=>Math.atan(x/(Math.PI*24))*180/Math.PI,
x=>2*.0728/(998*9.81*(x/1000))*1000,
x=>-180*x*.02
];
const near=(a,b)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=2e-7*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,id] of ids.entries())test('218–242 : mission '+(218+i)+' '+id,()=>{
 const {physics:M,diagrams:D}=batches[Math.floor(i/5)];
 const html=fs.readFileSync('missions/'+id+'.html','utf8');
 const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,id);assert.match(html,/lang="fr"/);
 assert.equal((html.match(/<li>/g)||[]).length,3,'trois questions flash');
 assert.ok(M.answerPolicy[id].assumptions.length>30&&M.answerPolicy[id].solution.length>100);
 assert.equal(M.criteria[id].unit,cfg.unit);assert.equal(M.inputUnits[id],cfg.inputUnit);
 near(cfg.expected,refs[i](cfg.initial));
 for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.max]){
  const y=M.calculate(id,x),svg=D.render(id,x,y);near(y,refs[i](x));
  assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/aria-labelledby=/);
  assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
  const result=Number(svg.match(/data-result="([^"]+)"/)[1]);assert.ok(Math.abs(result-y)<=5.1e-7);
  const c=M.criteria[id];assert.equal(M.assess(id,x).acceptable,y>=c.min-1e-9&&y<=c.max+1e-9);
 }
 for(const bad of [NaN,Infinity,-Infinity,cfg.min-1,cfg.max+1])assert.throws(()=>M.calculate(id,bad),RangeError);
 assert.throws(()=>D.render(id,cfg.initial,M.calculate(id,cfg.initial)+1),RangeError);
});
test('222 : rayon de l’isolant à échelle commune',()=>{
 const {physics:M,diagrams:D}=batches[0],id=ids[4];
 for(const x of [30,50,80]){const s=D.render(id,x,M.calculate(id,x));
 const r=Number(s.match(/<circle cx="300" cy="139" r="([^"]+)" fill="#477e9b"/)[1]);
 near(r/28,x/25);}
});
test('226 : générateur connecté aux deux bornes du circuit',()=>{
 const {physics:M,diagrams:D}=batches[1],id=ids[8],s=D.render(id,.5,M.calculate(id,.5));
 assert.match(s,/x1="160" y1="125" x2="160" y2="105"/);
 assert.match(s,/x1="160" y1="183" x2="160" y2="147"/);
});
test('227 : profil de Couette, vitesse maximale près de la plaque mobile',()=>{
 const {physics:M,diagrams:D}=batches[1],id=ids[9],s=D.render(id,1.25,M.calculate(id,1.25));
 assert.match(s,/x1="176" y1="130" x2="264" y2="130"/);
 assert.match(s,/x1="176" y1="157" x2="198" y2="157"/);
});
test('237 : roue et réducteur sur un axe mécanique commun',()=>{
 const {physics:M,diagrams:D}=batches[3],id=ids[19],s=D.render(id,120,M.calculate(id,120));
 assert.match(s,/cx="528" cy="134" r="44"/);
 assert.match(s,/x1="472" y1="134" x2="528" y2="134"/);
 assert.match(s,/x1="484" y1="179" x2="579" y2="179"/);
});
test('241 : ménisque mouillant tangent aux parois et rayon croissant',()=>{
 const {physics:M,diagrams:D}=batches[4],id=ids[23];
 for(const x of [.2,.5,1]){const s=D.render(id,x,M.calculate(id,x));
 const r=Number(s.match(/data-meniscus-radius-px="([^"]+)"/)[1]);near(r,5+5*x);
 assert.match(s,/data-contact-angle="0"/);assert.ok(s.includes(' A'+r.toFixed(3)+' '+r.toFixed(3)+' 0 0 0 '));}
});

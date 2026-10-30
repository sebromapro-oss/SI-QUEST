'use strict';
/**
 * Audit indépendant des missions 418–442 : références physiques reconstruites,
 * invariants dimensionnels, domaine et géométrie SVG.
 * Les références ne réutilisent pas les fonctions de calcul du jeu.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const batches=[418,423,428,433,438].map(n=>require('../src/batch'+n+'-'+(n+4)+'.js'));
const M=batches[4].physics,D=batches[4].diagrams;
const all=batches.flatMap(b=>b.meta);
const near=(a,b,rel=2e-8)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=rel*Math.max(1,Math.abs(b)),a+' ≠ '+b);
const attr=(svg,key)=>{const m=svg.match(new RegExp('\\b'+key+'="([^"]+)"'));assert.ok(m,'Attribut absent : '+key);return Number(m[1]);};
const reference=[
  k=>{let lo=0,hi=100;for(let j=0;j<80;j++){const q=(lo+hi)/2;if(40-.02*(q/2)**2-k*q*q>0)lo=q;else hi=q;}return (lo+hi)/2;},
  U=>180*(U/400)**2/3,
  t=>100*(t-20)/(t+273.15),
  t=>.4+.06*(t-20),
  kg=>.25+(4*2**3/12)/(4*2*.5)-kg,
  F=>.25*F*(.08+.12)/(2*Math.sin(15*Math.PI/180)),
  p=>{const v2=5*(200/p)**(1/1.4);return (200*5-p*v2)/(1.4-1)*.1;},
  moment=>moment*(2*.12/3)/(.08*.12**3/36)/1e6,
  hz=>-180/Math.PI*Math.atan(2*Math.PI*hz*10000*10e-6),
  C=>180-2*Math.asin((.25-.1)/C)*180/Math.PI,
  x=>(50*x/100)*10,
  v=>100*v/48,
  a=>10*a/4,
  I=>.08*I**2,
  bar=>.62*Math.PI*(.006/2)**2*Math.sqrt(2*bar*100000/850)*60000,
  decel=>(2200*9.81*1.4+2200*decel*.9)/(2.8*1000),
  stroke=>(2*Math.PI*(.08/2)**2-Math.PI*(.03/2)**2)*stroke*7*1000,
  yieldMPa=>yieldMPa*1e6*(.06*.1**2/4)/1000,
  c2=>60*c2/(10+c2),
  massFlow=>massFlow*2257,
  forceKN=>forceKN*1000*.12/(210e9*58e-6)*1000,
  q=>q*3/2*(2/3),
  hours=>.5*hours*3600*55.845/(2*96485),
  seconds=>20+80*Math.exp(-seconds/(4*500/(20*.4))),
  deltaK=>.0007*80*deltaK
];
assert.equal(all.length,25);
for(const [i,a] of all.entries())test('contre-audit physique 418–442 : '+(418+i)+' '+a.id,()=>{
  const html=fs.readFileSync('missions/'+a.id+'.html','utf8');
  const config=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(config.id,a.id);
  assert.equal((html.match(/<li>/g)||[]).length,3,'trois aides');
  assert.match(html,/lang="fr"/);
  near(config.expected,reference[i](a.initial),2e-7);
  for(const x of [a.min,a.initial,a.max]){
    const expected=reference[i](x),actual=M.calculate(a.id,x),svg=D.render(a.id,x,actual);
    near(actual,expected,2e-9);
    assert.match(svg,/<svg/);assert.match(svg,/<title/);assert.match(svg,/<desc/);
    assert.match(svg,/aria-labelledby=/);
    assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
    near(attr(svg,'data-result'),actual,1e-8);
  }
  for(const invalid of [NaN,Infinity,a.min-1,a.max+1])
    assert.throws(()=>M.calculate(a.id,invalid),RangeError);
});
test('420 : cycle de Carnot = chaleur reçue, rejetée et travail utile',()=>{
  for(const t of [80,180,300]){
    const eta=M.calculate('carnot-engine-efficiency-01',t)/100;
    const svg=D.render('carnot-engine-efficiency-01',t,100*eta);
    assert.match(svg,/Machine/);assert.match(svg,/Qh/);assert.match(svg,/Qc/);assert.match(svg,/>W<\/text>/);
    near(attr(svg,'data-eta-fraction'),eta,1e-9);
    near(attr(svg,'data-rejected-heat-fraction'),1-eta,1e-9);
    near(attr(svg,'data-eta-fraction')+attr(svg,'data-rejected-heat-fraction'),1,1e-9);
  }
});
test('425 : triangle 80 × 120 mm représenté à échelle unique',()=>{
  for(const moment of [100,200,600]){
    const svg=D.render('triangular-beam-bending-stress-01',moment,M.calculate('triangular-beam-bending-stress-01',moment));
    near(attr(svg,'data-base-px')/attr(svg,'data-height-px'),80/120);
    near(attr(svg,'data-height-px'),240);
    near(attr(svg,'data-neutral-y')-attr(svg,'data-apex-y'),2*240/3);
    assert.match(svg,/M220 335 L380 335 L300 95 Z/);
  }
});
test('431 : échauffement ESR représenté sans intercept arbitraire',()=>{
  for(const amps of [1,3,5]){
    const power=M.calculate('capacitor-ripple-esr-heating-01',amps);
    const svg=D.render('capacitor-ripple-esr-heating-01',amps,power);
    near(attr(svg,'data-heat-bar-px'),100*power,1e-6);
    near(attr(svg,'data-heat-scale-px-per-w'),100);
  }
});
test('432 : longueur de flèche du débit proportionnelle à Q',()=>{
  for(const bar of [.5,2,5]){
    const flow=M.calculate('hydraulic-orifice-ideal-flow-01',bar);
    const svg=D.render('hydraulic-orifice-ideal-flow-01',bar,flow);
    near(attr(svg,'data-flow-arrow-px'),4*flow,1e-6);
    near(attr(svg,'data-flow-scale-px-per-lmin'),4);
    assert.ok(365+4*flow<550,'flèche dans la conduite');
  }
});
test('437 : flèche de condensation proportionnelle sans saturation',()=>{
  for(const flow of [.01,.02,.05]){
    const power=M.calculate('steam-condensation-latent-power-01',flow);
    const svg=D.render('steam-condensation-latent-power-01',flow,power);
    near(attr(svg,'data-heat-arrow-px'),.6*power,1e-7);
    near(attr(svg,'data-heat-scale-px-per-kw'),.6);
    assert.ok(280+.6*power<355,'flèche dans le repère');
  }
});

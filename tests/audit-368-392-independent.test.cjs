'use strict';
/**
 * SI QUEST V2.5 : contre-audit scientifique des missions 368–392.
 * Références physiques indépendantes des fonctions du moteur ;
 * états min / nominal / max, domaines, SVG, réponses et géométries.
 * Ne constitue pas une recette visuelle sur navigateur physique.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const batches=[368,373,378,383,388].map(n=>require('../src/batch'+n+'-'+(n+4)+'.js'));
const all=batches.flatMap(b=>b.meta);
const M=batches[4].physics,D=batches[4].diagrams;
const near=(actual,expected,tol=2e-8)=>assert.ok(Number.isFinite(actual)&&Number.isFinite(expected)&&Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),actual+' != '+expected);
const attr=(svg,key)=>{const m=svg.match(new RegExp('\\b'+key+'="([^"]+)"'));assert.ok(m,'Attribut SVG absent : '+key);return Number(m[1]);};
// Reconstructions dimensionnelles : bar -> Pa, mm -> m, L/min -> m³/s,
// radians/degrés, rendement, énergie, contraintes et pression absolue.
const refs=[
  I=>12/(Math.sqrt(3)*I*.00075*.85),
  p=>p*100000*Math.PI*.015**2/1000,
  angle=>{const t=angle*Math.PI/180,h=1e-5;const position=q=>.08*Math.cos(q)+Math.sqrt(.3**2-.08**2*Math.sin(q)**2);return -10*(position(t+h)-position(t-h))/(2*h);},
  eps=>{for(let bits=1;bits<=24;bits++)if(5/2**bits<=eps/1000)return bits;throw Error('CAN : résolution impossible');},
  f=>{const w=2*Math.PI*f;return 20000/Math.sqrt((10000-10*w*w)**2+(120*w)**2);},
  f=>Math.atan(2*Math.PI*f*.1/20)*180/Math.PI,
  rpm=>20*rpm*rpm/(1200*1200),
  ub=>2*Math.sqrt(.08**2+ub**2),
  radiusMM=>2*Math.PI*.04*2*40/Math.log((radiusMM/1000)/.02),
  alpha=>2000*Math.tan(alpha*Math.PI/180),
  rpm=>5*rpm**3/1500**3,
  f=>2*f*1.25,
  temp=>5.670374419e-8*.8*(temp**4-300**4)/(1/.8+1/.6-1),
  lengthMM=>40e6*.012*(lengthMM/1000)*(.04/2),
  currentMA=>25*(currentMA-4)/16,
  mu=>500*Math.exp(Math.PI*mu)/(Math.exp(Math.PI*mu)-1),
  epsilon=>80-epsilon*60/2,
  fullScaleV=>fullScaleV*1000/(2*4096),
  qNLmin=>100*(qNLmin/1000)*(30/60)/.1,
  R=>100/(1+2/R),
  kg=>334000*kg/800,
  I=>48/I-.4,
  torque=>1000*Math.pow(16*torque/(Math.PI*50e6),1/3),
  usefulFlow=>30*1500/1000-usefulFlow,
  arm=>150*9.81*.45/arm
];
assert.equal(all.length,25,'25 missions dans le périmètre');
for(const [index,a] of all.entries())test('audit 368–392 : '+(368+index)+' '+a.id,()=>{
  const html=fs.readFileSync('missions/'+a.id+'.html','utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,a.id);assert.match(html,/lang="fr"/);
  assert.equal((html.match(/<li>/g)||[]).length,3,'trois aides visibles');
  near(cfg.expected,refs[index](a.initial),2e-7);
  assert.equal(typeof a.u,'string');assert.ok(a.u.length>0,'unité de résultat');
  for(const x of [a.min,a.initial,a.max]){
    const expected=refs[index](x),actual=M.calculate(a.id,x),svg=D.render(a.id,x,actual);
    near(actual,expected,2e-7);
    assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/aria-labelledby=/);
    assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
    near(attr(svg,'data-result'),actual,2e-8);
    near(attr(svg,'data-geom-px'),a.scale*actual,2e-8);
    assert.equal(M.assess(a.id,x).acceptable,actual>=a.lo&&actual<=a.hi);
  }
  for(const bad of [NaN,Infinity,-Infinity,a.min-1,a.max+1])
    assert.throws(()=>M.calculate(a.id,bad),RangeError);
  assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);
});
test('389 : résistance de démarrage ET résistance d’induit dans le circuit série',()=>{
  for(const current of [15,30,60]){
    const ohms=M.calculate('dc-motor-start-resistor-01',current);
    const svg=D.render('dc-motor-start-resistor-01',current,ohms);
    near((ohms+.4)*current,48);
    assert.match(svg,/data-component="armature-resistance"/);
    assert.match(svg,/x1="289" y1="107" x2="312" y2="107"/);
    assert.match(svg,/x1="362" y1="107" x2="377" y2="107"/);
    assert.match(svg,/R_a=0,40 Ω/);
  }
});
test('391 : bilan de débit sans représentation d’une fuite externe non démontrée',()=>{
  for(const flow of [30,40,44]){
    const loss=M.calculate('pump-apparent-leakage-flow-01',flow);
    const svg=D.render('pump-apparent-leakage-flow-01',flow,loss);
    near(flow+loss,45);
    near(attr(svg,'data-apparent-flow'),loss,1e-6);
    assert.match(svg,/Pertes non localisées/);
    assert.doesNotMatch(svg,/x1="173" y1="245" x2="173" y2="175"/);
  }
});
test('392 : bras de levier représentés avec une seule échelle géométrique',()=>{
  for(const arm of [.3,.75,1.2]){
    const force=M.calculate('counterweight-limit-load-01',arm);
    const svg=D.render('counterweight-limit-load-01',arm,force);
    const pivot=attr(svg,'data-pivot-x'),left=attr(svg,'data-left-load-x'),right=attr(svg,'data-right-load-x'),scale=attr(svg,'data-scale-px-per-m');
    near((pivot-left)/scale,.45);near((right-pivot)/scale,arm);
    near(force*arm,150*9.81*.45);
    assert.ok(left>0&&right<600,'charge dans le repère');
  }
});
test('376 : isolation cylindrique, rayons intérieur et extérieur à échelle unique',()=>{
  const a=all.find(x=>x.id==='cylindrical-insulation-heat-flow-01');
  for(const outerMM of [30,50,80]){
    const svg=D.render(a.id,outerMM,M.calculate(a.id,outerMM));
    const radii=[...svg.matchAll(/<circle cx="310" cy="160" r="([^"]+)"/g)].map(m=>Number(m[1]));
    assert.equal(radii.length,2);
    near(radii[0]/radii[1],outerMM/20);
  }
});
test('381 : clavette, longueur et diamètre à échelle unique',()=>{
  const a=all.find(x=>x.id==='shaft-key-allowable-torque-01');
  for(const lengthMM of [25,40,65]){
    const svg=D.render(a.id,lengthMM,M.calculate(a.id,lengthMM));
    const m=svg.match(/<rect x="220" y="130" width="([^"]+)" height="26"/);
    assert.ok(m);near(Number(m[1])/80,lengthMM/40);
  }
});

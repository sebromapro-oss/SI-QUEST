'use strict';
/** Contre-audit SI QUEST V2.5, missions 343–367 : références SI indépendantes.
 * La validation graphique réelle et l'accessibilité sur appareils restent ouvertes.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const batches=[343,348,353,358,363].map(n=>require('../src/batch'+n+'-'+(n+4)+'.js'));
const all=batches.flatMap(b=>b.meta);
const M=batches[4].physics,D=batches[4].diagrams;
const near=(actual,expected,rel=2e-7)=>assert.ok(Number.isFinite(actual)&&Number.isFinite(expected)&&Math.abs(actual-expected)<=rel*Math.max(1,Math.abs(expected)),actual+' != '+expected);
const attr=(svg,key)=>{const m=svg.match(new RegExp('\\b'+key+'="([^"]+)"'));assert.ok(m,'Attribut absent : '+key);return Number(m[1]);};
const J=Math.PI*(.06**4-.04**4)/32;
const refs=[
  p=>p*100000/(850*2000),
  q=>1000*q*(1.2**4)/(8*210e9*1e-6),
  rate=>250*rate/1000,
  Ts=>Ts*(72/24),
  strain=>{const g=2*strain/1e6,Vl=5*g/4,Ve=5*g/(2*(2+g));return 100*(Vl-Ve)/Vl;},
  torque=>2000*Math.tan(20*Math.PI/180)-(2*torque/.16)*Math.tan(15*Math.PI/180),
  dmm=>{const D=dmm/1000,v=2300*.001/(998*D),A=Math.PI*D*D/4;return v*A*60000;},
  h=>h*.06*(52-40),
  sigma=>(20.10-19.90)/(6*sigma),
  over=>{const a=-Math.log(over/100);return a/Math.sqrt(Math.PI**2+a*a);},
  bar=>bar*1e5*(25/1e6)/(2*Math.PI*.9),
  C=>C*1.2/(80e9*J)*180/Math.PI,
  b=>99*(100-b)/100,
  Qc=>Math.sqrt(5000**2+(4000-1000*Qc)**2)/(Math.sqrt(3)*400),
  Z2=>100*((Z2-1.5)/(Z2+1.5))**2,
  dp=>2*dp*1e5/(850*4*4),
  h=>{const perimeter=2*(.03+.002),area=.03*.002,m=Math.sqrt(h*perimeter/(200*area));return h*perimeter*.08*60*Math.tanh(m*.08)/(m*.08);},
  nu=>(.04**2+.03**2)**2/(.04**4/nu),
  N=>Math.PI*.2*(N/4096)*1000,
  eta=>5*(1/(eta/100)-1),
  L=>Math.PI**2*210e9*(Math.PI*.04**4/64)/(L*L)/1000,
  Dmm=>{const q=.001,v1=4*q/(Math.PI*.02**2),v2=4*q/(Math.PI*(Dmm/1000)**2);return .5*998*(v1-v2)**2/1000;},
  kmh=>100*.65*.5*1200*(kmh/3.6)**2/(20*3600000),
  tc=>180*Math.log((120-20)/(tc-20)),
  p=>.05*((p-2)*1e5)/(287.05*293.15)
];
assert.equal(all.length,25,'25 missions dans le périmètre');
for(const [i,a] of all.entries())test('contre-calcul 343–367 : '+(343+i)+' '+a.id,()=>{
  const html=fs.readFileSync('missions/'+a.id+'.html','utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,a.id);assert.match(html,/lang="fr"/);
  assert.equal((html.match(/<li>/g)||[]).length,3,'trois aides');
  assert.ok(a.u&&a.iu,'unités présentes');
  near(cfg.expected,refs[i](a.initial));
  for(const x of [a.min,a.initial,a.max]){
    const y=refs[i](x),actual=M.calculate(a.id,x),svg=D.render(a.id,x,actual);
    near(actual,y);
    assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/aria-labelledby=/);
    assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
    near(attr(svg,'data-result'),actual);
    assert.equal(M.assess(a.id,x).acceptable,actual>=a.lo&&actual<=a.hi);
  }
  for(const bad of [NaN,Infinity,-Infinity,a.min-1,a.max+1])
    assert.throws(()=>M.calculate(a.id,bad),RangeError);
  assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);
});
test('358 : l’étranglement hydraulique laisse une section de passage non nulle',()=>{
  const id='hydraulic-local-loss-coefficient-01';
  for(const bar of [.1,.34,.8]){
    const svg=D.render(id,bar,M.calculate(id,bar));
    near(attr(svg,'data-pipe-height-px'),70);
    near(attr(svg,'data-throat-height-px'),22);
    near(attr(svg,'data-throat-center-y'),145);
    assert.match(svg,/x="270" y="110" width="55" height="24"/);
    assert.match(svg,/x="270" y="156" width="55" height="24"/);
    assert.doesNotMatch(svg,/x="270" y="110" width="55" height="70"/);
  }
});
test('359 : ailette de 80 mm × 2 mm représentée à échelle unique',()=>{
  const id='straight-fin-heat-rate-01';
  for(const h of [10,30,50]){
    const svg=D.render(id,h,M.calculate(id,h));
    near(attr(svg,'data-fin-length-px')/attr(svg,'data-fin-thickness-px'),80/2);
    near(attr(svg,'data-fin-length-px')/80,4);
    assert.match(svg,/x="145" y="151" width="320" height="8"/);
    assert.match(svg,/x1="180" y1="161" x2="180" y2="201"/);
  }
});

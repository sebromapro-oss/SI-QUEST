'use strict';
/** SI QUEST V2.5 — 25 références reconstruites indépendamment, missions 318–342.
 * Recette graphique physique, NVDA/TalkBack/VoiceOver non couverte par ces tests.
 */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const batches=[318,323,328,333,338].map(n=>require('../src/batch'+n+'-'+(n+4)+'.js'));
const all=batches.flatMap(b=>b.meta),M=batches[4].physics,D=batches[4].diagrams;
const references=[
  x=>(x*100000-2300)/(1000*9.81)+1/(2*9.81),
  x=>x*(.04/2)/(Math.PI*.04**4/64)/1e6,
  x=>.040/Math.sqrt(x),
  x=>100*(25-x/60)/25,
  x=>100/Math.hypot(100,x),
  x=>.008*x**3/12+2*(.12*.01**3/12+.12*.01*(x/2+.01/2)**2),
  x=>Math.min(x-19.75,20.25-x)-.05,
  x=>x/Math.sqrt(9.81*.5),
  x=>1200*.2/.4*(100-x)/100,
  x=>(8000*x+2000*20)/10000,
  x=>2*x*.35,
  x=>1000*10/(2**x*Math.sqrt(12)),
  x=>.023*x**.8*7**.4,
  x=>x/Math.sqrt(3),
  x=>x*(.05/2)/(Math.PI*(.05**4-.04**4)/32)/1e6,
  x=>100*(1-(1-.93)*(1-x)),
  x=>x/100*15,
  x=>1/(1/298.15+Math.log(x/10)/3950)-273.15,
  x=>x*1.5**2/(2*210e9*2e-6)*1000,
  x=>Math.sqrt(1.4*287*x),
  x=>90-100*(8*x/100),
  x=>x*1000/(1500*.90),
  x=>.040*300*x,
  x=>(x-400)/(x+400),
  x=>x/300-x/400
];
const near=(v,w,tol=2e-7)=>assert.ok(Number.isFinite(v)&&Number.isFinite(w)&&Math.abs(v-w)<=tol*Math.max(1,Math.abs(w)),v+' ≠ '+w);
const attr=(svg,name)=>{const m=svg.match(new RegExp('\\b'+name+'="([^"]+)"'));assert.ok(m,'Attribut absent : '+name);return Number(m[1]);};
assert.equal(all.length,25);assert.equal(references.length,25);
for(const [i,m] of all.entries())test('contre-audit indépendant '+(318+i)+' '+m.id,()=>{
 const html=fs.readFileSync('missions/'+m.id+'.html','utf8');
 const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,m.id);assert.match(html,/lang="fr"/);assert.equal((html.match(/<li>/g)||[]).length,3,'trois aides');
 assert.ok(m.u&&m.iu&&m.assumptions&&m.solution,'unités, hypothèses et corrigé');
 near(cfg.expected,references[i](m.initial));
 for(const x of [m.min,m.initial,m.max]){
   const independent=references[i](x),actual=M.calculate(m.id,x);
   near(actual,independent);
   const svg=D.render(m.id,x,actual);
   assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/aria-labelledby=/);
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
   near(attr(svg,'data-result'),actual,2e-6);
   assert.equal(M.assess(m.id,x).acceptable,actual>=m.lo&&actual<=m.hi);
 }
 for(const bad of [NaN,Infinity,-Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,bad),RangeError);
 assert.throws(()=>D.render(m.id,m.initial,M.calculate(m.id,m.initial)+1),RangeError);
});
test('319 : diamètre de la section circulaire cohérent avec la hauteur de l’arbre',()=>{
 const id='circular-shaft-bending-stress-01';
 for(const x of [30,120,250]){
  const svg=D.render(id,x,M.calculate(id,x));
  assert.match(svg,/x="85" y="95" width="330" height="80" rx="40"/);
  assert.match(svg,/cx="495" cy="135" r="40"/);
  assert.match(svg,/x1="455" y1="135" x2="535" y2="135"/);
 }
});
test('341 : amplitudes acoustiques incidentes, réfléchies et transmises cohérentes',()=>{
 const id='acoustic-normal-reflection-01';
 for(const Z2 of [600,1000,1600]){
  const r=M.calculate(id,Z2),svg=D.render(id,Z2,r);
  near(attr(svg,'data-reflection-px'),160*r,2e-6);
  near(attr(svg,'data-transmission-px'),160*(1+r),2e-6);
  assert.ok(310+attr(svg,'data-transmission-px')<600,'flèche transmise visible');
  near((1+r)**2*(400/Z2),1-r*r,2e-7); // flux d'énergie conservé pour milieux sans pertes
 }
});

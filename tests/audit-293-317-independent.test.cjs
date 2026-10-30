'use strict';
/** SI QUEST V2.5 — audit scientifique indépendant 293–317.
 * Tests automatisés seulement : aucune validation sur navigateur ou lecteur d'écran physique.
 */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const batches=[293,298,303,308,313].map(n=>require('../src/batch'+n+'-'+(n+4)+'.js'));
const all=batches.flatMap(b=>b.meta),M=batches[4].physics,D=batches[4].diagrams;
const references=[
 x=>(x+30)/2+Math.sqrt(((x-30)/2)**2+20**2),
 x=>Math.sqrt(.1/(100e-6))/x,
 x=>100*(1-Math.exp(-x)),
 x=>100*Math.exp(-Math.PI*x/Math.sqrt(1-x*x)),
 x=>10*Math.cos(x*Math.PI/180)/Math.sin((30+x)*Math.PI/180),
 x=>12*Math.sqrt(1-x*x),
 x=>Math.atan((2*Math.PI*x*.08)/20)*180/Math.PI,
 x=>1000/x,
 x=>100*Math.abs(x)/16,
 x=>210/(2*(1+x)),
 x=>Math.sqrt((x*1000)*(100e9)/(Math.PI*.020))/1e6,
 x=>(.161*300)/x,
 x=>29420/(Math.PI*.010*((.010-Math.sqrt(.010**2-(x/1000)**2))/2))/1e6,
 x=>(x*.001*4180)/.600,
 x=>100*(111*x)/(500000),
 x=>Math.sqrt(2*x/1000),
 x=>6*12/(12+x),
 x=>100*x/(1+x),
 x=>360/(200*x),
 x=>1+x*(2.5-1),
 x=>(3*x*1000)/(2*(.040*.100))/1e6,
 x=>(400/200)**2*x,
 x=>(1e-6*x)/(.020**2),
 x=>100*Math.exp(-((x/1000)**2)),
 x=>3000/x
];
const near=(v,w,tol=2e-7)=>assert.ok(Number.isFinite(v)&&Number.isFinite(w)&&Math.abs(v-w)<=tol*Math.max(1,Math.abs(w)),v+' ≠ '+w);
const get=(svg,name)=>{const tag=svg.match(new RegExp(name+'="([^"]+)"'));assert.ok(tag,'Attribut absent : '+name);return Number(tag[1]);};
assert.equal(all.length,25);assert.equal(references.length,25);
for(const [i,a] of all.entries())test('contre-calcul 293–317 : '+(293+i)+' '+a.id,()=>{
 const html=fs.readFileSync('missions/'+a.id+'.html','utf8');
 const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,a.id);assert.match(html,/lang="fr"/);
 assert.equal((html.match(/<li>/g)||[]).length,3,'trois aides');
 assert.ok(a.u&&a.iu&&a.assumptions&&a.solution,'unités et hypothèses');
 near(cfg.expected,references[i](a.initial));
 for(const x of [a.min,a.initial,a.max]){
  const independent=references[i](x),value=M.calculate(a.id,x),svg=D.render(a.id,x,value);
  near(value,independent);assert.match(svg,/<title/);assert.match(svg,/<desc/);
  assert.match(svg,/aria-labelledby=/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
  near(get(svg,'data-result'),value,2e-6);
  assert.equal(M.assess(a.id,x).acceptable,value>=a.lo-1e-9&&value<=a.hi+1e-9);
 }
 for(const bad of [NaN,Infinity,-Infinity,a.min-1,a.max+1])assert.throws(()=>M.calculate(a.id,bad),RangeError);
 assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);
});
test('293 : cercle de Mohr, centre et rayon à échelle commune',()=>{
 const id='plane-stress-principal-max-01';for(const x of [-20,80,120]){
  const svg=D.render(id,x,M.calculate(id,x));
  near(get(svg,'cx'),300+1.4*(x+30)/2,2e-6);
  near(get(svg,'data-mohr-radius-px'),1.4*Math.hypot((x-30)/2,20),2e-5);
  near(get(svg,'data-mohr-scale-px-per-mpa'),1.4);
 }
});
test('303 : demi-largeur de contact hertzien et échelle déclarée',()=>{
 const id='hertz-line-contact-pressure-01';for(const x of [10,40,80]){
  const svg=D.render(id,x,M.calculate(id,x));
  const b=Math.sqrt(4*x*1000*.02/(Math.PI*100e9));
  near(get(svg,'data-halfwidth-mm'),b*1000,2e-7);
  assert.match(svg,/empreinte amplifiée/);
 }
});
test('308 : vitesse Pitot matérialisée par une flèche orientée',()=>{
 const id='pitot-incompressible-speed-01';for(const dp of [50,320,800]){
  const svg=D.render(id,dp,M.calculate(id,dp));
  near(get(svg,'data-vitesse-longueur-px'),160*M.calculate(id,dp)/1.3,2e-6);
  assert.match(svg,/data-sens-vitesse="droite"/);
  assert.match(svg,/<polygon points=/);
 }
});

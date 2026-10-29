'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch448-452.js'),C=require('../src/catalog.js');
const reference=[
 x=>1/(1024/x),
 x=>{const e=(x/100)*6.112*Math.exp(17.62*25/(243.12+25)),g=Math.log(e/6.112);return 243.12*g/(17.62-g)},
 x=>(x*1e5)/(0.02*0.01/(2e-12*0.05))*60000,
 x=>3*x/(Math.sqrt(3)*24),
 x=>2.2*(x*1000/80)
];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-8*Math.max(1,Math.abs(b)),a+' != '+b);
for(const [i,v] of meta.entries())test(v.id+' : science, unités, SVG, invalides et HTML',()=>{
 const h=fs.readFileSync('missions/'+v.id+'.html','utf8');
 const c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(c.id,v.id);assert.equal(C.byId(v.id).subskill,v.subskill);
 assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/batch448-452\.js/);
 assert.match(h,/id="answer"/);assert.match(h,/id="trialValue"/);assert.match(h,/id="solution"/);
 for(const x of [v.min,v.initial,v.max]){
  const y=M.calculate(v.id,x),s=D.render(v.id,x,y);near(y,reference[i](x));
  assert.match(s,/<title/);assert.match(s,/<desc/);
  assert.doesNotMatch(s,/NaN|Infinity|undefined/);
  near(Number(s.match(/data-geom-px="([^"]+)"/)[1]),v.scale*y);
  assert.throws(()=>D.render(v.id,x,y+1),RangeError);
 }
 for(const x of [NaN,Infinity,v.min-1,v.max+1])assert.throws(()=>M.calculate(v.id,x),RangeError);
 near(c.expected,reference[i](v.initial));
 assert.equal(M.answerPolicy[v.id].solution.split('\n').length,5);
});
test('invariants et tracés géométriques des cinq investigations',()=>{
 const [a,b,c,d,e]=meta;
 near(M.calculate(a.id,3200)/M.calculate(a.id,800),4);
 const fft=D.render(a.id,2048,M.calculate(a.id,2048));
 near(+fft.match(/data-bin-spacing-px="([^"]+)"/)[1],80*M.calculate(a.id,2048));
 assert.ok(M.calculate(b.id,30)<M.calculate(b.id,60)&&M.calculate(b.id,60)<M.calculate(b.id,90));
 for(const rh of [30,60,90])assert.ok(M.calculate(b.id,rh)<25);
 const dew=D.render(b.id,60,M.calculate(b.id,60));
 near(+dew.match(/data-dew-x="([^"]+)"/)[1],120+16*M.calculate(b.id,60));
 near(M.calculate(c.id,2),2*M.calculate(c.id,1));
 const filter=D.render(c.id,1.5,M.calculate(c.id,1.5));
 near(+filter.match(/data-flow-arrow-px="([^"]+)"/)[1],30+20*M.calculate(c.id,1.5));
 const delta=D.render(d.id,400,M.calculate(d.id,400));
 near(+delta.match(/data-current-ratio="([^"]+)"/)[1],3);
 near(M.calculate(d.id,400)/+delta.match(/data-star-current-a="([^"]+)"/)[1],3);
 near(M.calculate(e.id,15),1.5*M.calculate(e.id,10));
 assert.ok(M.calculate(e.id,15)<420);
 const notch=D.render(e.id,10,M.calculate(e.id,10));
 near(+notch.match(/data-force-arrow-px="([^"]+)"/)[1],45);
});
test('catalogue : 17 univers, identifiants et pages 448–452',()=>{
 assert.equal(C.worlds.length,17);
 assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
 assert.ok(C.levels.length>=452);
 for(const v of meta)assert.ok(fs.existsSync('missions/'+v.id+'.html'));
});
test('audit pédagogique 40–75 : trois questions flash dans chaque page',()=>{
 const historical=C.levels.slice(-75,-39);
 assert.equal(historical.length,36);
 for(const v of historical){
  const h=fs.readFileSync(v.url,'utf8');
  assert.ok((h.match(/<li>/g)||[]).length>=3,v.id+' sans trois questions flash');
 }
});
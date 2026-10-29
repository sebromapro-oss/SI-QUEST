'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch473-477.js'),C=require('../src/catalog.js');
const ref=[
 x=>2*.4*x,
 x=>1000*Math.sqrt(2*1.72e-8/(2*Math.PI*x*4*Math.PI*1e-7)),
 x=>(x/(.04/2))/(50e-3*4e-3)/1e6,
 x=>(.05*280)*x-(2*x*x)/2-(.5*10),
 x=>180*(x/40)/Math.PI
];
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : physique indépendante, domaine, SVG, HTML',()=>{
 const h=fs.readFileSync(path.join(__dirname,'../missions',m.id+'.html'),'utf8');
 const cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);
 assert.equal(h.split('<li>').length-1,3);assert.ok(h.includes('batch473-477.js'));
 assert.equal(m.solution.split('\n').length,5);
 for(const x of [m.min,m.initial,m.max]){
  const y=M.calculate(m.id,x),svg=D.render(m.id,x,y);near(y,ref[i](x));
  assert.ok(svg.includes('<title')&&svg.includes('<desc'));assert.ok(!/NaN|Infinity|undefined/.test(svg));
  near(Number(svg.split('data-geom-px="')[1].split('"')[0]),m.scale*y,1e-6);
  assert.throws(()=>D.render(m.id,x,y+Math.max(1,Math.abs(y)*.1)),RangeError);
 }
 for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,x),RangeError);
 near(cfg.expected,ref[i](m.initial));
 for(const chunk of h.split('<script src="').slice(1)){const src=chunk.split('"')[0];assert.ok(fs.existsSync(path.resolve(__dirname,'../missions',src)),src);}
});
test('invariants et cohérence des géométries',()=>{
 const [a,b,c,d,e]=meta;
 const coriolis=D.render(a.id,12,M.calculate(a.id,12));assert.ok(coriolis.includes('x1="360" y1="235" x2="360"'));

 near(M.calculate(a.id,16)/M.calculate(a.id,8),2);
 near(M.calculate(b.id,200)/M.calculate(b.id,800),2);
 near(M.calculate(c.id,200)/M.calculate(c.id,100),2);
 near(M.calculate(d.id,3),28);
 assert.ok(M.calculate(d.id,5)>M.calculate(d.id,1));
 near(M.calculate(e.id,.3)/M.calculate(e.id,.15),2);
 const s=D.render(b.id,1000,M.calculate(b.id,1000));
 near(Number(s.split('data-skin-layer-px="')[1].split('"')[0]),10*M.calculate(b.id,1000),1e-6);
 const p=D.render(d.id,3,M.calculate(d.id,3));
 near(Number(p.split('data-hot-heat-w="')[1].split('"')[0])-M.calculate(d.id,3),.05*3*10+2*3*3,1e-6);
 const g=D.render(e.id,.15,M.calculate(e.id,.15));
 near(Number(g.split('data-gap-px="')[1].split('"')[0]),15);
});
test('réception structurelle catalogue et correction P2 historiques',()=>{
 assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=477);
 assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
 const repaired=['hydro-backpressure-01','euler-buckling-01','accumulator-isothermal-01','wheatstone-bridge-01','torsion-angle-01'];
 for(const id of repaired){
  assert.ok(C.byId(id).subskill,id);
  const html=fs.readFileSync(path.join(__dirname,'../missions',id+'.html'),'utf8');
  assert.ok(html.includes('<strong>Sous-savoir :</strong>'));
 }
});

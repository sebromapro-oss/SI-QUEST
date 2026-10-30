'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch478-482.js'),C=require('../src/catalog.js');
const refs=[
x=>8.8541878128e-12*.02*(x/.002)**2*500,
x=>.5*(x*1.2/(80e9*(Math.PI/32)*(.04**4)))*x,
x=>2*x,
x=>1000*x*x*(.04-.0025)/2000,
x=>(1500-x)/30
];
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : contre-calculs, SVG, domaine et pédagogie',()=>{
const h=fs.readFileSync(path.join(__dirname,'../missions',m.id+'.html'),'utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);
assert.ok(h.includes('batch478-482.js'));assert.equal(m.solution.split('\n').length,5);
for(const x of [m.min,m.initial,m.max]){const y=M.calculate(m.id,x),svg=D.render(m.id,x,y);near(y,refs[i](x));assert.ok(svg.includes('<title')&&svg.includes('<desc'));assert.ok(!/NaN|Infinity|undefined/.test(svg));near(Number(svg.split('data-geom-px="')[1].split('"')[0]),m.scale*y,1e-6);assert.throws(()=>D.render(m.id,x,y+Math.max(1,.1*Math.abs(y))),RangeError);}
for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,x),RangeError);
near(cfg.expected,refs[i](m.initial));
for(const chunk of h.split('<script src="').slice(1)){const src=chunk.split('"')[0];assert.ok(fs.existsSync(path.resolve(__dirname,'../missions',src)),src);}
});
test('propriétés indépendantes et conventions physiques',()=>{
const [a,b,c,d,e]=meta;
near(M.calculate(a.id,600)/M.calculate(a.id,300),4);
near(M.calculate(b.id,200)/M.calculate(b.id,100),4);
near(M.calculate(c.id,4)/M.calculate(c.id,2),2);
near(M.calculate(d.id,20)/M.calculate(d.id,10),4);
near(M.calculate(e.id,1500-60),2);
assert.ok(D.render(a.id,400,M.calculate(a.id,400)).includes('data-attraction-arrow-px='));
assert.ok(D.render(d.id,12,M.calculate(d.id,12)).includes('Gradient radial'));
});
test('historique 40–75 : traçabilité réparée et catalogue évolutif',()=>{
assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=482);
assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
for(const id of ["circular-02","angular-accel-01","brake-torque-01","incline-force-01","resultant-01"]){assert.ok(C.byId(id).subskill);assert.ok(fs.readFileSync(path.join(__dirname,'../missions',id+'.html'),'utf8').includes('<strong>Sous-savoir :</strong>'));}
});

test('géométrie de rampe : aucun tracé ne sort du cadre aux bornes',()=>{
const m=meta[2];for(const x of [m.min,m.initial,m.max]){
const svg=D.render(m.id,x,M.calculate(m.id,x));
const lines=[...svg.matchAll(/<line x1="240" y1="([0-9.]+)" x2="530" y2="([0-9.]+)"/g)];
assert.equal(lines.length,2);for(const line of lines){assert.ok(Number(line[1])>=90&&Number(line[1])<=420);assert.ok(Number(line[2])>=90&&Number(line[2])<=420);}
}
});

test('mission 480 : écart de rampe lisible et contenu dans le repère pour tout le domaine',()=>{
 const m=meta[2];for(const speed of [m.min,m.initial,m.max]){
  const svg=D.render(m.id,speed,M.calculate(m.id,speed));
  const gap=Number(svg.match(/data-ramp-gap-px="([^"]+)"/)[1]);
  near(gap,16*M.calculate(m.id,speed));
  const lines=[...svg.matchAll(/<line x1="240" y1="([0-9.]+)" x2="530" y2="([0-9.]+)"/g)];
  assert.equal(lines.length,2);
  for(const line of lines)for(const ordinate of line.slice(1).map(Number))assert.ok(ordinate>=95&&ordinate<=365,ordinate);
 }
});
test('mission 481 : rapport des rayons r1/r2 exactement égal à 0,05/0,20',()=>{
 const m=meta[3];for(const omega of [m.min,m.initial,m.max]){
  const svg=D.render(m.id,omega,M.calculate(m.id,omega));
  const inner=Number(svg.match(/data-inner-radius-px="([^"]+)"/)[1]);
  const outer=Number(svg.match(/data-outer-radius-px="([^"]+)"/)[1]);
  near(inner/outer,.05/.20);near(outer,115);
  assert.match(svg,/<line x1="378\.75" y1="240" x2="465" y2="240"/);
 }
});

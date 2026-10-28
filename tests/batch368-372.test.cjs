'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch368-372.js'),C=require('../src/catalog.js');
const refs={
'three-phase-cable-max-length-01':x=>12/(Math.sqrt(3)*x*.75*.85)*1000,
'regenerative-cylinder-net-force-01':x=>x*100*Math.PI*(.03/2)**2,
'slider-crank-retraction-speed-01':x=>{const t=x*Math.PI/180,h=1e-5;const position=q=>.08*Math.cos(q)+Math.sqrt(.3**2-.08**2*Math.sin(q)**2);return -10*(position(t+h)-position(t-h))/(2*h);},
'adc-minimum-bits-01':x=>{for(let n=1;n<=24;n++)if(5/2**n<=x/1000)return n;throw Error('résolution impossible');},
'forced-vibration-amplitude-01':x=>{const w=2*Math.PI*x;return 20000/Math.sqrt((1e4-10*w*w)**2+(120*w)**2);}
};
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-7*Math.max(1,Math.abs(y)),x+' != '+y);
for(const a of meta)test(a.id+' : références indépendantes, géométrie, domaines',()=>{
 const html=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,a.id);assert.equal((html.match(/<li>/g)||[]).length,3);assert.equal(html.split('batch368-372.js').length,2);assert.equal(C.byId(a.id).subskill,a.subskill);
 for(const x of [a.min,a.initial,a.max]){const y=M.calculate(a.id,x);near(y,refs[a.id](x));const svg=D.render(a.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);near(Number(svg.match(/data-geom-px="([^"]+)/)[1]),a.scale*y);}
 for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
 assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);near(cfg.expected,M.calculate(a.id,a.initial));
});
test('propriétés physiques et historique',()=>{
 for(const x of [10,20,30])near(M.calculate('three-phase-cable-max-length-01',x)*x,M.calculate('three-phase-cable-max-length-01',20)*20);
 for(const x of [80,120,200])near(M.calculate('regenerative-cylinder-net-force-01',x)/x,M.calculate('regenerative-cylinder-net-force-01',120)/120);
 for(const x of [30,60,90,120,150])assert.ok(M.calculate('slider-crank-retraction-speed-01',x)>0);
 for(const x of [1,2,3,4,5]){const n=M.calculate('adc-minimum-bits-01',x);assert.ok(Number.isInteger(n));assert.ok(5/2**n<=x/1000);assert.ok(5/2**(n-1)>x/1000);}
 const f0=Math.sqrt(10000/10)/(2*Math.PI);assert.ok(M.calculate('forced-vibration-amplitude-01',f0)>M.calculate('forced-vibration-amplitude-01',2));
 for(const id of ['work-01','frequency-period-01']){const h=fs.readFileSync('missions/'+id+'.html','utf8');assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/Objectif/);assert.match(h,/Prérequis/);}
 assert.ok(C.levels.length >= 372);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.subskill).filter(Boolean)).size,249);
});

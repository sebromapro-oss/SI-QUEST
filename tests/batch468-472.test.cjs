'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {physics:M,diagrams:D,meta}=require('../src/batch468-472.js'),C=require('../src/catalog.js');
const refs=[
x=>1200*x,
x=>Math.asin((2*Math.PI*x*.05)/Math.hypot(20,2*Math.PI*x*.05))*180/Math.PI,
x=>1000*9.81*(.6*x/2)*(2*x/3),
x=>(.12*.2**3/12-((.12-2*x/1000)*(.2-2*x/1000)**3/12))*1e8,
x=>9000/Math.pow(x,2)
];
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : modèle, unités, domaine, SVG, page',()=>{
const html=fs.readFileSync('missions/'+m.id+'.html','utf8'),c=JSON.parse(html.match(/window\.SI_MISSION=(\{.*?\})<\/script>/)[1]);
assert.equal(c.id,m.id);assert.equal((html.match(/<li>/g)||[]).length,3);assert.equal(m.solution.split('\n').length,5);
assert.equal((html.match(/investigation-mission\.js/g)||[]).length,1);
for(const x of [m.min,m.initial,m.max]){
const y=M.calculate(m.id,x),s=D.render(m.id,x,y);near(y,refs[i](x));
assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);
near(Number(s.match(/data-geom-px="([^"]+)"/)[1]),m.scale*y,1e-6);
assert.throws(()=>D.render(m.id,x,y+Math.max(1,.1*Math.abs(y))),RangeError);
}
for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,x),RangeError);
near(c.expected,refs[i](m.initial));for(const [,src] of html.matchAll(/<script src="([^"]+)"/g))assert.ok(fs.existsSync('missions/'+src),src);
});
test('contrôleur mutualisé : chargement avant configuration sans exception',()=>{
const src=fs.readFileSync('src/investigation-mission.js','utf8');assert.match(src,/if\(!c\)return;/);
assert.doesNotThrow(()=>vm.runInNewContext(src,{window:{}}));
});
test('catalogue extensible, 17 univers et identifiants uniques',()=>{
assert.ok(C.levels.length>=472);assert.equal(C.worlds.length,17);
assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
for(const m of meta)assert.ok(C.byId(m.id));
});
test('géométries : centre de pression et parois intérieures',()=>{
const g=meta[2],svg=D.render(g.id,.8,M.calculate(g.id,.8));near(Number(svg.match(/data-pressure-center-y="([^"]+)"/)[1]),130+.75*120*.8,1e-6);
const h=meta[3],s=D.render(h.id,12,M.calculate(h.id,12));near(Number(s.match(/data-inner-width-px="([^"]+)"/)[1]),96,1e-6);
});

test('mission 470 : triangle à échelle isotrope et centre de pression à 3h/4',()=>{
 const m=meta[2];for(const h of [m.min,m.initial,m.max]){
  const svg=D.render(m.id,h,M.calculate(m.id,h));
  const match=svg.match(/<path d="M350 130 L([0-9.]+) ([0-9.]+) L([0-9.]+) ([0-9.]+) Z"/);
  assert.ok(match,'triangle SVG');const [xL,yL,xR,yR]=match.slice(1).map(Number);
  near(xR-xL,120*.6);near(yL-130,120*h);near(yR,yL);near((xL+xR)/2,350);
  near(Number(svg.match(/data-base-width-px="([^"]+)"/)[1]),72);
  near(Number(svg.match(/data-pressure-center-y="([^"]+)"/)[1]),130+.75*120*h);
 }
});

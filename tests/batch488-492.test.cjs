'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch488-492.js'),C=require('../src/catalog.js');
const refs=[x=>260*9.81*x,x=>x/(x-270)-1,x=>360/(1<<x),x=>2*(1+x)*200/700,x=>100*(1.06-.06*Math.exp(Math.log(x)/1.3))];
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : calcul contradictoire, domaine et SVG',()=>{
 const h=fs.readFileSync(path.join(__dirname,'../missions',m.id+'.html'),'utf8');
 const cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);
 assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal(m.solution.split('\n').length,5);
 for(const x of [m.min,m.initial,m.max]){const y=M.calculate(m.id,x),svg=D.render(m.id,x,y);
 near(y,refs[i](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);
 assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 near(Number(svg.split('data-geom-px="')[1].split('"')[0]),m.scale*y,1e-6);
 assert.throws(()=>D.render(m.id,x,y+Math.max(.1,.1*Math.abs(y))),RangeError);}
 for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,x),RangeError);
 near(cfg.expected,refs[i](m.initial));
 for(const chunk of h.split('<script src="').slice(1)){const src=chunk.split('"')[0];assert.ok(fs.existsSync(path.resolve(__dirname,'../missions',src)),src);}
});
test('invariants physiques, discrétisation et catalogue',()=>{
 near(M.calculate(meta[0].id,.4),2*M.calculate(meta[0].id,.2));
 assert.ok(M.calculate(meta[1].id,300)>M.calculate(meta[1].id,340));
 near(M.calculate(meta[2].id,11),M.calculate(meta[2].id,10)/2);
 assert.throws(()=>M.calculate(meta[2].id,10.5),RangeError);
 near(M.calculate(meta[3].id,1),2*M.calculate(meta[3].id,0));
 assert.ok(M.calculate(meta[4].id,7)<M.calculate(meta[4].id,2));
 assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=492);
 assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
 for(const [id,sub] of [["hydro-volume-01","Volume géométrique balayé par la chambre pleine d’un vérin"],["electric-power-02","Puissance électrique absorbée en courant continu selon P = UI"],["joule-heat-01","Puissance dissipée par effet Joule dans une résistance ohmique"],["rc-time-01","Constante de temps d’un circuit RC série idéal"],["sampling-01","Fréquence d’échantillonnage à partir de la période d’acquisition"]]){assert.equal(C.byId(id).subskill,sub);assert.ok(fs.readFileSync(path.join(__dirname,'../missions',id+'.html'),'utf8').includes(sub));}
});
'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch483-487.js'),C=require('../src/catalog.js');
const refs=[x=>20*x*12.7/(60*1000),x=>1000*((.4*x*x/2+(.2-.4)*x*x/3)/((.4+.2)*x/2)),x=>(x*1000)*48/1000,x=>100*(2*Math.exp(-.001*x)-Math.exp(-.002*x)),x=>.5*(7800*Math.PI*.01*(x*x-.05**2))*(x*x+.05**2)];
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : contre-calcul indépendant, domaine, SVG et pédagogie',()=>{
const h=fs.readFileSync(path.join(__dirname,'../missions',m.id+'.html'),'utf8');
const cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);
assert.equal(m.solution.split('\n').length,5);assert.ok(h.includes('batch483-487.js'));
for(const x of [m.min,m.initial,m.max]){const y=M.calculate(m.id,x),svg=D.render(m.id,x,y);near(y,refs[i](x));
assert.ok(svg.includes('<title')&&svg.includes('<desc'));assert.ok(!/NaN|Infinity|undefined/.test(svg));
near(Number(svg.split('data-geom-px="')[1].split('"')[0]),m.scale*y,1e-6);
assert.throws(()=>D.render(m.id,x,y+Math.max(.1,.1*Math.abs(y))),RangeError);}
for(const x of [NaN,Infinity,m.min-.01,m.max+.01])assert.throws(()=>M.calculate(m.id,x),RangeError);
near(cfg.expected,refs[i](m.initial));
for(const chunk of h.split('<script src="').slice(1)){const src=chunk.split('"')[0];assert.ok(fs.existsSync(path.resolve(__dirname,'../missions',src)),src);}
});
test('propriétés physiques, signes et géométries',()=>{
const [a,b,c,d,e]=meta;near(M.calculate(a.id,800)/M.calculate(a.id,400),2);
near(M.calculate(b.id,.8)/M.calculate(b.id,.4),2);
near(M.calculate(c.id,.8)/M.calculate(c.id,.4),2);
assert.ok(M.calculate(d.id,100)>M.calculate(d.id,1000));
assert.ok(M.calculate(e.id,.16)>M.calculate(e.id,.08));
for(const m of meta){const svg=D.render(m.id,m.max,M.calculate(m.id,m.max));
const g=Number(svg.split('data-geom-px="')[1].split('"')[0]);assert.ok(g>=0&&g<=400);}
});
test('catalogue évolutif et rattachements scientifiques corrigés',()=>{
assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=487);
assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
const fix=[["torsion-01","Contrainte tangentielle maximale d’un arbre circulaire plein en torsion"],["axial-strain-01","Déformation axiale unitaire par allongement relatif"],["gear-mesh-01","Entraxe théorique de deux engrenages droits extérieurs"],["belt-speed-01","Vitesse tangentielle d’une courroie sans glissement"],["hydro-power-01","Puissance hydraulique idéale à partir du débit et de la différence de pression"],["threephase-star-capacitance-01","Dimensionnement capacitif d’une compensation réactive triphasée en étoile"],["rl-current-threshold-time-01","Temps d’établissement du courant d’un circuit RL série"],["flywheel-kinetic-energy-01","Énergie cinétique d’un solide en rotation autour d’un axe fixe"],["convective-surface-coefficient-01","Détermination du coefficient convectif par bilan thermique"]];
for(const [id,sub] of fix){assert.equal(C.byId(id).subskill,sub);
assert.ok(fs.readFileSync(path.join(__dirname,'../missions',id+'.html'),'utf8').includes(sub));}
});

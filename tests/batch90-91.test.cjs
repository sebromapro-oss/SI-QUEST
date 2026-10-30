'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const m=require('../src/investigations.js'),d=require('../src/investigation-diagrams.js'),cat=require('../src/catalog.js');
const near=(x,y,t=1e-8)=>assert.ok(Math.abs(x-y)<=t*Math.max(1,Math.abs(y)),x+' ≠ '+y);
function check(id){const h=fs.readFileSync('missions/'+id+'.html','utf8');const c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.equal(c.id,id);assert.ok(cat.byId(id));assert.equal(m.criteria[id].unit,c.unit);assert.equal(m.inputUnits[id],c.inputUnit);near(m.calculate(id,c.initial),c.expected);for(const x of [c.min,c.initial,c.max]){const svg=d.render(id,x,m.calculate(id,x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.ok(svg.includes(c.unit)&&svg.includes(c.inputUnit));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}return c;}
test('90 : fréquence propre, calcul indépendant par période et propriétés',()=>{const c=check('natural-frequency-01');for(const x of [10,40,80])near(m.calculate(c.id,x),1/(2*Math.PI*Math.sqrt(x/18000)));near(m.calculate(c.id,40),3.376186185589148);near(m.calculate(c.id,40)/m.calculate(c.id,10),.5);assert.equal(m.assess(c.id,40).acceptable,true);assert.equal(m.assess(c.id,10).acceptable,false);assert.throws(()=>m.calculate(c.id,0),RangeError);});
test('91 : moment quadratique, contre-calcul par intégration y²dA',()=>{const c=check('rectangular-tube-inertia-01');for(const [e,v] of [[4,309.0432],[6,438.1632],[12,739.1232]]){near(m.calculate(c.id,e),v);let sum=0,dy=120/12000;for(let i=0;i<12000;i++){const y=-60+(i+.5)*dy;sum+=(Math.abs(y)<60-e?2*e:80)*y*y*dy;}near(m.calculate(c.id,e),sum/10000,2e-6);}assert.equal(m.assess(c.id,6).acceptable,true);assert.equal(m.assess(c.id,4).acceptable,false);assert.throws(()=>m.calculate(c.id,0),RangeError);});
test('Audit hydrostatique : prise basse synchronisée',()=>{for(const [x,y] of [[0,84],[2.5,126],[6,184]])assert.ok(d.render('hydrostatic-column-01',x,m.calculate('hydrostatic-column-01',x)).includes('data-depth-y="'+y+'"'));near(m.calculate('hydrostatic-column-01',0),0);});
test('Catalogue 91 : deux missions intégrées',()=>{assert.ok(cat.levels.length>=91);assert.equal(new Set(cat.levels.map(x=>x.id)).size,cat.levels.length);const c=fs.readFileSync('src/investigation-mission.js','utf8');for(const id of ['natural-frequency-01','rectangular-tube-inertia-01'])assert.ok(c.includes("'"+id+"'"));});

test('Contrôle géométrique : tube sans arrondis et ressort raccordé',()=>{
 const tube=d.render('rectangular-tube-inertia-01',6,m.calculate('rectangular-tube-inertia-01',6));
 assert.match(tube,/<rect x="245" y="54" width="100" height="150"/);
 assert.match(tube,/data-epaisseur-mm="6"/);
 const spring=d.render('natural-frequency-01',40,m.calculate('natural-frequency-01',40));
 assert.match(spring,/<line x1="320" y1="105" x2="332" y2="105"/);
 assert.match(spring,/data-signal="libre"/);
});

test('Audit lot 40–75 : résistance au roulement, réaction au contact et légende unique',()=>{
 const svg=d.render('rolling-torque-01',200,m.calculate('rolling-torque-01',200));
 assert.match(svg,/<line x1="305" y1="190" x2="305" y2="129"[^>]+marker-end/);
 assert.match(svg,/<line x1="305" y1="129" x2="232\.5" y2="129"[^>]+marker-end/);
 assert.equal((svg.match(/Fᵣ = /g)||[]).length,0);
 assert.match(svg,/Cᵣ = 70 N·m/);
});

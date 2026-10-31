'use strict';
/** SI QUEST V2.5 — 25 contre-calculs indépendants (missions 68–92).
 * Trois points de domaine + nominal par mission ; ne remplace pas une recette visuelle.
 * Les références sont explicites et séparées des fonctions de production.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const physics=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
const catalog=require('../src/catalog.js');
const root=path.resolve(__dirname,'..');
const cases=[
 ['pneumatic-consumption-01',x=>Math.PI*(.05/2)**2*(x/1000)*1000],
 ['electrical-series-01',x=>12+x],
 ['electrical-parallel-01',x=>1/(1/12+1/x)],
 ['inductor-energy-01',x=>.5*.2*x*x],
 ['mechanical-efficiency-02',x=>12*x],
 ['rolling-torque-01',x=>.35*x],
 ['thermal-resistance-01',x=>.12/(2*x)],
 ['measurement-uncertainty-01',x=>100*(2*x)/100],
 ['hose-pressure-drop-01',x=>128*.06*5*(x/60000)/(Math.PI*Math.pow(.012,4))/100000],
 ['dc-voltage-drop-01',x=>x*(.0175*(2*8)/2.5)],
 ['hydro-backpressure-01',x=>((120*1e5)*Math.PI*(.08**2)/4-(x*1e5)*Math.PI*(.08**2-.04**2)/4)/1000],
 ['euler-buckling-01',x=>(Math.PI**2*210e9*(Math.PI*.02**4/64))/(x*x)/1000],
 ['accumulator-isothermal-01',x=>8*(100/x-100/200)],
 ['wheatstone-bridge-01',x=>1000*(5*x/(1000+x)-2.5)],
 ['torsion-angle-01',x=>((x*1.2)/(80e9*(Math.PI*.04**4/32)))*(180/Math.PI)],
 ['hydro-motor-torque-01',x=>((x*1e5)*(80/1e6)*.9)/(2*Math.PI)],
 ['rotation-energy-01',x=>(.5*12*(2*Math.PI*x/60)**2)/1000],
 ['center-mass-01',x=>(120*.4+x*2)/(120+x)],
 ['planetary-fixed-ring-01',x=>x*(24/96)],
 ['thermal-radiation-01',x=>.85*5.670374419e-8*.5*((x+273.15)**4-(20+273.15)**4)],
 ['three-phase-power-01',x=>(Math.sqrt(3)*400*x*.82)/1000],
 ['hydrostatic-column-01',x=>(850*9.81*x)/1e5],
 ['natural-frequency-01',x=>Math.sqrt(18000/x)/(2*Math.PI)],
 ['rectangular-tube-inertia-01',x=>(80*120**3-(80-2*x)*(120-2*x)**3)/(12*1e4)],
 ['bearing-l10-life-01',x=>(1e6*(24/6)**3)/(60*x)]
];
const near=(actual,expected,where)=>{
 assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),where+': valeur non finie');
 assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
  where+': '+actual+' différent de '+expected);
};
for(const [i,[id,reference]] of cases.entries()){
 test('audit '+(68+i)+' — '+id+' : calcul, SI, domaine, schéma et flash',()=>{
  const item=catalog.byId(id);
  assert.ok(item,'entrée catalogue absente');
  assert.equal(item.url,'missions/'+id+'.html');
  const html=fs.readFileSync(path.join(root,item.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);
  assert.match(html,/<html lang="fr"/);
  assert.equal((html.match(/<li>/g)||[]).length,3,'trois questions flash attendues');
  assert.equal(physics.criteria[id].unit,cfg.unit);
  assert.equal(physics.inputUnits[id],cfg.inputUnit);
  near(cfg.expected,reference(cfg.initial),id+' : nominal HTML');
  const values=[cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max];
  for(const x of values){
   const y=physics.calculate(id,x);
   near(y,reference(x),id+' à '+x+' '+cfg.inputUnit);
   const svg=diagrams.render(id,x,y);
   assert.match(svg,/<svg/);assert.match(svg,/<title/);assert.match(svg,/<desc/);
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
  }
  assert.throws(()=>physics.calculate(id,NaN),RangeError);
  assert.throws(()=>physics.calculate(id,Infinity),RangeError);
 });
}
test('audit 68–92 : 25 identifiants sans doublon et aucune mission ajoutée',()=>{
 assert.equal(cases.length,25);
 assert.equal(new Set(cases.map(x=>x[0])).size,25);
 assert.equal(catalog.levels.length,597);
});

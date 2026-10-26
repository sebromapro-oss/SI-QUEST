'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const physics=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
const ui=fs.readFileSync(path.join(__dirname,'../src/investigation-mission.js'),'utf8');
const cases=[
['motion-01',12,21.6,30],['accel-01',10,8,20],
['rotation-01',600,20*Math.PI,1200],['torque-01',150,60,300],
['pressure-01',15000,30,30000],['flow-01',30,36,90],
['power-01',1500,6*Math.PI,3000],['ohm-01',6,2,2],
['energy-01',3,720,8],['heat-01',25,23,80],
['stress-01',12000,100,24000],['strain-01',10000,0.5,20000],
['density-01',7.8,7800,12],['accuracy-01',50.12,0.12,51],
['frequency-01',1800,30,3600],['kinetic-01',12,86.4,20]
];
function mockPage(c){
 function el(tag=''){return {tag,style:{},attrs:{},events:{},children:[],classList:{toggle(){}},value:'',textContent:'',hidden:false,disabled:false,
  setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},
  append(...xs){this.children.push(...xs)},replaceChildren(...xs){this.children=xs},
  insertBefore(){},insertAdjacentElement(){},addEventListener(name,fn){this.events[name]=fn},
  querySelectorAll(){return []},querySelector(){return el()}}}
 const ids=['main','curve','point','graphic','trialLabel','trialValue','trial','solution','log','calc','answer','feedback','hint','hintText','solutionText','reset'];
 const nodes=Object.fromEntries(ids.map(id=>[id,el(id)]));
 const graph=el('graph'),model=el('model');graph.querySelectorAll=()=>[el('text'),el('text')];
 nodes.curve.closest=sel=>sel==='svg'?graph:model;
 nodes.main.querySelector=()=>el('section');
 nodes.trialValue.value=String(c.initial);
 const document={head:el('head'),getElementById:id=>nodes[id],createElement:tag=>el(tag),createElementNS:(ns,tag)=>el(tag),createTextNode:s=>({textContent:s})};
 const store={};const localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v},removeItem:k=>{delete store[k]}};
 const window={SI_MISSION:c,SIInvestigations:physics,SIInvestigationDiagrams:diagrams};
 new Function('window','document','localStorage','SIInvestigations','SIInvestigationDiagrams',ui)(window,document,localStorage,physics,diagrams);
 return {nodes,graph,model,store};
}
for(const [id,input,expected,rejected] of cases){
 test(id+' : résultat scientifique de référence',()=>assert.ok(Math.abs(physics.calculate(id,input)-expected)<1e-8));
 test(id+' : critère métier fictif distinct du calcul',()=>{
  assert.equal(physics.assess(id,input).acceptable,true);
  assert.equal(physics.assess(id,rejected).acceptable,false);
 });
 test(id+' : dessin technique accessible et calculable',()=>{
  const svg=diagrams.render(id,input,physics.calculate(id,input));
  assert.match(svg,/<svg /);assert.match(svg,/<title /);assert.match(svg,/<desc /);
  assert.doesNotMatch(svg,/NaN|undefined|Infinity/);
 });
 test(id+' : scripts intégrés et libellés français',()=>{
  const html=fs.readFileSync(path.join(__dirname,'../missions/'+id+'.html'),'utf8');
  assert.match(html,/lang="fr"/);
  assert.match(html,/src="\.\.\/src\/investigation-diagrams\.js"/);
  assert.match(html,/src="\.\.\/src\/investigation-mission\.js"/);
 });
 test(id+' : réponse non divulguée avant calcul',()=>{
  const html=fs.readFileSync(path.join(__dirname,'../missions/'+id+'.html'),'utf8');
  const match=html.match(/window\.SI_MISSION=(\{.*?\})<\/script>/);
  assert.ok(match,'configuration manquante');
  const c=JSON.parse(match[1]),p=mockPage(c);
  assert.equal(p.graph.style.display,'none');
  assert.match(p.nodes.graphic.textContent,/après le calcul/);
  assert.equal(p.nodes.trial.disabled,true);
  assert.equal(p.nodes.solution.disabled,true);
  p.nodes.answer.value=String(c.expected).replace('.',',');
  p.nodes.calc.events.submit({preventDefault(){}});
  assert.equal(p.graph.style.display,'block');
  assert.equal(p.nodes.trial.disabled,false);
  assert.match(p.nodes.graphic.textContent,/résultat/);
 });
}
test('trois essais et trois indices requis avant corrigé',()=>{
 const html=fs.readFileSync(path.join(__dirname,'../missions/pressure-01.html'),'utf8');
 const c=JSON.parse(html.match(/window\.SI_MISSION=(\{.*?\})<\/script>/)[1]);
 const p=mockPage(c),n=p.nodes;
 n.answer.value='-999';
 for(let i=0;i<3;i++)n.calc.events.submit({preventDefault(){}});
 assert.equal(n.solution.disabled,false);
 assert.match(n.hintText.textContent,/3\. /);
 assert.equal(n.hint.disabled,true);
 assert.equal(p.graph.style.display,'none');
 n.solution.events.click();
 assert.equal(p.graph.style.display,'block');
 assert.match(n.feedback.textContent,/calcul non validé/i);
});
test('paramètres physiquement interdits rejetés',()=>{
 for(const [id,x] of [['flow-01',0],['ohm-01',0],['density-01',0],['pressure-01',-1],['motion-01',NaN],['inconnue',3]]){
  assert.throws(()=>physics.calculate(id,x),RangeError);
 }
});

'use strict';
/** Recette DOM simulée des contrôleurs autonomes 003, 004, 006–009.
 * Les tests navigateur et lecteurs d'écran physiques restent nécessaires.
 */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const engines={
 slope:require('../src/slope.js'),
 electric:require('../src/electric.js'),
 rolling:require('../src/rolling.js'),
 spring:require('../src/spring.js'),
 lever:require('../src/lever.js'),
 cooling:require('../src/cooling.js')
};
class FakeElement{
 constructor(id){this.id=id;this.value='';this.textContent='';this.hidden=true;this.disabled=false;this.attrs={};this.listeners={};this.children=[];this.style={};}
 addEventListener(name,fn){this.listeners[name]=fn;}
 dispatch(name){assert.ok(this.listeners[name],this.id+': listener '+name+' absent');this.listeners[name]({preventDefault(){}});}
 setAttribute(name,value){this.attrs[name]=String(value);}
 removeAttribute(name){delete this.attrs[name];}
 replaceChildren(...items){this.children=items;}
 reset(){}
}
function harness(id){
 const els=new Map(),storage=new Map();
 const element=name=>{if(!els.has(name))els.set(name,new FakeElement(name));return els.get(name);};
 const ctx={
  document:{getElementById:element,createElement:name=>new FakeElement(name)},
  localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},
  SISlope:engines.slope,SIElectric:engines.electric,SIRolling:engines.rolling,
  SISpring:engines.spring,SILever:engines.lever,SICooling:engines.cooling
 };
 const code=fs.readFileSync(path.resolve(__dirname,'../src/'+id+'-mission.js'),'utf8');
 vm.runInNewContext(code,ctx,{filename:id+'-mission.js',timeout:1000});
 return {element,storage};
}
const cases=[
 ['slope',{parallel:'1',normal:'1',traction:'3000'},/Simulation :/],
 ['electric',{current:'1',drop:'1',power:'1',cable:'1'},/qualitative/],
 ['rolling',{normal:'1',resistance:'1',power:'1',traction:'200'},/qualitative/],
 ['spring',{force:'1',energy:'1',applied:'700'},/qualitative/],
 ['lever',{moment:'1',effort:'1',force:'400'},/qualitative/],
 ['cooling',{temperature:'1',duration:'1',time:'300'},/qualitative/]
];
for(const [id,fields,expectedText] of cases)test(id+' : essai après erreur, valeurs masquées et corrigé verrouillé',()=>{
 const h=harness(id);
 assert.equal(h.element('trial').disabled,true);
 h.element('trial').dispatch('click');
 assert.equal(h.element('motion').textContent,'','pas de simulation avant tentative');
 for(const [field,value] of Object.entries(fields))h.element(field).value=value;
 h.element('calc').dispatch('submit');
 assert.equal(h.element('trial').disabled,false,'essai qualitatif autorisé');
 assert.equal(h.element('solution').disabled,true,'corrigé non disponible');
 h.element('solution').dispatch('click');
 assert.equal(h.element('solutionText').textContent,'','corrigé non dévoilé par événement direct');
 h.element('trial').dispatch('click');
 assert.match(h.element('motion').textContent,expectedText);
 if(id==='electric')assert.doesNotMatch(h.element('motion').textContent,/I = 3|U charge = 9/);
 if(id==='rolling')assert.doesNotMatch(h.element('motion').textContent,/196[.,]2|981/);
 if(id==='spring')assert.doesNotMatch(h.element('motion').textContent,/700 N|30[.,]0 mm|12 J/);
 if(id==='lever')assert.doesNotMatch(h.element('motion').textContent,/480[.,]0|400[.,]0/);
 if(id==='cooling'){
  assert.equal(h.element('time').disabled,false);
  assert.doesNotMatch(h.element('motion').textContent,/45[.,]|[0-9]+[.,][0-9]+ °C/);
  h.element('time').dispatch('input');
  assert.match(h.element('motion').textContent,/masquée/);
 }
 h.element('reset').dispatch('click');
 assert.equal(h.element('trial').disabled,true,'réinitialisation du verrou');
});

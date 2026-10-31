'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const SIPhysics=require('../src/physics.js');
const SIHydraulics=require('../src/hydraulic-cylinder.js');
const SINumeric=require('../src/numeric.js');

class FakeElement {
  constructor(id){
    this.id=id;this.value='';this.textContent='';this.hidden=false;
    this.disabled=false;this.attrs={};this.children=[];this.listeners={};
  }
  addEventListener(name,callback){this.listeners[name]=callback;}
  dispatch(name){
    assert.ok(this.listeners[name],'listener absent: '+this.id+' '+name);
    this.listeners[name]({preventDefault(){}});
  }
  setAttribute(name,value){this.attrs[name]=String(value);}
  removeAttribute(name){delete this.attrs[name];}
  replaceChildren(...items){this.children=items;}
  reset(){}
}
function harness(script,{reducedMotion=true}={}){
  const elements=new Map(),storage=new Map(),frames=new Map();
  let nextFrame=0,time=0;
  const element=id=>{
    if(!elements.has(id))elements.set(id,new FakeElement(id));
    return elements.get(id);
  };
  const context={
    document:{getElementById:element,createElement:name=>new FakeElement(name)},
    window:{SIHydraulics,SINumeric,matchMedia:()=>({matches:reducedMotion})},
    SIPhysics,
    localStorage:{
      getItem:key=>storage.has(key)?storage.get(key):null,
      setItem:(key,value)=>storage.set(key,String(value))
    },
    requestAnimationFrame:callback=>{
      const id=++nextFrame;frames.set(id,callback);return id;
    },
    cancelAnimationFrame:id=>frames.delete(id)
  };
  element('pressure').value='80';
  element('flow').value='12';
  const code=fs.readFileSync(path.resolve(__dirname,'../src/'+script),'utf8');
  vm.runInNewContext(code,context,{filename:script,timeout:1000});
  function flush(){
    let iterations=0;
    while(frames.size){
      if(++iterations>500)throw new Error('Animation interminable');
      const [id,callback]=frames.entries().next().value;
      frames.delete(id);time+=50;callback(time);
    }
    return {iterations,elapsedMs:time};
  }
  return {element,storage,flush};
}
function fillHydro(h){
  for(const [key,value] of Object.entries({
    area:'19,63',pmin:'67,91',vout:'96,77',vin:'140,98'
  }))h.element(key).value=value;
}
test('Hydro: calculs avant essai, retraction trop rapide, puis réglage sûr',()=>{
  const h=harness('hydro-mission.js');
  assert.equal(h.element('trial').disabled,true);
  fillHydro(h);
  h.element('calculations').dispatch('submit');
  assert.equal(h.element('trial').disabled,false);
  h.element('settings').dispatch('submit');
  assert.match(h.element('trial-feedback').textContent,/REFUSÉE/);
  assert.match(h.element('trial-feedback').textContent,/rentrée excessive/);
  h.element('flow').value='10';
  h.element('settings').dispatch('submit');
  assert.match(h.element('trial-feedback').textContent,/Cycle autorisé/);
  assert.equal(JSON.parse(h.storage.get('siquest-hydro02')).trialPassed,true);
});
test('Hydro: les solutions ne sont visibles qu’après trois essais et trois indices',()=>{
  const h=harness('hydro-mission.js');
  assert.equal(h.element('solution').disabled,true);
  fillHydro(h);h.element('area').value='1';
  for(let i=0;i<3;i++)h.element('calculations').dispatch('submit');
  assert.equal(h.element('solution').disabled,true);
  for(let i=0;i<3;i++)h.element('hint').dispatch('click');
  assert.equal(h.element('solution').disabled,false);
  h.element('solution').dispatch('click');
  assert.equal(h.element('solution-text').hidden,false);
  assert.equal(h.element('trial').disabled,false);
  h.element('flow').value='10';h.element('settings').dispatch('submit');
  const state=JSON.parse(h.storage.get('siquest-hydro02'));
  assert.equal(state.calculationPassed,false);
  assert.equal(state.trialPassed,false);
});
test('Hydro: durée et mouvement synchronisés, puis retour à zéro',()=>{
  const h=harness('hydro-mission.js',{reducedMotion:false});
  fillHydro(h);h.element('calculations').dispatch('submit');
  h.element('flow').value='10';h.element('settings').dispatch('submit');
  assert.equal(h.element('stop').disabled,false);
  const info=h.flush();
  assert.ok(info.elapsedMs>5000&&info.elapsedMs<5600,JSON.stringify(info));
  assert.equal(h.element('moving').attrs.transform,'translate(0 0)');
  assert.equal(h.element('stop').disabled,true);
  assert.equal(JSON.parse(h.storage.get('siquest-hydro02')).trialPassed,true);
});
test('Hydro: arrêt manuel ne valide pas la mission',()=>{
  const h=harness('hydro-mission.js',{reducedMotion:false});
  fillHydro(h);h.element('calculations').dispatch('submit');
  h.element('flow').value='10';h.element('settings').dispatch('submit');
  h.element('stop').dispatch('click');
  assert.equal(JSON.parse(h.storage.get('siquest-hydro02')).trialPassed,false);
  assert.equal(h.flush().iterations,0);
});
test('Gear: ne révèle pas la réponse avant validation, rapport d’animation correct',()=>{
  const h=harness('gear-mission.js',{reducedMotion:false});
  assert.equal(h.element('trial').disabled,true);
  assert.doesNotMatch(h.element('readout').textContent,/400|81/);
  h.element('speed').value='-400';h.element('torque').value='81';
  h.element('task').dispatch('submit');
  assert.equal(h.element('trial').disabled,false);
  h.element('trial').dispatch('click');
  const info=h.flush();
  assert.ok(info.elapsedMs>=3000&&info.elapsedMs<3300);
  assert.match(h.element('rotor1').attrs.transform,/rotate\(720/);
  assert.match(h.element('rotor2').attrs.transform,/rotate\(-240/);
  assert.equal(JSON.parse(h.storage.get('siquest-gear01-v2')).trialPassed,true);
});
test('Gear: corrigé bloqué jusqu’à trois calculs faux et trois indices',()=>{
  const h=harness('gear-mission.js');
  h.element('speed').value='100';h.element('torque').value='5';
  for(let i=0;i<3;i++)h.element('task').dispatch('submit');
  for(let i=0;i<3;i++)h.element('hint').dispatch('click');
  assert.equal(h.element('solution').disabled,false);
  h.element('solution').dispatch('click');
  h.element('trial').dispatch('click');
  const state=JSON.parse(h.storage.get('siquest-gear01-v2'));
  assert.equal(state.solutionShown,true);
  assert.equal(state.trialPassed,false);
});

test('Hydro: un essai dangereux ultérieur ne conserve pas une décision sûre',()=>{
  const h=harness('hydro-mission.js');
  fillHydro(h);h.element('calculations').dispatch('submit');
  h.element('flow').value='10';h.element('settings').dispatch('submit');
  assert.match(h.element('decision').textContent,/compatibles/);
  h.element('flow').value='12';h.element('flow').dispatch('input');
  assert.match(h.element('decision').textContent,/Réglages modifiés/);
  h.element('settings').dispatch('submit');
  assert.match(h.element('decision').textContent,/refusée/);
  const state=JSON.parse(h.storage.get('siquest-hydro02'));
  assert.equal(state.lastTrialSafe,false);
  assert.equal(state.trialPassed,true); // réussite historique conservée, décision actuelle refusée
});
test('Hydro: interruption après un ancien succès invalide la décision courante',()=>{
  const h=harness('hydro-mission.js',{reducedMotion:false});
  fillHydro(h);h.element('calculations').dispatch('submit');
  h.element('flow').value='10';h.element('settings').dispatch('submit');
  h.flush();
  assert.match(h.element('decision').textContent,/compatibles/);
  h.element('settings').dispatch('submit');
  h.element('stop').dispatch('click');
  assert.match(h.element('decision').textContent,/interrompu/);
  assert.equal(JSON.parse(h.storage.get('siquest-hydro02')).lastTrialSafe,null);
});

test('Gear: exploration qualitative après calcul faux, sans divulgation de la réponse',()=>{
 const h=harness('gear-mission.js',{reducedMotion:false});
 assert.equal(h.element('trial').disabled,true,'aucun essai avant saisie valide');
 h.element('speed').value='100';h.element('torque').value='5';
 h.element('task').dispatch('submit');
 assert.equal(h.element('trial').disabled,false);
 assert.equal(h.element('solution').disabled,true);
 h.element('trial').dispatch('click');
 const animation=h.flush();
 assert.ok(animation.elapsedMs>=3000&&animation.elapsedMs<3300);
 assert.ok(h.element('rotor1').attrs.transform.startsWith('rotate(720'));
 assert.ok(h.element('rotor2').attrs.transform.startsWith('rotate(-240'));
 assert.match(h.element('feedback').textContent,/Exploration qualitative/);
 assert.doesNotMatch(h.element('feedback').textContent,/400|81/);
 assert.doesNotMatch(h.element('readout').textContent,/400|81/);
 const state=JSON.parse(h.storage.get('siquest-gear01-v2'));
 assert.equal(state.calculationPassed,false);
 assert.equal(state.solutionShown,false);
 assert.equal(state.trialPassed,false);
});

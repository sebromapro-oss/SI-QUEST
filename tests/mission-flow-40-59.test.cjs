'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const physics=require('../src/investigations.js'),diagrams=require('../src/investigation-diagrams.js'),spatial=require('../src/scene3d.js');
const controller=fs.readFileSync('src/investigation-mission.js','utf8');
const ids=['circular-02','angular-accel-01','brake-torque-01','incline-force-01','resultant-01','torsion-01','axial-strain-01','gear-mesh-01','belt-speed-01','hydro-power-01','hydro-volume-01','pneumatic-force-01','electric-power-02','joule-heat-01','rc-time-01','sampling-01','efficiency-chain-01','rolling-load-01','heat-transfer-01','measurement-relative-01','double-shear-pin-01','hydraulic-reynolds-01','composite-wall-01','combined-uncertainty-01','stability-overturn-angle-01'];
function harness(id,storage={}){
 const html=fs.readFileSync('missions/'+id+'.html','utf8'),cfg=JSON.parse(html.match(/window\.SI_MISSION=(\{[^<]+\})<\/script>/)[1]),elements={};
 const get=name=>elements[name]||(elements[name]=new El(name));
 class El{
  constructor(name=''){this.id=name;this.handlers={};this.attrs={};this.style={};this.children=[];this.disabled=false;this.hidden=false;this.value='';this.classList={toggle(){}};this.previousElementSibling=null;this._text='';this._html='';}
  set textContent(v){this._text=String(v)}get textContent(){return this._text}
  set innerHTML(v){this._html=String(v)}get innerHTML(){return this._html}
  setAttribute(k,v){this.attrs[k]=String(v)}removeAttribute(k){delete this.attrs[k]}
  append(...x){this.children.push(...x)}insertBefore(x){this.children.push(x)}
  insertAdjacentElement(position,x){this.children.push(x)}replaceChildren(...x){this.children=x}
  addEventListener(k,fn){this.handlers[k]=fn}
  fire(k){assert.ok(this.handlers[k],this.id+' missing event '+k);this.handlers[k]({preventDefault(){}})}
  querySelector(sel){if(sel==='button[type="submit"]')return get('submit');if(sel==='section')return new El('section');if(sel.startsWith('#'))return get(sel.slice(1));return new El(sel)}
  querySelectorAll(sel){return sel==='text'?[get('axis-y'),get('axis-x')]:[]}
  closest(sel){return sel==='section'?get('model'):get('graph')}
 }
 get('trialValue').value=cfg.initial;get('calc').previousElementSibling=get('answerInfo');
 const document={head:get('head'),hidden:false,getElementById:get,createElement:t=>new El(t),createElementNS:(ns,t)=>new El(t),createTextNode:t=>({textContent:t}),addEventListener(){}};
 const localStorage={getItem:k=>storage[k]??null,setItem:(k,v)=>storage[k]=v,removeItem:k=>delete storage[k]};
 const window={SI_MISSION:cfg,SIInvestigations:physics,SIInvestigationDiagrams:diagrams,SIScene3D:spatial};
 vm.runInNewContext(controller,{window,document,localStorage,SIInvestigations:physics,SIInvestigationDiagrams:diagrams,requestAnimationFrame:()=>1,cancelAnimationFrame:()=>{},console});
 return {get,cfg,storage,submit:value=>{get('answer').value=String(value);get('calc').fire('submit')}};
}
for(const id of ids){
 test(id+' : parcours complet erreur → aides → corrigé → réinitialisation → réussite',()=>{
  const h=harness(id),g=h.get;
  assert.equal(g('graph').style.display,'none');assert.equal(g('solution').disabled,true);
  h.submit('mauvaise saisie');assert.equal(g('solution').disabled,true);assert.equal(g('answer').disabled,false);
  for(let i=0;i<3;i++){h.submit('999999');assert.equal(g('solution').disabled,i<2)}
  assert.equal(g('answer').disabled,true);
  assert.equal(g('hint').disabled,true);
  assert.ok(g('hintText').textContent.includes('3. '));
  g('solution').fire('click');assert.equal(g('graph').style.display,'block');assert.equal(g('rewardStars').textContent,'☆☆☆');
  assert.equal(JSON.parse(h.storage['siquest:'+id+':v2.1']).mastered,false);
  g('reset').fire('click');assert.equal(g('graph').style.display,'none');assert.equal(g('solution').disabled,true);
  h.submit(h.cfg.expected);assert.equal(g('rewardStars').textContent,'★★★');assert.equal(g('submit').disabled,true);
  assert.equal(g('axis-y').textContent,h.cfg.unit==='sans unité'?'1':h.cfg.unit);assert.equal(g('axis-x').textContent,h.cfg.inputUnit==='sans unité'?'1':h.cfg.inputUnit);
  assert.equal(JSON.parse(h.storage['siquest:'+id+':v2.1']).stars,3);
  if(spatial.allowed.has(id)){assert.match(g('scene3-view').innerHTML,/<svg/);if(spatial.animated.has(id)){g('scene3-step').fire('click');assert.ok(g('scene3-info').textContent.includes('0.10 s'))}}
 });
 test(id+' : étoiles à la deuxième et troisième tentative',()=>{
  for(const [wrong,stars] of [[1,'★★☆'],[2,'★☆☆']]){
   const h=harness(id);for(let i=0;i<wrong;i++)h.submit('999999');
   h.submit(h.cfg.expected);assert.equal(h.get('rewardStars').textContent,stars);
  }
 });
}
test('indice progressif sans dévoilement et sans essai',()=>{
 const h=harness('axial-strain-01');for(let i=0;i<3;i++)h.get('hint').fire('click');
 assert.equal(h.get('hint').disabled,true);assert.equal(h.get('answer').disabled,false);
 assert.ok(!h.get('hintText').textContent.includes('0,000500'));
 h.submit('0,000500');assert.equal(h.get('rewardStars').textContent,'★★★');
});
test('persistance et reprise locale versionnée',()=>{
 const storage={};const a=harness('gear-mesh-01',storage);a.submit(90);
 const b=harness('gear-mesh-01',storage);assert.equal(b.get('rewardStars').textContent,'★★★');assert.equal(b.get('graph').style.display,'block');
 b.get('reset').fire('click');assert.equal(storage['siquest:gear-mesh-01:v2.1'],undefined);
});

const newIds=['double-shear-pin-01','hydraulic-reynolds-01','composite-wall-01','combined-uncertainty-01','stability-overturn-angle-01'];
for(const id of newIds)test(id+' : sauvegarde, reprise et investigation au seuil',()=>{
 const storage={},a=harness(id,storage);a.submit(a.cfg.expected);
 assert.equal(JSON.parse(storage['siquest:'+id+':v2.1']).mastered,true);
 const b=harness(id,storage);assert.equal(b.get('graph').style.display,'block');
 assert.equal(b.get('rewardStars').textContent,'★★★');
 b.get('trialValue').value=String(b.cfg.max);b.get('trialValue').fire('input');b.get('trial').fire('click');
 const log=JSON.parse(storage['siquest:'+id+':v2.1']).log;
 assert.ok(log.some(x=>x.includes('Essai :')),id+' essai non sauvegardé');
 b.get('reset').fire('click');assert.equal(storage['siquest:'+id+':v2.1'],undefined);
});

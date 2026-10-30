'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {physics:M,diagrams:D}=require('../src/batch413-417.js');
const num=(s,key)=>{const m=s.match(new RegExp('\\b'+key+'="([^"]+)"'));assert.ok(m,'attribut manquant : '+key);return Number(m[1]);};
test('393 : charge RC avec générateur, résistance série et condensateur non court-circuité',()=>{
  for(const t of [.5,5,10]){
    const energy=M.calculate('rc-charge-stored-energy-01',t);
    const svg=D.render('rc-charge-stored-energy-01',t,energy);
    assert.match(svg,/data-rc-topology="series"/);
    assert.match(svg,/<circle cx="95" cy="190" r="25"/);
    assert.match(svg,/<rect x="175" y="128" width="110" height="34"/);
    assert.match(svg,/x1="370" y1="183" x2="440" y2="183"/);
    assert.match(svg,/x1="370" y1="208" x2="440" y2="208"/);
    assert.doesNotMatch(svg,/x1="405" y1="183" x2="405" y2="208"/);
    const u=24*(1-Math.exp(-t/2.2));
    assert.ok(Math.abs(num(svg,'data-capacitor-voltage-v')-u)<1e-7);
    assert.ok(energy>=0);
  }
});
test('401 : couches de paroi représentées à la même échelle de 1 px/mm',()=>{
  for(const e of [20,60,100]){
    const t=M.calculate('composite-wall-interface-temperature-01',e);
    const svg=D.render('composite-wall-interface-temperature-01',e,t);
    assert.equal(num(svg,'data-layer1-px'),40);
    assert.equal(num(svg,'data-layer2-px'),e);
    assert.match(svg,/<rect x="220" y="100" width="40" height="142"/);
    assert.ok(Math.abs(num(svg,'data-layer1-px')/num(svg,'data-layer2-px')-40/e)<1e-10);
  }
});
test('415 : Bredt, dimensions de fibre moyenne et épaisseur à échelle commune',()=>{
  for(const tau of [15,35,60]){
    const torque=M.calculate('bredt-closed-tube-torque-limit-01',tau);
    const svg=D.render('bredt-closed-tube-torque-limit-01',tau,torque);
    assert.equal(num(svg,'data-mean-width-px'),240);
    assert.equal(num(svg,'data-mean-height-px'),160);
    assert.equal(num(svg,'data-wall-thickness-px'),6);
    assert.match(svg,/<rect x="172" y="107" width="246" height="166"/);
    assert.match(svg,/<rect x="178" y="113" width="234" height="154"/);
    assert.ok(Math.abs(240/160-.120/.080)<1e-10);
    assert.ok(Math.abs(torque-2*.120*.080*.003*tau*1e6)<1e-8);
  }
});

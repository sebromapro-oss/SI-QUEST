const test=require('node:test');const assert=require('node:assert/strict');const {solve}=require('../src/slope.js');
test('horizontal: zero downslope',()=>{const x=solve({massKg:1000,slopeDeg:0,muStatic:0.4,tractionN:0});assert.equal(x.downslopeN,0);assert.equal(x.normalN,9810);assert.equal(x.holds,true)});
test('30 degree independent reference',()=>{const x=solve({massKg:1000,slopeDeg:30,muStatic:0.4,tractionN:3000});assert.ok(Math.abs(x.downslopeN-4905)<1e-8);assert.ok(Math.abs(x.normalN-8495.7092)<0.001);assert.equal(x.holds,true);assert.equal(x.climbs,false)});
test('insufficient friction rolls backwards',()=>{const x=solve({massKg:1000,slopeDeg:30,muStatic:0.1,tractionN:0});assert.equal(x.holds,false)});
test('mass proportionality',()=>{const a=solve({massKg:100,slopeDeg:12,muStatic:0.3,tractionN:0});const b=solve({massKg:200,slopeDeg:12,muStatic:0.3,tractionN:0});assert.ok(Math.abs(b.downslopeN-2*a.downslopeN)<1e-9)});
test('invalid inputs rejected',()=>{for(const slopeDeg of [-1,90,NaN])assert.throws(()=>solve({massKg:100,slopeDeg,muStatic:0.3,tractionN:0}));assert.throws(()=>solve({massKg:0,slopeDeg:5,muStatic:0.3,tractionN:0}))});

test('excess uphill traction cannot be balanced by static friction',()=>{const x=solve({massKg:1000,slopeDeg:30,muStatic:0.1,tractionN:9000});assert.equal(x.holds,false);assert.equal(x.climbs,true)});

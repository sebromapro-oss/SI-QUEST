const test=require('node:test'),assert=require('node:assert/strict'),{solve}=require('../src/cooling.js');const b={initialC:90,ambientC:20,timeConstantS:300,timeS:300,limitC:45};const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,a+' != '+b);test('one time constant reference',()=>{const r=solve(b);near(r.temperatureC,20+70/Math.E);near(r.timeToLimitS,300*Math.log(70/25));assert.equal(r.belowLimit,false)});test('initial temperature',()=>near(solve({...b,timeS:0}).temperatureC,90));test('asymptotic cooling',()=>{const r=solve({...b,timeS:3000});assert.ok(r.temperatureC>20&&r.temperatureC<20.01);assert.equal(r.belowLimit,true)});test('limit reached at analytic time',()=>{const t=300*Math.log(70/25);near(solve({...b,timeS:t}).temperatureC,45)});test('ambient limit never reached in finite time',()=>assert.equal(solve({...b,limitC:20}).timeToLimitS,Infinity));test('invalid inputs',()=>{for(const p of [{timeConstantS:0},{timeS:-1},{initialC:10},{limitC:100},{ambientC:NaN}])assert.throws(()=>solve({...b,...p}))});
test('already at ambient threshold requires zero waiting time',()=>{
 const r=solve({...b,initialC:20,limitC:20,timeS:0});
 near(r.timeToLimitS,0);near(r.temperatureC,20);assert.equal(r.belowLimit,true);
});
test('ambient asymptote never qualifies at finite time when initially hotter',()=>{
 const r=solve({...b,limitC:20,timeS:100000});
 assert.equal(r.timeToLimitS,Infinity);assert.equal(r.belowLimit,false);
});
test('threshold classification uses analytic crossing, not floating point equality',()=>{
 const t=300*Math.log(70/25);
 assert.equal(solve({...b,timeS:t-1e-6}).belowLimit,false);
 assert.equal(solve({...b,timeS:t}).belowLimit,true);
});

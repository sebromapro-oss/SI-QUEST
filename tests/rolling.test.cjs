const test=require('node:test'),assert=require('node:assert/strict'),{solve}=require('../src/rolling.js');
const base={massKg:1000,rollingCoefficient:.02,slopeDeg:0,speedMps:5,driveForceN:200};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,a+' != '+b);
test('level ground independent reference',()=>{const r=solve(base);near(r.normalN,9810);near(r.rollingForceN,196.2);near(r.requiredPowerW,981);near(r.accelerationMps2,.0038);assert.equal(r.canMaintainSpeed,true)});
test('zero rolling coefficient level ground',()=>{const r=solve({...base,rollingCoefficient:0,driveForceN:0});near(r.requiredForceN,0);near(r.accelerationMps2,0)});
test('slope gravitational component',()=>{const r=solve({...base,slopeDeg:30,rollingCoefficient:0,driveForceN:0});near(r.gravityForceN,4905);near(r.accelerationMps2,-4.905)});
test('insufficient traction is negative acceleration',()=>{const r=solve({...base,driveForceN:100});assert.equal(r.canMaintainSpeed,false);assert.ok(r.accelerationMps2<0)});
test('reject invalid and nonfinite',()=>{for(const p of [{massKg:0},{rollingCoefficient:-1},{slopeDeg:90},{speedMps:-1},{driveForceN:Infinity}])assert.throws(()=>solve({...base,...p}))});

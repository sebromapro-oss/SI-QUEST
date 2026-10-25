'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {cylinder,minimumPressureBar,evaluate}=require('../src/hydraulic-cylinder.js');
const input={boreMm:50,rodMm:28,strokeMm:250,pressureBar:80,flowLpm:12,
  mechanicalEfficiency:0.9,volumetricEfficiency:0.95};
const limits={loadN:12000,reserveFraction:0.1,maxPressureBar:110,maxSpeedMps:0.12};
const close=(actual,expected,rel=1e-10)=>assert.ok(
  Math.abs(actual-expected)<=rel*Math.max(1,Math.abs(expected)),
  'expected '+actual+' ≈ '+expected);
test('geometries: piston and annulus area in SI',()=>{
  const x=cylinder(input);
  close(x.pistonAreaM2,Math.PI*0.05**2/4);
  close(x.annularAreaM2,Math.PI*(0.05**2-0.028**2)/4);
  assert.ok(x.annularAreaM2<x.pistonAreaM2);
});
test('nominal independent benchmark and pressure threshold',()=>{
  const x=cylinder(input);
  close(x.extensionForceN,14137.166941154072,1e-8);
  close(x.extensionSpeedMps,0.09676620539987236,1e-8);
  close(x.retractionSpeedMps,0.1409764064683455,1e-8);
  close(minimumPressureBar(limitsWithBore()),67.906109052542,1e-8);
});
function limitsWithBore(){return {loadN:12000,boreMm:50,mechanicalEfficiency:0.9};}
test('force and hydraulic power are proportional to pressure',()=>{
  const a=cylinder(input),b=cylinder({...input,pressureBar:160});
  close(b.extensionForceN,2*a.extensionForceN);
  close(b.retractionForceN,2*a.retractionForceN);
  close(b.hydraulicPowerW,2*a.hydraulicPowerW);
  close(b.extensionSpeedMps,a.extensionSpeedMps);
});
test('doubling flow halves stroke time, speeds double',()=>{
  const a=cylinder(input),b=cylinder({...input,flowLpm:24});
  close(b.extensionSpeedMps,2*a.extensionSpeedMps);
  close(b.retractionSpeedMps,2*a.retractionSpeedMps);
  close(b.extensionTimeS,a.extensionTimeS/2);
});
test('energy and volume dimensional invariants',()=>{
  const x=cylinder(input);
  close(x.extensionForceN*x.extensionSpeedMps,
    x.hydraulicPowerW*input.mechanicalEfficiency*input.volumetricEfficiency);
  close(x.extensionTimeS*x.usefulFlowM3s,x.strokeM*x.pistonAreaM2);
  close(x.retractionTimeS*x.usefulFlowM3s,x.strokeM*x.annularAreaM2);
});
test('no flow produces zero speed and null travel time',()=>{
  const x=cylinder({...input,flowLpm:0});
  close(x.extensionSpeedMps,0);close(x.retractionSpeedMps,0);
  assert.equal(x.extensionTimeS,null);assert.equal(x.retractionTimeS,null);
});
test('nominal flow unsafe on retraction; reduced flow and pressure safe',()=>{
  const a=evaluate(input,limits);
  assert.equal(a.safe,false);
  assert.ok(a.issues.some(s=>s.includes('rentrée')));
  const b=evaluate({...input,flowLpm:10},limits);
  assert.equal(b.safe,true);assert.equal(b.canExtend,true);
});
test('low pressure, overpressure and high flow are independently rejected',()=>{
  assert.equal(evaluate({...input,pressureBar:65,flowLpm:10},limits).safe,false);
  assert.equal(evaluate({...input,pressureBar:120,flowLpm:10},limits).safe,false);
  assert.equal(evaluate({...input,flowLpm:18},limits).safe,false);
});
test('invalid geometry, efficiency and nonfinite inputs rejected',()=>{
  for(const bad of [
    {rodMm:50},{boreMm:0},{strokeMm:-1},{pressureBar:Infinity},
    {flowLpm:NaN},{mechanicalEfficiency:1.1},{volumetricEfficiency:0}
  ])assert.throws(()=>cylinder({...input,...bad}),RangeError);
  assert.throws(()=>minimumPressureBar({loadN:0,boreMm:50,mechanicalEfficiency:.9}),RangeError);
});

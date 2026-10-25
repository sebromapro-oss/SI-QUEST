'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {parseDecimal,closeTo}=require('../src/numeric.js');
test('French and international decimals accepted',()=>{
  assert.equal(parseDecimal(' 19,63 '),19.63);
  assert.equal(parseDecimal('−400'),-400);
  assert.equal(parseDecimal('1.2e2'),120);
  assert.equal(parseDecimal('0'),0);
});
test('invalid, nonfinite and grouped input rejected, never coerced to zero',()=>{
  for(const s of ['','  ','1 000','12,3.4','NaN','Infinity','1/2','abc'])assert.equal(parseDecimal(s),null);
});
test('absolute tolerances include the boundaries',()=>{
  assert.equal(closeTo(19.7,19.635,.1),true);
  assert.equal(closeTo(19.8,19.635,.1),false);
  assert.equal(closeTo(NaN,1,.1),false);
});

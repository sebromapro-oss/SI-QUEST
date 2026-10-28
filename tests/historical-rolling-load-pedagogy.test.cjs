'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {calculate}=require('../src/investigations.js');
test('roulement : réactivation, distinction adhérence et calcul de référence',()=>{
const h=fs.readFileSync('missions/rolling-load-01.html','utf8');
assert.match(h,/Objectif :/);assert.match(h,/Prérequis :/);assert.match(h,/Questions flash/);assert.equal((h.match(/<li>/g)||[]).length,3);
assert.match(h,/250 N/);assert.match(h,/adhérence/);assert.equal(calculate('rolling-load-01',.025),200);
assert.equal(calculate('rolling-load-01',0),0);assert.equal(calculate('rolling-load-01',.05),400);
});

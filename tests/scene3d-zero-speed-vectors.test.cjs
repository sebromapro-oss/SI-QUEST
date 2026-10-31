'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const scene=require('../src/scene3d.js');
test('circular scene suppresses motion arrows at zero speed',()=>{
 const zero=scene.render('circular-02',0,0,0,{time:0});
 const moving=scene.render('circular-02',0,0,2,{time:0});
 const arrows=svg=>(svg.match(/marker-end="url\(#sq-arrow\)"/g)||[]).length;
 assert.equal(scene.describe('circular-02',0).acceleration,0);
 assert.equal(arrows(zero),0);
 assert.equal(arrows(moving),2);
});

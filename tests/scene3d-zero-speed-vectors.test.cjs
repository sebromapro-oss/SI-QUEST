'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const scene=require('../src/scene3d.js');
test('circular scene suppresses motion arrows at zero speed',()=>{
 const zero=scene.render('circular-02',0,0,0,{time:0});
 const moving=scene.render('circular-02',0,0,2,{time:0});
 const arrows=svg=>(svg.match(/marker-end="url\(#sq-arrow-[a-f0-9]{6}\)"/g)||[]).length;
 assert.equal(scene.describe('circular-02',0).acceleration,0);
 assert.equal(arrows(zero),0);
 assert.equal(arrows(moving),2);
});

test('3D arrowhead colors match the vector strokes',()=>{
 const svg=scene.render('rolling-load-01',0,0,0.1);
 const vectors=[...svg.matchAll(/<path[^>]*stroke="(#[a-f0-9]{6})"[^>]*marker-end="url\(#sq-arrow-([a-f0-9]{6})\)"/g)];
 assert.ok(vectors.length>=3);
 for(const match of vectors)assert.equal(match[1].slice(1),match[2]);
});

test('3D coordinate axes remain visible and rotate with the camera',()=>{
 const a=scene.render('circular-02',0,0,2,{zoom:2});
 const b=scene.render('circular-02',.7,.4,2,{zoom:2});
 const extract=svg=>svg.split('<g aria-hidden="true" class="scene3-axes">')[1]?.split('</g>')[0];
 for(const svg of [a,b]){
  const axes=extract(svg);
  assert.ok(axes,'coordinate triad missing');
  for(const label of ['x','y','z'])assert.ok(axes.includes('>'+label+'</text>'),'missing axis '+label);
  for(const m of axes.matchAll(/(?:cx|cy|x|y)="(-?[0-9]+(?:[.][0-9]+)?)"/g))
   assert.ok(Number(m[1])>=0&&Number(m[1])<=300,'axis outside the viewport');
 }
 assert.notEqual(extract(a),extract(b));
});

test('belt marker stays finite for extreme finite phases',()=>{
 for(const phase of [Number.MAX_VALUE,-Number.MAX_VALUE,1e200,-1e200]){
  const position=scene.beltMarkerPosition(phase);
  assert.equal(position.length,3);
  assert.ok(position.every(Number.isFinite),'invalid belt position for '+phase);
 }
 assert.throws(()=>scene.beltMarkerPosition(Infinity),RangeError);
});

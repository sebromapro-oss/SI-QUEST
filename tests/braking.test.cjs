const test=require('node:test');
const assert=require('node:assert/strict');
const {solve,stateAt}=require('../src/braking.js');
const base={speedKmh:18,reactionS:1.2,decelerationMps2:2.5,obstacleM:12};
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-9,actual+' != '+expected);
test('independent 18 km/h stopping reference',()=>{
 const r=solve(base);
 near(r.speedMps,5);near(r.reactionDistanceM,6);near(r.brakingDistanceM,5);
 near(r.stoppingDistanceM,11);near(r.stoppingTimeS,3.2);near(r.marginM,1);
 assert.equal(r.stopsBeforeObstacle,true);
});
test('obstacle nearer than 11 metres fails independently of student calculation',()=>{
 const r=solve({...base,obstacleM:10.9});assert.equal(r.stopsBeforeObstacle,false);near(r.marginM,-.1);
});
test('reaction, braking and stop positions are continuous',()=>{
 const r=solve(base);
 near(stateAt(r,base,0).distanceM,0);
 near(stateAt(r,base,1.2).distanceM,6);
 near(stateAt(r,base,2.2).distanceM,9.75);
 near(stateAt(r,base,3.2).distanceM,11);
 near(stateAt(r,base,10).distanceM,11);
 near(stateAt(r,base,2.2).speedMps,2.5);
 near(stateAt(r,base,3.2).speedMps,0);
});
test('distance nondecreasing, speed nonincreasing, no overshoot',()=>{
 const r=solve(base);let prevX=-1,prevV=Infinity;
 for(let i=0;i<=80;i++){
 const s=stateAt(r,base,i*.05);
 assert.ok(s.distanceM>=prevX-1e-9);assert.ok(s.speedMps<=prevV+1e-9);
 assert.ok(s.distanceM<=r.stoppingDistanceM+1e-9);assert.ok(s.speedMps>=0);
 prevX=s.distanceM;prevV=s.speedMps;
 }
});
test('zero speed and zero reaction time remain well-defined',()=>{
 const r=solve({speedKmh:0,reactionS:0,decelerationMps2:1,obstacleM:0});
 near(r.stoppingDistanceM,0);assert.equal(r.stopsBeforeObstacle,true);
 near(stateAt(r,{speedKmh:0,reactionS:0,decelerationMps2:1},2).distanceM,0);
});
test('invalid parameters and animation times rejected',()=>{
 for(const p of [{speedKmh:-1},{reactionS:-1},{decelerationMps2:0},{obstacleM:-1},{speedKmh:NaN},{reactionS:Infinity}])
 assert.throws(()=>solve({...base,...p}),RangeError);
 assert.throws(()=>stateAt(solve(base),base,-.1),RangeError);
});

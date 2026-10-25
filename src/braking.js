(function(root){
'use strict';
function solve({speedKmh,reactionS,decelerationMps2,obstacleM}){
 const args={speedKmh,reactionS,decelerationMps2,obstacleM};
 for(const [name,value] of Object.entries(args))if(typeof value!=='number'||!Number.isFinite(value))throw new RangeError(name+' must be finite');
 if(speedKmh<0||reactionS<0||decelerationMps2<=0||obstacleM<0)throw new RangeError('Physical domain');
 const speedMps=speedKmh/3.6;
 const reactionDistanceM=speedMps*reactionS;
 const brakingTimeS=speedMps/decelerationMps2;
 const brakingDistanceM=speedMps*speedMps/(2*decelerationMps2);
 const stoppingDistanceM=reactionDistanceM+brakingDistanceM;
 const stoppingTimeS=reactionS+brakingTimeS;
 const marginM=obstacleM-stoppingDistanceM;
 return {speedMps,reactionDistanceM,brakingTimeS,brakingDistanceM,stoppingDistanceM,stoppingTimeS,marginM,stopsBeforeObstacle:marginM>=0};
}
function stateAt(result,{speedKmh,reactionS,decelerationMps2},timeS){
 if(!Number.isFinite(timeS)||timeS<0)throw new RangeError('timeS');
 const v0=speedKmh/3.6;
 if(timeS<=reactionS)return {timeS,distanceM:v0*timeS,speedMps:v0,phase:'reaction'};
 if(timeS>=result.stoppingTimeS)return {timeS:result.stoppingTimeS,distanceM:result.stoppingDistanceM,speedMps:0,phase:'stopped'};
 const dt=timeS-reactionS;
 return {timeS,distanceM:result.reactionDistanceM+v0*dt-.5*decelerationMps2*dt*dt,speedMps:v0-decelerationMps2*dt,phase:'braking'};
}
const api=Object.freeze({solve,stateAt});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.SIBraking=api;
})(typeof window==='undefined'?globalThis:window);

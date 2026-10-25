(function(root){'use strict';
function solve({massKg,rollingCoefficient,slopeDeg,speedMps,driveForceN}){
 const a={massKg,rollingCoefficient,slopeDeg,speedMps,driveForceN};
 for(const [k,v] of Object.entries(a))if(typeof v!=='number'||!Number.isFinite(v))throw new RangeError(k);
 if(massKg<=0||rollingCoefficient<0||slopeDeg<0||slopeDeg>=90||speedMps<0||driveForceN<0)throw new RangeError('Domaine physique');
 const g=9.81,rad=slopeDeg*Math.PI/180,normalN=massKg*g*Math.cos(rad);
 const rollingForceN=rollingCoefficient*normalN,gravityForceN=massKg*g*Math.sin(rad);
 const requiredForceN=rollingForceN+gravityForceN,netForceN=driveForceN-requiredForceN;
 const accelerationMps2=netForceN/massKg,requiredPowerW=requiredForceN*speedMps;
 return {normalN,rollingForceN,gravityForceN,requiredForceN,netForceN,accelerationMps2,requiredPowerW,canMaintainSpeed:driveForceN>=requiredForceN};
}
const api=Object.freeze({solve});if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SIRolling=api;
})(typeof window==='undefined'?globalThis:window);

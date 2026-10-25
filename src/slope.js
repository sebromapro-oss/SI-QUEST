(function(root){'use strict';
function solve({massKg,slopeDeg,muStatic,tractionN}) {
 for(const [k,v] of Object.entries({massKg,slopeDeg,muStatic,tractionN})) if(typeof v!=='number'||!Number.isFinite(v)) throw new RangeError(k);
 if(massKg<=0||slopeDeg<0||slopeDeg>=90||muStatic<0||tractionN<0) throw new RangeError('Paramètres hors domaine');
 const g=9.81,rad=slopeDeg*Math.PI/180,weightN=massKg*g;
 const normalN=weightN*Math.cos(rad),downslopeN=weightN*Math.sin(rad);
 const maxStaticFrictionN=muStatic*normalN;
 const requiredTractionN=downslopeN;
 const marginN=tractionN-requiredTractionN;
 const holds=Math.abs(tractionN-downslopeN)<=maxStaticFrictionN;
 const climbs=tractionN>downslopeN+maxStaticFrictionN;
 return {weightN,normalN,downslopeN,maxStaticFrictionN,requiredTractionN,marginN,holds,climbs};
}
const api=Object.freeze({solve});if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SISlope=api;
})(typeof window==='undefined'?globalThis:window);

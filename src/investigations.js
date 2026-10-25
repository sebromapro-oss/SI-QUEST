(function(root){
'use strict';
const models=Object.freeze({
'motion-01':x=>1.8*x,
'accel-01':x=>0.8*x,
'rotation-01':x=>2*Math.PI*x/60,
'torque-01':x=>0.4*x,
'pressure-01':x=>x/0.005/100000,
'flow-01':x=>60*18/x,
'power-01':x=>120*2*Math.PI*x/60/1000,
'ohm-01':x=>12/x,
'energy-01':x=>240*x,
'heat-01':x=>2*460*x/1000,
'stress-01':x=>x/120,
'strain-01':x=>x*1000/(200000*100),
'density-01':x=>x/0.001,
'accuracy-01':x=>Math.abs(x-50),
'frequency-01':x=>x/60,
'kinetic-01':x=>0.5*1200*x*x/1000
});
const criteria=Object.freeze({
'motion-01':{min:0,max:35,unit:'m'},
'accel-01':{min:0,max:12,unit:'m/s'},
'rotation-01':{min:0,max:80,unit:'rad/s'},
'torque-01':{min:0,max:80,unit:'N·m'},
'pressure-01':{min:0,max:40,unit:'bar'},
'flow-01':{min:20,max:Infinity,unit:'L/min'},
'power-01':{min:0,max:25,unit:'kW'},
'ohm-01':{min:0,max:4,unit:'A'},
'energy-01':{min:0,max:1000,unit:'Wh'},
'heat-01':{min:0,max:30,unit:'kJ'},
'stress-01':{min:0,max:140,unit:'MPa'},
'strain-01':{min:0,max:0.8,unit:'mm'},
'density-01':{min:7500,max:8000,unit:'kg/m³'},
'accuracy-01':{min:0,max:0.2,unit:'mm'},
'frequency-01':{min:0,max:40,unit:'Hz'},
'kinetic-01':{min:0,max:120,unit:'kJ'}
});
function calculate(id,x){
 if(!Object.prototype.hasOwnProperty.call(models,id)||!Number.isFinite(x))throw new RangeError('Paramètre invalide');
 if(x<0||((id==='flow-01'||id==='ohm-01'||id==='density-01')&&x===0))throw new RangeError('Paramètre hors domaine physique');
 const value=models[id](x);
 if(!Number.isFinite(value))throw new RangeError('Résultat invalide');
 return value;
}
function assess(id,x){
 const value=calculate(id,x),criterion=criteria[id];
 return Object.freeze({value,acceptable:value>=criterion.min-1e-9&&value<=criterion.max+1e-9,
  min:criterion.min,max:criterion.max,unit:criterion.unit});
}
const api=Object.freeze({calculate,assess,criteria});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.SIInvestigations=api;
})(typeof window==='undefined'?globalThis:window);

/* SI QUEST — Cycle 02. SI units in calculations, input dimensions explicit. */
(function(root){
  'use strict';
  function positive(value,name,allowZero=false){
    if(typeof value!=='number'||!Number.isFinite(value)||(allowZero?value<0:value<=0)){
      throw new RangeError(name+' doit être un nombre '+(allowZero?'positif ou nul':'strictement positif')+'.');
    }
  }
  function cylinder(input){
    const {boreMm,rodMm,strokeMm,pressureBar,flowLpm,mechanicalEfficiency,volumetricEfficiency}=input;
    positive(boreMm,'boreMm');positive(rodMm,'rodMm');positive(strokeMm,'strokeMm');
    positive(pressureBar,'pressureBar',true);positive(flowLpm,'flowLpm',true);
    positive(mechanicalEfficiency,'mechanicalEfficiency');
    positive(volumetricEfficiency,'volumetricEfficiency');
    if(rodMm>=boreMm)throw new RangeError('La tige doit être plus petite que le piston.');
    if(mechanicalEfficiency>1||volumetricEfficiency>1)throw new RangeError('Un rendement ne peut pas dépasser 1.');
    const boreM=boreMm/1000,rodM=rodMm/1000,strokeM=strokeMm/1000;
    const pistonAreaM2=Math.PI*boreM*boreM/4;
    const annularAreaM2=Math.PI*(boreM*boreM-rodM*rodM)/4;
    const pressurePa=pressureBar*100000;
    const pumpFlowM3s=flowLpm/60000;
    const usefulFlowM3s=pumpFlowM3s*volumetricEfficiency;
    const extensionForceN=pressurePa*pistonAreaM2*mechanicalEfficiency;
    const retractionForceN=pressurePa*annularAreaM2*mechanicalEfficiency;
    const extensionSpeedMps=usefulFlowM3s/pistonAreaM2;
    const retractionSpeedMps=usefulFlowM3s/annularAreaM2;
    const extensionTimeS=extensionSpeedMps>0?strokeM/extensionSpeedMps:null;
    const retractionTimeS=retractionSpeedMps>0?strokeM/retractionSpeedMps:null;
    const hydraulicPowerW=pressurePa*pumpFlowM3s;
    return {pistonAreaM2,annularAreaM2,pressurePa,pumpFlowM3s,usefulFlowM3s,strokeM,
      extensionForceN,retractionForceN,extensionSpeedMps,retractionSpeedMps,
      extensionTimeS,retractionTimeS,hydraulicPowerW,
      usefulExtensionPowerW:extensionForceN*extensionSpeedMps};
  }
  function minimumPressureBar({loadN,boreMm,mechanicalEfficiency}){
    positive(loadN,'loadN');positive(boreMm,'boreMm');positive(mechanicalEfficiency,'mechanicalEfficiency');
    if(mechanicalEfficiency>1)throw new RangeError('Rendement impossible');
    return loadN/(mechanicalEfficiency*Math.PI*(boreMm/1000)**2/4)/100000;
  }
  function evaluate(input,limits){
    const {loadN,reserveFraction,maxPressureBar,maxSpeedMps}=limits;
    positive(loadN,'loadN');positive(maxPressureBar,'maxPressureBar');positive(maxSpeedMps,'maxSpeedMps');
    positive(reserveFraction,'reserveFraction',true);
    if(reserveFraction>1)throw new RangeError('Réserve supérieure à 100 % non prévue.');
    const result=cylinder(input);
    const issues=[];
    if(input.flowLpm===0)issues.push('Débit nul : aucune translation.');
    if(input.pressureBar>maxPressureBar+1e-9)issues.push('Pression supérieure à la limite constructeur.');
    if(result.extensionForceN+1e-9<loadN*(1+reserveFraction))issues.push('Réserve d’effort insuffisante en sortie de tige.');
    if(result.extensionSpeedMps>maxSpeedMps+1e-12)issues.push('Vitesse de sortie excessive.');
    if(result.retractionSpeedMps>maxSpeedMps+1e-12)issues.push('Vitesse de rentrée excessive.');
    return {...result,minimumPressureBar:minimumPressureBar({
      loadN,boreMm:input.boreMm,mechanicalEfficiency:input.mechanicalEfficiency
    }),issues,safe:issues.length===0,
      canExtend:input.flowLpm>0&&result.extensionForceN>=loadN};
  }
  const api=Object.freeze({cylinder,minimumPressureBar,evaluate});
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.SIHydraulics=api;
})(typeof window==='undefined'?globalThis:window);

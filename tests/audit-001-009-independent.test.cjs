'use strict';
/** SI QUEST V2.5 — audit indépendant des neuf missions historiques autonomes.
 * Contrôles numériques multi-points et réactivation mémoire ; ne remplace pas
 * une recette graphique sur navigateur ou avec un lecteur d'écran physique.
 */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const catalog=require('../src/catalog.js');
const gear=require('../src/physics.js').gear;
const hydro=require('../src/hydraulic-cylinder.js');
const slope=require('../src/slope.js').solve;
const electric=require('../src/electric.js').circuit;
const braking=require('../src/braking.js');
const rolling=require('../src/rolling.js').solve;
const spring=require('../src/spring.js').solve;
const lever=require('../src/lever.js').solve;
const cooling=require('../src/cooling.js').solve;
const ids=['gear-01','hydro-01','slope-01','electric-01','braking-01','rolling-01','spring-01','lever-01','cooling-01'];
const near=(actual,expected,label)=>assert.ok(Number.isFinite(actual)&&Number.isFinite(expected)&&Math.abs(actual-expected)<=1e-9*Math.max(1,Math.abs(expected)),label+': '+actual+' ≠ '+expected);
test('missions 1–9 : catalogue, accessibilité de base et trois questions flash par mission',()=>{
 assert.equal(catalog.levels.length,597);
 assert.equal(new Set(ids).size,9);
 for(const id of ids){
  const entry=catalog.byId(id);assert.ok(entry,'mission absente : '+id);
  assert.equal(entry.url,'missions/'+id+'.html');
  const html=fs.readFileSync(entry.url,'utf8');
  assert.match(html,/<html lang="fr"/);
  assert.match(html,/<summary>[^<]*questions flash[^<]*<\/summary>/i);
  assert.equal((html.match(/<li>/g)||[]).length,3,id+' : trois questions attendues');
  assert.match(html,/<a class="skip"/,id+' : lien d’évitement absent');
 }
});
test('mission 1 : engrenages extérieurs, cinématique signée et rendement',()=>{
 for(const speed of [300,1200,2400]){
  const p={speedRpm:speed,driverTeeth:20,drivenTeeth:60,torqueNm:30,efficiency:.9},r=gear(p);
  near(r.ratio,1/3,'rapport');near(r.outputSpeedRpm,-speed/3,'sens et vitesse');
  near(r.outputTorqueNm,30*.9*3,'couple');near(r.outputPowerW,30*speed*2*Math.PI/60*.9,'puissance');
 }
 assert.throws(()=>gear({speedRpm:1200,driverTeeth:20.5,drivenTeeth:60,torqueNm:30,efficiency:.9}),RangeError);
});
test('mission 2 : vérin hydraulique, conversions SI et surfaces utiles',()=>{
 for(const pressureBar of [0,80,110]){
  const p={boreMm:50,rodMm:28,strokeMm:250,pressureBar,flowLpm:12,mechanicalEfficiency:.9,volumetricEfficiency:.95},r=hydro.cylinder(p);
  const A=Math.PI*.05**2/4,Ar=Math.PI*(.05**2-.028**2)/4,Q=.95*12/60000;
  near(r.pistonAreaM2,A,'surface piston');near(r.annularAreaM2,Ar,'surface annulaire');
  near(r.extensionForceN,pressureBar*1e5*A*.9,'effort sortie');
  near(r.retractionForceN,pressureBar*1e5*Ar*.9,'effort rentrée');
  near(r.extensionSpeedMps,Q/A,'vitesse sortie');
  near(r.retractionSpeedMps,Q/Ar,'vitesse rentrée');
 }
 assert.throws(()=>hydro.cylinder({boreMm:28,rodMm:28,strokeMm:250,pressureBar:80,flowLpm:12,mechanicalEfficiency:.9,volumetricEfficiency:.95}),RangeError);
});
test('mission 3 : bilan des forces et adhérence en pente',()=>{
 for(const angle of [0,20,30]){
  const p={massKg:1000,slopeDeg:angle,muStatic:.4,tractionN:3000},r=slope(p),a=angle*Math.PI/180;
  near(r.normalN,9810*Math.cos(a),'réaction');near(r.downslopeN,9810*Math.sin(a),'pente');
  near(r.maxStaticFrictionN,.4*9810*Math.cos(a),'frottement maximal');
  assert.equal(r.holds,Math.abs(3000-9810*Math.sin(a))<=.4*9810*Math.cos(a));
 }
 assert.throws(()=>slope({massKg:1000,slopeDeg:90,muStatic:.4,tractionN:3000}),RangeError);
});
test('mission 4 : loi d’Ohm, chute de tension et conservation des puissances',()=>{
 for(const cable of [0,1,2]){
  const r=electric({voltageV:12,resistanceOhm:3,cableResistanceOhm:cable,maxCurrentA:5});
  const I=12/(3+cable);
  near(r.currentA,I,'courant');near(r.cableDropV,I*cable,'chute');
  near(r.loadPowerW,I*I*3,'charge');near(r.cableLossW,I*I*cable,'câbles');
  near(r.loadPowerW+r.cableLossW,12*I,'bilan énergétique');
 }
 assert.throws(()=>electric({voltageV:12,resistanceOhm:0,cableResistanceOhm:1,maxCurrentA:5}),RangeError);
});
test('mission 5 : freinage, réaction et état final',()=>{
 for(const speedKmh of [0,18,36]){
  const p={speedKmh,reactionS:1.2,decelerationMps2:2.5,obstacleM:12},r=braking.solve(p),v=speedKmh/3.6;
  near(r.reactionDistanceM,v*1.2,'réaction');near(r.brakingDistanceM,v*v/5,'freinage');
  near(r.stoppingDistanceM,v*1.2+v*v/5,'distance totale');
  near(r.stoppingTimeS,1.2+v/2.5,'durée totale');
  const final=braking.stateAt(r,p,r.stoppingTimeS+1);
  near(final.speedMps,0,'vitesse arrêt');near(final.distanceM,r.stoppingDistanceM,'position arrêt');
 }
 assert.throws(()=>braking.solve({speedKmh:-1,reactionS:1,decelerationMps2:2.5,obstacleM:12}),RangeError);
});
test('mission 6 : résistance au roulement et puissance',()=>{
 for(const cr of [0,.02,.05]){
  const r=rolling({massKg:1000,rollingCoefficient:cr,slopeDeg:0,speedMps:5,driveForceN:200});
  near(r.normalN,9810,'normale');near(r.rollingForceN,9810*cr,'roulement');
  near(r.requiredPowerW,9810*cr*5,'puissance');
  near(r.accelerationMps2,(200-9810*cr)/1000,'accélération');
 }
 assert.throws(()=>rolling({massKg:1000,rollingCoefficient:-.1,slopeDeg:0,speedMps:5,driveForceN:200}),RangeError);
});
test('mission 7 : ressort préchargé, force et énergie',()=>{
 for(const x of [0,.03,.06]){
  const r=spring({stiffnessNpm:20000,preloadN:100,compressionM:x,maxCompressionM:.06,appliedForceN:700});
  near(r.springForceN,100+20000*x,'force');
  near(r.elasticEnergyJ,100*x+10000*x*x,'énergie');
  near(r.equilibriumCompressionM,.03,'équilibre');
 }
 assert.throws(()=>spring({stiffnessNpm:20000,preloadN:100,compressionM:.07,maxCompressionM:.06,appliedForceN:700}),RangeError);
});
test('mission 8 : levier et équilibre des moments',()=>{
 for(const load of [0,1200,2000]){
  const effort=load*.4/1.2,r=lever({loadN:load,loadArmM:.4,effortArmM:1.2,effortN:effort,maxPivotMomentNm:1000});
  near(r.loadMomentNm,load*.4,'moment charge');
  near(r.requiredEffortN,effort,'effort équilibre');
  near(r.netMomentNm,0,'somme des moments');
  assert.equal(r.equilibrium,true);
 }
 assert.throws(()=>lever({loadN:1200,loadArmM:0,effortArmM:1.2,effortN:400,maxPivotMomentNm:700}),RangeError);
});
test('mission 9 : refroidissement de Newton et seuil théorique',()=>{
 const threshold=300*Math.log(70/25);
 for(const t of [0,300,900]){
  const r=cooling({initialC:90,ambientC:20,timeConstantS:300,timeS:t,limitC:45});
  near(r.temperatureC,20+70*Math.exp(-t/300),'température');
  near(r.timeToLimitS,threshold,'temps seuil');
  assert.equal(r.belowLimit,t>=threshold);
 }
 assert.throws(()=>cooling({initialC:90,ambientC:20,timeConstantS:0,timeS:300,limitC:45}),RangeError);
});

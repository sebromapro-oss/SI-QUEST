(()=>{
'use strict';
const $=id=>document.getElementById(id);
const key='siquest:braking-01';
const data=Object.freeze({speedKmh:18,reactionS:1.2,decelerationMps2:2.5,obstacleM:12});
const reference=SIBraking.solve(data);
let attempts=0,hints=0,passed=false,log=[],current=null,raf=0,start=0;
try{
 const saved=JSON.parse(localStorage.getItem(key)||'{}');
 attempts=Math.min(3,Math.max(0,Math.floor(Number(saved.attempts)||0)));
 hints=Math.min(3,Math.max(0,Math.floor(Number(saved.hints)||0)));
 passed=saved.passed===true;
 log=Array.isArray(saved.log)?saved.log.filter(x=>typeof x==='string').slice(-20):[];
}catch{}
const num=id=>{const s=$(id).value.trim().replace(',','.');return s!==''&&Number.isFinite(Number(s))?Number(s):NaN;};
const fmt=n=>n.toFixed(2).replace('.',',');
function save(){try{localStorage.setItem(key,JSON.stringify({attempts,hints,passed,log}));}catch{}}
function render(){
 $('trial').disabled=attempts===0;
 $('solution').disabled=attempts<3||hints<3||passed;const checkButton=$('calc').querySelector?.('button[type="submit"]');if(checkButton)checkButton.disabled=attempts>=3||passed;
 $('log').replaceChildren(...log.map(s=>{const li=document.createElement('li');li.textContent=s;return li;}));
}
function note(message){log.push(message);log=log.slice(-20);save();render();}
function pause(){if(raf)cancelAnimationFrame(raf);raf=0;$('pause').disabled=true;$('play').disabled=!current;}
function frame(t){
 if(!current)return;
 const state=SIBraking.stateAt(current,data,t);
 const x=60+12*state.distanceM;
 $('vehicle').setAttribute('transform','translate('+(x-32)+' 0)');
 $('time').value=String(Math.min(t,current.stoppingTimeS));
 const phase=state.phase==='reaction'?'réaction':state.phase==='braking'?'freinage':'arrêt';
 $('frameText').textContent=passed?'Temps : '+fmt(state.timeS)+' s ; position : '+fmt(state.distanceM)+' m ; vitesse : '+fmt(state.speedMps)+' m/s ; phase : '+phase+'.':
  'Exploration qualitative : phase '+phase+' ; position et vitesse masquées.';
}
$('calc').addEventListener('submit',event=>{
 event.preventDefault();
 if(attempts>=3||passed){$('feedback').textContent='Trois essais utilisés : consulte les aides avant la correction.';return;}
 attempts=Math.min(3,attempts+1);
 const ok=Math.abs(num('reaction')-reference.reactionDistanceM)<=.1&&Math.abs(num('braking')-reference.brakingDistanceM)<=.1&&Math.abs(num('total')-reference.stoppingDistanceM)<=.1;
 passed=ok;
 $('feedback').textContent=ok?'Calculs corrects. Tu peux comparer plusieurs distances à l’obstacle.':'Vérifie la conversion en m/s, puis sépare réaction et freinage. Conserve les unités en mètres.';
 if(!ok){pause();current=null;$('time').disabled=true;$('play').disabled=true;$('decision').textContent='Exploration qualitative possible ; corrige les calculs pour afficher les valeurs.';}
 note('Calcul '+(ok?'correct':'à reprendre'));
});
$('hint').addEventListener('click',()=>{
 const items=['Convertis 18 km/h en m/s avant tout calcul.','Pendant la réaction : d = v × 1,2 s.','Pendant le freinage : d = v² / (2 × 2,5 m/s²). Additionne les deux distances.'];
 $('hintText').hidden=false;$('hintText').textContent=items[Math.min(2,hints)];
 hints=Math.min(3,hints+1);save();render();
});
$('solution').addEventListener('click',()=>{
 if(attempts<3||hints<3||passed)return;
 $('solutionText').hidden=false;
 $('solutionText').textContent='18 km/h = 5 m/s ; réaction : 5 × 1,2 = 6 m ; freinage : 5² / (2 × 2,5) = 5 m ; arrêt total : 11 m ; à 12 m, marge théorique = 1 m. Cette marge ne valide pas une situation réelle.';
});
$('trial').addEventListener('click',()=>{
 if(attempts===0)return;
 const obstacleM=num('obstacle');
 if(obstacleM<0||obstacleM>30||!Number.isFinite(obstacleM)){
 $('decision').textContent='Distance invalide : saisis une valeur comprise entre 0 et 30 m.';return;
 }
 pause();
 current=SIBraking.solve({...data,obstacleM});
 $('time').max=String(current.stoppingTimeS);$('time').disabled=false;
 $('play').disabled=false;
 const x=60+12*obstacleM;
 $('obstacleLine').setAttribute('x1',String(x));$('obstacleLine').setAttribute('x2',String(x));
 $('obstacleLabel').setAttribute('x',String(Math.min(465,Math.max(65,x))));
 $('obstacleLabel').textContent='dₒ = '+fmt(obstacleM)+' m';
 frame(0);
 $('decision').textContent=!passed?
 (current.stopsBeforeObstacle?'Exploration qualitative : arrêt théorique possible, distances et marge masquées.':'Exploration qualitative : collision théorique possible, distances et marge masquées. Essai réel interdit.'):
 current.stopsBeforeObstacle?
 'Arrêt théorique avant l’obstacle : distance '+fmt(current.stoppingDistanceM)+' m ; marge '+fmt(current.marginM)+' m. Décision : ne pas autoriser un essai réel sans procédure, marge de sécurité et contrôle des conditions.' :
 'Collision théorique : arrêt à '+fmt(current.stoppingDistanceM)+' m, obstacle à '+fmt(obstacleM)+' m ; manque '+fmt(-current.marginM)+' m. Essai réel interdit.';
 note('Obstacle '+fmt(obstacleM)+' m : '+(current.stopsBeforeObstacle?'arrêt théorique possible':'collision théorique'));
});
$('time').addEventListener('input',()=>{pause();frame(Number($('time').value));});
$('play').addEventListener('click',()=>{
 if(!current)return;
 pause();
 if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 $('decision').textContent+=' Mouvement réduit activé : utilise le curseur temporel.';return;
 }
 const duration=current.stoppingTimeS;
 const origin=Number($('time').value)>=duration?0:Number($('time').value);
 start=performance.now()-origin*1000;
 $('play').disabled=true;$('pause').disabled=false;
 function tick(now){
 const t=Math.min(duration,(now-start)/1000);
 frame(t);
 if(t<duration)raf=requestAnimationFrame(tick);
 else{raf=0;$('pause').disabled=true;$('play').disabled=false;}
 }
 raf=requestAnimationFrame(tick);
});
$('pause').addEventListener('click',pause);
$('reset').addEventListener('click',()=>{
 pause();attempts=0;hints=0;passed=false;log=[];current=null;
 try{localStorage.removeItem(key);}catch{}
 $('feedback').textContent='Calculs à effectuer.';$('decision').textContent='Exploration disponible après une tentative numérique.';
 $('hintText').hidden=true;$('solutionText').hidden=true;
 $('time').disabled=true;$('time').value='0';$('play').disabled=true;
 $('obstacle').value='12';$('obstacleLine').setAttribute('x1','204');$('obstacleLine').setAttribute('x2','204');
 $('obstacleLabel').setAttribute('x','204');$('obstacleLabel').textContent='dₒ = 12 m';
 $('vehicle').setAttribute('transform','translate(28 0)');
 $('frameText').textContent='Évolution temporelle non simulée ; valeurs masquées avant validation.';
 render();
});
render();
})();

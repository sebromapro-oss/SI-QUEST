(function(){
  'use strict';
  const $=id=>document.getElementById(id),N=window.SINumeric;
  const model=SIPhysics.gear({speedRpm:1200,driverTeeth:20,drivenTeeth:60,torqueNm:30,efficiency:0.9});
  const hints=[
    'Rapport de vitesses : n₂/n₁ = −Z₁/Z₂.',
    'Le signe moins traduit le sens inverse de la roue menée.',
    'Le couple de sortie en valeur absolue vaut C₁ × η × Z₂/Z₁.'
  ];
  const fresh=()=>({calculationAttempts:0,hints:0,calculationPassed:false,
    solutionShown:false,trialPassed:false,log:[]});
  let state=fresh(),running=false,frame=null;
  try{
    const saved=JSON.parse(localStorage.getItem('siquest-gear01-v2')||'null');
    if(saved&&typeof saved==='object'){
      state={
        calculationAttempts:Number.isInteger(saved.calculationAttempts)&&saved.calculationAttempts>=0?Math.min(saved.calculationAttempts,3):0,
        hints:Number.isInteger(saved.hints)?Math.max(0,Math.min(3,saved.hints)):0,
        calculationPassed:saved.calculationPassed===true,
        solutionShown:saved.solutionShown===true,
        trialPassed:saved.trialPassed===true,
        log:Array.isArray(saved.log)?saved.log.filter(x=>typeof x==='string').slice(-12):[]
      };
    }else{
      const old=JSON.parse(localStorage.getItem('siquest-gear01')||'null');
      if(old&&old.passed===true)state.calculationPassed=true;
    }
  }catch(_error){}
  const save=()=>{try{localStorage.setItem('siquest-gear01-v2',JSON.stringify(state));}catch(_error){}};
  function render(){
    $('log').replaceChildren(...state.log.map(message=>{
      const li=document.createElement('li');li.textContent=message;return li;
    }));
    $('trial').disabled=running||!(state.calculationAttempts>0||state.calculationPassed||state.solutionShown);
    $('solution').disabled=state.calculationPassed||state.calculationAttempts<3||state.hints<3;
    $('task').querySelector('button[type="submit"]').disabled=state.calculationAttempts>=3||state.calculationPassed;
    $('readout').textContent=state.calculationPassed||state.solutionShown?
      'Modèle : '+model.outputSpeedRpm.toFixed(1)+' tr/min ; '+model.outputTorqueNm.toFixed(1)+' N·m.':
      'Résultats masqués avant validation du calcul ou ouverture du corrigé.';
    if(state.trialPassed){
      $('decision').textContent='Décision métier : rapport 3 et couple disponible de 81 N·m dans le modèle. Avant mise en service réelle, vérifier le couple admissible, la lubrification, le carter et les protections constructeur.';
    }
    if(state.solutionShown){
      $('solution-text').hidden=false;
      $('solution-text').textContent='Corrigé : n₂ = −1 200 × 20/60 = −400 tr/min ; C₂ = 30 × 0,90 × 60/20 = 81 N·m.';
    }
  }
  function log(message){
    state.log.push(message);state.log=state.log.slice(-12);save();render();
  }
  $('task').addEventListener('submit',event=>{
    event.preventDefault();
    if(state.calculationAttempts>=3||state.calculationPassed){$('feedback').textContent='Trois essais terminés ou calculs déjà validés : consulte les aides ou lance l’essai.';return;}
    const speed=N.parseDecimal($('speed').value),torque=N.parseDecimal($('torque').value);
    if(speed===null||torque===null){
      $('feedback').textContent='Saisie non reconnue : utilise des nombres avec virgule ou point.';
      return;
    }
    state.calculationAttempts++;
    const speedOK=N.closeTo(speed,model.outputSpeedRpm,1);
    const torqueOK=N.closeTo(torque,model.outputTorqueNm,1);
    $('speed').setAttribute('aria-invalid',String(!speedOK));
    $('torque').setAttribute('aria-invalid',String(!torqueOK));
    if(speedOK&&torqueOK){
      state.calculationPassed=true;
      $('feedback').textContent='Calculs acceptés : vitesse signée et couple cohérents.';
      log('Calcul '+state.calculationAttempts+' : deux résultats acceptés.');
    }else{
      const errors=[!speedOK?'vitesse signée':null,!torqueOK?'couple de sortie':null].filter(Boolean);
      $('feedback').textContent='Calcul non validé : revois '+errors.join(' et ')+'.';
      log('Calcul '+state.calculationAttempts+' : à revoir '+errors.join(', ')+'.');
    }
    save();render();
  });
  $('hint').addEventListener('click',()=>{
    state.hints=Math.min(3,state.hints+1);
    $('hint-text').hidden=false;
    $('hint-text').textContent='Indice '+state.hints+'/3 : '+hints[state.hints-1];
    save();render();
  });
  $('solution').addEventListener('click',()=>{
    if(state.calculationAttempts<3||state.hints<3||state.calculationPassed)return;
    state.solutionShown=true;log('Corrigé consulté après trois indices et trois essais de calcul.');
    $('feedback').textContent='Corrigé accessible. Tu peux lancer la démonstration, mais la mission n’est pas validée de façon autonome.';
  });
  $('trial').addEventListener('click',()=>{
    if(running||!(state.calculationAttempts>0||state.calculationPassed||state.solutionShown))return;
    const qualitative=!(state.calculationPassed||state.solutionShown);
    const message=qualitative?
      'Exploration qualitative : les roues extérieures tournent en sens opposés ; la roue menée tourne moins vite. Les valeurs restent masquées avant validation ou corrigé.':
      'Essai : roue menée à '+model.outputSpeedRpm.toFixed(1)+
      ' tr/min, couple disponible '+model.outputTorqueNm.toFixed(1)+
      ' N·m. Démonstration ralentie : 2 tours moteur pour 2/3 tour menée en sens inverse.';
    $('feedback').textContent=message;
    const complete=()=>{
      running=false;frame=null;
      if(state.calculationPassed&&!state.solutionShown)state.trialPassed=true;
      log(message);
      render();
    };
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      $('rotor1').setAttribute('transform','rotate(0 150 150)');
      $('rotor2').setAttribute('transform','rotate(0 330 150)');
      complete();return;
    }
    running=true;render();let start=null;
    function tick(timestamp){
      if(!running)return;
      if(start===null)start=timestamp;
      const progress=Math.min(1,(timestamp-start)/3000);
      $('rotor1').setAttribute('transform','rotate('+(720*progress).toFixed(2)+' 150 150)');
      $('rotor2').setAttribute('transform','rotate('+(-240*progress).toFixed(2)+' 330 150)');
      if(progress>=1){complete();return;}
      frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);
  });
  $('reset').addEventListener('click',()=>{
    if(frame!==null)cancelAnimationFrame(frame);
    running=false;frame=null;state=fresh();
    $('task').reset();$('hint-text').hidden=true;$('solution-text').hidden=true;
    $('speed').removeAttribute('aria-invalid');$('torque').removeAttribute('aria-invalid');
    $('rotor1').setAttribute('transform','rotate(0 150 150)');
    $('rotor2').setAttribute('transform','rotate(0 330 150)');
    $('feedback').textContent='Progression effacée. Calcule la vitesse et le couple.';
    $('decision').textContent='Décision métier : à établir après calcul et essai.';
    save();render();
  });
  render();
})();

(function(){
  'use strict';
  const $=id=>document.getElementById(id);
  const H=window.SIHydraulics,N=window.SINumeric;
  const base={boreMm:50,rodMm:28,strokeMm:250,pressureBar:80,flowLpm:12,
    mechanicalEfficiency:0.9,volumetricEfficiency:0.95};
  const limits={loadN:12000,reserveFraction:0.1,maxPressureBar:110,maxSpeedMps:0.12};
  const reference=H.cylinder(base);
  const expected={
    area:reference.pistonAreaM2*10000,
    pmin:H.minimumPressureBar({loadN:limits.loadN,boreMm:base.boreMm,mechanicalEfficiency:base.mechanicalEfficiency}),
    vout:reference.extensionSpeedMps*1000,
    vin:reference.retractionSpeedMps*1000
  };
  const tolerances={area:0.1,pmin:0.3,vout:2,vin:2};
  const labels={area:'Surface du piston',pmin:'Pression minimale',vout:'Vitesse de sortie',vin:'Vitesse de rentrée'};
  const hints=[
    'Calcule S = π × D² / 4, avec D en mètres. La surface annulaire vaut π × (D² − d²) / 4.',
    'La pression minimale est p = F / (ηₘ × S). Convertis les pascals en bar en divisant par 100 000.',
    'Le débit utile vaut ηᵥ × Q. Pour les vitesses, divise le débit utile en m³/s par la surface correspondante en m², puis convertis en mm/s.'
  ];
  const empty=()=>({attempts:0,hints:0,calculationPassed:false,solutionShown:false,trialPassed:false,lastTrialSafe:null,log:[]});
  let state=empty(),running=false,frame=null;
  try{
    const saved=JSON.parse(localStorage.getItem('siquest-hydro02')||'null');
    if(saved&&typeof saved==='object'){
      state={
        attempts:Number.isInteger(saved.attempts)&&saved.attempts>=0?Math.min(saved.attempts,3):0,
        hints:Number.isInteger(saved.hints)?Math.max(0,Math.min(3,saved.hints)):0,
        calculationPassed:saved.calculationPassed===true,
        solutionShown:saved.solutionShown===true,
        trialPassed:saved.trialPassed===true,
        lastTrialSafe:saved.lastTrialSafe===true?true:saved.lastTrialSafe===false?false:null,
        log:Array.isArray(saved.log)?saved.log.filter(x=>typeof x==='string').slice(-12):[]
      };
    }
  }catch(_error){/* storage unavailable: game remains playable */}
  function save(){
    try{localStorage.setItem('siquest-hydro02',JSON.stringify(state));}
    catch(_error){/* private browsing may block persistence */}
  }
  function render(){
    $('log').replaceChildren(...state.log.map(message=>{
      const li=document.createElement('li');li.textContent=message;return li;
    }));
    $('solution').disabled=state.hints<3||state.attempts<3||state.calculationPassed;
    const checkButton=$('calculations').querySelector?.('button[type="submit"]');if(checkButton)checkButton.disabled=state.attempts>=3||state.calculationPassed;
    $('trial').disabled=running||!(state.attempts>0||state.calculationPassed||state.solutionShown);
    $('stop').disabled=!running;
    if(state.calculationPassed && !state.solutionShown && $('calculation-feedback').textContent.startsWith('Tes calculs')){
      $('calculation-feedback').textContent='Calculs déjà validés : règle le circuit et lance un essai.';
    }
    if(state.solutionShown){
      $('solution-text').hidden=false;
      $('solution-text').textContent='Corrigé guidé : S = '+expected.area.toFixed(3)+
        ' cm² ; p minimale = '+expected.pmin.toFixed(2)+
        ' bar ; v sortie = '+expected.vout.toFixed(2)+
        ' mm/s ; v rentrée = '+expected.vin.toFixed(2)+
        ' mm/s. En rentrée, la surface annulaire plus petite augmente la vitesse pour le même débit.';
    }
    if(state.lastTrialSafe===true){
      $('decision').textContent=state.calculationPassed&&!state.solutionShown?
        'Dernier essai : réglages compatibles avec le modèle. Avant mise en service réelle : contrôler les flexibles, les organes de sécurité, la charge et les procédures constructeur.':
        'Exploration qualitative : réglages théoriquement compatibles, sans validation de la mission ni autorisation réelle.';
    }else if(state.lastTrialSafe===false){
      $('decision').textContent='Dernier essai : mise en service refusée. Corriger les réglages non conformes.';
    }
  }
  function log(message){
    state.log.push(message);
    state.log=state.log.slice(-12);
    save();render();
  }
  $('calculations').addEventListener('submit',event=>{
    event.preventDefault();
    if(state.attempts>=3||state.calculationPassed){$('calculation-feedback').textContent='Trois essais terminés ou calculs déjà validés : consulte les aides ou poursuis l’essai.';return;}
    const wrong=[],values={};
    for(const key of Object.keys(expected)){
      const element=$(key),value=N.parseDecimal(element.value);
      const correct=value!==null&&N.closeTo(value,expected[key],tolerances[key]);
      element.setAttribute('aria-invalid',String(!correct));
      if(!correct)wrong.push(labels[key]);
      values[key]=value;
    }
    if(Object.values(values).some(v=>v===null)){
      $('calculation-feedback').textContent='Saisie non reconnue : utilise uniquement des nombres, avec une virgule ou un point. Champs à revoir : '+wrong.join(', ')+'.';
      return;
    }
    state.attempts++;
    if(wrong.length===0){
      state.calculationPassed=true;
      log('Calcul '+state.attempts+' : quatre résultats acceptés avec les marges annoncées.');
    }else{
      log('Calcul '+state.attempts+' : à revoir — '+wrong.join(', ')+'.');
    }
    if(wrong.length){
      $('calculation-feedback').textContent='Calcul non validé. Vérifie : '+wrong.join(', ')+'. Aucun résultat exact n’est révélé.';
    }else{
      $('calculation-feedback').textContent='Calculs validés : surface, pression minimale et deux vitesses cohérentes.';
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
    if(state.hints<3||state.attempts<3||state.calculationPassed)return;
    state.solutionShown=true;
    log('Corrigé consulté après trois indices et trois essais de calcul.');
    $('trial-feedback').textContent='Tu peux expérimenter les réglages ; la consultation du corrigé ne valide pas tes calculs.';
  });
  function finish(message){
    running=false;frame=null;
    $('moving').setAttribute('transform','translate(0 0)');
    $('motion-status').textContent=message;
    render();
  }
  $('settings').addEventListener('submit',event=>{
    event.preventDefault();
    if(running||!(state.attempts>0||state.calculationPassed||state.solutionShown))return;
    const pressure=N.parseDecimal($('pressure').value);
    const flow=N.parseDecimal($('flow').value);
    for(const [id,value,min,max] of [['pressure',pressure,0,140],['flow',flow,0,18]]){
      $(id).setAttribute('aria-invalid',String(value===null||value<min||value>max));
    }
    if(pressure===null||flow===null||pressure<0||pressure>140||flow<0||flow>18){
      $('trial-feedback').textContent='Réglages invalides : pression de 0 à 140 bar et débit de 0 à 18 L/min.';
      return;
    }
    const evaluation=H.evaluate({...base,pressureBar:pressure,flowLpm:flow},limits);
    const qualitative=!(state.calculationPassed||state.solutionShown);
    const prefix=qualitative?'Exploration qualitative : pression et débit modifient les efforts et les vitesses ; résultats masqués.':
      'Essai : '+pressure.toFixed(1)+' bar, '+flow.toFixed(1)+' L/min ; effort sortie '+
      Math.round(evaluation.extensionForceN)+' N ; vitesse sortie '+
      (evaluation.extensionSpeedMps*1000).toFixed(1)+' mm/s ; vitesse rentrée '+
      (evaluation.retractionSpeedMps*1000).toFixed(1)+' mm/s.';
    if(!evaluation.safe){
      state.lastTrialSafe=false;
      const message=prefix+' MISE EN SERVICE REFUSÉE : '+evaluation.issues.join(' ');
      $('trial-feedback').textContent=message;
      $('decision').textContent='Décision métier : refus de mise en service. Corriger le ou les réglages non conformes.';
      $('motion-status').textContent='Interverrouillage actif : le vérin reste au repos.';
      $('moving').setAttribute('transform','translate(0 0)');
      log(message);
      return;
    }
    state.lastTrialSafe=null;
    running=true;render();
    $('decision').textContent='Essai en cours : décision après un cycle complet.';
    const durationOutMs=evaluation.extensionTimeS*1000;
    const durationBackMs=evaluation.retractionTimeS*1000;
    const totalMs=durationOutMs+durationBackMs;
    const success=()=>{
      if(state.calculationPassed&&!state.solutionShown)state.trialPassed=true;
      state.lastTrialSafe=true;
      const message=qualitative?prefix+' Cycle qualitatif terminé ; durées masquées, mission non validée.':
        prefix+' Cycle autorisé ; temps sortie '+evaluation.extensionTimeS.toFixed(2)+
        ' s, temps rentrée '+evaluation.retractionTimeS.toFixed(2)+' s.';
      $('trial-feedback').textContent=message;
      $('decision').textContent=qualitative?'Exploration qualitative uniquement : ne pas valider la mission ni autoriser une mise en service.':
        'Décision métier : mise en service admissible selon ce modèle simplifié. Vérifier les protections, l’étanchéité, les flexibles et la documentation constructeur sur machine.';
      log(message);finish('Cycle terminé : sortie puis rentrée, piston revenu à sa position initiale.');
    };
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      $('moving').setAttribute('transform','translate(200 0)');
      $('motion-status').textContent='Mode mouvement réduit : sortie et rentrée décrites sans animation.';
      success();return;
    }
    $('motion-status').textContent='Cycle en cours : sortie, puis rentrée à vitesses calculées.';
    let start=null;
    function tick(timestamp){
      if(!running)return;
      if(start===null)start=timestamp;
      const elapsed=Math.min(totalMs,timestamp-start);
      const progress=elapsed<=durationOutMs?elapsed/durationOutMs:
        1-(elapsed-durationOutMs)/durationBackMs;
      $('moving').setAttribute('transform','translate('+(200*Math.max(0,Math.min(1,progress))).toFixed(3)+' 0)');
      if(elapsed>=totalMs){success();return;}
      frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);
  });
  $('stop').addEventListener('click',()=>{
    if(!running)return;
    if(frame!==null)cancelAnimationFrame(frame);
    state.lastTrialSafe=null;save();
    finish('Cycle interrompu manuellement : aucun essai validé.');
    $('decision').textContent='Essai interrompu : aucune décision sur les réglages actuels.';
    $('trial-feedback').textContent='Essai interrompu. Relance le cycle complet pour valider.';
  });
  for(const id of ['pressure','flow']){
    $(id).addEventListener('input',()=>{
      state.lastTrialSafe=null;
      $('decision').textContent='Réglages modifiés : relancer un essai avant toute décision.';
      save();
    });
  }
  $('reset').addEventListener('click',()=>{
    if(frame!==null)cancelAnimationFrame(frame);
    running=false;frame=null;state=empty();
    $('calculations').reset();$('settings').reset();
    for(const id of ['area','pmin','vout','vin','pressure','flow'])$(id).removeAttribute('aria-invalid');
    $('hint-text').hidden=true;$('solution-text').hidden=true;
    $('moving').setAttribute('transform','translate(0 0)');
    $('motion-status').textContent='Vérin au repos. Aucun essai lancé.';
    $('calculation-feedback').textContent='Tes calculs n’ont pas encore été vérifiés.';
    $('trial-feedback').textContent='Valide tes calculs pour débloquer l’essai.';
    $('decision').textContent='Décision métier : en attente des calculs et de l’essai.';
    save();render();
  });
  render();
})();

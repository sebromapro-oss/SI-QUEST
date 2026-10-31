'use strict';
// Recette Chromium : émulation de viewport et interactions réelles.
// Ces scénarios ne remplacent ni les appareils physiques ni NVDA/TalkBack/VoiceOver.
const {test,expect}=require('@playwright/test');
const catalog=require('../src/catalog.js');
// Les échantillons historiques couvrent les 597 missions d'origine.
const legacyLevels=catalog.levels.slice(0,597);

for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('missions scientifiques — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});

  test('3 essais, 3 aides, exploration 2D qualitative sans corrigé prématuré',async({page})=>{
   await page.goto('http://127.0.0.1:4173/missions/motion-01.html');
   const answer=page.locator('#answer'),submit=page.locator('#calc button[type="submit"]');
   await expect(page.locator('#trialValue')).toBeDisabled();
   await expect(page.locator('#solution')).toBeDisabled();
   await expect(page.locator('#trial')).toBeDisabled();

   for(let attempt=1;attempt<=3;attempt++){
    await answer.fill('0');
    await submit.click();
    await expect(page.locator('#log li').last()).toContainText('essai '+attempt+'/3');
    await expect(page.locator('#trialValue')).toBeEnabled();
    await expect(page.locator('#trial')).toBeDisabled();
    await expect(page.locator('#solution')).toBeDisabled();
    await expect(page.locator('#solutionText')).toBeHidden();
    await expect(page.locator('#trialLabel')).toContainText('sans résultat numérique');
    const svg=page.locator('figure svg').first();
    await expect(svg).toBeVisible();
    await expect(svg.locator('title')).toHaveText('Exploration graphique qualitative');
    await expect(svg.locator('[data-result]')).toHaveCount(0);
   }
   for(let hint=0;hint<3;hint++)await page.locator('#hint').click();
   await expect(page.locator('#solution')).toBeEnabled();
   await page.locator('#solution').click();
   await expect(page.locator('#solutionText')).toBeVisible();
   await expect(page.locator('#trial')).toBeEnabled();
   await page.locator('#reset').click();
   await expect(page.locator('#trialValue')).toBeDisabled();
   await expect(page.locator('#solutionText')).toBeHidden();
   await expect(page.locator('#log li')).toHaveCount(0);
  });

  test('échantillon transversal de 25 missions : calcul, confidentialité UI et largeur',async({page})=>{
   // 25 navigations et calculs successifs dépassent parfois les 30 s par défaut.
   test.setTimeout(120_000);
   // Un parcours par univers (17), puis 8 missions supplémentaires réparties
   // dans le catalogue : 25 identifiants distincts et 17 univers couverts.
   // Ce test de parcours ne démontre pas la justesse des équations.
   const missions=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
   for(let i=0;missions.length<25;i++){
    const candidate=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
    if(!missions.some(m=>m.id===candidate.id))missions.push(candidate);
   }
   const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const mission of missions){
    errors.length=0;
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await expect(page.locator('#answer'),mission.id+' : saisie absente').toBeVisible();
    await expect(page.locator('#solution'),mission.id+' : corrigé accessible avant calcul').toBeDisabled();
    await expect(page.locator('#trialValue'),mission.id+' : exploration ouverte avant essai').toBeDisabled();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await page.locator('#answer').fill(String(wrong));
    await page.locator('#calc button[type="submit"]').click();
    const state=await page.evaluate(()=>({feedback:document.querySelector('#feedback')?.textContent,trialDisabled:document.querySelector('#trialValue')?.disabled,controller:!!document.querySelector('#rewardText')}));
    if(state.trialDisabled)throw new Error(mission.id+' : exploration bloquée après erreur ; état='+JSON.stringify(state)+' ; erreurs='+errors.join(' | '));
    await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée après erreur').toBeEnabled();
    await expect(page.locator('#trial'),mission.id+' : verdict accessible avant validation').toBeDisabled();
    await expect(page.locator('#solutionText'),mission.id+' : corrigé prématuré').toBeHidden();
    await expect(page.locator('figure svg'),mission.id+' : schéma qualitatif absent').toBeVisible();
    const dimensions=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:innerWidth}));
    expect(dimensions.document,mission.id+' : débordement horizontal').toBeLessThanOrEqual(dimensions.viewport+2);
    expect(errors,mission.id+' : erreur JavaScript navigateur').toEqual([]);
   }
  });

  test('contre-échantillon complémentaire : 25 missions, 2D sans divulgation, mobile et erreurs JS',async({page})=>{
   // Échantillon distinct des 25 missions précédentes ; distribution sur tout le catalogue.
   // Il s'agit de contrôles de navigation/interaction, pas de 25 validations scientifiques.
   test.setTimeout(150_000);
   const original=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
   for(let i=0;original.length<25;i++){
    const candidate=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
    if(!original.some(m=>m.id===candidate.id))original.push(candidate);
   }
   const used=new Set(original.map(m=>m.id)),additional=[];
   for(let i=0;additional.length<25&&i<legacyLevels.length;i++){
    const candidate=legacyLevels[(12+23*i)%legacyLevels.length];
    if(!used.has(candidate.id)){used.add(candidate.id);additional.push(candidate);}
   }
   expect(additional, '25 missions complémentaires distinctes').toHaveLength(25);
   const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const mission of additional){
    errors.length=0;
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await expect(page.locator('#answer'),mission.id+' : saisie absente').toBeVisible();
    await expect(page.locator('#solution'),mission.id+' : corrigé prématuré').toBeDisabled();
    await expect(page.locator('#trialValue'),mission.id+' : exploration initialement verrouillée').toBeDisabled();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await page.locator('#answer').fill(String(wrong));
    await page.locator('#calc button[type="submit"]').click();
    await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée après erreur').toBeEnabled();
    await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
    await expect(page.locator('#solution'),mission.id+' : accès au corrigé prématuré').toBeDisabled();
    await expect(page.locator('#solutionText'),mission.id+' : texte du corrigé prématuré').toBeHidden();
    const svg=page.locator('figure svg').first();
    await expect(svg,mission.id+' : schéma absent').toBeVisible();
    await expect(svg.locator('[data-result]'),mission.id+' : fuite numérique dans le SVG').toHaveCount(0);
    const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth}));
    expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.viewport+2);
    expect(errors,mission.id+' : erreur JavaScript').toEqual([]);
   }
  });

  test('questions flash uniques : HTML et contrôleur ne se superposent pas',async({page})=>{
   for(const id of ['heat-01','brake-torque-01','motion-01']){
    await page.goto('http://127.0.0.1:4173/missions/'+id+'.html');
    const headings=page.locator('main h3').filter({hasText:/Questions flash/i});
    await expect(headings,id+' : doublon ou absence de questions flash').toHaveCount(1);
    await expect(headings.locator('xpath=following-sibling::ol[1]/li'),id+' : nombre de questions').toHaveCount(3);
   }
  });

  test('3D après erreur : caméra et pas de temps accessibles sans validation',async({page})=>{
   await page.goto('http://127.0.0.1:4173/missions/circular-02.html');
   await expect(page.locator('#scene3-step')).toBeDisabled();
   await page.locator('#answer').fill('0');
   await page.locator('#calc button[type="submit"]').click();
   await expect(page.locator('#scene3-step')).toBeEnabled();
   await expect(page.locator('#scene3-orbit')).toBeEnabled();
   await expect(page.locator('#scene3-view svg')).toBeVisible();
   await expect(page.locator('#solution')).toBeDisabled();
   await expect(page.locator('#trial')).toBeDisabled();
   await page.locator('#scene3-step').click();
   await expect(page.locator('#scene3-info')).toContainText('Temps simulé : 0.10 s');
   await expect(page.locator('#solutionText')).toBeHidden();
  });
 });
}

/*
 * Lot de recette 051–100 : 50 pages supplémentaires, distinctes des 50 déjà
 * échantillonnées. Les neuf contrôleurs historiques autonomes (001–009)
 * nécessitent un protocole DOM différent et ne sont pas comptés dans ce lot.
 * Contrôle navigateur, non validation indépendante des équations.
 */
const historicIds=new Set(['gear-01','hydro-01','slope-01','electric-01','braking-01','rolling-01','spring-01','lever-01','cooling-01']);
function nextBrowserBatch(){
 const original=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;original.length<25;i++){
  const candidate=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!original.some(m=>m.id===candidate.id))original.push(candidate);
 }
 const used=new Set(original.map(m=>m.id));
 const additional=[];
 for(let i=0;additional.length<25&&i<legacyLevels.length;i++){
  const candidate=legacyLevels[(12+23*i)%legacyLevels.length];
  if(!used.has(candidate.id)){used.add(candidate.id);additional.push(candidate);}
 }
 const fresh=[];
 for(let i=0;fresh.length<50&&i<legacyLevels.length;i++){
  const candidate=legacyLevels[(17+31*i)%legacyLevels.length];
  if(!used.has(candidate.id)&&!historicIds.has(candidate.id)){
   used.add(candidate.id);fresh.push(candidate);
  }
 }
 if(original.length!==25||additional.length!==25||fresh.length!==50||used.size!==100)
  throw new Error('Sélection des 100 missions : collision ou catalogue modifié');
 return fresh;
}
const browserBatch051to100=nextBrowserBatch();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 051–100 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('25 missions nouvelles : essais, aides, investigation qualitative, absence de fuite — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    for(const mission of browserBatch051to100.slice(group*25,(group+1)*25)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : réponse absente').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : paramètre absent').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé initial ouvert').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée après erreur').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict avant validation').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé après un essai').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : résultat prématuré').toBeHidden();
     // Déplacer le paramètre jusqu'à une borne autorisée : test réel de recalcul graphique.
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;
      el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : SVG absent').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : valeur numérique révélée').toHaveCount(0);
     const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth}));
     expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.viewport+2);
     expect(errors,mission.id+' : exception JavaScript').toEqual([]);
     // Trois aides et trois essais : corrigé seulement après les deux conditions.
     for(let hint=0;hint<3;hint++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé ouvert avec un seul essai').toBeDisabled();
     for(let attempt=1;attempt<3;attempt++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé non accessible après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé non affiché').toBeVisible();
     expect(errors,mission.id+' : exception après 3 essais et 3 aides').toEqual([]);
    }
   });
  }
 });
}

/*
 * Neuf missions historiques autonomes : leurs formulaires et leurs moteurs
 * sont différents du contrôleur commun. Elles ne doivent pas disparaître de
 * la recette navigateur au seul motif qu'elles n'ont pas #trialValue.
 */
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('neuf missions historiques — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  test('3 essais/3 aides, exploration qualitative, corrigé verrouillé',async({page})=>{
   test.setTimeout(150_000);
   await page.emulateMedia({reducedMotion:'reduce'});
   const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const id of ['gear-01','hydro-01','slope-01','electric-01','braking-01','rolling-01','spring-01','lever-01','cooling-01']){
    errors.length=0;
    await page.goto('http://127.0.0.1:4173/missions/'+id+'.html');
    const form=page.locator('form#task, form#calculations, form#calc');
    const inputs=form.locator('input[required]');
    expect(await inputs.count(),id+' : entrées de calcul absentes').toBeGreaterThanOrEqual(2);
    await expect(page.locator('#trial'),id+' : essai initial accessible').toBeDisabled();
    await expect(page.locator('#solution'),id+' : corrigé initial accessible').toBeDisabled();
    for(let i=0;i<3;i++){
     for(const input of await inputs.all())await input.fill('999999999');
     await form.locator('button[type="submit"]').click();
     await expect(page.locator('#trial'),id+' : essai bloqué après erreur').toBeEnabled();
     await expect(page.locator('#solution'),id+' : corrigé prématuré').toBeDisabled();
    }
    // Avant les trois aides, le corrigé reste inaccessible même après trois essais.
    for(let i=0;i<2;i++){
     await page.locator('#hint').click();
     await expect(page.locator('#solution'),id+' : corrigé avant la troisième aide').toBeDisabled();
    }
    const solutionText=page.locator(id==='gear-01'||id==='hydro-01'?'#solution-text':'#solutionText');
    await expect(solutionText,id+' : corrigé dévoilé').toBeHidden();
    await page.locator('#hint').click();
    await expect(page.locator('#solution'),id+' : corrigé bloqué après 3+3').toBeEnabled();
    // L'exploration est possible après erreur ; mouvement réduit pour ne pas
    // confondre test DOM et validation de fidélité temporelle.
    await page.locator('#trial').click();
    await expect(solutionText,id+' : essai ayant dévoilé le corrigé').toBeHidden();
    await page.locator('#solution').click();
    await expect(solutionText,id+' : corrigé non affiché après autorisation').toBeVisible();
    expect(errors,id+' : erreur JavaScript').toEqual([]);
   }
  });
 });
}


/* Recette complémentaire 110–159 : cinquante missions inédites
 * dans la couverture navigateur, sans modification des contenus pédagogiques.
 * Sélection reproductible, excluant les 100 missions génériques et les
 * neuf missions historiques déjà contrôlées. Pas de réception physique.
 */
function nextBrowserBatch110to159(){
 const original=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;original.length<25;i++){
  const candidate=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!original.some(m=>m.id===candidate.id))original.push(candidate);
 }
 const used=new Set(original.map(m=>m.id));
 const second=[];
 for(let i=0;second.length<25&&i<legacyLevels.length;i++){
  const candidate=legacyLevels[(12+23*i)%legacyLevels.length];
  if(!used.has(candidate.id)){used.add(candidate.id);second.push(candidate);}
 }
 for(const mission of browserBatch051to100)used.add(mission.id);
 for(const id of historicIds)used.add(id);
 if(used.size!==109)throw new Error('La couverture précédente doit comprendre 109 missions uniques');
 const fresh=[];
 for(let i=0;fresh.length<50&&i<legacyLevels.length;i++){
  const candidate=legacyLevels[(53+37*i)%legacyLevels.length];
  if(!used.has(candidate.id)){used.add(candidate.id);fresh.push(candidate);}
 }
 if(fresh.length!==50||used.size!==159)throw new Error('Sélection du lot 110–159 invalide');
 return fresh;
}
const browserBatch110to159=nextBrowserBatch110to159();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 110–159 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('25 missions supplémentaires : erreur, simulation, trois aides et trois essais — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    for(const mission of browserBatch110to159.slice(group*25,(group+1)*25)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : saisie absente').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : paramètre initialement accessible').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé initialement accessible').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration verrouillée après erreur').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé après un essai').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé visible avant autorisation').toBeHidden();
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;
      el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : SVG absent').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : résultat révélé').toHaveCount(0);
     const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth}));
     expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.viewport+2);
     expect(errors,mission.id+' : erreur JavaScript').toEqual([]);
     for(let i=0;i<3;i++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé avec un seul essai').toBeDisabled();
     for(let i=0;i<2;i++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé bloqué après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé non visible').toBeVisible();
     expect(errors,mission.id+' : exception JavaScript après aides/essais').toEqual([]);
    }
   });
  }
  test('contrôle clavier ciblé : lien d’évitement et validation par Entrée',async({page})=>{
   test.setTimeout(90_000);
   for(const mission of browserBatch110to159.slice(0,5)){
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip'),mission.id+' : lien d’évitement non atteignable').toBeFocused();
    const answer=page.locator('#answer');
    await answer.focus();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await answer.fill(String(wrong));
    await answer.press('Enter');
    await expect(page.locator('#trialValue'),mission.id+' : validation par Entrée impossible').toBeEnabled();
    await expect(page.locator('#solution'),mission.id+' : corrigé dévoilé au clavier').toBeDisabled();
   }
  });
 });
}


/*
 * Recette 160–209 : cinquante nouvelles missions uniques, sans modifier
 * les pages ni les modèles. Échantillonnage déterministe réparti sur le
 * catalogue ; couverture fonctionnelle Chromium, non validation physique.
 */
function nextBrowserBatch160to209(){
 const original=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;original.length<25;i++){
  const candidate=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!original.some(m=>m.id===candidate.id))original.push(candidate);
 }
 const used=new Set(original.map(m=>m.id));
 for(let i=0;used.size<50&&i<legacyLevels.length;i++){
  used.add(legacyLevels[(12+23*i)%legacyLevels.length].id);
 }
 for(const mission of browserBatch051to100)used.add(mission.id);
 for(const id of historicIds)used.add(id);
 for(const mission of browserBatch110to159)used.add(mission.id);
 if(used.size!==159)throw new Error('Couverture précédente incohérente : '+used.size+'/159');
 const fresh=[];
 for(let i=0;fresh.length<50&&i<legacyLevels.length;i++){
  const candidate=legacyLevels[(89+41*i)%legacyLevels.length];
  if(!used.has(candidate.id)){used.add(candidate.id);fresh.push(candidate);}
 }
 if(fresh.length!==50||used.size!==209)throw new Error('Lot 160–209 non distinct');
 return fresh;
}
const browserBatch160to209=nextBrowserBatch160to209();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 160–209 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('25 missions : 3 essais/3 aides, exploration qualitative et largeur — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    for(const mission of browserBatch160to209.slice(group*25,(group+1)*25)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : saisie absente').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : exploration ouverte avant calcul').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé initial accessible').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée après erreur').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé prématuré').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé visible').toBeHidden();
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : schéma absent').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : fuite de résultat').toHaveCount(0);
     const dimensions=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:innerWidth}));
     expect(dimensions.document,mission.id+' : débordement horizontal').toBeLessThanOrEqual(dimensions.viewport+2);
     expect(errors,mission.id+' : erreur JavaScript').toEqual([]);
     for(let i=0;i<3;i++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé après une seule tentative').toBeDisabled();
     for(let i=0;i<2;i++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé bloqué après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé absent après autorisation').toBeVisible();
     expect(errors,mission.id+' : exception après validation').toEqual([]);
    }
   });
  }
  test('clavier : lien d’évitement, entrée et corrigé protégé sur cinq missions',async({page})=>{
   test.setTimeout(90_000);
   for(const mission of browserBatch160to209.slice(0,5)){
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip'),mission.id+' : lien d’évitement').toBeFocused();
    const answer=page.locator('#answer');
    await answer.focus();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await answer.fill(String(wrong));
    await answer.press('Enter');
    await expect(page.locator('#trialValue'),mission.id+' : Entrée non fonctionnelle').toBeEnabled();
    await expect(page.locator('#solution'),mission.id+' : fuite du corrigé').toBeDisabled();
   }
  });
 });
}


/*
 * Recette 210–259 : 50 missions supplémentaires sans doublon, tirées du
 * catalogue réel. Chromium bureau et Android émulé uniquement.
 * Ce parcours ne constitue ni une mesure physique ni une recette RGAA.
 */
function nextBrowserBatch210to259(){
 const original=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;original.length<25;i++){
  const candidate=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!original.some(m=>m.id===candidate.id))original.push(candidate);
 }
 const used=new Set(original.map(m=>m.id));
 for(let i=0;used.size<50&&i<legacyLevels.length;i++)
  used.add(legacyLevels[(12+23*i)%legacyLevels.length].id);
 for(const m of browserBatch051to100)used.add(m.id);
 for(const id of historicIds)used.add(id);
 for(const m of browserBatch110to159)used.add(m.id);
 for(const m of browserBatch160to209)used.add(m.id);
 if(used.size!==209)throw new Error('Couverture initiale 210–259 incorrecte : '+used.size);
 const fresh=[];
 for(let i=0;fresh.length<50&&i<legacyLevels.length;i++){
  const candidate=legacyLevels[(137+43*i)%legacyLevels.length];
  if(!used.has(candidate.id)){used.add(candidate.id);fresh.push(candidate);}
 }
 if(fresh.length!==50||used.size!==259)
  throw new Error('Sélection 210–259 non distincte : '+fresh.length+'/'+used.size);
 return fresh;
}
const browserBatch210to259=nextBrowserBatch210to259();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 210–259 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('25 missions : 3 essais, 3 aides, SVG et absence de fuite — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    for(const mission of browserBatch210to259.slice(group*25,(group+1)*25)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : réponse absente').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : exploration initiale').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé initial').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé prématuré').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : texte prématuré').toBeHidden();
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : figure absente').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : fuite numérique SVG').toHaveCount(0);
     const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth}));
     expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.viewport+2);
     expect(errors,mission.id+' : erreur JavaScript').toEqual([]);
     for(let i=0;i<3;i++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé après un seul essai').toBeDisabled();
     for(let i=0;i<2;i++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé bloqué après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé non affiché').toBeVisible();
     expect(errors,mission.id+' : erreur après validation').toEqual([]);
    }
   });
  }
  test('clavier sur cinq missions : lien d’évitement et Entrée',async({page})=>{
   test.setTimeout(90_000);
   for(const mission of browserBatch210to259.slice(0,5)){
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip'),mission.id+' : lien d’évitement').toBeFocused();
    const answer=page.locator('#answer');
    await answer.focus();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await answer.fill(String(wrong));
    await answer.press('Enter');
    await expect(page.locator('#trialValue'),mission.id+' : Entrée non prise en compte').toBeEnabled();
    await expect(page.locator('#solution'),mission.id+' : fuite du corrigé').toBeDisabled();
   }
  });
 });
}


/* Recette 260–309 : cinquante missions distinctes, sur Chromium bureau et
 * Android émulé. Ne vaut ni validation physique, ni RGAA, ni calcul indépendant.
 * Les 259 missions précédentes sont exclues de manière déterministe.
 */
function nextBrowserBatch260to309(){
 const first=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;first.length<25;i++){
  const m=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!first.some(x=>x.id===m.id))first.push(m);
 }
 const used=new Set(first.map(m=>m.id));
 for(let i=0;used.size<50&&i<legacyLevels.length;i++)
  used.add(legacyLevels[(12+23*i)%legacyLevels.length].id);
 for(const id of historicIds)used.add(id);
 for(const group of [browserBatch051to100,browserBatch110to159,browserBatch160to209,browserBatch210to259])
  for(const m of group)used.add(m.id);
 if(used.size!==259)throw new Error('Couverture précédente non unique : '+used.size+'/259');
 const fresh=[];
 for(let i=0;fresh.length<50&&i<legacyLevels.length;i++){
  const m=legacyLevels[(173+47*i)%legacyLevels.length];
  if(!used.has(m.id)){used.add(m.id);fresh.push(m);}
 }
 if(fresh.length!==50||used.size!==309)throw new Error('Lot 260–309 invalide : '+fresh.length+'/'+used.size);
 return fresh;
}
const browserBatch260to309=nextBrowserBatch260to309();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 260–309 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('25 missions : erreur, exploration, 3 aides/3 essais, SVG et absence de fuite — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const mission of browserBatch260to309.slice(group*25,(group+1)*25)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : saisie').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : exploration prématurée').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé prématuré').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée après erreur').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé après un essai').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé révélé').toBeHidden();
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : schéma absent').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : fuite numérique').toHaveCount(0);
     const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,view:innerWidth}));
     expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.view+2);
     expect(errors,mission.id+' : erreur JavaScript').toEqual([]);
     for(let i=0;i<3;i++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé après une tentative').toBeDisabled();
     for(let i=0;i<2;i++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé bloqué après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé absent après 3+3').toBeVisible();
     expect(errors,mission.id+' : exception après validation').toEqual([]);
    }
   });
  }
  test('clavier : lien d’évitement et validation Entrée sur cinq missions',async({page})=>{
   test.setTimeout(90_000);
   for(const mission of browserBatch260to309.slice(0,5)){
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip'),mission.id+' : lien d’évitement').toBeFocused();
    const answer=page.locator('#answer');await answer.focus();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await answer.fill(String(wrong));await answer.press('Enter');
    await expect(page.locator('#trialValue'),mission.id+' : validation clavier').toBeEnabled();
    await expect(page.locator('#solution'),mission.id+' : fuite du corrigé').toBeDisabled();
   }
  });
 });
}


/* Recette 310–359 : 50 nouvelles missions du catalogue existant, sélection
 * déterministe sans doublons avec les 309 déjà couvertes. Chromium desktop
 * et Android émulé ; ne vaut pas validation matérielle ni RGAA.
 */
function nextBrowserBatch310to359(){
 const first=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;first.length<25;i++){
  const m=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!first.some(x=>x.id===m.id))first.push(m);
 }
 const used=new Set(first.map(m=>m.id));
 for(let i=0;used.size<50&&i<legacyLevels.length;i++)
  used.add(legacyLevels[(12+23*i)%legacyLevels.length].id);
 for(const id of historicIds)used.add(id);
 for(const group of [browserBatch051to100,browserBatch110to159,browserBatch160to209,browserBatch210to259,browserBatch260to309])
  for(const m of group)used.add(m.id);
 if(used.size!==309)throw new Error('Couverture précédente non unique : '+used.size+'/309');
 const fresh=[];
 for(let i=0;fresh.length<50&&i<legacyLevels.length;i++){
  const m=legacyLevels[(211+53*i)%legacyLevels.length];
  if(!used.has(m.id)){used.add(m.id);fresh.push(m);}
 }
 if(fresh.length!==50||used.size!==359)
  throw new Error('Lot 310–359 invalide : '+fresh.length+'/'+used.size);
 return fresh;
}
const browserBatch310to359=nextBrowserBatch310to359();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 310–359 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('25 missions distinctes : 3 essais, 3 aides, exploration, SVG et confidentialité — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const mission of browserBatch310to359.slice(group*25,(group+1)*25)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : saisie absente').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : exploration prématurée').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé initial ouvert').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée après erreur').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé après un essai').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : texte de solution révélé').toBeHidden();
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : schéma absent').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : résultat numérique exposé').toHaveCount(0);
     const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,view:innerWidth}));
     expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.view+2);
     expect(errors,mission.id+' : erreur JavaScript après exploration').toEqual([]);
     for(let i=0;i<3;i++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé avant 3 essais').toBeDisabled();
     for(let i=0;i<2;i++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé bloqué après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé absent après 3+3').toBeVisible();
     expect(errors,mission.id+' : erreur JavaScript après validation').toEqual([]);
    }
   });
  }
  test('clavier : évitement et validation par Entrée sur cinq missions',async({page})=>{
   test.setTimeout(90_000);
   for(const mission of browserBatch310to359.slice(0,5)){
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip'),mission.id+' : lien d’évitement').toBeFocused();
    const answer=page.locator('#answer');await answer.focus();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await answer.fill(String(wrong));await answer.press('Enter');
    await expect(page.locator('#trialValue'),mission.id+' : Entrée non prise en compte').toBeEnabled();
    await expect(page.locator('#solution'),mission.id+' : fuite du corrigé').toBeDisabled();
   }
  });
 });
}


/* Recette 360–409 : 50 nouvelles missions du catalogue existant, sélection
 * déterministe sans doublons avec les 309 déjà couvertes. Chromium desktop
 * et Android émulé ; ne vaut pas validation matérielle ni RGAA.
 */
function nextBrowserBatch360to409(){
 const first=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;first.length<25;i++){
  const m=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!first.some(x=>x.id===m.id))first.push(m);
 }
 const used=new Set(first.map(m=>m.id));
 for(let i=0;used.size<50&&i<legacyLevels.length;i++)
  used.add(legacyLevels[(12+23*i)%legacyLevels.length].id);
 for(const id of historicIds)used.add(id);
 for(const group of [browserBatch051to100,browserBatch110to159,browserBatch160to209,browserBatch210to259,browserBatch260to309,browserBatch310to359])
  for(const m of group)used.add(m.id);
 if(used.size!==359)throw new Error('Couverture précédente non unique : '+used.size+'/359');
 const fresh=[];
 for(const m of legacyLevels){
  if(fresh.length===50)break;
  if(!used.has(m.id)){used.add(m.id);fresh.push(m);}
 }
 if(fresh.length!==50||used.size!==409)
  throw new Error('Lot 360–409 invalide : '+fresh.length+'/'+used.size);
 return fresh;
}
const browserBatch360to409=nextBrowserBatch360to409();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 360–409 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('25 missions distinctes : 3 essais, 3 aides, exploration, SVG et confidentialité — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const mission of browserBatch360to409.slice(group*25,(group+1)*25)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : saisie absente').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : exploration prématurée').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé initial ouvert').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée après erreur').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé après un essai').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : texte de solution révélé').toBeHidden();
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : schéma absent').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : résultat numérique exposé').toHaveCount(0);
     const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,view:innerWidth}));
     expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.view+2);
     expect(errors,mission.id+' : erreur JavaScript après exploration').toEqual([]);
     for(let i=0;i<3;i++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé avant 3 essais').toBeDisabled();
     for(let i=0;i<2;i++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé bloqué après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé absent après 3+3').toBeVisible();
     expect(errors,mission.id+' : erreur JavaScript après validation').toEqual([]);
    }
   });
  }
  test('clavier : évitement et validation par Entrée sur cinq missions',async({page})=>{
   test.setTimeout(90_000);
   for(const mission of browserBatch360to409.slice(0,5)){
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip'),mission.id+' : lien d’évitement').toBeFocused();
    const answer=page.locator('#answer');await answer.focus();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await answer.fill(String(wrong));await answer.press('Enter');
    await expect(page.locator('#trialValue'),mission.id+' : Entrée non prise en compte').toBeEnabled();
    await expect(page.locator('#solution'),mission.id+' : fuite du corrigé').toBeDisabled();
   }
  });
 });
}

/*
 * Recette 410–459 : 50 missions distinctes restantes, sans doublons avec
 * les 409 missions précédentes. Tests Chromium bureau + Android émulé.
 * Ce protocole ne valide ni la physique de chaque animation, ni le RGAA.
 */
function nextBrowserBatch410to459(){
 const first=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;first.length<25;i++){
  const m=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!first.some(x=>x.id===m.id))first.push(m);
 }
 const used=new Set(first.map(m=>m.id));
 for(let i=0;used.size<50&&i<legacyLevels.length;i++)
  used.add(legacyLevels[(12+23*i)%legacyLevels.length].id);
 for(const id of historicIds)used.add(id);
 for(const group of [browserBatch051to100,browserBatch110to159,browserBatch160to209,
  browserBatch210to259,browserBatch260to309,browserBatch310to359,browserBatch360to409])
  for(const m of group)used.add(m.id);
 if(used.size!==409)throw new Error('Couverture initiale 410–459 incohérente : '+used.size);
 const fresh=[];
 for(const m of legacyLevels){
  if(fresh.length===50)break;
  if(!used.has(m.id)){used.add(m.id);fresh.push(m);}
 }
 if(fresh.length!==50||used.size!==459)
  throw new Error('Lot 410–459 non distinct : '+fresh.length+'/'+used.size);
 return fresh;
}
const browserBatch410to459=nextBrowserBatch410to459();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 410–459 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('25 missions : 3 essais/3 aides, simulation, corrigé et largeur — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const mission of browserBatch410to459.slice(group*25,(group+1)*25)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : réponse absente').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : exploration initiale').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé initial').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration après erreur').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé après un essai').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : texte dévoilé').toBeHidden();
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : schéma SVG absent').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : fuite numérique SVG').toHaveCount(0);
     const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,view:innerWidth}));
     expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.view+2);
     expect(errors,mission.id+' : erreur JS après exploration').toEqual([]);
     for(let i=0;i<3;i++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé avant 3 essais').toBeDisabled();
     for(let i=0;i<2;i++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé bloqué après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé absent après 3+3').toBeVisible();
     expect(errors,mission.id+' : erreur JS après validation').toEqual([]);
    }
   });
  }
  test('clavier : évitement et Entrée sur cinq missions',async({page})=>{
   test.setTimeout(90_000);
   for(const mission of browserBatch410to459.slice(0,5)){
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip'),mission.id+' : lien évitement').toBeFocused();
    const answer=page.locator('#answer');await answer.focus();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await answer.fill(String(wrong));await answer.press('Enter');
    await expect(page.locator('#trialValue'),mission.id+' : Entrée sans effet').toBeEnabled();
    await expect(page.locator('#solution'),mission.id+' : corrigé prématuré').toBeDisabled();
   }
  });
 });
}


/* Lot 460–509 : 50 missions existantes supplémentaires, uniques parmi les 597.
 * Contrôles Chromium sur bureau et Android émulé, sans prétention de recette
 * matérielle, scientifique exhaustive ou RGAA.
 */
function nextBrowserBatch460to509(){
 const first=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;first.length<25;i++){
  const m=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!first.some(x=>x.id===m.id))first.push(m);
 }
 const used=new Set(first.map(m=>m.id));
 for(let i=0;used.size<50;i++)used.add(legacyLevels[(12+23*i)%legacyLevels.length].id);
 for(const id of historicIds)used.add(id);
 for(const group of [browserBatch051to100,browserBatch110to159,browserBatch160to209,
  browserBatch210to259,browserBatch260to309,browserBatch310to359,browserBatch360to409,browserBatch410to459])
  for(const m of group)used.add(m.id);
 if(used.size!==459)throw Error('Couverture antérieure incohérente : '+used.size);
 const fresh=legacyLevels.filter(m=>!used.has(m.id)).slice(0,50);
 if(fresh.length!==50||new Set(fresh.map(m=>m.id)).size!==50)
  throw Error('Lot 460–509 invalide');
 return fresh;
}
const browserBatch460to509=nextBrowserBatch460to509();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 460–509 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('25 missions : essais/aides, exploration, corrigé et mobile — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const mission of browserBatch460to509.slice(group*25,(group+1)*25)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : réponse absente').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : exploration prématurée').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé initial').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé après un essai').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : texte prématuré').toBeHidden();
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : schéma absent').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : résultat SVG dévoilé').toHaveCount(0);
     const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,view:innerWidth}));
     expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.view+2);
     expect(errors,mission.id+' : erreur JS').toEqual([]);
     for(let i=0;i<3;i++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé avant 3 essais').toBeDisabled();
     for(let i=0;i<2;i++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé inaccessible après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé non affiché').toBeVisible();
     expect(errors,mission.id+' : exception après 3+3').toEqual([]);
    }
   });
  }
  test('clavier : évitement et Entrée sur cinq missions',async({page})=>{
   test.setTimeout(90_000);
   for(const mission of browserBatch460to509.slice(0,5)){
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip'),mission.id+' : lien évitement').toBeFocused();
    const answer=page.locator('#answer');await answer.focus();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await answer.fill(String(wrong));await answer.press('Enter');
    await expect(page.locator('#trialValue'),mission.id+' : Entrée sans effet').toBeEnabled();
    await expect(page.locator('#solution'),mission.id+' : fuite du corrigé').toBeDisabled();
   }
  });
 });
}

/* Non-régression : les axes de l'investigation correspondent aux unités
 * du modèle, y compris sur les pages historiques aux libellés HTML génériques. */
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('unités des axes SVG — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  test('les axes du graphe suivent les unités physiques de la mission',async({page})=>{
   for(const id of ['braking-distance-friction-01','heat-exchanger-lmtd-01',
    'acoustic-distance-loss-01','sampling-alias-frequency-01']){
    await page.goto('http://127.0.0.1:4173/missions/'+id+'.html');
    // Le graphe contient deux légendes d'axes puis quatre graduations numériques.
    // Comparer les six textes aux deux unités déclenche un faux échec en navigateur.
    const labels=await page.locator('#curve').evaluate(el=>
     Array.from(el.ownerSVGElement.children).filter(n=>n.tagName.toLowerCase()==='text')
      .map(n=>n.textContent.trim()));
    const expected=await page.evaluate(()=>[window.SI_MISSION.unit,window.SI_MISSION.inputUnit]
     .map(unit=>unit==='sans unité'?'1':unit));
    expect(labels.length,id+' : légendes ou graduations SVG manquantes').toBeGreaterThanOrEqual(6);
    expect(labels.slice(0,2),id+' : axes SVG non conformes aux unités').toEqual(expected);
    expect(labels.slice(2,6).every(value=>value!==''&&Number.isFinite(Number(value.replace(/\\s/g,'').replace(',','.')))),
     id+' : graduations SVG non numériques').toBe(true);
   }
  });
 });
}


/* Lot 510–559 : 50 missions existantes inédites dans la recette navigateur.
 * Contrôles Chromium bureau et Android émulé ; aucune certification RGAA
 * ou validation scientifique individuelle n'en découle.
 */
function nextBrowserBatch510to559(){
 const first=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;first.length<25;i++){
  const m=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!first.some(x=>x.id===m.id))first.push(m);
 }
 const used=new Set(first.map(m=>m.id));
 for(let i=0;used.size<50;i++)used.add(legacyLevels[(12+23*i)%legacyLevels.length].id);
 for(const id of historicIds)used.add(id);
 for(const group of [browserBatch051to100,browserBatch110to159,browserBatch160to209,
  browserBatch210to259,browserBatch260to309,browserBatch310to359,
  browserBatch360to409,browserBatch410to459,browserBatch460to509])
  for(const m of group)used.add(m.id);
 if(used.size!==509)throw Error('Couverture antérieure incohérente : '+used.size+'/509');
 const fresh=legacyLevels.filter(m=>!used.has(m.id)).slice(0,50);
 if(fresh.length!==50||new Set(fresh.map(m=>m.id)).size!==50)
  throw Error('Lot 510–559 invalide');
 return fresh;
}
const browserBatch510to559=nextBrowserBatch510to559();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 510–559 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('25 missions : 3 essais, 3 aides, simulation et corrigé — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const mission of browserBatch510to559.slice(group*25,(group+1)*25)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : réponse absente').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : exploration prématurée').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé prématuré').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée après erreur').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé après un essai').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé révélé').toBeHidden();
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : schéma qualitatif absent').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : fuite numérique SVG').toHaveCount(0);
     const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,view:innerWidth}));
     expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.view+2);
     expect(errors,mission.id+' : erreur JS').toEqual([]);
     for(let i=0;i<3;i++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé avant 3 essais').toBeDisabled();
     for(let i=0;i<2;i++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé inaccessible après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé absent après 3+3').toBeVisible();
     expect(errors,mission.id+' : exception après validation').toEqual([]);
    }
   });
  }
  test('clavier : lien d’évitement et Entrée sur cinq missions',async({page})=>{
   test.setTimeout(90_000);
   for(const mission of browserBatch510to559.slice(0,5)){
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip'),mission.id+' : lien d’évitement').toBeFocused();
    const answer=page.locator('#answer');await answer.focus();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await answer.fill(String(wrong));await answer.press('Enter');
    await expect(page.locator('#trialValue'),mission.id+' : Entrée sans effet').toBeEnabled();
    await expect(page.locator('#solution'),mission.id+' : corrigé prématuré').toBeDisabled();
   }
  });
 });
}


/* Lot final 560–597 : couverture des 38 dernières missions du catalogue.
 * Le test de non-duplication verrouille le total de 597. Chromium sur bureau
 * et Android émulé : aucune certification d'accessibilité physique/RGAA.
 */
function nextBrowserBatch560to597(){
 const first=catalog.worlds.map(w=>legacyLevels.find(m=>m.world===w.id));
 for(let i=0;first.length<25;i++){
  const m=legacyLevels[Math.round(i*(legacyLevels.length-1)/24)];
  if(!first.some(x=>x.id===m.id))first.push(m);
 }
 const used=new Set(first.map(m=>m.id));
 for(let i=0;used.size<50;i++)used.add(legacyLevels[(12+23*i)%legacyLevels.length].id);
 for(const id of historicIds)used.add(id);
 for(const group of [browserBatch051to100,browserBatch110to159,browserBatch160to209,
  browserBatch210to259,browserBatch260to309,browserBatch310to359,
  browserBatch360to409,browserBatch410to459,browserBatch460to509,browserBatch510to559])
  for(const m of group)used.add(m.id);
 if(used.size!==559)throw Error('Couverture antérieure incohérente : '+used.size+'/559');
 const fresh=legacyLevels.filter(m=>!used.has(m.id));
 if(fresh.length!==38||new Set(fresh.map(m=>m.id)).size!==38)
  throw Error('Dernier lot non distinct : '+fresh.length+'/38');
 for(const m of fresh)used.add(m.id);
 if(legacyLevels.length!==597||used.size!==597)
  throw Error('Recette complète incohérente : '+used.size+'/597');
 return fresh;
}
const browserBatch560to597=nextBrowserBatch560to597();
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('lot navigateur 560–597 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  for(let group=0;group<2;group++){
   test('19 missions : 3 essais, 3 aides, exploration et corrigé — lot '+(group+1),async({page})=>{
    test.setTimeout(180_000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const mission of browserBatch560to597.slice(group*19,(group+1)*19)){
     errors.length=0;
     await page.goto('http://127.0.0.1:4173/'+mission.url);
     await expect(page.locator('#answer'),mission.id+' : réponse absente').toBeVisible();
     await expect(page.locator('#trialValue'),mission.id+' : exploration prématurée').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé initial accessible').toBeDisabled();
     const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
     await page.locator('#answer').fill(String(wrong));
     await page.locator('#calc button[type="submit"]').click();
     await expect(page.locator('#trialValue'),mission.id+' : exploration bloquée après erreur').toBeEnabled();
     await expect(page.locator('#trial'),mission.id+' : verdict prématuré').toBeDisabled();
     await expect(page.locator('#solution'),mission.id+' : corrigé après un essai').toBeDisabled();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé dévoilé').toBeHidden();
     await page.locator('#trialValue').evaluate(el=>{
      el.value=el.min;el.dispatchEvent(new Event('input',{bubbles:true}));
     });
     const svg=page.locator('figure svg').first();
     await expect(svg,mission.id+' : schéma absent').toBeVisible();
     await expect(svg.locator('[data-result]'),mission.id+' : fuite numérique SVG').toHaveCount(0);
     const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,view:innerWidth}));
     expect(width.doc,mission.id+' : débordement horizontal').toBeLessThanOrEqual(width.view+2);
     expect(errors,mission.id+' : erreur JS après exploration').toEqual([]);
     for(let i=0;i<3;i++)await page.locator('#hint').click();
     await expect(page.locator('#solution'),mission.id+' : corrigé avant 3 essais').toBeDisabled();
     for(let i=0;i<2;i++){
      await page.locator('#answer').fill(String(wrong));
      await page.locator('#calc button[type="submit"]').click();
     }
     await expect(page.locator('#solution'),mission.id+' : corrigé inaccessible après 3+3').toBeEnabled();
     await page.locator('#solution').click();
     await expect(page.locator('#solutionText'),mission.id+' : corrigé absent après 3+3').toBeVisible();
     expect(errors,mission.id+' : erreur JS après 3+3').toEqual([]);
    }
   });
  }
  test('clavier : lien d’évitement et validation Entrée sur cinq missions',async({page})=>{
   test.setTimeout(90_000);
   for(const mission of browserBatch560to597.slice(0,5)){
    await page.goto('http://127.0.0.1:4173/'+mission.url);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip'),mission.id+' : lien évitement').toBeFocused();
    const answer=page.locator('#answer');await answer.focus();
    const wrong=await page.evaluate(()=>Math.abs(window.SI_MISSION.expected)*1e6+1e6);
    await answer.fill(String(wrong));await answer.press('Enter');
    await expect(page.locator('#trialValue'),mission.id+' : Entrée sans effet').toBeEnabled();
    await expect(page.locator('#solution'),mission.id+' : corrigé prématuré').toBeDisabled();
   }
  });
 });
}


// Recette explicite des nouvelles missions : la sélection historique des 597
// ne suffit pas à démontrer le fonctionnement des pages 598–602.
for(const device of [
 {name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},
 {name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}
]){
 test.describe('missions 598–602 — '+device.name,()=>{
  test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});
  test('cinq calculs nominaux, navigation et graphiques débloqués',async({page})=>{
   test.setTimeout(120_000);
   const meta=require('../src/batch598-602.js').meta;
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   for(const mission of meta){
    errors.length=0;
    await page.goto('http://127.0.0.1:4173/missions/'+mission.id+'.html');
    await expect(page.locator('h1')).toContainText(mission.title);
    await expect(page.locator('#solution')).toBeDisabled();
    await expect(page.locator('#trialValue')).toBeDisabled();
    await page.locator('#answer').fill(String(mission.expected));
    await page.locator('#calc button[type="submit"]').click();
    await expect(page.locator('#feedback')).toContainText('Calcul juste');
    await expect(page.locator('#trialValue')).toBeEnabled();
    await expect(page.locator('figure svg').first()).toBeVisible();
    expect(errors,mission.id+' : erreur JavaScript').toEqual([]);
   }
  });
 });
}

// Lot 603–607 : navigateur desktop et Android émulé, pas appareils physiques.
for(const device of [{name:'desktop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},{name:'android-emule',viewport:{width:390,height:844},isMobile:true,hasTouch:true}]){test.describe('missions 603–607 — '+device.name,()=>{test.use({viewport:device.viewport,isMobile:device.isMobile,hasTouch:device.hasTouch});test('cinq calculs nominaux et schémas',async({page})=>{test.setTimeout(120_000);const meta=require('../src/batch603-607.js').meta,errors=[];page.on('pageerror',e=>errors.push(e.message));for(const m of meta){errors.length=0;await page.goto('http://127.0.0.1:4173/missions/'+m.id+'.html');await expect(page.locator('h1')).toContainText(m.title);await expect(page.locator('#solution')).toBeDisabled();await expect(page.locator('#trialValue')).toBeDisabled();await page.locator('#answer').fill(String(m.expected));await page.locator('#calc button[type="submit"]').click();await expect(page.locator('#feedback')).toContainText('Calcul juste');await expect(page.locator('#trialValue')).toBeEnabled();await expect(page.locator('figure svg').first()).toBeVisible();const w=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,view:innerWidth}));expect(w.doc,m.id+' débordement').toBeLessThanOrEqual(w.view+2);expect(errors,m.id+' erreurs JS').toEqual([]);}});});}

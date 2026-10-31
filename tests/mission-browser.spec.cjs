'use strict';
// Recette Chromium : émulation de viewport et interactions réelles.
// Ces scénarios ne remplacent ni les appareils physiques ni NVDA/TalkBack/VoiceOver.
const {test,expect}=require('@playwright/test');
const catalog=require('../src/catalog.js');

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
   const missions=catalog.worlds.map(w=>catalog.levels.find(m=>m.world===w.id));
   for(let i=0;missions.length<25;i++){
    const candidate=catalog.levels[Math.round(i*(catalog.levels.length-1)/24)];
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
   const original=catalog.worlds.map(w=>catalog.levels.find(m=>m.world===w.id));
   for(let i=0;original.length<25;i++){
    const candidate=catalog.levels[Math.round(i*(catalog.levels.length-1)/24)];
    if(!original.some(m=>m.id===candidate.id))original.push(candidate);
   }
   const used=new Set(original.map(m=>m.id)),additional=[];
   for(let i=0;additional.length<25&&i<catalog.levels.length;i++){
    const candidate=catalog.levels[(12+23*i)%catalog.levels.length];
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
 const original=catalog.worlds.map(w=>catalog.levels.find(m=>m.world===w.id));
 for(let i=0;original.length<25;i++){
  const candidate=catalog.levels[Math.round(i*(catalog.levels.length-1)/24)];
  if(!original.some(m=>m.id===candidate.id))original.push(candidate);
 }
 const used=new Set(original.map(m=>m.id));
 const additional=[];
 for(let i=0;additional.length<25&&i<catalog.levels.length;i++){
  const candidate=catalog.levels[(12+23*i)%catalog.levels.length];
  if(!used.has(candidate.id)){used.add(candidate.id);additional.push(candidate);}
 }
 const fresh=[];
 for(let i=0;fresh.length<50&&i<catalog.levels.length;i++){
  const candidate=catalog.levels[(17+31*i)%catalog.levels.length];
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
 const original=catalog.worlds.map(w=>catalog.levels.find(m=>m.world===w.id));
 for(let i=0;original.length<25;i++){
  const candidate=catalog.levels[Math.round(i*(catalog.levels.length-1)/24)];
  if(!original.some(m=>m.id===candidate.id))original.push(candidate);
 }
 const used=new Set(original.map(m=>m.id));
 const second=[];
 for(let i=0;second.length<25&&i<catalog.levels.length;i++){
  const candidate=catalog.levels[(12+23*i)%catalog.levels.length];
  if(!used.has(candidate.id)){used.add(candidate.id);second.push(candidate);}
 }
 for(const mission of browserBatch051to100)used.add(mission.id);
 for(const id of historicIds)used.add(id);
 if(used.size!==109)throw new Error('La couverture précédente doit comprendre 109 missions uniques');
 const fresh=[];
 for(let i=0;fresh.length<50&&i<catalog.levels.length;i++){
  const candidate=catalog.levels[(53+37*i)%catalog.levels.length];
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
 const original=catalog.worlds.map(w=>catalog.levels.find(m=>m.world===w.id));
 for(let i=0;original.length<25;i++){
  const candidate=catalog.levels[Math.round(i*(catalog.levels.length-1)/24)];
  if(!original.some(m=>m.id===candidate.id))original.push(candidate);
 }
 const used=new Set(original.map(m=>m.id));
 for(let i=0;used.size<50&&i<catalog.levels.length;i++){
  used.add(catalog.levels[(12+23*i)%catalog.levels.length].id);
 }
 for(const mission of browserBatch051to100)used.add(mission.id);
 for(const id of historicIds)used.add(id);
 for(const mission of browserBatch110to159)used.add(mission.id);
 if(used.size!==159)throw new Error('Couverture précédente incohérente : '+used.size+'/159');
 const fresh=[];
 for(let i=0;fresh.length<50&&i<catalog.levels.length;i++){
  const candidate=catalog.levels[(89+41*i)%catalog.levels.length];
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
 const original=catalog.worlds.map(w=>catalog.levels.find(m=>m.world===w.id));
 for(let i=0;original.length<25;i++){
  const candidate=catalog.levels[Math.round(i*(catalog.levels.length-1)/24)];
  if(!original.some(m=>m.id===candidate.id))original.push(candidate);
 }
 const used=new Set(original.map(m=>m.id));
 for(let i=0;used.size<50&&i<catalog.levels.length;i++)
  used.add(catalog.levels[(12+23*i)%catalog.levels.length].id);
 for(const m of browserBatch051to100)used.add(m.id);
 for(const id of historicIds)used.add(id);
 for(const m of browserBatch110to159)used.add(m.id);
 for(const m of browserBatch160to209)used.add(m.id);
 if(used.size!==209)throw new Error('Couverture initiale 210–259 incorrecte : '+used.size);
 const fresh=[];
 for(let i=0;fresh.length<50&&i<catalog.levels.length;i++){
  const candidate=catalog.levels[(137+43*i)%catalog.levels.length];
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
 const first=catalog.worlds.map(w=>catalog.levels.find(m=>m.world===w.id));
 for(let i=0;first.length<25;i++){
  const m=catalog.levels[Math.round(i*(catalog.levels.length-1)/24)];
  if(!first.some(x=>x.id===m.id))first.push(m);
 }
 const used=new Set(first.map(m=>m.id));
 for(let i=0;used.size<50&&i<catalog.levels.length;i++)
  used.add(catalog.levels[(12+23*i)%catalog.levels.length].id);
 for(const id of historicIds)used.add(id);
 for(const group of [browserBatch051to100,browserBatch110to159,browserBatch160to209,browserBatch210to259])
  for(const m of group)used.add(m.id);
 if(used.size!==259)throw new Error('Couverture précédente non unique : '+used.size+'/259');
 const fresh=[];
 for(let i=0;fresh.length<50&&i<catalog.levels.length;i++){
  const m=catalog.levels[(173+47*i)%catalog.levels.length];
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

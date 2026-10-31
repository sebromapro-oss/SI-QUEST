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

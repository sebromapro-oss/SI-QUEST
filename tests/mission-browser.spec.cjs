'use strict';
// Recette Chromium : émulation de viewport et interactions réelles.
// Ces scénarios ne remplacent ni les appareils physiques ni NVDA/TalkBack/VoiceOver.
const {test,expect}=require('@playwright/test');

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
    await expect(page.locator('#feedback')).toContainText('essai '+attempt+'/3').catch(async()=>{
     // Le feedback pédagogique est distinct du carnet des essais.
     await expect(page.locator('#log li').last()).toContainText('essai '+attempt+'/3');
    });
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

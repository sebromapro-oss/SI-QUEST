const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
fs.mkdirSync('artifacts',{recursive:true});
const devices=[
 {name:'desktop',viewport:{width:1440,height:900}},
 {name:'android-portrait',viewport:{width:390,height:844},isMobile:true,hasTouch:true},
 {name:'iphone-portrait',viewport:{width:375,height:812},isMobile:true,hasTouch:true},
 {name:'tablet-landscape',viewport:{width:1024,height:768},isMobile:true,hasTouch:true},
];
for(const device of devices){
 test.describe(device.name,()=>{
 test.use({viewport:device.viewport,isMobile:device.isMobile||false,hasTouch:device.hasTouch||false});
 test('affiche les 17 univers, ouvre les missions et revient au jeu',async({page},testInfo)=>{
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.locator('#islands button.island')).toHaveCount(17);
  await expect(page.locator('#world-list button')).toHaveCount(17);
  await page.locator('#play-btn').click();
  await expect(page.locator('#world-dialog')).toBeVisible();
  await expect(page.locator('#dialog-missions a').first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#world-dialog')).toBeHidden();
  await page.locator('#world-list button').nth(5).click();
  await expect(page.locator('#dialog-title')).toContainText('HYDRAULIQUE');
  await page.locator('#dialog-close').click();
  await expect(page.locator('#world-dialog')).toBeHidden();
  await page.screenshot({path:'artifacts/'+device.name+'.png',fullPage:true});
 });
 test('aucun débordement horizontal au document',async({page})=>{
  await page.goto('http://127.0.0.1:4173/');
  const width=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,view:innerWidth}));
  expect(width.doc).toBeLessThanOrEqual(width.view+2);
 });
 test('fenêtre modale : Échap et retour du focus',async({page})=>{
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#settings-open').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#settings-dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#settings-open')).toBeFocused();
 });
 });
}

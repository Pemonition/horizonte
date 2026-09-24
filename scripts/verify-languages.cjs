const {chromium}=require('C:/Users/hugoj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const context=await browser.newContext({locale:'pt-BR',viewport:{width:1440,height:1000}});
  const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
  const fixture={collection:{items:[{data:[{nasa_id:'language-test',title:'NASA original title',description:'NASA original description',date_created:'2024-01-01',center:'NASA'}],links:[{href:'https://images-assets.nasa.gov/image/art002e009280b/art002e009280b~large.jpg',rel:'preview'}]}]}};
  await page.route('https://images-api.nasa.gov/**',route=>route.fulfill({json:fixture}));
  await page.goto('http://127.0.0.1:4205');
  const select=page.getByTestId('language-select');await select.waitFor();
  const codes=['es','pt','en','nl','de','it','fr'];const out=path.join(__dirname,'../docs/verificacao');
  for(const code of codes){
   const catalog=JSON.parse(fs.readFileSync(path.join(__dirname,'../src/app/i18n',code+'.json'),'utf8'));
   await select.selectOption(code);
   await page.getByRole('link',{name:catalog['Explorar'],exact:true}).waitFor();
   await page.waitForFunction(expected=>document.title===expected,catalog['Explorar']+' · Horizonte');
   assert.equal(await page.locator('html').getAttribute('lang'),{pt:'pt-BR',nl:'nl-NL',de:'de-DE',it:'it-IT',fr:'fr-FR'}[code]??code);
   assert((await page.locator('h1').innerText()).includes(catalog['O universo é maior']));
   if(['es','pt','en'].includes(code)) await page.screenshot({path:path.join(out,'idioma-'+code+'.png')});
   await page.setViewportSize({width:390,height:844});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow: '+code);
   await page.goto('http://127.0.0.1:4205/diario');
   await page.getByRole('heading',{name:catalog['Seu diário de bordo.'],exact:true}).waitFor();
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'diary overflow: '+code);
   await page.locator('nav a[routerlink="/explorar"]').click();await page.locator('app-explore').waitFor();
   await page.setViewportSize({width:1440,height:1000});
  }
  await select.selectOption('es');await page.reload();await select.waitFor();assert.equal(await select.inputValue(),'es');
  await page.locator('app-discovery-card button').first().click();
  await page.goto('http://127.0.0.1:4205/diario');await page.locator('input[name="title"]').fill('Mi primera observación');
  await page.locator('select[name="discovery"]').selectOption('language-test');await page.locator('textarea').fill('Este texto personal debe conservarse al cambiar el idioma.');
  await select.selectOption('en');assert.equal(await page.locator('input[name="title"]').inputValue(),'Mi primera observación');
  await page.getByRole('button',{name:'Record observation ↗'}).click();await page.getByRole('heading',{name:'Mi primera observación'}).waitFor();
  await select.selectOption('pt');await page.getByText('Observação registrada no diário.').waitFor();
  await page.locator('nav a[routerlink="/colecao"]').click();await page.getByText('1 de 1 descobertas').waitFor();
  await page.locator('app-discovery-card a').first().click();await page.getByText('NASA original description',{exact:true}).waitFor();
  await select.selectOption('en');await page.getByText('Original NASA description (English)').waitFor();
  assert.equal(await page.getByText('NASA original description',{exact:true}).count(),1);
  await page.goto('http://127.0.0.1:4205/missing');await page.getByText('404 / OUT OF ORBIT',{exact:true}).waitFor();
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(out,'idiomas.json'),JSON.stringify({passed:true,languages:codes,checks:['translated navigation and headings','document language and titles','mobile 390px','persisted preference','preserved form and journal','translated success and counts','original NASA text preserved','localized 404'],pageErrors:errors},null,2));
  console.log('PASS: 7 languages, mobile layout, persistence, form, original NASA data and 404.');
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

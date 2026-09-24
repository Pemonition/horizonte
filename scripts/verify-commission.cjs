const {chromium}=require('C:/Users/hugoj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({locale:'es',viewport:{width:1440,height:1100},acceptDownloads:true});const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
  const base='http://127.0.0.1:4205';const out=path.join(__dirname,'../docs/verificacao');
  await page.route('https://images-api.nasa.gov/**',route=>route.fulfill({json:{collection:{items:[{data:[{nasa_id:'cosmos-test',title:'Cosmic inspiration',description:'Original NASA description',date_created:'2026-01-01',center:'NASA'}],links:[{href:'https://images-assets.nasa.gov/image/art002e009280b/art002e009280b~large.jpg',rel:'preview'}]}]}}}));
  await page.goto(base+'/arquivo/encomenda');await page.getByRole('link',{name:'Encontrar un descubrimiento'}).waitFor();assert.equal(await page.locator('form').count(),0);
  await page.goto(base+'/descoberta/cosmos-test');await page.locator('app-detail article button.primary').click();await page.goto(base+'/arquivo/encomenda?inspiracao=cosmos-test');await page.locator('form').waitFor();
  assert.equal(await page.locator('select[name="inspiration"]').inputValue(),'cosmos-test');
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('horizonte.saved')).length),1);
  const submit=page.locator('button[type="submit"]');const save=page.getByRole('button',{name:'Guardar borrador del pedido'});assert(await save.isDisabled());
  await page.locator('input[name="name"]').fill('Ana Test');await page.locator('input[name="email"]').fill('bad-email');
  await page.locator('select[name="size"]').selectOption('50x70');await page.locator('select[name="style"]').selectOption('cosmic');
  await page.locator('textarea').fill('Quiero una obra con tonos azules y curvas que recuerden un corazón.');assert(await save.isDisabled());
  await page.locator('input[name="email"]').fill('ana@example.com');assert(await save.isEnabled());
  for(const code of ['es','pt','en','nl','de','it','fr']){
   await page.getByTestId('language-select').selectOption(code);const catalog=JSON.parse(fs.readFileSync(path.join(__dirname,'../src/app/i18n',code+'.json'),'utf8'));
   await page.getByRole('heading',{name:catalog['commission.title'],exact:true}).waitFor();
   assert.equal(await page.locator('input[name="name"]').inputValue(),'Ana Test');
   await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+code);
   if(code==='es')await page.screenshot({path:path.join(out,'encomenda-mobile.png'),fullPage:true});
  }
  await page.getByTestId('language-select').selectOption('es');await page.setViewportSize({width:1440,height:1100});
  await save.click();await page.getByText('Borrador creado en este navegador. No se ha enviado ningún pedido al artista.').waitFor();
  await page.reload();await page.getByRole('heading',{name:'Cosmic inspiration',exact:true}).waitFor();
  await page.screenshot({path:path.join(out,'encomenda-desktop.png'),fullPage:true});
  const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Descargar pedido (.txt)'}).click();const download=await downloadPromise;
  const contents=fs.readFileSync(await download.path(),'utf8');assert(contents.includes('ana@example.com'));assert(contents.includes('50x70 cm'));assert(contents.includes('No se envía al artista'));
  await page.getByRole('button',{name:'Eliminar borrador',exact:true}).click();await page.getByRole('button',{name:'Confirmar eliminación'}).click();await page.getByRole('heading',{name:'Cosmic inspiration',exact:true}).waitFor({state:'hidden'});
  await page.reload();assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('horizonte.commissions')).length),0);
  // Old notes remain available, but no longer occupy the main navigation.
  await page.evaluate(()=>localStorage.setItem('horizonte.entries',JSON.stringify([{id:'legacy',title:'Old note',body:'Preserved private note',discoveryId:'cosmos-test',discoveryTitle:'Cosmic inspiration',createdAt:'2026-01-01'}])));
  await page.reload();await page.getByRole('link',{name:'Ver notas del diario anterior'}).click();await page.getByRole('heading',{name:'Old note'}).waitFor();
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'encomenda.json'),JSON.stringify({passed:true,languages:7,checks:['empty collection','preselected inspiration','contact validation','seven languages and mobile','draft persistence','text download','delete confirmation','legacy notes preserved'],pageErrors:errors},null,2));
  console.log('PASS: custom request form, seven languages, mobile, download, persistence, deletion and legacy notes.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

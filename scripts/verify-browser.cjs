const {chromium}=require('C:/Users/hugoj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({locale:'pt-BR',viewport:{width:1440,height:1050}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base='http://127.0.0.1:4205';const out=path.join(__dirname,'../docs/verificacao');fs.mkdirSync(out,{recursive:true});
 await page.route('https://images-api.nasa.gov/**',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({collection:{items:[{data:[{nasa_id:'test-nebula',title:'Nebula - registro de teste',description:'Deterministic browser test fixture.',date_created:'2024-01-01',center:'NASA'}],links:[{href:'https://images-assets.nasa.gov/image/art002e009280b/art002e009280b~large.jpg',rel:'preview'}]}]}})}));
 await page.goto(base);await page.locator('app-discovery-card').first().waitFor({timeout:45000});
 assert.equal(await page.locator('nav a[aria-current="page"]').innerText(),'Explorar');
 await page.screenshot({path:path.join(out,'desktop-test.png'),fullPage:false});
 const first=page.locator('app-discovery-card').first();await first.getByRole('button').click();
 await page.getByRole('link',{name:/Coleção/}).click();await page.locator('app-collection app-discovery-card').waitFor();assert.equal(await page.locator('app-discovery-card').count(),1);
 await page.getByPlaceholder('Título ou centro de pesquisa').fill('zzzzzzz');await page.getByText('Nenhum resultado com esse filtro.').waitFor();
 await page.getByPlaceholder('Título ou centro de pesquisa').fill('');
 await page.locator('app-discovery-card').first().getByRole('link',{name:/Ver descoberta/}).click();
 await page.getByRole('link',{name:/Ver fonte e créditos/}).waitFor();await page.reload();await page.getByRole('link',{name:/Ver fonte e créditos/}).waitFor();
 await page.goto(base+'/diario');await page.getByRole('heading',{name:'Nova observação'}).waitFor();const submit=page.getByRole('button',{name:/Registrar observação/});assert(await submit.isDisabled());
 await page.getByLabel('Título',{exact:true}).fill('Meu primeiro horizonte');await page.getByLabel('Descoberta vinculada').selectOption({index:1});await page.getByLabel('Sua observação',{exact:true}).fill('A escala do espaço muda a maneira como vejo nossa casa.');assert(await submit.isEnabled());await submit.click();await page.getByRole('heading',{name:'Meu primeiro horizonte'}).waitFor();
 await page.reload();await page.getByRole('heading',{name:'Meu primeiro horizonte'}).waitFor();
 await page.screenshot({path:path.join(out,'diario.png'),fullPage:true});
 await page.getByRole('button',{name:'Excluir observação',exact:true}).click();await page.getByRole('button',{name:'Confirmar exclusão'}).click();await page.getByRole('heading',{name:'Meu primeiro horizonte'}).waitFor({state:'hidden'});assert.equal(await page.getByRole('heading',{name:'Meu primeiro horizonte'}).count(),0);
 await page.setViewportSize({width:390,height:844});await page.getByRole('link',{name:'Explorar',exact:true}).click();await page.locator('app-discovery-card').first().waitFor();await page.screenshot({path:path.join(out,'mobile.png'),fullPage:false});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile overflow');
 await page.goto(base+'/rota-inexistente');await page.getByText('404 / FORA DA ÓRBITA').waitFor();
 // Deterministic API fixtures: live NASA access was checked separately.
 await page.unroute('https://images-api.nasa.gov/**');await page.route('https://images-api.nasa.gov/**',r=>r.fulfill({status:503,contentType:'application/json',body:'{}'}));await page.goto(base+'/explorar');await page.getByRole('button',{name:'Tentar novamente'}).waitFor();
 await page.unroute('https://images-api.nasa.gov/**');await page.route('https://images-api.nasa.gov/**',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({collection:{items:[]}})}));await page.getByRole('button',{name:'Tentar novamente'}).click();await page.getByText(/Nenhuma descoberta encontrada/).waitFor();
 await page.goto(base+'/descoberta/id-inexistente');await page.getByText('REGISTRO NÃO ENCONTRADO').waitFor();
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'resultado.json'),JSON.stringify({passed:true,checks:['API simulada para fluxos determinísticos','menu ativo','salvar','filtrar','detalhe e recarga','formulário','persistência','exclusão','mobile 390px sem overflow','404','erro e retry','busca vazia','ID inexistente'],pageErrors:errors},null,2));console.log('PASS: 13 browser checks; no page errors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});

const {chromium}=require('C:/Users/hugoj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true}); const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://images-api.nasa.gov/**',r=>r.fulfill({json:{collection:{items:[]}}}));
 await page.goto('http://127.0.0.1:4205/explorar');await page.locator('[data-testid=language-select]').selectOption('es');await page.locator('.expedition-hero').waitFor();await page.screenshot({path:'docs/verificacao/lado-a-desktop.png'});
 const hero=await page.evaluate(async()=>{const i=new Image();i.src='/expedition-hero.png';await i.decode();return i.naturalWidth;});if(!hero)throw Error('Missing hero');
 await page.goto('http://127.0.0.1:4205/encomenda');await page.waitForURL('**/produtos');const button=page.locator('form button');if(await button.isEnabled())throw Error('Invalid form enabled');
 await page.locator('input[name=name]').fill('Ana');await page.locator('textarea[name=goal]').fill('Quiero entender cómo diseñar una misión espacial.');await page.locator('select[name=topic]').selectOption('engineering');await page.locator('select[name=product]').selectOption('kit');
 const downloadPromise=page.waitForEvent('download');await button.click();const download=await downloadPromise;const filename=await download.path();const plan=fs.readFileSync(filename,'utf8');if(!plan.includes('Ingeniería de una misión')||!plan.includes('Kits de misión'))throw Error('Wrong plan');
 await page.screenshot({path:'docs/verificacao/lado-a-productos.png',fullPage:true});
 for(const lang of ['es','pt','en','nl','de','it','fr']){
 await page.locator('input[name=name]').fill('Ana');await page.locator('[data-testid=language-select]').selectOption(lang);if(await page.locator('input[name=name]').inputValue()!=='Ana')throw Error('Language lost form');
 await page.setViewportSize({width:390,height:844});
 for(const route of ['explorar','aprender','produtos']){await page.goto('http://127.0.0.1:4205/'+route);if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+lang+' '+route);if(await page.locator('main').innerText().then(t=>/a\.(shop|learn|head|tag|form|physics)/.test(t)))throw Error('Untranslated '+lang);}
 }
 await page.locator('[data-testid=language-select]').selectOption('es');await page.goto('http://127.0.0.1:4205/explorar');await page.screenshot({path:'docs/verificacao/lado-a-mobile.png',fullPage:true});
 if(errors.length)throw Error(errors.join('\n'));await browser.close();console.log('PASS: 7 languages, 3 routes at 390px, hero, redirect, validation, recommendation, download, no runtime errors');
})().catch(e=>{console.error(e);process.exit(1)});


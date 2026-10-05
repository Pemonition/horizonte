const {chromium}=require('C:/Users/hugoj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
const p=await b.newPage({viewport:{width:1440,height:1100}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://127.0.0.1:4205/aprender');
for(const lang of ['pt','es','en','nl','de','it','fr']){
 await p.getByTestId('language-select').selectOption(lang);const d=JSON.parse(fs.readFileSync('src/app/i18n/'+lang+'.json','utf8'));
 await p.getByRole('heading',{name:d['l.title'],exact:true}).waitFor();
 await p.locator('#light-distance').fill('12');await p.waitForFunction(()=>document.querySelector('p[aria-live]').textContent.includes('12'));
 await p.getByRole('button',{name:d['l.instant'],exact:true}).click();assert.equal(await p.locator('progress').getAttribute('value'),'0');await p.getByText(d['l.retry'],{exact:true}).waitFor();
 await p.getByRole('button',{name:d['l.eight'],exact:true}).click();await p.waitForFunction(()=>document.querySelector('progress').value===1);assert(await p.getByRole('button',{name:d['l.eight'],exact:true}).isDisabled());
 await p.getByRole('button',{name:d['l.reset'],exact:true}).click();await p.waitForFunction(()=>document.querySelector('#light-distance').value==='4');
 await p.setViewportSize({width:390,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
}
await p.getByTestId('language-select').selectOption('pt');await p.screenshot({path:'docs/verificacao/missao-mobile.png',fullPage:true});await p.setViewportSize({width:1440,height:1100});await p.screenshot({path:'docs/verificacao/missao-desktop.png',fullPage:true});
await p.goto('http://127.0.0.1:4205/explorar');await p.locator('.hero-wordmark').screenshot({path:'docs/verificacao/titulo-faixa.png'});assert.deepEqual(errors,[]);console.log('PASS: seven languages, slider, incorrect/correct feedback, completion lock, reset, mobile and runtime');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});

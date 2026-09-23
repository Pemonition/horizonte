const { chromium } = require('C:/Users/hugoj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1400,height:1000}});
 for(const [name,url] of [['nasa-interface','https://www.nasa.gov/'],['esa-interface','https://www.esa.int/']]){
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
  await page.screenshot({path:path.join(__dirname,'../docs/referencias',name+'.png')});
  console.log(name,await page.title());
 }
 await browser.close();
})();

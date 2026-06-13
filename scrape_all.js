import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const requests = [];
  
  page.on('response', response => {
    requests.push({
        url: response.url(),
        type: response.request().resourceType()
    });
  });

  await page.goto('https://www.15perf70.com/reelscans-1', { waitUntil: 'domcontentloaded' });
  
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  });

  await new Promise(resolve => setTimeout(resolve, 5000));
  
  fs.writeFileSync('all_requests.json', JSON.stringify(requests, null, 2));
  await browser.close();
})();

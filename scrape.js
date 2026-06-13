import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const videoUrls = new Set();
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('.mp4') || url.includes('video.wixstatic.com/video')) {
      videoUrls.add(url);
    }
  });

  console.log("Navigating to page...");
  try {
    await page.goto('https://www.15perf70.com/reelscans-1', { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch (e) {
    console.log("Navigation timeout, but continuing...");
  }
  
  console.log("Waiting 5s for initial load...");
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log("Scrolling...");
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

  console.log("Waiting 5s for videos to load...");
  await new Promise(resolve => setTimeout(resolve, 5000));

  const domVideos = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('video')).map(v => v.src || (v.querySelector('source') && v.querySelector('source').src));
  });
  
  // also extract titles mapping to videos if possible
  const data = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('h4, video'));
    let result = [];
    let currentTitle = "Unknown";
    for (let el of elements) {
      if (el.tagName === 'H4') {
        currentTitle = el.innerText;
      } else if (el.tagName === 'VIDEO') {
        const src = el.src || (el.querySelector('source') && el.querySelector('source').src);
        if (src) {
           result.push({ title: currentTitle, url: src });
        }
      }
    }
    return result;
  });

  const finalData = {
    networkUrls: [...videoUrls],
    domVideos: domVideos.filter(Boolean),
    mapped: data
  };

  fs.writeFileSync('scraped_videos.json', JSON.stringify(finalData, null, 2));
  console.log("Done.");
  await browser.close();
})();

const fs = require('fs');
const https = require('https');

const urls = [
  'https://70mmfilmcellar.weebly.com/interstellar.html',
  'https://70mmfilmcellar.weebly.com/batman-begins.html',
  'https://70mmfilmcellar.weebly.com/the-dark-knight.html',
  'https://70mmfilmcellar.weebly.com/the-dark-knight-rises.html',
  'https://70mmfilmcellar.weebly.com/dunkirk.html',
  'https://70mmfilmcellar.weebly.com/inception.html',
  'https://70mmfilmcellar.weebly.com/tenet.html',
  'https://70mmfilmcellar.weebly.com/oppenheimer.html'
];

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrape() {
  const results = [];
  
  for (const url of urls) {
    const html = await fetchUrl(url);
    const movieName = url.split('/').pop().replace('.html', '').replace(/-/g, ' ').toUpperCase();
    
    const regex = /(?:src|href)=['"](\/uploads\/[^'"]+\.(?:jpg|png|jpeg)[^'"]*)['"]/gi;
    let match;
    let count = 0;
    while ((match = regex.exec(html)) !== null && count < 6) { 
      let imgUrl = match[1];
      if (imgUrl.includes('logo')) continue;
      
      // Clean up query params and _orig
      imgUrl = imgUrl.split('?')[0];
      imgUrl = imgUrl.replace('_orig', '');
      
      if (imgUrl.startsWith('/')) {
        imgUrl = 'https://70mmfilmcellar.weebly.com' + imgUrl;
      }
      
      if (!results.find(r => r.url === imgUrl)) {
          results.push({
            movie: movieName,
            url: imgUrl,
            title: `${movieName} - Cell ${count + 1}`
          });
          count++;
      }
    }
  }
  
  fs.writeFileSync('weebly_scans.json', JSON.stringify(results, null, 2));
  console.log('Saved ' + results.length + ' scans.');
}

scrape();

const fs = require('fs');

const urls = [
  'https://70mmfilmcellar.weebly.com/interstellar.html',
  'https://70mmfilmcellar.weebly.com/interstellar-trailer.html',
  'https://70mmfilmcellar.weebly.com/batman-begins.html',
  'https://70mmfilmcellar.weebly.com/the-dark-knight.html',
  'https://70mmfilmcellar.weebly.com/the-dark-knight-rises.html',
  'https://70mmfilmcellar.weebly.com/dunkirk.html',
  'https://70mmfilmcellar.weebly.com/inception.html'
];

async function scrape() {
  const albums = [];
  
  for (const url of urls) {
    const movieName = url.split('/').pop().replace('.html', '').replace(/-/g, ' ').toUpperCase();
    console.log(`Fetching ${url}...`);
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      const html = await response.text();
      
      const regex = /(?:src|href)=['"](\/uploads\/[^'"]+\.(?:jpg|png|jpeg)[^'"]*)['"]/gi;
      let match;
      const images = [];
      const seen = new Set();
      
      while ((match = regex.exec(html)) !== null) { 
        let imgUrl = match[1];
        if (imgUrl.includes('logo') || imgUrl.includes('weebly')) continue;
        
        imgUrl = imgUrl.split('?')[0].replace('_orig', '');
        
        if (imgUrl.startsWith('/')) {
          imgUrl = 'https://70mmfilmcellar.weebly.com' + imgUrl;
        }
        
        if (!seen.has(imgUrl)) {
          seen.add(imgUrl);
          images.push(imgUrl);
        }
      }
      
      if (images.length > 0) {
        albums.push({
          id: movieName.toLowerCase().replace(/ /g, '-'),
          title: movieName,
          thumbnail: images[0],
          images: images.slice(0, 20) // Take up to 20 images per album to prevent huge arrays
        });
      }
    } catch (e) {
      console.error(`Error fetching ${url}:`, e);
    }
  }
  
  fs.writeFileSync('weebly_albums.json', JSON.stringify(albums, null, 2));
  console.log(`Saved ${albums.length} albums.`);
}

scrape();

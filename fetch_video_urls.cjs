const https = require('https');
https.get('https://www.15perf70.com/reelscans-1', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /(https:\/\/video\.wixstatic\.com\/video\/[a-zA-Z0-9_\-./]+\.mp4[a-zA-Z0-9_\-./?=&]*)/g;
    const matches = [...new Set(data.match(regex))];
    console.log(JSON.stringify(matches, null, 2));
  });
});

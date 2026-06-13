const fs = require('fs');

const html = fs.readFileSync('15perf.html', 'utf8');

// The config looks like data-config-video="{&quot;systemDataSourceType&quot;:...}"
// We need to unescape HTML entities.
function unescapeHTML(str) {
  return str.replace(/&quot;/g, '"');
}

const regex = /data-config-video="([^"]+)"/g;
let match;
const configs = [];
while ((match = regex.exec(html)) !== null) {
  try {
    const jsonStr = unescapeHTML(match[1]);
    const config = JSON.parse(jsonStr);
    configs.push(config);
  } catch (e) {
    // ignore
  }
}

const urls = configs.map(c => {
    // squarespace variants usually look like mp4/1080p.mp4 or mp4/original.mp4
    return c.alexandriaUrl.replace('{variant}', 'mp4/1080p.mp4');
});

console.log(JSON.stringify(urls, null, 2));

// Also let's try to map them to titles
const domRegex = /<h4[^>]*>(.*?)<\/h4>[\s\S]*?data-config-video="([^"]+)"/g;
let m;
const mapped = [];
while ((m = domRegex.exec(html)) !== null) {
   const title = m[1].replace(/<[^>]+>/g, '').trim();
   try {
     const jsonStr = unescapeHTML(m[2]);
     const config = JSON.parse(jsonStr);
     const url = config.alexandriaUrl.replace('{variant}', 'mp4/1080p.mp4');
     mapped.push({ title, url, aspect: config.aspectRatio });
   } catch (e) {}
}

console.log("MAPPED:");
console.log(JSON.stringify(mapped, null, 2));


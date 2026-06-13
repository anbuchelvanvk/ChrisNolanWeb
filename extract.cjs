const fs = require('fs');

const html = fs.readFileSync('weebly.html', 'utf8');

const regex = /src="(\/uploads\/[^"]+\.(?:jpg|png|jpeg)[^"]*)"/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[1]);
}

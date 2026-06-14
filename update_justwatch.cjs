const fs = require('fs');

const jwLinks = {
  "the-odyssey": "https://www.justwatch.com/us/movie/the-odyssey-2026",
  "oppenheimer": "https://www.justwatch.com/us/movie/oppenheimer",
  "tenet": "https://www.justwatch.com/us/movie/tenet",
  "dunkirk": "https://www.justwatch.com/us/movie/dunkirk-2017",
  "interstellar": "https://www.justwatch.com/us/movie/interstellar",
  "the-dark-knight-rises": "https://www.justwatch.com/us/movie/the-dark-knight-rises",
  "inception": "https://www.justwatch.com/us/movie/inception",
  "the-dark-knight": "https://www.justwatch.com/us/movie/batman-the-dark-knight",
  "the-prestige": "https://www.justwatch.com/us/movie/the-prestige",
  "batman-begins": "https://www.justwatch.com/us/movie/batman-begins",
  "insomnia": "https://www.justwatch.com/us/movie/insomnia",
  "memento": "https://www.justwatch.com/us/movie/memento",
  "following": "https://www.justwatch.com/us/movie/following"
};

let m = fs.readFileSync('src/data/movies.js', 'utf8');

for (let id in jwLinks) {
  let link = jwLinks[id];
  let regW = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?whereToWatch:\\s*\\[)([\\s\\S]*?)(\\])`);
  let newW = `\n      { platform: "JustWatch", link: "${link}" }\n    `;
  
  if (m.match(regW)) {
      m = m.replace(regW, `$1${newW}$3`);
  }
}

fs.writeFileSync('src/data/movies.js', m);
console.log('Updated with JustWatch links!');

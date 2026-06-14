const fs = require('fs');

let m = fs.readFileSync('src/data/movies.js', 'utf8');
const w = JSON.parse(fs.readFileSync('movies_wiki.json', 'utf8'));

const map = {
  'oppenheimer': 'Oppenheimer_(film)',
  'tenet': 'Tenet',
  'dunkirk': 'Dunkirk_(2017_film)',
  'interstellar': 'Interstellar_(film)',
  'the-dark-knight-rises': 'The_Dark_Knight_Rises',
  'inception': 'Inception',
  'the-dark-knight': 'The_Dark_Knight',
  'the-prestige': 'The_Prestige',
  'batman-begins': 'Batman_Begins',
  'insomnia': 'Insomnia_(2002_film)',
  'memento': 'Memento_(film)',
  'following': 'Following'
};

for (let id in map) {
  let wd = w[map[id]];
  if (wd) {
    let desc = wd.extract.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
    let regD = new RegExp('(id:\\s*"' + id + '"[\\s\\S]*?description:\\s*)"(?:[^"\\\\]|\\\\.)*"');
    m = m.replace(regD, '$1"' + desc + '"');

    let regI = new RegExp('(id:\\s*"' + id + '"[\\s\\S]*?image:\\s*)(?:import\\.meta\\.env\\.BASE_URL \\+ )?"([^"]*)"');
    if (wd.originalimage) {
      m = m.replace(regI, '$1"' + wd.originalimage + '"');
    }
  }
}

fs.writeFileSync('src/data/movies.js', m);
console.log('movies.js updated successfully!');

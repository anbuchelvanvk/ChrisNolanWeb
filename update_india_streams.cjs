const fs = require('fs');

const primeLinks = {
  "oppenheimer": "https://www.primevideo.com/detail/0IXNZ9GHD9QHJLY8ZM3X933K4F/ref=atv_pp_fi_0",
  "tenet": "https://www.primevideo.com/detail/0SXMIJPJ25O9LQBBHV0Y11PV0B/ref=atv_pp_fi_1",
  "dunkirk": "https://www.primevideo.com/detail/0SXJ3K8EX9UX127M9QJQ5T0P4S/ref=atv_pp_fi_2",
  "interstellar": "https://www.primevideo.com/detail/0PUNMGZEWOMYFKR1XIGOLTL2YM/ref=atv_pp_fi_3",
  "the-dark-knight-rises": "https://www.primevideo.com/detail/0GYYO7X4LITDG4XVDM1VZQGHO5/ref=atv_pp_fi_4",
  "inception": "https://www.primevideo.com/detail/0FFJSDLK6HUWC5T8XJUQODMFJ3/ref=atv_pp_fi_5",
  "the-dark-knight": "https://www.primevideo.com/detail/0JKQMPWCE3RTK5TFZCSIC3H7XO/ref=atv_pp_fi_6",
  "the-prestige": "https://www.primevideo.com/detail/0TN23XKXR5W9N2DTJ3M0WQCUTW/ref=atv_pp_fi_7",
  "batman-begins": "https://www.primevideo.com/detail/0OJRN6C51VLKII3D53UFR1FGG5/ref=atv_pp_fi_8",
  "insomnia": "https://www.primevideo.com/detail/0TFTW5PF8NW92FGAWFO70DFZZQ/ref=atv_pp_fi_9",
  "memento": "https://www.primevideo.com/detail/0OPMF59FGESJWCN50W3KTP7HMH/ref=atv_pp_fi_10",
  "following": "https://www.primevideo.com/detail/0LTR23HRBZHWFPTM6QG3OO3MQS/ref=atv_pp_fi_11"
};

const mapTitle = {
  "oppenheimer": "Oppenheimer",
  "tenet": "Tenet",
  "dunkirk": "Dunkirk",
  "interstellar": "Interstellar",
  "the-dark-knight-rises": "The Dark Knight Rises",
  "inception": "Inception",
  "the-dark-knight": "The Dark Knight",
  "the-prestige": "The Prestige",
  "batman-begins": "Batman Begins",
  "insomnia": "Insomnia",
  "memento": "Memento",
  "following": "Following",
  "the-odyssey": "The Odyssey"
};

let m = fs.readFileSync('src/data/movies.js', 'utf8');

for (let id in mapTitle) {
  let title = mapTitle[id];
  let primeLink = primeLinks[id] || `https://www.primevideo.com/search/ref=atv_sr_sug_1?phrase=${encodeURIComponent(title)}`;
  let netflixLink = `https://www.netflix.com/search?q=${encodeURIComponent(title)}`;
  let hotstarLink = `https://www.hotstar.com/in/explore?search_query=${encodeURIComponent(title)}`;
  
  let newW = `\n      { platform: "Prime Video", link: "${primeLink}" },\n      { platform: "Netflix", link: "${netflixLink}" },\n      { platform: "Hotstar", link: "${hotstarLink}" }\n    `;
  
  let regW = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?whereToWatch:\\s*\\[)([\\s\\S]*?)(\\])`);
  if (m.match(regW)) {
      m = m.replace(regW, `$1${newW}$3`);
  }
}

fs.writeFileSync('src/data/movies.js', m);
console.log('Updated with Prime, Netflix, and Hotstar links!');

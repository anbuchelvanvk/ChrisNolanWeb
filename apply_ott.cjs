const fs = require('fs');

const data = {
  "memento": [
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.7464c9dc-868f-4d01-866d-d28a758157ad?autoplay=0&ref_=atv_cf_strg_wb" }
  ],
  "insomnia": [
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.06fbba8c-67d7-43ff-a0ad-86dbcacd4c75?autoplay=0&ref_=atv_cf_strg_wb" }
  ],
  "batman-begins": [
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.9ea9f6e4-c7d9-319f-e828-d79a8bb85e05?autoplay=0&ref_=atv_cf_strg_wb" },
    { platform: "Hotstar", link: "https://www.hotstar.com/in/movies/batman-begins/1971000399?utm_source=gwa" },
    { platform: "YouTube Movies", link: "https://www.youtube.com/watch?v=dj1917wZpB8" },
    { platform: "Netflix", link: "https://www.netflix.com/title/70021642" }
  ],
  "the-prestige": [
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.f4a9f755-ff35-fd0a-d38e-80f9da908114?autoplay=0&ref_=atv_cf_strg_wb" },
    { platform: "Netflix", link: "https://www.netflix.com/in/title/70047095" },
    { platform: "YouTube Movies", link: "https://www.youtube.com/watch?v=2cKkaQ-kXR4" }
  ],
  "the-dark-knight": [
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.4aa9f68b-5e9d-1955-a451-d4d0087ef56c?autoplay=0&ref_=atv_cf_strg_wb" },
    { platform: "Hotstar", link: "https://www.hotstar.com/in/movies/the-dark-knight/1971000395?utm_source=gwa" },
    { platform: "YouTube Movies", link: "https://www.youtube.com/watch?v=KyXWkoRlthY" },
    { platform: "Netflix", link: "https://www.netflix.com/title/70079583" }
  ],
  "inception": [
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.04a9f72c-f9c8-c4d1-f97b-6d7ad986a51f?autoplay=0&ref_=atv_cf_strg_wb" },
    { platform: "Hotstar", link: "https://www.hotstar.com/in/movies/inception/1971000530?utm_source=gwa" },
    { platform: "YouTube Movies", link: "https://www.youtube.com/watch?v=ArRqeBKBsEU" },
    { platform: "Netflix", link: "https://www.netflix.com/title/70131314" }
  ],
  "the-dark-knight-rises": [
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.2eb2f316-ed27-a548-448f-5a090b007709?autoplay=0&ref_=atv_cf_strg_wb" },
    { platform: "Hotstar", link: "https://www.hotstar.com/in/movies/the-dark-knight-rises/1971000392?utm_source=gwa" },
    { platform: "YouTube Movies", link: "https://www.youtube.com/watch?v=bVb9Q4p8jio" },
    { platform: "Netflix", link: "https://www.netflix.com/title/70213514" }
  ],
  "interstellar": [
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.b4a9f7c6-5def-7e63-9aa7-df38a479333e?autoplay=0&ref_=atv_cf_strg_wb" },
    { platform: "Hotstar", link: "https://www.hotstar.com/in/movies/interstellar/1971000531?utm_source=gwa" },
    { platform: "YouTube Movies", link: "https://www.youtube.com/watch?v=l2EqVahDON4" },
    { platform: "Netflix", link: "https://www.netflix.com/title/70305903" }
  ],
  "dunkirk": [
    { platform: "Hotstar", link: "https://www.hotstar.com/in/movies/dunkirk/1971000528?utm_source=gwa" },
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.e8afa84c-5903-3c19-7f53-a10540d1503c?autoplay=0&ref_=atv_cf_strg_wb" },
    { platform: "YouTube Movies", link: "https://www.youtube.com/watch?v=-ReBrMmG9iA" },
    { platform: "Netflix", link: "https://www.netflix.com/title/80170278" }
  ],
  "tenet": [
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.e8bb0e4e-a5af-14d4-004c-3a38fdd9ce3b?autoplay=0&ref_=atv_cf_strg_wb" },
    { platform: "YouTube Movies", link: "https://www.youtube.com/watch?v=1gN6FBbTw6k" },
    { platform: "Netflix", link: "https://www.netflix.com/title/81198930" }
  ],
  "oppenheimer": [
    { platform: "Hotstar", link: "https://www.hotstar.com/in/movies/oppenheimer/1971011128?utm_source=gwa" },
    { platform: "Prime Video", link: "https://www.primevideo.com/dp/amzn1.dv.gti.0653d989-0412-4e01-b466-f657bf48121e?autoplay=0&ref_=atv_cf_strg_wb" },
    { platform: "YouTube Movies", link: "https://www.youtube.com/watch?v=vO2N0LGvhWc" },
    { platform: "Apple TV", link: "https://tv.apple.com/us/movie/oppenheimer/umc.cmc.5gylew9icuhfiifdv3oxwxen8" }
  ]
};

let m = fs.readFileSync('src/data/movies.js', 'utf8');

for (let id in data) {
  let linksArray = data[id];
  let formatted = linksArray.map(obj => `\n      { platform: "${obj.platform}", link: "${obj.link}" }`).join(',') + '\n    ';
  let regW = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?whereToWatch:\\s*\\[)([\\s\\S]*?)(\\])`);
  if (m.match(regW)) {
      m = m.replace(regW, `$1${formatted}$3`);
  }
}

fs.writeFileSync('src/data/movies.js', m);
console.log('Updated with exact OTT links!');

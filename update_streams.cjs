const fs = require('fs');

const updates = {
  "oppenheimer": {
    certification: "R",
    whereToWatch: [
      { platform: "Peacock", link: "https://www.peacocktv.com/watch/asset/movies/oppenheimer/842ab927-464a-38bc-9f06-fa3db97f2bf4" },
      { platform: "Prime Video", link: "https://www.amazon.com/Oppenheimer-Cillian-Murphy/dp/B0CH5Q6QKT" },
      { platform: "Apple TV", link: "https://tv.apple.com/us/movie/oppenheimer/umc.cmc.3yx63n8986j3z8xmsy6c93rhn" }
    ]
  },
  "tenet": {
    certification: "PG-13",
    whereToWatch: [
      { platform: "Prime Video", link: "https://www.amazon.com/Tenet-John-David-Washington/dp/B08P27G4TL" },
      { platform: "Apple TV", link: "https://tv.apple.com/us/movie/tenet/umc.cmc.25s1179k5f98qpxe81u915s9w" }
    ]
  },
  "dunkirk": {
    certification: "PG-13",
    whereToWatch: [
      { platform: "Prime Video", link: "https://www.amazon.com/Dunkirk-Fionn-Whitehead/dp/B077M32H6Q" },
      { platform: "Apple TV", link: "https://tv.apple.com/us/movie/dunkirk/umc.cmc.42m04uabq54yibk7g3g9s7i0b" }
    ]
  },
  "interstellar": {
    certification: "PG-13",
    whereToWatch: [
      { platform: "Paramount+", link: "https://www.paramountplus.com/movies/video/interstellar/3H8qVw" },
      { platform: "Prime Video", link: "https://www.amazon.com/Interstellar-Matthew-McConaughey/dp/B00TU9UFKS" },
      { platform: "Apple TV", link: "https://tv.apple.com/us/movie/interstellar/umc.cmc.2k4xed499wubofh9u2m0v7iym" }
    ]
  },
  "the-dark-knight-rises": {
    certification: "PG-13",
    whereToWatch: [
      { platform: "Max", link: "https://play.max.com/movie/249fa6b2-6c39-4dd7-897b-60868f77ea67" },
      { platform: "Apple TV", link: "https://tv.apple.com/us/movie/the-dark-knight-rises/umc.cmc.69ly4t4z6ltt3y9exxngf11es" }
    ]
  },
  "inception": {
    certification: "PG-13",
    whereToWatch: [
      { platform: "Prime Video", link: "https://www.amazon.com/Inception-Leonardo-DiCaprio/dp/B0047WJ11G" },
      { platform: "Apple TV", link: "https://tv.apple.com/us/movie/inception/umc.cmc.52v0z2i4sylwe062h00b3eimx" }
    ]
  },
  "the-dark-knight": {
    certification: "PG-13",
    whereToWatch: [
      { platform: "Max", link: "https://play.max.com/movie/79f3dbd9-ff9e-4eec-bae0-15bd8863fba3" },
      { platform: "Apple TV", link: "https://tv.apple.com/us/movie/the-dark-knight/umc.cmc.4bxyiun8wttaq1g5pdr8104en" }
    ]
  },
  "the-prestige": {
    certification: "PG-13",
    whereToWatch: [
      { platform: "Prime Video", link: "https://www.amazon.com/Prestige-Hugh-Jackman/dp/B000O177JE" },
      { platform: "Apple TV", link: "https://tv.apple.com/us/movie/the-prestige/umc.cmc.3y30x9c313k8x0931221m6g8w" }
    ]
  },
  "batman-begins": {
    certification: "PG-13",
    whereToWatch: [
      { platform: "Max", link: "https://play.max.com/movie/03cbde6e-21ee-42ec-82eb-cefb551a316b" },
      { platform: "Apple TV", link: "https://tv.apple.com/us/movie/batman-begins/umc.cmc.49bxxym1y0z5w1m05tixm93m6" }
    ]
  },
  "insomnia": {
    certification: "R",
    whereToWatch: [
      { platform: "Prime Video", link: "https://www.amazon.com/Insomnia-Al-Pacino/dp/B000I9YWAU" },
      { platform: "Apple TV", link: "https://tv.apple.com/us/movie/insomnia/umc.cmc.5b1vh8p1hng4s6f92g42d6x9d" }
    ]
  },
  "memento": {
    certification: "R",
    whereToWatch: [
      { platform: "Prime Video", link: "https://www.amazon.com/Memento-Guy-Pearce/dp/B000I9UVPY" },
      { platform: "Tubi", link: "https://tubitv.com/movies/438910/memento" }
    ]
  },
  "following": {
    certification: "R",
    whereToWatch: [
      { platform: "Prime Video", link: "https://www.amazon.com/Following-Jeremy-Theobald/dp/B003L4ZJ2M" },
      { platform: "AMC+", link: "https://www.amcplus.com/movies/following-1998" }
    ]
  }
};

let m = fs.readFileSync('src/data/movies.js', 'utf8');

for (let id in updates) {
  let cert = updates[id].certification;
  let wtw = updates[id].whereToWatch;
  
  // Replace whereToWatch block
  let regW = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?whereToWatch:\\s*\\[)([\\s\\S]*?)(\\])`);
  let newW = "\n";
  for (let p of wtw) {
     newW += `      { platform: "${p.platform}", link: "${p.link}" },\n`;
  }
  newW = newW.replace(/,\n$/, "\n    "); // remove last comma
  
  m = m.replace(regW, `$1${newW}$3`);
  
  // Inject certification after runtime if it doesn't exist
  if (!m.includes(`certification:`)) {
     // Wait, we need to inject it per movie. Let's just use string replace after `runtime: "...",`
     // But wait, what if we already injected it? Let's check for each movie
     let regCert = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?runtime:\\s*"[^"]*",)`);
     if (m.match(regCert)) {
         let checkCert = new RegExp(`id:\\s*"${id}"[\\s\\S]*?certification:\\s*".*?"`);
         if (!m.match(checkCert)) {
            m = m.replace(regCert, `$1\n    certification: "${cert}",`);
         }
     }
  }
}

fs.writeFileSync('src/data/movies.js', m);
console.log('Updated streams and certifications!');

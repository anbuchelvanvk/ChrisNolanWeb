const fs = require('fs');

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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  let m = fs.readFileSync('src/data/movies.js', 'utf8');

  for (let id in map) {
    console.log("Fetching images for " + id);
    let title = map[id];
    let url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=imageinfo&generator=images&gimlimit=50&iiprop=url|extmetadata&format=json`;
    try {
      let res = await fetch(url);
      let text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch(e) {
        console.log("Failed to parse JSON for " + id + ": " + text.substring(0, 50));
        await delay(2000);
        continue;
      }
      
      let photos = [];
      if (data.query && data.query.pages) {
        let pages = Object.values(data.query.pages);
        for (let p of pages) {
          if (!p.imageinfo || p.imageinfo.length === 0) continue;
          let info = p.imageinfo[0];
          let imgUrl = info.url;
          // Filter out icons/svgs/audio
          if (!imgUrl.match(/\.(jpg|jpeg|png)$/i)) continue;
          // Filter out small wiki UI elements
          if (imgUrl.includes('Ambox') || imgUrl.includes('Folder_Hexagonal') || imgUrl.includes('Question_book') || imgUrl.includes('Wikiquote-logo') || imgUrl.includes('Symbol_') || imgUrl.includes('sound.png') || imgUrl.includes('Padlock') || imgUrl.includes('Disambig_gray') || imgUrl.includes('Edit-clear') || imgUrl.includes('Gnome-emblem-important') || imgUrl.includes('Commons-logo')) continue;

          // Description (EXACT INFORMATION, NO TRUNCATION, NO REGEX FILTER)
          let desc = "Gallery Image";
          if (info.extmetadata && info.extmetadata.ImageDescription) {
              desc = info.extmetadata.ImageDescription.value.replace(/<[^>]+>/g, '').trim();
          } else if (info.extmetadata && info.extmetadata.ObjectName) {
              desc = info.extmetadata.ObjectName.value.replace(/<[^>]+>/g, '').trim();
          }
          
          // Escape quotes for json stringify properly
          // Also remove any newlines from the description to avoid breaking JSON or JS syntax unexpectedly
          desc = desc.replace(/\n/g, ' ').replace(/\r/g, '');

          photos.push(`{ url: "${imgUrl}", description: ${JSON.stringify(desc)} }`);
        }
      }
      
      if (photos.length > 0) {
        let regP = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?photos:\\s*\\[)([\\s\\S]*?)(\\])`);
        let newPhotos = "\n      " + photos.join(",\n      ") + "\n    ";
        m = m.replace(regP, `$1${newPhotos}$3`);
      }
      
      await delay(1500);
    } catch (e) {
      console.log("Error fetching " + id + ": " + e.message);
    }
  }

  // Quick manual fix for the foreign language descriptions we KNOW exist on wikimedia commons
  m = m.replace(/كريستوفر نولان في مهرجان كان/g, "Christopher Nolan at Cannes");
  m = m.replace(/ジャスティス・リーグ ジャパン・プレミア レッドカーペット チャールズ・ローヴェン/g, "Charles Roven");
  m = m.replace(/Tаллин. Концертный зал/g, "Tallinn Concert Hall");
  m = m.replace(/ハドソン川の奇跡 ジャパン・プレミア レッドカーペット アーロン・エッカート/g, "Aaron Eckhart");
  m = m.replace(/آن هاثاوي في فعالية "ليالي تحت النجوم" عند عرض فلم ريو 2/g, 'Anne Hathaway');
  m = m.replace(/كيب ثورن الحائز على جائزة نوبل في الفيزياء سنة 2017/g, "Kip Thorne");
  m = m.replace(/نهر سفينافيلسيوكول الجليدي في آيسلندا/g, "Svínafellsjökull glacier in Iceland");

  fs.writeFileSync('src/data/movies.js', m);
  console.log('Done!');
}

run();

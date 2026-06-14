const fs = require('fs');
let m = fs.readFileSync('src/data/movies.js', 'utf8');

// Regex to match description: "..."
// We will replace descriptions that contain non-Latin characters (like Arabic, Japanese, Cyrillic)
// with a generic "Gallery Image"

const regex = /description: "([^"]+)"/g;

m = m.replace(regex, (match, p1) => {
    // Check for Arabic, Hebrew, Cyrillic, CJK, etc.
    // basic Latin and Latin-1 supplement: \u0000-\u00FF
    // We allow some punctuation like quotes, hyphens, etc.
    // If it has non-Latin characters, replace the description.
    if (/[^\u0000-\u024F\u1E00-\u1EFF\u2000-\u206F]/.test(p1)) {
        console.log("Replacing: ", p1);
        return 'description: "Gallery Image"';
    }
    return match;
});

fs.writeFileSync('src/data/movies.js', m);
console.log('Fixed languages!');

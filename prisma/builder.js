const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
let categories = [];

for (let i = 1; i <= 4; i++) {
  const file = path.join(dataDir, `part${i}.json`);
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    categories = categories.concat(data);
  }
}

fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2));
console.log('categories.json generated successfully. Categories merged: ', categories.length);

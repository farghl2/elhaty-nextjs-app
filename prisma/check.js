const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./prisma/data/categories.json', 'utf8'));
const offers = JSON.parse(fs.readFileSync('./prisma/data/offers.json', 'utf8'));

const cIds = new Set();
const pIds = new Set();
const sIds = new Set();

for(let c of data) {
    if(cIds.has(c.id)) console.log('Dup Cat:', c.id);
    cIds.add(c.id);
    for(let p of c.plates) {
        if(pIds.has(p.id)) console.log('Dup Plate:', p.id, p.title);
        pIds.add(p.id);
        if(p.sizes) {
            for(let s of p.sizes) {
                if(sIds.has(s.id)) console.log('Dup Size:', s.id);
                sIds.add(s.id);
            }
        }
    }
}
for (let o of offers) {
  if (pIds.has(o.id)) console.log('Dup ID between Plate and OfferPlate (harmless if tables separated):', o.id);
  if (o.sizes) {
      for(let s of o.sizes) {
          if (sIds.has(s.id)) console.log('Dup Size in Offer Plate:', s.id);
          sIds.add(s.id);
      }
  }
}
console.log('Done checking duplicates');

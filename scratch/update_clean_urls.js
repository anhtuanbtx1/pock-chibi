const fs = require('fs');
const path = require('path');

function removeVietnameseTones(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function cleanFilename(f) {
  const ext = path.extname(f);
  const name = path.basename(f, ext);
  return removeVietnameseTones(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') + ext.toLowerCase().trim();
}

const existingAssets = fs.readdirSync('public/assets');
const assetSet = new Set(existingAssets);

// Read current all_chibi.json
const currentDb = JSON.parse(fs.readFileSync('src/data/chibi/all_chibi.json', 'utf-8'));

currentDb.forEach(c => {
  const oldBase = path.basename(c.image);
  const clean = cleanFilename(oldBase);
  if (assetSet.has(clean)) {
    c.image = `/assets/${clean}`;
  } else {
    console.warn(`Asset not found for ${c.name}: ${clean}`);
  }
});

// Group into 6 main files:
const groups = {
  than_gioi: currentDb.filter(c => c.category === 'than_gioi'),
  tay_du: currentDb.filter(c => c.category === 'tay_du'),
  viet_nam: currentDb.filter(c => c.category === 'viet_nam'),
  tam_quoc: currentDb.filter(c => c.category === 'tam_quoc'),
  kim_dung: currentDb.filter(c => c.category === 'kim_dung'),
  phong_van: currentDb.filter(c => c.category === 'phong_van'),
};

for (const [key, list] of Object.entries(groups)) {
  fs.writeFileSync(`src/data/chibi/${key}.json`, JSON.stringify(list, null, 2), 'utf-8');
  console.log(`Written src/data/chibi/${key}.json with ${list.length} cards`);
}

fs.writeFileSync('src/data/chibi/all_chibi.json', JSON.stringify(currentDb, null, 2), 'utf-8');
console.log('Database updated with clean URLs successfully!');

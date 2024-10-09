const fs = require('fs');

const r = fs.createReadStream('./source.txt');
const w = fs.createWriteStream('./destination.txt');

r.destroy(new Error('Reading finished'));

r.pipe(w);

r.on('data', (c) => console.log(`Chunk of data was received: ${c} `));

r.on('end', () => console.log('Reading finished'));

r.on('error', (e) => console.log(`Error : ${e} `));

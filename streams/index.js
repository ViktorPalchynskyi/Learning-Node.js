const fs = require('fs');
const { Transform } = require('stream');

const r = fs.createReadStream('./source.txt');
const w = fs.createWriteStream('./destination.txt');

r.destroy(new Error('Reading finished'));

r.pipe(w);

r.on('data', (c) => console.log(`Chunk of data was received: ${c} `));

r.on('end', () => console.log('Reading finished'));

r.on('error', (e) => console.log(`Error : ${e} `));

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

process.stdin.pipe(upperCaseTransform).pipe(process.stdout);

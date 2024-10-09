const { Worker } = require('worker_threads');

const worker = new Worker(
    `
    const { parentPort } = require('worker_threads');

    let count = 0;

    for(let i = 0; i < 1e9; i++) {
        count += i;
    }

    parentPort.postMessage(count);
`,
    { eval: true }
);

const worker2 = new Worker(
    `
    const { parentPort } = require('worker_threads');

    let count = 0;

    for(let i = 0; i < 1e10; i++) {
        count += i;
    }

    parentPort.postMessage(count);
`,
    { eval: true }
);

worker.on('message', (r) => console.log(`worker 1 res ${r}`));
worker2.on('message', (r) => console.log(`worker 2 res ${r}`));

setInterval(() => console.log('Tick'), 1000)

console.log('Working in paralel');

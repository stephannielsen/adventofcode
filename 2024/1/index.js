const readline = require('node:readline');
const fs = require('node:fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

const lefts = [];
const rights = [];

rl.on('line', (line) => {
    const [left, right] = line.split('   ');
    lefts.push(parseInt(left));
    rights.push(parseInt(right));
})
.on('close', () => {

    // part 1 - distance
    lefts.sort((a, b) => a - b);
    rights.sort((a, b) => a - b);

    const totalDistance = lefts.reduce((acc, left, i) => {
        const right = rights[i];
        acc += Math.abs(left - right);
        return acc;
    }, 0);

    console.log("Total distance between left and right: ", totalDistance);

    // part 2 - similarity
    const similarity = lefts.reduce((acc, left) => {
        const occurrences = rights.filter(right => left === right);
        acc += left * occurrences.length;
        return acc;
    }, 0);

    console.log("Total similarity between left and right: ", similarity);
});
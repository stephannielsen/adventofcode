const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

let result = 0;
const frequencies = [];
const changes = [];
let twice = false;
let first = true;

rl.on('line', (line) => {
    changes.push(parseInt(line));
})
.on('close', () => {
    while (!twice) {
        for (let change of changes) {
            result += change;
            if (frequencies.includes(result)) {
                twice = result;
                break;
            }
            frequencies.push(result);
        }
        if (first) {
            console.log(result);
            first = false;
        }
    }
    console.log(twice);
});
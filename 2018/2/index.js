const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

let has3times = 0;
let has2times = 0;

const ids = [];

rl.on('line', (line) => {
    ids.push(line);
    const lineArray = Array.from(line);
    for (let letter of lineArray) {
        if (lineArray.filter(ch => ch === letter).length === 3) {
            has3times++;
            break;
        }
    }
    for (let letter of lineArray) {
        if (lineArray.filter(ch => ch === letter).length === 2) {
            has2times++;
            break;
        }
    }
})
.on('close', () => {
    console.log(has3times * has2times);
    for (const id of ids) {
        for (let i = 0; i < id.length; i++) {
            const searchFor = id.slice(0, i) + id.slice(i + 1);
            const matches = ids.filter(other => (other.slice(0, i) + other.slice(i + 1)) === searchFor);
            if (matches.length === 2) {
                console.log("Matching parts:");
                for (const match of matches) {
                    console.log(match.slice(0, i) + match.slice(i + 1))
                }
                return;
            }
        }
    }
});
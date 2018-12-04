const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

// const board = new Array(1000).fill(new Array(1000).fill(0));
// board[0][0] = 1;
var board = [];

for (var i=0;i<1000;i++) {
   board[i] = new Array(1000).fill(undefined);
}
board[0][0] = 1;

const entries = [];

// console.log(board[0][0], board[1][0]);
let first = true;
rl.on('line', (line) => {
    //#1 @ 49,222: 19x20
    const parts = line.split(' ');
    // [ '#1287', '@', '152,94:', '10x27' ]
    const id = parseInt(parts[0].substring(1));
    const [left, top] = parts[2].split(',').map(val => parseInt(val));
    const [width, height] = parts[3].split('x').map(val => parseInt(val));
    entries.push({
        id: id,
        left: left,
        top: top,
        width: width,
        height: height,
        count: width * height
    });

    for (let i = left; i < left + width; i++) {
        for (let j = top; j < top + height; j++) {
            if (board[i][j] === undefined) {
                board[i][j] = id;
                const entry = entries.find(e => e.id === id);
                if (entry) {
                    entry.count--;
                }
            } else {
                const entry = entries.find(e => e.id === board[i][j]);
                if (entry) {
                    entry.count++;
                }
                board[i][j] = -1;
            }
        }
    }
})
.on('close', () => {
    const sum = board.map(col => col.filter(v => v === -1).length).reduce((prev, next) => prev + next);
    const sum2 = board.map(col => col.filter(v => v === undefined).length).reduce((prev, next) => prev + next);
    const sum3 = board.map(col => col.filter(v => v > -1).length).reduce((prev, next) => prev + next);
    console.log("More than 1:", sum, "None:", sum2, "Exactly 1:", sum3, "All:", sum + sum2 + sum3);
    console.log("Now verify which one is complete...");

    const complete = entries.filter(e => e.count === 0);
    console.log(complete);
});
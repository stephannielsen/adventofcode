const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

let input = '';
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const reactedSequences = [];

rl.on('line', (line) => {
    input = line.split('');
})
.on('close', () => {
    var reacted = fullyReact(input);
    console.log("Full sequence:", reacted.length);
    for (let i = 0; i < alphabet.length; i++) {
        const reducedInput = input.filter(c => c.toLowerCase() !== alphabet[i].toLowerCase());
        reactedSequences.push(fullyReact(reducedInput));
    }
    const shortest = Math.min(...reactedSequences.map(s => s.length));
    console.log("Shortest sequence:", shortest);
});

const fullyReact = (input) => {
    return input.reduce((prev, curr) => {
        const last = prev.slice(-1);
        if (last.toLowerCase() === curr.toLowerCase() && last !== curr) { //a === a, A !== a
            return prev.slice(0, -1);
        }
        return prev + curr;
    });
}
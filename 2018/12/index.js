const readline = require('readline');
const fs = require('fs');

const getPotSum = (state, sub) => {
  return state.split('').reduce((acc, curr, index) => {
    if (curr === '#') {
      acc += index - sub;
    }
    return acc;
  }, 0);
} 

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

let sequences = [];
let prevState = '..';
let zeroIndex = 0;

rl.on('line', (line) => {
  if (line.length < 1) return;
  const start = "initial state: ";
  if (line.startsWith(start)) {
    prevState += line.substring(start.length);
    zeroIndex = prevState.indexOf('#') -1;
  } else {
    const seq = line.split(' => ');
    if (seq[1] === '#') {
      sequences.push(seq[0]); // only need pots
    }
  }
})
.on('close', () => {
  let nextState = '';
  const sums = [];
  sums.push([0,0]);
  const fiftyBillion = 50000000001;
  for (let j = 1; j < fiftyBillion; j++) {
    //increase padding around the sequence
    prevState = '..' + prevState + '..';
    zeroIndex += 2;

    nextState = '..';
    for (let i = 2; i < prevState.length - 2; i++) {
      nextState += sequences.indexOf(prevState.substring(i-2,i+3)) > -1 ? '#' : '.';
    }
    nextState += '..';

    const sum = getPotSum(nextState, zeroIndex);
    const diff = sum-sums[j-1][0];
    sums.push([sum, diff]);

    if (sums.slice(-2).every(s => s[1] === diff)) { // with given input sum diffs stabilize with 2 equal diffs.
      break;
    }

    prevState = nextState;
  }

  console.log("Part 1 Result:", sums[20][0]);

  const lastSum = sums[sums.length-1];
  const part2Result = (fiftyBillion-sums.length)*lastSum[1] + lastSum[0];
  console.log("Part 2 Result:", part2Result);
});
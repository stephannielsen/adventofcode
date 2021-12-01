const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

const depths = [];

rl.on('line', (line) => {
    depths.push(parseInt(line));
})
.on('close', () => {
  // part 1
    const increases = depths.reduce((acc, depth, index, array) => {
      if (index === 0) return acc;
      if (depth > array[index-1]) return acc+1;
      return acc; 
    }, 0);
    console.log(`Depth increased ${increases} times.`);

    // part 2
    const windowSums = depths.reduce((acc, cur, index, array) => {
      if (index < 2) return acc;
      acc.push(array[index-2] + array[index-1] + cur);
      return acc;
    }, [])

    const increasedWindows = windowSums.reduce((acc, depth, index, array) => {
      if (index === 0) return acc;
      if (depth > array[index-1]) return acc+1;
      return acc; 
    }, 0);
    console.log(`Depth increased ${increasedWindows} times.`);
});
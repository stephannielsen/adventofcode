const readline = require("node:readline");
const fs = require("node:fs");

let rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    // input: fs.createReadStream("sample.txt"),
  crlfDelay: Infinity,
});

function mul(a, b) {
  return a * b;
}

function runOps(operations) {
    let sum = 0;
    for (const operation of operations) {
      const [a, b] = operation.match(/\d{1,3}/g);
      sum += mul(parseInt(a), parseInt(b));
    }
    return sum;
}

let input;

rl.on("line", (line) => {
  input += line;
}).on("close", () => {
  // part 1 - multiply
  const regex = /mul\(\d{1,3}\,\d{1,3}\)/g;
  const operations = input.match(regex);
  const sum = runOps(operations);
  console.log("Sum: ", sum);

  // part 2 - conditions
  let match;
  const matches = [];
  let lastIndex = 0;
  while ((match = regex.exec(input)) !== null) {
    const substr = input.substring(lastIndex, match.index);
    if (!substr.includes("don't()") || substr.includes("do()")) {
      matches.push(match[0]);
      lastIndex = match.index + match[0].length;
    }
  }
  const sum2 = runOps(matches);
  console.log("Sum2: ", sum2);
});

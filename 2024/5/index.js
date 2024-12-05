const readline = require("node:readline");
const fs = require("node:fs");
const { clear } = require("node:console");

let rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  // input: fs.createReadStream("sample.txt"),
  crlfDelay: Infinity,
});

const ruleFuncs = [];
const updates = [];

rl
  .on("line", (line) => {
    if (line.includes("|")) {
      const args = line.split("|").map((a) => parseInt(a));
      const compareFunc = (a, b) => {
        // if we have a rule for the two numbers, order them
        if (args.includes(a) && args.includes(b)) {
          if (a === b) return 0;
          if (a === args[0]) return -1;
          if (a === args[1]) return 1;
        }
        return 0;
      };
      ruleFuncs.push(compareFunc);
    }
    if (line.includes(",")) {
      const args = line.split(",").map((a) => parseInt(a));
      updates.push(args);
    }
  })
  .on("close", () => {
    // part 1 - calculate sum of middle elements of already ordered updates
    // part 2 - calculate sum of middle elements of updates that needed to be ordered
    let correctMiddleSum = 0;
    let incorrectMiddleSum = 0;
    updates.forEach((update) => {
      const compareFunc = (a, b) => {
        // run the numbers through all rules until we have a first match
        for (const ruleFunc of ruleFuncs) {
          const result = ruleFunc(a, b);
          if (result !== 0) {
            return result;
          }
        }
      };
      const sorted = [...update].sort(compareFunc);
      if (sorted.every((v, i) => v === update[i])) {
        correctMiddleSum += sorted[Math.floor(sorted.length / 2)];
      } else {
        incorrectMiddleSum += sorted[Math.floor(sorted.length / 2)];
      }
    });
    console.log("Part 1:", correctMiddleSum);
    console.log("Part 2:", incorrectMiddleSum);
  });

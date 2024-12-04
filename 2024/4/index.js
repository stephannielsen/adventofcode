const readline = require("node:readline");
const fs = require("node:fs");
const { clear } = require("node:console");

let rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  // input: fs.createReadStream("sample.txt"),
  crlfDelay: Infinity,
});

const input = [];
const word = "XMAS";
const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

rl.on("line", (line) => {
  input.push(line.split(""));
}).on("close", () => {
  // part 1 - find xmas
  const maxX = input[0].length;
  const maxY = input.length;
  let occurences = 0;
  for (let i = 0; i < maxY; i++) {
    for (let j = 0; j < maxX; j++) {
      if (input[i][j] === word[0]) {
        directions.forEach((direction) => {
          if (
            checkDirection(input, word, j, i, maxX - 1, maxY - 1, direction)
          ) {
            occurences++;
          }
        });
      } else {
        continue;
      }
    }
  }
  console.log("Part 1:", occurences);

  // part 2 - find x-mas

  occurences = 0;
  // no need to look in border row/column
  const MAS = "MAS";
  const SAM = "SAM";
  for (let i = 1; i < maxY - 1; i++) {
    for (let j = 1; j < maxX - 1; j++) {
      // we look for an A and then in X directions
      if (input[i][j] === "A") {
        // NW-SE, SE-NW
        const NWSE = input[i - 1][j - 1] + input[i][j] + input[i + 1][j + 1];
        // NE-SW, SW-NE
        const NESW = input[i - 1][j + 1] + input[i][j] + input[i + 1][j - 1];
        if ((NWSE === MAS || NWSE === SAM) && (NESW === MAS || NESW === SAM)) {
          occurences++;
        }
      }
    }
  }
  console.log("Part 2:", occurences);
});

function checkDirection(input, word, x, y, maxX, maxY, direction) {
  const [dx, dy] = getDirections(direction);
  // check if out of bounds
  const lastX = x + dx * (word.length - 1);
  const lastY = y + dy * (word.length - 1);
  if (lastX > maxX || lastY > maxY || lastX < 0 || lastY < 0) {
    return false;
  }
  // get next letters in direction
  let foundWord = input[y][x];
  for (let k = 1; k < word.length; k++) {
    foundWord += input[y + dy * k][x + dx * k];
  }
  if (foundWord === word) {
    return true;
  }
  return false;
}

function getDirections(direction) {
  switch (direction) {
    case "N":
      return [0, -1];
    case "NE":
      return [1, -1];
    case "E":
      return [1, 0];
    case "SE":
      return [1, 1];
    case "S":
      return [0, 1];
    case "SW":
      return [-1, 1];
    case "W":
      return [-1, 0];
    case "NW":
      return [-1, -1];
  }
}

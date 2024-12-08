const readline = require("node:readline");
const fs = require("node:fs");
const { clear } = require("node:console");

let rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  // input: fs.createReadStream("sample.txt"),
  crlfDelay: Infinity,
});

const input = [];
const guard = { up: "^", down: "v", left: "<", right: ">" };
let currentPosition;
let currentDirection;

let visitedPositions = new Set();
const directions = {
  "^": [0, -1],
  v: [0, 1],
  "<": [-1, 0],
  ">": [1, 0],
};

const turnRight = (currentDirection) => {
  switch (currentDirection) {
    case guard.up:
      return guard.right;
    case guard.right:
      return guard.down;
    case guard.down:
      return guard.left;
    case guard.left:
      return guard.up;
  }
};

rl.on("line", (line) => {
  input.push(line.split(""));
  if (line.indexOf(guard.up) > -1) {
    currentPosition = { x: line.indexOf(guard.up), y: input.length - 1 };
    currentDirection = guard.up;
  }
  if (line.indexOf(guard.down) > -1) {
    currentPosition = { x: line.indexOf(guard.down), y: input.length - 1 };
    currentDirection = guard.down;
  }
  if (line.indexOf(guard.left) > -1) {
    currentPosition = { x: line.indexOf(guard.left), y: input.length - 1 };
    currentDirection = guard.left;
  }
  if (line.indexOf(guard.right) > -1) {
    currentPosition = { x: line.indexOf(guard.right), y: input.length - 1 };
    currentDirection = guard.right;
  }
}).on("close", () => {
  if (!currentPosition) {
    throw "no start";
  }

  // part 1 - distinct places
  // move guard forwarduntil obstacle (#) then turn 90 degrees right, rinse and repeat
  // until guard moves out of bounds
  // keep track of visited positions - distinct visits
  while (true) {
    visitedPositions.add(`${currentPosition.x},${currentPosition.y}`);

    const newX = currentPosition.x + directions[currentDirection][0];
    const newY = currentPosition.y + directions[currentDirection][1];

    // quit if out of bounds
    if (newX < 0 || newY < 0 || newX > input[0].length - 1 || newY > input.length - 1) {
      break;
    }
    if (input[newY][newX] === "#") {
      currentDirection = turnRight(currentDirection);
      continue;
    }

    currentPosition = { x: newX, y: newY };
  }

  console.log("Part 1:", visitedPositions.size);
});

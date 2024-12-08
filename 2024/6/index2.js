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

  let infiniteLoops = 0;
  const loopPositions = new Set();

  // part 2 - infinite loops because of placed obstacle
  // move guard as in part 1 but place an obstacle at next position first
  // and check if moving the guard with this obstacle would generate an infinite loop
  // if guard moves out of bounds -> no infinite loop
  // if we visit same position with same direction again -> infinite loop
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

    // use copy for inner loop
    const innerInput = input.map((row) => [...row]);
    // place obstacle
    innerInput[newY][newX] = "O";
    let innerDirection = currentDirection;
    let innerPosition = { ...currentPosition };
    const innerVisitedPositions = new Set();

    while (true) {
      const pos = `${innerPosition.x},${innerPosition.y},${innerDirection}`;
      // same position with same direction means loop
      if (innerVisitedPositions.has(pos)) {
        loopPositions.add(`${newX},${newY}`);
        infiniteLoops++;
        break;
      }
      innerVisitedPositions.add(pos);
      const nextX = innerPosition.x + directions[innerDirection][0];
      const nextY = innerPosition.y + directions[innerDirection][1];
      // quit if out of bounds
      if (nextX < 0 || nextY < 0 || nextX > innerInput[0].length - 1 || nextY > innerInput.length - 1) {
        // console.log("No infinite loop.");
        break;
      }
      if (innerInput[nextY][nextX] === "#" || innerInput[nextY][nextX] === "O") {
        // console.log(`Found obstacle ${inputCopy[newCopyY][newCopyX]}, turning right at: ${newCopyX}, ${newCopyY}`);
        innerDirection = turnRight(innerDirection);
        continue;
      }
      
      innerPosition = { x: nextX, y: nextY };
    }

    // console.log("Proceeding with normal way...");
    currentPosition = { x: newX, y: newY };
  }

  console.log("Part 2, Visited: ", visitedPositions.size);
  console.log("Part 2, Loops found: ", infiniteLoops);
  console.log("Part 2, Loop positions: ", loopPositions.size);
});

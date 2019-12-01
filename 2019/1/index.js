const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

const masses = [];

rl.on('line', (line) => {
    masses.push(parseInt(line));
})
.on('close', () => {
    // Part 1
   let fuel = masses.map(calculateFuelPerMass).reduce(sum)
   console.log(fuel)

   // Part 2
   fuel = masses.map(calculateFuelPerMassRecursive).reduce(sum)
   console.log(fuel)
})

const calculateFuelPerMass = m => Math.floor(m / 3) - 2
const sum = (a, b) => a + b
const calculateFuelPerMassRecursive = m => {
    let f = calculateFuelPerMass(m)
    if (f > 0) {
        f += calculateFuelPerMassRecursive(f)
    }
    return Math.max(0, f)
}
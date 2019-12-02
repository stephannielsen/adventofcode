const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {

    const program = line.split(',').map(i => parseInt(i));
    // Part 1
    console.log(intcode([...program], 12, 2))

    // Part 2
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            const res = intcode([...program], i, j)
            if (res === 19690720) {
                console.log('noun:' + i)
                console.log('verb:' + j)
                console.log(100 * i + j)
            }
        }
    }
})

const opCodeAdd = 1;
const opCodeMultiply = 2;
const opCodeEnd = 99

const intcode = (memory, noun, verb) => {
    memory[1] = noun
    memory[2] = verb
    for (let i = 0; i < memory.length; i+=4) {
        if (memory[i] === opCodeEnd) {
            break;
        }
        else if (memory[i] === opCodeAdd) {
            memory[memory[i+3]] = memory[memory[i+1]] + memory[memory[i+2]]
        }
        else if (memory[i] === opCodeMultiply) {
            memory[memory[i+3]] = memory[memory[i+1]] * memory[memory[i+2]]
        }
    }
    return memory[0]
} 
const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

const steps1 = {};


rl.on('line', (line) => {
    const step = line[36];
    const pre = line[5];
    
    if (!steps1[step]) {
        steps1[step] = [];
    }
    if (!steps1[pre]) {
        steps1[pre] = [];
    }
    steps1[step].push(line[5]);
})
.on('close', () => {
    const steps2 = JSON.parse(JSON.stringify(steps1));
    let result = '';

    while (Object.keys(steps1).length > 0) {
        //find the keys with no pre steps
        const next = Object.keys(steps1).filter(k => steps1[k].length === 0).sort()[0];
        result += next;
        delete steps1[next];
        for (let step of Object.keys(steps1)) {
            steps1[step] = steps1[step].filter(s => s !== next);
        }
    }
    console.log("Order of steps, Part 1:", result);

    const timePerStep = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((c,i) => [c, 61+i]);

    const workerElfs = {
        'Me': [],
        'Elf1': [],
        'Elf2': [],
        'Elf3': [],
        'Elf4': []
    }

    result = '';
    let currentSecond = -1;
    //either still steps to do or active worker elfs
    while(Object.keys(steps2).length > 0 || (Object.values(workerElfs).some(b => b.length > 0) || currentSecond === -1)) {


        // update current status
        currentSecond++;
        Object.keys(workerElfs).forEach(e => {
            if (workerElfs[e].length > 0) {
                if (workerElfs[e][1] == 1) {
                    result += workerElfs[e][0];
                    for (let step of Object.keys(steps2)) {
                        steps2[step] = steps2[step].filter(s => s !== workerElfs[e][0]);
                    }
                    workerElfs[e] = [];
                } else {
                    workerElfs[e][1]--;
                }
            }
        });


        const nextSteps = Object.keys(steps2).filter(k => steps2[k].length === 0).sort();
        const freeElfs = Object.keys(workerElfs).filter(e => workerElfs[e].length === 0);
        for (var i = 0; i < Math.min(freeElfs.length, nextSteps.length); i++) {
            var elf = freeElfs[i];
            workerElfs[elf] = timePerStep.find(s => s[0] === nextSteps[i]);
            delete steps2[nextSteps[i]];
        }
    }
    console.log("Needed time, Part 2:", currentSecond);
});
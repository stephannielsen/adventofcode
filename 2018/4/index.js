const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

const input = [];
const guards = {};

rl.on('line', (line) => {
    
    // [1518-11-22 00:22] falls asleep
    // [1518-04-23 00:00] Guard #3109 begins shift
    // [1518-04-12 00:53] wakes up
    const dateTime = line.substring(1,17);
    const message = line.substring(19);
    input.push({
        dateTime: dateTime,
        message: message
    });

})
.on('close', () => {
    const sorted = input.sort(function(a, b) {
        return (a.dateTime < b.dateTime) ? -1 : ((a.dateTime > b.dateTime) ? 1 : 0);
    });
    let currentGuard = false;
    let start = false;
    const s1maxGuard = {
        id: 0,
        total: 0,
        minuteMax: 0
    };
    const s2maxGuard = {
        id: 0,
        max: 0,
        minuteMax: 0
    }
    for (const entry of sorted) {
        const minute = parseInt(entry.dateTime.slice(-2));
        if (entry.message.startsWith("Guard")) {
            let tmp = entry.message.substring(entry.message.indexOf('#'));
            currentGuard = tmp.substring(1, tmp.indexOf(' '));
            if (!guards[currentGuard]){
                guards[currentGuard] = {
                    mins: new Array(60).fill(0),
                    total: 0
                };
            }
            start = 0;
        }
        else if (entry.message.startsWith("falls")) {
            if (!currentGuard) {
                throw "blubb";
            }
            start = minute;
        }
        else if (entry.message.startsWith("wakes")) {
            if (!currentGuard) {
                throw "braaa";
            }
            for (let i = start; i < minute; i++) {
                guards[currentGuard].mins[i]++;
                guards[currentGuard].total++;
            }
            if (s1maxGuard.total < guards[currentGuard].total) {
                s1maxGuard.id = currentGuard;
                s1maxGuard.total = guards[currentGuard].total;
                s1maxGuard.minuteMax = guards[currentGuard].mins.findIndex((e) => e === Math.max(...guards[currentGuard].mins));
            }
            if (s2maxGuard.max < Math.max(...guards[currentGuard].mins)) {
                s2maxGuard.id = currentGuard;
                s2maxGuard.max = Math.max(...guards[currentGuard].mins);
                s2maxGuard.minuteMax = guards[currentGuard].mins.findIndex((e) => e === s2maxGuard.max);
            }
            start = minute;
        }
    }

    // now find the guard with the most minutes asleep
    console.log(s1maxGuard, s1maxGuard.id * s1maxGuard.minuteMax);
    console.log(s2maxGuard, s2maxGuard.id * s2maxGuard.minuteMax);

});
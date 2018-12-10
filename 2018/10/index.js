const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

const points = [];

rl.on('line', (line) => {
    points.push({
        X: parseInt(line.substring(10,16)),
        Y: parseInt(line.substring(18,24)),
        vX: parseInt(line.substring(36,38)),
        vY: parseInt(line.substring(40,42))
    })
})
.on('close', () => {
    //find smallest bounding box
    const boxSizes = [];
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;
    for (let i = 0; i < 30000; i++) {
        const box = points.map(p => {
            return {
            X: p.X + p.vX*i,
            Y: p.Y + p.vY*i  
        }});
        const minX = Math.min(...box.map(p => p.X));
        const maxX = Math.max(...box.map(p => p.X));
        const minY = Math.min(...box.map(p => p.Y));
        const maxY = Math.max(...box.map(p => p.Y));
        boxSizes.push(maxX-minX+maxY-minY);
    }
    const seconds = boxSizes.indexOf(Math.min(...boxSizes));

    const shiftedPoints = points.map(p => {
        return {
        X: p.X + p.vX*seconds,
        Y: p.Y + p.vY*seconds  
    }});

    fs.unlinkSync("output.csv");

    shiftedPoints.forEach(p => {
        fs.appendFile('output.csv', 1*p.X + ";" + -1*p.Y + "\n", (err) => {});
    });

    console.log("Part 1:", "ERCXLAJL", "Use https://scatterplot.online/ to plot output.csv!");
    
    console.log("Part 2:", seconds);
});
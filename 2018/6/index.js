const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

const points = [];

rl.on('line', (line) => {
    points.push(line.split(', ').map(p => parseInt(p)));
})
.on('close', () => {
    // find max x and y for dimensions
    const maxX = Math.max(...points.map(p => p[0]))+1;
    const maxY = Math.max(...points.map(p => p[1]))+1;
    let grid = new Array(maxX);
    for (var i=0;i<grid.length;i++) {
        grid[i] = new Array(maxY).fill(undefined);
     }

    //find closest points for each point in grid and set it to the index of the point. -1 for tie
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var distances = points.map((p,index) => manhattanDistance(p, [i,j]));
            var min = Math.min(...distances);
            var isTied = distances.filter(d => d === min).length > 1;
            if (isTied) {
                grid[i][j] = -1;
            } else {
                grid[i][j] = distances.indexOf(min);
            }
        }
    }

    const outerIndizes = grid[0]
        .concat(grid[grid.length-1])
        .concat(grid.map(r => r[0]))
        .concat(grid.map(r => r[r.length-1]));

    const inner = flatGrid(grid).filter(i => !outerIndizes.includes(i));

    const areas = inner.reduce((acc, curr) => {
        if (!acc[curr])  {
            acc[curr] = 0;
        }
        acc[curr]++;
        return acc;
    },  {});

    // console.log(areas);
    
    console.log("Part 1:", Math.max(...Object.values(areas)));

    //part 2
    grid = new Array(maxX);
    for (var i=0;i<grid.length;i++) {
        grid[i] = new Array(maxY).fill(undefined);
     }

     
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var totalDistance = points.map((p,index) => manhattanDistance(p, [i,j])).reduce((acc, curr) => acc + curr);
            if (totalDistance < 10000) {
                grid[i][j] = 1;
            }
        }
    }

    const size = flatGrid(grid).filter(l => l).length;
    console.log("Part 2:", size);

});

const manhattanDistance = (p, q) => {
    return Math.abs(p[0]-q[0]) + Math.abs(p[1] - q[1]);
}

const flatGrid = (grid) => {
    return grid.reduce((prev, curr) => prev.concat(curr));
}
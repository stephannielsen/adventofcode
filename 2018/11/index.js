const gridSerialNumber = 1955;

const getPowerLevel = (x, y, grid) => {
    const rackId = x + 10;
    const powerLevel = parseInt(((rackId * y + grid) * rackId).toString().slice(-3,-2))-5;
    return powerLevel;
}

const grid = new Array(300);
for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(300);
    for (var j = 0; j < grid[i].length; j++) {
        grid[i][j] = getPowerLevel(i + 1, j + 1, gridSerialNumber);
    }
}

let currentMax = { X: -1, Y:-1, P: 0};
for (var i = 0; i < grid.length-2; i++) {
    for (var j = 0; j < grid[i].length-2; j++) {
        const totalPower = grid[i][j] + grid[i+1][j] + grid[i+2][j] + grid[i][j+1] + grid[i+1][j+1] + grid[i+2][j+1] + grid[i][j+2] + grid[i+1][j+2] + grid[i+2][j+2];
        if (currentMax.P <= totalPower) {
            currentMax = { X: i + 1, Y: j + 1, P: totalPower };
        }
    }
}

console.log("Part 1:", currentMax);


currentMax = { X: -1, Y:-1, P: 0, S: 0};
for (var s = 1; s < grid.length; s++) {
    for (var i = 0; i < grid.length-s; i++) {
        for (var j = 0; j < grid[i].length-s; j++) {
            let totalPower = 0;
            for (var r = 0; r < s; r++) {
                for (var c = 0; c < s; c++) {
                    totalPower += grid[i+c][j+r]
                }
            }

            if (currentMax.P <= totalPower) {
                currentMax = { X: i + 1, Y: j + 1, P: totalPower, S: s };
            }
        }
    }
}
console.log("Part 2:", currentMax);
const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

const paths = []

rl.on('line', (line) => {
    paths.push(line.split(','))
})
.on('close', () => {
    const path1 = paths[0]
    const path2 = paths[1]
    const grid = []
    console.log(grid)
    let origin = [0,7]
    grid[origin[1]] = []
    grid[origin[1]][origin[0]] = 'S'
    console.log(origin)
    let newOrigin = drawPathRight(grid, origin[0], origin[1], 8)
    console.log(newOrigin)
    newOrigin = drawPathUp(grid, newOrigin[0], newOrigin[1], 5)
    console.log(newOrigin)
    newOrigin = drawPathLeft(grid, newOrigin[0], newOrigin[1], 5)
    console.log(newOrigin)
    newOrigin = drawPathDown(grid, newOrigin[0], newOrigin[1], 3)
    console.log(newOrigin)
    console.log(grid)

    console.log(origin)
    newOrigin = drawPathUp(grid, origin[0], origin[1], 7)
    console.log(newOrigin)
    newOrigin = drawPathRight(grid, newOrigin[0], newOrigin[1], 6)
    console.log(newOrigin)
    newOrigin = drawPathDown(grid, newOrigin[0], newOrigin[1], 4)
    console.log(newOrigin)
    newOrigin = drawPathLeft(grid, newOrigin[0], newOrigin[1], 4)
    console.log(newOrigin)
    console.log(grid)
})

const drawPathDown = (arr, x, y, d) => {
    for (let i = y + 1; i < y + d; i++) {
        if (arr[i] === undefined) {
            arr[i] = []
        }
        if (arr[i][x] === undefined) {
            arr[i][x] = '|'
        }
        else {
            arr[i][x] = 'X'
        }
    }
    if (arr[y + d] === undefined) {
        arr[y + d] = []
    }
    if (arr[y + d][x] === undefined) {
        arr[y + d][x] = 0
    }
    else {
        arr[y + d][x] = 'X'
    }
    return [x, y + d]
}

const drawPathRight = (arr, x, y, r) => {
    if (arr[y] === undefined) {
        arr[y] = []
    }
    for (let i = x + 1; i < x + r; i++) {
        if (arr[y][i] === undefined) {
            arr[y][i] = '-'
        }
        else {
            arr[y][i] = 'X'
        }
    }
    if (arr[y][x + r] === undefined) {
        arr[y][x + r] = 0
    }
    else {
        arr[y][x + r] = 'X'
    }
    return [x + r, y]
}

const drawPathLeft = (arr, x, y, l) => {
    if (arr[y] === undefined) {
        arr[y] = []
    }
    for (let i = x - 1; i > x - l; i--) {
        if (arr[y][i] === undefined) {
            arr[y][i] = '-'
        }
        else {
            arr[y][i] = 'X'
        }
    }
    if (arr[y][x - l] === undefined) {
        arr[y][x - l] = 0
    }
    else {
        arr[y][x - l] = 'X'
    }
    return [x - l, y]
}

const drawPathUp = (arr, x, y, u) => {
    for (let i = y - 1; i > y - u; i--) {
        if (arr[i] === undefined) {
            arr[i] = []
        }
        if (arr[i][x] === undefined) {
            arr[i][x] = '|'
        }
        else {
            arr[i][x] = 'X'
        }
    }
    if (arr[y - u] === undefined) {
        arr[y - u] = []
    }
    if (arr[y - u][x] === undefined) {
        arr[y - u][x] = 0
    }
    else {
        arr[y - u][x] = 'X'
    }
    return [x, y - u]
}
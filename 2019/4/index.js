const start = 171309
const end = 643603

const sixDigits = n => n.toString().length === 6
const inRange = (n, min, max) => min <= n && n <= max
const adjacentDigits = n => {
    return n.toString().split('').reduce((a, b, index, arr) => {
        if (index === 0) return false
        if (a === true) return a
        return (b === arr[index-1])
    })
}
const neverDecrease = n => {
    return n.toString().split('').reduce((a, b, index, arr) => {
        if (index === 0) return true
        if (a === false) return a
        return (b >= arr[index-1])
    })
}

const sampleTrue = 223456
const sampleFalse = 171310

console.log(sixDigits(sampleTrue))
console.log(inRange(sampleTrue, start, end))
console.log(adjacentDigits(sampleTrue))
console.log(neverDecrease(sampleTrue))

console.log(sixDigits(sampleFalse))
console.log(inRange(sampleFalse, start, end))
console.log(adjacentDigits(sampleFalse))
console.log(neverDecrease(sampleFalse))

let count = 0
for (let i = start; i <= end; i++) {
    if (sixDigits(i) && inRange(i, start, end) && adjacentDigits(i) && neverDecrease(i)) {
        count++
    }
}

// Part 1
console.log(count)
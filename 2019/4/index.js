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
const min2adjacents = n => {
    return n.toString().split('').reduce((a, b, index, arr) => {
        if (index === 0) { 
            a.push(1)
            return a
        }
        if (arr[index-1] === b) {
            a[a.length-1] = a[a.length-1] + 1
            return a
        }
        else {
            a.push(1)
            return a
        }
    }, []).some(x => x === 2)
}
const neverDecrease = n => {
    return n.toString().split('').reduce((a, b, index, arr) => {
        if (index === 0) return true
        if (a === false) return a
        return (b >= arr[index-1])
    })
}

const sampleTrue = 223456
const sampleFalse = 111222

console.log(sixDigits(sampleTrue))
console.log(inRange(sampleTrue, start, end))
console.log(adjacentDigits(sampleTrue))
console.log(neverDecrease(sampleTrue))
console.log(min2adjacents(sampleTrue))

console.log(sixDigits(sampleFalse))
console.log(inRange(sampleFalse, start, end))
console.log(adjacentDigits(sampleFalse))
console.log(neverDecrease(sampleFalse))
console.log(min2adjacents(sampleFalse))


// Part 1
let count = 0
for (let i = start; i <= end; i++) {
    if (sixDigits(i) && inRange(i, start, end) && adjacentDigits(i) && neverDecrease(i)) {
        count++
    }
}

console.log(count)

// Part 2
count = 0
for (let i = start; i <= end; i++) {
    if (sixDigits(i) && inRange(i, start, end) && adjacentDigits(i) && neverDecrease(i) && min2adjacents(i)) {
        count++
    }
}

console.log(count)
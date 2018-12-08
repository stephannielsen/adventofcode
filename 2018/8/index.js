const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

let input = [];

rl.on('line', (line) => {
    input = line.split(' ').map(p => parseInt(p));
})
.on('close', () => {
    calculateMetaSum(input);

    console.log("Meta sum:", metaSum);

    var root = calculateNodeValue({
        nodeValue: 0,
        rest: input
    });

    console.log("Root value:", root.nodeValue);
});

let metaSum = 0;
const calculateMetaSum = (arr) => {
    var childCount = arr[0];
    if (childCount === 0) {
        metaSum += arr.slice(2, 2 + arr[1]).reduce((acc, curr) => acc + curr);
        var leaf = arr.splice(0, 2 + arr[1]);
        return arr;
    }
    var count = 0;
    while (count < childCount) {
        arr = arr.slice(0,2).concat(calculateMetaSum(arr.slice(2)));
        count++;
    }
    metaSum += arr.slice(2, 2 + arr[1]).reduce((acc,curr) => acc + curr);
    var leaf = arr.splice(0, 2 + arr[1]);
    return arr;
}

const calculateNodeValue = (node) => {
    var arr = node.rest;
    var childCount = arr[0];
    if (childCount === 0) {
        var value = arr.slice(2, 2 + arr[1]).reduce((acc, curr) => acc + curr);
        arr.splice(0, 2 + arr[1]);
        return {
            nodeValue: value,
            rest: arr
        }
    }
    var children = [];
    while (children.length < childCount) {
        var child = calculateNodeValue({
            nodeValue: 0,
            rest: arr.slice(2)
        });
        children.push(child);
        arr = arr.slice(0,2).concat(child.rest);
    }
    var refs = arr.slice(2, 2 + arr[1]);
    var value = 0;
    for (var i = 0; i < refs.length; i++) {
        if (children[refs[i]-1]) {
            value += children[refs[i]-1].nodeValue;
        }
    }
    arr.splice(0, 2 + arr[1]);
    return {
        nodeValue: value,
        rest: arr
    };
}
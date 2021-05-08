// var test = require('./test.js');

// var matrix_a = [
//     [1, 2, 3],
//     [4, 5, 6]
// ];

// var matrix_b = [
//     [10, 11],
//     [20, 21],
//     [30, 31]
// ];

// console.log(test.multiply(matrix_a, matrix_b))

var distributed = require('./handler.js');

distributed.run([1, 10, 100, 1000, 10000, 100000]);
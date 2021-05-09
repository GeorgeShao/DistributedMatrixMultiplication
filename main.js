var fs = require('fs')
var test = require('./static/localtest.js');
var distributed = require('./handler.js');

let startTime = Date.now();

// var matrix_a = [
//     [1345, 236, 364, 4235, 7876, 242, 787, 12235, 978548, 389489],
//     [41345, 246, 3634, 2735, 2976, 2342, 7887, 152235, 98548, 9383]
// ];

// var matrix_b = [
//     [9038903, 435654],
//     [3945894, 214645],
//     [938943, 3464464],
//     [3945894, 213545],
//     [938943, 3464464],
//     [3482387, 289336],
//     [35235, 5865865],
//     [234234, 235325],
//     [56765, 123321],
//     [2343246, 63463]
// ];

csv_str = ""

fs.readFile("./sample_data/numbers_verybig.csv", 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    csv_str = data

    var matrix_a = csv_str.split("\n").map(function(row){return row.split(",");})
    var matrix_b = csv_str.split("\n").map(function(row){return row.split(",");})

    console.log(test.multiply(matrix_a, matrix_b))

    // console.log(
    //     `Finished job, runtime = ${
    //         Math.round((Date.now() - startTime) / 100) / 10
    //     }s`
    // );

    distributed.run(matrix_a, matrix_b);
});

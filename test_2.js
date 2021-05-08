const fs = require('fs');

fs.writeFile('./params.txt', "TEST123", function (err) {
    if (err) return console.log(err);
        console.log("Saved input parameters to file.");
    });

fs.readFile('./params.txt', 'utf8' , (err, data) => {
    if (err) return console.log(err);
        console.log("Read input parameters from file.");
        console.log(data);
    });

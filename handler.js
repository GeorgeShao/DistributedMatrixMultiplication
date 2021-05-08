exports.run = function(input_a){
    console.log("Initializing client...");

    fs = require('fs')
    fs.readFile("./events.js", 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        input_a = "[" + input_a + "]"
        var data = data.replace("INPUT_A", input_a);
        fs.writeFile("./events.js", data, 'utf8', function (err) {
            if (err) return console.log(err);
            var mainfunc = require('./events.js');
            require("dcp-client")
                .init()
                .then(mainfunc.start)
                .finally(() => setImmediate(process.exit));
            console.log("Initialized client.");
        });
    });
}
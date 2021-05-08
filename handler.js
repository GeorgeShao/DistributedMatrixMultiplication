exports.run = function(a, b){
    console.log("Initializing client...");

    fs = require('fs')
    fs.readFile("./events.js", 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Step 1: Format Input
        var b_formatted = []
        for (var i = 0; i < b[0].length; i++){
            temp_b = []
            for (var j = 0; j < b.length; j++){
                temp_b.push(b[j][i])
            }
            b_formatted.push(temp_b)
        }

        // Step 2: Split Into Multiple Problems
        sums = []
        equations = []

        for (var h = 0; h < b_formatted.length; h++){
            for (var i = 0; i < a.length; i++){
                sum = 0
                equation = ""
                for (var j = 0; j < a[0].length; j++){
                    sum += a[i][j] * b_formatted[h][j]
                    equation += a[i][j].toString() + "*" + b_formatted[h][j].toString()
                    if (j != a[0].length-1){
                        equation += "+"
                    }
                }
                equations.push(equation)
            }
        }

        console.log(equations)

        // Step 3: Send Output
        var data = ""
        fs.readFile("./static/template_events.js", 'utf8', function (err, read_data) {
            if (err) {
                return console.log(err);
            }
            data = read_data
        });
        equations = "[" + equations + "]"
        data = data.replace("REF_INPUT", equations);
        data = data.replace("REF_B_FORMATTED_LEN", b_formatted.length);
        fs.writeFile("./events.js", data, 'utf8', function (err) {
            if (err) return console.log(err);
            var mainfunc = require('./events.js');
            require("dcp-client")
                .init()
                .then(mainfunc.start)
                .finally(() => process.exit);
            console.log("Initialized client.");
        });
    });
}

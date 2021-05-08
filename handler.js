exports.run = function(){
    console.log("Initializing client...");
    var mainfunc = require('./events.js');
    require("dcp-client")
        .init()
        .then(mainfunc.start)
        .finally(() => setImmediate(process.exit));
    console.log("Initialized client.");
    
}
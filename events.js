exports.start = async function main() {
    const compute = require("dcp/compute");
    const wallet = require("dcp/wallet");

    fs = require('fs')

    let job, startTime;

<<<<<<< HEAD
    job = compute.for(INPUT_A, function myfunction(num) {
=======
    job = compute.for(1,10,100,1000,10000,100000, function myfunction(num) {
>>>>>>> d363ce1769021dd26fdc2e0acbc7d6ba42d2334c
    var factorial;
    factorial = 1;
    for (var i = 1, _pj_a = (num + 1); (i < _pj_a); i += 1) {
        factorial *= i;
    }
    progress();
    return `${num}! = ${factorial}`;
}


);

    job.on("accepted", function (ev) {
        console.log(`Job accepted by scheduler.`);
        console.log(`Job id: ${this.id}`);
        startTime = Date.now();
    });

    job.on("complete", function (ev) {
        console.log(
            `Finished job, runtime = ${
                Math.round((Date.now() - startTime) / 100) / 10
            }s`
        );
    });

    job.on("readystatechange", function (arg) {
        console.log(`New ready state: ${arg}`);
        if (arg == "exec") {
            console.log("Please enter your bank keystore password:");
        } else if (arg == "deploying") {
            console.log("Please enter your id keystore password:");
        } else if (arg == "authorizeHold") {
            console.log("Awaiting fee structure auth...");
        } else if (arg == "authorizeFeeStructure") {
            console.log("Awaiting scheduler job acceptance...");
        } else if (arg == "deployed") {
            console.log("Job deployed!");
            console.log("Listening for results...");
        }
    });

    job.on("result", function (ev) {
        console.log(
            `Received result (slice ${ev.sliceNumber} @ ${
                Math.round((Date.now() - startTime) / 100) / 10
            }s) : ${ev.result}`
        );
    });

    job.public.name = "example project, nodejs";
    job.public.description = "example project description";

    let ks = await wallet.get(); /* usually loads ~/.dcp/default.keystore */
    job.setPaymentAccountKeystore(ks);
    await job.exec(compute.marketValue);
}

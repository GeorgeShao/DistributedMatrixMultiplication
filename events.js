exports.start = async function main() {
    const compute = require("dcp/compute");
    const wallet = require("dcp/wallet");

    fs = require('fs')

    let job, startTime;

    input = [1*10+2*20+3*30,4*10+5*20+6*30,1*11+2*21+3*31,4*11+5*21+6*31]

    job = compute.for(input, function myfunction(num) {
        num = num
        progress();
        return `${num}`;
    });

    results = []

    job.on("accepted", function (ev) {
        console.log(`Job accepted by scheduler.`);
        console.log(`Job id: ${this.id}`);
        startTime = Date.now();
        results = new Array(input.length);
    });

    job.on("complete", function (ev) {
        console.log(
            `Finished job, runtime = ${
                Math.round((Date.now() - startTime) / 100) / 10
            }s`
        );
        console.log(results)
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
        results[ev.sliceNumber] = parseInt(ev.result)
    });

    job.public.name = "Distributed Matrix Multiplication";
    job.public.description = "by George Shao";

    let ks = await wallet.get(); /* usually loads ~/.dcp/default.keystore */
    job.setPaymentAccountKeystore(ks);
    await job.exec(compute.marketValue);
}

var fs = require("fs");
var https = require("https");
var path = require("path");
var spawn = require("child_process").spawn;
var program = require("commander").program;
program.version('0.0.1');
program
    .command("download [dir]")
    .option("-t, --type <type>", "type of minecraft server", "spigot")
    .alias("d")
    .action(function (dir, cmdObj) {
    var url;
    switch (cmdObj.type) {
        case "spigot": url = "https://cdn.getbukkit.org/spigot/spigot-1.16.4.jar";
        case "bukkit": url = "https://cdn.getbukkit.org/craftbukkit/craftbukkit-1.16.4.jar";
        case "paper": url = "https://papermc.io/api/v1/paper/1.16.4/318/download";
    }
    var file = fs.createWriteStream(path.format({
        dir: dir === undefined ? "." : dir,
        base: "server.jar"
    }));
    https.get(url, function (response) {
        response.pipe(file);
    });
});
program
    .command("run [dir]")
    .option("-e --eula", "complete the eula")
    .alias("r")
    .action(function (dir, cmdObj) {
    if (cmdObj.eula) {
        fs.writeFile(path.format({
            dir: dir === undefined ? "." : dir,
            base: "eula.txt"
        }), "eula=true", function (err) {
            if (err === null)
                return console.log(err);
        });
    }
    var run = spawn("java", ["-jar", "server.jar"], { cwd: dir });
    run.stdout.on("data", function (data) {
        console.log("stdout: " + data);
    });
    run.stderr.on("data", function (data) {
        console.log("stderr: " + data);
    });
    run.on('error', function (error) {
        console.log("error: " + error.message);
    });
    run.on("close", function (code) {
        console.log("child process exited with code " + code);
    });
});
program.parse(process.argv);

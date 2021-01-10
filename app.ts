const fs = require("fs")
const https = require("https")
const path = require("path")
const { spawn } = require('child_process');

const { program } = require("commander")
program.version('0.0.1')

program
    .command("download [dir]")
    .option("-t, --type <type>", "type of minecraft server", "spigot")
    .alias("d")
    .action((dir, cmdObj) => {
        let url;

        switch (cmdObj.type) {
            case "spigot": url = "https://cdn.getbukkit.org/spigot/spigot-1.16.4.jar"
            case "bukkit": url = "https://cdn.getbukkit.org/craftbukkit/craftbukkit-1.16.4.jar"
            case "paper": url = "https://papermc.io/api/v1/paper/1.16.4/318/download"
        }
        const file = fs.createWriteStream(path.format({
            dir: dir === undefined ? "." : dir,
            base: "server.jar"
        }))

        https.get(url, function(response) {
            response.pipe(file)
        })
    })

program
    .command("run [dir]")
    .option("-e --eula", "complete the eula")
    .alias("r")
    .action((dir, cmdObj) => {
        if (cmdObj.eula) {
            fs.writeFile(path.format({
                dir: dir === undefined ? "." : dir,
                base: "eula.txt"
            }), "eula=true", (err) => {
                if (err === null) return console.log(err)
            })
        }
        
        var child = spawn("java", ["-jar", "server.jar", "nogui"], {cwd: dir})

        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
        process.stdin.pipe(child.stdin);
    })

program.parse(process.argv);
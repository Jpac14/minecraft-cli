import { fstat } from "fs";

const { program } = require("commander")
program.version('0.0.1')

const os = require("os")
const fs = require("fs")
const https = require("https")

const download = require("./commands/download")
const run = require("./commands/run")

function init() {
    const homeDir = os.homeDir()
    const programDir = `${homeDir}/.mccli`

    if (!fs.existsSync(programDir)) {
        fs.mkdirSync(programDir)
    }

    const serverFile = fs.createWriteStream(`${programDir}/server.json`)

    https.get(url, function(response) {
        response.pipe(file)
    })
}

program
    .command("download [dir]")
    .option("-t, --type <type>", "type of minecraft server", "spigot")
    .option("-mcv, --mcversion <version>", "minecraft server version e.g. 1.16.4", "1.16.4")
    .alias("d")
    .action(download.download)

program
    .command("run [dir]")
    .option("-e --eula", "complete the eula")
    .alias("r")
    .action(run.run)

program.parse(process.argv);
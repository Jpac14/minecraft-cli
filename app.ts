const { program } = require("commander")
program.version('0.0.1')

const os = require("os")
const fs = require("fs")
const https = require("https")

const download = require("./commands/download")
const run = require("./commands/run")

export const homeDir = os.homedir()
export const programDir = `${homeDir}/.mccli`

function init(callback) {
    if (!fs.existsSync(programDir)) {
        fs.mkdirSync(programDir)
    }

    const serverFile = fs.createWriteStream(`${programDir}/server.json`)

    serverFile.on("finish", () => {
        return callback()
    })

    const serverUrl = "https://raw.githubusercontent.com/Jpac14/minecraft-cli/master/list/server.json"

    https.get(serverUrl, function(response) {
        response.pipe(serverFile)
    })
}

program
    .command("download [dir]")
    .option("-mcv, --mcversion <mcversion>", "minecraft server version e.g. 1.16.4", "1.16.4")
    .option("-t, --type <type>", "type of minecraft server", "paper")
    .alias("d")
    .action((dir, cmdObj) => {
        init(() => {
            download.download(dir, cmdObj)
        })
    })

program
    .command("run [dir]")
    .option("-e --eula", "complete the eula")
    .alias("r")
    .action(run.run)

program.parse(process.argv);
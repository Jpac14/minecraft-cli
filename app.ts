const { program } = require("commander")
program.version('0.0.1')

const init = require("./commands/init")
const download = require("./commands/download")
const run = require("./commands/run")

const os = require("os")
export const programDir = `${os.homedir()}/.mccli`

program
    .command("download [dir]")
    .option("-mcv, --mcversion <mcversion>", "minecraft server version e.g. 1.16.4", "1.16.4")
    .option("-t, --type <type>", "type of minecraft server", "paper")
    .alias("d")
    .action((dir, cmdObj) => {
        init.init(() => {
            download.download(dir, cmdObj, () => void 0)
        })
    })

program
    .command("run [dir]")
    .option("-e --eula", "complete the eula")
    .alias("r")
    .action((dir, cmdObj) => {
        init.init(() => {
            run.run(dir, cmdObj)
        })
    })

program
    .command("create [dir]")
    // Download options
    .option("-mcv, --mcversion <mcversion>", "minecraft server version e.g. 1.16.4", "1.16.4")
    .option("-t, --type <type>", "type of minecraft server", "paper")
    // Run options
    .option("-e --eula", "complete the eula")
    .alias("c")
    .action((dir, cmdObj) => {
        init.init(() => {
            download.download(dir, cmdObj, () => {
                run.run(dir, cmdObj)
            })
        })
    })

program.parse(process.argv);
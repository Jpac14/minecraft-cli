const fs = require("fs")
const path = require("path")
const https = require("https")

const app = require("../app")

export function download(dir, cmdObj, callback) {
    const raw = fs.readFileSync(`${app.programDir}/server.json`)
    let json = JSON.parse(raw)


    let versions;
    if ((versions = json[cmdObj.type]) == undefined) {
        return console.error("Server type not found")
    }

    let url;

    if ((url = versions[cmdObj.mcversion]) == undefined) {
        return console.error("Minecraft version not found")
    }
    
    const file = fs.createWriteStream(path.format({
        dir: dir === undefined ? "." : dir,
        base: "server.jar"
    }))

    file.on("finish", () => {
        return callback()
    })

    https.get(url, function(response) {
        response.pipe(file)
    })
}
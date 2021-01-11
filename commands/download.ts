const fs = require("fs")
const path = require("path")
const https = require("https")

export function download(dir, cmdObj) {
    const raw = fs.readFileSync("./list/server.json")
    let json = JSON.parse(raw)

    let url = json[cmdObj.type][cmdObj.mcversion]

    console.log(url)

    const file = fs.createWriteStream(path.format({
        dir: dir === undefined ? "." : dir,
        base: "server.jar"
    }))

    https.get(url, function(response) {
        response.pipe(file)
    })
}
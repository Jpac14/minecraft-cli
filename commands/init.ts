const fs = require("fs")
const https = require("https")

const app = require("../app")

export function init(callback) {
    if (!fs.existsSync(app.programDir)) {
        fs.mkdirSync(app.app.programDir)
    }

    const serverFile = fs.createWriteStream(`${app.programDir}/server.json`)

    serverFile.on("finish", () => {
        return callback()
    })

    const serverUrl = "https://raw.githubusercontent.com/Jpac14/minecraft-cli/master/list/server.json"

    https.get(serverUrl, function(response) {
        response.pipe(serverFile)
    })
}
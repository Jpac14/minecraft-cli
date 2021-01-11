const fs = require("fs")
const path = require("path")
const { spawn } = require("child_process")

export function run(dir, cmdObj) {
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
}
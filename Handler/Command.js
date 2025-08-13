const fs = require('fs')

const Command = async Client => {
    fs.readdirSync('./Command/').forEach(async Dir => {
        fs.readdir(`./Command/${Dir}`, async(Err, Folders) => {
            Folders.forEach(async Cmd => {
                if(!Cmd.endsWith('.js')) return;
                const Commands = require(`../Command/${Dir}/${Cmd}`)
                const Command = Cmd.split('.')[0]
                Client.Çɱɗ.set(Command, Commands)
            })
        })
    })
}

module.exports = Command;
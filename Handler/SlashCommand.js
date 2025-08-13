const fs = require('fs')

const SlashCommand = async Client => {

    const ApplicationCommands = []

    fs.readdirSync('./SlashCommand/').forEach(async Dir => {
        fs.readdir(`./SlashCommand/${Dir}`, async(Err, Folders) => {
            Folders.forEach(async Cmd => {
                if(!Cmd.endsWith('.js')) return;
                const Commands = require(`../SlashCommand/${Dir}/${Cmd}`)
                Client.Çʍɗ.set(Commands.name, Commands)
                ApplicationCommands.push({
                    name: Commands.name,
                    description: Commands.description,
                    type: Commands.type,
                    options: Commands.options ? Commands.options : null,
                    default_member_permisssions: Commands.default_member_permisssions ? Commands.default_member_permisssions : null
                })
            })
        })
    })

    Client.on('ready', async() => Client.application.commands.set(ApplicationCommands))
}

module.exports = SlashCommand;
const InteractionCreate = async(Client, Interaction) => {
    if(Interaction.isCommand()) {
        const Command = Client.Çʍɗ.get(Interaction.commandName)
        if(!Command) return Interaction.reply({ content: `The Command is Disabled`, ephemeral: true })
        const Applications = []
        for(let option of Interaction.options.data) {
            if(option.type === 'SUB_COMMAND') {
                if(option.name) Applications.push(option.name)
                option.options?.forEach((x) => {
                    if(x.value) Applications.push(x.value)
                })
            } else if(option.value) Applications.push(option.value)
        }

        Command.run(Client, Interaction)
    } else if(Interaction.isSelectMenu()) {
        Client.emit('menu_yes_no', (Client, Interaction))
        
    } else if(Interaction.isButton()) {
        Client.emit('create_Ticket', (Client, Interaction))
        Client.emit('buttonTicket', (Client, Interaction))
    } 
}

module.exports = InteractionCreate;
const { MessageEmbed , MessageActionRow , MessageButton , MessageSelectMenu} = require('discord.js')

const scrimclose = {
    name:"ping",
    description:"To Show Ping Bot",


    run: async (client, Interaction, args) => {


    Interaction.channel.send({ content: `> <a:emoji_23:1108301591393611796> Ping : **${client.ws.ping}**`});


  }
};
 

module.exports = scrimclose;
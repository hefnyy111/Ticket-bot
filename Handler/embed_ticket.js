const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, MessageAttachment, TextInputComponent, Modal, Message, Interaction } = require('discord.js')
const embedControl = require('../embedControl/embedControl')
/**
 * 
 * @param { import('discord.js').Client } Client 
 * @param { import('discord.js').Message } Message
 */

const embed_ticket = async Client => {
    Client.on('messageCreate', async Message => {
        if (Message.content.startsWith('ticket-o')) {
            Message.delete()
            const embed = new embedControl().embed(
                {
                    descrip: `**
<a:emoji_211:1366513064652046416> Welcome to __Nexus Store__ 

<a:736257973906571306:1366513669281939547> Available through all transfer methods, whether PayPal, Credit, or Vodafone Cash

<a:awdaira:1366513025544224798> To purchase any product you want, please click the button below**`
                , title: '༺ Order Here ༻'
                , image: 'https://cdn.discordapp.com/attachments/1347357475384463463/1366516363685789817/nxss.pnghuijkl.png?ex=68113b09&is=680fe989&hm=846ff58f66fdddaf4dc2c5b1e64f32f616ad6dd94a9645f506eb02c9818b8a7d&'
                , thumbnall: Message.guild.iconURL()
                  }
            )
           
            const button = new MessageActionRow()
            .addComponents(new MessageButton()
        .setLabel('Create order ticket').setEmoji('<a:aemoji_:1366512988768567466>').setStyle('SECONDARY').setCustomId('order'))
            Message.channel.send({ embeds: [embed] , components: [button]})
        }
    })
}

module.exports = embed_ticket;
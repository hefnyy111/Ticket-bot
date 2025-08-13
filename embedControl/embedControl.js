const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, MessageAttachment, TextInputComponent, Modal, Message, Interaction } = require('discord.js')


class embedControl {

    embed({
        descrip,
        title,
        image,
        thumbnall
    }) {
       const embed = new MessageEmbed()
       .setColor('#4482ff')
       .setTitle(title)
       .setDescription(descrip)
       .setImage(image)
       .setThumbnail(thumbnall)
       .setTimestamp()
  
       return embed;
    }

    embedPremisiion() {
        const embed = new MessageEmbed()
        .setColor('#4482ff')
        .setDescription(`**<a:736257973906571306:1366513669281939547> Error <a:736257973906571306:1366513669281939547>
            
        <a:off:1366539773618950235> انت لسا من طاقم العمل**`)

        return embed;
    }

    buttonPremisiion() {
        const butt = new MessageActionRow() 
        .addComponents(new MessageButton() .setLabel('حسنا').setStyle('SECONDARY').setEmoji('<a:w022_1:1366762708778750006>').setCustomId('ok'))

        return butt;
    }

}

module.exports = embedControl;
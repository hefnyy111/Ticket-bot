const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, MessageAttachment } = require('discord.js')

const { Modal, showModal, TextInputComponent } = require('discord-modals')
const { Database } = require('st.db')
const cl = new Database('Database/claim')
const closee = new Database('Database/close')
const st1 = new Database('Database/createTicket')

const embedControl = require('../embedControl/embedControl')

const embedPre = new embedControl().embedPremisiion()
const embedBut = new embedControl().buttonPremisiion()

const roleIdTeam = '1366411515942539264';
const roleIdsupport = '1366411585320521809';
const buttonTicket = async (Client, Interaction) => {
    switch (Interaction.customId) {
        case 'claim': {
           const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdTeam) 
    
            if(role) {

                const getclaimed = cl.get(`Done_claimed_${Interaction.user.id}`)
                if (getclaimed) return Interaction.reply({ embeds: [new MessageEmbed().setColor('#4482ff').setDescription(`**<a:736257973906571306:1366513669281939547> تم استلام التذكرة من قبل بواسطة <@${getclaimed}>**`)], components: [embedBut], ephemeral: true })
    
                Interaction.reply({ embeds: [new MessageEmbed().setColor('#4482ff').setDescription(`** تم استلام التذكرة بواسطة طاقم العمل : <@${Interaction.user}> <a:aemoji_:1366512988768567466>**`)] })
                Interaction.channel.setName(`𝗖𝗹𝗮𝗶𝗺𝗲𝗱・𝗯𝘆・[${Interaction.user.username}]`)
                cl.set(`Done_claimed_${Interaction.user.id}`, Interaction.user.id)
            } else {
                return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
                
            }


        }

            break;

        case 'close': {
            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdTeam || role.id === roleIdsupport) 
    
            if(role) {
            const user_close = closee.get(`Ticket_Closed_${Interaction.user.id}`)
            if (user_close) return Interaction.reply({ embeds: [new MessageEmbed().setColor('#4482ff').setDescription(`**<a:736257973906571306:1366513669281939547> التذكرة مغلقة بالفعل بواسطة طاقم العمل**`)], components: [embedBut], ephemeral: true })


            const menuu = new MessageActionRow()
                .addComponents(new MessageSelectMenu()
                    .setCustomId('test')
                    .setOptions([
                        {
                            label: 'No',
                            value: 'noo'
                        }, {
                            label: 'Yes',
                            value: 'yess'
                        }
                    ])
                )

            Interaction.reply({ content: `**<a:736257973906571306:1366513669281939547> هل انت متأكد من اغلاق تذكرة الشراء **`, components: [menuu] })
            } else {
                return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
            }
        }

            break;

        case 'opennn1': {

            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdTeam || role.id === roleIdsupport) 
    
            if(role) { 
            await Interaction.deferUpdate()
            Interaction.message.delete()
            Interaction.channel.send({ embeds: [new MessageEmbed().setColor('#4482ff').setDescription(`**تم فتح التذكرة بواسطة طاقم العمل : <@${Interaction.user}> <a:aemoji_:1366512988768567466>**`)] })
            Interaction.channel.setName(`order-${st1.get(`Ticket_order_${Interaction.guild.id}`).TicketCount}`)
            Interaction.channel.setParent('1366411655533297736')
            st1.set(`TicketUser_${Interaction.user.id}`, Interaction.user.id)
            closee.delete(`Ticket_Closed_${Interaction.user.id}`)
            } else {
                return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
        }
        }

            break;

        case 'delete': {
            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdTeam || role.id === roleIdsupport) 
    
            if(role) {
            await Interaction.deferUpdate().catch(() => { })
            const Deletee = new MessageEmbed().setColor('#4482ff').setDescription(`> <a:awdaira:1366513025544224798> **Ticket Will Be Deleted In A Few Seconds**`)
            Interaction.channel.send({ embeds: [Deletee] })
            setTimeout(() => {
                
                
                st1.delete(`TicketUser_${Interaction.user.id}`).catch((err) => {
                    return;
                })


                closee.delete(`Ticket_Closed_${Interaction.user.id}`).catch((err) => {
                    return;
                })
                setTimeout(() => {
                cl.delete(`Done_claimed_${Interaction.user.id}`).catch((err) => {
                    return;
                })
            }, 1000)
            }, 4000)
            Interaction.channel.delete()
        } else {

            return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
        }
        }

            break;

        case 'trans': {
           const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdTeam || role.id === roleIdsupport) 

            const channel = Interaction.guild.channels.cache.get('1367969899393187941')
                 if(role) {
            if(channel) {
                const claimed = cl.get(`Done_claimed_${Interaction.user.id}`) ? `<a:aemoji_:1366512988768567466> <@${cl.get(`Done_claimed_${Interaction.user.id}`)}>` : '\`\`\`لم يتم استلام التذكرة بعد \`\`\`'
                const ago = Date.now();
                const embed = new MessageEmbed()
                .setColor('#4482ff')
                .setTimestamp()
                .setDescription(`**
○ Ticket owner: 
<a:aemoji_:1366512988768567466> <@${st1.get(`Ticket_order_${Interaction.guild.id}`).UserTicket}>

○ Ticket name:
\`\`\` ${Interaction.channel.name} \`\`\`

○ Ticket Panel Name:
\`\`\` Create order ticket \`\`\`

○ Ticket claim: 
${claimed} 

○ Ticket action time
<a:aemoji_:1366512988768567466> <t:${parseInt(ago / 1000)}:R>

○ Direct Transcript
\`\`\` Use Button \`\`\`

**`)
.setImage(`https://media.discordapp.net/attachments/1357976934570524754/1366426991313813578/Nexus_Store_D37165D-1.gif?ex=6828a2cd&is=6827514d&hm=5c1f5d00cbfc4d3c8f46a60978ec29ea87130181645a22b66b09aae1ced7941f&width=1027&height=65&`)
const button = new MessageActionRow()
.addComponents(new MessageButton() .setStyle('SECONDARY').setLabel('Direct Link') .setCustomId('direct'))

channel.send({embeds: [embed], components: [button]})
Interaction.reply({content: `**Done send transcript <a:w022_1:1366762708778750006>**`})

Client.on('interactionCreate', async Interaction => {
    if(Interaction.customId === 'direct') {
        Interaction.deferUpdate()
            const discordTranscripts = require('discord-html-transcripts')

const Transript = await discordTranscripts.createTranscript(Interaction.channel, {
        filename: `${Interaction.channel.name}.html`,
        poweredBy: false
      })

const sent = await Interaction.followUp({
  files: [Transript],
  fetchReply: true,
});

// 2. خذ رابط الملف من المرفقات
const fileUrl = sent.attachments.first()?.url;

         Interaction.editReply({embeds: [embed], components: [new MessageActionRow()
            .addComponents(new MessageButton() .setStyle('LINK').setLabel('Enter to view transcript').setURL(`${fileUrl}`))
        ]
     
        })
    }
})

            }
    
        } else {
            return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
        }

        }
            break;

        case 'info': {
            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdTeam) 
    
            if(role) {
            if (cl.get(`Done_claimed_${Interaction.user.id}`) === undefined) {
                const ago = Date.now();
                const claimed = cl.get(`Done_claimed_${Interaction.user.id}`) ? `<@${cl.get(`Done_claimed_${Interaction.user.id}`)}>` : 'لم يتم استلام التذكرة بعد'
                const embedss = new MessageEmbed()
                .setColor('#4482ff')
                    .setFooter(Interaction.user.username, Interaction.user.displayAvatarURL())
                    .setThumbnail(Interaction.guild.iconURL())
                    .setDescription(`
      > <a:awdaira:1366513025544224798> Ticket name
      \`\`\` ${Interaction.channel.name} \`\`\`
      > <a:awdaira:1366513025544224798> Ticket Claimed
      \`\`\` ${claimed} \`\`\`
      > <a:awdaira:1366513025544224798> Ticket owner
      <@${st1.get(`Ticket_order_${Interaction.guild.id}`).UserTicket}>
      
      > <a:awdaira:1366513025544224798> Ticket admin
      <@&1366411585320521809>

      > <a:awdaira:1366513025544224798> Ticket count
      \`\`\`${st1.get(`Ticket_order_${Interaction.guild.id}`).TicketCount} \`\`\`
      
      > <a:awdaira:1366513025544224798> Ticket Name
      \`\`\` ${Interaction.channel.name} \`\`\`
      > <a:awdaira:1366513025544224798> Ticket history
      <t:${parseInt(ago / 1000)}:R>`)
                  .setImage(`https://cdn.discordapp.com/attachments/1347357475384463463/1366506673472147466/Nexus_Store_D37165D-1.gif?ex=6811dac3&is=68108943&hm=f3d9c2eea7df122cbecd51464f90f4d46d15df62f7d676e26aca91a97c0e91a0&`)
                Interaction.reply({ embeds: [embedss], ephemeral: true })
            } else if (cl.get(`Done_claimed_${Interaction.user.id}`)) {
              Interaction.reply({embeds: [new MessageEmbed()
                .setColor('#4482ff')
                .setDescription(`\`\`\`╭───≪ SUPPORT TEAM TICKET CONTROL ≫───╮\`\`\``)
              ],components: [
                new MessageActionRow()
                .addComponents(new MessageSelectMenu() .setCustomId('asd')
            .setOptions([
                {
                    label: 'اعادة تسمية التذكرة',
                    value: 'rename'
                },
                {
                    label: 'تذكير',
                    value: 'reminder'
                },{
                    label: 'اضافة او حذف العضو',
                    value: 'add/del'
                }, {
                    label: 'اضافة او حذف رول',
                    value: 'add2/del2'
                }, {
                    label: 'حذف التذكرة',
                    value: 'dell'
                }
            ]))
              ], ephemeral: true})
            }
        } else {
            return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
        }
    }


    }
}
module.exports = buttonTicket;
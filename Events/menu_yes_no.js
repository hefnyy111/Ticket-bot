const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, MessageAttachment } = require('discord.js')

const { Modal, showModal, TextInputComponent } = require('discord-modals')
const { Database } = require('st.db')
const cl = new Database('Database/createTicket')
const closee = new Database('Database/close')
const st1 = new Database('Database/createTicket')

const embedControl = require('../embedControl/embedControl')

const embedPre = new embedControl().embedPremisiion()
const embedBut = new embedControl().buttonPremisiion()

const roleIdsupport = '1366411585320521809';

const menu_yes_no = async (Client, Interaction) => {
    switch (Interaction.values[0]) {
        case 'noo': {
            const role_claimed = cl.get(`Done_claimed_${Interaction.user.id}`)
            const roleIdTeam = role_claimed;
            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdsupport || role.id === roleIdTeam)

            if (role) {
                await Interaction.deferUpdate()
                Interaction.deleteReply()
            } else {
                return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
            }
        }
            break;

        case 'yess': {
            const role_claimed = cl.get(`Done_claimed_${Interaction.user.id}`)
            const roleIdTeam = role_claimed;
            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdsupport || role.id === roleIdTeam)

            if (role) {
                await Interaction.deferUpdate()
                if (!Interaction.member.permissions.has('MANAGE_ROLES')) return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })


                Interaction.editReply({ embeds: [new MessageEmbed().setColor('#4482ff').setDescription(`**تم غلق التذكرة بواسطة طاقم العمل : ${Interaction.user} <a:aemoji_:1366512988768567466>**`)], components: [], content: `_ _` })
                Interaction.channel.send({
                    embeds: [new MessageEmbed().setColor('#4482ff').setDescription(`**\`\`\`╭─≪ Support team ticket controls ≫─╮\`\`\`**`)], components: [
                        new MessageActionRow().addComponents(
                            new MessageButton().setLabel('Delete').setStyle('SECONDARY').setEmoji('<a:w022_2:1366811258040619078>').setCustomId('delete'),
                            new MessageButton().setLabel('Open').setStyle('SECONDARY').setEmoji('🔓').setCustomId('opennn1'),
                            new MessageButton().setLabel('Transcript').setStyle('SECONDARY').setEmoji('📄').setCustomId('trans')
                        )]
                })
                Interaction.channel.setParent('1366763116834062336')
                Interaction.channel.setName(`closed-${st1.get(`Ticket_order_${Interaction.guild.id}`).TicketCount}`)
                st1.delete(`TicketUser_${Interaction.user.id}`)
                closee.set(`Ticket_Closed_${Interaction.user.id}`, Interaction.user.id)
            } else {
                return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
            }
        }

            break;

        ////////////////////////
        case 'rename': {
            const role_claimed = cl.get(`Done_claimed_${Interaction.user.id}`)
const roleIdTeam = role_claimed;
            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdsupport || role.id === roleIdTeam)

            if (role) {
                const ShowModal = new Modal()
                    .setCustomId('Modall')
                    .setTitle('Rename Ticket')
                    .addComponents(new TextInputComponent().setStyle('LONG').setLabel('يرجى كتابة اسم التكت').setCustomId('es').setMinLength(2).setRequired(true));
                showModal(ShowModal, { client: Client, interaction: Interaction })

                Client.on('interactionCreate', async Interaction => {
                    if (Interaction.isModalSubmit()) {

                        if (Interaction.customId == 'Modall') {
                            const ID = Interaction.fields.getTextInputValue('es')
                            await Interaction.channel.setName(`**${ID}**`)
                            const re = new MessageEmbed()
                                .setColor('#4482ff')
                                .setDescription(`<a:w022_1:1366762708778750006> **Done Rename This Channel**`)
                            Interaction.channel.send({ embeds: [re] })
                        }
                    }
                })


            } else {
                return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
            }
        }
            break;

        case 'reminder': {
            const role_claimed = cl.get(`Done_claimed_${Interaction.user.id}`)
const roleIdTeam = role_claimed;
            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdsupport || role.id === roleIdTeam)

            if (role) {
                const user1 = st1.get(`Ticket_order_${Interaction.guild.id}`).UserTicket
                const user2 = Interaction.guild.members.cache.get(user1)
                // if (user2.id === Interaction.user.id) return Interaction.reply({content: "<a:736257973906571306:1366513669281939547>** You can't give yourself**"} ,ephemeral: true)
                user2.send({
                    content: `**
          > <a:emoji_211:1366513064652046416> Reminder : <@${user1}>
          
          > <a:736257973906571306:1366513669281939547> I've been reminded to head to ticket number <#${Interaction.channel.id}>
          **`, embeds: [new MessageEmbed()
                        .setColor("#4482ff")
                        .setImage(`https://media.discordapp.net/attachments/1357976934570524754/1366426991313813578/Nexus_Store_D37165D-1.gif?ex=6812394d&is=6810e7cd&hm=5689f4f129cd1aafe4eeb043ec05f49b2332ab8e71f747efa0325335127e844a&width=1027&height=65&`)
                    ]
                })

                const remi = new MessageEmbed()
                    .setColor("#4482ff")
                    .setDescription(`<a:w022_1:1366762708778750006> **The person was reminded in private <@${user1}>**`)

                Interaction.reply({ embeds: [remi] })
            } else {
                return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
            }
        }

            break;

        case 'add/del': {
            const role_claimed = cl.get(`Done_claimed_${Interaction.user.id}`)
const roleIdTeam = role_claimed;
            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdsupport || role.id === roleIdTeam)

            if (role) {
                const bt = new MessageActionRow()
                    .addComponents(new MessageButton().setStyle("SECONDARY").setLabel('Add Member').setCustomId("ad").setEmoji('<a:w022_1:1366762708778750006>'))
                    .addComponents(new MessageButton().setStyle("SECONDARY").setLabel('Remove Member').setCustomId("re").setEmoji('<a:w022_2:1366811258040619078>'))

                Interaction.reply({ components: [bt], ephemeral: true })


                Client.on('interactionCreate', async Interaction => {
                    if (Interaction.isButton()) {
                        if (Interaction.customId === 'ad') {
                            const ShowModal = new Modal()
                                .setCustomId('mod')
                                .setTitle('Add Member')
                                .addComponents(new TextInputComponent().setStyle('LONG').setLabel('يرجى كتابة ايدى الشخص').setCustomId('ad2').setMinLength(5).setRequired(true));
                            showModal(ShowModal, { client: Client, interaction: Interaction })
                        }
                    }
                })

                Client.on('interactionCreate', async Interaction => {
                    if (!Interaction.isModalSubmit()) return;
                    if (Interaction.customId == 'mod') {
                        let user = Interaction.fields.getTextInputValue('ad2')
                        var user2 = Interaction?.guild?.members?.cache?.get(user)

                        Interaction.channel.permissionOverwrites.edit(user2, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            ATTACH_FILES: true,
                            READ_MESSAGE_HISTORY: true,
                        })

                        if (!user2) return Interaction.reply({ content: `<a:736257973906571306:1366513669281939547> **__I can't find this member__**` })
                        const adm = new MessageEmbed()
                            .setColor("#4482ff")
                            .setDescription(`<a:w022_1:1366762708778750006> **Done Add This Member To The Ticket**`)
                        Interaction.channel.send({ embeds: [adm] })

                        Interaction.reply({ content: `<a:w022_1:1366762708778750006> **Done**`, ephemeral: true })
                        Client.delete()
                    }
                })

                Client.on('interactionCreate', async Interaction => {
                    if (Interaction.isButton()) {
                        if (Interaction.customId === 're') {
                            const ShowModal = new Modal()
                                .setCustomId('mod2')
                                .setTitle('Remove Member')
                                .addComponents(new TextInputComponent().setStyle('LONG').setLabel('يرجى كتابة ايدى الشخص').setCustomId('add').setMinLength(5).setRequired(true));
                            showModal(ShowModal, { client: Client, interaction: Interaction })
                        }
                    }
                })

                Client.on('interactionCreate', async Interaction => {
                    if (!Interaction.isModalSubmit()) return;
                    if (Interaction.customId == 'mod2') {
                        let user = Interaction.fields.getTextInputValue('add')
                        var user2 = Interaction?.guild?.members?.cache?.get(user)
                        Interaction.channel.permissionOverwrites.edit(user2, {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false,
                            ATTACH_FILES: false,
                            READ_MESSAGE_HISTORY: false,
                        })
                        if (!user2) return Interaction.reply({ content: `<a:736257973906571306:1366513669281939547> **__I can't find this member__**` })

                        const rem = new MessageEmbed()
                            .setColor("#4482ff")
                            .setDescription(`<a:w022_1:1366762708778750006> **Done Remove This Member From The Ticket**`)
                        Interaction.channel.send({ embeds: [rem] })
                    }
                })
            } else {
                return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
            }
        }

            break;

        case 'add2/del2': {
            const role_claimed = cl.get(`Done_claimed_${Interaction.user.id}`)
const roleIdTeam = role_claimed;

            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdsupport || role.id === roleIdTeam)

            if (role) {
                const bt2 = new MessageActionRow()
                    .addComponents(new MessageButton().setStyle("SECONDARY").setLabel('Add Role').setCustomId("addd").setEmoji('<a:w022_1:1366762708778750006> '))
                    .addComponents(new MessageButton().setStyle("SECONDARY").setLabel('Remove Role').setCustomId("reee").setEmoji('<a:w022_2:1366811258040619078>'))

                Interaction.reply({ components: [bt2], ephemeral: true })


                Client.on('interactionCreate', async Interaction => {
                    if (Interaction.isButton()) {
                        if (Interaction.customId === 'addd') {
                            const ShowModal = new Modal()
                                .setCustomId('mod')
                                .setTitle('Add Role')
                                .addComponents(new TextInputComponent().setStyle('LONG').setLabel('يرجى كتابة ايدى الرول').setCustomId('adds').setMinLength(5).setRequired(true));
                            showModal(ShowModal, { client: Client, interaction: Interaction })
                        }
                    }
                })

                Client.on('interactionCreate', async Interaction => {
                    if (!Interaction.isModalSubmit()) return;
                    if (Interaction.customId == 'mod') {
                        let role = Interaction.fields.getTextInputValue('adds')
                        var role2 = Interaction?.guild?.roles?.cache?.get(role)
                        Interaction.channel.permissionOverwrites.edit(role2, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            ATTACH_FILES: true,
                            READ_MESSAGE_HISTORY: true,
                        })

                        const adr = new MessageEmbed()
                            .setColor("#4482ff")
                            .setDescription(`<a:w022_1:1366762708778750006> **Done Add This Role To The Ticket**`)
                        Interaction.reply({ embeds: [adr] })
                    }
                })

                Client.on('interactionCreate', async Interaction => {
                    if (Interaction.isButton()) {
                        if (Interaction.customId === 'reee') {
                            const ShowModal = new Modal()
                                .setCustomId('mod1')
                                .setTitle('Remove Role')
                                .addComponents(new TextInputComponent().setStyle('LONG').setLabel('يرجى كتابة ايدى الرول').setCustomId('add33').setMinLength(5).setRequired(true));
                            showModal(ShowModal, { client: Client, interaction: Interaction })
                        }
                    }
                })

                Client.on('interactionCreate', async Interaction => {
                    if (!Interaction.isModalSubmit()) return;
                    if (Interaction.customId == 'mod1') {
                        let role = Interaction.fields.getTextInputValue('add33')
                        var role2 = Interaction?.guild?.roles?.cache?.get(role)
                        Interaction.channel.permissionOverwrites.edit(role2, {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false,
                            ATTACH_FILES: false,
                            READ_MESSAGE_HISTORY: false,
                        })

                        const rer = new MessageEmbed()
                            .setColor("#4482ff")
                            .setDescription(`<a:w022_1:1366762708778750006> **Done Remove This Role From The Ticket**`)
                        Interaction.channel.send({ embeds: [rer] })
                    }
                })
            } else {
                return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
            }
        }
            break;

        case 'dell': {
            const role_claimed = cl.get(`Done_claimed_${Interaction.user.id}`)
const roleIdTeam = role_claimed;
            const role = Interaction.member.roles?.cache?.some(role => role.id === roleIdsupport || role.id === roleIdTeam)

            if (role) {
                const Deletee = new MessageEmbed().setColor('#4482ff').setDescription(`> <a:awdaira:1366513025544224798> **Ticket Will Be Deleted In A Few Seconds**`)
                Interaction.reply({ embeds: [Deletee] })
                setTimeout(() => {
                    Interaction.channel.delete()

                    st1.delete(`TicketUser_${Interaction.user.id}`).catch((err) => {
                        return;
                    })

                    cl.delete(`Done_claimed_${Interaction.user.id}`).catch((err) => {
                        return;
                    })
                    closee.delete(`Ticket_Closed_${Interaction.user.id}`).catch((err) => {
                        return;
                    })

                }, 4000)
            } else {
                return Interaction.reply({ embeds: [embedPre], components: [embedBut], ephemeral: true })
            }
        }

    }
}

module.exports = menu_yes_no;
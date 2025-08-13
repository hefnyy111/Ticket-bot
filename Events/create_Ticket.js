const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, MessageAttachment } = require('discord.js')

const { Modal, showModal, TextInputComponent } = require('discord-modals')
const { Database } = require('st.db')
const st1 = new Database('Database/createTicket')
const embedControl = require('../embedControl/embedControl')
const embedBut = new embedControl().buttonPremisiion()
const create_Ticket = async (Client, Interaction) => {
    switch (Interaction.customId) {
        case 'order': {
            if (st1.get(`TicketUser_${Interaction.user.id}`)) return Interaction.reply({embeds: [new MessageEmbed()
                .setColor('#4482ff')
            .setDescription(`**<a:736257973906571306:1366513669281939547> تحذير: انت لديك تذكرة شراء بالفعل**`)
            ] , components: [embedBut], ephemeral: true })

        if(st1.get(`TicketUser_${Interaction.user.id}`)) return Interaction
            Interaction.reply({
                content: `**\`\`\` ⚠ Notes ⚠ \`\`\`
> \`1-\` يرجي عند فتح التذكرة انتظار رد طاقم العمل
 
> \`2-\` يرجي عدم المنشن اكثر من مرتين

> \`3-\` يرجي الاحترام المتبادل اثناء التعامل مع طاقم العمل
**`, components: [new MessageActionRow()
                    .addComponents(new MessageButton().setStyle('SECONDARY').setLabel('Compelete').setCustomId('compelete'))
                ], ephemeral: true
            })


        }
            break;
        /// compelete
        case 'compelete': {
            await Interaction.deferUpdate()
            setTimeout(() => {
                Interaction.editReply({ content: `**برجاء الانتظار <a:atls_loading:1366512976852549784>\n ▇**`, components: [] })

            }, 1000)
            setTimeout(() => {
                Interaction.editReply({ content: `**برجاء الانتظار <a:atls_loading:1366512976852549784>\n ▇▇**`, components: [] })

            }, 2000)

            setTimeout(() => {
                Interaction.editReply({ content: `**برجاء الانتظار <a:atls_loading:1366512976852549784>\n ▇▇▇**`, components: [] })

            }, 3000)

            setTimeout(() => {
                Interaction.editReply({ content: `**برجاء الانتظار <a:atls_loading:1366512976852549784>\n ▇▇▇▇**`, components: [] })

            }, 4000)

            setTimeout(() => {
                Interaction.editReply({ content: `**برجاء الانتظار <a:atls_loading:1366512976852549784>\n ▇▇▇▇▇**`, components: [] })

            }, 5000)

            setTimeout(() => {
                Interaction.editReply({
                    content: `_ _`, embeds: [new MessageEmbed()
                        .setColor('#4482ff')
                        .setDescription(`**لفتح تذكرة اضغط علي الزر بالاسفل**`)

                    ], components: [new MessageActionRow().addComponents(new MessageButton().setStyle('SECONDARY').setLabel('Open ticket now !').setEmoji('<a:awdaira:1366513025544224798>').setCustomId('open'))]
                })
            }, 6500)
        }

            break;
        /// open now
        case 'open': {
            const modal = new Modal()
                .setTitle('Open order ticket')
                .setCustomId('open-ticket')
                .addComponents(
                    new TextInputComponent().setLabel('يرجي كتابة طلبك هنا').setStyle('SHORT').setMinLength(2).setRequired(true).setCustomId('type-order'),
                    new TextInputComponent().setLabel('يرجي كتابة طريقة التعامل').setPlaceholder('Paypal / Vf-Cash/ Credits/ Other').setRequired(true).setStyle('SHORT').setCustomId('transfer'),
                )

            showModal(modal, { client: Client, interaction: Interaction })

        }

            Client.on('interactionCreate', async Interaction => {
                if (Interaction.isModalSubmit()) {
                    if (Interaction.customId === 'open-ticket') {
                        await Interaction.deferUpdate()
                        const product = Interaction.fields.getTextInputValue('type-order')
                        const type_transfer = Interaction.fields.getTextInputValue('transfer')

          
                        st1.add(`Ticket_Count_${Interaction.guild.id}`, 1)
                        const ticket = st1.get(`Ticket_Count_${Interaction.guild.id}`)
                        const idd = ticket.toString().padStart(2);
                        Interaction.guild.channels.create(`✔・${Interaction.user.username}_${product}`, {
                            type: 'GUILD_TEXT',
                            permissionOverwrites: [
                                {
                                    id: Interaction.guild.roles.everyone.id,
                                    deny: ['VIEW_CHANNEL']
                                }, {
                                    id: Interaction.user.id,
                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                                }, {
                                    id: '1366411585320521809',
                                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                                }, {
                                    id: '1366411515942539264',
                                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                                }
                            ],
                            //open
                            parent: '1366411655533297736'
                        }).then((Channel) => {

                            Interaction.editReply({ content: `**Ticket Created: <#${Channel}> <a:w022_1:1366762708778750006>**`, embeds: [], components: [], ephemeral: true })
                            
                            st1.set(`TicketUser_${Interaction.user.id}`, {
                                user: Interaction.user.id,

                            }, Channel.id)
                            // data
                            setTimeout(() => {
                                st1.set(`Ticket_order_${Interaction.guild.id}`, {
                                    TicketCount: idd,
                                    UserTicket: Interaction.user.id,
                                    guild: Interaction.guild.name,
                                    CreatedBy: Interaction.user.id
                                })
                            }, 2000)


                            const embed = new embedControl()
                            Channel.send({
                                content: `**        
\`-\` Welcome <@${Interaction.user}> To Nexus Store Order Ticket 
\`-\` Write Your Order & Please Wait seller
\`-\` Hope Enjoy With Us.
\`!\` Ticket Count: ${idd}
\`#\` <@&1366411515942539264> & <@&1366411585320521809>**`,
                                embeds: [embed.embed({
                                    title: `Order ${product}`,
                                    image: 'https://cdn.discordapp.com/attachments/1347357475384463463/1366506673472147466/Nexus_Store_D37165D-1.gif?ex=6811dac3&is=68108943&hm=f3d9c2eea7df122cbecd51464f90f4d46d15df62f7d676e26aca91a97c0e91a0&',
                                    descrip: `**
مرحبا بك في تذكرة الشراء <@${Interaction.user}> <a:DF_9sky:1366512958112530604>
                
يرجي الالتزام بالقواعد التي قمت بالموافقة عليها قبل فتح التذكرة <a:736257973906571306:1366513669281939547>
              
<a:aCrew:1366513079554408449> المنتج : 
\`\`\` ${product} \`\`\`
                
<a:awdaira:1366513025544224798> التعامل او نوع التحويل : 
\`\`\` ${type_transfer} \`\`\`**`

                                })

                                ], components: [new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setLabel('Close Ticket')
                                            .setStyle('SECONDARY')
                                            .setEmoji('🔒')
                                            .setCustomId('close'),
                                        new MessageButton()
                                            .setLabel('Claim Ticket')
                                            .setStyle('SECONDARY')
                                            .setEmoji('<a:w022_1:1366762708778750006>')
                                            .setCustomId('claim'),
                                        new MessageButton()
                                            .setLabel('Info')
                                            .setStyle('SECONDARY')
                                            .setEmoji('<a:aemoji_:1366512988768567466>')
                                            .setCustomId('info'),
                                    )
                                ]

                            })
                        })
                    }
                }
            })

            break;

        case 'ok': {
            await Interaction.deferUpdate()
            Interaction.deleteReply()
        }

    }
}

module.exports = create_Ticket;
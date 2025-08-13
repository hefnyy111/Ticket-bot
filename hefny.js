const express = require('express')
const app = express()

app.get("/", (req, res) => {
  res.send(new Date())
})

app.listen(3000, () => {
  console.log('Server Started With Port : 3000')
})

const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, MessageAttachment} = require('discord.js')

const { Modal, showModal, TextInputComponent } = require('discord-modals')
const client = new Client({ intents: 32767 })
const fs = require('fs')

const db = require('best.db')
fs.readdirSync('./Handler/').forEach(async Handler => require(`./Handler/${Handler}`)(client))

client.Çɱɗ = new Collection()
client.Çʍɗ = new Collection()
client.PREFIX = '=';
client.database = db;

client.on('ready', async => {
  client.user.setActivity('online')
  console.log('bot is online !');
  
})

process.on("unhandledRejection", error => {
  
});


setTimeout(async () => {
  if (!client || !client.user) {
    process.kill(1)
  }
}, 3 * 1000 * 60)

client.login(`MTM2NjUwNzMwNTI4MDk5NTM2OA.GWLPV2.oHQB8GqsMQ8MwvaCMcIZmAhBn-p6AwrKn6vbnU`)
const { Database } = require('st.db')
const cl = new Database('Database/claim')
const closee = new Database('Database/close')
const st1 = new Database('Database/createTicket')
const cm = new Database('Database/competetion')



client.on('channelDelete', async (channel) => {
  const Fetch = channel.guild.fetchAuditLogs()
  const ModeratorID = (await Fetch).entries.first().executor.id;
  const cate = '1366411655533297736';
  const cate_close = '1366763116834062336';
  if (cate.includes(channel.parentId) || (cate_close.includes(channel.parentId))) {
    st1.delete(`TicketUser_${ModeratorID}`).catch((err) => {
      return;
    })

    cl.delete(`Done_claimed_${ModeratorID}`).catch((err) => {
      return;
    })
    closee.delete(`Ticket_Closed_${ModeratorID}`).catch((err) => {
      return;
    })
  }

})


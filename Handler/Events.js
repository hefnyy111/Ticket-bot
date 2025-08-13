const fs = require('fs')

const Events = async Client => {
    fs.readdir('./Events/', async (Err, Files) => {
        Files.forEach(async Events => {
            const EventsDir = require(`../Events/${Events}`)
            const Event = Events.split('.')[0]
            Client.on(Event, EventsDir.bind(null, Client))
        })
    })
}

module.exports = Events;
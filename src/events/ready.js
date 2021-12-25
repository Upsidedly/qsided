const client = require('../index.js').client
const data = require('../handler.js')
const config = require('../config.json')

client.once('ready', async () => {
    client.user.setPresence({ activities: [{ name: 'the ships', type: 'WATCHING'}] })
    console.log(`%c${client.user.tag} is online!`,'color:green')
    await data.createCommand(client, client.guilds.cache.map(guild => guild.id))
})
const client = require('./index.js').client

async function createCommand(client, guilds) {
    const data = [
        {
            name: 'echo',
            description: 'Echoes your text!',
            options: [
                {
                    name: 'text',
                    type: 'STRING',
                    description: 'The text to echo back',
                    required: true
                }
            ]
        },

        {
            name: 'map',
            description: 'Fortnite\'s current map.'
        },

        {
            name: 'stats',
            description: 'Get the stats of a user.',
            options: [
                {
                    name: 'user',
                    type: 'STRING',
                    description: 'The user to get stats for.',
                    required: true
                }
            ]
        }
    ]
    if (typeof guilds === 'string') guilds = [guilds]
    for (const guildId of guilds) {
         await client.guilds.cache.get(guildId)?.commands.set(data)
    }
}

module.exports = { createCommand };
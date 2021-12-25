const client = require('../index.js').client

client.on('interactionCreate', async inter => { 
    if (inter.isCommand()) {
        let slashCommands = client.slashcmds.get(inter.commandName)
        if (slashCommands) slashCommands.run(inter)

        const date = new Date()
        console.log(`Ran "${inter.commandName}" at ${date.toUTCString()}`)
    }
})
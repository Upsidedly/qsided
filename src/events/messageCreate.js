const client = require('../index.js').client
const config = require('../config.json')

client.on('messageCreate', async message => {
    if(message.author.bot || message.channel.type == 'DM') return

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    let commands = client.commands.get(cmd.slice(config.prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(config.prefix.length)));
    if(commands) {
        if (!message.content.startsWith(config.prefix)) return
        commands.run(client, message, args, config.prefix);
    }
})
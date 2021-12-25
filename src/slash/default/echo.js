const discord = require('discord.js')
const swag = require('../../swag.js')

module.exports.run = async (inter) => {
	const input = inter.options.getString('text');
    inter.reply({content: input})
}

module.exports.help = {
    name: 'echo',
    permission: []
}
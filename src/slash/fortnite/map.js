const discord = require('discord.js');
const swag = require('../../swag');
const axios = require('axios');
const client = require('../../index').client;

module.exports.run = async (inter) => {
	let req = await axios({
        url: 'https://fortnite-api.com/v1/map',
        method: 'get'
    }).catch(err => {
        console.error(err.toJSON())
    })
    if (req) {
        req = req.data
        const embed = new discord.MessageEmbed()
            .setColor('DARK_BUT_NOT_BLACK')
            .setTitle('Fortnite Map')
            .setFooter({name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setImage(req.data.images.pois)
        
        inter.reply({embeds: [embed]})
    }
}

module.exports.help = {
    name: 'map',
    permission: []
}
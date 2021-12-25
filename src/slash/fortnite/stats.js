const discord = require('discord.js')
const swag = require('../../swag')
const axios = require('axios')
const config = require('../../config.json')

module.exports.run = async (inter) => {
	let user = await inter.options.getString('user')
    let req = await axios.get('https://fortniteapi.io/v1/lookup', {
        params: {
            username: user,
        },
        headers: {
            Authorization: config.auth.io
        }
    }).catch(err => console.error(err.toJSON()))

    if (!req) return inter.reply({content: 'There was an error. Try again later.'})
    req = req.data
    let cache = req

    if (req.result) {
        req = await axios.get('https://fortniteapi.io/v1/status', {
            params : {
                account: cache.account_id
            },
            headers: {
                Authorization: config.auth.io
            }
        }).catch(err => console.error(err.toJSON()))
        if (!req) return inter.reply({content: 'There was an error. Try again later.'})
        req = req.data
        console.log(req)
        let global = req.global_stats
        console.log(((global.squad.placetop1 + global.duo.placetop1 + global.solo.placetop1) / 3).toString())
        let embed = new discord.MessageEmbed()
            .setTitle(`Statistics of ${req.name}`)
            .setColor('DARK_NAVY')
            .addFields(
                {name: 'Battlepass Level', value: req.account.Level, inline: false},
                {name: 'Victories', value: ((global.squad.placetop1 + global.duo.placetop1 + global.solo.placetop1) / 3).toString(), inline: false}
            )
            inter.reply({embeds: [embed]})
    } else {
        let embed = new discord.MessageEmbed()
            .setColor('DARK_RED')
            .setTitle(`There was an error`)
            .setDescription(`We are unable to get account information on the user \`${user}\``)
        inter.reply({embeds: [embed]})
    }
}

module.exports.help = {
    name: 'stats',
    permission: []
}
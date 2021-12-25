// requirements

const Discord = require('discord.js')
const config = require('./config.json')
const fs = require('fs')
const path = require('path');

const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })

// collections

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.slashcmds = new Discord.Collection();

module.exports.client = client

// Command Handler & Alias

const commandPath = path.resolve(__dirname, './commands');
var commandsLoaded = 0;

fs.readdirSync(commandPath).forEach(dir => {
    fs.readdir(`${commandPath}/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");

        if (jsFiles.length <= 0) return console.log("Commands > Can't find any commands!");

        jsFiles.forEach(file => {

            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`Commands > ${file} loaded.`)

            try {
                client.commands.set(fileGet.help.name, fileGet);

                fileGet.help.aliases.forEach(alias => {
                    client.aliases.set(alias, fileGet.help.name);
                })

            } catch (err) {
                return console.log(err);
            }
        });
    });
});

// Event Handler

const eventsPath = path.resolve(__dirname, './events');

fs.readdirSync(eventsPath).forEach(file => {
    var jsFiles = fs.readdirSync(eventsPath).filter(f => f.split(".").pop() === 'js' || f.split(".").pop() === 'cjs');
    if (jsFiles.length <= 0) return console.log("Events > Can't find any events!");
    let check = false;

    jsFiles.forEach(event => {
        const eventGet = require(`./events/${event}`)
        try {
            client.events.set(eventGet.name, eventGet)
            if(check === false) {
                console.log(`Events > ${file} loaded.`)
                check = true
            }
        } catch (err) {
            return console.log(err)
        }
    })
});

// Slash Command Handler

const slashPath = path.resolve(__dirname, './slash');

fs.readdirSync(slashPath).forEach(dir => {
    fs.readdir(`${slashPath}/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");

        if (jsFiles.length <= 0) return console.log("Slash > Can't find any commands!");

        jsFiles.forEach(file => {

            var fileGet = require(`./slash/${dir}/${file}`);
            console.log(`Slash > ${file} loaded.`)

            try {
                client.slashcmds.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

// Logs in the bot

client.login(config.token)
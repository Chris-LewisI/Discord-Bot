const Discord = require('discord.js');
const { prefix, token, giphyAPIToken, giphySDKToken } = require('./config');
const { version } = require('./package.json')

const assets = require('../assets')
require('dotenv').config()

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;  
        if (command === 'help') {
            const embed = new Discord.MessageEmbed()
            .attachFiles([fallout, kofta])
            .setColor('#ffee00')
            .setThumbnail('attachment://fallout.gif')
            .setAuthor(client.user.username, 'attachment://kofta.png')
            .setTitle('Help is here!')
            .addFields(
                { name: 'KOFTA Version:', value: `*${version}*\n**C O M M A N D S**\n- "//warzone" : Gives you access to Call Of Duty: Warzone patch notes 🍖\n- "//happy_hour" : Shows when COD Happy Hour begins for KOLOTS\n- "//info" : Displays KOFTA's uptime and ping!\n**U P D A T E S**\n- welcome and farewell message\n- role assignment upon joining server\n\n*Questions and recommendations can be DM'ed to the bot. Use the prefix "//" before your message!*`, inline: true })

            message.channel.send(embed)
            return;
        }
});

module.exports = {
    help
}
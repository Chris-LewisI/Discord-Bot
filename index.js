/*
KOFTA invite link: https://discordapp.com/api/oauth2/authorize?client_id=696705578529062954&permissions=0&scope=bot
*/

var today = new Date();
console.log(`Server Time: ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`);
console.log(`EST Time: ${today.getHours()-4}:${today.getMinutes()}:${today.getSeconds()}`);

console.log("BOT = [STARTING...]");

const Discord = require('discord.js');//imports discord.js library
const nodemon = require('nodemon');
const {prefix, token, giphyAPIToken} = require('./config.json');//values I defined within the config file.
const {version} = require('./package.json'); //provides with package version number

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyAPIToken)

const client = new Discord.Client();//client is what will connect to the discord server

client.login(token); //allows bot to login into the server with a token.
console.log('BOT = [LOGGED IN]');

client.once('ready', () => {
    console.log('BOT = [ACTIVE]')
    //Announcement
    //client.channels.cache.get("401390003919519745").send(``);
});

client.setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 13 && date.getMinutes() === 0){ // Check the time
        giphy.search('gifs', {"q": "gaming"})
        .then((response) => {
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
            var responseFinal = response.data[responseIndex];
            client.channels.cache.get("401390003919519745").send(`Rise N' Shine Molokhia Boissss! 🌞`, {
                files: [responseFinal.images.fixed_height.url]})
        })
        .catch ((error) => {
            console.log('GIF could not load.');
            console.log(error);
            client.channels.cache.get("401390003919519745").send(`Rise N' Shine Molokhia Boissss! 🌞`);
        })
    }
}, 60000); // Repeat every x milliseconds (1 minute)
client.setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 1 && date.getMinutes() === 0){ // Check the time
        giphy.search('gifs', {"q": "gaming"})
        .then((response) => {
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
            var responseFinal = response.data[responseIndex];
            client.channels.cache.get("401390003919519745").send(`**[KOLOTS]** Happy Hour: _2X XP!_\n🍖 TIME TO EAT BOIS 🍖`, {
                files: [responseFinal.images.fixed_height.url]})
        })
        .catch ((error) => {
            console.log('GIF could not load.');
            console.log(error);
            client.channels.cache.get("401390003919519745").send(`**[KOLOTS]** Happy Hour: _2X XP!_\n🍖 TIME TO EAT BOIS 🍖`);
        })
    }
}, 60000); // Repeat every x milliseconds (1 minute)
client.setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 2 && date.getMinutes() === 0){ // Check the time
        giphy.search('gifs', {"q": "satisfied"})
        .then((response) => {
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
            var responseFinal = response.data[responseIndex];
            client.channels.cache.get("401390003919519745").send(`Hope your 2XP was as good as KOFTA! 😋😋`, {
                files: [responseFinal.images.fixed_height.url]})
        })
        .catch ((error) => {
            console.log('GIF could not load.');
            console.log(error);
            client.channels.cache.get("401390003919519745").send(`Hope your 2XP was as good as KOFTA! 😋😋`);
        })
    }
}, 60000); // Repeat every x milliseconds (1 minute)

client.on('ready', () => {
    try {
        client.user.setStatus('online');
        client.user.setActivity('with french fries 🍟');
    } catch (error) {
        console.log(error);
    }
})

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.channel.type == "dm") {
        if (message.author.bot) return;
        else {

            const embed = new Discord.MessageEmbed()
              .attachFiles(['./thumbUp.png','./kofta.png'])
              .setColor('#ffee00')
              .setThumbnail('attachment://thumbUp.png')
              .setAuthor(client.user.username, 'attachment://kofta.png')
              .setTitle('Thanks For Your Feedback!')
              .addFields(
            		{ name: 'Developer:', value: 'Thank you for using KOFTA, we will go through your feedback and improve the bot where necessary!', inline: true })

            const msg = message.content.slice(prefix.length);
            console.log(`[DM] ${message.author.username}: ${msg}`);

            message.reply(embed);
            return;
        }
    }

    if(command === 'ping') {
        giphy.search('gifs', {"q": "ping pong"})
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];
                var url = responseFinal.images.fixed_height.url;

                const embed = new Discord.MessageEmbed()
                  .attachFiles(['./kofta.png'])
                  .setColor('#ffee00')
                  .setThumbnail(url, 400, 400)
                  .setAuthor(client.user.username, 'attachment://kofta.png')
                  .setTitle('PING')
                  .addFields(
                    { name: 'Server:', value: 'Pong! (≈**' + client.ws.ping + '**ms)', inline: true })

                  message.channel.send(embed);
                  return;
            })
            .catch ((error) => {
                console.log('GIF could not load.')
                console.log(error);
                message.channel.send('Pong! (~ ' + client.ws.ping + 'ms)')
            })
    }

    if(command === 'uptime') {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const embed = new Discord.MessageEmbed()
          .attachFiles(['./wifi.png','./kofta.png'])
          .setColor('#ffee00')
          .setThumbnail('attachment://wifi.png')
          .setAuthor(client.user.username, 'attachment://kofta.png')
          .setTitle('Server ON 🟢')
          .addFields(
            { name: 'Server:', value: `__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s\n*Server uptime resets every update.*`, inline: true })

          message.channel.send(embed);
          return;
    }

    if (command === 'help') {
      const embed = new Discord.MessageEmbed()
        .attachFiles(['./fallout.gif','./kofta.png'])
        .setColor('#ffee00')
        .setThumbnail('attachment://fallout.gif')
        .setAuthor(client.user.username, 'attachment://kofta.png')
        .setTitle('Help is here!')
        .addFields(
          { name: 'Tips and Tricks:', value: `*KOFTA version: ${version}*\n**C O M M A N D S**\n- "//fetar" : Shows a countdown until Lent is over! 🍖\n- "//happy_hour" : Shows when COD Happy Hour begins for KOLOTS\n- "//uptime" : Shows how long since KOFTA's last update\n- "//ping" : Tells you KOFTA's ping (ms)\n**U P D A T E S**\n- Regular Debugging\n\n*Questions and recommendations can be DM'ed to the bot. Use the prefix "//" before your message!*`, inline: true })

        message.channel.send(embed);
        return;
    }

    if (command === 'fetar') {
        var deadline = new Date("apr 19, 2020 04:00:00").getTime();
        var currentDate = new Date().getTime();
        var remainingTime = deadline - currentDate;

        var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        var hours = Math.floor((remainingTime %(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
        var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        giphy.search('gifs', {"q": "let's eat"})
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];
                var url = responseFinal.images.fixed_height.url;

                const embed = new Discord.MessageEmbed()
                  .attachFiles(['./kofta.png'])
                  .setColor('#ffee00')
                  .setThumbnail(url)
                  .setAuthor(client.user.username, 'attachment://kofta.png')
                  .setTitle('🍖 **E N D   O F   L E N T** 🍖')
                  .addFields(
                    { name: 'Countdown:', value: `**${days}** days, **${hours}** hrs, **${minutes}** mins, **${seconds}** secs`, inline: true })

                  message.channel.send(embed);
                  return;
            })
            .catch ((error) => {
                console.log('GIF could not load.')
                console.log(error);
                message.channel.send(`🍖 **E N D   O F   L E N T** 🍖\n**${days}** days, **${hours}** hrs, **${minutes}** mins, **${seconds}** secs`)
            })

    }
    if (command === 'happy_hour') {
        giphy.search('gifs', {"q": "Modern Warfare"})
        .then((response) => {
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
            var responseFinal = response.data[responseIndex];
            var url = responseFinal.images.fixed_height.url;

            const embed = new Discord.MessageEmbed()
              .attachFiles(['./kofta.png'])
              .setColor('#ffee00')
              .setThumbnail(url)
              .setAuthor(client.user.username, 'attachment://kofta.png')
              .setTitle('🔫 __**COD : Modern Warfare**__🔫')
              .addFields(
                { name: 'Hour of 2XP:', value: `Happy Hour starts at **9PM** for the __**[KOLOTS]**__`, inline: true })

              message.channel.send(embed);
              return;
        })
        .catch ((error) => {
            console.log('GIF could not load.')
            console.log(error);
            message.channel.send('🔫 __*COD : Modern Warfare*__ Happy Hour starts at **9PM** for the __**[KOLOTS]**__ 🔫')
        })
    }
});

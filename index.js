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
        giphy.search('gifs', {"q": "good morning"})
        .then((response) => {
            console.log(response);
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
        giphy.search('gifs', {"q": "excited"})
        .then((response) => {
            console.log(response);
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
            console.log(response);
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
    if (message.channel.type === 'dm' && message.author.id != token) {
        console.log("[DM] " + message.author.username + ": " + message.content);
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {

        giphy.search('gifs', {"q": "ping pong"})
            .then((response) => {
                console.log(response);
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];
                message.channel.send('Pong! (≈**' + client.ws.ping + '**ms)', {
                    files: [responseFinal.images.fixed_height.url]})
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
  
        message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    
    if (command === 'help') {
        message.channel.send(`*KOFTA version: ${version}*\n**C O M M A N D S**\n- "//fetar" : Shows a countdown until Lent is over! 🍖\n- "//happy_hour" : Shows when COD Happy Hour begins for KOLOTS\n- "//uptime" : Shows how long since KOFTA's last update\n- "//ping" : Tells you KOFTA's ping (ms)\n**U P D A T E S**\n--Regular Debugging\n*If you have an issue with using the bot or would like to offer your ideas please DM the bot so I can help!`);
    }

    if (command === 'fetar') {
        var deadline = new Date("apr 19, 2020 00:00:00").getTime();
        var currentDate = new Date().getTime();
        var remainingTime = deadline - currentDate;

        var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)); 
        var hours = Math.floor((remainingTime %(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
        var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)); 
        var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        giphy.search('gifs', {"q": "food"})
            .then((response) => {
                console.log(response);
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];
                message.channel.send(`🍖 **E N D   O F   L E N T** 🍖\n**${days}** days, **${hours+4}** hrs, **${minutes}** mins, **${seconds}** secs`, {
                    files: [responseFinal.images.fixed_height.url]})
            })
            .catch ((error) => {
                console.log('GIF could not load.')
                console.log(error);
                message.channel.send(`🍖 **E N D   O F   L E N T** 🍖\n**${days}** days, **${hours+4}** hrs, **${minutes}** mins, **${seconds}** secs`)
            })

    }
    if (command === 'happy_hour') {
        giphy.search('gifs', {"q": "Modern Warfare"})
        .then((response) => {
            console.log(response);
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
            var responseFinal = response.data[responseIndex];
            message.channel.send('🔫 __*COD : Modern Warfare*__ Happy Hour starts at **9PM** for the __**[KOLOTS]**__ 🔫', {
                files: [responseFinal.images.fixed_height.url]})
        })
        .catch ((error) => {
            console.log('GIF could not load.')
            console.log(error);
            message.channel.send('🔫 __*COD : Modern Warfare*__ Happy Hour starts at **9PM** for the __**[KOLOTS]**__ 🔫')
        })
    }
});
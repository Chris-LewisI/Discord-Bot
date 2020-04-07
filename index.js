/*
Things the bot should do:
- create scheduled announcements _DONE!_
- send a daily meme 
- countdown to fetar _DONE!_
*/

var today = new Date();
console.log(`Server Time: ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`);
console.log(`EST Time: ${today.getHours()-4}:${today.getMinutes()}:${today.getSeconds()}`);

console.log("BOT = [STARTING...]");

const Discord = require('discord.js');//imports discord.js library
const nodemon = require('nodemon');
const {prefix, token, giphySDKToken} = require('./config.json');//values I defined within the config file.
const {version} = require('./package.json'); //provides with package version number

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient("giphySDKToken")

const client = new Discord.Client();//client is what will connect to the discord server

//KOFTA uptime
//client.uptime = 0?
let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;

let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

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
        client.channels.cache.get("401390003919519745").send(`Rise N' Shine Molokhia Boissss! 🌞`);
    }
}, 60000); // Repeat every x milliseconds (1 minute)
client.setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 1 && date.getMinutes() === 0){ // Check the time
        client.channels.cache.get("401395341347520523").send(`**[KOLOTS]** Happy Hour: _2X XP!_`);
        client.channels.cache.get("401395341347520523").send(`🍖 TIME TO EAT BOIS 🍖`);
    }
}, 60000); // Repeat every x milliseconds (1 minute)
client.setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 22){ // Check the time
        client.channels.cache.get("401395341347520523").send(`Hope your 2XP was as good as KOFTA! 😋😋`);
    }
}, 60000); // Repeat every x milliseconds (1 minute)

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //not showing up
    if(message.content.startsWith(prefix)) {
        if (!command === 'fetar' || !command === 'help' || !command === 'happy_hour') {
            message.channel.send('Invalid Command\nType in `//help` for a list of commands!');
        }
    }

    if(command === 'ping') {
        message.channel.send('Pong! (~ ' + client.ping + 'ms)');
    }

    if(command === 'uptime') {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
  
        message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    
    if (command === 'help') {
        message.channel.send(`*KOFTA version: ${version}*\n**C O M M A N D S**\n- "//fetar" : Shows a countdown until Lent is over! 🍖\n- "//happy_hour" : Shows when COD Happy Hour begins for KOLOTS\n- "//uptime" : Shows how long since KOFTA's last update\n- "//ping" : Tells you KOFTA's ping (ms)\n**U P D A T E S**\n- Giphy API addition:\n- Daily MEMES will be uploaded!\n- Memes will be output with every command result.`);
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
            //KOFTA is completely skipping "then" and going to "catch"
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
        message.channel.send('🔫Modern Warfare Happy Hour starts at 9PM for the [KOLOTS]🔫');
    }
});
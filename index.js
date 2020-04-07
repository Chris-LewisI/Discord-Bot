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

client.login(token); //allows bot to login into the server with a token.
console.log('BOT = [LOGGED IN]');

client.once('ready', () => {
    console.log('BOT = [ACTIVE]')
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
            message.channel.send('Invalid Command');
            message.channel.send('Type in `//help` for a list of commands!');
        }
    }
    
    if (command === 'help') {
        message.channel.send(`*KOFTA version: ${version}*`);
        message.channel.send('**C O M M A N D S**');
        message.channel.send('- "//fetar" : Shows a countdown until Lent is over! 🍖');
        message.channel.send('- "//happy_hour" : Shows when COD Happy Hour begins for KOLOTS');
        message.channel.send('**D E S C R I P T I O N**');
        message.channel.send('- Notifies when it is happy hour in COD.');
        message.channel.send('- Gives a good morning message.');
        message.channel.send('**U P D A T E S**');
        message.channel.send('- Giphy API addition:');        
        message.channel.send('      - Daily MEMES will be uploaded!');
        message.channel.send('      - Memes will be output with every command result.');
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
                message.channel.send('🍖 **E N D   O F   L E N T** 🍖');
                message.channel.send(`**${days}** days, **${hours}** hrs, **${minutes}** mins, **${seconds}** secs`, {
                    files: [responseFinal.images.fixed_height.url]})
            })
            .catch ((error) => {
                console.log('GIF could not load.')
                console.log(error);
                message.channel.send('🍖 **E N D   O F   L E N T** 🍖');
                message.channel.send(`**${days}** days, **${hours}** hrs, **${minutes}** mins, **${seconds}** secs`)
            })

    }
    if (command === 'happy_hour') {
        message.channel.send('🔫Modern Warfare Happy Hour starts at 9PM for the [KOLOTS]🔫');
    }
});
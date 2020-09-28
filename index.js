const assets = require('./assets')
require('dotenv').config()
const fs = require("fs");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

var today = new Date()

console.log(`Server Time: ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`)
console.log(`EST Time: ${today.getHours() - 4}:${today.getMinutes()}:${today.getSeconds()}`)

console.log('BOT = [STARTING...]')

const Discord = require('discord.js')// imports discord.js library
const { fallout, server, kofta, thumbUp } = require('./assets')
const { prefix, token, giphyAPIToken, giphySDKToken } = require('./config')// values I defined within the config file.
const { version } = require('./package.json') // provides with package version number

var GphApiClient = require('giphy-js-sdk-core')
const giphy = GphApiClient(giphyAPIToken)

const client = new Discord.Client()// client is what will connect to the discord server

// As of right now the code creates a new dms.csv file everytime the server is reset (NEEDS TO BE FIXED!!!)
const dbPath = "./dms.csv"
const csvWriter = createCsvWriter({
  path: `${dbPath}`,
  header: [
    {id: 'username', title: 'User'},
    {id: 'message', title: 'Message'}
  ]
});

client.login(token) // allows bot to login into the server with a token.
console.log('BOT = [LOGGED IN]')

client.on('ready', () => {
  console.log('BOT = [ACTIVE]')
  try {
    client.user.setStatus('idle')
    client.user.setActivity('with french fries 🍟')
  } catch (error) {
    console.log(error)
  }
})

//welcome to server message and role assignment
client.on('guildMemberAdd', member => {
  const welcomeChannel = member.guild.channels.cache.find(ch => ch.name.includes('general'));
  const welcomeText = `Welcome <@${member.user.id}> to ${member.guild.name}!`;
  member.roles.add(member.guild.roles.cache.find(role => role.name === "🐢Delinquents🦑"));

  Promise.resolve(welcomeText).then(function (welcomeText) {
    welcomeChannel.send(welcomeText);
  });
});

//farewell from server message
client.on('guildMemberRemove', member => {
  const leaveChannel = member.guild.channels.cache.find(ch => ch.name.includes('general'));
  const farewellText = `We're sorry to see you leaving ${member.user.tag}!`

  Promise.resolve(farewellText).then(function (farewellText) {
    leaveChannel.send(farewellText);
  });
});

client.setInterval(function () { // Set interval for checking
  var date = new Date() // Create a Date object to find out what time it is
  if (date.getHours() === 1 && date.getMinutes() === 0) { // Check the time
    giphy.search('gifs', { q: 'gaming' })
      .then((response) => {
        var totalResponses = response.data.length
        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses
        var responseFinal = response.data[responseIndex]
        var url = responseFinal.images.fixed_height.url

        const embed = new Discord.MessageEmbed()
          .attachFiles([kofta])
          .setColor('#ffee00')
          .setThumbnail(url)
          .setAuthor(client.user.username, 'attachment://kofta.png')
          .setTitle('**[KOLOTS]** Happy Hour: _2X XP!_')
          .addFields(
            { name: 'Avoid Helicopters:', value: '🍖 TIME TO EAT BOIS 🍖', inline: true })

        client.channels.cache.get('401395341347520523').send(embed)
      })
      .catch((error) => {
        console.log('GIF could not load.')
        console.log(error)
        client.channels.cache.get('401395341347520523').send('**[KOLOTS]** Happy Hour: _2X XP!_\n🍖 TIME TO EAT BOIS 🍖')
      })
  }
}, 60000) // Repeat every x milliseconds (1 minute)
client.setInterval(function () { // Set interval for checking
  var date = new Date() // Create a Date object to find out what time it is
  if (date.getHours() === 2 && date.getMinutes() === 0) { // Check the time
    giphy.search('gifs', { q: 'satisfied' })
      .then((response) => {
        var totalResponses = response.data.length
        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses
        var responseFinal = response.data[responseIndex]
        var url = responseFinal.images.fixed_height.url

        const embed = new Discord.MessageEmbed()
          .attachFiles([assets.kofta])
          .setColor('#ffee00')
          .setThumbnail(url)
          .setAuthor(client.user.username, 'attachment://kofta.png')
          .setTitle('🥳 **Happy Hour is OVER** 🥳')
          .addFields(
            { name: 'Press "F" to pay respect:', value: 'Hope your 2XP was as good as KOFTA! 😋😋', inline: true })

        client.channels.cache.get('401395341347520523').send(embed)
      })
      .catch((error) => {
        console.log('GIF could not load.')
        console.log(error)
        client.channels.cache.get('401395341347520523').send('Hope your 2XP was as good as KOFTA! 😋😋')
      })
  }
}, 60000) // Repeat every x milliseconds (1 minute)

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  // if (message.channel.type === 'dm') {
    if (message.author.bot) return
    else {
      const embed = new Discord.MessageEmbed()
        .attachFiles([thumbUp, kofta])
        .setColor('#ffee00')
        .setThumbnail('attachment://thumbUp.png')
        .setAuthor(client.user.username, 'attachment://kofta.png')
        .setTitle('Thanks For Your Feedback!')
        .addFields({ name: 'Developer:', value: 'Thank you for using KOFTA, we will go through your feedback and improve the bot where necessary!', inline: true })

      const msg = message.content.slice(prefix.length)
      console.log(`[DM] ${message.author.username}: ${msg}`)

      //saves message from user to CSV file on server or locally (wherever the bot is running)
      const data = [{
        username: message.author.username,
        message: msg
      }];

      csvWriter.writeRecords(data);

      message.reply(embed)
      return
    }
  // }


  if (command === 'warzone') {
    giphy.search('gifs', { q: 'warzone' })
      .then((response) => {
        var totalResponses = response.data.length
        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses
        var responseFinal = response.data[responseIndex]
        var url = responseFinal.images.fixed_height.url

        const embed = new Discord.MessageEmbed()
          .attachFiles([kofta])
          .setColor('#ffee00')
          .setThumbnail(url, 400, 400)
          .setAuthor(client.user.username, 'attachment://kofta.png')
          .setTitle('PATCH NOTES')
          .addFields(
            { name: 'Server:', value: 'https://www.infinityward.com/news', inline: true })

        message.channel.send(embed)
      })
      .catch((error) => {
        console.log('GIF could not load.')
        console.log(error)
        message.channel.send('https://www.infinityward.com/news')
      })
  }

  if (command === 'info') {
    const days = Math.floor(client.uptime / 86400000)
    const hours = Math.floor(client.uptime / 3600000) % 24
    const minutes = Math.floor(client.uptime / 60000) % 60
    const seconds = Math.floor(client.uptime / 1000) % 60

    const embed = new Discord.MessageEmbed()
      .attachFiles([server, kofta])
      .setColor('#ffee00')
      .setThumbnail('attachment://server.gif')
      .setAuthor(client.user.username, 'attachment://kofta.png')
      .setTitle('Server ON 🟢')
      .addFields(
        { name: 'Server:', value: `**U P T I M E\n** ${days}d ${hours}h ${minutes}m ${seconds}s\n\n**P I N G\n** ${client.ws.ping}ms`, inline: true })

    message.channel.send(embed)
    return
  }

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
    return
  }

  if (command === 'happy_hour') {
    giphy.search('gifs', { q: 'Modern Warfare' })
      .then((response) => {
        var totalResponses = response.data.length
        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses
        var responseFinal = response.data[responseIndex]
        var url = responseFinal.images.fixed_height.url

        const embed = new Discord.MessageEmbed()
          .attachFiles([kofta])
          .setColor('#ffee00')
          .setThumbnail(url)
          .setAuthor(client.user.username, 'attachment://kofta.png')
          .setTitle('🔫 __**COD : Modern Warfare**__ 🔫')
          .addFields(
            { name: 'Hour of 2XP:', value: 'Happy Hour starts at **9PM** for the __**[KOLOTS]**__', inline: true })

        message.channel.send(embed)
      })
      .catch((error) => {
        console.log('GIF could not load.')
        console.log(error)
        message.channel.send('🔫 __*COD : Modern Warfare*__ Happy Hour starts at **9PM** for the __**[KOLOTS]**__ 🔫')
      })
  }
})

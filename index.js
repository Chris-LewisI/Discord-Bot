const assets = require('./assets')
require('dotenv').config()

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

  if (message.channel.type === 'dm') {
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

      message.reply(embed)
      return
    }
  }

  if (command === 'ping') {
    giphy.search('gifs', { q: 'ping pong' })
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
          .setTitle('PING')
          .addFields(
            { name: 'Server:', value: 'Pong! (≈**' + client.ws.ping + '**ms)', inline: true })

        message.channel.send(embed)
      })
      .catch((error) => {
        console.log('GIF could not load.')
        console.log(error)
        message.channel.send('Pong! (~ ' + client.ws.ping + 'ms)')
      })
  }

  if (command === 'uptime') {
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
        { name: 'Server:', value: `__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s\n*Server uptime resets every update.*`, inline: true })

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
        { name: 'Tips and Tricks:', value: `*KOFTA version: ${version}*\n**C O M M A N D S**\n- "//fetar" : Shows a countdown until Lent is over! 🍖\n- "//happy_hour" : Shows when COD Happy Hour begins for KOLOTS\n- "//uptime" : Shows how long since KOFTA's last update\n- "//ping" : Tells you KOFTA's ping (ms)\n**U P D A T E S**\n- Regular Debugging\n\n*Questions and recommendations can be DM'ed to the bot. Use the prefix "//" before your message!*`, inline: true })

    message.channel.send(embed)
    return
  }

  if (command === 'fetar') {
    var deadline = new Date('jul 12, 2020 04:00:00').getTime()
    var currentDate = new Date().getTime()
    var remainingTime = deadline - currentDate

    var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
    var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

    if (remainingTime >= 0) {
      giphy.search('gifs', { q: "let's eat" })
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
            .setTitle('🍖 **E N D   O F   A P O S T L E S  F A S T** 🍖')
            .addFields(
              { name: 'Countdown:', value: `**${days}** days, **${hours}** hrs, **${minutes}** mins, **${seconds}** secs`, inline: true })

          message.channel.send(embed)
        })
        .catch((error) => {
          console.log('GIF could not load.')
          console.log(error)
          message.channel.send(`🍖 **E N D   O F   L E N T** 🍖\n**${days}** days, **${hours}** hrs, **${minutes}** mins, **${seconds}** secs`)
        })
    } else {
      giphy.search('gifs', { q: "let's eat" })
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
            .setTitle('🍖 You are in the FETAR! 🍖')
            .addFields(
              { name: 'Wait is OVER:', value: 'Time to eat boiiiisssss!', inline: true })

          message.channel.send(embed)
        })
    }
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

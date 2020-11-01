console.time('KOFTA startup')
require('dotenv').config();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Discord = require('discord.js');
const { fallout, server, kofta, thumbUp } = require('./assets');
const { prefix, token, giphyAPIToken, giphySDKToken } = require('./config');
const { version } = require('./package.json');
var GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(giphyAPIToken);
const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION']
});

// As of right now the code creates a new dms.csv file that replaces the previous one everytime the server is reset.
// (NEEDS TO BE FIXED!!!)
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
    client.user.setStatus('dnd')
    client.user.setActivity('with french fries 🍟')
    console.timeEnd('KOFTA startup')
  } catch (error) {
    console.log(error)
  }
})
//welcome to server message and role assignment
client.on('guildMemberAdd', member => {
  if(member.user.bot == true) {
    member.roles.add(member.guild.roles.cache.find(role => role.name === "🚦BOTS🚦"));
  }
  else {
    const welcomeChannel = member.guild.channels.cache.find(ch => ch.name.includes('general'));
    const welcomeText = `Welcome to ${member.guild.name}, <@${member.user.id}>!`;
    member.roles.add(member.guild.roles.cache.find(role => role.name === "🐢Little Boys🦑"));

    Promise.resolve(welcomeText).then(function (welcomeText) {
      welcomeChannel.send(welcomeText);
    });
  }
});

//farewell from server message
client.on('guildMemberRemove', member => {
  if(member.user.bot == true) {
    console.log(`BOT: ${member.user.tag} has been removed.`);
  }
  else {
    const leaveChannel = member.guild.channels.cache.find(ch => ch.name.includes('general'));
    const farewellText = `We're sorry to see you leaving ${member.user.tag}!`

    Promise.resolve(farewellText).then(function (farewellText) {
      leaveChannel.send(farewellText);
    });
  }
});

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

      //saves message from user to CSV file on server or locally (wherever the bot is running)
      const data = [{
        username: message.author.username,
        message: msg
      }];

      csvWriter.writeRecords(data);

      message.reply(embed)
      return
    }
  }


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
        { name: 'KOFTA Version:', value: `*${version}*\n**C O M M A N D S**\n- "$warzone" : Gives you access to Call Of Duty: Warzone patch notes 🍖\n- "$happy_hour" : Shows when COD Happy Hour begins for KOLOTS\n- "$info" : Displays KOFTA's uptime and ping!\n**U P D A T E S**\n- welcome and farewell message\n- role assignment upon joining server\n\n*Questions and recommendations can be DM'ed to the bot. Use the prefix "$" before your message!*`, inline: true })

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

//manage teams for warzone tournaments
client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '772595126852911114') {
    switch (name) {
      case '🔥':
        member.roles.add('772590496697679873');
        console.log(`Team Pyro: ${member}`);
        break;
      case '🌊':
        member.roles.add('772590499230908436');
        console.log(`Team Ocean: ${member}`);
        break;
    }
  }
})

client.on('messageReactionRemove', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '772595126852911114') {
    switch (name) {
      case '🔥':
        member.roles.remove('772590496697679873');
        console.log(`Removed: ${member}`);
        break;
      case '🌊':
        member.roles.remove('772590499230908436');
        console.log(`Removed: ${member}`);
        break;
    }
  }
})
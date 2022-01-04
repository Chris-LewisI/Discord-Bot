console.time('\x1b[32m[BOT]\x1b[0m = startup')
require('dotenv').config();
const Discord = require('discord.js');
const { fallout, server, kofta, thumbUp } = require('./assets');
const prefix = process.env.prefix;
const token = process.env.token;
const giphyAPIToken = process.env.giphyAPIToken;
const { version } = require('./package.json');
var GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(giphyAPIToken);

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION']
});

client.login(token) // allows bot to login into the server with a token.
console.log('\x1b[32m[BOT]\x1b[0m = Logged in')

client.on('ready', () => {
  try {
    client.user.setStatus('dnd')
    client.user.setActivity('with french fries 🍟')
    console.timeEnd('\x1b[32m[BOT]\x1b[0m = startup')
  } catch (error) {
    console.log(error)
  }
})

//welcome to server message and role assignment
client.on('guildMemberAdd', member => {
  if(member.user.bot == true) {
    member.roles.add(member.guild.roles.cache.get('401391033314705421'));
  }
  else {
    const welcomeChannel = member.guild.channels.cache.get('401390003919519745');
    const welcomeText = `Welcome to ${member.guild.name}, <@${member.user.id}>!`;
    member.roles.add(member.guild.roles.cache.get('421685459136020480'));

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
    const leaveChannel = member.guild.channels.cache.get('401390003919519745');
    const farewellText = `We're sorry to see you leaving ${member.user.tag}!`

    Promise.resolve(farewellText).then(function (farewellText) {
      leaveChannel.send(farewellText);
    });
  }
});

client.on('message', async (message) => {
  if (message.content.includes("shit") || message.content.includes("fuck") || message.content.includes("ass") || message.content.includes("bitch") || message.content.includes("fag") || message.content.includes("gay")) {
    message.delete()
  }
})


client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

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
        { name: 'KOFTA Version:', value: `*${version}*\n**C O M M A N D S**\n- "//info" : Displays KOFTA's uptime and ping!\n**U P D A T E S**\n`, inline: true })

    message.channel.send(embed)
    return
  }
})

//manage teams for warzone tournaments
client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (user.bot == false) {
    if (reaction.message.content === '$tournament') {
      switch (name) {
        case ':fire:':
          member.roles.add(member.guild.roles.cache.get('772590496697679873'));
          console.log(`Team Pyro: ${member}`);
          break;
        case ':water:':
          member.roles.add(member.guild.roles.cache.get('772590499230908436'));
          console.log(`Team Ocean: ${member}`);
          break;
      }
    }
  }
})

client.on('messageReactionRemove', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (user.bot == false) {
    if (reaction.message.content === '$tournament') {
      switch (name) {
        case ':fire:':
          member.roles.remove(member.guild.roles.cache.get('772590496697679873'));
          console.log(`Removed: ${member}`);
          break;
        case ':water:':
          member.roles.remove(member.guild.roles.cache.get('772590499230908436'));
          console.log(`Removed: ${member}`);
          break;
      }
    }
  }
})
console.time('\x1b[32m[BOT]\x1b[0m = startup')
require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { fallout, server, kofta, thumbUp } = require('./assets');
const token = process.env.TOKEN;
const entry_role = process.env.ENTRY_ROLE;
const bot_role = process.env.BOT_ROLE;
const welcome_channel = process.env.WELCOME_CHANNEL;
const weatherAPI = process.env.WEATHER;
const member_channel = process.env.MEMBER_CHANNEL;
const { version } = require('./package.json');
const Filter = require('bad-words');
const filter = new Filter();
const cron = require('node-cron');

const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
  intents: [
	 GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	]
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
client.on('guildMemberAdd', async (member) => {
  if(member.user.bot == true) {
    await member.roles.add(member.guild.roles.cache.get(bot_role));
  }
  else {
    const welcomeChannel = member.guild.channels.cache.get(welcome_channel);
    const welcomeText = `Welcome to ${member.guild.name}, <@${member.user.id}>!`;
    
    await member.roles.add(member.guild.roles.cache.get(entry_role));

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
    const leaveChannel = member.guild.channels.cache.get(welcome_channel);
    const farewellText = `We're sorry to see you leaving ${member.user.tag}!`

    Promise.resolve(farewellText).then(function (farewellText) {
      leaveChannel.send(farewellText);
    });
  }
});

client.on('messageCreate', async (message) => {
  if (filter.isProfane(message.content)) {
    await console.log(`User: ${message.author.tag} said: "${message.content}"`);
    await message.delete();
    await message.channel.send(`Bad boy, you can't say that!`);
  }
})

const weatherApiRequest = async (city) => {
  const apiEndpoint = `http://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${weatherAPI}`;
  try {
    const response = await fetch(apiEndpoint);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

client.on('messageCreate', async message => {
  // Ignore messages from the bot itself
  if (message.author.bot) return;

  // Commands
  if (message.content === '$hello') {
    message.reply('Hello there!');
  } else if (message.content === '$ping') {
      const days = Math.floor(client.uptime / 86400000)
      const hours = Math.floor(client.uptime / 3600000) % 24
      const minutes = Math.floor(client.uptime / 60000) % 60
      const seconds = Math.floor(client.uptime / 1000) % 60
      const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`

      const koftaImage = new AttachmentBuilder('./assets/kofta.png');
      const serverImage = new AttachmentBuilder('./assets/server.gif');

      const embed = new EmbedBuilder()
        .setImage('attachment://server.gif')
        .setColor('#ffee00')
        .setThumbnail('attachment://kofta.png')
        .setTitle(`KOFTA V${version} ON 🟢`)
        .setDescription(`KOFTA Uptime: **${uptimeString}**\nKOFTA Ping: ${client.ws.ping}ms`)

      await message.channel.send({
        embeds: [embed],
        files: [koftaImage, serverImage]
      });
      return
  } else if (message.content === '$help') {
      const koftaImage = new AttachmentBuilder('./assets/kofta.png');
      const falloutImage = new AttachmentBuilder('./assets/fallout.gif');

      const embed = new EmbedBuilder()
        .setColor('#ffee00')
        .setImage('attachment://fallout.gif')
        .setThumbnail('attachment://kofta.png')
        .setTitle('Help is here!')
        .setDescription(`- $ping: Run the '$ping' command to get stats on the bot's uptime and ping.\n- $weather <city> command gives you the weather in Farenheit of any city.\nContact WUTNG for any feature requests for KOFTA.`)

      await message.channel.send({
        embeds: [embed],
        files: [falloutImage, koftaImage]
      });
      return
  }
    else if (message.content.includes("$weather")){
        const city = message.content.split(' ').slice(1).join(' ');
        weatherApiRequest(city).then((weatherData) => {
          if (!weatherData) {
            message.channel.send(`Invalid City or BOT error.`)
          } else {
            console.log(weatherData);
            const weatherSummary = `${weatherData.weather[0].main} (${weatherData.main.temp}°F)`;
            message.channel.send(`The current weather in ${city} is: ${weatherSummary}`);
          }
        });
    }
});

// Schedule a task to run at 10 AM every day
cron.schedule('0 10 * * *', () => {
    console.log('Running the command at 10 AM every day');
    const memberChannel = member.guild.channels.cache.get(member_channel);
    weatherApiRequest('New York').then((weatherData) => {
      if (!weatherData) {
        memberChannel.send(`Invalid City or BOT error.`)
      } else {
        const weatherSummary = `${weatherData.weather[0].main} (${weatherData.main.temp}°F)`;
        memberChannel.send(`Good morning Molokhia! Weather in ${city} is: ${weatherSummary}`);
      }
    });
}, {
    scheduled: true,
    timezone: "America/New_York" // Adjust for your timezone
});
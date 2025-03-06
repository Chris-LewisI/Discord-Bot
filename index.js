console.time('\x1b[32m[BOT]\x1b[0m = startup');
import 'dotenv/config';
import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  AttachmentBuilder,
} from 'discord.js';
import Filter from 'bad-words';
import moment from 'moment';
import fetch from 'node-fetch';
import { version } from './package.json';

// Load environment variables
const token = process.env.TOKEN;
const entry_role = process.env.ENTRY_ROLE;
const bot_role = process.env.BOT_ROLE;
const welcome_channel = process.env.WELCOME_CHANNEL;
const weatherAPI = process.env.WEATHER;
const member_channel = process.env.MEMBER_CHANNEL;

const filter = new Filter();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Login bot if not in CI environment
if (!process.env.CI_TEST) {
  client.login(token).then(() => {
    console.log('\x1b[32m[BOT]\x1b[0m = Logged in');
  }).catch((err) => {
    console.error('Failed to login:', err);
    process.exit(1);
  });
} else {
  console.log('Skipping login in CI environment.');
}

// Handle errors globally
client.on('error', (error) => {
  console.error('Client error detected:', error);
});

client.once('ready', () => {
  console.log('Bot is ready.');
  try {
    client.user.setStatus('dnd');
    client.user.setActivity('with french fries 🍟');
    console.timeEnd('\x1b[32m[BOT]\x1b[0m = startup');
  } catch (error) {
    console.error('Error setting bot status:', error);
  }
});

// Welcome new members and assign roles
client.on('guildMemberAdd', async (member) => {
  try {
    const guild = member.guild;
    const role = member.user.bot ? bot_role : entry_role;
    await member.roles.add(guild.roles.cache.get(role));
    
    if (!member.user.bot) {
      const welcomeChannel = guild.channels.cache.get(welcome_channel);
      if (welcomeChannel) {
        welcomeChannel.send(`Welcome to ${guild.name}, <@${member.user.id}>!`);
      }
    }
  } catch (error) {
    console.error('Error handling new member:', error);
  }
});

// Farewell message when a member leaves
client.on('guildMemberRemove', (member) => {
  try {
    if (!member.user.bot) {
      const leaveChannel = member.guild.channels.cache.get(welcome_channel);
      if (leaveChannel) {
        leaveChannel.send(`We're sorry to see you leave, ${member.user.tag}!`);
      }
    } else {
      console.log(`BOT: ${member.user.tag} has been removed.`);
    }
  } catch (error) {
    console.error('Error handling member leave:', error);
  }
});

// Detect and delete profane messages
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (filter.isProfane(message.content)) {
    console.log(`User: ${message.author.tag} said: "${message.content}"`);
    await message.delete();
    await message.channel.send(`Bad boy, you can't say that!`);
  }
});

// Fetch weather data
const weatherApiRequest = async (city) => {
  const apiEndpoint = `http://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${weatherAPI}`;
  try {
    const response = await fetch(apiEndpoint);
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Handle bot commands
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();

  switch (command) {
    case '$hello':
      message.reply('Hello there!');
      break;
    
    case '$ping': {
      const uptimeString = moment.duration(client.uptime).humanize();
      const embed = new EmbedBuilder()
        .setColor('#ffee00')
        .setTitle(`KOFTA V${version} ON 🟢`)
        .setDescription(`KOFTA Uptime: **${uptimeString}**\nKOFTA Ping: ${client.ws.ping}ms`);
      await message.channel.send({ embeds: [embed] });
      break;
    }

    case '$help': {
      const embed = new EmbedBuilder()
        .setColor('#ffee00')
        .setTitle('Help is here!')
        .setDescription(`- $ping: Get bot uptime and ping.\n- $weather <city>: Get weather in Fahrenheit.`);
      await message.channel.send({ embeds: [embed] });
      break;
    }

    case '$weather': {
      const city = args.join(' ');
      if (!city) return message.reply('Please specify a city.');
      const weatherData = await weatherApiRequest(city);
      if (!weatherData || weatherData.cod !== 200) {
        return message.reply('Invalid city or error retrieving weather data.');
      }
      const weatherSummary = `${weatherData.weather[0].main} (${weatherData.main.temp}°F)`;
      message.channel.send(`The current weather in ${city} is: ${weatherSummary}`);
      break;
    }
  }
});

// Scheduled weather updates
setInterval(async () => {
  try {
    const currentTime = moment();
    if (currentTime.hour() === 10 && currentTime.minute() === 0) {
      const channel = client.channels.cache.get(member_channel);
      if (!channel) return;
      const weatherData = await weatherApiRequest('New York');
      if (weatherData) {
        const weatherSummary = `${weatherData.weather[0].main} (${weatherData.main.temp}°F)`;
        channel.send(`The current weather in New York is: ${weatherSummary}`);
      }
    }
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
}, 60000); // Check every minute

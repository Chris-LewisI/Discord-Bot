# Discord-Bot
*A bot for the Discord application programmed using the DiscordJS library on the NodeJS engine.*

### Features:
- Automatically places new users in a predefined role.
- Notifies server of new joiner.
- Notifies server of leaver.
- Implements a server-wide profanity filter to keep messages clean.
- Can provide the current weather conditions and temperature of any city in the world.
---

### Dependencies:
- NodeJS v20.16.0 (or higher)
- NPM (Node Package Manager) 9.2.0 (or higher)
#### Set Up Bot in Discord Developer Portal
You must get a token by creating a bot in the Discord Developer Portal at this link: https://discord.com/developers/applications
---

## Installation and Execution:
### Option 1 | Run on OS:
- Install npm and nodejs
- Run `node index.js` within the project directory to start the bot.
### Option 2 | Docker Container:
- Using the kofta.yml file you can run the following command after adjusting the volume path to point to the project directory: `sudo docker compose -f kofta.yml up -d --force-recreate`
---

## Update:
On OS you must update nodejs, npm, and pull the latest version of the bot from this project and rerun it.
If your bot is containerized on Docker you can pull the latest image from GitHub and rerun the docker compose command: `sudo docker compose -f kofta.yml up -d --force-recreate`. This will recreate the existing docker container but by pulling the latest data from the application files.
---

## Configuration
- Adjust the enviornment variables in the kofta.yml or in your own .env to match those of your server and bot.
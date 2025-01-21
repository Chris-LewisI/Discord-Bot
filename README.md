# Discord-Bot
A bot for the Discord application programmed using the DiscordJS library on the NodeJS engine.

Dependencies:
- NodeJS v20.16.0 (or higher)
- NPM (Node Package Manager) 9.2.0 (or higher)

## Installation and Execution:
### Option 1 | Run on OS:
- Install npm and nodejs
- Run `node index.js` within the project directory to start the bot.
### Option 2 | Docker Container:
- Using the kofta.yml file you can run the following command after adjusting the volume path to point to the project directory: `sudo docker compose -f kofta.yml up -d --force-recreate`

## Update:
On OS you must update nodejs, npm, and pull the latest version of the bot from this project and rerun it.
If your bot is containerized on Docker you can pull the latest image from GitHub and rerun the docker compose command: `sudo docker compose -f kofta.yml up -d --force-recreate`

## Configuration
- Adjust the enviornment variables to match those of your server and bot.
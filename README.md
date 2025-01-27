# **​🇰​​🇴​​🇫​​🇹​​🇦**
<p align="center">
  <img src="https://github.com/user-attachments/assets/65c0c79c-347b-4960-8f83-06c038a468e7" />
</p>

*A bot made for the Discord application programmed using the DiscordJS library on the NodeJS engine.*
KOFTA is useful for automating certain processes within a Discord channel that would normally be done manually by a server administrator. It also has some fun features that are non-essential but nonetheless enjoyable to have.

### **Features**
- Automatically places new users in a predefined role.
- Notifies server of new joiner.
- Notifies server of leaver.
- Implements a server-wide profanity filter to keep messages clean.
- Can provide the current weather conditions and temperature of any city in the world.
---

### **Dependencies**
- NodeJS v20.16.0 (or higher)
- NPM (Node Package Manager) 9.2.0 (or higher)
- Docker and Docker Compose (if containerizing the bot)
#### Set Up Bot in Discord Developer Portal
- You must get a token by creating a bot in the Discord Developer Portal at this link: https://discord.com/developers/applications
---

## **Installation and Execution**
### Option 1 | Run on OS (Windows WSL & Ubuntu):
- Update and upgrade all packages: `sudo apt update && sudo apt upgrade -y`
- Install npm and nodejs: `sudo apt install npm nodejs`
- Pull down the project directory using `git clone`.
- Create a `.env` file and input all the necessary parameters in order for the bot to reference the proper values.
- Run `node index.js` within the project directory to start the bot.
### Option 2 | Docker Container:
- Pull down the project directory using `git clone`.
- Adjust the kofta.yml compose file to have the proper enviornment variables and to have the directory mapped to the location of the project directory you pulled down from GitHub. You can find the path to your directory using the `pwd` command in Linux or WSL.
- Spin up the Docker container with the following command: `sudo docker compose -f kofta.yml up -d --force-recreate`
---

## **Update**
- On OS you must update nodejs, npm, and pull the latest version of the bot from this project and rerun it.
- If your bot is containerized on Docker you can pull the latest image from GitHub and rerun the docker compose command: `sudo docker compose -f kofta.yml up -d --force-recreate`. This will recreate the existing docker container but by pulling the latest data from the application files.
---

## **Configuration**
- Adjust the enviornment variables in the kofta.yml or in your own .env to match those of your server and bot.

## **FAQ**
Under Construction...

## **Authors and Acknowledgment**
**​🇰​​🇴​​🇫​​🇹​​🇦** was created by **[Chris Lewis](https://github.com/Chris-LewisI)**.

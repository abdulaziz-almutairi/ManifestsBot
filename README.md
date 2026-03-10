# Steam Manifests Discord Bot

A simple **Discord bot** that downloads **Steam manifests** for games using their **AppID**. Users can get the manifest file directly through a **Slash Command** in Discord.

---

## Features

- Download Steam manifests using **AppID**.  
- Sends manifest as a **ZIP file attachment** in Discord.  
- Uses **Slash Commands** only – no need for privileged intents.  
- Fully configurable via **.env** file.

---

## Requirements

- Node.js v18+  
- A **Discord bot token**  
- Discord **Client ID** and **Guild ID** (for command registration)  

---

## Setup

1. Clone this repository:

```bash
git clone https://github.com/YOUR_USERNAME/steam-manifests-bot.git
cd steam-manifests-bot
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the project root:
```env
DISCORD_TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
GUILD_ID=YOUR_GUILD_ID
MANIFEST_BASE_URL=https://generator.ryuu.lol/secure_download
AUTH_CODE=YOUR_AUTH_CODE
```
4. Start the bot:
```bash
node bot.js
```

---

## Usage
In Discord, Type:
```
/manifest appid:<APPID>
```
- Replace <APPID> with the Steam AppID of the game.
- The bot will download and send the manifest as a ZIP file.

---
## Example
```
/manifest appid:985530
```
- The bot will respond with: `Manifest for AppID 985530` and attach the `.zip` file.

---

## Note
- Only AppID-based manifests are supported in this version.
- Make sure your bot has permission to send files in the channel.
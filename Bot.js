require("dotenv").config();

const { Client, AttachmentBuilder } = require("discord.js");
const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const client = new Client({ intents: [] }); 


const manifestUrl = (appid) => {
  return `${process.env.MANIFEST_BASE_URL}?appid=${appid}&auth_code=${process.env.AUTH_CODE}`;
};


const commands = [
  new SlashCommandBuilder()
    .setName("manifest")
    .setDescription("Download Steam manifest")
    .addStringOption(option =>
      option.setName("appid")
        .setDescription("Steam AppID")
        .setRequired(true)
    )
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log("========== Slash command registered successfully. ==========");
  } catch (err) {
    console.error(err);
  }
})();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "manifest") {
    await interaction.deferReply();
    const appid = interaction.options.getString("appid");

    try {
      const url = manifestUrl(appid);
      const response = await axios({ url, method: "GET", responseType: "stream" });
      const filePath = path.join(__dirname, `${appid}.zip`);
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        const attachment = new AttachmentBuilder(filePath);
        await interaction.editReply({
          content: `🎮 Manifest for AppID **${appid}**`,
          files: [attachment]
        });
        fs.unlinkSync(filePath); 
      });

      writer.on("error", (err) => {
        console.error(err);
        interaction.editReply("Failed to write the manifest file.");
      });

    } catch (err) {
      console.error(err);
      interaction.editReply("Failed to download manifest.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
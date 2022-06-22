const Discord = require("discord.js");
const configuration = require("../../config/embed/embedMsg.json");
const embedMSG = configuration.messages;
const { staffRole } = require("../../config/constants/roles.json");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { suggestChannel } = require("../../config/constants/channel.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("test command"),
  async execute(interaction, client) {},
};

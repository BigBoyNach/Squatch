const Discord = require("discord.js");
const configuration = require("../../config/embed/embedMsg.json");
const embedMSG = configuration.messages;
const { staffRole } = require("../../config/constants/roles.json");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { applicationChannel } = require("../../config/constants/channel.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("applicationsmenu")
    .setDescription("Send the Applications Menu"),
  async execute(interaction, client) {
    const appchan = interaction.client.channels.cache.get(applicationChannel);
    const success = new Discord.MessageEmbed()
      .setColor(embedMSG.successfulColor)
      .setTitle(embedMSG.commandWentWellTitle)
      .setDescription(embedMSG.commandWentWellDesc);
    const Prohibited = new Discord.MessageEmbed()
      .setColor(embedMSG.errorColor)
      .setTitle(embedMSG.prohibitedEmbedTitle)
      .setDescription(embedMSG.prohibitedEmbedDesc);

    if (!interaction.member.roles.cache.has(staffRole))
      return interaction.editReply({ embeds: [Prohibited] });
    const embed = new Discord.MessageEmbed()
      .setTitle(`Applications`)
      .setDescription(
        `If you want to apply to become a Staff, a Moderator or an Helper, select the right Application`
      )
      .setColor("AQUA");
    const button = new Discord.MessageActionRow().setComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("selectApplication")
        .addOptions(
          {
            label: "Staff Application",
            emoji: "🚨",
            value: "staffApplication",
          },
          {
            label: "Moderator Application",
            emoji: "🔨",
            value: "modApplication",
          },
          {
            label: "Helper Application",
            emoji: "❓",
            value: "helperApplication",
          }
        )
        .setMinValues(1)
        .setMaxValues(1)
    );
    interaction.editReply({ embeds: [success] });
    appchan.send({ embeds: [embed], components: [button] });
  },
};

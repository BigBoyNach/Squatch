const Discord = require("discord.js");
const configuration = require("../../config/embed/embedMsg.json");
const embedMSG = configuration.messages;
const { staffRole } = require("../../config/constants/roles.json");
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  staffApplicationChannel,
} = require("../../config/constants/channel.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("staffaplication")
    .setDescription("Send the Staff Aplcation Menu"),
  async execute(interaction, client) {
    const staffappchan = interaction.client.channels.cache.get(
      staffApplicationChannel
    );
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
      .setTitle(`Staff Application`)
      .setDescription(
        `If you want to apply to become a staff member, click on the button bellow`
      )
      .setColor("AQUA");
    const button = new Discord.MessageActionRow().setComponents(
      new Discord.MessageButton()
        .setCustomId("staffApplicationButton")
        .setLabel("Apply now")
        .setStyle("SUCCESS")
    );
    interaction.editReply({ embeds: [success] });
    staffappchan.send({ embeds: [embed], components: [button] });
  },
};

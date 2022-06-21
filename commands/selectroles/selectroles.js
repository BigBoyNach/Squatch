const Discord = require("discord.js");
const configuration = require("../../config/embed/embedMsg.json");
const embedMSG = configuration.messages;
const { staffRole } = require("../../config/constants/roles.json");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { selectRolesChannel } = require("../../config/constants/channel.json");
const {
  role1,
  role2,
  role3,
  role4,
} = require("../../config/constants/selectRoles.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selectroles")
    .setDescription("Send a Select Menu to give roles"),
  async execute(interaction, client) {
    const enabledms = new Discord.MessageEmbed()
      .setColor(embedMSG.errorColor)
      .setTitle(embedMSG.errorEmbedTitle)
      .setDescription(embedMSG.warningEnableDMs);
    const selectroleschan =
      interaction.client.channels.cache.get(selectRolesChannel);
    const success = new Discord.MessageEmbed()
      .setColor(embedMSG.successfulColor)
      .setTitle(embedMSG.commandWentWellTitle)
      .setDescription(embedMSG.commandWentWellDesc);
    const Prohibited = new Discord.MessageEmbed()
      .setColor(embedMSG.errorColor)
      .setTitle(embedMSG.prohibitedEmbedTitle)
      .setDescription(embedMSG.prohibitedEmbedDesc);

    const selectRolesSystem = new Discord.MessageEmbed()
      .setTitle("Roles select menu")
      .setColor("AQUA")
      .setDescription("Choose your roles among the choices offered");

    const selectMenu = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("selectRoles")
        .addOptions(
          {
            label: interaction.guild.roles.cache.get(role1).name,
            value: role1,
          },
          {
            label: interaction.guild.roles.cache.get(role2).name,
            value: role2,
          },
          {
            label: interaction.guild.roles.cache.get(role3).name,
            value: role3,
          },
          {
            label: interaction.guild.roles.cache.get(role4).name,
            value: role4,
          }
        )
        .setMinValues(1)
        .setMaxValues(4)
    );

    if (!interaction.member.roles.cache.has(staffRole))
      return interaction.editReply({ embeds: [Prohibited] });
    interaction.editReply({ embeds: [success] });
    interaction.user
      .send("Successfully added Roles Select Menu")
      .catch((err) => interaction.editReply({ embeds: [enabledms] }));

    await selectroleschan.send({
      embeds: [selectRolesSystem],
      components: [selectMenu],
    });
  },
};

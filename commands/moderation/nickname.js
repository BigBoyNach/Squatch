const Discord = require("discord.js");
const configuration = require("../../config/embed/embedMsg.json");
const embedMSG = configuration.messages;
const { SlashCommandBuilder } = require("@discordjs/builders");
const { channelLog } = require("../../config/constants/channel.json");
const { staffRole } = require("../../config/constants/roles.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nick")
    .setDescription("Allows you to change a nickname of another user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Please mention a username")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("newnickname")
        .setDescription("Please enter a new username")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const server = interaction.guild;
    const warnLogs = server.channels.cache.get(channelLog);
    const moderator = interaction.member;
    let mentionMember = interaction.options.getMember("user");
    let newNickname = interaction.options.getString("newnickname");
    const mentionuser = new Discord.MessageEmbed()
      .setTitle(embedMSG.errorEmbedTitle)
      .setDescription(embedMSG.enterValidUser)
      .setColor(embedMSG.errorColor);
    const nicknamechange = new Discord.MessageEmbed()
      .setTitle(embedMSG.errorEmbedTitle)
      .setDescription(embedMSG.newNicknameEmbed)
      .setColor(embedMSG.errorColor);
    const cantchangeit = new Discord.MessageEmbed()
      .setTitle(embedMSG.errorEmbedTitle)
      .setDescription(embedMSG.errorRolehierarchy)
      .setColor(embedMSG.errorColor);
    const changedit = new Discord.MessageEmbed()
      .setTitle(embedMSG.commandWentWellTitle)
      .setDescription(
        `Changed the nickname of ${mentionMember} to **${newNickname}**`
      )
      .setColor(embedMSG.successfulColor);
    const Prohibited = new Discord.MessageEmbed()
      .setColor(embedMSG.errorColor)
      .setTitle(embedMSG.prohibitedEmbedTitle)
      .setDescription(embedMSG.prohibitedEmbedDesc);

    if (!interaction.member.roles.cache.has(staffRole))
      return interaction.editReply({ embeds: [Prohibited] });
    const moderatorChangedIt = new Discord.MessageEmbed()
      .setTitle(embedMSG.commandWentWellTitle)
      .addField(`Moderator`, `${moderator}`)
      .addField(`User`, `${mentionMember}`)
      .addField(`New nickname`, `${newNickname}`)
      .setColor(embedMSG.successfulColor);
    if (!mentionMember) {
      return interaction.editReply({ embeds: [mentionuser] });
    }
    if (!newNickname) {
      return interaction.editReply({ embeds: [nicknamechange] });
    }
    try {
      mentionMember.setNickname(newNickname);
    } catch (error) {
      interaction.editReply({ embeds: [cantchangeit] });
    }
    interaction.editReply({ embeds: [changedit] });
    await warnLogs.send({
      embeds: [moderatorChangedIt],
    });
  },
};

const Discord = require("discord.js");
const { modRole } = require("../../config/constants/roles.json");
const { channelLog } = require("../../config/constants/channel.json");
const { serverID } = require("../../config/main.json");
const { SlashCommandBuilder } = require("@discordjs/builders");
const configuration = require("../../config/embed/embedMsg.json");
const embedMSG = configuration.messages;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deletemsg")
    .setDescription("deleted the specified message")
    .addStringOption((option) =>
      option
        .setName("messagelink")
        .setDescription("Please enter the message you would like to delete")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const server = client.guilds.cache.get(serverID);
    const warnLogs = server.channels.cache.get(channelLog);
    const Prohibited = new Discord.MessageEmbed()
      .setColor(embedMSG.errorColor)
      .setTitle(embedMSG.prohibitedEmbedTitle)
      .setDescription(embedMSG.prohibitedEmbedDesc);
    const invalidlink = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("That isn't a valid message link!");
    const cantindmmessages = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("I can't delete messages in DMs!");
    const otherserverisbad = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("I can't delete messages in other servers!");
    const successfullydeleted = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        ":white_check_mark: Successfully deleted! :white_check_mark:"
      );
    const cantfindthechannel = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("I couldn't find that channel");
    const cantfindthemessage = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("I couldn't find that message");
    let deletelinkmsg = interaction.options.getString("messagelink");
    if (!interaction.member.roles.cache.has(modRole))
      return interaction.editReply({ embeds: [Prohibited] });
    if (!deletelinkmsg.includes("https://discord.com/channels/"))
      return interaction.editReply({
        embeds: [invalidlink],
      });
    if (deletelinkmsg.includes("@me"))
      return interaction.editReply({
        embeds: [cantindmmessages],
      });
    const data = deletelinkmsg.slice(29).split("/"); // remove the beginning of the URL, and split it into the IDs (guild/channel/message)
    if (data[0] !== interaction.guild.id)
      return interaction.editReply({
        embeds: [otherserverisbad],
      });
    const channel = await interaction.guild.channels.fetch(data[1]);
    const message = await channel.messages.fetch(data[2]);
    if (!channel)
      return interaction.editReply({ embeds: [cantfindthechannel] });
    else if (!message)
      return interaction.editReply({ embeds: [cantfindthemessage] });
    await message.delete();
    interaction.editReply({ embeds: [successfullydeleted] });
  },
};

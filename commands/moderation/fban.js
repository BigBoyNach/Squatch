const { staffRole } = require("../../config/constants/roles.json");
const { channelLog } = require("../../config/constants/channel.json");
const Discord = require(`discord.js`);
const configuration = require("../../config/embed/embedMsg.json");
const embedMSG = configuration.messages;
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fban")
    .setDescription("Bans the user without them joining")
    .addStringOption((option) =>
      option
        .setName("userid")
        .setDescription("Please enter the ID of the user you would like to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription(
          "Please enter the reason why you would like to ban them"
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const server = interaction.guild;
    const Prohibited = new Discord.MessageEmbed()
      .setColor(embedMSG.errorColor)
      .setTitle(embedMSG.prohibitedEmbedTitle)
      .setDescription(embedMSG.prohibitedEmbedDesc);
    const includeuser = new Discord.MessageEmbed()
      .setColor(embedMSG.errorColor)
      .setTitle(embedMSG.errorEmbedTitle)
      .setDescription(embedMSG.enterValidUser);
    const success = new Discord.MessageEmbed()
      .setColor(embedMSG.successfulColor)
      .setTitle(embedMSG.commandWentWellTitle)
      .setDescription(embedMSG.commandWentWellDesc);
    if (!interaction.member.roles.cache.has(staffRole))
      return interaction.editReply({ embeds: [Prohibited] });
    const userId = interaction.options.getString("userid");
    const reason = interaction.options.getString("reason");
    const warnLogs = server.channels.cache.get(channelLog);
    const moderator = interaction.member;

    interaction.guild.members
      .ban(userId)
      .then((user) => {
        interaction.editReply({ embeds: [success] });
      })
      .catch(() => {
        interaction.editReply({ embeds: [includeuser] });
      });

    const futurebanned = new Discord.MessageEmbed()
      .setTitle("User got banned")
      .addField(`Moderator`, `${moderator.user.tag}`)
      .addField(`User`, `<@${userId}>`)
      .addField(`Reason`, `${reason}`);

    await warnLogs.send({
      embeds: [futurebanned],
    });
  },
};

const {
  SlashCommandBuilder
} = require('@discordjs/builders');
const { verificationChannel } = require('../../config/constants/channel.json');
const Discord = require('discord.js')
const { roleID } = require('../../config/constants/roles.json');
const configuration = require('../../config/embed/embedMsg.json')
const embedMSG = configuration.messages
const verification = require('../../events/verification.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Allows you to send a new captcha image'),
  async execute(interaction, client) {
    const Error = new Discord.MessageEmbed()
      .setColor(embedMSG.errorColor)
      .setTitle(embedMSG.errorEmbedTitle)
      .setDescription(embedMSG.prohibitedEmbedDesc);
    const success = new Discord.MessageEmbed()
      .setColor(embedMSG.successfulColor)
      .setTitle(embedMSG.commandWentWellTitle)
      .setDescription(embedMSG.commandWentWellDesc)
      ;

    if (interaction.channel.id != verificationChannel) {
      return interaction.editReply({ embeds: [Error] })
    };

    if (interaction.member.roles.cache.has(roleID)) {
      return interaction.editReply({ embeds: [Error] })
    };

    interaction.editReply({embeds: [success] })
    await verification.execute(client, interaction.member);
  }
}
const Discord = require('discord.js');
const configuration = require('../../config/embed/embedMsg.json')
const embedMSG = configuration.messages
const { suggestChannel } = require('../../config/constants/channel.json');
const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('give the server a suggestion!')
    .addStringOption(option => option.setName('suggestion').setDescription('Please enter your suggestion').setRequired(true)),
  async execute(interaction, client) {
    const suggestmsg = interaction.options.getString('suggestion');
    const Prohibited = new Discord.MessageEmbed()
      .setColor(embedMSG.errorColor)
      .setTitle(embedMSG.prohibitedEmbedTitle)
      .setDescription(embedMSG.prohibitedEmbedDesc)
      ;
      const success = new Discord.MessageEmbed()
      .setColor(embedMSG.successfulColor)
      .setTitle(embedMSG.commandWentWellTitle)
      .setDescription(embedMSG.commandWentWellDesc)
      ;
    if (!suggestmsg) return interaction.editReply({ embeds: [Prohibited] })
    const suggestembed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('New Suggestion')
      .setDescription(`${suggestmsg}`)
      .setFooter({ text: `Suggested by ${interaction.user.tag}!` });
    if (suggestChannel) {
      interaction.member.guild.channels.cache.get(suggestChannel).send({ embeds: [suggestembed] }).then(async (interaction) => {
        await interaction.react('✅');
        await interaction.react('➖');
        await interaction.react('❌');
      });
      interaction.editReply({embeds: [success] })
    }
  },
};
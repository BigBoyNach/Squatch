require("moment-duration-format");
const Discord = require("discord.js")
const {
    pollChannel
} = require('../../config/constants/channel.json')
const {
    pollRole,
    adminRole
} = require('../../config/constants/roles.json')
const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const configuration = require('../../config/embed/embedMsg.json')
const embedMSG = configuration.messages

module.exports = {
    data: new SlashCommandBuilder()
        .setName('polls')
        .setDescription('sends a poll people can vote on')
        .addStringOption(option => option.setName('title').setDescription('Enter what the title of the poll should be').setRequired(true))
        .addStringOption(option => option.setName('poll').setDescription('Enter the text that should go into the announcement').setRequired(true)),
    async execute(interaction, client) {
        const Prohibited = new Discord.MessageEmbed()
            .setColor(embedMSG.errorColor)
            .setTitle(embedMSG.prohibitedEmbedTitle)
            .setDescription(embedMSG.prohibitedEmbedDesc);
        const success = new Discord.MessageEmbed()
            .setColor(embedMSG.successfulColor)
            .setTitle(embedMSG.commandWentWellTitle)
            .setDescription(embedMSG.commandWentWellDesc);
        if (!interaction.member.roles.cache.has(adminRole)) return interaction.editReply({ embeds: [Prohibited] })
        const pollChan = client.channels.cache.get(pollChannel);
        const pollDesc = interaction.options.getString('poll');
        const pollTitle = interaction.options.getString('title');
        const pollEmbed = new Discord.MessageEmbed()
            .setColor("PURPLE")
            .setTitle(pollTitle)
            .setDescription(pollDesc)
            .setFooter({
                text: '👍 Like | 👎 Dislike'
            });
        await pollChan.send(`<@&${pollRole}>`)
        await pollChan.send({
            embeds: [pollEmbed]
        }).then(async(interaction) => {
            await interaction.react('👍');
            await interaction.react('👎');
        })
        return interaction.editReply({
            embeds: [success]
        })
    }
}
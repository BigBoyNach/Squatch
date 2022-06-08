const Discord = require('discord.js');
const Levels = require('discord-xp')
const {
    adminRole
} = require(`../../config/constants/roles.json`)
const configuration = require('../../config/embed/embedMsg.json')
const embedMSG = configuration.messages
const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addlevel')
        .setDescription('Allows you to add a level to the specific user')
        .addUserOption(option => option.setName('user').setDescription('Select a user that should gain the new level').setRequired(true))
        .addNumberOption(option => option.setName('num').setDescription('Enter a number').setRequired(true)),
    async execute(interaction, client) {
        const number = interaction.options.getNumber('num');
        const user = interaction.options.getMember('user');
        const success = new Discord.MessageEmbed()
            .setColor(embedMSG.successfulColor)
            .setTitle(embedMSG.commandWentWellTitle)
            .setDescription(embedMSG.commandWentWellDesc);
        const Prohibited = new Discord.MessageEmbed()
            .setColor(embedMSG.errorColor)
            .setTitle(embedMSG.prohibitedEmbedTitle)
            .setDescription(embedMSG.prohibitedEmbedDesc);
        const server = interaction.guild
        if (!interaction.member.roles.cache.has(adminRole)) return interaction.editReply({ embeds: [Prohibited] })


        Levels.appendLevel(user.id, interaction.guild.id, number);
        interaction.editReply({ embeds: [success] })
    }
}
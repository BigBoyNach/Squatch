const Discord = require('discord.js');
require('moment-duration-format');
const configuration = require('../../config/embed/embedMsg.json')
const embedMSG = configuration.messages
const { applicationChannel } = require('../../config/constants/channel.json');
const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('application')
        .setDescription('Apply for staff'),
    async execute(interaction, client) {
        const modal = new Modal()
        .setCustomId('myModal')
        .setTitle('My Modal');
    await interaction.showModal(modal);
    },
};
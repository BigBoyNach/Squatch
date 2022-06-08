const Levels = require('discord-xp')
const Discord = require(`discord.js`)
const configuration = require('../../config/embed/embedMsg.json')
const embedMSG = configuration.messages
const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Lets you see the leaderboard'),
    async execute(interaction, client) {
        const noOneLeaderboard = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setTitle(embedMSG.leaderboardTitle)
            .setDescription(embedMSG.noOneInLeaderBoard);

        const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 5)
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        if (rawLeaderboard.length < 1) return interaction.editReply({ embeds: [noOneLeaderboard] });

        const l = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator} - Level: ${e.level} XP: ${e.xp.toString()}`);
        const leaderboardsent = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setTitle(embedMSG.leaderboardTitle)
            .setDescription(`${l.join("\n\n")}`);
        interaction.editReply({ embeds: [leaderboardsent] })

    }
}
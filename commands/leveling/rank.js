const Discord = require('discord.js');
const Levels = require('discord-xp')
const canvacord = require('canvacord')
const configuration = require('../../config/embed/embedMsg.json')
const embedMSG = configuration.messages
const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Lets you see your current rank')
        .addUserOption(option => option.setName('user').setDescription('Select a user')),
    async execute(interaction, client) {
        const noxp = new Discord.MessageEmbed()
            .setColor(embedMSG.errorColor)
            .setTitle(embedMSG.errorEmbedTitle)
            .setDescription("test");
        const target = interaction.options.getMember('user') ?? interaction.member;
        const user = await Levels.fetch(target.id, interaction.guild.id, true);
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
        if (user.length < 1) return interaction.editReply({
            embeds: [noxp]
        });
        const rank = new canvacord.Rank()
            .setAvatar(target.displayAvatarURL({
                dynamic: true,
                format: "jpg"
            }))
            .setCurrentXP(user.xp)
            .setLevel(user.level || 0)
            .setRequiredXP(neededXp)
            .setRank(user.position)
            .setProgressBar('RANDOM', 'COLOR')
            .setUsername(target.user.username)
            .setDiscriminator(target.user.discriminator);
        rank.build().then(data => {
            const attachment = new Discord.MessageAttachment(data, "../../files/images/rankcard.png")
            interaction.editReply({
                files: [attachment]
            })
        })

    }
}
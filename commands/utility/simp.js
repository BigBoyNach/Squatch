const Canvas = require("canvas");
const Discord = require('discord.js');
require('moment-duration-format');
const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('simp')
        .setDescription('makes a simp card for the user')
        .addUserOption(option => option.setName('user').setDescription('Please mention a user you would like the information for')),
    async execute(interaction, client) {
        const member = interaction.options.getMember('user') ?? interaction.member;
        if (!member) return;
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({ format: "jpg" })
        );
        let background = await Canvas.loadImage(
            "https://cdn.discordapp.com/attachments/881090885440385074/936589045847453776/SimpCard.png"
        )

        const canvas = Canvas.createCanvas(1280, 720);
        const ctx = canvas.getContext(`2d`);

        ctx.drawImage(background, 0, 0, 1280, 720);
        ctx.drawImage(avatar, 100, 75, 320, 360)
        ctx.font = '45px "Amaranth"'
        ctx.fillText(`${member.user.username}`, 230, 505)
        ctx.fillText(`${interaction.createdAt.toLocaleDateString()}`, 75, 620)

        const attachment = new Discord.MessageAttachment(
            canvas.toBuffer(),
            "simpcard.jpg"
        );
        interaction.editReply({ content: " If your username contains any non-alphabetical charachters, it won't show the username", files: [attachment] });
    }
}
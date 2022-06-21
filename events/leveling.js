const Levels = require("discord-xp");
const Discord = require("discord.js");
const { levelUpChannel } = require(`../config/constants/channel.json`);
const { serverID } = require("../config/main.json");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(client, message) {
    const server = client.guilds.cache.get(serverID);
    const target = message.author;
    const user = await Levels.fetch(target.id, server.id, true);
    const levelingChannel = server.channels.cache.get(levelUpChannel);
    if (!message.guild) return;
    if (message.author.bot) return;
    const randomxp = Math.floor(Math.random() * 10) + 1;
    const hasLevelUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomxp
    );
    const rankedup = new Discord.MessageEmbed()
      .setTitle(`New Level **${user.level}**!`)
      .setDescription(
        `Congratulations ${message.author.tag}\nYou leveled up to level ${user.level}`
      )
      .setFooter({
        text: `${message.author.tag}`,
        iconURL: `${message.author.avatarURL()}`,
      });
    if (hasLevelUp) {
      levelingChannel.send({
        embeds: [rankedup],
      });
    }
  },
};

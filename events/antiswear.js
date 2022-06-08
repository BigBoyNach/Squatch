const Discord = require("discord.js")

const {
    channelLog
} = require('../config/constants/channel.json');

const {
    staffRole
} = require('../config/constants/roles.json');

const {
    serverID
} = require('../config/main.json');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        try {
            // Create a file with banned words/links and path to it
            const array = require("../files/security/filter.json")
            if (array.some(word => message.content.toLowerCase().includes(word))) {
                if(message.member.roles.cache.has(staffRole)) return;
                message.delete()
                const server = client.guilds.cache.get(serverID);
                const warnLogs = server.channels.cache.get(channelLog);

                const embed = new Discord.MessageEmbed()
                    .setTitle(`❌ Message Deleted ❌`)
                    .setColor('RED')
                    .addField(`User`, `${message.author.tag}`)
                    .addField(`Message`, `${message.content.toLowerCase()}`)
                    .addField(`Word`, `${array}`)
                warnLogs.send({
                    embeds: [embed]
                })

                const embed2 = new Discord.MessageEmbed()
                    .setTitle(`❌ Message Deleted ❌`)
                    .setDescription(`Your message got deleted because it contained a restricted word`)
                    .addField('Message', `${message.content.toLowerCase()}`)
                    .addField('Word', `${array}`)
                    .setColor('RED')
                    .setTimestamp()

                message.author.send({
                    embeds: [embed2]
                })
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
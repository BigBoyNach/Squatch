const Discord = require('discord.js')
const transcripts = require(`discord-html-transcripts`)
const configuration = require('../config/ticket/ticket.json')
const tickets = configuration.tickets
const { adminRole } = require('../config/constants/roles.json')
const { channelLog } = require('../config/constants/channel.json')
const { serverID } = require('../config/main.json')

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        const server = client.guilds.cache.get(serverID);
        
        //Command Handler
        if (interaction.isCommand()) {
            await interaction.deferReply({ ephermeral: true})
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.editReply({
                    content: `There was an error while executing this command!. Please let let someone with the <@&${adminRole}> role know!`,
                    ephemeral: true
                });
            }
        }

        //Embeds for the ticket system
        const closeticket = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle('Ticket Deletion')
            .setDescription('This ticket will close in 10 seconds.');
        const reportauserembed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(tickets.reportUser)
            .setDescription(tickets.reportUserEmbed);
        const reportabugembed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(tickets.reportBug)
            .setDescription(tickets.reportBugEmbed);
        const otherticketembedtoreport = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(tickets.reportOther)
            .setDescription(tickets.otherTicketEmbed);
        const btnClose = new Discord.MessageButton()
            .setLabel('Close Ticket')
            .setCustomId('close_ticket')
            .setStyle('DANGER');
        const row = new Discord.MessageActionRow()
            .addComponents(
                btnClose
            )

        //This is for the reaction role buttons - the only thing you should change is the id's that go into the variables and at best the variable names
        if (interaction.isButton()) {
            if (interaction.customId === 'test1') {
                var role1 = ""
                if (interaction.member.roles.cache.has(role1)) {
                    interaction.member.roles.remove(role1)
                    interaction.reply({
                        content: `You removed the <@&${role1}> role!`,
                        ephemeral: true
                    })
                } else {
                    interaction.reply({
                        content: `You recieved the <@&${role1}> role!`,
                        ephemeral: true
                    })
                    var role1 = ""
                    interaction.member.roles.add(role1)
                }
            }
        }

        if (interaction.isButton()) {
            if (interaction.customId === 'test2') {
                var role2 = ""
                if (interaction.member.roles.cache.has(role2)) {
                    interaction.member.roles.remove(role2)
                    interaction.reply({
                        content: `You removed the <@&${role2}> role!`,
                        ephemeral: true
                    })
                } else {
                    interaction.reply({
                        content: `You recieved the <@&${role2}> role!`,
                        ephemeral: true
                    })
                    var role2 = ""
                    interaction.member.roles.add(role2)
                }
            }
        }

        if (interaction.isButton()) {
            if (interaction.customId === 'test3') {
                var role3 = ""
                if (interaction.member.roles.cache.has(role3)) {
                    interaction.member.roles.remove(role3)
                    interaction.reply({
                        content: `You removed the <@&${role3}> role!`,
                        ephemeral: true
                    })
                } else {
                    interaction.reply({
                        content: `You recieved the <@&${role3}> role!`,
                        ephemeral: true
                    })
                    var role3 = ""
                    interaction.member.roles.add(role3)
                }
            }
        }
        
        if (interaction.isButton()) {
            if (interaction.customId === 'test4') {
                var role4 = ""
                if (interaction.member.roles.cache.has(role4)) {
                    interaction.member.roles.remove(role4)
                    interaction.reply({
                        content: `You removed the <@&${role4}> role!`,
                        ephemeral: true
                    })
                } else {
                    interaction.reply({
                        content: `You recieved the <@&${role4}> role!`,
                        ephemeral: true
                    })
                    var role4 = ""
                    interaction.member.roles.add(role4)
                }
            }
        }

        if (interaction.isButton()) {
            if (interaction.customId === 'test5') {
                var role5 = ""
                if (interaction.member.roles.cache.has(role5)) {
                    interaction.member.roles.remove(role5)
                    interaction.reply({
                        content: `You removed the <@&${role5}> role!`,
                        ephemeral: true
                    })
                } else {
                    interaction.reply({
                        content: `You recieved the <@&${role5}> role!`,
                        ephemeral: true
                    })
                    var role5 = ""
                    interaction.member.roles.add(role5)
                }
            }
        }

        //for the option in the ticket system - lets moderators and members to close the tickets
        if (interaction.isButton()) {
            const channel = interaction.channel;
            const ticketTranscriptsChannel = server.channels.cache.get(channelLog);
            const attachment = await transcripts.createTranscript(channel);
            const embedclosed = new Discord.MessageEmbed()
            .setTitle("Ticket Closed")
            .setColor("GREEN")
            .setDescription(`Ticket closed by:\n${interaction.user}`)
            .setTimestamp();
            const moderationEmbedClosed = new Discord.MessageEmbed()
            .setTitle(`Ticket Closed`)
            .setColor("GREEN")
            .setDescription(`A ticket has been deleted`)
            if (interaction.customId === 'close_ticket') {
                interaction.reply({
                    embeds: [closeticket]
                })
                await interaction.member.send({ embeds: [embedclosed], files: [attachment] })
                await ticketTranscriptsChannel.send({ embeds: [moderationEmbedClosed], files: [attachment] })
                setTimeout(() => interaction.channel.delete(), 10000);
                return;
            }
        }

        // For the ticket system - allows the user to select what they want to report
        if (!interaction.isSelectMenu()) return;
        if (interaction.values[0] === 'first_option') {
            interaction.channel.setParent(tickets.reportUserCategoryID)
            await interaction.update({
                embeds: [reportauserembed],
                components: [row]
            })
        }

        if (interaction.values[0] === 'second_option') {
            interaction.channel.setParent(tickets.reportBugCategoryID)
            await interaction.update({
                embeds: [reportabugembed],
                components: [row]
            })
        }

        if (interaction.values[0] === 'third_option') {
            interaction.channel.setParent(tickets.reportOtherCategoryID)
            await interaction.update({
                embeds: [otherticketembedtoreport],
                components: [row]
            })
        }
    }
}
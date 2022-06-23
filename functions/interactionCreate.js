const Discord = require("discord.js");
const transcripts = require(`discord-html-transcripts`);
const ticketConfiguration = require("../config/ticket/ticket.json");
const tickets = ticketConfiguration.tickets;
const {
  adminRole,
  staffRole,
  modRole,
} = require("../config/constants/roles.json");
x;
const {
  channelLog,
  applicationResponsesChannel,
} = require("../config/constants/channel.json");
const { serverID } = require("../config/main.json");
const {
  role1,
  role2,
  role3,
  role4,
} = require("../config/constants/selectRoles.json");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const server = client.guilds.cache.get(serverID);

    //Command Handler
    if (interaction.isCommand()) {
      await interaction.deferReply({ ephermeral: true });
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.editReply({
          content: `There was an error while executing this command!. Please let let someone with the <@&${adminRole}> role know!`,
          ephemeral: true,
        });
      }
    }

    //Embeds for the ticket system
    const closeticket = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Ticket Deletion")
      .setDescription("This ticket will close in 10 seconds.");
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
      .setLabel("Close Ticket")
      .setCustomId("close_ticket")
      .setStyle("DANGER");
    const row = new Discord.MessageActionRow().addComponents(btnClose);

    //for the selectRole command
    if (interaction.isSelectMenu() && interaction.customId == "selectRoles") {
      const selectRolesSystem = new Discord.MessageEmbed()
        .setTitle("Roles select menu")
        .setColor("AQUA")
        .setDescription("Choose your roles among the choices offered");

      const selectMenu = new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId("selectRoles")
          .addOptions(
            {
              label: interaction.guild.roles.cache.get(role1).name,
              value: role1,
            },
            {
              label: interaction.guild.roles.cache.get(role2).name,
              value: role2,
            },
            {
              label: interaction.guild.roles.cache.get(role3).name,
              value: role3,
            },
            {
              label: interaction.guild.roles.cache.get(role4).name,
              value: role4,
            }
          )
          .setMinValues(1)
          .setMaxValues(4)
      );
      await interaction.message.delete();
      await interaction.channel.send({
        embeds: [selectRolesSystem],
        components: [selectMenu],
      });
      let rolesAddedLength = 0;
      let rolesAdded = ``;
      const roles = interaction.values;
      for (let i in roles) {
        const role = await interaction.guild.roles.cache.get(
          interaction.values[i]
        );
        if (interaction.member.roles.cache.has(role.id))
          interaction.user.send(`You already have **${role.name}** role!`);
        else {
          interaction.member.roles.add(role.id);
          rolesAddedLength++;
          rolesAdded = rolesAdded + `- ${role.name} \n`;
        }
      }
      if (rolesAdded)
        await interaction.user.send(
          `Successfuly added \`${rolesAddedLength}\` roles : \n` + rolesAdded
        );
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
        .setDescription(`A ticket has been deleted`);
      if (interaction.customId === "close_ticket") {
        interaction.reply({
          embeds: [closeticket],
        });
        await interaction.member.send({
          embeds: [embedclosed],
          files: [attachment],
        });
        await ticketTranscriptsChannel.send({
          embeds: [moderationEmbedClosed],
          files: [attachment],
        });
        setTimeout(() => interaction.channel.delete(), 10000);
        return;
      }
    }

    // For the ticket system - allows the user to select what they want to report
    if (interaction.isSelectMenu()) {
      if (interaction.values[0] === "first_option") {
        interaction.channel.setParent(tickets.reportUserCategoryID);
        await interaction.update({
          embeds: [reportauserembed],
          components: [row],
        });
      }

      if (interaction.values[0] === "second_option") {
        interaction.channel.setParent(tickets.reportBugCategoryID);
        await interaction.update({
          embeds: [reportabugembed],
          components: [row],
        });
      }

      if (interaction.values[0] === "third_option") {
        interaction.channel.setParent(tickets.reportOtherCategoryID);
        await interaction.update({
          embeds: [otherticketembedtoreport],
          components: [row],
        });
      }
    }

    //For the staff application
    if (
      interaction.isSelectMenu() &&
      interaction.customId == "selectApplication"
    ) {
      const appreschan = await interaction.guild.channels.fetch(
        applicationResponsesChannel
      );
      if (interaction.values[0] == "staffApplication") {
        const modal = new Discord.Modal()
          .setTitle("🚨Staff Application")
          .setCustomId("staffApplicationModal")
          .addComponents(
            new Discord.MessageActionRow().addComponents(
              new Discord.TextInputComponent()
                .setCustomId("motivationTextInput")
                .setLabel("Please describe your motivation")
                .setMinLength(100)
                .setMaxLength(4000)
                .setPlaceholder("My motivation")
                .setRequired(true)
                .setStyle("PARAGRAPH")
            )
          );
        await interaction.showModal(modal);
        const ans = await interaction.awaitModalSubmit({ time: 1800000 });
        const embed = new Discord.MessageEmbed()
          .setTitle(`Submitter: ${interaction.user.tag}`)
          .setDescription(
            `Please describe your motivation:\n\n${ans.components[0].components[0].value}`
          )
          .setColor(interaction.guild.roles.cache.get(staffRole).color);
        await appreschan.send({
          content: `<@&${staffRole}> new Staff Application received !`,
          embeds: [embed],
        });
        await ans.reply({
          content: "✅  Successfully submitted Staff Application  ✅",
          ephemeral: true,
        });
      } else if (interaction.values[0] == "modApplication") {
        const modal = new Discord.Modal()
          .setTitle("🔨Moderator Application")
          .setCustomId("modApplicationModal")
          .addComponents(
            new Discord.MessageActionRow().addComponents(
              new Discord.TextInputComponent()
                .setCustomId("motivationTextInput")
                .setLabel("Please describe your motivation")
                .setMinLength(100)
                .setMaxLength(4000)
                .setPlaceholder("My motivation")
                .setRequired(true)
                .setStyle("PARAGRAPH")
            )
          );
        await interaction.showModal(modal);
        const ans = await interaction.awaitModalSubmit({ time: 1800000 });
        const embed = new Discord.MessageEmbed()
          .setTitle(`Submitter: ${interaction.user.tag}`)
          .setDescription(
            `Please describe your motivation:\n\n${ans.components[0].components[0].value}`
          )
          .setColor(interaction.guild.roles.cache.get(modRole).color);
        await appreschan.send({
          content: `<@&${staffRole}> new Moderator Application received !`,
          embeds: [embed],
        });
        await ans.reply({
          content: "✅  Successfully submitted Moderator Application  ✅",
          ephemeral: true,
        });
      } else if (interaction.values[0] == "helperApplication") {
        const modal = new Discord.Modal()
          .setTitle("❓Helper Application")
          .setCustomId("helperApplicationModal")
          .addComponents(
            new Discord.MessageActionRow().addComponents(
              new Discord.TextInputComponent()
                .setCustomId("motivationTextInput")
                .setLabel("Please describe your motivation")
                .setMinLength(100)
                .setMaxLength(4000)
                .setPlaceholder("My motivation")
                .setRequired(true)
                .setStyle("PARAGRAPH")
            )
          );
        await interaction.showModal(modal);
        const ans = await interaction.awaitModalSubmit({ time: 1800000 });
        const embed = new Discord.MessageEmbed()
          .setTitle(`Submitter: ${interaction.user.tag}`)
          .setDescription(
            `Please describe your motivation:\n\n${ans.components[0].components[0].value}`
          )
          .setColor(
            interaction.guild.roles.cache.get(tickets.supportRoleID).color
          );
        await appreschan.send({
          content: `<@&${staffRole}> new Helper Application received !`,
          embeds: [embed],
        });
        await ans.reply({
          content: "✅  Successfully submitted Helper Application  ✅",
          ephemeral: true,
        });
      }
    }
  },
};

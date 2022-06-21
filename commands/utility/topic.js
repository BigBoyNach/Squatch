const randomTopic = require("table-topic-generator");
require("moment-duration-format");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("topic")
    .setDescription("sends a randomized topic"),
  async execute(interaction, client) {
    let allTopics = [
      "Summer",
      "Vacation",
      "Family",
      "Time",
      "People",
      "Favorite",
      "Memories",
    ];
    let random = Math.floor(Math.random() * allTopics.length);
    const topic = await randomTopic(1, allTopics[random]);
    interaction.editReply("New topic");
    return interaction.channel.send(topic.Table_Topics[0]);
  },
};

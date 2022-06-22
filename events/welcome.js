const { welcomeChannel } = require('../config/constants/channel.json');
const {
    serverID
} = require('../config/main.json');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute: (client, args) => {
        const server = client.guilds.cache.get(serverID);
        const welcome = server.channels.cache.get(welcomeChannel);
        const UserOnJoin = `<@${args.user.id}>`
        let messages = [
            `Welcome ${UserOnJoin} to the server!`,
            `How are you ${UserOnJoin} !`,
            `Hows your day been so far, ${UserOnJoin} ?`
            ` ${UserOnJoin} has just joined the server !`
        ]
        let chosenMessage = messages[Math.floor(Math.random() * messages.length)]
        welcome.send(chosenMessage)
    }
}
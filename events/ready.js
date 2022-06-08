const eventLogger = require('../logging');

module.exports = {
  name: 'ready',
  once: true,
  execute: (client) => {
    eventLogger(client);
    let STATUSES = [`America`,
      `Banana`,
      `House`,
      `9`,
      `abc`
    ]
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * (STATUSES.length - 1) + 1);
      const newActivity = STATUSES[randomIndex];
      client.user.setPresence({
        activities: [{
          name: `${newActivity}`,
          type: "STREAMING",
          url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
        }],
        status: "online",
      })
    }, 5000)
    console.log("The bot is up and running!")
  },
};
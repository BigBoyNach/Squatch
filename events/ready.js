const eventLogger = require("../logging");

module.exports = {
  name: "ready",
  once: true,
  execute: (client) => {
    eventLogger(client);
    let STATUSES = [`The server`, `DMS`, `How to be a good bot`];
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * (STATUSES.length - 1) + 1);
      const newActivity = STATUSES[randomIndex];
      client.user.setPresence({
        activities: [
          {
            name: `${newActivity}`,
            type: "WATCHING",
          },
        ],
        status: "online",
      });
    }, 5000);
    console.log("The bot is up and running!");
  },
};

const requestEvent = (event) => require(`../events/${event}`);

let eventLoader = (bot) => {
  bot.on('ready', () => requestEvent('ready').func(bot));
  bot.on('message', (message) => requestEvent('message').func(message, bot));
};

module.exports = eventLoader;
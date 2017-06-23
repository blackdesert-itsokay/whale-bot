let ping = {
  command: "ping",
  help: "機器人的延遲，每分鐘更新一次，單位為ms",
  func: (bot, message, args) => {
    message.channel.send(`延遲為 ${bot.ping.toFixed(0)} ms`);
  }
}

module.exports = ping;
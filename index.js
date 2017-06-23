// require discord node js api and new a bot client
const Discord = require("discord.js");
const bot = new Discord.Client();
// load bot config json file
bot.config = require("./config.json");

const commandLoader = require('./util/commandLoader');
const eventLoader = require('./util/eventLoader');
const bossTimer = require('./util/bossTimer');
const imperialTimer = require('./util/imperialTimer');

var update = () => {
  console.log('開始資料更新...\n');
  bossTimer.update().then(() => console.log('世界王資訊更新完成'));
  imperialTimer.update().then(() => console.log('皇室資訊更新完成'));
};

var init = () => {
  commandLoader(bot);
  eventLoader(bot);

  update();
  // login with whale-bot token
  bot.login(bot.config.token);
};

init();
setInterval(update, 60 * 5 * 1000);

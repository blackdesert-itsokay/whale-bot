const http = require("http");
// require discord node js api and new a bot client
const Discord = require("discord.js");
const bot = new Discord.Client();
// load bot config json file
const config = require("./config.json");
const PREFIX = config.prefix;
// load setting commands
const commands = require("./commands.json");
// update boss and gtrade info every 60 secs
const delay = 5 * 60 * 1000;
// create a json object to save the update data
var obj = {};

function update() {
  console.log("\n" + bot.user.username + " update boss and gtrade.");
  // Kzarka - http://bd.youxidudu.com/mylike/app_get_boss_kejiaka.php
  var requestKzarka = http.get("http://bd.youxidudu.com/mylike/app_get_boss_kejiaka.php", function (response) {
    var body = '';

    response.on('data', function (chunk) {
      body += chunk;
    });

    response.on('end', function () {
      obj.kzarka = JSON.parse(body);
      // console.log("kzarka : " + JSON.stringify(obj.kzarka));
    });

  }).on('error', function (e) {
    console.log("kzarka got an error: ", e);
  });
  // kutum - http://bd.youxidudu.com/mylike/app_get_boss_kutun.php
  var requestKutum = http.get("http://bd.youxidudu.com/mylike/app_get_boss_kutun.php", function (response) {
    var body = '';

    response.on('data', function (chunk) {
      body += chunk;
    });

    response.on('end', function () {
      obj.kutum = JSON.parse(body);
      // console.log("kutum : " + JSON.stringify(obj.kutum));
    });

  }).on('error', function (e) {
    console.log("kutum got an error: ", e);
  });
  // gtrade time - http://bd.youxidudu.com/mylike/app_get_gtrade_timeduan.php
  // gtrade - http://bd.youxidudu.com/mylike/app_get_gtrade.php
  var requestGtrade = http.get("http://bd.youxidudu.com/mylike/app_get_gtrade.php", function (response) {
    var body = '';

    response.on('data', function (chunk) {
      body += chunk;
    });

    response.on('end', function () {
      obj.gtrade = JSON.parse(body);
      obj.gtrade.string = obj.gtrade.now_xianlu.replace(new RegExp('</li>', 'g'), " ").replace(new RegExp('<li>', 'g'), "");
      // console.log("gtrade : " + obj.gtrade.string);
    });
  }).on('error', function (e) {
    console.log("gtrade got an error: ", e);
  });
}
// login with whale-bot token
bot.login(config.token);
// whale-bot is ready to serve
bot.on("ready", () => {
  console.log(bot.user.username + " is online.");
  // update boss and gtrade every [delay] ms
  update();
  setInterval(update, delay);
});
// when whale-bot detect message on chat room
bot.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot)
    return;

  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case commands.kzarka:
      var kzarka = obj.kzarka;
      message.channel.send('```下次克價卡出生時間：' + kzarka.next_day + '  ' + kzarka.n_horse_a + ' ~ ' + kzarka.n_horse_b + '```');
      break;
    case commands.kutum:
      var kutum = obj.kutum;
      message.channel.send('```下次庫屯出生時間：' + kutum.next_day + '  ' + kutum.n_horse_a + ' ~ ' + kutum.n_horse_b + '```');
      break;
    case commands.map:
      message.channel.send('<http://bd.youxidudu.com/map/index_tw.html>');
      break;
    case commands.gtrade:
      var str = obj.gtrade.string;
      message.channel.send('```皇室納貢/釣魚更新分流：' + str + '```');
      break;
    default:
      break;
  }
});

const imperialTimer = require('../util/imperialTimer');

let delivery = {
  command: '皇室',
  help: '告訴你當前時段的皇室納貢/皇室釣魚的更新分流',
  func: (bot, message, args) => {
    let time = imperialTimer.delivery.time;
    let text = imperialTimer.delivery.channel;
    try {
      let arr = text.replace(/<li>/g, "").split(/<\/li>/g);
      message.channel.send(`皇室納貢/皇室釣魚的更新\n${time}\n${arr}`);
    } catch(err) {
      message.channel.send(`皇室納貢/皇室釣魚的更新\n${time}\n目前沒有更新唷!!`);
    }
  }
}

module.exports = delivery;

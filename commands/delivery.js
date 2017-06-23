const imperialTimer = require('../util/imperialTimer');

let delivery = {
  command: '皇室',
  help: '告訴你當前時段的皇室納貢/皇室釣魚的更新分流',
  func: (bot, message, args) => {
    let time = imperialTimer.delivery.time;
    let info = imperialTimer.delivery.info;
    let text = '';
    try {
      for (let i = 0; i < info.length; i++) {
        text += info[i].innerHTML;
        if (i != info.length - 1) text += ', ';
      }
      message.channel.send(`皇室納貢/皇室釣魚的更新\n${time}\n${text}`);
    } catch (err) {
      message.channel.send(`皇室納貢/皇室釣魚的更新\n${time}\n目前沒有更新唷!!`);
    }
  }
}

module.exports = delivery;

const bossTimer = require('../util/bossTimer');

let kzarka = {
  command: '克價卡',
  help: '告訴你下一次克價卡出生時間',
  func: (bot, message, args) => {
    message.channel.send(`${kzarka.command}\n${bossTimer.kzarka.getTime()}`);
  }
}

module.exports = kzarka;
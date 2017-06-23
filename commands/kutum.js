const bossTimer = require('../util/bossTimer');

let kutum = {
	command: '庫屯',
	help: '告訴你下一次庫屯出生時間',
	func: (bot, message, args) => {
		message.channel.send(`${kutum.command}\n${bossTimer.kutum.getTime()}`);
	}
}

module.exports = kutum;
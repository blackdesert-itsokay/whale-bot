let horse = {
	command: '抓馬',
	help: '告訴你黑沙各地區野生馬',
	func: (bot, message, args) => {
		message.channel.send(`★代表出生位置，數字代表數量\nhttp://i.imgur.com/Jhed7uG.jpg`);
	}
}

module.exports = horse;
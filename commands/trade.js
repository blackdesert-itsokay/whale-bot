let trade = {
	command: '貿易',
	help: '告訴你當前時段的皇室貿易的更新分流與貿易物品',
	func: (bot, message, args) => {
		message.channel.send(`很抱歉，目前尚未開放，還在努力中`);
	}
}

module.exports = trade;
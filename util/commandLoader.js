const fs = require("fs");
const path = './commands/';

let commandLoader = (bot) => {
	let list = fs.readdirSync(path);

	bot.commands = {};
	bot.commands.size = 0;

	for (var i = 0; i < list.length; i++) {
		let item = list[i];
		// only take js files
		if (item.match(/\.js$/)) {
			// delete the cache of the require module
			// it is useful in case that you want reload the command again
			delete require.cache[require.resolve(`../commands/${item}`)];
			// put the require module inside the bot.commands object
			// bot.commands[item.slice(0, -3)] = require(`./commands/${item}`);
			var m = require(`../commands/${item}`);
			bot.commands[m.command] = m;
			bot.commands.size += 1;

			console.log(`指令[!${m.command}]載入完成`);
		}
	}

	console.log('共有 ' + bot.commands.size + ' 個指令');
}

module.exports = commandLoader;
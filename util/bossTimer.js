const async = require('asyncawait/async');
const await = require('asyncawait/await');

const httpRequest = require('./httpRequest');

function Boss(url) {
	this.setUrl(url);
};

Boss.prototype = {
	url: '',
	pre_time: '00-00',
	next_day: '00-00',
	next_min: '00:00',
	next_max: '00:00'
};

Boss.prototype.setUrl = function (url) {
	this.url = url;
};

Boss.prototype.getTime = function () {
	return `上次出生時間為 ${this.pre_time}\n` +
		`下次出生時間為 ${this.next_day}  ${this.next_min}~${this.next_max}\n`
};

Boss.prototype.setTime = function (json) {
	try {
		this.pre_time = json.pre_time;

		this.next_day = json.next_day;
		this.next_min = json.n_horse_a;
		this.next_max = json.n_horse_b;
	} catch (err) {
		console.log(`解析json物件失敗\n${err.stack()}`);
	}
};

let bossTimer = {
	kzarka: new Boss('http://bd.youxidudu.com/mylike/app_get_boss_kejiaka.php'),
	kutum: new Boss('http://bd.youxidudu.com/mylike/app_get_boss_kutun.php'),
	update: async(() => {
		await(httpRequest(bossTimer.kzarka.url, bossTimer.kzarka.setTime.bind(bossTimer.kzarka)));
		await(httpRequest(bossTimer.kutum.url, bossTimer.kutum.setTime.bind(bossTimer.kutum)));
	})
};

module.exports = bossTimer;

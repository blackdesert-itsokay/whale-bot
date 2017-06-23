// 貿易時段 http://bd.youxidudu.com/mylike/app_get_gmaoyi_timeduan.php
// 貿易分流與物品 http://bd.youxidudu.com/mylike/app_get_gmaoyi.php
// 納貢/釣魚時段 http://bd.youxidudu.com/mylike/app_get_gtrade_timeduan.php
// 納貢/釣魚分流 http://bd.youxidudu.com/mylike/app_get_gtrade.php
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const httpRequest = require('./httpRequest');
const DOM = require('jsdom');
const { JSDOM } = DOM;

function Imperial(time_url, info_url) {
	this.setUrl(time_url, info_url);
};

Imperial.prototype = {
	time_url: '',
	info_url: '',
	time: '',
	info: ''
};

Imperial.prototype.setUrl = function (time_url, info_url) {
	this.time_url = time_url;
	this.info_url = info_url;
};

Imperial.prototype.setTime = function (json) {
	try {
		this.time = json.time_duan;
	} catch (err) {
		console.log(`解析json物件失敗\n${err.stack()}`);
	}
};

Imperial.prototype.setInfo = function (json) {
	try {
		let dom = new JSDOM(json.now_xianlu);
		this.info = dom.window.document.querySelectorAll("li");
		// for (let i = 0; i < arr.length; i++) console.log(arr[i].textContent);
	} catch (err) {
		console.log(`解析json物件失敗\n${err.stack()}`);
	}
};

let imperialTimer = {
	trade: new Imperial('http://bd.youxidudu.com/mylike/app_get_gmaoyi_timeduan.php',
		'http://bd.youxidudu.com/mylike/app_get_gmaoyi.php'),
	delivery: new Imperial('http://bd.youxidudu.com/mylike/app_get_gtrade_timeduan.php',
		'http://bd.youxidudu.com/mylike/app_get_gtrade.php'),
	update: async(() => {
		await(httpRequest(imperialTimer.trade.time_url,
			imperialTimer.trade.setTime.bind(imperialTimer.trade)));
		await(httpRequest(imperialTimer.trade.info_url,
			imperialTimer.trade.setInfo.bind(imperialTimer.trade)));

		await(httpRequest(imperialTimer.delivery.time_url,
			imperialTimer.delivery.setTime.bind(imperialTimer.delivery)));
		await(httpRequest(imperialTimer.delivery.info_url,
			imperialTimer.delivery.setInfo.bind(imperialTimer.delivery)));
	})
};

module.exports = imperialTimer;

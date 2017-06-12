var ifanr = require('./ifanr');
var huxiu = require('./huxiu');
var CronJob = require('cron').CronJob;


var job = new CronJob({
	cronTime: '0 */60 * * * *',
	onTick: function() {
		ifanr.task();
		huxiu.task();
	},
	start: true
});
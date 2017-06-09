var ifanr = require('./ifanr');
var CronJob = require('cron').CronJob;


var job = new CronJob({
	cronTime: '0 */60 * * * *',
	onTick: function() {
		console.log('task runing')
		ifanr.task();
		console.log('task ending')
	},
	start: true
});
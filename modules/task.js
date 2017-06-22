var ifanr = require('./ifanr');
var huxiu = require('./huxiu');
var CronJob = require('cron').CronJob;

new CronJob('0 */30 * * * *', function () {  
    ifanr.tasklist();
    huxiu.tasklist();
}, null, true, 'Asia/Chongqing');


new CronJob('0 */40 * * * *', function () {  
    ifanr.taskdetail();
    huxiu.taskdetail();
}, null, true, 'Asia/Chongqing');


console.log('task listening..');
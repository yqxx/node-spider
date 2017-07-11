var ifanr = require('./ifanr');
var huxiu = require('./huxiu');
var mafengwo = require('./mafengwo');
var CronJob = require('cron').CronJob;

new CronJob('0 */30 * * * *', function () {  
    ifanr.tasklist();
    huxiu.tasklist();
    mafengwo.tasklist();
}, null, true, 'Asia/Chongqing');


new CronJob('0 */40 * * * *', function () {  
    ifanr.taskdetail();
    huxiu.taskdetail();
    mafengwo.taskdetail();
}, null, true, 'Asia/Chongqing');


console.log('task listening..');
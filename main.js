var async = require('async');
var spider = require('./utils/spider');
var CronJob = require('cron').CronJob;
var topicService = require('./service/TopicService');
var TopicDetailService = require('./service/TopicDetailService');

var TopicDetail = require('./model/TopicDetail');
var log = require('./utils/log')

function topic() {
	async.waterfall([
		function(next) {
			var arg = {
				href: 'http://www.mafengwo.cn/gonglve/'
			}
			spider.getHTML(arg, next);
		},
		function(arg, next) {
			var $ = spider.getResult(arg.body + '');
			
			$('div.feed-item').each(function(i, e) {
		        var topic = {
					title: $('.title',e).text().replace(/\s+/g, ' '),
					info: $('.info',e).text().replace(/\s+/g, ' '),
					href: $('a',e).attr("href"),	
					source: 'mafengwo',
					img: $('img',e).first().attr('src'),
					sid: $(e).attr('data-fid'),
					inside:false
				}
				log(topic);

		        topicService.findOrCreate(topic);
		    });
		}
	], function(err, result) {
		console.log(result);
	});
}

function topicDetail() {
	async.waterfall([
		function(next) {
			topicService.findAll('mafengwo', false, function(topics){
				// log(topics)
				topics.forEach(function(topic) {
					console.log(topic);
					var arg = {
						href: topic.href,
						sid: topic.sid,
						source: topic.source
					}
					spider.getHTML(arg, next);
				});
			})
		},
		function(arg, next) {
			var $ = spider.getResult(arg.body + '');
			var wrap = $('._j_content');
			var content = '';
			$('div.f-block',wrap).each(function(i, e) {
				if($(e).find('img').length > 0){
					if($(e).find('img').first().attr('data-src')){
						content += '<img src="' + $(e).find('img').first().attr('data-src') + '"/>';
					}
				} else {
					content += '<p>' + $(e).text().replace(/\s+/g, ' ') + '<p>';
				}
			})
			TopicDetail.create({
				sid: arg.sid,
				content: content,
				source: arg.source
			});
		}
	], function(err, result) {
		console.log(result);
	});
}

var job = new CronJob({
	cronTime: '*/5 * * * * *',
	onTick: function() {
		topic()
	},
	start: false
});

// topic();
topicDetail();


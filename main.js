var async = require('async');
var spider = require('./utils/spider');
var CronJob = require('cron').CronJob;
var topicService = require('./service/TopicService');
var topicDetailService = require('./service/TopicDetailService');
var log = require('./utils/log');

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
	topicService.findAll('mafengwo', false, function(topics){
		topics.forEach(function(topic) {
			async.waterfall([
				function(next) {
					var arg = {
						href: topic.href,
						sid: topic.sid,
						source: topic.source
					}
					spider.getHTML(arg, next);
				},
				function(arg, next) {
					var $ = spider.getResult(arg.body + '');
					var obj = detailMatch($);

					topicDetailService.create({
						sid: arg.sid,
						content: obj.content,
						source: arg.source
					},function(){
						topic.inside = true;
						topic.img = obj.coverImg;
						topicService.update(topic);
					},function(){
						topic.inside = true;
						topic.img = obj.coverImg;
						topicService.update(topic);
					});
				}
			], function(err, result) {
				log(result);
			});
		});
	})
}

var detailMatch = function($) {
	var wrap = $('._j_content');
	var obj = {
		coverImg: '',
		content: ''
	};

	if (wrap.length <= 0) {
		wrap = $('.vc_article');
		$('._j_note_content, .add_pic._j_anchorcnt').each(function(i, e) {
			if ($(e).find('img').length > 0) {
				if ($(e).find('img').first().attr('data-rt-src')) {
					var img = $(e).find('img').first().attr('data-rt-src');
					if(obj.coverImg === '')
						obj.coverImg = img;
					obj.content += img;
				}
			} else {
				obj.content += '<p>' + $(e).text().replace(/\s+/g, ' ') + '<p>';
			}
		})
	} else {
		$('div.f-block', wrap).each(function(i, e) {
			if ($(e).find('img').length > 0) {
				if ($(e).find('img').first().attr('data-src')) {
					var img = $(e).find('img').first().attr('data-src');
					if(obj.coverImg === '')
						obj.coverImg = img;
					obj.content += img
				}
			} else {
				obj.content += '<p>' + $(e).text().replace(/\s+/g, ' ') + '<p>';
			}
		})
	}
	
	return obj;
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


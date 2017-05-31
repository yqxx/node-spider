var async = require('async');
var spider = require('./utils/spider');
var CronJob = require('cron').CronJob;
var topicService = require('./service/topicService');
var topicDetailService = require('./service/topicDetailService');
var log = require('./utils/log');

var rules = {
	'mafengwo':{
		source: 'mafengwo',
		href:'http://www.mafengwo.cn/gonglve/',
		topicMatch: topicMatch
	}
}

function topic(rule) {
	async.waterfall([
		function(next) {
			var arg = {
				href: rule.href
			}
			spider.getHTML(arg, next);
		},
		function(arg, next) {
			var $ = spider.getResult(arg.body + '');
			rule.topicMatch($);
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
						source: topic.source,
						title: topic.title
					}
					spider.getHTML(arg, next);
				},
				function(arg, next) {
					var $ = spider.getResult(arg.body + '');
					var obj = detailMatch($);

					topicDetailService.create({
						sid: arg.sid,
						content: obj.content,
						title: arg.title,
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

function topicMatch($) {
	$('div.feed-item').each(function(i, e) {
		var topic = {
			title: $('.title', e).text().replace(/\s+/g, ' '),
			info: $('.info', e).text().replace(/\s+/g, ' '),
			href: $('a', e).attr("href"),
			source: 'mafengwo',
			img: $('img', e).first().attr('src'),
			sid: $(e).attr('data-fid'),
			inside: false
		}
		log(topic);

		topicService.findOrCreate(topic);
	});
}

var detailMatch = function($) {
	var wrap = $('._j_content');
	var obj = {
		coverImg: '',
		content: '',
		elements: new Array()
	};

	if (wrap.length <= 0) {
		wrap = $('.vc_article');
		$('._j_note_content, .add_pic._j_anchorcnt').each(function(i, e) {
			fetch(obj, $(e), 'data-rt-src');
		})
	} else {
		$('div.f-block', wrap).each(function(i, e) {
			fetch(obj, $(e), 'data-src');
		})
	}
	
	obj.content = JSON.stringify(obj.elements);
	return obj;
}

function fetch(obj, $e, attr) {
	if ($e.find('img').length > 0) {
		var src = $e.find('img').first().attr(attr);
		if (src) {
			src = src.replace(/\s+/g, ' ');
			if(obj.coverImg === '') obj.coverImg = src 
			obj.elements.push({
				type: 'img',
				value: src
			});
		}
	} else {
		obj.elements.push({
			type: 'txt',
			value: $e.text().replace(/\s+/g, ' ')
		});
	}
}

var job = new CronJob({
	cronTime: '*/5 * * * * *',
	onTick: function() {
		topic()
	},
	start: false
});

topic(rules['mafengwo']);
// topicDetail();

// console.log(rules['mafengwo'].href);


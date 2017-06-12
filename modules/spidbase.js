var async = require('async');
var spider = require('../utils/spider');
var topicService = require('../service/topicService');
var topicDetailService = require('../service/topicDetailService');
var log = require('../utils/log');

exports.fetch = function(obj, $e, attr) {
	if ($e.find('img').length > 0) {
		var src = $e.find('img').first().attr(attr);
		if (src) {
			src = src.replace(/\s+/g, ' ');
			if (obj.coverImg === '') obj.coverImg = src
			obj.elements.push({
				type: 'img',
				value: src
			});
		}
	} else if ($e.find('video').length > 0) {

	} else {
		obj.elements.push({
			type: 'txt',
			value: $e.text().replace(/\s+/g, ' ')
		});
	}
}

exports.list = function(rule) {
	async.waterfall([
		function(next) {
			var arg = {
				href: rule.href
			}
			spider.getHTML(arg, next);
		},
		function(arg, next) {
			var $ = spider.getResult(arg.body + '');
			rule.listMatch($, function(topic){
				log(topic);
				topicService.findOrCreate(topic);
			});
		}
	], function(err, result) {
		console.log(result);
	});
}

exports.detail = function(rule) {
	topicService.findAll(rule.source, false, function(topics) {
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
					var obj = rule.detailMatch($);

					topicDetailService.create({
						sid: arg.sid,
						content: obj.content,
						title: arg.title,
						source: arg.source
					}, function() {
						topic.inside = true;
						topic.img = obj.coverImg;
						topicService.update(topic);
					}, function() {
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
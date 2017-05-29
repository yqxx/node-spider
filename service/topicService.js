var Topic = require('../model/Topic');

exports.findAll = function(source, inside, res) {
	Topic.findAll({
		where: {
			source: source,
			inside: inside
		}
	}).then(topics => {
		res(topics)
	})
}

exports.findOne = function(source, sid, res) {
	Topic.findOne({
		where: {
			source: source,
			sid: sid
		}
	}).then(topic => {
		res(topic)
	})
}

exports.findOrCreate = function(topic, res) {
	Topic.findOrCreate({
		where: {
			source: topic.source,
			sid: topic.sid
		},
		defaults: {
			title: topic.title,
			info: topic.info,
			href: topic.href,
			source: topic.source,
			img: topic.img,
			sid: topic.sid,
			inside: topic.inside
		}
	})
}

exports.update = function(topic, res){
	Topic.update({
		inside: topic.inside,
		img: topic.img
	}, {
		where: {
			sid: topic.sid,
			source: topic.source
		}
	}).then(result => {
		res && res(result)
	})
}
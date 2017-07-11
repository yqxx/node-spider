var TopicDetail = require('../model/TopicDetail');

exports.findOne = function(sid, source, res) {
	TopicDetail.findOne({
		where: {
			sid: sid,
			source: source
		}
	}).then(detail => {
		res(detail)
	})
}

exports.findOneById = function(id, res) {
	TopicDetail.findOne({
		where: {
			id: id
		}
	}).then(detail => {
		res(detail)
	})
}

exports.create = function(topicDetail, res, error) {
	TopicDetail.create(topicDetail).then(detail => {
		res(detail);
	}).catch(result => {
		console.log(result)
		error && error(result)
	})
}
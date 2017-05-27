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


var spidbase = require('./spidbase');

function listMatch($, res) {
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
		res(topic);
	});
}

function detailMatch($) {
	var wrap = $('._j_content');
	var obj = {
		coverImg: '',
		content: '',
		elements: new Array()
	};

	if (wrap.length <= 0) {
		wrap = $('.vc_article');
		$('._j_note_content, .add_pic._j_anchorcnt').each(function(i, e) {
			spidbase.fetch(obj, $(e), 'data-rt-src');
		})
	} else {
		$('div.f-block', wrap).each(function(i, e) {
			spidbase.fetch(obj, $(e), 'data-src');
		})
	}

	obj.content = JSON.stringify(obj.elements);
	return obj;
}

var rule = {
	source: 'mafengwo',
	href: 'http://www.mafengwo.cn/gonglve/',
	listMatch: listMatch,
	detailMatch: detailMatch
}

// var job = new CronJob({
// 	cronTime: '*/5 * * * * *',
// 	onTick: function() {
// 		topic()
// 	},
// 	start: false
// });

// spidbase.list(rule);
spidbase.detail(rule);
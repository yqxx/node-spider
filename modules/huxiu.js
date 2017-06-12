var spidbase = require('./spidbase');

function listMatch($, res) {
	$('div.article-hp-info').each(function(i, e) {
		var topic = {
			title: $('h2', e).text().replace(/\s+/g, ' '),
			info: '',
			href: rule.href + $('a', e).attr("href"),
			source: 'huxiu',
			img: '',
			sid: i,	
			inside: false
		}
		if (topic.href) {
			res(topic);
		}
	});
}

function detailMatch($) {
	var obj = {
		coverImg: '',
		content: '',
		elements: new Array()
	};

	$('.article-content-img').each(function(i, e) {
		spidbase.fetch(obj, $(e), 'data-original');
	});

	$('p','.article-content').each(function(i, e) {
		spidbase.fetch(obj, $(e), 'data-original');
	})

	obj.content = JSON.stringify(obj.elements);
	return obj;
}

var rule = {
	source: 'huxiu',
	href: 'https://m.huxiu.com/',
	listMatch: listMatch,
	detailMatch: detailMatch
}

exports.task = function(){
	spidbase.list(rule);
	spidbase.detail(rule);
}


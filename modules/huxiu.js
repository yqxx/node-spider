var spidbase = require('./spidbase');

function listMatch($, res) {
	$('div.mod-art').each(function(i, e) {
		var topic = {
			title: $('h2', e).text().replace(/\s+/g, ' '),
			info: $('.mob-sub', e).text().replace(/\s+/g, ' '),
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

	$('.article-img-box').each(function(i, e) {
		spidbase.fetch(obj, $(e), 'src');
	});

	$('p','.article-content-wrap').each(function(i, e) {
		spidbase.fetch(obj, $(e), 'src');
	})

	obj.content = JSON.stringify(obj.elements);
	return obj;
}

var rule = {
	source: 'huxiu',
	href: 'https://www.huxiu.com/',
	listMatch: listMatch,
	detailMatch: detailMatch
}

exports.task = function(){
	spidbase.list(rule);
	spidbase.detail(rule);
}

// spidbase.list(rule);
spidbase.detail(rule);
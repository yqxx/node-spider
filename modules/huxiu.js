var spidbase = require('./spidbase');

function listMatch($, res) {
	$('div.article-hp-info').each(function(i, e) {
		var topic = {
			title: $('h2', e).text().replace(/\s+/g, ' '),
			info: '',
			href: $('a.rec-article-pic', e).attr("href"),
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
	var wrap = $('.c-article-content');
	var obj = {
		coverImg: '',
		content: '',
		elements: new Array()
	};

	$('p', wrap).each(function(i, e) {
		spidbase.fetch(obj, $(e), 'src');
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

spidbase.list(rule);
// spidbase.detail(rule);

var spidbase = require('./spidbase');

function listMatch($, res) {
	$('div.o-matrix__row__unit').each(function(i, e) {
		var topic = {
			title: $('h3', e).text().replace(/\s+/g, ' '),
			info: '',
			href: $('a.article-link', e).attr("href"),
			source: 'ifanr',
			img: '',
			sid: $('.article-item', e).attr('data-post-id'),
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
	source: 'ifanr',
	href: 'http://www.ifanr.com/author/chenshiwei',
	listMatch: listMatch,
	detailMatch: detailMatch
}

exports.task = function(){
	spidbase.list(rule);
	spidbase.detail(rule);
}

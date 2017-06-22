var spidbase = require('./spidbase');

function listMatch($, res) {
	$('div.article-item').each(function(i, e) {
		var topic = {
			title: $('h3', e).text().replace(/\s+/g, ' '),
			info: '',
			href: $('a.article-link', e).attr("href").replace(/\s+/g, ' '),
			source: 'ifanr',
			img: '',
			sid: $(e).attr('data-post-id'),
			inside: false
		}
		if (topic.href && topic.sid) {
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
	href: 'http://www.ifanr.com/',
	listMatch: listMatch,
	detailMatch: detailMatch
}

exports.tasklist = function(){
	spidbase.list(rule);
}

exports.taskdetail = function(){
	spidbase.detail(rule);
}
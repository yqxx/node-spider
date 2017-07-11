var spidbase = require('./spidbase');

function listMatch($, res) {
	$('div.feed-item[data-type="1"]').each(function(i, e) {
		var topic = {
			title: $('.title', e).text().replace(/\s+/g, ' '),
			info: $('.info', e).text().replace(/\s+/g, ' '),
			href: $('a', e).attr("href"),
			source: 'mafengwo',
			img: '',
			sid: $(e).attr('data-fid'),
			inside: false
		}
		res(topic);
	});
}

function detailMatch($) {
	var wrap = $('.vc_article');
	var obj = {
		coverImg: '',
		content: '',
		elements: new Array()
	};

	$('div ._j_lazyload',wrap).each(function(i, e) {
		spidbase.fetch(obj, $(e), 'data-src');
	})

	$('div, p',wrap).each(function(i, e) {
		spidbase.fetch(obj, $(e), 'data-src');
	})
	obj.content = JSON.stringify(obj.elements);
	return obj;
}

var rule = {
	source: 'mafengwo',
	href: 'http://www.mafengwo.cn/gonglve/',
	listMatch: listMatch,
	detailMatch: detailMatch
}

exports.tasklist = function(){
	spidbase.list(rule);
}

exports.taskdetail = function(){
	spidbase.detail(rule);
}


var topicDetailService = require('./service/topicDetailService');
var topicService = require('./service/topicService');
var log = require('./utils/log');

/*topicService.findAll('mafengwo', false, function(list){
	console.log(list.length);
});*/


var topic = {
	title: 'title',
	info: 'info',
	href: 'href',	
	source: 'mafengwo',
	img: 'img',
	sid: 21712,
	inside:false
}

log(topic);
// topicService.findOrCreate(topic);
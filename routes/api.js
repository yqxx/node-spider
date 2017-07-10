var Topic = require('../model/Topic');
var topicDetailService = require('../service/topicDetailService');
var express = require('express');
var app = express();

app.get('/list', function(req, res) {
	Topic.findAll({
		where:{
            img:{
                '$ne': ''
            },
            source: 'mafengwo'
        },
        'order': "id DESC"
	}).then(topic => {
		res.json(topic);
	})
});

app.get('/page', function(req, res) {
	var where = {};
	where.img = {'$ne': ''}
	where.inside = 1

	if(req.query.source)
		where.source = req.query.source

	Topic.findAndCountAll({
		where,
        'order': "id DESC",
        'limit': parseInt(req.query.limit),
    	'offset': parseInt(req.query.offset)
	}).then(topic => {
		res.json(topic);
	})
});

app.get('/sources', function(req, res) {
	res.json([{
		"code": "mafengwo",
		"name": "蚂蜂窝",
		"icon": "http://images.mafengwo.net/images/app/m/logo_gonglve_v6.png?v=20150825"
	}, {
		"code": "ifanr",
		"name": "爱范儿",
		"icon": "http://ifanr-cdn.b0.upaiyun.com/wp-content/themes/ifanr-4.0/static/images/ifanr/top-nav-down-logo.png"
	}, {
		"code": "huxiu",
		"name": "虎嗅",
		"icon": "https://static.huxiucdn.com/m/image/guide-logo.png?v=201706161525"
	}]);
});


app.get('/detail/:source/:sid', function(req, res) {
	topicDetailService.findOne(req.params.sid, req.params.source, (detail => {
		res.json(detail);
	}));
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
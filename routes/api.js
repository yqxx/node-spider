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
		"name": "蚂蜂窝"
	}, {
		"code": "ifanr",
		"name": "爱范儿"
	}, {
		"code": "huxiu",
		"name": "虎嗅"
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
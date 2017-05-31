var Topic = require('../model/Topic');
var topicDetailService = require('../service/topicDetailService');
var express = require('express');
var app = express();

app.get('/list', function(req, res) {
	Topic.findAll({
		where:{
            img:{
                '$ne': ''
            }
        },
        'order': "id DESC"
	}).then(topic => {
		res.json(topic);
	})
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
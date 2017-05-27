var Topic = require('./model/Topic');
var express = require('express');
var app = express();

app.get('/list', function(req, res) {
	Topic.findAll().then(topic => {
		res.json(topic);
	})
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
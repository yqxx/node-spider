"use strict";

var request = require('request');
var cheerio = require('cheerio');
var gbk = require('gbk');

exports.getHTML = function(arg, next) {
	var options = {
		url: arg.href,
		encoding: null
	}
	request(options, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			arg.body = body;
			next(null, arg)
		}
	})
}

exports.parser = function(body) {
	var result = gbk.toString('utf-8', body)
	return result;
}

exports.getResult = function(html) {
	var $ = cheerio.load(html, {
		decodeEntities: false
	})
	
	return $;
}
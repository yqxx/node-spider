"use strict";

var nodemailer = require('nodemailer');
var config = require('../config');

exports.sendMail = function(content) {

	var smtpTransport = nodemailer.createTransport({
		service: config.mailservice,
		auth: {
			user: config.mailuser,
			pass: config.mailpass
		}
	});
	//邮件选项设置
	var mailOptions = {
			from: config.mailfrom, // 发件人地址
			to: config.mailto, //多个收件人用,分隔
			subject: content['series'], // 主题
			html: "<h1>" + content['number'] + "</h1>"
		}
		
	//发送
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent!");
		}
		smtpTransport.close();
	});
}
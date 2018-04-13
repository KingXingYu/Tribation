var express = require("express"),
	nodeMailer = require('nodemailer'),
	bcrypt = require("bcryptjs");

var router = express.Router();
var config = require("../../../config");
var utils = require("../../../libs/utils");
var emailer = require("../../../libs/emailer");

var userDAO = require("../../../core/dao/user-dao");

router.post("/signup", function(req, res, next) {

	/*
		user: support@tribation.com
		password: $upp2018_4Tribation!
		server: mail.tribation.com
		port: 25 or 587
		username: noreply@tribation.com
		password: no_tribationR3ply!
		username: scoutpayment@tribation.com
		password: !sc_2018tribationpay
	*/

	let mailOptions = {
		from: '"Neo Canada" <noreply@tribation.com>',
		to: 'king_web_1991@outlook.com',
		firstname: "Wang",
		lastname: "XingYu",
		activate_key: 'x8dej24'		
	}

	emailer.sendActivationEmail(mailOptions, function (err, result) {
        if (err) { console.log("Error = ", err); }
        else { console.log("Success = ", result)}
    });	

	/*userDAO.addUser(req.body, function(err, suc) {
		if(suc) {
			return utils.successResponse("Success", res, next);
		} else {
			return utils.failedResponse("error", res, next);
		}
	});*/


});
module.exports = router;
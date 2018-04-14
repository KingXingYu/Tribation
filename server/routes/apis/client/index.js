var express = require("express"),
	nodeMailer = require('nodemailer'),
	async = require('async'),
	bcrypt = require("bcryptjs");

var router = express.Router();
var config = require("../../../config");
var utils = require("../../../libs/utils");
var consts = require("../../../libs/consts");
var func = require("../../../libs/func");
var moment = require("../../../libs/moment");
var emailer = require("../../../libs/emailer");

var userDAO = require("../../../core/dao/user-dao");

router.post("/signup", function(req, res, next) {	
	var info = req.body;
	info.ip_address = func.getClientIp(req);
	info.created = moment.getCurrentDate();
	info.token = func.makeVeritfyToken();

	userDAO.getTemporaryEmail(function(err, emailList) {
		if(checkTemporaryEmail(info.email, emailList)) {
			return utils.failedResponse(consts.MESSAGE.SIGNUP.TEMPORARY_EMAIL, res, next);
		} else {
			userDAO.checkAlreadyEmail(info.email, function(err, suc) {
				if(err) { 
					userDAO.addUser(req.body, function(err, suc) {
						if(suc) {
							let mailOptions = {
								from: consts.EMAIL_HOST.USER2,
								to: info.email,
								firstname: consts.EMAIL_HOST.FIRST_NAME,
								lastname: consts.EMAIL_HOST.LAST_NAME,
								activate_key: info.token
							}
							emailer.sendActivationEmail(mailOptions, function (err, result) {
						        if (err) { 
						        	console.log("Error = ", err); 
						        }
						        else { 
						        	console.log("Success = ", result);
						        }
						    });
						} else {
							return utils.failedResponse("error", res, next);
						}
					});
				}
				else { 
					return utils.failedResponse(consts.MESSAGE.SIGNUP.TEMPORARY_EMAIL, res, next);	
				}
			});
		}
	});
});

router.post("/verify_email", function(req, res, next) {
	var token = req.body.token;
	var user_id = 0;
	userDAO.verifyToken(token, function(err, suc) {
		if(err) {			
			return utils.failedResponse(consts.MESSAGE.SIGNUP.VERIFY.FAIL, res, next);
		} else {
			user_id = suc.id;		
			userDAO.updateEmailStatus(user_id, consts.EMAIL_STATUS.VERIFIED, function(err, suc) {
				if(err) {					
					return utils.failedResponse(consts.MESSAGE.SIGNUP.VERIFY.FAIL, res, next);
				} else {					
					userDAO.updateUserType(user_id, consts.USER_TYPE.VERIFIED, function(err, suc) {
						if(err) {
							return utils.failedResponse(consts.MESSAGE.SIGNUP.VERIFY.FAIL, res, next);
						} else {							
							return utils.successResponse(consts.MESSAGE.SIGNUP.VERIFY.SUCCESS, res, next);
						}
					});
				}
			});
		}
	});
});

function checkTemporaryEmail(email, temporaryEmailList) {
	var parseEmail = email.split('@')[1];
	for (var i = 0; i < temporaryEmailList.length; i++) {
		if(temporaryEmailList[i].email == parseEmail) {
			return true;
		}
	}
	return false;
}

module.exports = router;
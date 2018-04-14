"use strict";

var express = require("express"),
    expSession = require("express-session"),
    router = express.Router(),
    config = require("../config"),
    utils = require("../libs/utils"),
    consts = require("../libs/consts"),
    async = require("async"),
    fs = require("fs");

var mailer = require("nodemailer");
var path           = require('path');
var templatesDir   = path.resolve(__dirname, '../views/client/templates');
var emailTemplates = require('email-templates');


var smtpOptions = {    
	host: consts.EMAIL_HOST.URL,    
    port: consts.EMAIL_HOST.PORT2,
    secure: false,
    auth: {        
        user: consts.EMAIL_HOST.USER2,
        pass: consts.EMAIL_HOST.PASS2
    },
    tls: {
        rejectUnauthorized: false
    },
    ssl: false
}

var transporter = mailer.createTransport(smtpOptions);

function send_mail(mailOptions, content, callbackParams, callback) {
    async.parallel([
        function (callback) {
            if (mailOptions.attachments) {
                fs.readFile(attachments, function(err, data){
                    if (err){
                        console.log(err)
                        callback(err, null);
                    }
                    else {
                        var paths = attachments.split('/');
                        var filename = paths[paths.length - 1];
                        mailOptions.attachments = [{
                            filename: filename,
                            content: data
                        }];
                        callback(null, 'success');
                    }
                });
            }
            else {
                callback(null, 'success');
            }
        }
    ]
    ,function (err, result) {       
    	transporter.sendMail(mailOptions, function(err, response) {
            if(callback) {
                if(err) {
                    transporter.close();
                    callback(err, null);
                } else {
                    transporter.close();
                    callback(null, callbackParams);
                }
            } else {
                if (err) {
                    transporter.close();
                    var fullErr = utils.errorResponse(err);
                    log.error(fullErr);
                } else {
                    transporter.close();
                }
            }
        });
    });

}


function sendActivationEmail(user_data, callback) {
    var mailOptions = {};
        mailOptions.from = user_data.from;
        mailOptions.to = user_data.to;
        mailOptions.subject = "Activation Email";
        mailOptions.text = "Activate your profile";
        mailOptions.html = '<h3>Welcome to our Team-Project-Space!</h3>' +
                           'your name is:' + user_data.firstname + ' ' + user_data.lastname+'<br/><br/>' +
                           '<a href="' + config.get("domain") + "#!/user/activate?activate_key=" + user_data.activate_key + '" style="padding: 15px; background: green; color:white">Click here to activate your account</a>';
    var content = {};

    send_mail(mailOptions, content, 'success', function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
}

function sendActivationSuccesMail(user_data, callback) {
    var mailOptions = {};
    mailOptions.to = user_data.emailaddress;
    var content = {
        title: "Welcome to our Team-Project-Space!",
        description: 'You have successfully activated up to '+config.get("site:title")+'.<br/>' +
                    'your name is:' + user_data.firstname + ' ' + user_data.lastname+'<br/><br/>'
    }
    mailOptions.subject = "Activation Email Success";
    mailOptions.text = "Activate your profile successfully!";
    send_mail(mailOptions, content, 'success', function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
}

function sendForgotPasswordEmail(user, callback) {
    var mailOptions = {};
    mailOptions.to = user.emailaddress;
    var content = {
        title: "Forgot password",
        description: 'Forgot password message has been successfully came to here ' + '<br/><br/>' +
            '<a href="' + config.get("domain") + "/user/resetpassword?activate_key=" + user.activate_key + '" style="color:#256188">Click here to link reset password room</a>',

    }
    mailOptions.subject = "Pivotal forgot password message";
    mailOptions.text = "Pivotal forgot password message has come!";
    send_mail(mailOptions, content, 'success', function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
}

function sendResetPasswordEmail(user_info, callback) {
    var mailOptions = {};
    mailOptions.to = user_info.emailaddress;
    var content = {
        title: "Reset password",
        description: 'Your password has been successfully saved ' + '<br/><br/>' 
                        + 'Your passwrod is ' + user_info.password
    }
    mailOptions.subject = "Pivotal reset password message";
    mailOptions.text = "Pivotal reset password message has come!";
    send_mail(mailOptions, content, 'success', function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
}

function sendChangeStoryStatus(user_emails, story_info, callback) {
    var mailOptions = {};
    mailOptions.to = user_emails;

    var content = {
        title: "Story " + story_info.status,
        description: 'Story ' + story_info.id + ' has been ' + story_info.status + 'ed.<br/><br/>' +
            '<a href="' + config.get("domain") + "/#!/project/" + story_info.project_id + '/story/' + story_info.id + '" style="color:#256188">Click here to view this story</a>',

    }
    mailOptions.subject = "Story " + story_info.status;
    mailOptions.text = "Story " + story_info.status + " message has come!";
    send_mail(mailOptions, content, 'success', function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
}

function sendNewCommentEmail(poster, tms, comment, project_id, callback) {
    var mailOptions = {};
    var content = {};
    var emails = [];
    tms.forEach(function (tm, index){
        if (tm._id != poster._id) {
            emails.push(tm.emailaddress);
        }
    });

    mailOptions.from = poster.emailaddress;
    mailOptions.to = emails;
    content = {
        title: comment.comment,
        description: 'Visit this ' + '<a href="' + config.get("domain") + '/#!/project/' + project_id + '/story/' + comment.story_id + '">Detail</a>' + ' for detail of this comment.'
    };
    mailOptions.subject = "New Comment Posted.";
    mailOptions.text = comment.comment;

    send_mail(mailOptions, content, 'success', function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
}

exports.sendActivationEmail = sendActivationEmail;
exports.sendActivationSuccesMail = sendActivationSuccesMail;
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
exports.sendChangeStoryStatus = sendChangeStoryStatus;
exports.sendResetPasswordEmail = sendResetPasswordEmail;
exports.sendNewCommentEmail = sendNewCommentEmail;

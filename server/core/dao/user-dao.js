"use strict";

var config = require("../../config");
var tbl_user, tbl_temporary_email, tbl_user_emails;
var mysqlClientLib, mysqlClient;

mysqlClientLib = require('../../libs/mysql-client');
mysqlClient = mysqlClientLib.mysqlClient();
tbl_user = 'tbl_user';
tbl_user_emails = "tbl_user_emails";
tbl_temporary_email = 'tbl_temporary_email';
    
var log = require("../../libs/log")(module),
    utils = require("../../libs/utils"),
    async = require("async"),
    bcrypt = require("bcryptjs"),
    consts = require("../../libs/consts");

function registerUser(user, callback) {    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            mysqlClient.query(
                'INSERT INTO ' + tbl_user + ' ' +
                'SET first_name = ?, last_name = ?, email = ?, password = ?, country_code = ?, city = ?, gender = ?, birthday = ?, telephone = ?, ip_address = ?, created = ?, token = ?',
                [user.firstname, user.lastname, user.email, user.password, user.country, user.city, user.gender, user.birthday, user.telephone, user.ip_address, user.created, user.token],
                function(err, info) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, info);
                    }
                }
            );
        });
    });
};

function addUserEmail(userInfo, callback) {    
    mysqlClient.query(
        'INSERT INTO ' + tbl_user_emails + ' ' +
        'SET user_id = ?, email = ?',
        [userInfo.user_id, userInfo.email],
        function(err, info) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, info);
            }
        }
    );
};

function getTemporaryEmail(callback) {
    mysqlClient.query(
        'SELECT * FROM ' + tbl_temporary_email ,
        function selectCb(err, results, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        }
    );
}

function getUserById(userId, callback) {    
    mysqlClient.query(
        'SELECT * FROM ' + tbl_user + ' WHERE _id="'+userId+'"',
        function selectCb(err, results, fields) {
            if (err) {
                callback(err, null);
            } else {
                if (results.length > 0) {
                    callback(null, findUser);
                } else {                    
                    callback(err, null);
                }
            }
        }
    );
}

function getUserByEmail(email, callback) {    
    mysqlClient.query(
        'SELECT * FROM ' + tbl_user + ' WHERE email="'+email+'"',
        function selectCb(err, results, fields) {
            if (err) {
                callback(err, null);
            } else{
                if(results.length > 0){
                    callback(null, results[0]);
                }else{
                    callback("None", err);
                }
            }
        }
    );
}

function checkAlreadyEmail(email, callback) {
    mysqlClient.query(
        'SELECT * FROM ' + tbl_user_emails + ' WHERE email="'+email+'"',
        function selectCb(err, results, fields) {
            if (err) {
                callback(err, null);
            } else{
                if(results.length > 0){
                    callback(null, results[0]);
                }else{
                    callback("None", err);
                }
            }
        }
    );
}

function verifyToken(token, callback) {
    mysqlClient.query(
        'SELECT * FROM ' + tbl_user + ' WHERE token="'+token+'" AND email_status="pending"',
        function selectCb(err, results, fields) {
            if (err) {
                callback(err, null);
            } else{
                if(results.length > 0){
                    callback(null, results[0]);
                }else{
                    callback("None", err);
                }
            }
        }
    );
}

function updateEmailStatus(user_id, status, callback) {    
    mysqlClient.query(
        'UPDATE ' + tbl_user + ' ' +
        'SET email_status = ? WHERE id = ?',
        [status, user_id],
        function(err, info) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, info);
            }
        }
    );
}

function updateUserType(user_id, type, callback) {    
    mysqlClient.query(
        'UPDATE ' + tbl_user + ' ' +
        'SET user_type = ? WHERE id = ?',
        [type, user_id],
        function(err, info) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, info);
            }
        }
    );
}

function authenticate(data, callback) {    
    getUserByEmail(data.email, function (err, findUser) {
        if (err) {
            callback(err, null);
        } else {
            bcrypt.compare(data.password, findUser.password, function(err, res) {
                if (res == true) {
                    callback(null, findUser);
                } else {
                    callback(err, null);
                }
            });
        }
    });
}

function updatePassword(user, password, callback) {    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if (!err) {
                password = hash;
                mysqlClient.query(
                    'UPDATE ' + tbl_user + ' ' +
                    'SET password = ? WHERE username = ?',
                    [password, user],
                    function(err, info) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, info);
                        }
                    }
                );
            }
        });
    });
}

function updateUserByID(user_id, user, callback) {    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            mysqlClient.query(
                'UPDATE ' + tbl_user + ' ' +
                'SET username = ?, password = ?, user_type = ? WHERE _id = ?',
                [user.username, user.password, user.user_type, user_id],
                function(err, info) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, info);
                    }
                }
            );
        });
    });
}

function updateUserByIDWithoutPassword(user_id, user, callback) {    
    mysqlClient.query(
        'UPDATE ' + tbl_user + ' ' +
        'SET username = ?, user_type = ? WHERE _id = ?',
        [user.username, user.user_type, user_id],
        function(err, info) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, info);
            }
        }
    );
}

function deleteUser(user_id, callback) {
    mysqlClient.query(
        'DELETE FROM ' + tbl_user + ' WHERE _id="'+user_id+'"',
        function (err, info) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, 1);
            }
        }
    );
}

exports.getUserByEmail = getUserByEmail;
exports.checkAlreadyEmail = checkAlreadyEmail;
exports.getTemporaryEmail = getTemporaryEmail;
exports.verifyToken = verifyToken;
exports.updateEmailStatus = updateEmailStatus;
exports.updateUserType = updateUserType;
exports.authenticate = authenticate;
exports.updatePassword = updatePassword;
exports.registerUser = registerUser;
exports.addUserEmail = addUserEmail;
exports.updateUserByID = updateUserByID;
exports.deleteUser = deleteUser;
exports.updateUserByIDWithoutPassword = updateUserByIDWithoutPassword;
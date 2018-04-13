"use strict";

var config = require("../../config");
var tbl_user, tbl_temporary_email;
var mysqlClientLib, mysqlClient;

mysqlClientLib = require('../../libs/mysql-client');
mysqlClient = mysqlClientLib.mysqlClient();
tbl_user = 'tbl_user';
tbl_temporary_email = 'tbl_temporary_email';
    
var log = require("../../libs/log")(module),
    utils = require("../../libs/utils"),
    async = require("async"),
    bcrypt = require("bcryptjs"),
    consts = require("../../libs/consts");

function addUser(user, callback) {    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            mysqlClient.query(
                'INSERT INTO ' + tbl_user + ' ' +
                'SET email = ?, password = ?',
                [user.email, user.password],
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
                    var error = new Error(consts.USER_NOT_EXISTS);
                    error.status = 422;
                    callback(error, null);
                }
            }
        }
    );
}

function getUserByName(username, callback) {
    if (username) {
        username = username.toLowerCase();
    }
    mysqlClient.query(
        'SELECT * FROM ' + tbl_user + ' WHERE username="'+username+'"',
        function selectCb(err, results, fields) {
            if (err) {
                callback(err, null);
            } else{
                if(results.length > 0){
                    callback(null, results[0]);
                }else{
                    callback({err: "User is Empty"}, null);
                }
            }
        }
    );
}

function authenticate(data, callback) {    
    getUserByName(data.username, function (err, findUser) {
        if (err) {
            callback(err, null);
        } else {
            if (findUser) {
                bcrypt.compare(data.password, findUser.password, function(err, res) {
                    if (res == true) {
                        callback(null, findUser);
                    } else {
                        callback(err, null);
                    }
                });
            } else {
                callback({err: "no user"}, null);
            }
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

function getAllUsers(callback) {    
    var admin_name = 'admin';
    mysqlClient.query(
        'SELECT * FROM ' + tbl_user + ' WHERE username<>"'+admin_name+'"',
        function selectCb(err, results, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        }
    );
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

function getUserByID(user_id, callback) {    
    mysqlClient.query(
        'SELECT * FROM ' + tbl_user + ' WHERE _id="'+user_id+'"',
        function selectCb(err, results, fields) {
            if (err) {
                callback(err, null);
            } else {
                if (results.length > 0) {
                    callback(null, results[0]);
                } else {
                    callback({err : "No users!"}, null);
                }
            }
        }
    );
}

exports.getUserByEmail = getUserByName;
exports.getTemporaryEmail = getTemporaryEmail;
exports.authenticate = authenticate;
exports.getUserByID = getUserByID;
exports.updatePassword = updatePassword;
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUserByID = updateUserByID;
exports.deleteUser = deleteUser;
exports.updateUserByIDWithoutPassword = updateUserByIDWithoutPassword;
/**
 * Created by Administrator on 8/12/2016.
 */

"use strict";

var mysql = require("mysql");

var database_name   = 'program_exhibition_dev';

function getMySqlClient() {
    var mysqlClient = mysql.createConnection({
        host: '192.168.1.35',
        user: 'root',
        password: ''
    });

    mysqlClient.query('CREATE DATABASE IF NOT EXISTS ' + database_name, function(err) {
        if ( err && err.number != mysql.ERROR_DB_CREATE_EXISTS ) {
            throw err;
        }
    });
    mysqlClient.query('USE ' + database_name);

    return mysqlClient;
}

exports.mysqlClient = getMySqlClient;
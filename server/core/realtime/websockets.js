"use strict";

var utils = require("../../libs/utils"),
    consts = require("../../libs/consts"),
    config = require("../../config"),
    cronJob  = require("cron").CronJob,
    async = require("async"),
    JSON = require("json3");


/**
 * Function defines server events and adds/removes client socket
 * @access public
 * @param {object} io - socket initial object
 * @returns {void}
 */
exports.run = function(io, sessionParameters) {
    io.use(require("express-socket.io-session")(sessionParameters));
    
    var clients = {};
    var clients_socket = {};

    io.sockets.on("connection", function (socket) {
        clients_socket[socket.id] = {
            socket: socket
        };

        if(typeof socket.handshake.session.user != 'undefined' && typeof socket.handshake.session.user.loginuser != 'undefined') {
            clients[socket.handshake.session.user.loginuser._id] = {
                users: socket.handshake.session.user.loginuser,
                socketid: socket.id
            };
        }      

        socket.on("disconnect", function () {
            if(typeof socket.handshake.session.user != 'undefined' && typeof socket.handshake.session.user.loginuser != 'undefined') {
                delete clients[socket.id];
                delete clients_socket[socket.id];
            }
            refreshClientData();
        });
    });

    function refreshClientData(){
        var clients_data = [];
        for(var client in clients ){
            clients_data.push(clients[client].users);
        }
        io.sockets.emit(consts.WEBSOCKET_EVENTS.PE_APP.sendActiveUserList, {message: clients_data, success: true});
    }    

    //start reading data and sending to client by cron job
    var websocketJob = new cronJob({
        cronTime: config.get("websocketsRestartCronTime"),
        onTick: function() {

            //console.log('CRON worker: ' + cluster.worker.id + ' clients: ' + _.size(clients));
        },
        start: false
    });

    websocketJob.start();
};
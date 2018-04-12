"use strict";

var express = require("express"),
    expSession = require("express-session"),
    router = express.Router(),
    config = require("../../../config");

router.get("/", function(req, res, next) {
    res.render("client/mainfeed", {title: "Client Angular"});
});

module.exports = router;
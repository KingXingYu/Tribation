var config = require("../config");

var adminPageRouter = require("./pages/admin");

var clientPageRouter = require("./pages/client"),
	clientAPIRouter = require("./apis/client");



function register(app) {

	app.get("/admin", adminPageRouter);

	app.get("/", clientPageRouter);
	app.use("/" + config.get("api:version") + "/api", clientAPIRouter);	
}

exports.register = register;

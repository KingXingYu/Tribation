var clientPageRouter = require("./pages/client");

function register(app) {

	app.get("/", clientPageRouter);

	app.get('/admin', function(req, res, next) {
		res.render('index', { title: 'Express' });
	});

}

exports.register = register;

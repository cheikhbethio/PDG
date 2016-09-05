var db_user = require('../model/user.js');

module.exports = function (app) {

	/***** Users ******/
	app.post('/api/users', db_user.create);
	app.delete('/api/users/:id', db_user.delete);
	app.get('/api/users', db_user.view);
	app.get('/api/users/:id', db_user.get);
	app.put('/api/users/:id', db_user.edit);

};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}



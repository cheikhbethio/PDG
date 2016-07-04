var db_poeme     = require('../model/poeme.js');

module.exports = function(app) {

	app.post('/api/poeme', db_poeme.create);
	app.delete('/api/poeme/:id', db_poeme.delete);
	app.get('/api/poeme', db_poeme.view);
	app.get('/api/poeme/:id', db_poeme.get);
	app.put('/api/poeme/:id', db_poeme.edit);
	
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}



var db_comment = require('../model/comment.js');

module.exports = function (app) {

	app.post('/api/comment', db_comment.create);
	app.delete('/api/comment/:id', db_comment.delete);
	app.get('/api/comment', db_comment.getAll);
	app.get('/api/comment/:id', db_comment.get);
	app.put('/api/comment/:id', db_comment.edit);

	app.get('/api/forComment/lastComment', db_comment.getLast);
	app.get('/api/forComment/bylabel', db_comment.getByLabel);


};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}



module.exports = function(app, passport) {

	app.post('/api/login', passport.authenticate('local-login'), function(req, res) {
		res.cookie('userid', req.user.local.right, { maxAge: 2592000000 });
		res.send(req.user);
		console.log("#### login succes!!")
	});
	app.get('/api/logout', function(req, res) {
		req.logout();
		res.redirect('/');
		console.log("#### logout succes!!")
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}
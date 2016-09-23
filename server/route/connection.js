var _ = require('underscore');
var db_user = require('../model/user.js');
var mayVar = require('../config/variables.js');

var rightTab = [];

init();

module.exports = function (app, passport) {

	app.get('/api/session', function (req, res) {
		res.send(req.session.id);
	});
	app.get('/api/validation/signUp/:id', db_user.getKeyValidation);

	app.post('/api/login', passport.authenticate('local-login'), function (req, res) {
		var forCookie = {
			id: req.user._id,
			login: req.user.local.login,
			lastname: req.user.local.lastname,
			firstname: req.user.local.firstname,
			right: giveRight(req.user.local.right)
		};
		req.user.local.password = "rien du tout";
		req.session.curentUser = req.user;

		// console.log("+++++++++++++++----+ma variable : ", req.session.curentUser);

		res.cookie('SeugneBethioLaGrace', JSON.stringify(forCookie), {maxAge: mayVar.session.session_duration});
		res.send(forCookie);
	});

	app.get('/api/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
};

function giveRight(right) {
	return 1 + rightTab.indexOf(right);
}
function init() {
	_.each(mayVar.darajas, function (elem) {
		rightTab.push(elem);
	});
}

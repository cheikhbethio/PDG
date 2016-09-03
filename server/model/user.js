// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var _ = require("underscore");
var mayVar =require('../config/variables.js');

var schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	local: {
		email: String,
		password: String,
		firstname: String,
		lastname: String,
		login: String,
		right: String,
		idPic: String,
		phone: String,
		status: String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
var db = mongoose.model('user', userSchema);
module.exports.user = db;

exports.dbAccess = db;

//
exports.create = function (req, res, next) {
	var params = req.body;
	var newUser = new db();
	newUser.local.email = params.email;
	newUser.local.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
	newUser.local.firstname = params.firstname;
	newUser.local.lastname = params.lastname;
	newUser.local.login = params.login;
	newUser.local.right = mayVar.darajas.SIMPLE;
	newUser.local.idPic = "";
	newUser.local.phone = "";
	newUser.local.status = "";

	db.findOne({'local.email': params.email}, function (err, user) {
		if (err)
			next(err);
		else {
			if (user) {
				console.log("*******************: ", user);
				res.send({message: "email is already used!", code: 1});
				return next();
			}

			db.findOne({'local.login': params.login}, function (errLogin, userLogin) {
				if (errLogin) {
					next(errLogin);
				} else {
					if (userLogin) {
						console.log("login is already used!");
						res.send({message: "login is already used!", code: 2});
						return next();
					}
					newUser.save(function (err, results) {
						if (err) {
							res.send({message: err});
						} else {
							console.log("#### signup succes!!");
							res.send({message: "signup succes", code: 0, result: results});
						}
					});
				}
			});
		}
	});
};

exports.view = function (req, res, next) {
	db.find().exec(function (err, results) {
		if (!err) {
			return res.send(results);
		} else {
			console.log(err);
			next(err);
		}
	});
};

exports.get = function (req, res, next) {
	var id = req.params.id;
	db.findById(id, function (err, user) {
		if (!err)
			return res.json(user);
		else {
			console.log(err);
			next(err);
		}
	});
};


exports.delete = function (req, res, next) {
	var id = req.params.id;
	db.findById(id, function (err, doc) {
		if (err || !doc) {
			res.send({message: "Suppression impossible : utilissateur introuvable ou probleme server", code: 1});
		} else {
			var res_deletion = doc.remove();
			return res.json(res_deletion);
		}
	});

};

exports.edit = function (req, res, next) {

	var id = req.body._id;
	var params = req.body.local;

	var email = params.email;
	var password = params.password;
	var firstname = params.firstname;
	var lastname = params.lastname;
	var newer = {local: {}, facebook: {}, google: {}};
	var query = ({_id: id});


	db.findById(id, function (err, user) {
		// return next(user);
		if (err || !user){
			console.log('le document est introuvable!!!');
			res.send({message: "le document est introuvable!!!", code: 2});
		} else {
			var obj = {
				facebook : user.facebook,
				google : user.google					
			};

			obj.local = {
				'email' : user.local.email,
				'password' : user.local.password,
				'firstname' : params.firstname,
				'lastname' : params.lastname,
				'login' : user.local.login,
				'right' : params.right,
				'idPic' : params.idPic,
				'phone' : params.phone,
				'status' : params.status
			};


			fillParam(user.local, obj.local);
			user.save(function (updateErr, updateResp) {
				if (updateErr || !updateResp) {
					console.log("erreur when update db");
					res.send({message: "La Mise à jour impossible de ce poeme a échoué :(Probleme serveur).", code: 1});
				} else {
					res.send({message: "Le poeme a bien mis à jour.", code: 0, result: updateResp});
				}
			});
		};
	})
};


function fillParam(objTo, objFrom) {
	_.each(objFrom, function (value, key) {
		if (value || key === 'isPublic' || key === 'denounced') {
			objTo[key] = value;
		} 
	});
}

// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var _ = require("underscore");
var myVar = require('../config/variables.js');
var theMailer = require('../config/jobsMailer.js');

//var schema = mongoose.Schema;

var userProperties = ["email", "password", "firstname", "lastname", "login", "right", "idPic", "phone", "status", "hashkey", "created_at"];

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
		status: Object,
		hashkey: String,
		created_at: Date
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
	newUser.local.firstname = params.firstname;
	newUser.local.lastname = params.lastname;
	newUser.local.login = params.login;

	newUser.local.password = bcrypt.hashSync(params.password, bcrypt.genSaltSync(8), null);
	newUser.local.right = myVar.darajas.SIMPLE;
	newUser.local.date = Date.now();
	newUser.local.status = myVar.status.watingClicEmail;
	newUser.local.idPic = "";
	newUser.local.phone = "";

	db.findOne({'local.email': params.email}, function (err, user) {
		if (err)
			next(err);
		else {
			if (user) {
				// console.log("*******************: ", user);
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
					var hashed = bcrypt.hashSync(newUser.local.email + newUser.local.firstname + newUser.local.lastname, bcrypt.genSaltSync(8), null) + "end";
					newUser.local.hashkey = hashed;
					newUser.local.created_at = new Date();
					newUser.save(function (err, results) {
						if (err) {
							res.send({message: err});
						} else {
							console.log("#### signup succes!!");
							var textSent = myVar.forMail.signUp.text + myVar.myUrl.princiaplURL + myVar.myUrl.emailValidation + hashed;
							theMailer.emailSender(params.email, myVar.forMail.signUp.subject, textSent)
									.then(function () {
										res.send({message: myVar.forMail.signUp.popupMsg, code: 0, result: results});
									});
//									.catch(function (error) {
//										console.log(error);
//									});

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
		if (err || !user) {
			res.send({message: "Le poeme est introuvables.", code: 1});
		} else {
			delete(user.local.password);
			console.log(user.local.password)
			res.send(user);
		}
	});
};

exports.getKeyValidation = function (req, res) {
	db.findOne({'local.hashkey': req.params.id}, function (err, user) {
		if (err || !user) {
			console.log(err);
			res.send({message: "Désolé mais ce compte est invalide. Veillez vous réinscrire et faire la valivation dans les plus bref délais.", code: 1});
		} else {
			toEdit(user._id, {status: myVar.status.watingValidation});
			theMailer.emailSender(myVar.forMail.admin, myVar.forMail.signUpValidation.subject, myVar.forMail.signUpValidation.text);
			res.send({message: "Votre inscription a bien été pris en compte et sera validée par nos équipes dans les plus brefs délais. Merci et à très bientôt", code: 0});
		}
	});
};



exports.delete = function (req, res, next) {
	var id = req.params.id;
	db.findById(id, function (err, doc) {
		if (err || !doc) {
			res.send({message: "Suppression impossible : utilissateur introuvable ou probleme server", code: 1});
		} else {
			res.send({message: "Le doc a bien été suprimé", code: 0, result: doc.remove()});
		}
	});

};

function toEdit(id, params) {
	return new Promise(function (resolve, reject) {
		db.findById(id, function (err, user) {
			if (err || !user) {
				console.log('le document est introuvable!!!');
				return reject({message: "le document est introuvable!!!", code: 2});
			} else {
				fillParam(user.local, params);
				user.save(function (updateErr, updateResp) {
					if (updateErr) {
						console.log(updateErr);
						return reject({message: "La Mise à jour impossible de ce doc a échoué :(Probleme serveur).", code: 1});
					} else if (!updateResp) {
						return reject({message: "La Mise à jour impossible de ce doc a échoué :Introuvable.", code: 2});
					} else {
						return resolve({message: "Le doc a bien mis à jour.", code: 0, result: updateResp});
					}
				});
			}
		});
	});
}

exports.edit = function (req, res, next) {

	var id = req.body._id;
	var params = req.body.local;

	toEdit(id, params)
			.then(function (response) {
				res.send(response)
			})
			.catch(function (error) {
				res.send(error)
			});

//	db.findById(id, function (err, user) {
//		console.log(req.body.local, id);
//		// return next(user);
//		if (err || !user) {
//			console.log('le document est introuvable!!!');
//			res.send({message: "le document est introuvable!!!", code: 2});
//		} else {
//
//			fillParam(user.local, params);
//			console.log(user.local);
//			user.save(function (updateErr, updateResp) {
//				if (updateErr) {
//					console.log(updateErr);
//					res.send({message: "La Mise à jour impossible de ce poeme a échoué :(Probleme serveur).", code: 1});
//				} else if (!updateResp) {
//					res.send({message: "La Mise à jour impossible de ce poeme a échoué :(Probleme serveur).", code: 2});
//				} else {
//					res.send({message: "Le poeme a bien mis à jour.", code: 0, result: updateResp});
//				}
//			});
//		}
//	});
};


function fillParam1(objTo, objFrom) {
	_.each(objFrom, function (value, key) {
		if (value || key === 'isPublic' || key === 'denounced') {
			objTo[key] = value;
		}
	});
}

function fillParam(objTo, objFrom) {
	_.each(objFrom, function (value, key) {
		if (userProperties.indexOf(key) >= 0) {
			objTo[key] = value;
		}
	});
}


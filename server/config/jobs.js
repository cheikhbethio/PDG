'use strict';

var mayVar =require('./variables.js');

//check req logging 
var isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()){
		console.log("########### : isAuthenticated");
		return next();
	}
	console.log("########### : not not not isAuthenticated");   
	return disconnect(req, res);
}

//check if a writter
var isWritter = function(req, res, next){
		console.log("########### right : ", req.session.curentUser);
		console.log("########### mayVar.darajas :", mayVar.darajas);
	var curUser = req.session.curentUser.local
	if(req.isAuthenticated() && 
		(curUser.right === mayVar.darajas.MIDDLE ||
			curUser.right === mayVar.darajas.HIGHT)){
		return next();
	}
	console.log("########### : isWritter ------");
	return disconnect(req, res);
}

//check if a chef
var isGod = function(req, res, next){
	if(req.isAuthenticated() && 
		req.session.curentUser.right === mayVar.darajas.HIGHT){
		console.log("########### : isGod");
		return next();
	}
	return disconnect(req, res);
}

function disconnect(req, res){
    req.logout();
    req.session.destroy();
	return res.send([]);	
}

//exports
exports.isLoggedIn = isLoggedIn;
exports.isWritter = isWritter;
exports.isGod = isGod;
"use strict";

var routes = {
		API :  "/api",
		APIWRT : "/api/writter",
		APIMAN : "/api/manange"
};

var darajas = {
	SIMPLE : "salsa",
	MIDDLE : "salsaBat",
	HIGHT: "salsaBatKiz"
}

var session = {
	session_duration : 10000000000
}

exports.session = session;
exports.darajas = darajas;
exports.routes = routes;
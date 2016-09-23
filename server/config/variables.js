"use strict";


var status = {
	watingClicEmail: 1442,
	watingValidation: 191,
	active: 451,
	removed: 660
};
exports.status = status;

var myUrl = {
	princiaplURL: "http://localhost:8000/#/",
	emailValidation: "registration?validation="
};
exports.myUrl = myUrl;

var routes = {
	API: "/api",
	APIWRT: "/api/writter",
	APIMAN: "/api/manange"
};

var darajas = {
	SIMPLE: "salsa",
	MIDDLE: "salsaBat",
	HIGHT: "salsaBatKiz"
}

var session = {
	session_duration: 10000000000
}

var forMail = {
	admin: "lespublicationdegrace@gmail.com",
	signUp: {
		subject: "PDG - Votre inscription sur les publications de Grâce",
		text: "Pour valider votre inscription veillez cliquez sur ce lien : ",
		popupMsg: "un email de vailidation vient de vous être envoyé. Veillez consulter votre messagerie pour activer votre compte"
	},
	signUpValidation: {
		subject: "PDG - Nouvelle inscription à Valider dans 48h",
		text: "Un nouveau compte vient d'être créé et est en attende de validation. T'as 48h sinon c'est la merde. bilahi",
	},
	poemeCreation: {
		subject: "PDG - Confirmation de rédaction",
		text: "Votre derniere rédaction a bien été prise en compte et est attente de validation par nos équipes",
	},
	poemeValidation: {
		subject: "PDG - Validation nouveau Poême",
		text: "Un nouveau poême vient d'être créé et est en attende de validation",
		to: "mmoussasow@gmail.com"
	}
}
var myMsg = {
	error: {
		mailSendind: "Erreur lors de l'envoye du mail"
	},
	success: {
		mailSendind: "Mail envoyé avec succès!"
	}
}

exports.session = session;
exports.darajas = darajas;
exports.routes = routes;
exports.myMesg = myMsg;
exports.forMail = forMail;
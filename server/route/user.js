var db_user = require('../model/user.js');
var job = require('../config/jobs.js');
var mayVar = require('../config/variables.js');
var serviceRoute = "/users";
var apiRoute = mayVar.routes.API + serviceRoute;

module.exports = function (app) {
	app.post(apiRoute, job.isGod, db_user.create);
	app.delete(apiRoute + '/:id', job.isGod, db_user.delete);
	app.get(apiRoute, job.isGod, db_user.view);
	app.get(apiRoute + '/:id', job.isGod, db_user.get);
	app.put(apiRoute + '/:id', job.isGod, db_user.edit);
	app.put('/api/profile/:id', db_user.editProfile);
};;

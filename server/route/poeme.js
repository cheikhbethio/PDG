var db_poeme = require('../model/poeme.js');
var job =require('../config/jobs.js');
var mayVar =require('../config/variables.js');
var col = "/poeme";

module.exports = function (app) {
	// app.all('/api/poeme/*', job.isLoggedIn)

	app.post(mayVar.routes.API + col, job.isWritter ,db_poeme.create);
	app.delete(mayVar.routes.API + col + '/:id',job.isWritter, db_poeme.delete);
	app.get(mayVar.routes.API + col, job.isWritter, db_poeme.view);
	app.get(mayVar.routes.API + col +'/:id', db_poeme.get);
	app.put(mayVar.routes.API + col + '/:id', job.isWritter, db_poeme.edit);

	app.get('/api/last/lastPoeme', db_poeme.getLastPoemes);
	app.get('/api/forpoem/bylabel', db_poeme.getByLabel);


};






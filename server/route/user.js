var db_user = require('../model/user.js');

module.exports = function (app) {

	app.post('/api/users', db_user.create);
	app.delete('/api/users/:id', db_user.delete);
	app.get('/api/users', db_user.view);
	app.get('/api/users/:id', db_user.get);
	app.put('/api/users/:id', db_user.edit);

};


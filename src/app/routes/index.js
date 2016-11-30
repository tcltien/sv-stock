<<<<<<< HEAD
=======

>>>>>>> 6d359e88655b2495cc95781c23f578109d4a1b6a
'use strict';

module.exports = function(app) {
	// Root routing

	var index = require('../controllers/index');
	var user = require('../controllers/users');
	var config = require('../../config/config');
	
	app.get('/', user.requiresLogin, index.index);
	app.get(config.app.webroot, user.requiresLogin, index.index);
	app.get(config.app.webroot + '/index', user.requiresLogin, index.index);
	app.get(config.app.webroot + '/create', user.requiresLogin, index.create);
};
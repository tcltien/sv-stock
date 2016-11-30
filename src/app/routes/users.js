/*
 * routes/user.js - Server routing configuration for user page.
 *
 * Copyright (c) 2016 DIRECTV, Inc.
 * An Unpublished Work.  All Rights Reserved.
 *
 * DIRECTV PROPRIETARY:  The information contained in or disclosed by this
 * document is considered proprietary by DIRECTV, Inc.  This document and/or the
 * information contained therein shall not be duplicated nor disclosed in whole
 * or in part without the specific written permission of DIRECTV, Inc.
 */
'use strict';

module.exports = function(app) {
	// User Routes
	var index = require('../controllers/index');
	var users = require('../controllers/users');
	var config = require('../../config/config');
	// Setting up the users api
	app.get(config.app.webroot + '/login', users.login);
	app.post(config.app.webroot + '/login', users.processLogin, index.index);
	app.get(config.app.webroot + '/logout', users.requiresLogin, users.logout);

};

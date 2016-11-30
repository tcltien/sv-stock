/*
 * routes/index.js - Server routing configuration for index page.
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
	// Root routing

	var index = require('../controllers/index');
	var user = require('../controllers/users');
	var config = require('../../config/config');
	
	app.get('/', user.requiresLogin, index.index);
	// Page
	app.get(config.app.webroot, user.requiresLogin, index.index);
	app.get(config.app.webroot + '/index', user.requiresLogin, index.index);
	
	// Function
	app.post(config.app.webroot + '/getSportData', user.requiresLogin, index.getData);
	app.post(config.app.webroot + '/saveData', user.requiresLogin, index.saveData);
	
	// Service URIs
	app.post(config.app.webroot + '/listIds', user.requiresLogin, index.listIds);
};
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

	var scheduler = require('../controllers/scheduler');
	var user = require('../controllers/users');
	var config = require('../../config/config');	
	
	app.get(config.app.webroot + '/scheduler', user.requiresLogin, scheduler.scheduler);


};
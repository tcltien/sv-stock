/*
 * config.js - The configuration loader that loads the right configuration from the env folder.
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

var _ = require('lodash');
var optional = require('optional');
var systemdefaults = _.merge(require(__dirname + '/../config/env/all.js'), require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {});
var localdefaults = _.merge(optional(__dirname + '/../local/local.js'), optional(__dirname + '/../local/' + process.env.NODE_ENV + '.js'));

// Load app configuration
module.exports = _.merge(systemdefaults, localdefaults);
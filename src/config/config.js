'use strict';

var _ = require('lodash');
var optional = require('optional');
var systemdefaults = _.merge(require(__dirname + '/../config/env/all.js'), require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {});
var localdefaults = _.merge(optional(__dirname + '/../local/local.js'), optional(__dirname + '/../local/' + process.env.NODE_ENV + '.js'));

// Load app configuration
module.exports = _.merge(systemdefaults, localdefaults);
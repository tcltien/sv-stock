'use strict';

/**
 * First we set the node enviornment variable if not set before
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Module dependencies.
 */
var config = require('./config/config');
var path = require('path');
var winston = require('winston-config').fromFileSync(path.join(__dirname, './winston-config.json'));
  
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
// Init the express application
var app = require('./config/express')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
module.exports.app = app;

// Logging
var logger = winston.loggers.get('application');
logger.info('------------------------------------------------------------');
logger.info('Config Tool started on port ' + config.port);
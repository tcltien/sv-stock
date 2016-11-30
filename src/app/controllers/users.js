<<<<<<< HEAD
=======


>>>>>>> 6d359e88655b2495cc95781c23f578109d4a1b6a
'use strict';

var config = require('../../config/config');
var logger = require('winston').loggers.get('application');
var uuid = require('uuid');

/**
 * Check the authenticated session from MCS database.
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 * @param  {String} next Page to load if authenticated
 */
exports.requiresLogin = function(req, res, next) {
    //logger.debug(req.session.session_id);
	console.log(req.session);
    if ((!req.session || !req.session.session_id) && config.checkSession) {
        // login
        res.redirect(config.app.webroot + '/login');
    } else {
        next();
    }
};

/**
 * Login page
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 */
exports.login = function(req, res) {
	if ((!req.session || !req.session.session_id) && config.checkSession) {
		logger.info('Login page start..........');
		res.render('login.html');
	}else {
		logger.info('Logged in');
		res.redirect(config.app.webroot + '/index');
	}
};

exports.processLogin = function(req, res, next) {
	
	if (config.user.username == req.body.username && config.user.passwd == req.body.passwd ) {
		req.session.cookie.originalMaxAge = config.sessionTimeOut * 1000;
		req.session.session_id = uuid.v4();
		next();
	}else {
		res.redirect(config.app.webroot + '/login#error');
	}
};

/**
 * Logout.
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 */
exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
};

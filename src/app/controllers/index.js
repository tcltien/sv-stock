/*
 * index.js - Controller for index page.
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

/**
 * Module dependencies.
 */

var config = require('../../config/config');
var logger =  require('winston').loggers.get('application');
var N1qlQuery = require('couchbase').N1qlQuery;
var fs = require('fs');
var path = require('path');
var basepath = path.dirname(process.mainModule.filename);
var sportdata = require('../../manifest/sports.json');
var test = require('../../manifest/test.txt');
/**
 * Index page
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 */
exports.index = function(req, res) {
    logger.info('Index page start..........');
	logger.debug('Render index.html');
	fs.readFile(basepath + '/manifest/test.txt', 'utf8', function (err,data) {
	  	if (err) {
	    	return console.log(err);
	  	}	 
	  	res.render('index.html', {
			sports : Buffer.from(JSON.stringify(sportdata)).toString('base64'),
			data : Buffer.from(data).toString('base64')
		});
		 
	});
 
	
};

exports.listIds = function(req, res) {
	var params = [
		req.body.sport.toLowerCase(),
		req.body.structure, 
		
		"listIds", // function to call
		[]
	];
	callService(res, params) ;
}

exports.getData = function(req, res) {
	var params = [
		req.body.sport.toLowerCase(),
		req.body.structure, 
		
		"findById", // function to call
		[req.body.docId],
		function(doc, service){
			var result = {};
			result.manifest = service.getManifest(req.body.sport.toLowerCase(), req.body.structure);
			result.doc = doc;
			res.json(result);
		}
	];
	callService(res, params) ;
}

exports.saveData = function (req, res) {
	var data = JSON.parse(Buffer.from(req.body.data, 'base64'));
	var params = [
		req.body.sport.toLowerCase(),
		req.body.structure, 
		
		"save", // function to call
		[ req.body.docId , data], // params of function
		function(err, response){ 
			var result = {};
			if (err) {
				result.success = false;
			}else {
				result.success = true;
			}
			result.response = response;
			res.json(result);
		}
	];
	callService(res, params) ;
}

var callService = function(res, params) {
	var sport = params[0];
	var structure = params[1];
	sport = sport.charAt(0).toUpperCase() + sport.slice(1);
	structure = structure.charAt(0).toUpperCase() + structure.slice(1);
	var service = "app/services/" + params[0] + "/" + sport + structure + "Service.js";	
	params = params.slice(2);
	executeService(service, res, params);	

	
}

var executeService = function(service, res, params) {
	fs.exists(service, function(exist){
		if (exist) {
			var service = new (require(basepath + '/' + this.service));
			var func = params[0];
			var callback = params[2];
			if(callback == undefined) {
				callback = function(result) {
					res.json(result);
				}
			}
			params[1].push(callback);
			params = params.slice(1,2);
			service[func].apply(service,params[0]); 
		}else {
			res.json([]);
		}
	}.bind({service : service}));
}

/*
 * BaseService.js - Base Service Operations.
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
var logger = require('winston').loggers.get('application'),
N1qlQuery = require('couchbase').N1qlQuery;

class BaseService {
	// defined constants	
	constructor() {
	}

	
	/**
	 * Find records from couchbase by query string
	 * @param q 	conditions where clause
	 * @param callback 	function callback 
	 */
	findByQueryString(q, callback) {
		logger.debug('Find by Query String');
		var query = N1qlQuery.fromString(q);
		logger.debug (query);
		bucket.query(query, [], function(err, rows, meta) {	
			if (err) console.log(err);
			// call callback
			if (typeof callback === "function") {					
				callback(rows, meta);
			}
		});
	}
	
	/**
	 * Find by document id.
	 * @param id	document id
	 * @param callback	function callback
	 */
	findById(id, callback) {
		var that = this;
		bucket.get(id, function (err, result) {
			if (err) {
				console.log(err)
			};
			callback(result, that);
		})
	}
	
	/**
	 * Save document into Couchbase server.
	 * @param key	document id
	 * @param obj	document to save
	 * @param callback	function callback
	 */
	save(key, obj, callback) {
		logger.debug ('Save the document contents');
		bucket.replace(key, obj, callback);
	}
	
	/**
	 * Load manifest file for each sport & data structure.
	 * @param sport		Sport
	 * @param structure	Data structure
	 */
	getManifest(sport, structure) {
		return require('../../manifest/' + sport + '/' + structure + '.json');
	}
}


module.exports = BaseService;
/*
 * MlbStandingService.js - Persistent services for Standing.
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

var config = require('../../../config/config');
var logger = require('winston').loggers.get('application');
var fs = require('fs');
var N1qlQuery = require('couchbase').N1qlQuery;
var charset = config.charset;
var BaseService = require('../BaseService');

class NbaStandingService extends BaseService {
	constructor(){
		super();
	}

	/**
	 * Get all ids of MLB Boxscore documents.
	 * @param callback 	function callback 
	 */
	listIds(callback) {		
		this.findByQueryString('SELECT META(s).id, s.docId, s.season FROM sportsdata s WHERE s.docType="standing" AND s.docId="NBA" ORDER BY s.docId;', function(result) {
			callback(result)
		});
	}
}

module.exports = NbaStandingService;

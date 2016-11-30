

'use strict';

/**
 * Module dependencies.
 */

var config = require('../../config/config');
var logger = require('winston').loggers.get('application');

var couchbase = require('couchbase');
var N1qlQuery = couchbase.N1qlQuery;

exports.initDB = function() {
	return new couchbase.Cluster('couchbase://' + config.couchbase.server);
}
exports.initN1QL = function() {
	return N1qlQuery;
}
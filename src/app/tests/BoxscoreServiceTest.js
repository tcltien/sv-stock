/*
 * ServiceTest.js - Test for Services.
 *
 * Copyright (c) 2016 DIRECTV, Inc.
 * An Unpublished Work.  All Rights Reserved.
 *
 * DIRECTV PROPRIETARY:  The information contained in or disclosed by this
 * document is considered proprietary by DIRECTV, Inc.  This document and/or the
 * information contained therein shall not be duplicated nor disclosed in whole
 * or in part without the specific written permission of DIRECTV, Inc.
 */
var config = require('../../config/config');
var BoxscoreService = new (require('../services/mlb/BoxscoreService'));
var should = require('should');
var express = require('express')
var assert = require('assert');
var request = require('supertest');
var res = express.response;

describe('Test BoxscoreService' , function (){
	it('Get manifest file', function(done, err){
		var manifest = BoxscoreService.getManifest();
		manifest.should.be.an.Object;
		manifest.should.have.key("header");
		manifest.should.have.value("header", "MLB Boxscore");
		done();
	});
	
	it('Get a boxscore document by id' ,function(done, err){
		BoxscoreService.findById("boxscore_STATS_1598476_2016", function(result) {
			result.should.be.an.Object;
			result.should.have.propertyByPath("value", "baseball-mlb-boxscore-visiting-team-batting-lineup");
			done();
        });
	});

    it('Get all IDs of boxscore document' ,function(done, err){
        BoxscoreService.listBoxScoresIds(function(result) {
			result.should.be.an.Array;
			result.should.have.length(5);
			done();
        }); 
		
    });
    
});





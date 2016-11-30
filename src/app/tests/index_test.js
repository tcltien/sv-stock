<<<<<<< HEAD
=======

>>>>>>> 6d359e88655b2495cc95781c23f578109d4a1b6a
var fs = require('fs-extra');
var index = require('../controllers/index');
var config = require('../../config/config');

var should = require('should');
var express = require('express')
var assert = require('assert');
var request = require('supertest');
var res = express.response;

describe('Function' , function (){
    it('should have a function index' ,function(){
        f = index.index;
        f.should.not.equal(null,' didn\'t find a index function' );
    });
    
});





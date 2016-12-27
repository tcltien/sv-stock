'use strict';
var logger = require('winston').loggers.get('application');

function Stock() {
	this.CODE = "";
	this.TC = "";
	this.CE = "";
	this.FL = "";
	this.KLG = "";
	this.KLKL = "";
	this.MG1 = "";
	this.MKL1 = "";
	this.MG2 = "";
	this.MKL2 = "";
	this.MG3 = "";
	this.MKL3 = "";
	this.BG1 = "";
	this.BKL1 = "";
	this.BG2 = "";
	this.BKL2 = "";
	this.BG3 = "";
	this.BKL3 = "";
	this.GT = "";
	this.TKL = "";
}

module.exports = Stock;
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
var Client = require('node-rest-client').Client;
var Stock = require('../models/Stock');
var restClient = new Client();
/**
 * Index page
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 */
exports.index = function(req, res) {
    logger.info('Index page start..........');
	logger.debug('Render index.html');
	// direct way 

	//setInterval(function() {
	   	var res1 = restClient.get("https://priceservice.vndirect.com.vn/priceservice/secinfo/snapshot/q=codes:BVH,CII,CSM,CTG,DPM,EIB,FLC,FPT,GMD,HAG,HCM,HHS,HPG,HSG,HVG,ITA,KBC,KDC,MBB,MSN,PPC,PVD,PVT,REE,SSI,STB,VCB,VIC,VND,VNM,VSH", function (data, response) {
	    // parsed response body as js object 

	   	res.render('index.html', {
			sports : Buffer.from(JSON.stringify(sportdata)).toString('base64'),
			data : Buffer.from(JSON.stringify(parseStockDataWithCode(data))).toString('base64')
		});		 
	    // raw response 
	    //console.log(response);
		});
  	//}, 1000);

	// fs.readFile(basepath + '/manifest/test.txt', 'utf8', function (err,data) {
	//   	if (err) {
	//     	return console.log(err);
	//   	}	 
	//   	res.render('index.html', {
	// 		sports : Buffer.from(JSON.stringify(sportdata)).toString('base64'),
	// 		data : Buffer.from(JSON.stringify(data)).toString('base64')
	// 	});		 
	// });

 
	
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


var parseStockDataWithCode = function (data) {	
	logger.info("Begin Parser");
	var stockArray = new Array();
	for (var j in data) {
		var tmpData = data[j].split("|");
		stockArray.push(parseEachStock(tmpData));
	}
	console.log(stockArray);
	return stockArray;
}

function parseEachStock(data) {
	var stock = new Stock();
	var stockArray = new Array();
	for (var i in data) {	
		switch(i) {
			case "3":
				console.log("MaCK")
				stock.CODE = data[3];
				stockArray.push(data[3]);
			case "9":
				console.log("TC");		
				stock.TC = data[9];		
				stockArray.push(data[9]);
				break;
			case "16":
				stock.CE = data[16];
				stockArray.push(data[16]);
				console.log("CE");				
				break;
			case "17":
				stock.FL = data[17];
				stockArray.push(data[17]);
				console.log("FL");				
				break;
			case "20":
				stock.KLG = data[20];
				stockArray.push(data[20]);
				console.log("Khop Lenh Gia");
				break;
			case "21":
				stock.KLKL = data[21];
				stockArray.push(data[21]);
				break;
			case "24":
				stock.MG1 = data[24];
				stockArray.push(data[24]);
				break;
			case "25":
				stock.MKL1 = data[25];
				stockArray.push(data[25]);
				break;
			case "26":
				stock.MG2 = data[26];
				stockArray.push(data[26]);
				break;
			case "27":
				stock.MKL2 = data[27];
				stockArray.push(data[27]);
				break;
			case "28":
				stock.MG3 = data[28];
				stockArray.push(data[28]);
				break;
			case "29":
				stock.MKL3 = data[29];
				stockArray.push(data[29]);
				break;
			case "30":
				stock.BG1 = data[30];
				stockArray.push(data[30]);
				break;
			case "31":
				stock.BKL1 = data[31];
				stockArray.push(data[31]);
				break;
			case "32":
				stock.BG2 = data[32];
				stockArray.push(data[32]);
				break;
			case "33":
				stock.BKL2 = data[33];
				stockArray.push(data[33]);
				break;
			case "34":
				stock.BG3 = data[34];
				stockArray.push(data[34]);
				break;
			case "35":
				stock.BKL3 = data[35];
				stockArray.push(data[35]);
				break;
			case "36":
				stock.GT = data[36];
				stockArray.push(data[36]);
				break;
			case "37":
				stock.TKL = data[37];
				stockArray.push(data[37]);
				break;
			default:
				break;
		}
	}
	return stockArray;
}
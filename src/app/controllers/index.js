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
<<<<<<< HEAD
	logger.debug('Render index.html');
	fs.readFile(basepath + '/manifest/test.txt', 'utf8', function (err,data) {
=======
	logger.debug('Render index.html');	
	// direct way 

	//setInterval(function() {
	   	var res1 = restClient.get("https://priceservice.vndirect.com.vn/priceservice/secinfo/snapshot/q=codes:BVH,CII,CSM,CTG,DPM,EIB,FLC,FPT,GMD,HAG,HCM,HHS,HPG,HSG,HVG,ITA,KBC,KDC,MBB,MSN,PPC,PVD,PVT,REE,SSI,STB,VCB,VIC,VND,VNM,VSH", function (data, response) {
	    // parsed response body as js object 
	   	// console.log(data);
	    parseStockDataWithCode(data);
	    // raw response 
	    //console.log(response);
		});
  	//}, 1000);
	
	
	fs.readFile('/MEAN/sv-stock/src/manifest/test.txt', 'utf8', function (err,data) {
>>>>>>> d9e6bb7943993843a67e6a67dfa69e6559d62e25
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


var parseStockDataWithCode = function (data) {	
	logger.info("Begin Parser");
	var stockArray = new Array();
	for (var j in data) {
		console.log(j);
		var tmpData = data[j].split("|");
		stockArray.push(parseEachStock(tmpData));
	}
	console.log(stockArray);
}

function parseEachStock(data) {
	var stock = new Stock();
	for (var i in data) {	
		switch(i) {
			case "9":
				console.log("TC");		
				stock.TC = data[9];		
				break;
			case "16":
				console.log("CE");				
				break;
			case "17":
				console.log("FL");				
				break;
			case "20":
				console.log("Khop Lenh Gia");
				
				break;
			case "21":
				console.log("Khop Lenh KL");
				
				break;
			case "24":
				console.log("Mua Gia 1");
				
				break;
			case "25":
				console.log("KL 1");
				
				break;
			case "26":
				console.log("M Gia 2");
				
				break;
			case "28":
				console.log("Mua Gia 3");
				
				break;
			case "29":
				console.log("KL 3");
				
				break;
			case "30":
				console.log("Ban Gia 1");
				
				break;
			case "31":
				console.log("KL 1");
				
				break;
			case "32":
				console.log("M Gia 2");
				
				break;
			case "33":
				console.log("KL 2");
				
				break;
			case "34":
				console.log("Mua Gia 3");
				
				break;
			case "35":
				console.log("KL 3");
				
				break;
			case "36":
				console.log("gIA TRI");
				
				break;
			case "37":
				console.log("Tong KL");
				
				break;
			default:
				break;
		}
	}
	return stock;
}
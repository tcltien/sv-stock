<<<<<<< HEAD
// 'use strict';
=======
>>>>>>> 6d359e88655b2495cc95781c23f578109d4a1b6a

// var config = require('../../config/config');
// var logger = require('winston').loggers.get('application');
// var ottoman = require('ottoman');
// var N1qlQuery = require('couchbase').N1qlQuery;
// ottoman.bucket = require('../../config/express').couchbaseBucket();
// var bucket = require('../../config/express').couchbaseBucket();

// var StandingData = ottoman.model('StandingData', {
//   	idx: 'string',
// 	type: 'string',
// 	homeTeamName: {
// 	  	teamName: {
// 	  		name: 'string',
// 	    	alias: 'string'	    	
// 	  	}	    
// 	},
// 	visitingTeamname: {
// 	  	teamName: {
// 	  		name: 'string',
// 	    	alias: 'string'	    	
// 	  	}
// 	  }	  
// 	}, {
// 	index: {
// 	    findByHomeTeamName: {
// 	      by: 'homeTeamName.teamName.name',
// 	      type: 'n1ql'
// 	    }	   
// 	}
// });

// ottoman.ensureIndices(function(err) {
//   if (err) {
//     console.log('failed to created neccessary indices', err);
//     return;
//   }

//   console.log('ottoman indices are ready for use!');
// });


// module.exports.save = function(){
// 	var myStandingData = new StandingData({
// 	 idx: new Date().getTime(),
// 	 type: "StandingData",
// 	  homeTeamName: {
// 	  	teamName: {
// 	  		name: 'Test',
// 	    	alias: 'Test'	    	
// 	  	}	    
// 	  },
// 	  visitingTeamname: {
// 	  	teamName: {
// 	  		name: 'Test',
// 	    	alias: 'Test'	    	
// 	  	}
// 	  }	  
// 	});

// 	myStandingData.save(function(err){
// 		if (err) throw err;
// 		console.log("Save Successfull")
// 	});
// }

// module.exports.find = function(){
// 	logger.debug ('Begin find by name');
// 	StandingData.find({['homeTeamName.teamName.name']: 'Test2'}, function(err, myStandingData) {		
// 	 	if (err) console.log(err);	  	
// 	  	var documentName = myStandingData['homeTeamName'];
// 	  	console.log(documentName);
// 	  	logger.debug("Document is :" + myStandingData)
// 	});
// }

// module.exports.findQuery = function() {
// 	logger.debug ('Begin find by N1QL');
// 	var query = N1qlQuery.fromString('SELECT * FROM ' + config.couchbase.bucket + ' WHERE homeTeamName.teamName.name = $1');		    	
// 	bucket.query(query, ['Test2'], function(err, rows, meta) {
// 		if (rows.length > 0) {
// 			var obj = rows[0].sportsdata;		
// 			logger.debug('Get Object: ' + obj);
// 			obj.homeTeamName.teamName.name = "update";
// 			  	bucket.replace(obj['type'] + '|'+ obj['_id'] +'', obj, {} ,
// 				function(err, res) {
// 			    	if (err) {
// 			     	 console.log('operation failed', err);
// 			     	 logger.debug('Save failed');
// 			     	 return;
// 			    	}
// 			    	console.log('success!', res);
// 			    	logger.debug('Save success');
// 			});
// 		} else {
// 			logger.debug('Not found record');
// 		}
		
	 
// 	});
// }

// module.exports.update = function() {	
// 	logger.debug ('Begin Update function');
// 	var query = N1qlQuery.fromString('SELECT data, META(data).id AS _ID, META(data).cas AS _CAS FROM sportsdata data WHERE data.docType == "standing" and data.docId = "MLB"');		    	
// 	bucket.query(query, [], function(err, rows, meta) {	
// 	 	console.log(rows);
//  		logger.debug("Result is: " + rows);
// 	});
// }

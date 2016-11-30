<<<<<<< HEAD
=======

>>>>>>> 6d359e88655b2495cc95781c23f578109d4a1b6a
'use strict';

/**
 * Module dependencies.
 */

var config = require('../../config/config');
var logger =  require('winston').loggers.get('application');
var fs = require("fs");
var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();
var SoxCommand = require('sox-audio');
var TimeFormat = SoxCommand.TimeFormat;
// var bucket = require('../../config/express').couchbaseBucket();
// var N1qlQuery = require('couchbase').N1qlQuery;
// var standingService = require('../services/StandingService');
// var boxscoreService = require('../services/BoxscoreService');
var mp3_path = "../src/public/sound/";


/**
 * Index page
 * @public
 * @param  {HttpRequest} req The HTTP request
 * @param  {HttpResponse} res The HTTP response
 */
exports.index = function(req, res) {
    logger.info('Index page start..........');
<<<<<<< HEAD

   // standingService.save();
    //standingService.find();
   // standingService.update();
      // standingService.findQuery();


    
	// var query = N1qlQuery.fromString('SELECT * FROM ' + config.couchbase.bucket + ' WHERE  homeTeamName.teamName.name=$1');		    	
	// bucket.query(query, ['Blue Jays1'], function(err, rows, meta) {	
	//  	for (var row in rows) {
 //        	var obj = rows[row];        	      
 //    		if (typeof obj.sportsdata.visitingTeamName != 'undefined'){
 //    			var a = obj.sportsdata.visitingTeamName;		
	// 			if (typeof a != 'undefined'){
	// 				console.log(obj.sportsdata.visitingTeamName.teamName.name);
	// 			}
 //        	}	
			
			
 //    	}	    
	// });


	// var query = N1qlQuery.fromString('SELECT data, META(data).id AS _ID, META(data).cas AS _CAS FROM sportsdata data WHERE data.docType == "boxscore" and data.source = "STATS" LIMIT 5');
 //    bucket.query(query, [], function(err, rows, meta) {	
	// 	logger.debug ('Getting using query');
	// 	console.log(rows);    
	// });


	// boxscoreService.find({},
	// {limit: 10,skip: 10},
	// function(err, items){
	// 	if (err) throw err;
	// 	logger.debug ('Getting using model');
	// 	console.log(JSON.stringify(items));
	// });
	// logger.debug('Render index.html');
	

	// // test find service boxscore
	// boxscoreService.find();

	// Synchronous read
	
	/* Read and save new file */
	// var c = ffmpeg({ source: mp3_path + '0514.mp3'})  					
 //  			.mergeAdd(mp3_path + '0943.mp3')
 //  			.on('error', function(err) {
	// 	        console.log('An error occurred: ' + err.message);
	// 	    })
	// 	    .on('end', function() {
	// 	        console.log('Merging finished !');
	// 	    })
 //  			.mergeToFile(mp3_path + 'test.mp3', mp3_path);

  
	// var command = ffmpeg(mp3_path + '0943.mp3'); //.save(mp3_path + '0943-1.mp3');
	// console.log(command);
	// var command2 = ffmpeg(mp3_path + '0514.mp3'); //.save(mp3_path + '0943-1.mp3');
	// console.log(command);

	/* Read metadata of file */
	// ffmpeg.ffprobe(mp3_path + '0514.mp3', function(err, metadata) {
	//     console.dir(metadata);
	// });

	logger.debug('Render index.html');
=======
>>>>>>> 6d359e88655b2495cc95781c23f578109d4a1b6a
    res.render('index.html', {});

};


exports.create = function(req, res) {
<<<<<<< HEAD

		// var userData = {	  				
		// 	"id": new Date().getTime(),
		// 	"data": {
		// 	    "data": {}
		//  	},
		// 	  "homeTeamName": {
		// 	    "teamName": {
		// 	      "alias": "TOR",
		// 	      "name": "Blue Jays2"
		// 	    }
		// 	  },
		// 	  "visitingTeamName": {
		// 	    "teamName": {
		// 	      "alias": "HOU",
		// 	      "name": "Houston Astros"
		// 	    }
		// 	  }
			
  // 		};
  // 		bucket.upsert('user' + new Date().getTime(), userData, function (err, response){
	 //    if (err) {
		//       console.log('Failed to save to Couchbase', err);
		//     } else {
		//     	console.log('Save Success');
		//     	var query = N1qlQuery.fromString('SELECT * FROM ' + config.couchbase.bucket + ' WHERE  homeTeamName.teamName.name=$1');		    	
		// 	bucket.query(query, ['Blue Jays2'], function(err, rows, meta) {	
		//     		console.log(rows);
		// 		 	for (var row in rows) {

		// 	        	var obj = rows[row];
		// 	        	console.log(obj);
		// 				var a = obj.sportsdata.visitingTeamName;					
		// 				if (typeof a != 'undefined'){
		// 					console.log(obj.sportsdata.visitingTeamName.teamName.name);
		// 				}
						
		// 	    	}	    
		// 		});
		// 	}
	 //  	});
	
=======
>>>>>>> 6d359e88655b2495cc95781c23f578109d4a1b6a
	res.render('index.html', {});
}

'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	compression = require('compression'),
	morgan = require('morgan'),
	bodyParser  = require('body-parser'),
	cookieParser  = require('cookie-parser'),
	methodOverride = require('method-override'),
	expressSession  = require('express-session'),
    flash = require('connect-flash'),
    consolidate = require('consolidate'),
    nunjucks = require('nunjucks'),
    path = require('path'),
	logger =  require('winston').loggers.get('application'),
	couchbase = require('couchbase'),
	config = require('./config'),
	utilities = require('./utilities');

module.exports = function() {
    // Initialize express app
    var app = express();
	
    // Setting the environment locals
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.webroot= config.app.webroot;

    // Create logs folder

    // Passing the request url to environment locals
    app.use(function(req, res, next) {
        res.locals.url = req.protocol + ':// ' + req.headers.host + req.url;
        next();
    });  

    // Should be placed before express.static
    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    // Showing stack errors
    app.set('showStackError', true);

    // Set nunjucks as the template engine
    app.engine('html', consolidate[config.templateEngine]);

    // Set views path and view engine
    app.set('view engine', 'html');
    app.set('views', config.root + '/app/views');
	nunjucks.configure({ 
		autoescape: false ,
		noCache: true
	});
    // Application Configuration for development environment
    if('development' == process.env.NODE_ENV) {
        // Enable logger
        app.use(morgan('dev'));

        // Disable views cache
        app.set('view cache', false);
    }

	// Init database
	// var cluster = new couchbase.Cluster('couchbase://' + config.couchbase.server);
	// var couchbaseBucket = cluster.openBucket(config.couchbase.bucket, config.couchbase.password, function(err) {
 //    	if (err) {
 //        	console.error('Got error: %j', err);
 //    	} else {
 //     		console.info('Success connect couchbase server');
	// 	}
 //    }); 
	
	//global.bucket = couchbaseBucket;
    // request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({ extended: false, limit : '50mb' }));
    app.use(bodyParser.json({limit : '50mb'}));
    app.use(methodOverride());

    // Enable jsonp
    app.enable('jsonp callback');

    // cookieParser should be above session
    app.use(cookieParser());

    // express/mongo session storage
    app.use(expressSession({
        secret: config.sessionSecret,
		resave: false,
		saveUninitialized: true,
        cookie: {
            maxAge: config.sessionTimeOut * 1000,
            expires: new Date(Date.now() + config.sessionTimeOut * 1000)
        }
    }));

    // connect flash for flash messages
    app.use(flash());

    // Setting the app router and static folder
    app.use(config.app.webroot, express.static(config.root + '/public'));
    app.use(config.app.webroot, express.static(config.root + '/' + config.manifestdir));

    // Load Routes
    utilities.walk('./app/routes', /(.*)\.(js$|coffee$)/).forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        // If the error object doesn't exists
        if (!err)
            return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500.html', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        res.status(404).render('404.html', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });
	
    return app;
};

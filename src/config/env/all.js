'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    /** Global definition * */
    app: {
        /* Page title */
        title: 'Sv Stock',
        /* Page description */
        description: 'Sv Stock',
        /* Webroot URL */
        webroot: '/sv-stock',
		
        keywords: 'directv, sds, node.js'
    },
    /* System root path */
    root: rootPath,
    /* Server port */
    port: process.env.PORT || 3000,
	/* Name of templating engine to render the view */
    templateEngine: 'nunjucks',

    /** Session configuration * */
    sessionSecret: 'SVSTOCK',
    sessionCollection: 'sessions',
    /* Session timeout in seconds - Default 30 minutes */
    sessionTimeOut: 1800,
    /* MCS data timeout in seconds - Default 5 minutes */
    timeout: 300,
    /* Should check session - Test purpose only */
    checkSession: true,

    /** DB configuration **/
    couchbase: {
		/* Couchbase DB host */
		server: '192.168.211.13',
		/* Couchbase DB bucket */
		bucket: 'sportsdata',
		/* Couchbase DB password */
		password: ''
	},
	
	/* Character set */
	charset: 'utf8',
	
	/* Admin User */
	user : {
		username : 'admin', 
		passwd : 'directv'
	}
};

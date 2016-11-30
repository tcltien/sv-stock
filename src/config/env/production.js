'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    /* Server port */
    port: 3000,

    /* Should check session */
    checkSession: true,

    /* Session timeout in seconds - 6 hours. */
    sessionTimeOut: 21600
};

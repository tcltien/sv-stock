/*
 * production.js - Define all the environment parameters.
 * The values defined in this file can be overwritten by specific environment.
 * 
 * NOTE: This file should not be manually edited as it is generated automatically 
 * by the build process. Any manual changes will be lost after an update. Local
 * changes should be made in the appropriate environment config files: production.js,
 * development.js, or test.js.
 *
 * Copyright (c) 2016 DIRECTV, Inc.
 * An Unpublished Work.  All Rights Reserved.
 *
 * DIRECTV PROPRIETARY:  The information contained in or disclosed by this
 * document is considered proprietary by DIRECTV, Inc.  This document and/or the
 * information contained therein shall not be duplicated nor disclosed in whole
 * or in part without the specific written permission of DIRECTV, Inc.
 */
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

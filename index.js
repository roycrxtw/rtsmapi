
/**
 * RTSM
 * @type {Module express|Module express}
 */

'use strict';

var config = require('./config/config.js');

var express = require('express');
var app = express();
var subdomain = require('express-subdomain');
const ENV = config.env;
const PORT = config.port;

var cors = require('cors');
app.use(cors());

// Setup subdomain in production time
if(ENV === 'production'){
	app.use(subdomain('rtsmapi', require('./routers')));
}else{
	app.use(require('./routers'));
}

app.listen(PORT);
console.log('RTSM api is listening on port %s. env=%s', PORT, ENV);



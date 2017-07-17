
/**
 * RTSM
 * @type {Module express|Module express}
 */

'use strict';

var config = require('./config/main.config');

var express = require('express');
var app = express();
const ENV = config.env;
const PORT = config.port;

var cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use(require('./routers'));

app.listen(PORT);
console.log('RTSM api is listening on port %s. env=%s', PORT, ENV);



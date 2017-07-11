
/**
 * RTSM
 * @type {Module express|Module express}
 */

'use strict';

var express = require('express');
var app = express();
const PORT = 3000;

var cors = require('cors');

app.use(cors());
app.use(require('./routers'));

app.listen(PORT);
console.log('listening on port %s.', PORT); 



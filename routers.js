
'use strict';

var express = require('express'),
	router = express.Router();
	
var dataLoader = require('./data-loader.js');
var parser = require('./data-parser.js');
const MOTORWAYS = require('./data.js');

//const LOG_LEVEL = require('../config/main.config').LOG_LEVEL;
//var log = require('bunyan').createLogger({
//	name: 'dispatcher',
//	streams: [{
//		level: LOG_LEVEL,
//		path: 'log/grumbler.log'
//	}]
//});

//router.use(function(req, res, next){
//	next();
//});

router.get(['/info'], function(req, res, next){
	//log.info({uid: req.session.uid, uname: req.session.uname}, 'Request get>/home');
	//res.locals.css = ['home'];
	//res.render('home', {uid: req.session.uid, uname: req.session.uname});
	
	res.json({message: 'This is RTSM api, a realtime traffic data of motorways in Taiwan by Roy Lu. July 2017'});
});

router.get('/data/:mid/:start?/:end?', async function(req, res, next){
	//log.info({uid: req.session.uid, uname: req.session.uname}, 'Request get>/home');
	let result = {};
	let mid = req.params.mid;
	
	let motorway = MOTORWAYS[mid];
	if(!motorway){
		console.log('Invalid motorway id');
		return res.json({message: 'Invalid motorway id'});
	}
	
	let nameTw = motorway.nameTw;
	let nameEn = motorway.nameEn;
	let url = motorway.url;
	
	let rawData = await dataLoader(url);
	let parsedData = await parser(rawData);
	
	result.name = nameTw;
	result.nameEn = nameEn;
	result.start = req.params.start;
	result.end = req.params.end;
	result.message = 'path: /data/:motorway';
	result.traffic = parsedData;
	return res.json(result);
});


// handle 404 issues
router.use(function(req, res, next){
	//res.sendStatus(404);
	res.send('What do you look for?');
});

router.use(function(err, req, res, next){
	res.send("很抱歉，暫時無法提供此服務，請稍後再試。" 
			+ "The service is currently not available. Please try it later.");
	
});

module.exports = router;
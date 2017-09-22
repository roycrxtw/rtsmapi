
'use strict';

var express = require('express'),
	router = express.Router();
	
var dataLoader = require('./data-loader.js');
var parser = require('./data-parser.js');
const MOTORWAYS = require('./data.js');
const config = require('./config/main.config');

var log = require('bunyan').createLogger({
	name: 'accesslog',
	streams: [{
		level: config.logLevel,
		path: config.accesslogPath
	}]
});

// Accesslog middleware
// This middleware will log every possibie client ips using bunyan module
router.use(function(req, res, next){
	if(req.path === '/favicon.ico'){	// ignore the request for favicon.ico
		return next();
	}
	log.info({
		path: req.url, 
		xReadIp: req.headers['x-real-ip'],
		xForwardFor: req.headers['x-forwarded-for'], 
		remoteAddress: req.connection.remoteAddress,
		socketRemoteAddress: req.socket.remoteAddress
	}, 'Access log');
	
	next();
});

router.get(['/', '/readme'], function(req, res, next){
	res.redirect(302, '/readme.html');
});

router.get(['/info'], function(req, res, next){
	res.json({message: 'This is RTSM API, a realtime traffic data of motorways in Taiwan by Roy Lu. July 2017'});
});

/**
 * Main endpoint
 */
router.get('/data/:mid', async function(req, res, next){
	try{
		const result = {};
		const mid = req.params.mid;
		
		const motorway = MOTORWAYS[mid];
		if(!motorway){
			return res.json({message: 'Invalid motorway id'});
		}
		
		const nameTw = motorway.nameTw;
		const nameEn = motorway.nameEn;
		const url = motorway.url;
		
		const rawData = await dataLoader(url);
		const parsedData = await parser(rawData);		// parser() returns an array
		
		result.name = nameTw;
		result.nameEn = nameEn;
		result.direction = motorway.direction;
		result.traffic = parsedData;
		result.updatedAt = new Date().toISOString();
		return res.json(result);
	}catch(ex){
		log.error({ex: ex.stack}, 'Error in get>/data/:mid');
		return res.sendStatus(404);
	}
});


// handle 404 issues
router.use(function(req, res, next){
	//res.sendStatus(404);
	res.send('What do you look for?');
});


router.use(function(err, req, res, next){
	log.error('Error happened in routers');
	log.error('Error: ', err);
	res.send("很抱歉，暫時無法提供此服務，請稍後再試。" 
			+ "The service is currently not available. Please try it later.");
});

module.exports = router;
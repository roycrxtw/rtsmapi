
'use strict';

var request = require('request');
var debug = require('debug')('data-loader');

// return a promise object
module.exports = function(url){
	return new Promise(function(resolve, reject){
		debug('Processing url{%s}', url);
		
		request(url, function(err, res, body){
			if(err){
				return reject(err);
			}
			
			if(res && res.statusCode === 200){
				return resolve(body);
			}else{
				return reject('other problems');
			}
		});
	});
};

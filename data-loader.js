
/**
 * A data loader which will fetch data for the specified url.
 */

'use strict';

var request = require('request');
var debug = require('debug')('data-loader');


/**
 * Use request module to fetch data from the specified url.
 * @param {string} url
 * @return {Promise<string>} Resolve html data if fetching success.
 */
module.exports = function(url){
	return new Promise(function(resolve, reject){
		debug(`Processing url=${url}`);
		
		request(url, function(err, res, body){
			if(err){
				return reject(err);
			}
			
			if(res && res.statusCode === 200){
				return resolve(body);
			}else{
				return reject('No any response or incorrect status code.');
			}
		});
	});
};

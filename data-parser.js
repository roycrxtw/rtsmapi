
/**
 * A special designed html parser for the data fetched from National Freeway Burean of Taiwan.
 * @author Roy Lu
 * Sep 2017
 */


'use strict';

var cheerio = require('cheerio');
var debug = require('debug')('data-parser');

module.exports = function(rawData){
	debug('rawData=', rawData);
	
	const content = '<table>' + rawData + '</table>';
	
	var $ = cheerio.load(content);
	
	const dataset = [];

	$('tr').each(function(i, elem){
		let data = {
			name: $(this).find('.sec_name').text(),
			speedA: $(this).find('.speedLeft').text(),
			speedB: $(this).find('.speedRight').text()
		};
		dataset[i] = data;
	});

	return dataset;
};

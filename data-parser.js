
'use strict';


var cheerio = require('cheerio');
var debug = require('debug')('data-parser');

module.exports = function(rawData){
	debug('rawData=', rawData);
	
	let data = '<table>' + rawData + '</table>';
	
	var $ = cheerio.load(data);
	
	let dataset = [];

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

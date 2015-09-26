#!/usr/bin/en node
'use strict';

var cheerio = require('cheerio');
var request = require('request');

var URL = 'https://www.reddit.com/r/shittyaskscience/new/';

request(URL, function(err, response, body){
  if (err || response.statusCode != 200) {
    throw new Error("Couldn't reach /r/shittyaskscience. Too many shitty questions.");
  }
  console.log('\n');
  var $ = cheerio.load(body);
  var randomShitty = getRandomInt(1,25);
  var selectedShitty = $('#siteTable .thing').eq(randomShitty).find('a.title');
  console.log(selectedShitty.text());
  console.log('\n');
  console.log('http://www.reddit.com'+selectedShitty.attr('href'));
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

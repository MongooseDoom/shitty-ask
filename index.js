#!/usr/bin/env node
'use strict';

var cheerio = require('cheerio');
var request = require('request');
var URL = 'https://www.reddit.com/r/shittyaskscience/';
var lists = ["new","hot","rising","controversial","top"];


if (lists.indexOf(process.argv[2]) != -1) {
  URL += process.argv[2];
}

request(URL, function(err, response, body){
  if (err || response.statusCode != 200) {
    throw new Error("Couldn't reach /r/ShittyAskScience. Too many shitty questions.");
  }

  var $ = cheerio.load(body);
  var randomShitty = getRandomInt(0,25);
  var selectedShitty = $('#siteTable .thing').eq(randomShitty).find('a.title');
  console.log('---');
  console.log(selectedShitty.text());
  console.log('---');
  if ($('#siteTable .thing').eq(randomShitty).hasClass('self')) {
    console.log('http://www.reddit.com'+selectedShitty.attr('href'));
  } else {
    console.log(selectedShitty.attr('href'));
  }
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

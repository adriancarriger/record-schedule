/*
 * record-schedule
 * https://github.com/adriancarriger/record-schedule
 *
 * Copyright (c) 2015 Adrian Carriger
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var record = require( path.normalize('../lib/record.js') );
var config = require( path.normalize('../config') );
var request = require('request');

record.scheduleRecording(config.recurrance, function(){
	record.startRecording(config.minutesToRecord, function(unix){
		config.params.unix = unix;
		record.convertMP3(function(){
			record.preparePost(config.server.url, config.params, function(postObject){
				request.post(postObject, function(){
					record.finish(function(){});
				});
			});
		});
	});
});

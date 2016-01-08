/*
 * record-schedule
 * https://github.com/adriancarriger/record-schedule
 *
 * Copyright (c) 2015 Adrian Carriger
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var tools = require( path.normalize('../lib/tools.js') );
var spawn = require('child_process').spawn;
var schedule = require('node-schedule');
var moment = require('moment');

var recordings = path.normalize(__dirname + '/../recordings');
var mp3File = path.normalize(recordings + '/temp.mp3');

exports = module.exports = {};

exports.scheduleRecording = function(r, callback) {
	var rule = r.second + ' ' + r.minute + ' ' + r.hour + ' ' + '* * ' + r.dayOfWeek;
	return schedule.scheduleJob(rule, function(){
		callback();
	});
};

exports.startRecording = function(minutesToRecord, callback) {
	tools.logExceptOnTest('Starting recording.');
	var unix = moment().unix();
	var tempFileName = 'temp.wav';
	var f = {darwin: 'unix', win32: 'win', linux: 'unix'};
	var u = {unix: {c: 'rec', a: [tempFileName]}, win: {c: process.env.comspec, a: ['/c', 'sox', '-t', 'waveaudio', '-d', tempFileName]}};
	var n = u[f[process.platform]];
	var recording = spawn(n.c, n.a, {cwd: recordings});
	recording.on('exit', function() {
		callback(unix);
	});
	setTimeout(function endRecording() {
		tools.logExceptOnTest('Ending recording.');
		recording.kill();
	}, minutesToRecord * 60000);
};

exports.convertMP3 = function(callback) {
	var wavFile = path.normalize(recordings + '/temp.wav');
	var convert = spawn('lame', [wavFile, mp3File], {cwd: recordings});
	convert.on('exit', function() {
		fs.unlink(wavFile, function() {
			callback();
		});
	});
};

exports.preparePost = function(url, params, callback) {
	params.my_file = fs.createReadStream(mp3File);
	var postObject = {
		url: url,
		formData: params
	};
	callback(postObject);
};

exports.finish = function(callback) {
	fs.unlink(mp3File, function() {
		tools.logExceptOnTest('Everything is done!');
		callback();
	});
};

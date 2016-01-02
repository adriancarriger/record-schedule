/*
 * record-schedule
 * https://github.com/adriancarriger/record-schedule
 *
 * Copyright (c) 2015 Adrian Carriger
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var osHomedir = require('os-homedir');
var platformOptions = {darwin: 'mac', win32: 'windows', linux: 'linux' };
var Service = require('node-' + platformOptions[process.platform]).Service;
var tools = require( path.normalize('../lib/tools.js') );
var svc = new Service({
	name: 'record-schedule',
	description: 'Record audio on a recurring schedule and post to a server.',
	script: path.normalize(__dirname + '/record-schedule.js'),
	env: [
		{name: 'PATH', value: process.env['PATH']}, // Pass through current env paths
		{name: 'HOME', value: osHomedir()} // Pass through home directory
	]
});

exports = module.exports = {};

exports.start = function(callback) {
	if (svc.exists) {
		callback({
			exists: svc.exists,
			alreadyExists: true
		});
		tools.logExceptOnTest('No changes made. Recording schedule was started previously.');
	} else {
		svc.install();
	}
	svc.once('install', function() {
		svc.start();
		callback({
			exists: svc.exists,
			alreadyExists: false
		});
		tools.logExceptOnTest('Automatic recordings are scheduled.');
	});
};

exports.stop = function(callback) {
	svc.once('uninstall', function() {
		callback({
			exists: svc.exists,
			serviceNotFound: false
		});
		tools.logExceptOnTest('Stopped automatic recordings.');
	});
	if (svc.exists) {
		svc.uninstall();
	} else {
		callback({
			exists: svc.exists,
			serviceNotFound: true
		});
		tools.logExceptOnTest('There are no scheduled recordings to stop.');
	}
};

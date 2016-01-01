#! /usr/bin/env Node

/*
 * record-schedule
 * https://github.com/adriancarriger/record-schedule
 *
 * Copyright (c) 2015 Adrian Carriger
 * Licensed under the MIT license.
 */

'use strict';

var service = require('../lib/service.js');
var tools = require('../lib/tools.js');
var userArgs = process.argv.slice(2);
var action = userArgs[0];

if (action === 'start') {
	service.start(function(){});
} else if (action === 'stop') {
	service.stop(function(){});
} else if (action === 'config') {
	tools.logExceptOnTest('record-schedule config file:\n\n' + __dirname + '/config.js\n');
} else {
	errorMessage();
}

function errorMessage() {
	tools.logExceptOnTest('Error');
}

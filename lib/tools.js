/*
 * record-schedule
 * https://github.com/adriancarriger/record-schedule
 *
 * Copyright (c) 2015 Adrian Carriger
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

exports = module.exports = {};

exports.logExceptOnTest = function(string) {
	if (process.env.NODE_ENV !== 'test') {
		console.log(string);
	}
};

exports.fileExists = function(path) {
	try {
		fs.accessSync(path, fs.F_OK);
		return true;
	} catch (e) {
		return false;
	}
};

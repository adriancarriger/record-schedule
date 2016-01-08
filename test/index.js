'use strict';

var path = require('path');
var tools = require( path.normalize('../lib/tools.js') );
var assert = require('should');
var exec = require('child_process').exec;

describe('Execute record-schedule commands', function() {
	it('should execute record-schedule start without error', function(done) {
		 exec('record-schedule start', function(error, stdout, stderr){
			(error === null).should.be.true; 
			setTimeout(function(){done()});
		 });
	});
	it('should execute record-schedule stop without error', function(done) {
		 exec('record-schedule stop', function(error, stdout, stderr){
			(error === null).should.be.true; 
			setTimeout(function(){done()});
		 });
	});
	it('should execute record-schedule without error', function(done) {
		 exec('record-schedule', function(error, stdout, stderr){
			(error === null).should.be.true; 
			setTimeout(function(){done()});
		 });
	});
});
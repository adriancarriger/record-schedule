'use strict';

var path = require('path');
var tools = require( path.normalize('../lib/tools.js') );
var assert = require('should');
require('mocha-sinon');

describe('Create logs except while testing', function() {
	var testString = '\n  This string should only display when the Node environment is set to undefined.';
	beforeEach(function() {
		var log = console.log;
		this.sinon.stub(console, 'log', function() {
			return log.apply(log, arguments);
		});
	});
	it('should not display a log during testing', function() {
		tools.logExceptOnTest(testString);
		console.log.notCalled.should.be.true;
	});
	it('should log to console when the Node environment is set to undefined', function() {
		process.env.NODE_ENV = undefined;
		tools.logExceptOnTest(testString);
		console.log.calledOnce.should.be.true;
		console.log.calledWith( testString ).should.be.true;
		after(function() {
			process.env.NODE_ENV = 'test';
		});
	});
});
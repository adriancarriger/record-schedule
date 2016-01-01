'use strict';

var service = require('../lib/service.js');
var assert = require('should');
var tools = require('../lib/tools.js');

describe('Start a background service', function() {
	//*
	it('should start a service', function(done) {
		service.start(function(data){
			data.exists.should.equal(true);
			done();
		});
	});
	it('should return alreadyExists if the service is already running', function(done) {
		service.start(function(data){
			data.exists.should.equal(true);
			data.alreadyExists.should.equal(true);
			done();
		});
	});
});
describe('Stop a background service', function() {
	it('should stop a service', function(done) {
		service.stop(function(data){
			data.exists.should.equal(false);
			data.serviceNotFound.should.equal(false);
			done();
		});
	});
	it('should return serviceNotFound if the service was not found', function(done) {
		service.stop(function(data){
			data.exists.should.equal(false);
			data.serviceNotFound.should.equal(true);
			done();
		});
	});
});

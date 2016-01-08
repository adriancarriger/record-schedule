'use strict';

var path = require('path');
var service = require( path.normalize('../lib/service.js') );
var assert = require('should');
var tools = require( path.normalize('../lib/tools.js') );

describe('Start a background service', function() {
	it('should start a service', function(done) {
		this.timeout(20000);
		service.start(function(data){
			data.exists.should.equal(true);
			setTimeout(function(){done()});
		});
	});
	it('should return alreadyExists if the service is already running', function(done) {
		this.timeout(20000);
		service.start(function(data){
			data.exists.should.equal(true);
			data.alreadyExists.should.equal(true);
			setTimeout(function(){done()}, 1000);
		});
	});
});
describe('Stop a background service', function() {
	it('should stop a service', function(done) {
		this.timeout(20000);
		service.stop(function(data){
			data.exists.should.equal(false);
			data.serviceNotFound.should.equal(false);
			setTimeout(function(){done()});
		});
	});
	it('should return serviceNotFound if the service was not found', function(done) {
		this.timeout(20000);
		service.stop(function(data){
			data.exists.should.equal(false);
			data.serviceNotFound.should.equal(true);
			setTimeout(function(){done()});
		});
	});
});

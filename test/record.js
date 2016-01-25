'use strict';

var fs = require('fs');
var path = require('path');
var record = require( path.normalize('../lib/record.js') );
var tools = require( path.normalize('../lib/tools.js') );
var assert = require('should');
var sinon = require('sinon');
var moment = require('moment');
var recordingPath = path.normalize(__dirname + '/../recordings');
var wavFile = path.normalize(recordingPath + '/temp.wav');
var mp3File = path.normalize(recordingPath + '/temp.mp3');

describe('Schedule a recording', function() {
	var schedule;
	var testMoment = moment().add(10, 'seconds');
	var recurrance = {
		dayOfWeek: testMoment.format('d'),
		hour: testMoment.format('H'),
		minute: testMoment.format('m'),
		second: testMoment.format('s')
	};
	it('should set a schedule', function() {
		schedule = record.scheduleRecording(recurrance, function(){});
		var scheduleExists = schedule.name.length > 0;
		scheduleExists.should.equal(true);
	});
	it('execute the schedule at the set time', function(done) {
		this.timeout(20000);
		schedule = record.scheduleRecording(recurrance, function() {
			setTimeout(function(){done()});
		});
	});
	afterEach(function(done){
		this.timeout(20000);
		schedule.cancel();
		setTimeout(function(){done()},1);
	});
});
describe('Record for x minutes', function() {
	it('should not contain temp.wav in the recording directory before recording starts', function() {
		var noWavFile = tools.fileExists(wavFile) == false;
		noWavFile.should.equal(true);
	});
	it('should create a .wav recording', function(done) {
		this.timeout(20000);
		record.startRecording(0.02, function(unix) {
			tools.fileExists(wavFile).should.equal(true);
			setTimeout(function(){done()});
		});
	});
});
describe('Convert recording to MP3', function() {
	it('should contain temp.wav in the recording directory before conversion starts', function() {
		tools.fileExists(wavFile).should.equal(true);
	});
	it('should convert temp.wav to temp.mp3 and remove temp.wav', function(done) {
		this.timeout(20000);
		record.convertMP3(function() {
			// MP3 Exists
			tools.fileExists(mp3File).should.equal(true);
			// WAV deleted
			var noWavFile = tools.fileExists(wavFile) == false;
			noWavFile.should.equal(true);
			setTimeout(function(){done()});
		});
	});
});
describe('Prepare post object', function() {
	var testMinUnix = Math.floor(Date.now() / 1000);
	var testUnix;
	before(function(done){
		this.timeout(20000);
		record.startRecording(0.02, function(unix) {
			testUnix = unix;
			setTimeout(function(){done()});
		});
	});
	it('should contain temp.mp3 in the recording directory before conversion starts', function() {
		tools.fileExists(mp3File).should.equal(true);
	});
	it('should use a real unix', function(done) {
		this.timeout(20000);
		record.preparePost('http://example.com', {unix: testUnix}, function(postObject) {
			var testMaxUnix = Math.floor(Date.now() / 1000);
			postObject.formData.unix.should.be.within(testMinUnix,testMaxUnix);
			setTimeout(function(){done()});
		});
	});
	it('should have a readable file stream', function(done) {
		this.timeout(20000);
		record.preparePost('http://example.com', {unix: testUnix}, function(postObject) {
			postObject.formData.my_file.readable.should.equal(true);
			setTimeout(function(){done()});
		});
	});
	after(function(done){
		this.timeout(20000);
		fs.unlink( path.normalize(__dirname + '/../recordings/temp.wav'), function() {
			setTimeout(function(){done()});
		});
	});
});
describe('Remove MP3 file', function() {
	it('should contain temp.mp3 in the recording directory before removing', function() {
		tools.fileExists(mp3File).should.equal(true);
	});
	it('should remove temp.mp3', function(done) {
		this.timeout(20000);
		record.finish(function(){
			var noMp3File = tools.fileExists(mp3File) == false;
			noMp3File.should.equal(true);
			setTimeout(function(){done()});
		});
	});
});

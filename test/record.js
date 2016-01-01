'use strict';

var record = require('../lib/record.js');
var tools = require('../lib/tools.js');
var assert = require('should');
var sinon = require('sinon');
var fs = require('fs');
var moment = require('moment');
var recordingPath = __dirname + '/../recordings';
var wavFile = recordingPath + '/temp.wav';
var mp3File = recordingPath + '/temp.mp3';

describe('Schedule a recording', function() {
	var schedule;
	var testMoment = moment().add(2, 'seconds');
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
			done();
		});
	});
	afterEach(function(){
		schedule.cancel();
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
			done();
		});
	});
});
describe('Convert recording to MP3', function() {
	it('should contain temp.wav in the recording directory before conversion starts', function() {
		tools.fileExists(wavFile).should.equal(true);
	});
	it('should convert temp.wav to temp.mp3 and remove temp.wav', function(done) {
		record.convertMP3(function() {
			// MP3 Exists
			tools.fileExists(mp3File).should.equal(true);
			// WAV deleted
			var noWavFile = tools.fileExists(wavFile) == false;
			noWavFile.should.equal(true);
			done();
		});
	});
});
describe('Prepare post object', function() {
	var testMinUnix = Math.floor(Date.now() / 1000);
	var testUnix;
	before(function(done){
		record.startRecording(0.02, function(unix) {
			testUnix = unix;
			done();
		});
	});
	it('should contain temp.mp3 in the recording directory before conversion starts', function() {
		tools.fileExists(mp3File).should.equal(true);
	});
	it('should use a real unix', function(done) {
		record.preparePost('http://example.com', {unix: testUnix}, function(postObject) {
			var testMaxUnix = Math.floor(Date.now() / 1000);
			postObject.formData.unix.should.be.within(testMinUnix,testMaxUnix);
			done();
		});
	});
	it('should have a readable file stream', function(done) {
		record.preparePost('http://example.com', {unix: testUnix}, function(postObject) {
			postObject.formData.my_file.readable.should.equal(true);
			done();
		});
	});
	after(function(done){
		fs.unlink(__dirname + '/../recordings/temp.wav', function() {
			done();
		});
	});
});
describe('Remove MP3 file', function() {
	it('should contain temp.mp3 in the recording directory before removing', function() {
		tools.fileExists(mp3File).should.equal(true);
	});
	it('should remove temp.mp3', function(done) {
		record.finish(function(){
			var noMp3File = tools.fileExists(mp3File) == false;
			noMp3File.should.equal(true);
			done();
		});
	});
});

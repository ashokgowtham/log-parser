var util = require('util');
var Transform = require('stream').Transform;
util.inherits(LogParser, Transform);

function LogParser(options) {
  if (!(this instanceof LogParser))
    return new LogParser(options);

  Transform.call(this, options);
}

LogParser.prototype._transform = function(chunk, encoding, done) {

	var data=chunk.toString();
	var lines=data.split('\n');
	for (var i = 0; i < lines.length; i++) {
		var line=lines[i];
		var logLine = new LogLine(line);
		if(logLine.isValid()) {
			this.emit('log',logLine);
		}
	};
	this.push(data);
	done();
}

function LogLine (str) {
	var line=str;
	this.isValid = function () {
		return true;
	}
	this.uuid = function () {
		return (line.match(/^\[([a-z0-9]{32})\]/)||[])[1];
	}
	this.httpMethod = function () {
		return !/Started (GET|POST|PUT|DELETE)/.test(str);
	}
	this.fullUrl = function () {
		return (str.match(/Started (?:GET|POST|DELETE|PUT) \"([\/a-zA-Z\.\?\=0-9\-_]*)\"/)||[])[1];
	}
	this.ip = function () {
		return (str.match(/\ ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})\ /)||[])[1];
	}
}

module.exports = {
	LogParser:LogParser
};

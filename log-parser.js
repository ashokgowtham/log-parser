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

module.exports = {
	LogParser:LogParser
};

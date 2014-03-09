var vows = require('vows'),
    assert = require('assert');

var LogParser = require('../log-parser').LogParser;


// Create a Test Suite
vows.describe('log-parser').addBatch({
    'requiring log-parser module': {
        topic: function () { return require('../log-parser').LogParser },

        'should return a LogParser class.': function (topic) {
            assert.equal (topic.name, "LogParser");
        }
    },
    'log-parser class': {
        topic: function () { return LogParser },

        'when constructed with new': {
            topic: function (type) { return new type() },

            'should contruct a log-parser object': function (object) {
                assert.instanceOf (object, LogParser);
            }
        },
        'when called like a function': {
            topic: function (type) { return type() },

            'should contruct a log-parser object': function (object) {
                assert.instanceOf (object, LogParser);
            }
        },
    }

}).export(module);

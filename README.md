# log-parser [![Build Status](https://travis-ci.org/ashokgowtham/log-parser.png)](https://travis-ci.org/ashokgowtham/log-parser)
### A [common-log-format](http://en.wikipedia.org/wiki/Common_Log_Format) parser that can parse a log file stream

Parses http request log streams and emits event containing the parsed data.

##Usage

Suppose a log stream contains the following:
```log
127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326
```

LogParser can be used as,
``` javascript
var logParser = new LogParser();
logParser.on('log', function(err,request){
  console.log('Url: ' + request.url);
  console.log('Http verb: ' + request.httpVerb);
})
```

The above code outputs:
```
Url: /apache_pb.gif
Http verb: GET
```

## License

[MIT License](http://opensource.org/licenses/MIT)

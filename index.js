var open = require('open')
  , querystring = require('querystring')
  , server = require('http').createServer();

var StackOauth = function() {};

StackOauth.prototype.test = function()  {
  console.log("test");
}

StackOauth.prototype.authorize = function(clientId, cb, port, options)  {
  port = port || 7555;
  options = options || [];

  server.on('request', function(req, res) {
    console.log("received");
    res.end("Thanks");
    server.close();
  });

  open(['https://stackexchange.com/oauth/dialog?client_id=', clientId, '&scope=write_access&redirect_uri=http://localhost:',  port ].join(''));
  server.listen(port.toString());
}


module.exports = StackOauth;

var open = require('open')
  , querystring = require('querystring')
  , server = require('http').createServer()
  , fs = require('fs');

var StackOauth = function() {};

var browserCode = null;

StackOauth.prototype.authorize = function(clientId, outerCallback, port, options)  {
  var isOpen = true;

  port = port || 7555;
  options = options || [];

  server.on('request', function(req, res) {
    if(isOpen && req.url === '/keys') {
      // Close listener for future connections
      res.on('finish',  function()  {
        isOpen = false;
        server.close();
      });

      var body = "";
      req.on('data', function(data) {
        body += data;
      });
      req.on('end', function()  {
        var post = querystring.parse(body);
        console.log("calling CB");
        outerCallback(null, post);
      });
    }
    if(req.url === '/')  {
      if(!browserCode)  {
        fs.readFile('./browser-code.js', function(err, data) {
          if(err) return res.end("Error reading file: " + err);
          browserCode = data.toString();
          res.end(['<html><script>', browserCode, '</script></html>'].join(''));
        });
      }
      else
        res.end(['<html><script>', browserCode, '</script></html>'].join(''));
    }
    else {
      res.end("OK");
    }
  });

  open(['https://stackexchange.com/oauth/dialog?client_id=', clientId, '&scope=write_access&redirect_uri=http://localhost:',  port ].join(''));
  server.listen(port.toString());
}


module.exports = new StackOauth();

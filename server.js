var SIO = require('./index.js');
var sio = new SIO();
sio.authorize(3604, authorized);

function authorized(err, tokens)  {
  if(err) return console.log(err);
  console.log(tokens);
}
console.log("Finished");

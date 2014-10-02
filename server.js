var sio = require('./index.js');
// Client ID, Callback
sio.authorize(3604, authorized);

function authorized(err, response)  {
  if(err) return console.log(err);
  console.log("authorized:");
  console.log(response.access_token);
}

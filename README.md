# stack-implicit-oauth

A small Stack Overflow authenticator using OAuth 2.0 for client-side applications.

## Requirement
`localhost` needs to be [set][1] as OAuth domain.

## Use example
```JavaScript
var sio = require('stack-implicit-oauth');
// Client ID, Callback, [Port]
sio.authorize(3604, function authorized(err, response)  {
  if(err) return console.log(err);
  console.log("authorized:");
  console.log(response.access_token);
}, 7350);
```

## Reasoning
Stack Overflow allows both implicit and explicit authentications. Though, for the explicit the server key has to be kept in secret, which is impossible in case of having client-side only application.

The implicit authentication on the other hand requires the application to have control over the browser used, usually resulting in need of implementing the whole browser into the client-side application.

The down-sides of implementing a browser into your application without necessity:

* Extra complexity to the application
* User has to authenticate to the Stack Overflow site inside of built-in browser, before approving your application:
  * Does user remember the password?
  * Can user trust your application the password?

## Solution
We still cannot use OAuth explicit method without exposing server key, but there is a workaround in implicit authentication:
* Call user's default browser to approve the application
* On completion redirect to `localhost` server
* Extract the received data from Stack Exchange using JavaScript and post it to the `localhost` server.
* Close the tab in a browser


[1]:http://stackapps.com/apps/oauth

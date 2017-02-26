This is the Readme file for a Node.js based Twitter client.

Any relevant information will be added here.

1. This client application requires a config.js file at root level. This file should look like this:

	var Twit = require('twit')

var T = new Twit({
    consumer_key:         'xxx'
  , consumer_secret:      'xxx'
  , access_token:         'xxx'
  , access_token_secret:  'xxx'
})

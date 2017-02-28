var express = require('express')
var app = express()
var Twit = require('twit')
var config = require('./config.js');
var path = require('path');
const pug = require('pug');


app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.static(path.join(__dirname, 'public')));


config.get('statuses/user_timeline', {screen_name: 'windermereapp', count: '5'}, function(error, tweets, response){
   if (!error) {

   	var tweetContent = [];
    var noOfRetweets = [];
    var noOfLikes = [];
    var dateTweeted = [];
		// for each tweet push the relevant data into the arrays
    for (var i = 0; i < tweets.length; i++) {
    tweetContent.push(tweets[i].text);
    noOfRetweets.push(tweets[i].retweet_count);
    noOfLikes.push(tweets[i].favorite_count);
    dateTweeted.push(tweets[i].created_at);
   	
   	console.log(tweetContent);

   	
  	

   }

   app.get('/', function (req, res) {
    res.render('index', {

      tweetContent: tweetContent,
      noOfRetweets: noOfRetweets,
      noOfLikes: noOfLikes,
      dateTweeted: dateTweeted

      })
})
}

});




app.listen(3000, function () {
  console.log('App listening on port 3000!')

})

var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
   };

  
  


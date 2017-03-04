'use strict';

// Declare variables for dependencies
var express = require('express')
var app = express()
var config = require('./config.js');
var path = require('path');
var pug = require('pug');


// Setup views for pug templates and serve static files from 'public' folder
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));


// Set up error and success

var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
   };

var success = function (data) {
        console.log('Data [%s]', data);
};




// Make calls to Twitter API using Twitter client
//  Set up get profile information as a promise
var promiseUser = new Promise(function(resolve, reject) {
  config.get('users/show', {screen_name: 'windermereapp'}, function(error, profile, response){

    if (error) {
      return reject(error);
    }

    var userdetailsjson = {
      username: profile.name,
      screenname: profile.screen_name,
      following: profile.friends_count,
      profileImage: profile.profile_image_url
    };


    resolve(userdetailsjson);
  });
});


// Set up get timeline as a promise
var promiseUserTimeline = new Promise(function(resolve, reject) {
config.get('statuses/user_timeline', {screen_name: 'windermereapp', count: '5'}, function(error, tweets, response){
   if (error) {
      return reject(error);
    }


    var usertweets = [];
    var usertweetsjson;

    for (var i=0; i<tweets.length; i++) {
        usertweetsjson = {
        tweetContent: tweets[i].text,
        noOfRetweets: tweets[i].retweet_count,
        noOfLikes: tweets[i].favorite_count,
        dateTweeted: tweets[i].created_at,

      };

      

    usertweets.push(usertweetsjson);
   }


  resolve(usertweets);

  

});

});



// Set up get Friends List as a promise
var promiseFriendsList = new Promise(function(resolve, reject) {
  config.get('friends/list', {screen_name: 'windermereapp', count: '5'}, function(error, friends, response){
    var recentfriends = [];
    var friendsjson;

    if (error) {
      return reject(error);
    }

    for (var j=0; j<friends.users.length; j++) {
      friendsjson = {
        friendname: friends.users[j].name,
        friendscreenname: friends.users[j].screen_name,
        friendimage: friends.users[j].profile_image_url
      };
      recentfriends.push(friendsjson);
    }

    resolve(recentfriends);
  });
});

// Set up get recent Direct Messages as a promise
var promiseDirectMessages = new Promise(function(resolve, reject) {
    config.get('direct_messages', {screen_name: 'windermereapp', count: '5'}, function(error, messages, response){
    var directmessages = [];
    var messagesjson;

    if (error) {
      return reject(error);
    }

    for (var k=0; k<messages.length; k++) {
      messagesjson = {
        messagetime: messages[k].sender.created_at,
        messageprofilepic: messages[k].sender.profile_image_url,
        messagescreenname: messages[k].sender_screen_name,
        messagetext: messages[k].text,
        recipientmessagetime: messages[k].recipient.created_at,
        recipientprofilepic: messages[k].recipient.profile_image_url,
      };
      directmessages.push(messagesjson);
    }

    resolve(directmessages);
  });
 });


// Get all promises and pass them to a function of results
Promise.all([promiseUser, promiseUserTimeline, promiseFriendsList, promiseDirectMessages])
  .then(function(results){

    // Put data into templates and render root
    app.get('/', function(req, res){
      res.render('index', {


      username: results[0].username,
      screenname: results[0].screenname,
      profileImage: results[0].profileImage,
      following: results[0].following,
      usertweets: results[1],
      recentfriends: results[2],
      directmessages: results[3]


      });
    });

  }).catch(function(error){
    console.log(error);
  });


// Set up the server on port 3000
app.listen(3000, function () {
  console.log('App listening on port 3000')

})



  
  


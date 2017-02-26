var express = require('express')
var app = express()
//
var Twit = require('twit')
var config = require('./config.js');
//
const pug = require('pug');

app.set('view engine', 'pug');
//set where to look for templates
app.set('views', __dirname + '/templates');






app.get('/', function (req, res) {
  res.send(pug.renderFile('../template.pug'))
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})

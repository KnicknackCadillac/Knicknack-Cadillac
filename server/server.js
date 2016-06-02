var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
// var io = require('socket.io')(http);
var db = require('./db.js');
var configFile = require('../config/config.js');

var tone_analyzer = watson.tone_analyzer({
  username: configFile.WATSON_USERNAME,
  password: configFile.WATSON_PASSWORD,
  version: 'v3',
  version_date: '2016-05-19'
});

db.connect(function(err) {
  if (err) { console.log('connection error: ', err); }
});

app.use(express.static(__dirname + '/../public/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// GET request handling
// app.get('/messages', function(req, res) {
//   var queryString = 'SELECT * FROM users';
//   db.query(queryString, function (err, results){
//     if (err) {
//       console.error(err);
//     } else {
//       res.json(results);
//     }
//   });
// });

// POST request handling
app.post('/messages', function(req, res) {
  // var queryArgs = [req.body.username, req.body.message];
  // var queryString = 'INSERT INTO users (username, message) VALUES (?, ?)';
  // db.query(queryString, queryArgs, function(err, results) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log('Data inserted: ', results);
  //   }
  // });
  tone_analyzer.tone({ text: req.body.inputText }, function(err, tone) {
    if (err) {
      console.log(err);
    } else {
      console.log('Tone results: ', tone);
      res.json(tone.document_tone.tone_categories[0].tones);
    }
  });
});

var port = process.env.PORT || 8080;

app.listen(port, function(){
  console.log('listening on port', port);
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

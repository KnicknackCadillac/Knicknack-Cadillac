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

app.get('/messages', function(req, res) {
  db.query('select * from users', function (err, results){
    if (err) {
      console.error(err);
    } else {
      res.json(results);
    }
  });
});

// handle post requests
app.post('/messages', function(req, res) {
  console.log("request has been sent: ", req.body);
  tone_analyzer.tone({ text: req.body.message },
    function(err, tone) {
      if (err) {
        console.log(err);
      } else {
        res.send(tone);
      }
    }
  );
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

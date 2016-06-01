var express = require('express');
var app = express();
// var http = require('http').Server(app);
var bodyParser = require('body-parser');
// var io = require('socket.io')(http);
var db = require('./db.js');

db.connect(function(err) {
  if (err) { console.log('connection error: ', err); }
});

app.use(express.static(__dirname + '/../public/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/messages', function(req, res) {
  db.query('select * from users', function (err, results){
    if (err) {
      console.log(err);
      return;
    }
    res.json(results);
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

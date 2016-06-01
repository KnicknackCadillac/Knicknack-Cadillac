var db = require('./db.js');

db.connect(function(err) {
  if (err) { console.log('connection error: ', err); }
});

// TODO: finalize table(s) structure
var dropUsersTable = 'DROP TABLE IF EXISTS users';
var createUsersTable = 'CREATE TABLE users (Id int NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, message TEXT NOT NULL, PRIMARY KEY (Id) )';
var testUsername = 'Zebra2041';
var testMessage = 'I am a real zebra.';

// drop table
db.query(dropUsersTable);
// create table
db.query(createUsersTable);
// insert server dummy data
db.query('INSERT INTO users (username, message) Values(" ' + testUsername + '  ", " ' + testMessage + '  ")');

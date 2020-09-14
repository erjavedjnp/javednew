var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/walson";
var express = require('express');
var app = express();

app.get('/db', function (req, res){
  app.send('testing')
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

app.listen(3000, function () {
  console.log("Server running")
});

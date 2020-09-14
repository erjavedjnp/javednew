var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";
var express = require('express');
var app = express();

var id, users_id, device_id, type, token;

app.get('/devices', function (req, res){
  app.send('testing')
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: ObjectId("5f58f89a770f974014e27a96"),
    users_id: users_id,
    device_id: device_id,
    device_type: type,
    device_token: token
  };
  dbo.collection("devices").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
app.listen(3000, function () {
  console.log("Server running")
});

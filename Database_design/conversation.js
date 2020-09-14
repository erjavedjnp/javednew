var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var app = express();

var id, title, creator_id, channel_id, cdate, udate;

app.get('/conversation', function (req, res){
  app.send('testing')
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: ObjectId("5f58f89a770f974014e27a96"),
    title: title,
    creator_id: creator_id,
    channel_id: channel_id,
    created_at: cdate,
    updated_at: udate
  };
  dbo.collection("conversation").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
app.listen(3000, function () {
  console.log("Server running")
});

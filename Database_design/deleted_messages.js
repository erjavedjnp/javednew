var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";
var express = require('express');
var app = express();


var id, messages_id, users_id, ddate;

app.get('/deleted_messages', function (req, res){
  app.send('testing')
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: ObjectId("5f5a5c88819b5805a0c06926"),
    messages_id: messages_id,
    users_id: users_id,
    deleted_at: ddate
  };
  dbo.collection("deleted_messages").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
app.listen(3000, function () {
  console.log("Server running")
});

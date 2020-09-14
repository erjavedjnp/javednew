var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";
var express = require('express');

var app = express();

var id, users_id, token, cdate, ddate, devices_id;

app.get('/access',function(req, res){
  res.send('testing')
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: ObjectId("5f58f89a770f974014e27a96"),
    users_id: users_id,
    token: token,
    created_at: cdate,
    deleted_at: ddate,
    devices_id: devices_id
  };
  dbo.collection("access").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
app.listen(3000,function (){
  console.log("Server running");
});

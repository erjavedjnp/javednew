var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";
var express = require('express');
var app = express();

var id, users_id, participants_id, report_type, notes, cdate;

app.get('/reports', function (req, res){
  app.send('testing')
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: ObjectId("5f5a547f9acf5a5430b429d1"),
    users_id: users_id,
    participants_id: participants_id,
    report_type: report_type,
    notes: notes,
    created_at: cdate
  };
  dbo.collection("reports").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
app.listen(3000, function () {
  console.log("Server running")
});

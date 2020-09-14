var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var app = express();

var id, users_id, phone_no, email, fname, lname, mname;
app.get('/contacts',function(req, res){
  res.send('testing')
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: ObjectId("5f58f89a770f974014e27a96"),
    users_id: users_id,
    first_name: fname,
    middle_name: mname,
    last_name: lname,
    phone: phone_no,
    email: email
  };
  dbo.collection("contacts").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
app.listen(3000, function () {
  console.log("Server running")
});
